# ComfyUI client for bun

> [!IMPORTANT]  
> Please, be mindful that this library is specifically designed to only work with typescript and on the [bun](https://bun.sh/).
> Porting it to other runtimes is mostly trivial, however there is no plan for that.
> There is no pure javascript package as many of the advanced features like the **workflow builder** would make no sense.

This library offers several tools to interface with [comfyui](https://github.com/comfyanonymous/ComfyUI) instances from typescript.  
It consists of:

- A mostly 1-to-1 wrapper for the basic REST endpoints offered by ComfyUI.
- An abstraction for **Jobs**, with custom callbacks and utilities to simplify their deployment and collection.
- A workflow builder, allowing you to parametrize JSON workflows or to write your own leveraging the typescript type system.

## Quick start

Add the dependency for this library to your project (make sure to select the proper version):

```sh
bun add git+ssh://github.com/KaruroChori/comfyui-bun-client.git#v0.1.2
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

[Check here.](./docs/run-jobs.md)

### Define a custom workflow in TS

[Check here.](./docs/custom-workflows.md)

## For developers

Please, follow the instructions [here](./docs/developers.md).
