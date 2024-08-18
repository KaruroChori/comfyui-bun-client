// Code generation from the workflow JSON file.
import type { Static } from "@sinclair/typebox"
import type { WorkflowSchema } from "./comfy-types-base"

export function GenerateTSFromJson(json: Static<typeof WorkflowSchema>, base = 'comfy'): string {
    //TODO!
    //I do not have information of output/slot number in the basic prompt json. However I can get it from the litegraph part of it without needing to process anything else.
    //[ ] I need to mark nodes visited and added to `nodes` to ensure deps are satisfied.
    //[ ] If a value is equivalent to its default just ignore it from the list.

    const nodes: string[] = []
    for (const node of Object.entries(json.prompt)) {
        nodes.push(`const node_${node[0]} = new ${base}[${JSON.stringify(node[1].class_type)}](${Object.entries(node[1].inputs).map(y => `${JSON.stringify(y[0])}: ${JSON.stringify(y[1])}`).join(',')})`)
    }
    return nodes.join("\n")
}