import { ComfyClient, ComfyJSONToTypescript } from '../index'


{
    //Variable with a scope-contrained lifetime
    using client = new ComfyClient(process.env.COMFY ?? 'localhost:8188', { debug: false })

    await ComfyJSONToTypescript(client, './workflows/@interface.ts')

}