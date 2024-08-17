# ComfyUI client for bun

> [!IMPORTANT]  
> This library is specifically designed to work with typescript and the [bun](https://bun.sh/) runtime.  
> Porting it to other runtimes is mostly trivial, however there is no plan for that right now.  
> No javascript distribution is provided as some features like the **workflow builder** do require typescript.

This library offers several tools to create custom clients for [comfyui](https://github.com/comfyanonymous/ComfyUI).  
It is specifically designed for headless operation and automation.  
It consists of:

- A mostly 1-to-1 wrapper for all the REST endpoints defined by ComfyUI.
- An abstraction for **jobs**, with custom callbacks and several utilities to simplify their deployment and artifact collection.
- (beta) A workflow builder, allowing you to parametrize JSON workflows, or to write your own in typescript instead of interpolating those created via the UI.

## Quick start

Add this library to your `package.json` (make sure to select the relevant release, as this readme could be outdated):

```sh
bun add git+ssh://github.com/KaruroChori/comfyui-bun-client.git#v0.2.3
```

### Minimal example

This will connect to a ComfyUI backend in debug mode, and ask for the system stats to be provided:

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

Workflows can be directly written in typescript. Type hints are supported and `tsc` can be used to statically check if your custom workflow is (likely) sound.  
[Check here](./docs/custom-workflows.md) for the relevant documentation.

Unlike the UI which uses groups, you can use functions or classes to define any reusable sub-workflow you want.  
[This repository](https://github.com/KaruroChori/comfyui-ts-workflows) contains some which I designed for my specific applications, but you too might find them helpful.

## Information for developers

Please, follow the instructions [here](./docs/developers.md).

## Milestones

You can find information about what is expected in future releases [here](./TODO.md).  
Those plans are subject to change at any time.
