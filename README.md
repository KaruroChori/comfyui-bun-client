# ComfyUI client for bun

> [!IMPORTANT]  
> Please read this disclaimer before using this library!
>
> - It can only be used with typescript: features like the **workflow builder** would make no sense in javascript, so I did not bother to partially transpile it.
> - It is based on the [bun](https://bun.sh/) runtime, so you will not be able to use it out of the box with node or deno.

This library offers several tools to interface with [comfyui](https://github.com/comfyanonymous/ComfyUI) instances from typescript.  
It consists of:

- A mostly 1-to-1 wrapper for the basic REST endpoints offered by ComfyUI.
- An abstraction for **Jobs**, with custom callbacks and utilities to simplify their deployment and collection.
- A workflow builder, allowing you to parametrize JSON workflows or to write your own leveraging the typescript type system.

## Quick start

Add the dependency to your project:

```bash
bun add git+ssh://github.com/KaruroChori/comfyui-bun-client.git#v0.1.1
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

To see how the library can be used in a more comprehensive manner, please check the example provided in `./examples/`.

### Run a full sequence of jobs

To be written

### Define a custom workflow in TS

To be written
