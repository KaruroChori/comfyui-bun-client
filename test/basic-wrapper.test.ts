import { expect, test } from "bun:test";
import { BunFileToFile, ComfyClient } from "..";
import { join } from "node:path"

test("env-vars-ok", () => {
    expect(process.env.COMFY).toBeDefined();
});

test("connect-comfy", async () => {
    using client = new ComfyClient(process.env.COMFY!)
    const tmp = await client.system_stats()
    expect(tmp).toBeObject();
});

test("upload-image", async () => {
    using client = new ComfyClient(process.env.COMFY!)
    const tmp = await client.upload_image(BunFileToFile(Bun.file(join(import.meta.dir, "/assets/demo-img-a.png"))), { type: 'temp', overwrite: true })
    expect(tmp).toEqual({
        name: "demo-img-a.png",
        subfolder: "",
        type: "temp",
    });
});

test("upload-mask", async () => {
    using client = new ComfyClient(process.env.COMFY!)
    const tmp_img = await client.upload_image(BunFileToFile(Bun.file(join(import.meta.dir, "/assets/demo-img-a.png"))), { type: 'temp', overwrite: true })
    const tmp_mask = await client.upload_mask(BunFileToFile(Bun.file(join(import.meta.dir, "/assets/demo-img-a.png"))), { type: 'temp', overwrite: true, original_ref: { filename: 'demo-img-a.png', type: 'temp' } })
    expect(tmp_mask).toEqual({
        name: "demo-img-a.png",
        subfolder: "",
        type: "temp",
    });
});

test("view", async () => {
    using client = new ComfyClient(process.env.COMFY!)
    const file = Bun.file(join(import.meta.dir, "/assets/demo-img-a.png"))
    const tmp_send = await client.upload_image(BunFileToFile(file), { type: 'temp', overwrite: true })
    const tmp_recv = await client.view('demo-img-a.png', { type: 'temp' })
    expect(tmp_recv.size).toBe(file.size);
});