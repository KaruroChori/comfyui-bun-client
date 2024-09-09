#!/bin/env bun
console.log('Hello world')

import { parseArgs } from "node:util";

const { values, positionals } = parseArgs({
    args: Bun.argv,
    options: {
        flag1: {
            type: 'boolean',
        },
        flag2: {
            type: 'string',
        },
    },
    strict: true,
    allowPositionals: true,
});

console.log(values);
console.log(positionals);