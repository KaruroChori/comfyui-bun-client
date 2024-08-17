import { Workflow, dyn } from "./@interface.ts"
import type { Node } from "comfyui-bun-client"

export default async ({ model, positive, negative, fast, batch }: {
    model: string,
    positive: string,
    negative?: string,
    fast?: boolean,
    batch?: number
}, ctx?: Map<number, Node>) => {
    const comfy = Workflow(ctx);

    const _model = new comfy.CheckpointLoaderSimple({ ckpt_name: dyn(model) })
    const _clip_positive = new comfy.CLIPTextEncode({ text: positive, clip: _model.CLIP })
    const _clip_negative = new comfy.CLIPTextEncode({ text: negative ?? "", clip: _model.CLIP })
    const _latent = new comfy.EmptyLatentImage({ width: 1024, height: 1024, batch_size: batch ?? 1 })
    const _iter = new comfy.KSampler({ model: _model.MODEL, positive: _clip_positive.CONDITIONING, negative: _clip_negative.CONDITIONING, scheduler: 'karras', sampler_name: 'euler', latent_image: _latent.LATENT })

    const _decode = new comfy.VAEDecode({ vae: _model.VAE, samples: _iter.LATENT })
    const _preview = new comfy.PreviewImage({ images: _decode.IMAGE })

    return { workflow: comfy, outimage: _preview.$uid };
}