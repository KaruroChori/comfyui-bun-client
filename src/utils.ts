import { basename } from "node:path"

export function BunFileToFile(theBlob: Blob): File {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const b: any = theBlob;
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    b.lastModifiedDate = new Date();
    b.name = basename(theBlob.name);

    //Cast to a File() type
    return theBlob as File;
}