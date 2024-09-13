export default (nodes: string) =>
    `
import { Workflow, dyn } from "../comfy-types.ts"
import { ComfyClient, type Node } from "comfyui-bun-client"

export const version = [1, 0, 0]

/**
 * TODO: Add description
 * @param opts TODO: Add documentation
 * @param ctx namespace of nodes to allow composition of workflows
 * @returns the pre-compiled workflow and a list of output nodes being exposed.
 */
export const workflow = (opts: {
    /* TODO: Add args */
}, ctx?: Map<number, Node>) => {
    const comfy = Workflow(ctx);

    ${nodes}

    return { workflow: comfy, out: { /*TODO: Add fields here*/ } };
}

export const test = async () => {
    using client = new ComfyClient(process.env.COMFY ?? 'localhost:8188', { debug: true })
    const wf = workflow({/* TODO: Pass args*/})
    const compiled = await wf.workflow.$compile(client.uid)
    const job = await client.schedule_job(compiled, [], [], {});
    await job.completion()

    //TODO: Validation on output here?
}
`