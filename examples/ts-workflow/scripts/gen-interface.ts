import { ComfyClient, ComfyJSONToTypescript } from 'comfyui-bun-client'
import { join } from "node:path"

{
    //Variable with a scope-contrained lifetime
    using client = new ComfyClient(process.env.COMFY ?? 'localhost:8188', { debug: false })

    await ComfyJSONToTypescript(client, join(import.meta.dir, "../interface.ts"))

}