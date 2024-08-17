import { expect, test } from "bun:test";
import { ComfyClient, CompileComfyJSON, NormalizeComfyJSON } from "..";
import { join } from "node:path"

/*
test("basic-workflow-0", async () => {
    const normal = NormalizeComfyJSON((await import('./assets/clean-objectinfo.json')).default)
    const compiled = CompileComfyJSON(normal, pkg)

    await Bun.write(join(import.meta.dir, "./temp/interface.ts"), compiled)

    using client = new ComfyClient(process.env.COMFY!)
    let flag = 0;

    const tmp = await client.schedule_job({ ...(await import("./assets/workflow-1.json")).default, client_id: client.uid }, [], [], {
        onCompleted: () => { flag = 42 }, onUpdate: () => { flag = 42 }
    })
    await tmp.completion();
    expect(tmp).toBeObject();
    expect(flag).toEqual(42);
});
*/