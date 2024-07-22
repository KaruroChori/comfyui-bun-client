# Comfyui client for bun

> [!IMPORTANT]  
> This library can only be used with typescript as I did not bother to transpile it and on the [bun](https://bun.sh/) runtime.  
> It is trivial to extend or adapt it to work with other runtimes, but it is not currently planned.

A simple typescript wrapper compatible with [comfyui](https://github.com/comfyanonymous/ComfyUI) REST endpoints.  
It offers a mostly 1-to-1 match with the existing interface, but I added some enhancements & abstractions:

- for the sake of clarity deletions on the queue and history have been split in multiple functions;
- jobs are handled as abstract entities, with custom callbacks for updates, errors or completion.

At the moment there is no _workflow builder_ provided, but it is under development.

## Quick start

Add the dependency to your project:

```bash
bun add git+ssh://github.com/KaruroChori/comfyui-bun-client.git#v0.1.0-alpha
```

```ts
import {ComfyClient} from "comfyui-bun-client"
{
    //Variable with a scope-contrained lifetime
    using client = new ComfyClient(process.env.COMFY ?? 'localhost:8188', { debug: true })
    console.log(await client.system_stats())
}
```

To see how the library can be used in a more comprehensive manner, please check the example provided in `./examples/`.
