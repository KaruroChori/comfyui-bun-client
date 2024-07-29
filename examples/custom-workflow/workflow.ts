import { Workflow } from "./interface.ts"

const tmp = Workflow();

const nodeA = new tmp.LoadImage({ image: "QSCF8096.JPG" })


export const workflow = tmp.$compile()