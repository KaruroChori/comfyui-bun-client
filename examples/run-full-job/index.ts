import { sleep } from 'bun'
import { BunFileToFile, ComfyClient, ComfyJSONToTypescript } from '../../index'

{
    //Variable with a scope-contrained lifetime
    using client = new ComfyClient(process.env.COMFY ?? 'localhost:8188', { debug: true })

    try {

        console.log('Waiting for prompt 1 to submit')
        {
            const wf = await client.schedule_job({ ...(await import("./assets/workflow-a.json")).default, client_id: client.uid }, [], [],
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