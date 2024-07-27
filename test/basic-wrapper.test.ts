import { expect, test } from "bun:test";
import { ComfyClient } from "..";

test("env-vars-ok", () => {
    expect(process.env.COMFY).toBeDefined();
});

test("connect-comfy", async () => {
    using client = new ComfyClient(process.env.COMFY!)
    const tmp = await client.system_stats()
    expect(tmp).toBeObject();
});

//TODO
test("upload-mask", async () => {
    using client = new ComfyClient(process.env.COMFY!)
    const tmp = await client.system_stats()
    expect(tmp).toBeObject();
});

//TODO
test("upload-image", async () => {
    using client = new ComfyClient(process.env.COMFY!)
    const tmp = await client.system_stats()
    expect(tmp).toBeObject();
});

//TODO
test("view", async () => {
    using client = new ComfyClient(process.env.COMFY!)
    const tmp = await client.system_stats()
    expect(tmp).toBeObject();
});