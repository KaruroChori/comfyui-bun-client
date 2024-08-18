> [!WARNING]  
> Custom workflow are now implemented and have been tested to be working.  
> However, this feature is quite fresh, not the normal test-suite does not cover it yet.  
> So bugs and regressions in future releases are still possible.

As a quick start, you can check the example in `examples/custom-workflow` to see how they can be implemented in your application.

## Building the `interface.ts` file

Once you have a connection defined, generating the `interface.ts` file is very simple. For example:

```ts
import { ComfyClient, ComfyJSONToTypescript } from 'comfyui-bun-client'
import { join } from "node:path"

{
    using client = new ComfyClient(process.env.COMFY ?? 'localhost:8188', { debug: false })
    await ComfyJSONToTypescript(client, join(import.meta.dir, "../interface.ts"))
}
```

## Defining the DAG

### Terminal values

Terminal values will break all type checks but are needed to pass custom values which cannot be covered by a static evaluation of the comfyui node repository.  
For example, you might have uploaded images to be used as masks in your pipeline, but they will not show up in the list of a `LoadImage` as they were not present when the interface was generated.  
In this case you can use `dyn(value)` to pass any arbitrary value.

Please, be mindful that dyn values cannot ensure any form of type checking, and it is up to you to use them properly.

## Compiling
