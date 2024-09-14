#!/bin/env bun

import { $ } from "bun";
import { beforeAll, afterAll } from "bun:test";

beforeAll(async () => {
    // global setup
    await $`rm -rf ./test/tmp/`
    // TODO: Generate interface file in here
    // TODO: Generate worflow from test image here
    console.log('Before tests')
});

afterAll(async () => {
    // global teardown
    console.log('Post tests')
});