#!/bin/env bun
import { parseArgs } from "node:util";
import { ComfyClient, ComfyJSONToTypescript, GenerateTSFromJson } from "..";
import ExifReader from 'exifreader';

const { values, positionals } = parseArgs({
    args: Bun.argv,
    options: {
        packageName: {
            type: 'string',
        },
        clientName: {
            type: 'string',
        },
        url: {
            type: 'string',
        },
    },
    strict: true,
    allowPositionals: true,
});

if (positionals[2] === 'gen-types') {
    try {
        const args = {
            packageName: values.packageName,
            fileName: positionals[3] ?? './comfy-types.ts',
            comfyUrl: values.url ?? process.env.COMFY ?? 'localhost:8188'
        }
        using client = new ComfyClient(args.comfyUrl, { debug: true })
        await ComfyJSONToTypescript(client, args.fileName, args.packageName)

    } catch (e) { console.error(e) }
}

else if (positionals[2] === 'gen-code') {
    try {
        const args = {
            clientName: values.clientName,
            sourceFile: positionals[3],
            destFile: positionals[4] ?? `${positionals[3]}.ts`,
        }
        const t = await ExifReader.load(args.sourceFile)
        if (t.prompt?.value === undefined) {
            console.error("No prompt found in the metadata")
            process.exit(1)
        }

        await Bun.write(args.destFile, GenerateTSFromJson({
            prompt: JSON.parse(t.prompt.value),
            extra_data: { extra_pnginfo: { workflow: JSON.parse(t.workflow.value) } },
            client_id: ""
        }, args.clientName))
    } catch (e) { console.error(e) }
}
else {
    console.error(`Command {${positionals[2]}} not recognized.`)
    process.exit(1)
}



