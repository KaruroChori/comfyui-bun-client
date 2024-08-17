import { Workflow, dyn } from "./interface.ts"

const comfy = Workflow();

const nodeA = new comfy.LoadImage({ image: dyn("QSCF8096.JPGs") })
const nodeB = new comfy.PreviewImage({ images: nodeA.IMAGE })

export const workflow = comfy.$compile()
