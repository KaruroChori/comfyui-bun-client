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
function NormalizeComfyJSON(cfg: Record<string, {
    input: { required?: [], optional?: [] },
    output: string | string[],
    output_name: string | string[],
    output_is_list: boolean[],
    name: string, display_name: string, description: string, python_module: string, category: string, output_node: boolean
}>): Record<string, {
    inputs: Record<string, { required: boolean, type: string | string[], metadata: { min?: unknown, max?: unknown, default?: unknown, step?: unknown } }>,
    outputs: Record<string, { is_list: boolean, type: string }>,
    metadata: { name: string, display_name: string, description: string, is_output_node: boolean, python_module: string, category: string }
}> {
    return Object.fromEntries(Object.entries(cfg).map((x) => [x[0], {
        inputs: Object.fromEntries([
            ...Object.entries(x[1].input?.required ?? {}).map(y => [y[0], { required: true, type: y[1][0], metadata: y[1][1] }]),
            ...Object.entries(x[1].input?.optional ?? {}).map(y => [y[0], { required: false, type: y[1][0], metadata: y[1][1] }])
        ]),
        outputs: Object.fromEntries(
            (x[1].output_is_list ?? []).map((y, i) => [(typeof x[1].output_name === 'string') ? x[1].output_name : x[1].output_name[i], {
                is_list: y, type: (typeof x[1].output === 'string') ? x[1].output : x[1].output[i]
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



function CompileComfyJSON(cfg: ReturnType<typeof NormalizeComfyJSON>): string {
    const types: Set<string> = new Set()
    const pieces = []

    function TypeFromComfyUI(type: string | string[], metadata?: { min?: unknown, max?: unknown, default?: unknown, step?: unknown }) {
        if (typeof type === 'string') {
            if (['STRING', 'BOOLEAN', 'INT', 'FLOAT', '*'].includes(type) === false) types.add(type);
            if (type === '*') return 'ANY'
            else if (metadata?.min !== undefined && metadata?.max !== undefined) return `${type}<${metadata.min},${metadata.max}>`;
            else return type;
        }
        else {
            if (type.length !== 0) return type.map(x => `"${x}"`).join('|')
            else return 'void';
        }
    }

    for (const [name, { inputs, outputs, metadata }] of Object.entries(cfg)) {
        pieces.push(`
    /**
     * TODO Docs based on metadata
     */
    '${metadata.name}' : class extends Node{
        //Setters
        ${Object.entries(inputs).map((x, i) => `set '${x[0]}'(value : ${TypeFromComfyUI(x[1].type)})  { super.$$link(${i}, value) } `).join('\n')}

        //Getters
        ${Object.entries(outputs).map((x, i) => `get '${x[0]}'() : ${TypeFromComfyUI(x[1].type)} { return [this, '${x[0]}', ${i}]  as unknown as ${TypeFromComfyUI(x[1].type)}; }`).join('\n')}

        constructor(opts:{
            ${Object.entries(inputs).map(x => `'${x[0]}'${x[1].required ? '' : '?'}: ${TypeFromComfyUI(x[1].type)}`).join(',')}
        }){
            super(ctx);

            ${Object.entries(inputs).filter(x => x[1].required === true).map(x => `this['${x[0]}'] = opts['${x[0]}']`).join(';\n')}
            ${Object.entries(inputs).filter(x => x[1].required !== true).map(x => `if(opts['${x[0]}']!==undefined) this['${x[0]}'] = opts['${x[0]}']`).join(';\n')}

        }

        static defaults = {
            ${Object.entries(inputs).map(x => x[1].metadata?.default !== undefined ? `'${x[0]}':  ${JSON.stringify(x[1].metadata?.default)}` : undefined).filter(x => x !== undefined).join(',\n')}
}
}`)
    }

    //TODO: Collect and add all types

    return `
export class Node {
    constructor(ctx: Map<number, Node>) {
        //Register the node in the context map.
        ctx.set(ctx.size + 1, this);
    };

    $$link(slot: number, value: unknown) {
        //TODO: Implement linking.
    }
}

export type STRING = string;
export type INT<min = void, max = void> = number;
export type FLOAT<min = void, max = void> = number;
export type BOOLEAN = boolean;

type ANY = 'ANY';
${[...types].map(x => `type ${x} = '${x}'`).join('\n')}
export const Workflow = () => {const ctx=new Map(); return { \n${pieces.join(',\n')} \n, $compile : async function (){/*TODO*/} }}`
}

export async function ComfyJSONToTypescript(client: ComfyClient, filename: string) {
    const tmp = await client.object_info()
    const normal = NormalizeComfyJSON(tmp)
    const compiled = CompileComfyJSON(normal)

    //await Bun.write(`${ filename }.origin.json`, JSON.stringify(tmp, undefined, 4))
    //await Bun.write(filename + '.json', JSON.stringify(normal, undefined, 4))
    await Bun.write(filename, compiled)
}
