import { expect, test } from "bun:test";
import { ComfyClient } from "..";

test("basic-workflow-0", async () => {
    using client = new ComfyClient(process.env.COMFY!)
    let flag = 0;

    const tmp = await client.schedule_job({ ...(await import("./assets/workflow-1.json")).default, client_id: client.uid }, {
        onCompleted: () => { flag = 42 }, onUpdate: () => { flag = 42 }
    })
    await tmp.completion();
    expect(tmp).toBeObject();
    expect(flag).toEqual(42);
});