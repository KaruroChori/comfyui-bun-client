> [!WARNING]  
> Custom workflow are now implemented and have been tested to be working.  
> However, this feature is quite fresh, not the normal test-suite does not cover it yet.  
> So bugs and regressions in future releases are still possible.

As a quick start, you can check the example in `examples/custom-workflow` to see how they can be implemented in your application.

## Building the `interface.ts` file

Once you have a connection defined, generating the `interface.ts` file is very simple.  
You can either do that in `bun repl`, add it a script for your application, or even better just use the CLI introduced by v0.2.9:

```
bunx comfybun gen-types ../interface.ts
```

alternatively some code like:

```ts
import { ComfyClient, ComfyJSONToTypescript } from 'comfyui-bun-client'
import { join } from "node:path"

{
    using client = new ComfyClient(process.env.COMFY ?? 'localhost:8188', { debug: false })
    await ComfyJSONToTypescript(client, join(import.meta.dir, "../interface.ts"))
}
```

## Defining the DAG

You can start building your own workflow by importing the `interface.ts` and using code completion to aid your.  
However, it can be good to start from a reference based on what you can do from the UI.  
If you have an image encoding a specific workflow you would like to use as base, the new CLI can help:

```
bunx comfybun gen-code ./image.png
```

will generate a ts file for you with the basic DAG.

The next steps are:

- To wrap it around a generator
- To mark dynamic parameters as terminal values and add string interpolations when needed
- To define the return type desired and the map of artifacts
- (optional) to provide a testsuite for it

### Wrapping

A good structure for your workflow file to be composable can be as follows:

```ts
import { Workflow, dyn } from "../interface.ts"
import type { Node } from "comfyui-bun-client"

export const workflow = async (opts:CUSTOM, ctx?: Map<number, Node>) => {
    const comfy = Workflow(ctx);

    // All node in here either manually written or code generated.

    return { workflow: comfy, /*artifacts: {fileA: nodeA.$uid, fileB: nodeB.$uid} */ };
}

//Optional test to run, you can ignore this part if not needed.
export const test = async () => {
    using client = new ComfyClient(process.env.COMFY ?? 'localhost:8188', { debug: true })
    const wf = workflow()
    const compiled = await wf.workflow.$compile(client.uid)
    const job = await client.schedule_job(compiled, [], [/*...*/]);
    await job.completion()

    //Validation on output here?
}
```

No specific structure is enforced, but you might want to define some common naming conventions for your own application and keep it consistent.

### Terminal values

Terminal values will break all type checks but are needed to pass custom values which cannot be covered by a static evaluation of the comfyui node repository.  
For example, you might have uploaded images to be used as masks in your pipeline, but they will not show up in the list of a `LoadImage` as they were not present when the interface was generated.  
In this case you can use `dyn(value)` to pass any arbitrary value.

Please, be mindful that dyn values cannot ensure any form of type checking, and it is up to you to use them properly.  
You might validate values at runtime before running the workflow using the supported interface to get information about the available files from ComfyUI.
However, right now there no helper for that.

### Compiling or not?

You can decide if you want your workflow to directly return the compiled result or not. This is shown in the examples as `examples/ts-workflow/workflows/complete.ts` vs `examples/ts-workflow/workflows/composable.ts`.  
In general, to promote the composability of workflows returning the basic object before compilation is more desirable.
