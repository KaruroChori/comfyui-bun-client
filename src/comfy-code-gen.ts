// Code generation from the workflow JSON file.
import type { Static } from "@sinclair/typebox"
import type { WorkflowSchema } from "./comfy-types-base"

// biome-ignore lint/suspicious/noExplicitAny: The builder cannot statically know about the specifics of the generated interface `env`.
export function GenerateTSFromJson(cfg: Static<typeof WorkflowSchema>, env: any): string {
    //TODO!
    return ""
}