import { expect, test } from "bun:test";
import { ComfyClient } from "..";

test("connect-comfy", async () => {
    using client = new ComfyClient(process.env.COMFY ?? 'localhost:8188')
    const tmp = await client.system_stats()
    expect(tmp).toBeObject();
});