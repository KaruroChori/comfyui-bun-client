import { Workflow, dyn } from "./interface.ts"

export default async (client_id: string) => {

    const comfy = Workflow();

    const nodeA = new comfy.LoadImage({ image: dyn("QSCF8096.JPG") })
    const nodeB = new comfy.PreviewImage({ images: nodeA.IMAGE })

    return { workflow: await comfy.$compile(client_id), outimage: nodeB.uid };
}