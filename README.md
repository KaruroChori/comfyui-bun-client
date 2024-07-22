# Comfyui client for bun

> [!IMPORTANT]  
> This library can only be used with typescript as I did not bother to transpile it and on the [bun](https://bun.sh/) runtime.
> It is trivial to extend or adapt it to work with other runtimes, but it is not currently planned.

A simple wrapper compatible with the [comfyui](https://github.com/comfyanonymous/ComfyUI) REST endpoints.  
It offers a mostly 1-to-1 match with the existing interface, with few enhancements or abstractions:

- for the sake of clarity deletions on the queue and history have been split in multiple functions.
- jobs are handled as abstract entities, with custom callbacks for updates, errors or completion.

At the moment there is no workflow builder provided, but it is under development.  
To see how the library can be used, please check the example provided.
