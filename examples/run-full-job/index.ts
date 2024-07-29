import { sleep } from 'bun'
import { ComfyClient } from '../../index'

{
    //Variable with a scope-contrained lifetime
    using client = new ComfyClient(process.env.COMFY ?? 'localhost:8188', { debug: true })

    try {

        console.log('Waiting for prompt 1 to submit')
        {
            const wf = await client.schedule_job({ ...(await import("./assets/workflow-a.json")).default, client_id: client.uid }, [], [{ from: 10, to: (x) => `./tmp/asset-${x}.png` }], {});
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

    console.log("Closing app")
}