/**
 * Anything related to the compile process of the `object_info` data from ComfyUI to typescript classes and types.
 */


//NOTICE: Make sure the generated code is based on escaped variables.
//Symbols like `'` or `"` in several of the json fields might result in generation bugs as they have not been always properly handled.

import type { ComfyClient } from "./comfy-client"

/**
 * Convert the original json obtained from the ComfyUI backend into something less bad.
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
    inputs: Record<string, { required: boolean, type: string | string[], metadata?: { min?: unknown, max?: unknown, default?: unknown, step?: unknown } }>,
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

//TODO: If not converted to string at times the object is not string. This must be checked!
function $(str: string | number) {
    if (typeof str !== 'string') return str.toString()
    else return str.replaceAll("'", '\\\'')
}

/**
 * Compile a normalized json from the comfyui backend into a string representing the final code.
 * @param cfg all entries to generate the interface code from.
 * @param basename the package name for this client library. `comfyui-bun-client` by default.
 * @returns string encoded typescript sourcecode implementing the interface.
 */
export function CompileComfyJSON(cfg: ReturnType<typeof NormalizeComfyJSON>, basename?: string): string {
    const types: Set<string> = new Set()
    const pieces = []

    function TypeFromComfyUI(type: string | string[], metadata?: { min?: unknown, max?: unknown, default?: unknown, step?: unknown }) {
        if (typeof type === 'string') {
            const type_list = type.split(",");
            const ret_list = []
            for (const type of type_list) {
                const reduced_type = type.split(":")[0]
                if (
                    ["STRING", "BOOLEAN", "INT", "FLOAT", "*"].includes(
                        reduced_type,
                    ) === false
                )
                    types.add(reduced_type);

                if (reduced_type === "*") ret_list.push("ANY");
                else if (
                    metadata?.min !== undefined &&
                    metadata?.max !== undefined
                )
                    ret_list.push(`${reduced_type}<${metadata.min},${metadata.max}>`);
                else ret_list.push(reduced_type);
            }
            return ret_list.join('|');
        }
        else {
            if (type.length !== 0) return `${type.map(x => `'${$(x)}'`).join('|')}| $dyn`
            else return '$dyn'; //Technically void, but $dyn is always allowed
        }
    }

    for (const [name, { inputs, outputs, metadata }] of Object.entries(cfg)) {
        pieces.push(`
    /**
     * ${metadata.display_name} from ${metadata.category}
     * @desc ${metadata.description}
    */
    ${JSON.stringify(metadata.name)} : class extends Node{
        //Getters
        ${Object.entries(outputs).map((x, i) => `get '${$(x[0])}'() : ${TypeFromComfyUI(x[1].type)} { return [this.$uid.toString(), ${i}]  as unknown as ${TypeFromComfyUI(x[1].type)}; }`).join('\n')}

        /**
          * Constructor
${Object.entries(inputs).map((x, i) => `\t\t * @param opts.${x[0]}${x[1].metadata?.default ? ` default: ${JSON.stringify(x[1].metadata.default)}` : ""}${x[1].metadata?.min ? ` max: ${x[1].metadata.max}` : ""}${x[1].metadata?.min ? ` min: ${x[1].metadata.min}` : ""}${x[1].metadata?.step ? ` step: ${x[1].metadata.step}` : ""}`).join('\n')}}
        */
        constructor(opts:{
            ${Object.entries(inputs).map(x => `'${$(x[0])}'${(x[1].required && x[1].metadata?.default === undefined) ? '' : '?'}: ${TypeFromComfyUI(x[1].type)}`).join(',')}
        }){
            super(ctx);

            ${Object.entries(inputs).map(
            (x, i) =>
                `super.$$link(${JSON.stringify($(x[0]))}, opts['${$(x[0])}']${x[1].metadata?.default !== undefined ? `??tmp[${JSON.stringify(metadata.name)}].defaults['${$(x[0])}']` : ""})`,
        ).join('\n')}
}

        static defaults = {
    ${Object.entries(inputs).map(x => x[1].metadata?.default !== undefined ? `'${$(x[0])}':  ${JSON.stringify(x[1].metadata?.default)}` : undefined).filter(x => x !== undefined).join(',\n')}
}
        protected override $$type(){
            return ${JSON.stringify(metadata.name)}
        }
}`)

    }

    return `
//File automatically generated, please don't change it manually.

import {Node} from "${basename ?? "comfyui-bun-client"}"

export function dyn(x: unknown){return x as '@dyn'}
type $dyn = '@dyn'

export type STRING = string;
export type INT<min = void, max = void> = number;
export type FLOAT<min = void, max = void> = number;
export type BOOLEAN = boolean;

type ANY = 'ANY';
${[...types].map(x => `type ${$(x)} = '${$(x)}'`).join('\n')}

export const Workflow = (_ctx?: Map<number,Node>) => {
    const ctx = _ctx??new Map();
    const tmp = {
        ${pieces.join(',\n')},
        $compile: async function (client_id:string) {
            return Node.CompileAll(ctx,client_id)
        }
    }

    return tmp;
    } `

}

/**
 * Generate the ts file mapping all nodes from ComfyUI into proper typescript
 * @param client the active connection from which to derive the interface
 * @param filename the target filename
 * @param pkg the name of the package for this library in the user application. If undefined the one from the original package.json is assumed
 */
export async function ComfyJSONToTypescript(client: ComfyClient, filename: string, pkg?: string) {
    const tmp = await client.object_info()
    const normal = NormalizeComfyJSON(tmp)
    const compiled = CompileComfyJSON(normal, pkg)

    //await Bun.write(`${ filename }.origin.json`, JSON.stringify(tmp, undefined, 4))
    //await Bun.write(filename + '.json', JSON.stringify(normal, undefined, 4))
    await Bun.write(filename, compiled)
}
