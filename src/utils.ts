import { basename } from "node:path"
import type { ComfyClient } from "./comfy-client";

export function BunFileToFile(blob: Blob): File {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const b: any = blob;
    //Fix missing field.
    b.lastModifiedDate = new Date();
    b.name = basename(blob.name);

    return blob as File;
}

/**
 * @param cfg The original comfy json
 * @returns A normalized version, since the original is awful
 */
export function NormalizeComfyJSON(cfg: Record<string, {
    input: { required?: [], optional?: [] },
    output: string | string[],
    output_name: string | string[],
    output_is_list: boolean[],
    name: string, display_name: string, description: string, python_module: string, category: string, output_node: boolean
}>): Record<string, {
    inputs: Record<string, { required: boolean, type: string | string[], opts: unknown }>,
    outputs: Record<string, { is_list: boolean, type: string }>,
    metadata: { name: string, display_name: string, description: string, is_output_node: boolean, python_module: string, category: string }
}> {
    return Object.fromEntries(Object.entries(cfg).map((x) => [x[0], {
        inputs: Object.fromEntries([
            ...Object.entries(x[1].input?.required ?? {}).map(y => [y[0], { required: true, type: y[1][0], metadata: y[1][1] }]),
            ...Object.entries(x[1].input?.optional ?? {}).map(y => [y[0], { required: false, type: y[1][0], metadata: y[1][1] }])
        ]),
        outputs: Object.fromEntries(
            (x[1].output_is_list ?? []).map((y, i) => [typeof x[1].output_name === 'string' ? typeof x[1].output_name : typeof x[1].output_name[i], {
                is_list: y, type: typeof x[1].output === 'string' ? typeof x[1].output : typeof x[1].output[i]
            }]),
        ),
        metadata: {
            name: x[1].name,
            display_name: x[1].display_name,
            description: x[1].description,
            python_module: x[1].python_module,
            category: x[1].category,
            is_output_node: x[1].output_node
        }
    }]))
}


export function CompileComfyJSON(cfg: ReturnType<typeof NormalizeComfyJSON>): string {
    const pieces = []
    for (const [name, { inputs, outputs, metadata }] of Object.entries(cfg)) {
        pieces.push(`
    /**
     * TODO Docs based on metadata
     */
    '${metadata.name}' : class extends Node{
        //Setters
        ${Object.entries(inputs).map(x => `
        set '${x[0]}'(value : ${x[1].type})  {} 
        `).join('\n')}

        //Getters
        ${Object.entries(outputs).map((x, i) => `
        get '${x[0]}'() : ${x[1].type} { return [this, '${x[0]}', ${i}]  as unknown as string; }
        `).join('\n')}

        constructor(opts:{
            ${Object.entries(inputs).map(x => `${x[0]}${x[1].required ? '' : '?'}: ${x[1].type}`).join(',')}
        }){
            super();

            ${Object.entries(inputs).map(x => `if(opts['${x}']!==undefined) this['${x}'] = opts['${x}']`).join(';')}
        }
}`)
    }

    //TODO: Collect and add all types

    return `const ComfyUI = {\n${pieces.join(',\n')}\n}`
}

export async function ComfyJSONToTypescript(client: ComfyClient, filename: string) {
    const tmp = await client.object_info()
    const normal = NormalizeComfyJSON(tmp)

    //await Bun.write(`${filename}.origin.json`, JSON.stringify(tmp, undefined, 4))
    await Bun.write(filename, JSON.stringify(normal, undefined, 4))
}
