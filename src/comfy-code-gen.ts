// Code generation from the workflow JSON file. This code is very messy and hopefully it will never be touched again.

import type { Static } from "@sinclair/typebox"
import type { WorkflowSchema } from "./comfy-types-base"


/**
 * Generate typescript code to match a JSON workflow.
 * @param json the workflow
 * @param base the name of the node registry to use. By default it is set to `comfy`
 * @returns The generated code based on the JSON workflow
 */
export function GenerateTSFromJson(json: Static<typeof WorkflowSchema>, base = 'comfy'): string {
    //I do not have information of output/slot number in the basic prompt json. However I can get it from the litegraph part of it without needing to process anything else.
    //[x] I need to mark nodes visited and added to `nodes` to ensure deps are satisfied.
    //[ ] ~~If a value is equivalent to its default just ignore it from the list.~~ Cannot do it easily.

    const nodes: string[] = []
    const done: Set<number> = new Set()

    function resolveNode(nodeN: number) {
        const node = json.prompt[nodeN]

        if (done.has(nodeN)) return;

        nodes.push(`const node_${nodeN} = new ${base}[${JSON.stringify(node.class_type)}]({${Object.entries(node.inputs).map(y => `${JSON.stringify(y[0])}: ${resolveArc(y[1])}`).join(',')}})`)
        done.add(nodeN)
    }

    function resolveArc(value: number | string | boolean | null | undefined | [string, number]) {
        if (typeof value !== 'object' || value === null || value === undefined) return JSON.stringify(value)
        else {
            const val = json.extra_data?.extra_pnginfo.workflow.nodes.find(x => x.id === Number.parseInt(value[0]))?.outputs[value[1]]
            resolveNode(Number.parseInt(value[0]))
            return `node_${value[0]}[${JSON.stringify(val?.name)}]`;
        }
    }

    for (const node of Object.entries(json.prompt)) {
        resolveNode(Number.parseInt(node[0]))
    }
    return nodes.join("\n")
}