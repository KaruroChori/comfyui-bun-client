import { Workflow } from "./interface.ts"

const comfy = Workflow();

const nodeA = new comfy.LoadImage({ image: "QSCF8096.JPG" })
const nodeB = new comfy.PreviewImage({ images: nodeA.IMAGE })

export const workflow = comfy.$compile()
