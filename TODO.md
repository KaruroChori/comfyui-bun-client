# Upcoming

## Needed for release 0.2.15

- [ ] Companion plugin for Comfy to simplify testing.
- [ ] Optional support to add/strip metadata in the final artifacts if so desired.
- [x] Generate more of the boilerplate during code gen.

## Needed for release 0.2.17

- [ ] Add tests for the workflow building
- [ ] Add tests for ts code gen from workflow

## Needed for release 0.2.19

- [ ] Use names from the workflow for nodes during code gen.
- [ ] Better error handling when workflows fail (and related tests)

## Needed for release 0.3.x

- [ ] Add support for client-side certificates to authorize the connection with comfyui (needed for some semi-public configurations)

# Older releases

## Needed for release 0.2.13

- [x] Fixing codegen for some plugins

## Needed for release 0.2.11

- [x] Improve docs for recent features
- [x] Complete work on the workflows sub-repo

## Needed for release 0.2.9

- [x] CLI via npx/bunx
  - [x] Support for generating comfy types to file (expose comfy-types-gen)
  - [x] Support for generating workflow code from image (expose comfy-code-gen)
  - [x] Document new features

## Needed for release 0.2.7

- [x] Added support for `models/type` from updated comfy backends

## Needed for release 0.2.5

- [x] Add helper to convert a JSON workflow in its ts equivalent.
- [x] Improve examples and the related documentation

## Needed for release 0.2.3

- [x] Fixes to the default values in workflows.
- [x] Make workflows composable.

## Needed for release 0.2.1

- [x] (partial) Typebox schemas for workflows+prompts
- [x] A complete workflow builder
  - [x] Get node info from the backend
  - [x] JSON preprocessing
  - [x] Code generation (static types)
  - [x] Generated JSDOC comment headers
  - [x] Runtime compile operation
    - [x] Build DAG
    - [x] ~~Generate intermediate JSON~~ no longer needed
    - [x] Compile it into a comfyui compatible workflow

## Needed for release 0.1.5

- [x] Fix `upload_mask`, as the logic behind the `original_ref` handling is totally wrong.

## Needed for release 0.1.3

- [x] Utility functions to automatically collect artifacts and upload resources.
- [x] Add tests for the automatic functions

## Needed for release 0.1.2

- [x] JSDOC for code which has been written so far
- [x] A minimal test suite
