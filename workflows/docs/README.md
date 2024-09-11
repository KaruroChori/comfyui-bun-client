Contributions of workflows are very appreciated, however there are some guidelines to follow:

- Only nodes supported in the latest version of ComfyUI mainline. Otherwise, a separate repository might be better.
- Only composable interface (no precompiled JSON as return type)
- Opinionated choices are good. If you want to define qualitative quantifiers like "HIGH" or "LOW" it is ok.
- Workflows should **really** avoid being async.
- Feel free to use already defined workflows, but make sure to check their versions to avoid breaking.
- Workflows must follow semantic versioning. If you break it, bump the major version. Major below 1 are excluded and can break at any point.

Feel free to use `example.ts` as reference for your own PR & have fun!
