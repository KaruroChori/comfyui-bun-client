import { sleep } from 'bun'
import { BunFileToFile, ComfyClient, ComfyJSONToTypescript } from '../../index'

{
    //Variable with a scope-contrained lifetime
    using client = new ComfyClient(process.env.COMFY ?? 'localhost:8188', { debug: true })


    console.log(await client.system_stats())
    console.log(await client.embeddings())
    console.log(await client.extensions())

    try {
        /*const file = BunFileToFile(
            Bun.file("./assets/asset.png")
        )
        await client.upload_mask(file, { overwrite: true })
        console.log(await client.view_metadata('checkpoints', 'animagineXLV3_v30.safetensors'))
        */

        console.log('Waiting for prompt 1 to submit')
        {
            const wf = await client.schedule_job({ ...(await import("./assets/workflow-a.json")).default, client_id: client.uid }, [{ from: './assets/asset.png' }], [],
                {
                    onCompleted:
                        () => {
                            console.log("Done with 1");
                        },
                    onUpdate:
                        () => {
                            console.log("Working on 1");
                        },
                    onError:
                        () => { },
                }
            );
        }
        console.log('Prompt 1 done!')

        console.log('Waiting for prompt 2 to submit')
        {
            const wf = await client.schedule_job({ ...(await import("./assets/workflow-b.json")).default, client_id: client.uid }, [], [],

                {
                    onCompleted:
                        () => {
                            console.log("Done with 2");
                        },
                    onUpdate:
                        () => {
                            console.log("Working on 2");
                        },
                    onError:
                        () => { },
                }
            );
            await wf.completion()
        }

        console.log('Prompt 2 done!')

        await ComfyJSONToTypescript(client, './interface.ts')
    }
    catch (e) {
        console.log(e)
    }

    let close = false;

    process.on('SIGINT', () => { close = true; })
    process.on('SIGTERM', () => { close = true; })
    process.on('SIGQUIT', () => { close = true; })

    while (true) {
        await sleep(0);
        if (client.running === false || close) break;
    }

    //client.close()
    console.log("Closing app")
}