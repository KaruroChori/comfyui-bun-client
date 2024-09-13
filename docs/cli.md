> [!IMPORTANT]  
> Implementation just added in v0.2.9. Please report bugs!

> [!WARNING]  
> This package is not distributed via npm.  
> You might have to write something like `bun link comfyui-bun-runtime` in the repo to activate it first.  
> Otherwise, you can just use run the script as a normal executable.

## Sub commands

Ideally I would have used something like [commander.js](https://github.com/tj/commander.js) to handle the CLI, but I am really trying to keep external dependencies as low as possible.  
Because of that, the CLI interface is not as good as I would like, and if I need to expand it further I will probably reconsider this.

### Generating types

```
bunx comfybun gen-types DEST_FILE --url=HOST:PORT --packageName=comfyclient
```

`url` and `packageName` have sound defaults.  
If `DEST_FILE` is not specified a `comfy-types.ts` file will be generated locally.

### Code from image

```
bunx comfybun gen-code SOURCE_IMAGE DEST_FILE --clientName=comfy
```

`DEST_FILE` is optional, if missing the source name with `.ts` will be used.  
`clientName` is also optional and it assumes `comfy` as the default client name.
