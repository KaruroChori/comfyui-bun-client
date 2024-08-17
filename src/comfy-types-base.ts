import type { Static } from "@sinclair/typebox";
import type { WorkflowSchema } from "./workflow-builder";

export class Node {
    private uid: number
    private links: Map<number, [Node, string, number][]> = new Map()  //Links of my output to...

    constructor(ctx: Map<number, Node>) {
        //Register the node in the context map.
        this.uid = ctx.size + 1;
        ctx.set(ctx.size + 1, this);
    };

    //Link my input #slot to the output value.
    protected $$link(slot: number, value: unknown) {
        //TODO: Implement linking.
    }

    protected $$compile(ctx: Map<number, Node>) {

    }
}

export function Compile(ctx: Map<number, Node>): Static<typeof WorkflowSchema> {
    return {

    }
}

export class TNode<T> extends Node { }
export class TArgNode<T> extends Node { }
