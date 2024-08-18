// Base classes and type definitions to support the generated code matching the ComfyUI node repository

import type { Static } from "@sinclair/typebox";
import { Type as t } from "@sinclair/typebox"

export class Node {
    protected uid: number
    protected links: Record<string, unknown> = {}  //Links of my named inputs to...

    constructor(ctx: Map<number, Node>) {
        //Register the node in the context map.
        this.uid = ctx.size;
        ctx.set(ctx.size, this);
    };

    get $uid(): number {
        return this.uid
    }

    //Link my input #slot to the output value of an other node.
    protected $$link(slot: string, value: unknown) {
        this.links[slot] = value
    }

    protected $$type() { throw "not defined" }

    protected $$compile() {
        return {
            "class_type": this.$$type(),
            "inputs": this.links
        }
    }

    /**
     * Mostly for internal use. Please use the workflow compile method instead.
     */
    static CompileAll(ctx: Map<number, Node>, client_id: string): Static<typeof WorkflowSchema> {
        const entries = Array.from(ctx.entries()).map((x) => [x[0], x[1].$$compile()])
        return {
            client_id,
            prompt: {
                ...Object.fromEntries(entries)
            }
        }
    }
}

//Schema of a comfyui workflow/prompt 
export const WorkflowSchema = t.Object({
    client_id: t.String(),
    prompt: t.Record(t.String(), t.Object({
        class_type: t.String(),
        inputs: t.Record(t.String(), t.Union([t.Boolean(), t.String(), t.Number(), t.Null(), t.Undefined(), t.Tuple([t.String(), t.Integer()], { description: "Arc or value" })]))
    }, { additionalProperties: false })),
    //This section is only present for graphs for which we want to provide/preserve the UI support in the official comfy web ui
    extra_data: t.Optional(
        t.Object({
            extra_pnginfo: t.Object({
                workflow: t.Object({
                    last_node_id: t.Optional(t.Integer()),
                    last_link_id: t.Optional(t.Integer()),
                    nodes: t.Array(t.Object({
                        id: t.Integer(),
                        type: t.String(),
                        inputs: t.Array(t.Object({})),
                        outputs: t.Array(t.Object({
                            name: t.String(),
                            type: t.String(),
                            links: t.Array(t.Integer()),
                        }))
                    })),
                    links: t.Array(
                        t.Tuple([
                            t.Integer({ description: "ID" }),
                            t.Integer({ description: "Starting Node" }),
                            t.Integer({ description: "Output port" }),
                            t.Integer({ description: "Ending node" }),
                            t.Integer({ description: "Input port" }),
                            t.String({ description: "Type" }),
                        ]),
                    ),
                    groups: t.Array(t.Object({})), //Schema TBD
                    config: t.Object({}), //Schema TBD
                    extra: t.Object({}), //Just the the UI, ignore it.
                    version: t.Number(), //Hardcoded to work with this specific revision.
                }),
            }),
        }),
    )
}, { additionalProperties: false })