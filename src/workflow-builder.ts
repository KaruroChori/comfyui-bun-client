import { Type as t } from "@sinclair/typebox"
export const WorkflowSchema = t.Object({
    client_id: t.String(),
    prompt: t.Record(t.String(), t.Object({
        class_type: t.String(),
        inputs: t.Record(t.String(), t.Any())
    }, { additionalProperties: false })),
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
                    groups: t.Optional(t.Array(t.Object({}))), //Schema TBD
                    config: t.Optional(t.Object({})), //Schema TBD
                    extra: t.Optional(t.Object({})), //Just the the UI, ignore it.
                    version: t.Number(), //Hardcoded to work with this specific revision.
                }),
            }),
        }),
    )
}, { additionalProperties: false })