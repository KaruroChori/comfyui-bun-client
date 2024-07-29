# ComfyUI client for bun

> [!IMPORTANT]  
> This library is specifically designed to work with typescript and the [bun](https://bun.sh/) runtime.  
> Porting it to other runtimes is mostly trivial, however there is no current plan for that.  
> No javascript distribution is provided as some features like the **workflow builder** do require typescript.

This library offers several tools to create custom clients for [comfyui](https://github.com/comfyanonymous/ComfyUI).  
It consists of:

- A mostly 1-to-1 wrapper for all of the REST endpoints defined by ComfyUI.
- An abstraction for **Jobs**, with custom callbacks and several utilities to simplify their deployment and artifact collection.
- A workflow builder, allowing you to parametrize JSON workflows, or to write your own in typescript.

## Quick start

Add this library to your `package.json` (make sure to select the proper version from all releases):

```sh
bun add git+ssh://github.com/KaruroChori/comfyui-bun-client.git#v0.1.3
```

### Minimal example

```ts
import {ComfyClient} from "comfyui-bun-client"
{
    //Variable with a scope-contrained lifetime
    using client = new ComfyClient(process.env.COMFY ?? 'localhost:8188', { debug: true })
    console.log(await client.system_stats())
}
```

You can find more complex usage scenarios of this library documented in `./examples/`.

### Run a full sequence of jobs

[Check here.](./docs/run-jobs.md)

### Define a custom workflow in TS

[Check here.](./docs/custom-workflows.md)

## For developers

Please, follow the instructions [here](./docs/developers.md).
