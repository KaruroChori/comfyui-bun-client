# ComfyUI client for bun

> [!IMPORTANT]  
> This library is specifically designed to work with typescript and the [bun](https://bun.sh/) runtime.  
> Porting it to other runtimes is mostly trivial, however there is no plan for that right now.  
> No JS distribution is provided, as features like the **workflow builder** intrinsically rely on Typescript.

This library offers several tools to create custom clients for [comfyui](https://github.com/comfyanonymous/ComfyUI).  
It is specifically designed for headless operations and automation. It features:

- A mostly 1-to-1 wrapper for all the REST endpoints defined by ComfyUI.
- An abstraction for **jobs** with customizable callbacks over their lifetime.
- Utilities to simplify deployments, assets used for generation and the artifact collection.
- A workflow builder, to generate new workflows directly in typescript with hints and static type checking.
- A code generator that allows to take normal ComfyUI workflows and convert them into ts code.

## Quick start

To use `comfyui-bun-client` you just need to add it to your `package.json`.  
Make sure you are selecting the latest version available as this readme file might be outdated:

```sh
bun add git+ssh://github.com/KaruroChori/comfyui-bun-client.git#v0.2.15
```

There is no plan to distribute this package via `npm`. Any version which might pop up there is not endorsed.

### Minimal example

This example shows how to connect to your ComfyUI backend in debug mode, and ask for the system stats to be provided:

```ts
import {ComfyClient} from "comfyui-bun-client"
{
    //Variable with a scope-contrained lifetime
    using client = new ComfyClient(process.env.COMFY ?? 'localhost:8188', { debug: true })
    console.log(await client.system_stats())
}
```

There is a small set of examples provided as part of this repository in `./examples/` to explore any more advanced usage.

### CLI tools

> [!IMPORTANT]  
> Implementation just added in v0.2.9. Please report bugs!

This library also ships with a small CLI to perform some operations which are not related to its runtime usage:

- Generate types from a ComfyUI instance
- Generate the code by reading the workflow information embedded in the metadata of an image.

For further information about their usage check [here](./docs/cli.md).

### Define a custom workflow in TS

Workflows can be directly written in typescript!  
Type hints are supported and `tsc` can be used to statically check if your custom workflow is (likely) sound.  
[Check here](./docs/custom-workflows.md) for the relevant documentation & examples.

Unlike the main UI based on [litegraph](https://github.com/jagenjo/litegraph.js) which uses groups to organize complex workflows, as it is just TS code you can freely structure components as functions or classes.  
You might even be able to bind some react-like library and write workflows as `jsx` files, but I have not explored this option.

I plan on having a small collection of workflows as part of this package in `./workflows`.  
Feel free to send submissions, but please check the [README](./workflows/README.md) first.

### Run a full sequence of jobs

[Check here](./docs/run-jobs.md).

## Information for developers

If you want to contribute to this project, or you need more details about the implementation, I wrote some notes [here](./docs/developers.md).

## Milestones

You can find information about what is expected in future releases [here](./TODO.md).  
Please, keep in mind those plans are subject to change at any point in time.
