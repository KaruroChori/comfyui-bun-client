import { Workflow, dyn } from "../comfy-types.ts"
import { ComfyClient, type Node } from "comfyui-bun-client"

export const version = [1, 0, 0]

/**
 * Example worflow just to show how to structure code.
 * @param opts.model name of the model 
 * @param opts.model positive prompt
 * @param opts.model optional negative prompt
 * @param opts.fast to control the number of steps
 * @param opts.model how many images to generate at the same time
 * @param ctx namespace of nodes to allow composition of workflows
 * @returns the pre-compiled workflow and a list of output nodes being exposed.
 */
export const workflow = (opts: {
    model: string,
    positive: string,
    negative?: string,
    fast?: boolean,
    batch?: number
}, ctx?: Map<number, Node>) => {
    const comfy = Workflow(ctx);

    const _model = new comfy.CheckpointLoaderSimple({ ckpt_name: dyn(opts.model) })
    const _clip_positive = new comfy.CLIPTextEncode({ text: opts.positive, clip: _model.CLIP })
    const _clip_negative = new comfy.CLIPTextEncode({ text: opts.negative ?? "", clip: _model.CLIP })
    const _latent = new comfy.EmptyLatentImage({ width: 1024, height: 1024, batch_size: opts.batch ?? 1 })
    const _iter = new comfy.KSampler({ model: _model.MODEL, positive: _clip_positive.CONDITIONING, negative: _clip_negative.CONDITIONING, scheduler: 'karras', sampler_name: 'euler', latent_image: _latent.LATENT, steps: opts.fast ? 20 : 30 })

    const _decode = new comfy.VAEDecode({ vae: _model.VAE, samples: _iter.LATENT })
    const _preview = new comfy.PreviewImage({ images: _decode.IMAGE })

    return { workflow: comfy, out: { albedo: _preview.$uid } };
}

export const test = async () => {
    using client = new ComfyClient(process.env.COMFY ?? 'localhost:8188', { debug: true })
    const wf = workflow({ model: 'sd15.safetensors', positive: 'A nice cat', })
    const compiled = await wf.workflow.$compile(client.uid)
    const job = await client.schedule_job(compiled, [], [], {});
    await job.completion()

    //Validation on output here?
}