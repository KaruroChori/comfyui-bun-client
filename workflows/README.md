## Licence

Unlike the main repo, this section is "CC0-1.0"

## Contributions

Contributions of workflows are very appreciated, however there are some guidelines to follow:

- Only nodes supported in the latest version of ComfyUI mainline. Otherwise, a separate repository might be better.
- Only composable interface (no precompiled JSON as return type)
- Workflows must follow semantic versioning. If you break it, bump the major version. Major below 1 are excluded and can break at any point.
- Workflows should **really** avoid being async.
- Opinionated choices are good! If you want to define qualitative quantifiers like "HIGH" or "LOW" it is ok. However, consistency in the language is also good, so try to match the expected behaviour of other workflows if feasible.
- Feel free to use already defined workflows, but make sure to assert their version assuming semantic versioning is followed.
- Make sure to comment the interface of your workflows unless parameters are really trivial and self-explicative.

Feel free to use `example.ts` as reference for your own PR & have fun!
