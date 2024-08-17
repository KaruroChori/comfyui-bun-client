import { sleep } from 'bun'
import { ComfyClient } from 'comfyui-bun-client'

{
    //Variable with a scope-contrained lifetime
    using client = new ComfyClient(process.env.COMFY ?? 'localhost:8188', { debug: true })


    console.log(await client.system_stats())
    console.log(await client.embeddings())
    console.log(await client.extensions())

    try {
        //console.log(await client.view_metadata('checkpoints', 'animagineXLV3_v30.safetensors'))

        console.log('Waiting for prompt 1 to submit')
        {
            const wf = await client.schedule_job({ ...(await import("./assets/workflow-a.json")).default, client_id: client.uid }, [{ from: './assets/asset.png' }], [],
                {
                    onStart: () => {
                        console.log("Started working on 1")
                    },
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
                    onStart: () => {
                        console.log("Started working on 2")
                    },
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

    console.log("Closing app")
}