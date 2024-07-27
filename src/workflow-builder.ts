import { Type as t } from "@sinclair/typebox"
export const WorkflowSchema = t.Object({
    client_id: t.String(),
    prompt: t.Record(t.String(), t.Object({
        class_type: t.String(),
        inputs: t.Record(t.String(), t.Any())
    }, { additionalProperties: false })),
    extra_data: t.Object({
        extra_pnginfo: t.Object({
            workflow: t.Object({
                last_node_id: t.Integer(),
                last_link_id: t.Integer(),
                nodes: t.Array(t.Object({})),
                links: t.Array(t.Tuple([t.Integer(), t.Integer(), t.Integer(), t.Integer(), t.Integer(), t.String()])),
                groups: t.Array(t.Object({})),  //Schema TBD
                config: t.Object({}),   //Schema TBD
                extra: t.Object({}), //Just the the UI, ignore it.
                version: t.Number() //Hardcoded to wotk with this specific revision.
            })
        })
    })
}, { additionalProperties: false })