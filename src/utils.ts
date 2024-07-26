/**
 * Standalone utils with no further specificity.
 */

import { basename } from "node:path"

export function BunFileToFile(blob: Blob, name?: string): File {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const b: any = blob;
    //Fix missing field.
    b.lastModifiedDate = new Date();
    b.name = name ?? basename(blob.name);

    return blob as File;
}
