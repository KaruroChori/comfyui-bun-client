import { Type as t } from "@sinclair/typebox"
export const WorkflowSchema = t.Object({
    client_id: t.String(),
    prompt: t.Record(t.String(), t.Object({
        class_type: t.String(),
        inputs: t.Record(t.String(), t.Union([t.Boolean(), t.String(), t.Number(), t.Tuple([t.String(), t.Integer()], { description: "Arc or value" })]))
    }, { additionalProperties: false })),
    //This section is only present for graphs for which we want to provide/preserve the UI support in the official comfy web ui
    extra_data: t.Optional(
        t.Object({
            extra_pnginfo: t.Object({
                workflow: t.Object({
                    last_node_id: t.Optional(t.Integer()),
                    last_link_id: t.Optional(t.Integer()),
                    nodes: t.Array(t.Object({})),
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