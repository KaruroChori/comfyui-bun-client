import { sleep } from 'bun'
import { ComfyClient, ComfyJSONToTypescript } from 'comfyui-bun-client'

{
    //Variable with a scope-contrained lifetime
    using client = new ComfyClient(process.env.COMFY ?? 'localhost:8188', { debug: true })

    await ComfyJSONToTypescript(client, './interface.ts')

    try {

        console.log('Waiting for submission of prompt 1')
        {
            const workflow = (await import("./workflows/complete")).default
            const tmp = await workflow(client.uid)
            console.log(JSON.stringify(tmp, undefined, 4))

            const wf = await client.schedule_job(tmp.workflow, [], [{ from: tmp.outimage, to: (x) => `./tmp/asset-1-${x}.png` }], {});

        }
        console.log('Submission done for prompt 1')

        console.log('Waiting for submission of prompt 2')
        {
            const file = (await import("./workflows/composable")).default
            const workflow = (await file({ positive: "Banana", model: "Crystal-PR_rc2.safetensors" }))
            const tmp = await workflow.workflow.$compile(client.uid)
            console.log(JSON.stringify(tmp, undefined, 4))

            const wf = await client.schedule_job(tmp, [], [{ from: workflow.outimage, to: (x) => `./tmp/asset-2-${x}.png` }], {});

        }
        console.log('Submission done for prompt 2')
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