> [!IMPORTANT]  
> Implementation just added in v0.2.9. Please report bugs!

> [!NOTICE]  
> Since this package is not distributed via npm, you might have to write something like `bun link comfyui-bun-runtime` in the repo to activate it first.  
> Otherwise, you can just use run the script as a normal executable.

## Sub commands

### Generating types

```
bunx comfybun gen-types DEST_FILE --url=HOST:PORT --packageName=comfyclient
```

`url` and `packageName` have sound defaults.  
If `DEST_FILE` is not specified a `workflow.ts` file will be generated locally.

### Code from image

```
bunx comfybun gen-code SOURCE_IMAGE DEST_FILE --clientName=comfy
```

`DEST_FILE` is optional, if missing the source name with `.ts` will be used.  
`clientName` is also optional and it assumes `comfy` as the default client name.
