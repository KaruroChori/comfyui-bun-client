# Upcoming

## Needed for release 0.2.3

- [ ] Document workflow generation, test and better examples
- [ ] Better error handling when workflows fail (and related tests)

## Needed for release 0.3.x

- [ ] Add support for client-side certificates to authorize the connection with comfyui (needed for some semi-public configurations)
- [ ] Add interpolation support for compiled workflows. Needed to generate many variants fast

# Older releases

## Needed for release 0.1.2

- [x] JSDOC for code which has been written so far
- [x] A minimal test suite

## Needed for release 0.1.3

- [x] Utility functions to automatically collect artifacts and upload resources.
- [x] Add tests for the automatic functions

## Needed for release 0.1.5

- [x] Fix `upload_mask`, as the logic behind the `original_ref` handling is totally wrong.

## Needed for release 0.2.1

- [x] (partial) Typebox schemas for workflows+prompts
- [ ] A complete workflow builder
  - [x] Get node info from the backend
  - [x] JSON preprocessing
  - [x] Code generation (static types)
  - [x] Generated JSDOC comment headers
  - [ ] Runtime compile operation
    - [x] Build DAG
    - [x] ~~Generate intermediate JSON~~ no longer needed
    - [x] Compile it into a comfyui compatible workflow
