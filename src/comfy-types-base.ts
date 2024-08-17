import type { Static } from "@sinclair/typebox";
import type { WorkflowSchema } from "./workflow-builder";

export class Node {
    protected _uid: number
    protected links: Record<string, unknown> = {}  //Links of my named inputs to...

    constructor(ctx: Map<number, Node>) {
        //Register the node in the context map.
        this._uid = ctx.size;
        ctx.set(ctx.size, this);
    };

    get uid(): number {
        return this._uid
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

