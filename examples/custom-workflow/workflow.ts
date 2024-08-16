import { Workflow } from "./interface.ts"

const comfy = Workflow();

const nodeA = new comfy.LoadImage({ image: "QSCF8096.JPG" })

export const workflow = comfy.$compile()
