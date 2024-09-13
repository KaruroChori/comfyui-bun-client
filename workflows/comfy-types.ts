
//File automatically generated, please don't change it manually.

import { Node } from "comfyui-bun-client"

export function dyn(x: unknown) { return x as '@dyn' }
type $dyn = '@dyn'

export type STRING = string;
export type INT<min = void, max = void> = number;
export type FLOAT<min = void, max = void> = number;
export type BOOLEAN = boolean;

type ANY = 'ANY';
type LATENT = 'LATENT'
type MODEL = 'MODEL'
type CONDITIONING = 'CONDITIONING'
type CLIP = 'CLIP'
type VAE = 'VAE'
type IMAGE = 'IMAGE'
type MASK = 'MASK'
type CLIP_VISION_OUTPUT = 'CLIP_VISION_OUTPUT'
type CLIP_VISION = 'CLIP_VISION'
type STYLE_MODEL = 'STYLE_MODEL'
type CONTROL_NET = 'CONTROL_NET'
type GLIGEN = 'GLIGEN'
type UPSCALE_MODEL = 'UPSCALE_MODEL'
type SAMPLER = 'SAMPLER'
type SIGMAS = 'SIGMAS'
type GUIDER = 'GUIDER'
type NOISE = 'NOISE'
type PHOTOMAKER = 'PHOTOMAKER'
type WEBCAM = 'WEBCAM'
type AUDIO = 'AUDIO'

export const Workflow = (_ctx?: Map<number, Node>) => {
    const ctx = _ctx ?? new Map();
    const tmp = {

        /**
         * KSampler from sampling
         * @desc Uses the provided model, positive and negative conditioning to denoise the latent image.
        */
        "KSampler": class extends Node {
            //Getters
            get 'LATENT'(): LATENT { return [this.$uid.toString(), 0] as unknown as LATENT; }

            /**
              * Constructor
             * @param opts.model
             * @param opts.seed
             * @param opts.steps default: 20 max: 10000 min: 1
             * @param opts.cfg default: 8 step: 0.1
             * @param opts.sampler_name
             * @param opts.scheduler
             * @param opts.positive
             * @param opts.negative
             * @param opts.latent_image
             * @param opts.denoise default: 1 step: 0.01}
            */
            constructor(opts: {
                'model': MODEL, 'seed'?: INT, 'steps'?: INT, 'cfg'?: FLOAT, 'sampler_name': 'euler' | 'euler_cfg_pp' | 'euler_ancestral' | 'euler_ancestral_cfg_pp' | 'heun' | 'heunpp2' | 'dpm_2' | 'dpm_2_ancestral' | 'lms' | 'dpm_fast' | 'dpm_adaptive' | 'dpmpp_2s_ancestral' | 'dpmpp_sde' | 'dpmpp_sde_gpu' | 'dpmpp_2m' | 'dpmpp_2m_sde' | 'dpmpp_2m_sde_gpu' | 'dpmpp_3m_sde' | 'dpmpp_3m_sde_gpu' | 'ddpm' | 'lcm' | 'ipndm' | 'ipndm_v' | 'deis' | 'ddim' | 'uni_pc' | 'uni_pc_bh2' | $dyn, 'scheduler': 'normal' | 'karras' | 'exponential' | 'sgm_uniform' | 'simple' | 'ddim_uniform' | 'beta' | $dyn, 'positive': CONDITIONING, 'negative': CONDITIONING, 'latent_image': LATENT, 'denoise'?: FLOAT
            }) {
                super(ctx);

                super.$$link("model", opts['model'])
                super.$$link("seed", opts['seed'] ?? tmp["KSampler"].defaults['seed'])
                super.$$link("steps", opts['steps'] ?? tmp["KSampler"].defaults['steps'])
                super.$$link("cfg", opts['cfg'] ?? tmp["KSampler"].defaults['cfg'])
                super.$$link("sampler_name", opts['sampler_name'])
                super.$$link("scheduler", opts['scheduler'])
                super.$$link("positive", opts['positive'])
                super.$$link("negative", opts['negative'])
                super.$$link("latent_image", opts['latent_image'])
                super.$$link("denoise", opts['denoise'] ?? tmp["KSampler"].defaults['denoise'])
            }

            static defaults = {
                'seed': 0,
                'steps': 20,
                'cfg': 8,
                'denoise': 1
            }
            protected override $$type() {
                return "KSampler"
            }
        },

        /**
         * Load Checkpoint from loaders
         * @desc Loads a diffusion model checkpoint, diffusion models are used to denoise latents.
        */
        "CheckpointLoaderSimple": class extends Node {
            //Getters
            get 'MODEL'(): MODEL { return [this.$uid.toString(), 0] as unknown as MODEL; }
            get 'CLIP'(): CLIP { return [this.$uid.toString(), 1] as unknown as CLIP; }
            get 'VAE'(): VAE { return [this.$uid.toString(), 2] as unknown as VAE; }

            /**
              * Constructor
             * @param opts.ckpt_name}
            */
            constructor(opts: {
                'ckpt_name': $dyn
            }) {
                super(ctx);

                super.$$link("ckpt_name", opts['ckpt_name'])
            }

            static defaults = {

            }
            protected override $$type() {
                return "CheckpointLoaderSimple"
            }
        },

        /**
         * CLIP Text Encode (Prompt) from conditioning
         * @desc Encodes a text prompt using a CLIP model into an embedding that can be used to guide the diffusion model towards generating specific images.
        */
        "CLIPTextEncode": class extends Node {
            //Getters
            get 'CONDITIONING'(): CONDITIONING { return [this.$uid.toString(), 0] as unknown as CONDITIONING; }

            /**
              * Constructor
             * @param opts.text
             * @param opts.clip}
            */
            constructor(opts: {
                'text': STRING, 'clip': CLIP
            }) {
                super(ctx);

                super.$$link("text", opts['text'])
                super.$$link("clip", opts['clip'])
            }

            static defaults = {

            }
            protected override $$type() {
                return "CLIPTextEncode"
            }
        },

        /**
         * CLIP Set Last Layer from conditioning
         * @desc 
        */
        "CLIPSetLastLayer": class extends Node {
            //Getters
            get 'CLIP'(): CLIP { return [this.$uid.toString(), 0] as unknown as CLIP; }

            /**
              * Constructor
             * @param opts.clip
             * @param opts.stop_at_clip_layer default: -1 max: -1 min: -24 step: 1}
            */
            constructor(opts: {
                'clip': CLIP, 'stop_at_clip_layer'?: INT
            }) {
                super(ctx);

                super.$$link("clip", opts['clip'])
                super.$$link("stop_at_clip_layer", opts['stop_at_clip_layer'] ?? tmp["CLIPSetLastLayer"].defaults['stop_at_clip_layer'])
            }

            static defaults = {
                'stop_at_clip_layer': -1
            }
            protected override $$type() {
                return "CLIPSetLastLayer"
            }
        },

        /**
         * VAE Decode from latent
         * @desc Decodes latent images back into pixel space images.
        */
        "VAEDecode": class extends Node {
            //Getters
            get 'IMAGE'(): IMAGE { return [this.$uid.toString(), 0] as unknown as IMAGE; }

            /**
              * Constructor
             * @param opts.samples
             * @param opts.vae}
            */
            constructor(opts: {
                'samples': LATENT, 'vae': VAE
            }) {
                super(ctx);

                super.$$link("samples", opts['samples'])
                super.$$link("vae", opts['vae'])
            }

            static defaults = {

            }
            protected override $$type() {
                return "VAEDecode"
            }
        },

        /**
         * VAE Encode from latent
         * @desc 
        */
        "VAEEncode": class extends Node {
            //Getters
            get 'LATENT'(): LATENT { return [this.$uid.toString(), 0] as unknown as LATENT; }

            /**
              * Constructor
             * @param opts.pixels
             * @param opts.vae}
            */
            constructor(opts: {
                'pixels': IMAGE, 'vae': VAE
            }) {
                super(ctx);

                super.$$link("pixels", opts['pixels'])
                super.$$link("vae", opts['vae'])
            }

            static defaults = {

            }
            protected override $$type() {
                return "VAEEncode"
            }
        },

        /**
         * VAE Encode (for Inpainting) from latent/inpaint
         * @desc 
        */
        "VAEEncodeForInpaint": class extends Node {
            //Getters
            get 'LATENT'(): LATENT { return [this.$uid.toString(), 0] as unknown as LATENT; }

            /**
              * Constructor
             * @param opts.pixels
             * @param opts.vae
             * @param opts.mask
             * @param opts.grow_mask_by default: 6 step: 1}
            */
            constructor(opts: {
                'pixels': IMAGE, 'vae': VAE, 'mask': MASK, 'grow_mask_by'?: INT
            }) {
                super(ctx);

                super.$$link("pixels", opts['pixels'])
                super.$$link("vae", opts['vae'])
                super.$$link("mask", opts['mask'])
                super.$$link("grow_mask_by", opts['grow_mask_by'] ?? tmp["VAEEncodeForInpaint"].defaults['grow_mask_by'])
            }

            static defaults = {
                'grow_mask_by': 6
            }
            protected override $$type() {
                return "VAEEncodeForInpaint"
            }
        },

        /**
         * Load VAE from loaders
         * @desc 
        */
        "VAELoader": class extends Node {
            //Getters
            get 'VAE'(): VAE { return [this.$uid.toString(), 0] as unknown as VAE; }

            /**
              * Constructor
             * @param opts.vae_name}
            */
            constructor(opts: {
                'vae_name': $dyn
            }) {
                super(ctx);

                super.$$link("vae_name", opts['vae_name'])
            }

            static defaults = {

            }
            protected override $$type() {
                return "VAELoader"
            }
        },

        /**
         * Empty Latent Image from latent
         * @desc Create a new batch of empty latent images to be denoised via sampling.
        */
        "EmptyLatentImage": class extends Node {
            //Getters
            get 'LATENT'(): LATENT { return [this.$uid.toString(), 0] as unknown as LATENT; }

            /**
              * Constructor
             * @param opts.width default: 512 max: 16384 min: 16 step: 8
             * @param opts.height default: 512 max: 16384 min: 16 step: 8
             * @param opts.batch_size default: 1 max: 4096 min: 1}
            */
            constructor(opts: {
                'width'?: INT, 'height'?: INT, 'batch_size'?: INT
            }) {
                super(ctx);

                super.$$link("width", opts['width'] ?? tmp["EmptyLatentImage"].defaults['width'])
                super.$$link("height", opts['height'] ?? tmp["EmptyLatentImage"].defaults['height'])
                super.$$link("batch_size", opts['batch_size'] ?? tmp["EmptyLatentImage"].defaults['batch_size'])
            }

            static defaults = {
                'width': 512,
                'height': 512,
                'batch_size': 1
            }
            protected override $$type() {
                return "EmptyLatentImage"
            }
        },

        /**
         * Upscale Latent from latent
         * @desc 
        */
        "LatentUpscale": class extends Node {
            //Getters
            get 'LATENT'(): LATENT { return [this.$uid.toString(), 0] as unknown as LATENT; }

            /**
              * Constructor
             * @param opts.samples
             * @param opts.upscale_method
             * @param opts.width default: 512 step: 8
             * @param opts.height default: 512 step: 8
             * @param opts.crop}
            */
            constructor(opts: {
                'samples': LATENT, 'upscale_method': 'nearest-exact' | 'bilinear' | 'area' | 'bicubic' | 'bislerp' | $dyn, 'width'?: INT, 'height'?: INT, 'crop': 'disabled' | 'center' | $dyn
            }) {
                super(ctx);

                super.$$link("samples", opts['samples'])
                super.$$link("upscale_method", opts['upscale_method'])
                super.$$link("width", opts['width'] ?? tmp["LatentUpscale"].defaults['width'])
                super.$$link("height", opts['height'] ?? tmp["LatentUpscale"].defaults['height'])
                super.$$link("crop", opts['crop'])
            }

            static defaults = {
                'width': 512,
                'height': 512
            }
            protected override $$type() {
                return "LatentUpscale"
            }
        },

        /**
         * Upscale Latent By from latent
         * @desc 
        */
        "LatentUpscaleBy": class extends Node {
            //Getters
            get 'LATENT'(): LATENT { return [this.$uid.toString(), 0] as unknown as LATENT; }

            /**
              * Constructor
             * @param opts.samples
             * @param opts.upscale_method
             * @param opts.scale_by default: 1.5 max: 8 min: 0.01 step: 0.01}
            */
            constructor(opts: {
                'samples': LATENT, 'upscale_method': 'nearest-exact' | 'bilinear' | 'area' | 'bicubic' | 'bislerp' | $dyn, 'scale_by'?: FLOAT
            }) {
                super(ctx);

                super.$$link("samples", opts['samples'])
                super.$$link("upscale_method", opts['upscale_method'])
                super.$$link("scale_by", opts['scale_by'] ?? tmp["LatentUpscaleBy"].defaults['scale_by'])
            }

            static defaults = {
                'scale_by': 1.5
            }
            protected override $$type() {
                return "LatentUpscaleBy"
            }
        },

        /**
         * Latent From Batch from latent/batch
         * @desc 
        */
        "LatentFromBatch": class extends Node {
            //Getters
            get 'LATENT'(): LATENT { return [this.$uid.toString(), 0] as unknown as LATENT; }

            /**
              * Constructor
             * @param opts.samples
             * @param opts.batch_index
             * @param opts.length default: 1 max: 64 min: 1}
            */
            constructor(opts: {
                'samples': LATENT, 'batch_index'?: INT, 'length'?: INT
            }) {
                super(ctx);

                super.$$link("samples", opts['samples'])
                super.$$link("batch_index", opts['batch_index'] ?? tmp["LatentFromBatch"].defaults['batch_index'])
                super.$$link("length", opts['length'] ?? tmp["LatentFromBatch"].defaults['length'])
            }

            static defaults = {
                'batch_index': 0,
                'length': 1
            }
            protected override $$type() {
                return "LatentFromBatch"
            }
        },

        /**
         * Repeat Latent Batch from latent/batch
         * @desc 
        */
        "RepeatLatentBatch": class extends Node {
            //Getters
            get 'LATENT'(): LATENT { return [this.$uid.toString(), 0] as unknown as LATENT; }

            /**
              * Constructor
             * @param opts.samples
             * @param opts.amount default: 1 max: 64 min: 1}
            */
            constructor(opts: {
                'samples': LATENT, 'amount'?: INT
            }) {
                super(ctx);

                super.$$link("samples", opts['samples'])
                super.$$link("amount", opts['amount'] ?? tmp["RepeatLatentBatch"].defaults['amount'])
            }

            static defaults = {
                'amount': 1
            }
            protected override $$type() {
                return "RepeatLatentBatch"
            }
        },

        /**
         * Save Image from image
         * @desc Saves the input images to your ComfyUI output directory.
        */
        "SaveImage": class extends Node {
            //Getters


            /**
              * Constructor
             * @param opts.images
             * @param opts.filename_prefix default: "ComfyUI"}
            */
            constructor(opts: {
                'images': IMAGE, 'filename_prefix'?: STRING
            }) {
                super(ctx);

                super.$$link("images", opts['images'])
                super.$$link("filename_prefix", opts['filename_prefix'] ?? tmp["SaveImage"].defaults['filename_prefix'])
            }

            static defaults = {
                'filename_prefix': "ComfyUI"
            }
            protected override $$type() {
                return "SaveImage"
            }
        },

        /**
         * Preview Image from image
         * @desc Saves the input images to your ComfyUI output directory.
        */
        "PreviewImage": class extends Node {
            //Getters


            /**
              * Constructor
             * @param opts.images}
            */
            constructor(opts: {
                'images': IMAGE
            }) {
                super(ctx);

                super.$$link("images", opts['images'])
            }

            static defaults = {

            }
            protected override $$type() {
                return "PreviewImage"
            }
        },

        /**
         * Load Image from image
         * @desc 
        */
        "LoadImage": class extends Node {
            //Getters
            get 'IMAGE'(): IMAGE { return [this.$uid.toString(), 0] as unknown as IMAGE; }
            get 'MASK'(): MASK { return [this.$uid.toString(), 1] as unknown as MASK; }

            /**
              * Constructor
             * @param opts.image}
            */
            constructor(opts: {
                'image': 'example.png' | $dyn
            }) {
                super(ctx);

                super.$$link("image", opts['image'])
            }

            static defaults = {

            }
            protected override $$type() {
                return "LoadImage"
            }
        },

        /**
         * Load Image (as Mask) from mask
         * @desc 
        */
        "LoadImageMask": class extends Node {
            //Getters
            get 'MASK'(): MASK { return [this.$uid.toString(), 0] as unknown as MASK; }

            /**
              * Constructor
             * @param opts.image
             * @param opts.channel}
            */
            constructor(opts: {
                'image': 'example.png' | $dyn, 'channel': 'alpha' | 'red' | 'green' | 'blue' | $dyn
            }) {
                super(ctx);

                super.$$link("image", opts['image'])
                super.$$link("channel", opts['channel'])
            }

            static defaults = {

            }
            protected override $$type() {
                return "LoadImageMask"
            }
        },

        /**
         * Upscale Image from image/upscaling
         * @desc 
        */
        "ImageScale": class extends Node {
            //Getters
            get 'IMAGE'(): IMAGE { return [this.$uid.toString(), 0] as unknown as IMAGE; }

            /**
              * Constructor
             * @param opts.image
             * @param opts.upscale_method
             * @param opts.width default: 512 step: 1
             * @param opts.height default: 512 step: 1
             * @param opts.crop}
            */
            constructor(opts: {
                'image': IMAGE, 'upscale_method': 'nearest-exact' | 'bilinear' | 'area' | 'bicubic' | 'lanczos' | $dyn, 'width'?: INT, 'height'?: INT, 'crop': 'disabled' | 'center' | $dyn
            }) {
                super(ctx);

                super.$$link("image", opts['image'])
                super.$$link("upscale_method", opts['upscale_method'])
                super.$$link("width", opts['width'] ?? tmp["ImageScale"].defaults['width'])
                super.$$link("height", opts['height'] ?? tmp["ImageScale"].defaults['height'])
                super.$$link("crop", opts['crop'])
            }

            static defaults = {
                'width': 512,
                'height': 512
            }
            protected override $$type() {
                return "ImageScale"
            }
        },

        /**
         * Upscale Image By from image/upscaling
         * @desc 
        */
        "ImageScaleBy": class extends Node {
            //Getters
            get 'IMAGE'(): IMAGE { return [this.$uid.toString(), 0] as unknown as IMAGE; }

            /**
              * Constructor
             * @param opts.image
             * @param opts.upscale_method
             * @param opts.scale_by default: 1 max: 8 min: 0.01 step: 0.01}
            */
            constructor(opts: {
                'image': IMAGE, 'upscale_method': 'nearest-exact' | 'bilinear' | 'area' | 'bicubic' | 'lanczos' | $dyn, 'scale_by'?: FLOAT
            }) {
                super(ctx);

                super.$$link("image", opts['image'])
                super.$$link("upscale_method", opts['upscale_method'])
                super.$$link("scale_by", opts['scale_by'] ?? tmp["ImageScaleBy"].defaults['scale_by'])
            }

            static defaults = {
                'scale_by': 1
            }
            protected override $$type() {
                return "ImageScaleBy"
            }
        },

        /**
         * Invert Image from image
         * @desc 
        */
        "ImageInvert": class extends Node {
            //Getters
            get 'IMAGE'(): IMAGE { return [this.$uid.toString(), 0] as unknown as IMAGE; }

            /**
              * Constructor
             * @param opts.image}
            */
            constructor(opts: {
                'image': IMAGE
            }) {
                super(ctx);

                super.$$link("image", opts['image'])
            }

            static defaults = {

            }
            protected override $$type() {
                return "ImageInvert"
            }
        },

        /**
         * Batch Images from image
         * @desc 
        */
        "ImageBatch": class extends Node {
            //Getters
            get 'IMAGE'(): IMAGE { return [this.$uid.toString(), 0] as unknown as IMAGE; }

            /**
              * Constructor
             * @param opts.image1
             * @param opts.image2}
            */
            constructor(opts: {
                'image1': IMAGE, 'image2': IMAGE
            }) {
                super(ctx);

                super.$$link("image1", opts['image1'])
                super.$$link("image2", opts['image2'])
            }

            static defaults = {

            }
            protected override $$type() {
                return "ImageBatch"
            }
        },

        /**
         * Pad Image for Outpainting from image
         * @desc 
        */
        "ImagePadForOutpaint": class extends Node {
            //Getters
            get 'IMAGE'(): IMAGE { return [this.$uid.toString(), 0] as unknown as IMAGE; }
            get 'MASK'(): MASK { return [this.$uid.toString(), 1] as unknown as MASK; }

            /**
              * Constructor
             * @param opts.image
             * @param opts.left step: 8
             * @param opts.top step: 8
             * @param opts.right step: 8
             * @param opts.bottom step: 8
             * @param opts.feathering default: 40 step: 1}
            */
            constructor(opts: {
                'image': IMAGE, 'left'?: INT, 'top'?: INT, 'right'?: INT, 'bottom'?: INT, 'feathering'?: INT
            }) {
                super(ctx);

                super.$$link("image", opts['image'])
                super.$$link("left", opts['left'] ?? tmp["ImagePadForOutpaint"].defaults['left'])
                super.$$link("top", opts['top'] ?? tmp["ImagePadForOutpaint"].defaults['top'])
                super.$$link("right", opts['right'] ?? tmp["ImagePadForOutpaint"].defaults['right'])
                super.$$link("bottom", opts['bottom'] ?? tmp["ImagePadForOutpaint"].defaults['bottom'])
                super.$$link("feathering", opts['feathering'] ?? tmp["ImagePadForOutpaint"].defaults['feathering'])
            }

            static defaults = {
                'left': 0,
                'top': 0,
                'right': 0,
                'bottom': 0,
                'feathering': 40
            }
            protected override $$type() {
                return "ImagePadForOutpaint"
            }
        },

        /**
         * EmptyImage from image
         * @desc 
        */
        "EmptyImage": class extends Node {
            //Getters
            get 'IMAGE'(): IMAGE { return [this.$uid.toString(), 0] as unknown as IMAGE; }

            /**
              * Constructor
             * @param opts.width default: 512 max: 16384 min: 1 step: 1
             * @param opts.height default: 512 max: 16384 min: 1 step: 1
             * @param opts.batch_size default: 1 max: 4096 min: 1
             * @param opts.color step: 1}
            */
            constructor(opts: {
                'width'?: INT, 'height'?: INT, 'batch_size'?: INT, 'color'?: INT
            }) {
                super(ctx);

                super.$$link("width", opts['width'] ?? tmp["EmptyImage"].defaults['width'])
                super.$$link("height", opts['height'] ?? tmp["EmptyImage"].defaults['height'])
                super.$$link("batch_size", opts['batch_size'] ?? tmp["EmptyImage"].defaults['batch_size'])
                super.$$link("color", opts['color'] ?? tmp["EmptyImage"].defaults['color'])
            }

            static defaults = {
                'width': 512,
                'height': 512,
                'batch_size': 1,
                'color': 0
            }
            protected override $$type() {
                return "EmptyImage"
            }
        },

        /**
         * ConditioningAverage from conditioning
         * @desc 
        */
        "ConditioningAverage": class extends Node {
            //Getters
            get 'CONDITIONING'(): CONDITIONING { return [this.$uid.toString(), 0] as unknown as CONDITIONING; }

            /**
              * Constructor
             * @param opts.conditioning_to
             * @param opts.conditioning_from
             * @param opts.conditioning_to_strength default: 1 step: 0.01}
            */
            constructor(opts: {
                'conditioning_to': CONDITIONING, 'conditioning_from': CONDITIONING, 'conditioning_to_strength'?: FLOAT
            }) {
                super(ctx);

                super.$$link("conditioning_to", opts['conditioning_to'])
                super.$$link("conditioning_from", opts['conditioning_from'])
                super.$$link("conditioning_to_strength", opts['conditioning_to_strength'] ?? tmp["ConditioningAverage"].defaults['conditioning_to_strength'])
            }

            static defaults = {
                'conditioning_to_strength': 1
            }
            protected override $$type() {
                return "ConditioningAverage"
            }
        },

        /**
         * Conditioning (Combine) from conditioning
         * @desc 
        */
        "ConditioningCombine": class extends Node {
            //Getters
            get 'CONDITIONING'(): CONDITIONING { return [this.$uid.toString(), 0] as unknown as CONDITIONING; }

            /**
              * Constructor
             * @param opts.conditioning_1
             * @param opts.conditioning_2}
            */
            constructor(opts: {
                'conditioning_1': CONDITIONING, 'conditioning_2': CONDITIONING
            }) {
                super(ctx);

                super.$$link("conditioning_1", opts['conditioning_1'])
                super.$$link("conditioning_2", opts['conditioning_2'])
            }

            static defaults = {

            }
            protected override $$type() {
                return "ConditioningCombine"
            }
        },

        /**
         * Conditioning (Concat) from conditioning
         * @desc 
        */
        "ConditioningConcat": class extends Node {
            //Getters
            get 'CONDITIONING'(): CONDITIONING { return [this.$uid.toString(), 0] as unknown as CONDITIONING; }

            /**
              * Constructor
             * @param opts.conditioning_to
             * @param opts.conditioning_from}
            */
            constructor(opts: {
                'conditioning_to': CONDITIONING, 'conditioning_from': CONDITIONING
            }) {
                super(ctx);

                super.$$link("conditioning_to", opts['conditioning_to'])
                super.$$link("conditioning_from", opts['conditioning_from'])
            }

            static defaults = {

            }
            protected override $$type() {
                return "ConditioningConcat"
            }
        },

        /**
         * Conditioning (Set Area) from conditioning
         * @desc 
        */
        "ConditioningSetArea": class extends Node {
            //Getters
            get 'CONDITIONING'(): CONDITIONING { return [this.$uid.toString(), 0] as unknown as CONDITIONING; }

            /**
              * Constructor
             * @param opts.conditioning
             * @param opts.width default: 64 max: 16384 min: 64 step: 8
             * @param opts.height default: 64 max: 16384 min: 64 step: 8
             * @param opts.x step: 8
             * @param opts.y step: 8
             * @param opts.strength default: 1 step: 0.01}
            */
            constructor(opts: {
                'conditioning': CONDITIONING, 'width'?: INT, 'height'?: INT, 'x'?: INT, 'y'?: INT, 'strength'?: FLOAT
            }) {
                super(ctx);

                super.$$link("conditioning", opts['conditioning'])
                super.$$link("width", opts['width'] ?? tmp["ConditioningSetArea"].defaults['width'])
                super.$$link("height", opts['height'] ?? tmp["ConditioningSetArea"].defaults['height'])
                super.$$link("x", opts['x'] ?? tmp["ConditioningSetArea"].defaults['x'])
                super.$$link("y", opts['y'] ?? tmp["ConditioningSetArea"].defaults['y'])
                super.$$link("strength", opts['strength'] ?? tmp["ConditioningSetArea"].defaults['strength'])
            }

            static defaults = {
                'width': 64,
                'height': 64,
                'x': 0,
                'y': 0,
                'strength': 1
            }
            protected override $$type() {
                return "ConditioningSetArea"
            }
        },

        /**
         * Conditioning (Set Area with Percentage) from conditioning
         * @desc 
        */
        "ConditioningSetAreaPercentage": class extends Node {
            //Getters
            get 'CONDITIONING'(): CONDITIONING { return [this.$uid.toString(), 0] as unknown as CONDITIONING; }

            /**
              * Constructor
             * @param opts.conditioning
             * @param opts.width default: 1 step: 0.01
             * @param opts.height default: 1 step: 0.01
             * @param opts.x step: 0.01
             * @param opts.y step: 0.01
             * @param opts.strength default: 1 step: 0.01}
            */
            constructor(opts: {
                'conditioning': CONDITIONING, 'width'?: FLOAT, 'height'?: FLOAT, 'x'?: FLOAT, 'y'?: FLOAT, 'strength'?: FLOAT
            }) {
                super(ctx);

                super.$$link("conditioning", opts['conditioning'])
                super.$$link("width", opts['width'] ?? tmp["ConditioningSetAreaPercentage"].defaults['width'])
                super.$$link("height", opts['height'] ?? tmp["ConditioningSetAreaPercentage"].defaults['height'])
                super.$$link("x", opts['x'] ?? tmp["ConditioningSetAreaPercentage"].defaults['x'])
                super.$$link("y", opts['y'] ?? tmp["ConditioningSetAreaPercentage"].defaults['y'])
                super.$$link("strength", opts['strength'] ?? tmp["ConditioningSetAreaPercentage"].defaults['strength'])
            }

            static defaults = {
                'width': 1,
                'height': 1,
                'x': 0,
                'y': 0,
                'strength': 1
            }
            protected override $$type() {
                return "ConditioningSetAreaPercentage"
            }
        },

        /**
         * ConditioningSetAreaStrength from conditioning
         * @desc 
        */
        "ConditioningSetAreaStrength": class extends Node {
            //Getters
            get 'CONDITIONING'(): CONDITIONING { return [this.$uid.toString(), 0] as unknown as CONDITIONING; }

            /**
              * Constructor
             * @param opts.conditioning
             * @param opts.strength default: 1 step: 0.01}
            */
            constructor(opts: {
                'conditioning': CONDITIONING, 'strength'?: FLOAT
            }) {
                super(ctx);

                super.$$link("conditioning", opts['conditioning'])
                super.$$link("strength", opts['strength'] ?? tmp["ConditioningSetAreaStrength"].defaults['strength'])
            }

            static defaults = {
                'strength': 1
            }
            protected override $$type() {
                return "ConditioningSetAreaStrength"
            }
        },

        /**
         * Conditioning (Set Mask) from conditioning
         * @desc 
        */
        "ConditioningSetMask": class extends Node {
            //Getters
            get 'CONDITIONING'(): CONDITIONING { return [this.$uid.toString(), 0] as unknown as CONDITIONING; }

            /**
              * Constructor
             * @param opts.conditioning
             * @param opts.mask
             * @param opts.strength default: 1 step: 0.01
             * @param opts.set_cond_area}
            */
            constructor(opts: {
                'conditioning': CONDITIONING, 'mask': MASK, 'strength'?: FLOAT, 'set_cond_area': 'default' | 'mask bounds' | $dyn
            }) {
                super(ctx);

                super.$$link("conditioning", opts['conditioning'])
                super.$$link("mask", opts['mask'])
                super.$$link("strength", opts['strength'] ?? tmp["ConditioningSetMask"].defaults['strength'])
                super.$$link("set_cond_area", opts['set_cond_area'])
            }

            static defaults = {
                'strength': 1
            }
            protected override $$type() {
                return "ConditioningSetMask"
            }
        },

        /**
         * KSampler (Advanced) from sampling
         * @desc 
        */
        "KSamplerAdvanced": class extends Node {
            //Getters
            get 'LATENT'(): LATENT { return [this.$uid.toString(), 0] as unknown as LATENT; }

            /**
              * Constructor
             * @param opts.model
             * @param opts.add_noise
             * @param opts.noise_seed
             * @param opts.steps default: 20 max: 10000 min: 1
             * @param opts.cfg default: 8 step: 0.1
             * @param opts.sampler_name
             * @param opts.scheduler
             * @param opts.positive
             * @param opts.negative
             * @param opts.latent_image
             * @param opts.start_at_step
             * @param opts.end_at_step default: 10000
             * @param opts.return_with_leftover_noise}
            */
            constructor(opts: {
                'model': MODEL, 'add_noise': 'enable' | 'disable' | $dyn, 'noise_seed'?: INT, 'steps'?: INT, 'cfg'?: FLOAT, 'sampler_name': 'euler' | 'euler_cfg_pp' | 'euler_ancestral' | 'euler_ancestral_cfg_pp' | 'heun' | 'heunpp2' | 'dpm_2' | 'dpm_2_ancestral' | 'lms' | 'dpm_fast' | 'dpm_adaptive' | 'dpmpp_2s_ancestral' | 'dpmpp_sde' | 'dpmpp_sde_gpu' | 'dpmpp_2m' | 'dpmpp_2m_sde' | 'dpmpp_2m_sde_gpu' | 'dpmpp_3m_sde' | 'dpmpp_3m_sde_gpu' | 'ddpm' | 'lcm' | 'ipndm' | 'ipndm_v' | 'deis' | 'ddim' | 'uni_pc' | 'uni_pc_bh2' | $dyn, 'scheduler': 'normal' | 'karras' | 'exponential' | 'sgm_uniform' | 'simple' | 'ddim_uniform' | 'beta' | $dyn, 'positive': CONDITIONING, 'negative': CONDITIONING, 'latent_image': LATENT, 'start_at_step'?: INT, 'end_at_step'?: INT, 'return_with_leftover_noise': 'disable' | 'enable' | $dyn
            }) {
                super(ctx);

                super.$$link("model", opts['model'])
                super.$$link("add_noise", opts['add_noise'])
                super.$$link("noise_seed", opts['noise_seed'] ?? tmp["KSamplerAdvanced"].defaults['noise_seed'])
                super.$$link("steps", opts['steps'] ?? tmp["KSamplerAdvanced"].defaults['steps'])
                super.$$link("cfg", opts['cfg'] ?? tmp["KSamplerAdvanced"].defaults['cfg'])
                super.$$link("sampler_name", opts['sampler_name'])
                super.$$link("scheduler", opts['scheduler'])
                super.$$link("positive", opts['positive'])
                super.$$link("negative", opts['negative'])
                super.$$link("latent_image", opts['latent_image'])
                super.$$link("start_at_step", opts['start_at_step'] ?? tmp["KSamplerAdvanced"].defaults['start_at_step'])
                super.$$link("end_at_step", opts['end_at_step'] ?? tmp["KSamplerAdvanced"].defaults['end_at_step'])
                super.$$link("return_with_leftover_noise", opts['return_with_leftover_noise'])
            }

            static defaults = {
                'noise_seed': 0,
                'steps': 20,
                'cfg': 8,
                'start_at_step': 0,
                'end_at_step': 10000
            }
            protected override $$type() {
                return "KSamplerAdvanced"
            }
        },

        /**
         * Set Latent Noise Mask from latent/inpaint
         * @desc 
        */
        "SetLatentNoiseMask": class extends Node {
            //Getters
            get 'LATENT'(): LATENT { return [this.$uid.toString(), 0] as unknown as LATENT; }

            /**
              * Constructor
             * @param opts.samples
             * @param opts.mask}
            */
            constructor(opts: {
                'samples': LATENT, 'mask': MASK
            }) {
                super(ctx);

                super.$$link("samples", opts['samples'])
                super.$$link("mask", opts['mask'])
            }

            static defaults = {

            }
            protected override $$type() {
                return "SetLatentNoiseMask"
            }
        },

        /**
         * Latent Composite from latent
         * @desc 
        */
        "LatentComposite": class extends Node {
            //Getters
            get 'LATENT'(): LATENT { return [this.$uid.toString(), 0] as unknown as LATENT; }

            /**
              * Constructor
             * @param opts.samples_to
             * @param opts.samples_from
             * @param opts.x step: 8
             * @param opts.y step: 8
             * @param opts.feather step: 8}
            */
            constructor(opts: {
                'samples_to': LATENT, 'samples_from': LATENT, 'x'?: INT, 'y'?: INT, 'feather'?: INT
            }) {
                super(ctx);

                super.$$link("samples_to", opts['samples_to'])
                super.$$link("samples_from", opts['samples_from'])
                super.$$link("x", opts['x'] ?? tmp["LatentComposite"].defaults['x'])
                super.$$link("y", opts['y'] ?? tmp["LatentComposite"].defaults['y'])
                super.$$link("feather", opts['feather'] ?? tmp["LatentComposite"].defaults['feather'])
            }

            static defaults = {
                'x': 0,
                'y': 0,
                'feather': 0
            }
            protected override $$type() {
                return "LatentComposite"
            }
        },

        /**
         * Latent Blend from _for_testing
         * @desc 
        */
        "LatentBlend": class extends Node {
            //Getters
            get 'LATENT'(): LATENT { return [this.$uid.toString(), 0] as unknown as LATENT; }

            /**
              * Constructor
             * @param opts.samples1
             * @param opts.samples2
             * @param opts.blend_factor default: 0.5 step: 0.01}
            */
            constructor(opts: {
                'samples1': LATENT, 'samples2': LATENT, 'blend_factor'?: FLOAT
            }) {
                super(ctx);

                super.$$link("samples1", opts['samples1'])
                super.$$link("samples2", opts['samples2'])
                super.$$link("blend_factor", opts['blend_factor'] ?? tmp["LatentBlend"].defaults['blend_factor'])
            }

            static defaults = {
                'blend_factor': 0.5
            }
            protected override $$type() {
                return "LatentBlend"
            }
        },

        /**
         * Rotate Latent from latent/transform
         * @desc 
        */
        "LatentRotate": class extends Node {
            //Getters
            get 'LATENT'(): LATENT { return [this.$uid.toString(), 0] as unknown as LATENT; }

            /**
              * Constructor
             * @param opts.samples
             * @param opts.rotation}
            */
            constructor(opts: {
                'samples': LATENT, 'rotation': 'none' | '90 degrees' | '180 degrees' | '270 degrees' | $dyn
            }) {
                super(ctx);

                super.$$link("samples", opts['samples'])
                super.$$link("rotation", opts['rotation'])
            }

            static defaults = {

            }
            protected override $$type() {
                return "LatentRotate"
            }
        },

        /**
         * Flip Latent from latent/transform
         * @desc 
        */
        "LatentFlip": class extends Node {
            //Getters
            get 'LATENT'(): LATENT { return [this.$uid.toString(), 0] as unknown as LATENT; }

            /**
              * Constructor
             * @param opts.samples
             * @param opts.flip_method}
            */
            constructor(opts: {
                'samples': LATENT, 'flip_method': 'x-axis: vertically' | 'y-axis: horizontally' | $dyn
            }) {
                super(ctx);

                super.$$link("samples", opts['samples'])
                super.$$link("flip_method", opts['flip_method'])
            }

            static defaults = {

            }
            protected override $$type() {
                return "LatentFlip"
            }
        },

        /**
         * Crop Latent from latent/transform
         * @desc 
        */
        "LatentCrop": class extends Node {
            //Getters
            get 'LATENT'(): LATENT { return [this.$uid.toString(), 0] as unknown as LATENT; }

            /**
              * Constructor
             * @param opts.samples
             * @param opts.width default: 512 max: 16384 min: 64 step: 8
             * @param opts.height default: 512 max: 16384 min: 64 step: 8
             * @param opts.x step: 8
             * @param opts.y step: 8}
            */
            constructor(opts: {
                'samples': LATENT, 'width'?: INT, 'height'?: INT, 'x'?: INT, 'y'?: INT
            }) {
                super(ctx);

                super.$$link("samples", opts['samples'])
                super.$$link("width", opts['width'] ?? tmp["LatentCrop"].defaults['width'])
                super.$$link("height", opts['height'] ?? tmp["LatentCrop"].defaults['height'])
                super.$$link("x", opts['x'] ?? tmp["LatentCrop"].defaults['x'])
                super.$$link("y", opts['y'] ?? tmp["LatentCrop"].defaults['y'])
            }

            static defaults = {
                'width': 512,
                'height': 512,
                'x': 0,
                'y': 0
            }
            protected override $$type() {
                return "LatentCrop"
            }
        },

        /**
         * Load LoRA from loaders
         * @desc LoRAs are used to modify diffusion and CLIP models, altering the way in which latents are denoised such as applying styles. Multiple LoRA nodes can be linked together.
        */
        "LoraLoader": class extends Node {
            //Getters
            get 'MODEL'(): MODEL { return [this.$uid.toString(), 0] as unknown as MODEL; }
            get 'CLIP'(): CLIP { return [this.$uid.toString(), 1] as unknown as CLIP; }

            /**
              * Constructor
             * @param opts.model
             * @param opts.clip
             * @param opts.lora_name
             * @param opts.strength_model default: 1 max: 100 min: -100 step: 0.01
             * @param opts.strength_clip default: 1 max: 100 min: -100 step: 0.01}
            */
            constructor(opts: {
                'model': MODEL, 'clip': CLIP, 'lora_name': $dyn, 'strength_model'?: FLOAT, 'strength_clip'?: FLOAT
            }) {
                super(ctx);

                super.$$link("model", opts['model'])
                super.$$link("clip", opts['clip'])
                super.$$link("lora_name", opts['lora_name'])
                super.$$link("strength_model", opts['strength_model'] ?? tmp["LoraLoader"].defaults['strength_model'])
                super.$$link("strength_clip", opts['strength_clip'] ?? tmp["LoraLoader"].defaults['strength_clip'])
            }

            static defaults = {
                'strength_model': 1,
                'strength_clip': 1
            }
            protected override $$type() {
                return "LoraLoader"
            }
        },

        /**
         * Load CLIP from advanced/loaders
         * @desc 
        */
        "CLIPLoader": class extends Node {
            //Getters
            get 'CLIP'(): CLIP { return [this.$uid.toString(), 0] as unknown as CLIP; }

            /**
              * Constructor
             * @param opts.clip_name
             * @param opts.type}
            */
            constructor(opts: {
                'clip_name': $dyn, 'type': 'stable_diffusion' | 'stable_cascade' | 'sd3' | 'stable_audio' | $dyn
            }) {
                super(ctx);

                super.$$link("clip_name", opts['clip_name'])
                super.$$link("type", opts['type'])
            }

            static defaults = {

            }
            protected override $$type() {
                return "CLIPLoader"
            }
        },

        /**
         * Load Diffusion Model from advanced/loaders
         * @desc 
        */
        "UNETLoader": class extends Node {
            //Getters
            get 'MODEL'(): MODEL { return [this.$uid.toString(), 0] as unknown as MODEL; }

            /**
              * Constructor
             * @param opts.unet_name
             * @param opts.weight_dtype}
            */
            constructor(opts: {
                'unet_name': $dyn, 'weight_dtype': 'default' | 'fp8_e4m3fn' | 'fp8_e5m2' | $dyn
            }) {
                super(ctx);

                super.$$link("unet_name", opts['unet_name'])
                super.$$link("weight_dtype", opts['weight_dtype'])
            }

            static defaults = {

            }
            protected override $$type() {
                return "UNETLoader"
            }
        },

        /**
         * DualCLIPLoader from advanced/loaders
         * @desc 
        */
        "DualCLIPLoader": class extends Node {
            //Getters
            get 'CLIP'(): CLIP { return [this.$uid.toString(), 0] as unknown as CLIP; }

            /**
              * Constructor
             * @param opts.clip_name1
             * @param opts.clip_name2
             * @param opts.type}
            */
            constructor(opts: {
                'clip_name1': $dyn, 'clip_name2': $dyn, 'type': 'sdxl' | 'sd3' | 'flux' | $dyn
            }) {
                super(ctx);

                super.$$link("clip_name1", opts['clip_name1'])
                super.$$link("clip_name2", opts['clip_name2'])
                super.$$link("type", opts['type'])
            }

            static defaults = {

            }
            protected override $$type() {
                return "DualCLIPLoader"
            }
        },

        /**
         * CLIP Vision Encode from conditioning
         * @desc 
        */
        "CLIPVisionEncode": class extends Node {
            //Getters
            get 'CLIP_VISION_OUTPUT'(): CLIP_VISION_OUTPUT { return [this.$uid.toString(), 0] as unknown as CLIP_VISION_OUTPUT; }

            /**
              * Constructor
             * @param opts.clip_vision
             * @param opts.image}
            */
            constructor(opts: {
                'clip_vision': CLIP_VISION, 'image': IMAGE
            }) {
                super(ctx);

                super.$$link("clip_vision", opts['clip_vision'])
                super.$$link("image", opts['image'])
            }

            static defaults = {

            }
            protected override $$type() {
                return "CLIPVisionEncode"
            }
        },

        /**
         * Apply Style Model from conditioning/style_model
         * @desc 
        */
        "StyleModelApply": class extends Node {
            //Getters
            get 'CONDITIONING'(): CONDITIONING { return [this.$uid.toString(), 0] as unknown as CONDITIONING; }

            /**
              * Constructor
             * @param opts.conditioning
             * @param opts.style_model
             * @param opts.clip_vision_output}
            */
            constructor(opts: {
                'conditioning': CONDITIONING, 'style_model': STYLE_MODEL, 'clip_vision_output': CLIP_VISION_OUTPUT
            }) {
                super(ctx);

                super.$$link("conditioning", opts['conditioning'])
                super.$$link("style_model", opts['style_model'])
                super.$$link("clip_vision_output", opts['clip_vision_output'])
            }

            static defaults = {

            }
            protected override $$type() {
                return "StyleModelApply"
            }
        },

        /**
         * unCLIPConditioning from conditioning
         * @desc 
        */
        "unCLIPConditioning": class extends Node {
            //Getters
            get 'CONDITIONING'(): CONDITIONING { return [this.$uid.toString(), 0] as unknown as CONDITIONING; }

            /**
              * Constructor
             * @param opts.conditioning
             * @param opts.clip_vision_output
             * @param opts.strength default: 1 max: 10 min: -10 step: 0.01
             * @param opts.noise_augmentation step: 0.01}
            */
            constructor(opts: {
                'conditioning': CONDITIONING, 'clip_vision_output': CLIP_VISION_OUTPUT, 'strength'?: FLOAT, 'noise_augmentation'?: FLOAT
            }) {
                super(ctx);

                super.$$link("conditioning", opts['conditioning'])
                super.$$link("clip_vision_output", opts['clip_vision_output'])
                super.$$link("strength", opts['strength'] ?? tmp["unCLIPConditioning"].defaults['strength'])
                super.$$link("noise_augmentation", opts['noise_augmentation'] ?? tmp["unCLIPConditioning"].defaults['noise_augmentation'])
            }

            static defaults = {
                'strength': 1,
                'noise_augmentation': 0
            }
            protected override $$type() {
                return "unCLIPConditioning"
            }
        },

        /**
         * Apply ControlNet from conditioning/controlnet
         * @desc 
        */
        "ControlNetApply": class extends Node {
            //Getters
            get 'CONDITIONING'(): CONDITIONING { return [this.$uid.toString(), 0] as unknown as CONDITIONING; }

            /**
              * Constructor
             * @param opts.conditioning
             * @param opts.control_net
             * @param opts.image
             * @param opts.strength default: 1 step: 0.01}
            */
            constructor(opts: {
                'conditioning': CONDITIONING, 'control_net': CONTROL_NET, 'image': IMAGE, 'strength'?: FLOAT
            }) {
                super(ctx);

                super.$$link("conditioning", opts['conditioning'])
                super.$$link("control_net", opts['control_net'])
                super.$$link("image", opts['image'])
                super.$$link("strength", opts['strength'] ?? tmp["ControlNetApply"].defaults['strength'])
            }

            static defaults = {
                'strength': 1
            }
            protected override $$type() {
                return "ControlNetApply"
            }
        },

        /**
         * Apply ControlNet (Advanced) from conditioning/controlnet
         * @desc 
        */
        "ControlNetApplyAdvanced": class extends Node {
            //Getters
            get 'positive'(): CONDITIONING { return [this.$uid.toString(), 0] as unknown as CONDITIONING; }
            get 'negative'(): CONDITIONING { return [this.$uid.toString(), 1] as unknown as CONDITIONING; }

            /**
              * Constructor
             * @param opts.positive
             * @param opts.negative
             * @param opts.control_net
             * @param opts.image
             * @param opts.strength default: 1 step: 0.01
             * @param opts.start_percent step: 0.001
             * @param opts.end_percent default: 1 step: 0.001}
            */
            constructor(opts: {
                'positive': CONDITIONING, 'negative': CONDITIONING, 'control_net': CONTROL_NET, 'image': IMAGE, 'strength'?: FLOAT, 'start_percent'?: FLOAT, 'end_percent'?: FLOAT
            }) {
                super(ctx);

                super.$$link("positive", opts['positive'])
                super.$$link("negative", opts['negative'])
                super.$$link("control_net", opts['control_net'])
                super.$$link("image", opts['image'])
                super.$$link("strength", opts['strength'] ?? tmp["ControlNetApplyAdvanced"].defaults['strength'])
                super.$$link("start_percent", opts['start_percent'] ?? tmp["ControlNetApplyAdvanced"].defaults['start_percent'])
                super.$$link("end_percent", opts['end_percent'] ?? tmp["ControlNetApplyAdvanced"].defaults['end_percent'])
            }

            static defaults = {
                'strength': 1,
                'start_percent': 0,
                'end_percent': 1
            }
            protected override $$type() {
                return "ControlNetApplyAdvanced"
            }
        },

        /**
         * Load ControlNet Model from loaders
         * @desc 
        */
        "ControlNetLoader": class extends Node {
            //Getters
            get 'CONTROL_NET'(): CONTROL_NET { return [this.$uid.toString(), 0] as unknown as CONTROL_NET; }

            /**
              * Constructor
             * @param opts.control_net_name}
            */
            constructor(opts: {
                'control_net_name': $dyn
            }) {
                super(ctx);

                super.$$link("control_net_name", opts['control_net_name'])
            }

            static defaults = {

            }
            protected override $$type() {
                return "ControlNetLoader"
            }
        },

        /**
         * Load ControlNet Model (diff) from loaders
         * @desc 
        */
        "DiffControlNetLoader": class extends Node {
            //Getters
            get 'CONTROL_NET'(): CONTROL_NET { return [this.$uid.toString(), 0] as unknown as CONTROL_NET; }

            /**
              * Constructor
             * @param opts.model
             * @param opts.control_net_name}
            */
            constructor(opts: {
                'model': MODEL, 'control_net_name': $dyn
            }) {
                super(ctx);

                super.$$link("model", opts['model'])
                super.$$link("control_net_name", opts['control_net_name'])
            }

            static defaults = {

            }
            protected override $$type() {
                return "DiffControlNetLoader"
            }
        },

        /**
         * Load Style Model from loaders
         * @desc 
        */
        "StyleModelLoader": class extends Node {
            //Getters
            get 'STYLE_MODEL'(): STYLE_MODEL { return [this.$uid.toString(), 0] as unknown as STYLE_MODEL; }

            /**
              * Constructor
             * @param opts.style_model_name}
            */
            constructor(opts: {
                'style_model_name': $dyn
            }) {
                super(ctx);

                super.$$link("style_model_name", opts['style_model_name'])
            }

            static defaults = {

            }
            protected override $$type() {
                return "StyleModelLoader"
            }
        },

        /**
         * Load CLIP Vision from loaders
         * @desc 
        */
        "CLIPVisionLoader": class extends Node {
            //Getters
            get 'CLIP_VISION'(): CLIP_VISION { return [this.$uid.toString(), 0] as unknown as CLIP_VISION; }

            /**
              * Constructor
             * @param opts.clip_name}
            */
            constructor(opts: {
                'clip_name': $dyn
            }) {
                super(ctx);

                super.$$link("clip_name", opts['clip_name'])
            }

            static defaults = {

            }
            protected override $$type() {
                return "CLIPVisionLoader"
            }
        },

        /**
         * VAE Decode (Tiled) from _for_testing
         * @desc 
        */
        "VAEDecodeTiled": class extends Node {
            //Getters
            get 'IMAGE'(): IMAGE { return [this.$uid.toString(), 0] as unknown as IMAGE; }

            /**
              * Constructor
             * @param opts.samples
             * @param opts.vae
             * @param opts.tile_size default: 512 max: 4096 min: 320 step: 64}
            */
            constructor(opts: {
                'samples': LATENT, 'vae': VAE, 'tile_size'?: INT
            }) {
                super(ctx);

                super.$$link("samples", opts['samples'])
                super.$$link("vae", opts['vae'])
                super.$$link("tile_size", opts['tile_size'] ?? tmp["VAEDecodeTiled"].defaults['tile_size'])
            }

            static defaults = {
                'tile_size': 512
            }
            protected override $$type() {
                return "VAEDecodeTiled"
            }
        },

        /**
         * VAE Encode (Tiled) from _for_testing
         * @desc 
        */
        "VAEEncodeTiled": class extends Node {
            //Getters
            get 'LATENT'(): LATENT { return [this.$uid.toString(), 0] as unknown as LATENT; }

            /**
              * Constructor
             * @param opts.pixels
             * @param opts.vae
             * @param opts.tile_size default: 512 max: 4096 min: 320 step: 64}
            */
            constructor(opts: {
                'pixels': IMAGE, 'vae': VAE, 'tile_size'?: INT
            }) {
                super(ctx);

                super.$$link("pixels", opts['pixels'])
                super.$$link("vae", opts['vae'])
                super.$$link("tile_size", opts['tile_size'] ?? tmp["VAEEncodeTiled"].defaults['tile_size'])
            }

            static defaults = {
                'tile_size': 512
            }
            protected override $$type() {
                return "VAEEncodeTiled"
            }
        },

        /**
         * unCLIPCheckpointLoader from loaders
         * @desc 
        */
        "unCLIPCheckpointLoader": class extends Node {
            //Getters
            get 'MODEL'(): MODEL { return [this.$uid.toString(), 0] as unknown as MODEL; }
            get 'CLIP'(): CLIP { return [this.$uid.toString(), 1] as unknown as CLIP; }
            get 'VAE'(): VAE { return [this.$uid.toString(), 2] as unknown as VAE; }
            get 'CLIP_VISION'(): CLIP_VISION { return [this.$uid.toString(), 3] as unknown as CLIP_VISION; }

            /**
              * Constructor
             * @param opts.ckpt_name}
            */
            constructor(opts: {
                'ckpt_name': $dyn
            }) {
                super(ctx);

                super.$$link("ckpt_name", opts['ckpt_name'])
            }

            static defaults = {

            }
            protected override $$type() {
                return "unCLIPCheckpointLoader"
            }
        },

        /**
         * GLIGENLoader from loaders
         * @desc 
        */
        "GLIGENLoader": class extends Node {
            //Getters
            get 'GLIGEN'(): GLIGEN { return [this.$uid.toString(), 0] as unknown as GLIGEN; }

            /**
              * Constructor
             * @param opts.gligen_name}
            */
            constructor(opts: {
                'gligen_name': $dyn
            }) {
                super(ctx);

                super.$$link("gligen_name", opts['gligen_name'])
            }

            static defaults = {

            }
            protected override $$type() {
                return "GLIGENLoader"
            }
        },

        /**
         * GLIGENTextBoxApply from conditioning/gligen
         * @desc 
        */
        "GLIGENTextBoxApply": class extends Node {
            //Getters
            get 'CONDITIONING'(): CONDITIONING { return [this.$uid.toString(), 0] as unknown as CONDITIONING; }

            /**
              * Constructor
             * @param opts.conditioning_to
             * @param opts.clip
             * @param opts.gligen_textbox_model
             * @param opts.text
             * @param opts.width default: 64 max: 16384 min: 8 step: 8
             * @param opts.height default: 64 max: 16384 min: 8 step: 8
             * @param opts.x step: 8
             * @param opts.y step: 8}
            */
            constructor(opts: {
                'conditioning_to': CONDITIONING, 'clip': CLIP, 'gligen_textbox_model': GLIGEN, 'text': STRING, 'width'?: INT, 'height'?: INT, 'x'?: INT, 'y'?: INT
            }) {
                super(ctx);

                super.$$link("conditioning_to", opts['conditioning_to'])
                super.$$link("clip", opts['clip'])
                super.$$link("gligen_textbox_model", opts['gligen_textbox_model'])
                super.$$link("text", opts['text'])
                super.$$link("width", opts['width'] ?? tmp["GLIGENTextBoxApply"].defaults['width'])
                super.$$link("height", opts['height'] ?? tmp["GLIGENTextBoxApply"].defaults['height'])
                super.$$link("x", opts['x'] ?? tmp["GLIGENTextBoxApply"].defaults['x'])
                super.$$link("y", opts['y'] ?? tmp["GLIGENTextBoxApply"].defaults['y'])
            }

            static defaults = {
                'width': 64,
                'height': 64,
                'x': 0,
                'y': 0
            }
            protected override $$type() {
                return "GLIGENTextBoxApply"
            }
        },

        /**
         * InpaintModelConditioning from conditioning/inpaint
         * @desc 
        */
        "InpaintModelConditioning": class extends Node {
            //Getters
            get 'positive'(): CONDITIONING { return [this.$uid.toString(), 0] as unknown as CONDITIONING; }
            get 'negative'(): CONDITIONING { return [this.$uid.toString(), 1] as unknown as CONDITIONING; }
            get 'latent'(): LATENT { return [this.$uid.toString(), 2] as unknown as LATENT; }

            /**
              * Constructor
             * @param opts.positive
             * @param opts.negative
             * @param opts.vae
             * @param opts.pixels
             * @param opts.mask}
            */
            constructor(opts: {
                'positive': CONDITIONING, 'negative': CONDITIONING, 'vae': VAE, 'pixels': IMAGE, 'mask': MASK
            }) {
                super(ctx);

                super.$$link("positive", opts['positive'])
                super.$$link("negative", opts['negative'])
                super.$$link("vae", opts['vae'])
                super.$$link("pixels", opts['pixels'])
                super.$$link("mask", opts['mask'])
            }

            static defaults = {

            }
            protected override $$type() {
                return "InpaintModelConditioning"
            }
        },

        /**
         * Load Checkpoint With Config (DEPRECATED) from advanced/loaders
         * @desc 
        */
        "CheckpointLoader": class extends Node {
            //Getters
            get 'MODEL'(): MODEL { return [this.$uid.toString(), 0] as unknown as MODEL; }
            get 'CLIP'(): CLIP { return [this.$uid.toString(), 1] as unknown as CLIP; }
            get 'VAE'(): VAE { return [this.$uid.toString(), 2] as unknown as VAE; }

            /**
              * Constructor
             * @param opts.config_name
             * @param opts.ckpt_name}
            */
            constructor(opts: {
                'config_name': 'anything_v3.yaml' | 'v1-inference.yaml' | 'v1-inference_clip_skip_2.yaml' | 'v1-inference_clip_skip_2_fp16.yaml' | 'v1-inference_fp16.yaml' | 'v1-inpainting-inference.yaml' | 'v2-inference-v.yaml' | 'v2-inference-v_fp32.yaml' | 'v2-inference.yaml' | 'v2-inference_fp32.yaml' | 'v2-inpainting-inference.yaml' | $dyn, 'ckpt_name': $dyn
            }) {
                super(ctx);

                super.$$link("config_name", opts['config_name'])
                super.$$link("ckpt_name", opts['ckpt_name'])
            }

            static defaults = {

            }
            protected override $$type() {
                return "CheckpointLoader"
            }
        },

        /**
         * DiffusersLoader from advanced/loaders/deprecated
         * @desc 
        */
        "DiffusersLoader": class extends Node {
            //Getters
            get 'MODEL'(): MODEL { return [this.$uid.toString(), 0] as unknown as MODEL; }
            get 'CLIP'(): CLIP { return [this.$uid.toString(), 1] as unknown as CLIP; }
            get 'VAE'(): VAE { return [this.$uid.toString(), 2] as unknown as VAE; }

            /**
              * Constructor
             * @param opts.model_path}
            */
            constructor(opts: {
                'model_path': $dyn
            }) {
                super(ctx);

                super.$$link("model_path", opts['model_path'])
            }

            static defaults = {

            }
            protected override $$type() {
                return "DiffusersLoader"
            }
        },

        /**
         * LoadLatent from _for_testing
         * @desc 
        */
        "LoadLatent": class extends Node {
            //Getters
            get 'LATENT'(): LATENT { return [this.$uid.toString(), 0] as unknown as LATENT; }

            /**
              * Constructor
             * @param opts.latent}
            */
            constructor(opts: {
                'latent': $dyn
            }) {
                super(ctx);

                super.$$link("latent", opts['latent'])
            }

            static defaults = {

            }
            protected override $$type() {
                return "LoadLatent"
            }
        },

        /**
         * SaveLatent from _for_testing
         * @desc 
        */
        "SaveLatent": class extends Node {
            //Getters


            /**
              * Constructor
             * @param opts.samples
             * @param opts.filename_prefix default: "latents/ComfyUI"}
            */
            constructor(opts: {
                'samples': LATENT, 'filename_prefix'?: STRING
            }) {
                super(ctx);

                super.$$link("samples", opts['samples'])
                super.$$link("filename_prefix", opts['filename_prefix'] ?? tmp["SaveLatent"].defaults['filename_prefix'])
            }

            static defaults = {
                'filename_prefix': "latents/ComfyUI"
            }
            protected override $$type() {
                return "SaveLatent"
            }
        },

        /**
         * ConditioningZeroOut from advanced/conditioning
         * @desc 
        */
        "ConditioningZeroOut": class extends Node {
            //Getters
            get 'CONDITIONING'(): CONDITIONING { return [this.$uid.toString(), 0] as unknown as CONDITIONING; }

            /**
              * Constructor
             * @param opts.conditioning}
            */
            constructor(opts: {
                'conditioning': CONDITIONING
            }) {
                super(ctx);

                super.$$link("conditioning", opts['conditioning'])
            }

            static defaults = {

            }
            protected override $$type() {
                return "ConditioningZeroOut"
            }
        },

        /**
         * ConditioningSetTimestepRange from advanced/conditioning
         * @desc 
        */
        "ConditioningSetTimestepRange": class extends Node {
            //Getters
            get 'CONDITIONING'(): CONDITIONING { return [this.$uid.toString(), 0] as unknown as CONDITIONING; }

            /**
              * Constructor
             * @param opts.conditioning
             * @param opts.start step: 0.001
             * @param opts.end default: 1 step: 0.001}
            */
            constructor(opts: {
                'conditioning': CONDITIONING, 'start'?: FLOAT, 'end'?: FLOAT
            }) {
                super(ctx);

                super.$$link("conditioning", opts['conditioning'])
                super.$$link("start", opts['start'] ?? tmp["ConditioningSetTimestepRange"].defaults['start'])
                super.$$link("end", opts['end'] ?? tmp["ConditioningSetTimestepRange"].defaults['end'])
            }

            static defaults = {
                'start': 0,
                'end': 1
            }
            protected override $$type() {
                return "ConditioningSetTimestepRange"
            }
        },

        /**
         * LoraLoaderModelOnly from loaders
         * @desc LoRAs are used to modify diffusion and CLIP models, altering the way in which latents are denoised such as applying styles. Multiple LoRA nodes can be linked together.
        */
        "LoraLoaderModelOnly": class extends Node {
            //Getters
            get 'MODEL'(): MODEL { return [this.$uid.toString(), 0] as unknown as MODEL; }

            /**
              * Constructor
             * @param opts.model
             * @param opts.lora_name
             * @param opts.strength_model default: 1 max: 100 min: -100 step: 0.01}
            */
            constructor(opts: {
                'model': MODEL, 'lora_name': $dyn, 'strength_model'?: FLOAT
            }) {
                super(ctx);

                super.$$link("model", opts['model'])
                super.$$link("lora_name", opts['lora_name'])
                super.$$link("strength_model", opts['strength_model'] ?? tmp["LoraLoaderModelOnly"].defaults['strength_model'])
            }

            static defaults = {
                'strength_model': 1
            }
            protected override $$type() {
                return "LoraLoaderModelOnly"
            }
        },

        /**
         * LatentAdd from latent/advanced
         * @desc 
        */
        "LatentAdd": class extends Node {
            //Getters
            get 'LATENT'(): LATENT { return [this.$uid.toString(), 0] as unknown as LATENT; }

            /**
              * Constructor
             * @param opts.samples1
             * @param opts.samples2}
            */
            constructor(opts: {
                'samples1': LATENT, 'samples2': LATENT
            }) {
                super(ctx);

                super.$$link("samples1", opts['samples1'])
                super.$$link("samples2", opts['samples2'])
            }

            static defaults = {

            }
            protected override $$type() {
                return "LatentAdd"
            }
        },

        /**
         * LatentSubtract from latent/advanced
         * @desc 
        */
        "LatentSubtract": class extends Node {
            //Getters
            get 'LATENT'(): LATENT { return [this.$uid.toString(), 0] as unknown as LATENT; }

            /**
              * Constructor
             * @param opts.samples1
             * @param opts.samples2}
            */
            constructor(opts: {
                'samples1': LATENT, 'samples2': LATENT
            }) {
                super(ctx);

                super.$$link("samples1", opts['samples1'])
                super.$$link("samples2", opts['samples2'])
            }

            static defaults = {

            }
            protected override $$type() {
                return "LatentSubtract"
            }
        },

        /**
         * LatentMultiply from latent/advanced
         * @desc 
        */
        "LatentMultiply": class extends Node {
            //Getters
            get 'LATENT'(): LATENT { return [this.$uid.toString(), 0] as unknown as LATENT; }

            /**
              * Constructor
             * @param opts.samples
             * @param opts.multiplier default: 1 max: 10 min: -10 step: 0.01}
            */
            constructor(opts: {
                'samples': LATENT, 'multiplier'?: FLOAT
            }) {
                super(ctx);

                super.$$link("samples", opts['samples'])
                super.$$link("multiplier", opts['multiplier'] ?? tmp["LatentMultiply"].defaults['multiplier'])
            }

            static defaults = {
                'multiplier': 1
            }
            protected override $$type() {
                return "LatentMultiply"
            }
        },

        /**
         * LatentInterpolate from latent/advanced
         * @desc 
        */
        "LatentInterpolate": class extends Node {
            //Getters
            get 'LATENT'(): LATENT { return [this.$uid.toString(), 0] as unknown as LATENT; }

            /**
              * Constructor
             * @param opts.samples1
             * @param opts.samples2
             * @param opts.ratio default: 1 step: 0.01}
            */
            constructor(opts: {
                'samples1': LATENT, 'samples2': LATENT, 'ratio'?: FLOAT
            }) {
                super(ctx);

                super.$$link("samples1", opts['samples1'])
                super.$$link("samples2", opts['samples2'])
                super.$$link("ratio", opts['ratio'] ?? tmp["LatentInterpolate"].defaults['ratio'])
            }

            static defaults = {
                'ratio': 1
            }
            protected override $$type() {
                return "LatentInterpolate"
            }
        },

        /**
         * LatentBatch from latent/batch
         * @desc 
        */
        "LatentBatch": class extends Node {
            //Getters
            get 'LATENT'(): LATENT { return [this.$uid.toString(), 0] as unknown as LATENT; }

            /**
              * Constructor
             * @param opts.samples1
             * @param opts.samples2}
            */
            constructor(opts: {
                'samples1': LATENT, 'samples2': LATENT
            }) {
                super(ctx);

                super.$$link("samples1", opts['samples1'])
                super.$$link("samples2", opts['samples2'])
            }

            static defaults = {

            }
            protected override $$type() {
                return "LatentBatch"
            }
        },

        /**
         * LatentBatchSeedBehavior from latent/advanced
         * @desc 
        */
        "LatentBatchSeedBehavior": class extends Node {
            //Getters
            get 'LATENT'(): LATENT { return [this.$uid.toString(), 0] as unknown as LATENT; }

            /**
              * Constructor
             * @param opts.samples
             * @param opts.seed_behavior default: "fixed"}
            */
            constructor(opts: {
                'samples': LATENT, 'seed_behavior'?: 'random' | 'fixed' | $dyn
            }) {
                super(ctx);

                super.$$link("samples", opts['samples'])
                super.$$link("seed_behavior", opts['seed_behavior'] ?? tmp["LatentBatchSeedBehavior"].defaults['seed_behavior'])
            }

            static defaults = {
                'seed_behavior': "fixed"
            }
            protected override $$type() {
                return "LatentBatchSeedBehavior"
            }
        },

        /**
         * HypernetworkLoader from loaders
         * @desc 
        */
        "HypernetworkLoader": class extends Node {
            //Getters
            get 'MODEL'(): MODEL { return [this.$uid.toString(), 0] as unknown as MODEL; }

            /**
              * Constructor
             * @param opts.model
             * @param opts.hypernetwork_name
             * @param opts.strength default: 1 max: 10 min: -10 step: 0.01}
            */
            constructor(opts: {
                'model': MODEL, 'hypernetwork_name': $dyn, 'strength'?: FLOAT
            }) {
                super(ctx);

                super.$$link("model", opts['model'])
                super.$$link("hypernetwork_name", opts['hypernetwork_name'])
                super.$$link("strength", opts['strength'] ?? tmp["HypernetworkLoader"].defaults['strength'])
            }

            static defaults = {
                'strength': 1
            }
            protected override $$type() {
                return "HypernetworkLoader"
            }
        },

        /**
         * Load Upscale Model from loaders
         * @desc 
        */
        "UpscaleModelLoader": class extends Node {
            //Getters
            get 'UPSCALE_MODEL'(): UPSCALE_MODEL { return [this.$uid.toString(), 0] as unknown as UPSCALE_MODEL; }

            /**
              * Constructor
             * @param opts.model_name}
            */
            constructor(opts: {
                'model_name': $dyn
            }) {
                super(ctx);

                super.$$link("model_name", opts['model_name'])
            }

            static defaults = {

            }
            protected override $$type() {
                return "UpscaleModelLoader"
            }
        },

        /**
         * Upscale Image (using Model) from image/upscaling
         * @desc 
        */
        "ImageUpscaleWithModel": class extends Node {
            //Getters
            get 'IMAGE'(): IMAGE { return [this.$uid.toString(), 0] as unknown as IMAGE; }

            /**
              * Constructor
             * @param opts.upscale_model
             * @param opts.image}
            */
            constructor(opts: {
                'upscale_model': UPSCALE_MODEL, 'image': IMAGE
            }) {
                super(ctx);

                super.$$link("upscale_model", opts['upscale_model'])
                super.$$link("image", opts['image'])
            }

            static defaults = {

            }
            protected override $$type() {
                return "ImageUpscaleWithModel"
            }
        },

        /**
         * ImageBlend from image/postprocessing
         * @desc 
        */
        "ImageBlend": class extends Node {
            //Getters
            get 'IMAGE'(): IMAGE { return [this.$uid.toString(), 0] as unknown as IMAGE; }

            /**
              * Constructor
             * @param opts.image1
             * @param opts.image2
             * @param opts.blend_factor default: 0.5 step: 0.01
             * @param opts.blend_mode}
            */
            constructor(opts: {
                'image1': IMAGE, 'image2': IMAGE, 'blend_factor'?: FLOAT, 'blend_mode': 'normal' | 'multiply' | 'screen' | 'overlay' | 'soft_light' | 'difference' | $dyn
            }) {
                super(ctx);

                super.$$link("image1", opts['image1'])
                super.$$link("image2", opts['image2'])
                super.$$link("blend_factor", opts['blend_factor'] ?? tmp["ImageBlend"].defaults['blend_factor'])
                super.$$link("blend_mode", opts['blend_mode'])
            }

            static defaults = {
                'blend_factor': 0.5
            }
            protected override $$type() {
                return "ImageBlend"
            }
        },

        /**
         * ImageBlur from image/postprocessing
         * @desc 
        */
        "ImageBlur": class extends Node {
            //Getters
            get 'IMAGE'(): IMAGE { return [this.$uid.toString(), 0] as unknown as IMAGE; }

            /**
              * Constructor
             * @param opts.image
             * @param opts.blur_radius default: 1 max: 31 min: 1 step: 1
             * @param opts.sigma default: 1 max: 10 min: 0.1 step: 0.1}
            */
            constructor(opts: {
                'image': IMAGE, 'blur_radius'?: INT, 'sigma'?: FLOAT
            }) {
                super(ctx);

                super.$$link("image", opts['image'])
                super.$$link("blur_radius", opts['blur_radius'] ?? tmp["ImageBlur"].defaults['blur_radius'])
                super.$$link("sigma", opts['sigma'] ?? tmp["ImageBlur"].defaults['sigma'])
            }

            static defaults = {
                'blur_radius': 1,
                'sigma': 1
            }
            protected override $$type() {
                return "ImageBlur"
            }
        },

        /**
         * ImageQuantize from image/postprocessing
         * @desc 
        */
        "ImageQuantize": class extends Node {
            //Getters
            get 'IMAGE'(): IMAGE { return [this.$uid.toString(), 0] as unknown as IMAGE; }

            /**
              * Constructor
             * @param opts.image
             * @param opts.colors default: 256 max: 256 min: 1 step: 1
             * @param opts.dither}
            */
            constructor(opts: {
                'image': IMAGE, 'colors'?: INT, 'dither': 'none' | 'floyd-steinberg' | 'bayer-2' | 'bayer-4' | 'bayer-8' | 'bayer-16' | $dyn
            }) {
                super(ctx);

                super.$$link("image", opts['image'])
                super.$$link("colors", opts['colors'] ?? tmp["ImageQuantize"].defaults['colors'])
                super.$$link("dither", opts['dither'])
            }

            static defaults = {
                'colors': 256
            }
            protected override $$type() {
                return "ImageQuantize"
            }
        },

        /**
         * ImageSharpen from image/postprocessing
         * @desc 
        */
        "ImageSharpen": class extends Node {
            //Getters
            get 'IMAGE'(): IMAGE { return [this.$uid.toString(), 0] as unknown as IMAGE; }

            /**
              * Constructor
             * @param opts.image
             * @param opts.sharpen_radius default: 1 max: 31 min: 1 step: 1
             * @param opts.sigma default: 1 max: 10 min: 0.1 step: 0.01
             * @param opts.alpha default: 1 step: 0.01}
            */
            constructor(opts: {
                'image': IMAGE, 'sharpen_radius'?: INT, 'sigma'?: FLOAT, 'alpha'?: FLOAT
            }) {
                super(ctx);

                super.$$link("image", opts['image'])
                super.$$link("sharpen_radius", opts['sharpen_radius'] ?? tmp["ImageSharpen"].defaults['sharpen_radius'])
                super.$$link("sigma", opts['sigma'] ?? tmp["ImageSharpen"].defaults['sigma'])
                super.$$link("alpha", opts['alpha'] ?? tmp["ImageSharpen"].defaults['alpha'])
            }

            static defaults = {
                'sharpen_radius': 1,
                'sigma': 1,
                'alpha': 1
            }
            protected override $$type() {
                return "ImageSharpen"
            }
        },

        /**
         * ImageScaleToTotalPixels from image/upscaling
         * @desc 
        */
        "ImageScaleToTotalPixels": class extends Node {
            //Getters
            get 'IMAGE'(): IMAGE { return [this.$uid.toString(), 0] as unknown as IMAGE; }

            /**
              * Constructor
             * @param opts.image
             * @param opts.upscale_method
             * @param opts.megapixels default: 1 max: 16 min: 0.01 step: 0.01}
            */
            constructor(opts: {
                'image': IMAGE, 'upscale_method': 'nearest-exact' | 'bilinear' | 'area' | 'bicubic' | 'lanczos' | $dyn, 'megapixels'?: FLOAT
            }) {
                super(ctx);

                super.$$link("image", opts['image'])
                super.$$link("upscale_method", opts['upscale_method'])
                super.$$link("megapixels", opts['megapixels'] ?? tmp["ImageScaleToTotalPixels"].defaults['megapixels'])
            }

            static defaults = {
                'megapixels': 1
            }
            protected override $$type() {
                return "ImageScaleToTotalPixels"
            }
        },

        /**
         * LatentCompositeMasked from latent
         * @desc 
        */
        "LatentCompositeMasked": class extends Node {
            //Getters
            get 'LATENT'(): LATENT { return [this.$uid.toString(), 0] as unknown as LATENT; }

            /**
              * Constructor
             * @param opts.destination
             * @param opts.source
             * @param opts.x step: 8
             * @param opts.y step: 8
             * @param opts.resize_source
             * @param opts.mask}
            */
            constructor(opts: {
                'destination': LATENT, 'source': LATENT, 'x'?: INT, 'y'?: INT, 'resize_source'?: BOOLEAN, 'mask'?: MASK
            }) {
                super(ctx);

                super.$$link("destination", opts['destination'])
                super.$$link("source", opts['source'])
                super.$$link("x", opts['x'] ?? tmp["LatentCompositeMasked"].defaults['x'])
                super.$$link("y", opts['y'] ?? tmp["LatentCompositeMasked"].defaults['y'])
                super.$$link("resize_source", opts['resize_source'] ?? tmp["LatentCompositeMasked"].defaults['resize_source'])
                super.$$link("mask", opts['mask'])
            }

            static defaults = {
                'x': 0,
                'y': 0,
                'resize_source': false
            }
            protected override $$type() {
                return "LatentCompositeMasked"
            }
        },

        /**
         * ImageCompositeMasked from image
         * @desc 
        */
        "ImageCompositeMasked": class extends Node {
            //Getters
            get 'IMAGE'(): IMAGE { return [this.$uid.toString(), 0] as unknown as IMAGE; }

            /**
              * Constructor
             * @param opts.destination
             * @param opts.source
             * @param opts.x step: 1
             * @param opts.y step: 1
             * @param opts.resize_source
             * @param opts.mask}
            */
            constructor(opts: {
                'destination': IMAGE, 'source': IMAGE, 'x'?: INT, 'y'?: INT, 'resize_source'?: BOOLEAN, 'mask'?: MASK
            }) {
                super(ctx);

                super.$$link("destination", opts['destination'])
                super.$$link("source", opts['source'])
                super.$$link("x", opts['x'] ?? tmp["ImageCompositeMasked"].defaults['x'])
                super.$$link("y", opts['y'] ?? tmp["ImageCompositeMasked"].defaults['y'])
                super.$$link("resize_source", opts['resize_source'] ?? tmp["ImageCompositeMasked"].defaults['resize_source'])
                super.$$link("mask", opts['mask'])
            }

            static defaults = {
                'x': 0,
                'y': 0,
                'resize_source': false
            }
            protected override $$type() {
                return "ImageCompositeMasked"
            }
        },

        /**
         * Convert Mask to Image from mask
         * @desc 
        */
        "MaskToImage": class extends Node {
            //Getters
            get 'IMAGE'(): IMAGE { return [this.$uid.toString(), 0] as unknown as IMAGE; }

            /**
              * Constructor
             * @param opts.mask}
            */
            constructor(opts: {
                'mask': MASK
            }) {
                super(ctx);

                super.$$link("mask", opts['mask'])
            }

            static defaults = {

            }
            protected override $$type() {
                return "MaskToImage"
            }
        },

        /**
         * Convert Image to Mask from mask
         * @desc 
        */
        "ImageToMask": class extends Node {
            //Getters
            get 'MASK'(): MASK { return [this.$uid.toString(), 0] as unknown as MASK; }

            /**
              * Constructor
             * @param opts.image
             * @param opts.channel}
            */
            constructor(opts: {
                'image': IMAGE, 'channel': 'red' | 'green' | 'blue' | 'alpha' | $dyn
            }) {
                super(ctx);

                super.$$link("image", opts['image'])
                super.$$link("channel", opts['channel'])
            }

            static defaults = {

            }
            protected override $$type() {
                return "ImageToMask"
            }
        },

        /**
         * ImageColorToMask from mask
         * @desc 
        */
        "ImageColorToMask": class extends Node {
            //Getters
            get 'MASK'(): MASK { return [this.$uid.toString(), 0] as unknown as MASK; }

            /**
              * Constructor
             * @param opts.image
             * @param opts.color step: 1}
            */
            constructor(opts: {
                'image': IMAGE, 'color'?: INT
            }) {
                super(ctx);

                super.$$link("image", opts['image'])
                super.$$link("color", opts['color'] ?? tmp["ImageColorToMask"].defaults['color'])
            }

            static defaults = {
                'color': 0
            }
            protected override $$type() {
                return "ImageColorToMask"
            }
        },

        /**
         * SolidMask from mask
         * @desc 
        */
        "SolidMask": class extends Node {
            //Getters
            get 'MASK'(): MASK { return [this.$uid.toString(), 0] as unknown as MASK; }

            /**
              * Constructor
             * @param opts.value default: 1 step: 0.01
             * @param opts.width default: 512 max: 16384 min: 1 step: 1
             * @param opts.height default: 512 max: 16384 min: 1 step: 1}
            */
            constructor(opts: {
                'value'?: FLOAT, 'width'?: INT, 'height'?: INT
            }) {
                super(ctx);

                super.$$link("value", opts['value'] ?? tmp["SolidMask"].defaults['value'])
                super.$$link("width", opts['width'] ?? tmp["SolidMask"].defaults['width'])
                super.$$link("height", opts['height'] ?? tmp["SolidMask"].defaults['height'])
            }

            static defaults = {
                'value': 1,
                'width': 512,
                'height': 512
            }
            protected override $$type() {
                return "SolidMask"
            }
        },

        /**
         * InvertMask from mask
         * @desc 
        */
        "InvertMask": class extends Node {
            //Getters
            get 'MASK'(): MASK { return [this.$uid.toString(), 0] as unknown as MASK; }

            /**
              * Constructor
             * @param opts.mask}
            */
            constructor(opts: {
                'mask': MASK
            }) {
                super(ctx);

                super.$$link("mask", opts['mask'])
            }

            static defaults = {

            }
            protected override $$type() {
                return "InvertMask"
            }
        },

        /**
         * CropMask from mask
         * @desc 
        */
        "CropMask": class extends Node {
            //Getters
            get 'MASK'(): MASK { return [this.$uid.toString(), 0] as unknown as MASK; }

            /**
              * Constructor
             * @param opts.mask
             * @param opts.x step: 1
             * @param opts.y step: 1
             * @param opts.width default: 512 max: 16384 min: 1 step: 1
             * @param opts.height default: 512 max: 16384 min: 1 step: 1}
            */
            constructor(opts: {
                'mask': MASK, 'x'?: INT, 'y'?: INT, 'width'?: INT, 'height'?: INT
            }) {
                super(ctx);

                super.$$link("mask", opts['mask'])
                super.$$link("x", opts['x'] ?? tmp["CropMask"].defaults['x'])
                super.$$link("y", opts['y'] ?? tmp["CropMask"].defaults['y'])
                super.$$link("width", opts['width'] ?? tmp["CropMask"].defaults['width'])
                super.$$link("height", opts['height'] ?? tmp["CropMask"].defaults['height'])
            }

            static defaults = {
                'x': 0,
                'y': 0,
                'width': 512,
                'height': 512
            }
            protected override $$type() {
                return "CropMask"
            }
        },

        /**
         * MaskComposite from mask
         * @desc 
        */
        "MaskComposite": class extends Node {
            //Getters
            get 'MASK'(): MASK { return [this.$uid.toString(), 0] as unknown as MASK; }

            /**
              * Constructor
             * @param opts.destination
             * @param opts.source
             * @param opts.x step: 1
             * @param opts.y step: 1
             * @param opts.operation}
            */
            constructor(opts: {
                'destination': MASK, 'source': MASK, 'x'?: INT, 'y'?: INT, 'operation': 'multiply' | 'add' | 'subtract' | 'and' | 'or' | 'xor' | $dyn
            }) {
                super(ctx);

                super.$$link("destination", opts['destination'])
                super.$$link("source", opts['source'])
                super.$$link("x", opts['x'] ?? tmp["MaskComposite"].defaults['x'])
                super.$$link("y", opts['y'] ?? tmp["MaskComposite"].defaults['y'])
                super.$$link("operation", opts['operation'])
            }

            static defaults = {
                'x': 0,
                'y': 0
            }
            protected override $$type() {
                return "MaskComposite"
            }
        },

        /**
         * FeatherMask from mask
         * @desc 
        */
        "FeatherMask": class extends Node {
            //Getters
            get 'MASK'(): MASK { return [this.$uid.toString(), 0] as unknown as MASK; }

            /**
              * Constructor
             * @param opts.mask
             * @param opts.left step: 1
             * @param opts.top step: 1
             * @param opts.right step: 1
             * @param opts.bottom step: 1}
            */
            constructor(opts: {
                'mask': MASK, 'left'?: INT, 'top'?: INT, 'right'?: INT, 'bottom'?: INT
            }) {
                super(ctx);

                super.$$link("mask", opts['mask'])
                super.$$link("left", opts['left'] ?? tmp["FeatherMask"].defaults['left'])
                super.$$link("top", opts['top'] ?? tmp["FeatherMask"].defaults['top'])
                super.$$link("right", opts['right'] ?? tmp["FeatherMask"].defaults['right'])
                super.$$link("bottom", opts['bottom'] ?? tmp["FeatherMask"].defaults['bottom'])
            }

            static defaults = {
                'left': 0,
                'top': 0,
                'right': 0,
                'bottom': 0
            }
            protected override $$type() {
                return "FeatherMask"
            }
        },

        /**
         * GrowMask from mask
         * @desc 
        */
        "GrowMask": class extends Node {
            //Getters
            get 'MASK'(): MASK { return [this.$uid.toString(), 0] as unknown as MASK; }

            /**
              * Constructor
             * @param opts.mask
             * @param opts.expand max: 16384 min: -16384 step: 1
             * @param opts.tapered_corners default: true}
            */
            constructor(opts: {
                'mask': MASK, 'expand'?: INT, 'tapered_corners'?: BOOLEAN
            }) {
                super(ctx);

                super.$$link("mask", opts['mask'])
                super.$$link("expand", opts['expand'] ?? tmp["GrowMask"].defaults['expand'])
                super.$$link("tapered_corners", opts['tapered_corners'] ?? tmp["GrowMask"].defaults['tapered_corners'])
            }

            static defaults = {
                'expand': 0,
                'tapered_corners': true
            }
            protected override $$type() {
                return "GrowMask"
            }
        },

        /**
         * ThresholdMask from mask
         * @desc 
        */
        "ThresholdMask": class extends Node {
            //Getters
            get 'MASK'(): MASK { return [this.$uid.toString(), 0] as unknown as MASK; }

            /**
              * Constructor
             * @param opts.mask
             * @param opts.value default: 0.5 step: 0.01}
            */
            constructor(opts: {
                'mask': MASK, 'value'?: FLOAT
            }) {
                super(ctx);

                super.$$link("mask", opts['mask'])
                super.$$link("value", opts['value'] ?? tmp["ThresholdMask"].defaults['value'])
            }

            static defaults = {
                'value': 0.5
            }
            protected override $$type() {
                return "ThresholdMask"
            }
        },

        /**
         * Porter-Duff Image Composite from mask/compositing
         * @desc 
        */
        "PorterDuffImageComposite": class extends Node {
            //Getters
            get 'IMAGE'(): IMAGE { return [this.$uid.toString(), 0] as unknown as IMAGE; }
            get 'MASK'(): MASK { return [this.$uid.toString(), 1] as unknown as MASK; }

            /**
              * Constructor
             * @param opts.source
             * @param opts.source_alpha
             * @param opts.destination
             * @param opts.destination_alpha
             * @param opts.mode default: "DST"}
            */
            constructor(opts: {
                'source': IMAGE, 'source_alpha': MASK, 'destination': IMAGE, 'destination_alpha': MASK, 'mode'?: 'ADD' | 'CLEAR' | 'DARKEN' | 'DST' | 'DST_ATOP' | 'DST_IN' | 'DST_OUT' | 'DST_OVER' | 'LIGHTEN' | 'MULTIPLY' | 'OVERLAY' | 'SCREEN' | 'SRC' | 'SRC_ATOP' | 'SRC_IN' | 'SRC_OUT' | 'SRC_OVER' | 'XOR' | $dyn
            }) {
                super(ctx);

                super.$$link("source", opts['source'])
                super.$$link("source_alpha", opts['source_alpha'])
                super.$$link("destination", opts['destination'])
                super.$$link("destination_alpha", opts['destination_alpha'])
                super.$$link("mode", opts['mode'] ?? tmp["PorterDuffImageComposite"].defaults['mode'])
            }

            static defaults = {
                'mode': "DST"
            }
            protected override $$type() {
                return "PorterDuffImageComposite"
            }
        },

        /**
         * Split Image with Alpha from mask/compositing
         * @desc 
        */
        "SplitImageWithAlpha": class extends Node {
            //Getters
            get 'IMAGE'(): IMAGE { return [this.$uid.toString(), 0] as unknown as IMAGE; }
            get 'MASK'(): MASK { return [this.$uid.toString(), 1] as unknown as MASK; }

            /**
              * Constructor
             * @param opts.image}
            */
            constructor(opts: {
                'image': IMAGE
            }) {
                super(ctx);

                super.$$link("image", opts['image'])
            }

            static defaults = {

            }
            protected override $$type() {
                return "SplitImageWithAlpha"
            }
        },

        /**
         * Join Image with Alpha from mask/compositing
         * @desc 
        */
        "JoinImageWithAlpha": class extends Node {
            //Getters
            get 'IMAGE'(): IMAGE { return [this.$uid.toString(), 0] as unknown as IMAGE; }

            /**
              * Constructor
             * @param opts.image
             * @param opts.alpha}
            */
            constructor(opts: {
                'image': IMAGE, 'alpha': MASK
            }) {
                super(ctx);

                super.$$link("image", opts['image'])
                super.$$link("alpha", opts['alpha'])
            }

            static defaults = {

            }
            protected override $$type() {
                return "JoinImageWithAlpha"
            }
        },

        /**
         * Rebatch Latents from latent/batch
         * @desc 
        */
        "RebatchLatents": class extends Node {
            //Getters
            get 'LATENT'(): LATENT { return [this.$uid.toString(), 0] as unknown as LATENT; }

            /**
              * Constructor
             * @param opts.latents
             * @param opts.batch_size default: 1 max: 4096 min: 1}
            */
            constructor(opts: {
                'latents': LATENT, 'batch_size'?: INT
            }) {
                super(ctx);

                super.$$link("latents", opts['latents'])
                super.$$link("batch_size", opts['batch_size'] ?? tmp["RebatchLatents"].defaults['batch_size'])
            }

            static defaults = {
                'batch_size': 1
            }
            protected override $$type() {
                return "RebatchLatents"
            }
        },

        /**
         * Rebatch Images from image/batch
         * @desc 
        */
        "RebatchImages": class extends Node {
            //Getters
            get 'IMAGE'(): IMAGE { return [this.$uid.toString(), 0] as unknown as IMAGE; }

            /**
              * Constructor
             * @param opts.images
             * @param opts.batch_size default: 1 max: 4096 min: 1}
            */
            constructor(opts: {
                'images': IMAGE, 'batch_size'?: INT
            }) {
                super(ctx);

                super.$$link("images", opts['images'])
                super.$$link("batch_size", opts['batch_size'] ?? tmp["RebatchImages"].defaults['batch_size'])
            }

            static defaults = {
                'batch_size': 1
            }
            protected override $$type() {
                return "RebatchImages"
            }
        },

        /**
         * ModelMergeSimple from advanced/model_merging
         * @desc 
        */
        "ModelMergeSimple": class extends Node {
            //Getters
            get 'MODEL'(): MODEL { return [this.$uid.toString(), 0] as unknown as MODEL; }

            /**
              * Constructor
             * @param opts.model1
             * @param opts.model2
             * @param opts.ratio default: 1 step: 0.01}
            */
            constructor(opts: {
                'model1': MODEL, 'model2': MODEL, 'ratio'?: FLOAT
            }) {
                super(ctx);

                super.$$link("model1", opts['model1'])
                super.$$link("model2", opts['model2'])
                super.$$link("ratio", opts['ratio'] ?? tmp["ModelMergeSimple"].defaults['ratio'])
            }

            static defaults = {
                'ratio': 1
            }
            protected override $$type() {
                return "ModelMergeSimple"
            }
        },

        /**
         * ModelMergeBlocks from advanced/model_merging
         * @desc 
        */
        "ModelMergeBlocks": class extends Node {
            //Getters
            get 'MODEL'(): MODEL { return [this.$uid.toString(), 0] as unknown as MODEL; }

            /**
              * Constructor
             * @param opts.model1
             * @param opts.model2
             * @param opts.input default: 1 step: 0.01
             * @param opts.middle default: 1 step: 0.01
             * @param opts.out default: 1 step: 0.01}
            */
            constructor(opts: {
                'model1': MODEL, 'model2': MODEL, 'input'?: FLOAT, 'middle'?: FLOAT, 'out'?: FLOAT
            }) {
                super(ctx);

                super.$$link("model1", opts['model1'])
                super.$$link("model2", opts['model2'])
                super.$$link("input", opts['input'] ?? tmp["ModelMergeBlocks"].defaults['input'])
                super.$$link("middle", opts['middle'] ?? tmp["ModelMergeBlocks"].defaults['middle'])
                super.$$link("out", opts['out'] ?? tmp["ModelMergeBlocks"].defaults['out'])
            }

            static defaults = {
                'input': 1,
                'middle': 1,
                'out': 1
            }
            protected override $$type() {
                return "ModelMergeBlocks"
            }
        },

        /**
         * ModelMergeSubtract from advanced/model_merging
         * @desc 
        */
        "ModelMergeSubtract": class extends Node {
            //Getters
            get 'MODEL'(): MODEL { return [this.$uid.toString(), 0] as unknown as MODEL; }

            /**
              * Constructor
             * @param opts.model1
             * @param opts.model2
             * @param opts.multiplier default: 1 max: 10 min: -10 step: 0.01}
            */
            constructor(opts: {
                'model1': MODEL, 'model2': MODEL, 'multiplier'?: FLOAT
            }) {
                super(ctx);

                super.$$link("model1", opts['model1'])
                super.$$link("model2", opts['model2'])
                super.$$link("multiplier", opts['multiplier'] ?? tmp["ModelMergeSubtract"].defaults['multiplier'])
            }

            static defaults = {
                'multiplier': 1
            }
            protected override $$type() {
                return "ModelMergeSubtract"
            }
        },

        /**
         * ModelMergeAdd from advanced/model_merging
         * @desc 
        */
        "ModelMergeAdd": class extends Node {
            //Getters
            get 'MODEL'(): MODEL { return [this.$uid.toString(), 0] as unknown as MODEL; }

            /**
              * Constructor
             * @param opts.model1
             * @param opts.model2}
            */
            constructor(opts: {
                'model1': MODEL, 'model2': MODEL
            }) {
                super(ctx);

                super.$$link("model1", opts['model1'])
                super.$$link("model2", opts['model2'])
            }

            static defaults = {

            }
            protected override $$type() {
                return "ModelMergeAdd"
            }
        },

        /**
         * Save Checkpoint from advanced/model_merging
         * @desc 
        */
        "CheckpointSave": class extends Node {
            //Getters


            /**
              * Constructor
             * @param opts.model
             * @param opts.clip
             * @param opts.vae
             * @param opts.filename_prefix default: "checkpoints/ComfyUI"}
            */
            constructor(opts: {
                'model': MODEL, 'clip': CLIP, 'vae': VAE, 'filename_prefix'?: STRING
            }) {
                super(ctx);

                super.$$link("model", opts['model'])
                super.$$link("clip", opts['clip'])
                super.$$link("vae", opts['vae'])
                super.$$link("filename_prefix", opts['filename_prefix'] ?? tmp["CheckpointSave"].defaults['filename_prefix'])
            }

            static defaults = {
                'filename_prefix': "checkpoints/ComfyUI"
            }
            protected override $$type() {
                return "CheckpointSave"
            }
        },

        /**
         * CLIPMergeSimple from advanced/model_merging
         * @desc 
        */
        "CLIPMergeSimple": class extends Node {
            //Getters
            get 'CLIP'(): CLIP { return [this.$uid.toString(), 0] as unknown as CLIP; }

            /**
              * Constructor
             * @param opts.clip1
             * @param opts.clip2
             * @param opts.ratio default: 1 step: 0.01}
            */
            constructor(opts: {
                'clip1': CLIP, 'clip2': CLIP, 'ratio'?: FLOAT
            }) {
                super(ctx);

                super.$$link("clip1", opts['clip1'])
                super.$$link("clip2", opts['clip2'])
                super.$$link("ratio", opts['ratio'] ?? tmp["CLIPMergeSimple"].defaults['ratio'])
            }

            static defaults = {
                'ratio': 1
            }
            protected override $$type() {
                return "CLIPMergeSimple"
            }
        },

        /**
         * CLIPMergeSubtract from advanced/model_merging
         * @desc 
        */
        "CLIPMergeSubtract": class extends Node {
            //Getters
            get 'CLIP'(): CLIP { return [this.$uid.toString(), 0] as unknown as CLIP; }

            /**
              * Constructor
             * @param opts.clip1
             * @param opts.clip2
             * @param opts.multiplier default: 1 max: 10 min: -10 step: 0.01}
            */
            constructor(opts: {
                'clip1': CLIP, 'clip2': CLIP, 'multiplier'?: FLOAT
            }) {
                super(ctx);

                super.$$link("clip1", opts['clip1'])
                super.$$link("clip2", opts['clip2'])
                super.$$link("multiplier", opts['multiplier'] ?? tmp["CLIPMergeSubtract"].defaults['multiplier'])
            }

            static defaults = {
                'multiplier': 1
            }
            protected override $$type() {
                return "CLIPMergeSubtract"
            }
        },

        /**
         * CLIPMergeAdd from advanced/model_merging
         * @desc 
        */
        "CLIPMergeAdd": class extends Node {
            //Getters
            get 'CLIP'(): CLIP { return [this.$uid.toString(), 0] as unknown as CLIP; }

            /**
              * Constructor
             * @param opts.clip1
             * @param opts.clip2}
            */
            constructor(opts: {
                'clip1': CLIP, 'clip2': CLIP
            }) {
                super(ctx);

                super.$$link("clip1", opts['clip1'])
                super.$$link("clip2", opts['clip2'])
            }

            static defaults = {

            }
            protected override $$type() {
                return "CLIPMergeAdd"
            }
        },

        /**
         * CLIPSave from advanced/model_merging
         * @desc 
        */
        "CLIPSave": class extends Node {
            //Getters


            /**
              * Constructor
             * @param opts.clip
             * @param opts.filename_prefix default: "clip/ComfyUI"}
            */
            constructor(opts: {
                'clip': CLIP, 'filename_prefix'?: STRING
            }) {
                super(ctx);

                super.$$link("clip", opts['clip'])
                super.$$link("filename_prefix", opts['filename_prefix'] ?? tmp["CLIPSave"].defaults['filename_prefix'])
            }

            static defaults = {
                'filename_prefix': "clip/ComfyUI"
            }
            protected override $$type() {
                return "CLIPSave"
            }
        },

        /**
         * VAESave from advanced/model_merging
         * @desc 
        */
        "VAESave": class extends Node {
            //Getters


            /**
              * Constructor
             * @param opts.vae
             * @param opts.filename_prefix default: "vae/ComfyUI_vae"}
            */
            constructor(opts: {
                'vae': VAE, 'filename_prefix'?: STRING
            }) {
                super(ctx);

                super.$$link("vae", opts['vae'])
                super.$$link("filename_prefix", opts['filename_prefix'] ?? tmp["VAESave"].defaults['filename_prefix'])
            }

            static defaults = {
                'filename_prefix': "vae/ComfyUI_vae"
            }
            protected override $$type() {
                return "VAESave"
            }
        },

        /**
         * ModelSave from advanced/model_merging
         * @desc 
        */
        "ModelSave": class extends Node {
            //Getters


            /**
              * Constructor
             * @param opts.model
             * @param opts.filename_prefix default: "diffusion_models/ComfyUI"}
            */
            constructor(opts: {
                'model': MODEL, 'filename_prefix'?: STRING
            }) {
                super(ctx);

                super.$$link("model", opts['model'])
                super.$$link("filename_prefix", opts['filename_prefix'] ?? tmp["ModelSave"].defaults['filename_prefix'])
            }

            static defaults = {
                'filename_prefix': "diffusion_models/ComfyUI"
            }
            protected override $$type() {
                return "ModelSave"
            }
        },

        /**
         * TomePatchModel from _for_testing
         * @desc 
        */
        "TomePatchModel": class extends Node {
            //Getters
            get 'MODEL'(): MODEL { return [this.$uid.toString(), 0] as unknown as MODEL; }

            /**
              * Constructor
             * @param opts.model
             * @param opts.ratio default: 0.3 step: 0.01}
            */
            constructor(opts: {
                'model': MODEL, 'ratio'?: FLOAT
            }) {
                super(ctx);

                super.$$link("model", opts['model'])
                super.$$link("ratio", opts['ratio'] ?? tmp["TomePatchModel"].defaults['ratio'])
            }

            static defaults = {
                'ratio': 0.3
            }
            protected override $$type() {
                return "TomePatchModel"
            }
        },

        /**
         * CLIPTextEncodeSDXLRefiner from advanced/conditioning
         * @desc 
        */
        "CLIPTextEncodeSDXLRefiner": class extends Node {
            //Getters
            get 'CONDITIONING'(): CONDITIONING { return [this.$uid.toString(), 0] as unknown as CONDITIONING; }

            /**
              * Constructor
             * @param opts.ascore default: 6 step: 0.01
             * @param opts.width default: 1024
             * @param opts.height default: 1024
             * @param opts.text
             * @param opts.clip}
            */
            constructor(opts: {
                'ascore'?: FLOAT, 'width'?: INT, 'height'?: INT, 'text': STRING, 'clip': CLIP
            }) {
                super(ctx);

                super.$$link("ascore", opts['ascore'] ?? tmp["CLIPTextEncodeSDXLRefiner"].defaults['ascore'])
                super.$$link("width", opts['width'] ?? tmp["CLIPTextEncodeSDXLRefiner"].defaults['width'])
                super.$$link("height", opts['height'] ?? tmp["CLIPTextEncodeSDXLRefiner"].defaults['height'])
                super.$$link("text", opts['text'])
                super.$$link("clip", opts['clip'])
            }

            static defaults = {
                'ascore': 6,
                'width': 1024,
                'height': 1024
            }
            protected override $$type() {
                return "CLIPTextEncodeSDXLRefiner"
            }
        },

        /**
         * CLIPTextEncodeSDXL from advanced/conditioning
         * @desc 
        */
        "CLIPTextEncodeSDXL": class extends Node {
            //Getters
            get 'CONDITIONING'(): CONDITIONING { return [this.$uid.toString(), 0] as unknown as CONDITIONING; }

            /**
              * Constructor
             * @param opts.width default: 1024
             * @param opts.height default: 1024
             * @param opts.crop_w
             * @param opts.crop_h
             * @param opts.target_width default: 1024
             * @param opts.target_height default: 1024
             * @param opts.text_g
             * @param opts.clip
             * @param opts.text_l}
            */
            constructor(opts: {
                'width'?: INT, 'height'?: INT, 'crop_w'?: INT, 'crop_h'?: INT, 'target_width'?: INT, 'target_height'?: INT, 'text_g': STRING, 'clip': CLIP, 'text_l': STRING
            }) {
                super(ctx);

                super.$$link("width", opts['width'] ?? tmp["CLIPTextEncodeSDXL"].defaults['width'])
                super.$$link("height", opts['height'] ?? tmp["CLIPTextEncodeSDXL"].defaults['height'])
                super.$$link("crop_w", opts['crop_w'] ?? tmp["CLIPTextEncodeSDXL"].defaults['crop_w'])
                super.$$link("crop_h", opts['crop_h'] ?? tmp["CLIPTextEncodeSDXL"].defaults['crop_h'])
                super.$$link("target_width", opts['target_width'] ?? tmp["CLIPTextEncodeSDXL"].defaults['target_width'])
                super.$$link("target_height", opts['target_height'] ?? tmp["CLIPTextEncodeSDXL"].defaults['target_height'])
                super.$$link("text_g", opts['text_g'])
                super.$$link("clip", opts['clip'])
                super.$$link("text_l", opts['text_l'])
            }

            static defaults = {
                'width': 1024,
                'height': 1024,
                'crop_w': 0,
                'crop_h': 0,
                'target_width': 1024,
                'target_height': 1024
            }
            protected override $$type() {
                return "CLIPTextEncodeSDXL"
            }
        },

        /**
         * Canny from image/preprocessors
         * @desc 
        */
        "Canny": class extends Node {
            //Getters
            get 'IMAGE'(): IMAGE { return [this.$uid.toString(), 0] as unknown as IMAGE; }

            /**
              * Constructor
             * @param opts.image
             * @param opts.low_threshold default: 0.4 max: 0.99 min: 0.01 step: 0.01
             * @param opts.high_threshold default: 0.8 max: 0.99 min: 0.01 step: 0.01}
            */
            constructor(opts: {
                'image': IMAGE, 'low_threshold'?: FLOAT, 'high_threshold'?: FLOAT
            }) {
                super(ctx);

                super.$$link("image", opts['image'])
                super.$$link("low_threshold", opts['low_threshold'] ?? tmp["Canny"].defaults['low_threshold'])
                super.$$link("high_threshold", opts['high_threshold'] ?? tmp["Canny"].defaults['high_threshold'])
            }

            static defaults = {
                'low_threshold': 0.4,
                'high_threshold': 0.8
            }
            protected override $$type() {
                return "Canny"
            }
        },

        /**
         * FreeU from model_patches/unet
         * @desc 
        */
        "FreeU": class extends Node {
            //Getters
            get 'MODEL'(): MODEL { return [this.$uid.toString(), 0] as unknown as MODEL; }

            /**
              * Constructor
             * @param opts.model
             * @param opts.b1 default: 1.1 step: 0.01
             * @param opts.b2 default: 1.2 step: 0.01
             * @param opts.s1 default: 0.9 step: 0.01
             * @param opts.s2 default: 0.2 step: 0.01}
            */
            constructor(opts: {
                'model': MODEL, 'b1'?: FLOAT, 'b2'?: FLOAT, 's1'?: FLOAT, 's2'?: FLOAT
            }) {
                super(ctx);

                super.$$link("model", opts['model'])
                super.$$link("b1", opts['b1'] ?? tmp["FreeU"].defaults['b1'])
                super.$$link("b2", opts['b2'] ?? tmp["FreeU"].defaults['b2'])
                super.$$link("s1", opts['s1'] ?? tmp["FreeU"].defaults['s1'])
                super.$$link("s2", opts['s2'] ?? tmp["FreeU"].defaults['s2'])
            }

            static defaults = {
                'b1': 1.1,
                'b2': 1.2,
                's1': 0.9,
                's2': 0.2
            }
            protected override $$type() {
                return "FreeU"
            }
        },

        /**
         * FreeU_V2 from model_patches/unet
         * @desc 
        */
        "FreeU_V2": class extends Node {
            //Getters
            get 'MODEL'(): MODEL { return [this.$uid.toString(), 0] as unknown as MODEL; }

            /**
              * Constructor
             * @param opts.model
             * @param opts.b1 default: 1.3 step: 0.01
             * @param opts.b2 default: 1.4 step: 0.01
             * @param opts.s1 default: 0.9 step: 0.01
             * @param opts.s2 default: 0.2 step: 0.01}
            */
            constructor(opts: {
                'model': MODEL, 'b1'?: FLOAT, 'b2'?: FLOAT, 's1'?: FLOAT, 's2'?: FLOAT
            }) {
                super(ctx);

                super.$$link("model", opts['model'])
                super.$$link("b1", opts['b1'] ?? tmp["FreeU_V2"].defaults['b1'])
                super.$$link("b2", opts['b2'] ?? tmp["FreeU_V2"].defaults['b2'])
                super.$$link("s1", opts['s1'] ?? tmp["FreeU_V2"].defaults['s1'])
                super.$$link("s2", opts['s2'] ?? tmp["FreeU_V2"].defaults['s2'])
            }

            static defaults = {
                'b1': 1.3,
                'b2': 1.4,
                's1': 0.9,
                's2': 0.2
            }
            protected override $$type() {
                return "FreeU_V2"
            }
        },

        /**
         * SamplerCustom from sampling/custom_sampling
         * @desc 
        */
        "SamplerCustom": class extends Node {
            //Getters
            get 'output'(): LATENT { return [this.$uid.toString(), 0] as unknown as LATENT; }
            get 'denoised_output'(): LATENT { return [this.$uid.toString(), 1] as unknown as LATENT; }

            /**
              * Constructor
             * @param opts.model
             * @param opts.add_noise default: true
             * @param opts.noise_seed
             * @param opts.cfg default: 8 step: 0.1
             * @param opts.positive
             * @param opts.negative
             * @param opts.sampler
             * @param opts.sigmas
             * @param opts.latent_image}
            */
            constructor(opts: {
                'model': MODEL, 'add_noise'?: BOOLEAN, 'noise_seed'?: INT, 'cfg'?: FLOAT, 'positive': CONDITIONING, 'negative': CONDITIONING, 'sampler': SAMPLER, 'sigmas': SIGMAS, 'latent_image': LATENT
            }) {
                super(ctx);

                super.$$link("model", opts['model'])
                super.$$link("add_noise", opts['add_noise'] ?? tmp["SamplerCustom"].defaults['add_noise'])
                super.$$link("noise_seed", opts['noise_seed'] ?? tmp["SamplerCustom"].defaults['noise_seed'])
                super.$$link("cfg", opts['cfg'] ?? tmp["SamplerCustom"].defaults['cfg'])
                super.$$link("positive", opts['positive'])
                super.$$link("negative", opts['negative'])
                super.$$link("sampler", opts['sampler'])
                super.$$link("sigmas", opts['sigmas'])
                super.$$link("latent_image", opts['latent_image'])
            }

            static defaults = {
                'add_noise': true,
                'noise_seed': 0,
                'cfg': 8
            }
            protected override $$type() {
                return "SamplerCustom"
            }
        },

        /**
         * BasicScheduler from sampling/custom_sampling/schedulers
         * @desc 
        */
        "BasicScheduler": class extends Node {
            //Getters
            get 'SIGMAS'(): SIGMAS { return [this.$uid.toString(), 0] as unknown as SIGMAS; }

            /**
              * Constructor
             * @param opts.model
             * @param opts.scheduler
             * @param opts.steps default: 20 max: 10000 min: 1
             * @param opts.denoise default: 1 step: 0.01}
            */
            constructor(opts: {
                'model': MODEL, 'scheduler': 'normal' | 'karras' | 'exponential' | 'sgm_uniform' | 'simple' | 'ddim_uniform' | 'beta' | $dyn, 'steps'?: INT, 'denoise'?: FLOAT
            }) {
                super(ctx);

                super.$$link("model", opts['model'])
                super.$$link("scheduler", opts['scheduler'])
                super.$$link("steps", opts['steps'] ?? tmp["BasicScheduler"].defaults['steps'])
                super.$$link("denoise", opts['denoise'] ?? tmp["BasicScheduler"].defaults['denoise'])
            }

            static defaults = {
                'steps': 20,
                'denoise': 1
            }
            protected override $$type() {
                return "BasicScheduler"
            }
        },

        /**
         * KarrasScheduler from sampling/custom_sampling/schedulers
         * @desc 
        */
        "KarrasScheduler": class extends Node {
            //Getters
            get 'SIGMAS'(): SIGMAS { return [this.$uid.toString(), 0] as unknown as SIGMAS; }

            /**
              * Constructor
             * @param opts.steps default: 20 max: 10000 min: 1
             * @param opts.sigma_max default: 14.614642 step: 0.01
             * @param opts.sigma_min default: 0.0291675 step: 0.01
             * @param opts.rho default: 7 step: 0.01}
            */
            constructor(opts: {
                'steps'?: INT, 'sigma_max'?: FLOAT, 'sigma_min'?: FLOAT, 'rho'?: FLOAT
            }) {
                super(ctx);

                super.$$link("steps", opts['steps'] ?? tmp["KarrasScheduler"].defaults['steps'])
                super.$$link("sigma_max", opts['sigma_max'] ?? tmp["KarrasScheduler"].defaults['sigma_max'])
                super.$$link("sigma_min", opts['sigma_min'] ?? tmp["KarrasScheduler"].defaults['sigma_min'])
                super.$$link("rho", opts['rho'] ?? tmp["KarrasScheduler"].defaults['rho'])
            }

            static defaults = {
                'steps': 20,
                'sigma_max': 14.614642,
                'sigma_min': 0.0291675,
                'rho': 7
            }
            protected override $$type() {
                return "KarrasScheduler"
            }
        },

        /**
         * ExponentialScheduler from sampling/custom_sampling/schedulers
         * @desc 
        */
        "ExponentialScheduler": class extends Node {
            //Getters
            get 'SIGMAS'(): SIGMAS { return [this.$uid.toString(), 0] as unknown as SIGMAS; }

            /**
              * Constructor
             * @param opts.steps default: 20 max: 10000 min: 1
             * @param opts.sigma_max default: 14.614642 step: 0.01
             * @param opts.sigma_min default: 0.0291675 step: 0.01}
            */
            constructor(opts: {
                'steps'?: INT, 'sigma_max'?: FLOAT, 'sigma_min'?: FLOAT
            }) {
                super(ctx);

                super.$$link("steps", opts['steps'] ?? tmp["ExponentialScheduler"].defaults['steps'])
                super.$$link("sigma_max", opts['sigma_max'] ?? tmp["ExponentialScheduler"].defaults['sigma_max'])
                super.$$link("sigma_min", opts['sigma_min'] ?? tmp["ExponentialScheduler"].defaults['sigma_min'])
            }

            static defaults = {
                'steps': 20,
                'sigma_max': 14.614642,
                'sigma_min': 0.0291675
            }
            protected override $$type() {
                return "ExponentialScheduler"
            }
        },

        /**
         * PolyexponentialScheduler from sampling/custom_sampling/schedulers
         * @desc 
        */
        "PolyexponentialScheduler": class extends Node {
            //Getters
            get 'SIGMAS'(): SIGMAS { return [this.$uid.toString(), 0] as unknown as SIGMAS; }

            /**
              * Constructor
             * @param opts.steps default: 20 max: 10000 min: 1
             * @param opts.sigma_max default: 14.614642 step: 0.01
             * @param opts.sigma_min default: 0.0291675 step: 0.01
             * @param opts.rho default: 1 step: 0.01}
            */
            constructor(opts: {
                'steps'?: INT, 'sigma_max'?: FLOAT, 'sigma_min'?: FLOAT, 'rho'?: FLOAT
            }) {
                super(ctx);

                super.$$link("steps", opts['steps'] ?? tmp["PolyexponentialScheduler"].defaults['steps'])
                super.$$link("sigma_max", opts['sigma_max'] ?? tmp["PolyexponentialScheduler"].defaults['sigma_max'])
                super.$$link("sigma_min", opts['sigma_min'] ?? tmp["PolyexponentialScheduler"].defaults['sigma_min'])
                super.$$link("rho", opts['rho'] ?? tmp["PolyexponentialScheduler"].defaults['rho'])
            }

            static defaults = {
                'steps': 20,
                'sigma_max': 14.614642,
                'sigma_min': 0.0291675,
                'rho': 1
            }
            protected override $$type() {
                return "PolyexponentialScheduler"
            }
        },

        /**
         * VPScheduler from sampling/custom_sampling/schedulers
         * @desc 
        */
        "VPScheduler": class extends Node {
            //Getters
            get 'SIGMAS'(): SIGMAS { return [this.$uid.toString(), 0] as unknown as SIGMAS; }

            /**
              * Constructor
             * @param opts.steps default: 20 max: 10000 min: 1
             * @param opts.beta_d default: 19.9 step: 0.01
             * @param opts.beta_min default: 0.1 step: 0.01
             * @param opts.eps_s default: 0.001 step: 0.0001}
            */
            constructor(opts: {
                'steps'?: INT, 'beta_d'?: FLOAT, 'beta_min'?: FLOAT, 'eps_s'?: FLOAT
            }) {
                super(ctx);

                super.$$link("steps", opts['steps'] ?? tmp["VPScheduler"].defaults['steps'])
                super.$$link("beta_d", opts['beta_d'] ?? tmp["VPScheduler"].defaults['beta_d'])
                super.$$link("beta_min", opts['beta_min'] ?? tmp["VPScheduler"].defaults['beta_min'])
                super.$$link("eps_s", opts['eps_s'] ?? tmp["VPScheduler"].defaults['eps_s'])
            }

            static defaults = {
                'steps': 20,
                'beta_d': 19.9,
                'beta_min': 0.1,
                'eps_s': 0.001
            }
            protected override $$type() {
                return "VPScheduler"
            }
        },

        /**
         * BetaSamplingScheduler from sampling/custom_sampling/schedulers
         * @desc 
        */
        "BetaSamplingScheduler": class extends Node {
            //Getters
            get 'SIGMAS'(): SIGMAS { return [this.$uid.toString(), 0] as unknown as SIGMAS; }

            /**
              * Constructor
             * @param opts.model
             * @param opts.steps default: 20 max: 10000 min: 1
             * @param opts.alpha default: 0.6 step: 0.01
             * @param opts.beta default: 0.6 step: 0.01}
            */
            constructor(opts: {
                'model': MODEL, 'steps'?: INT, 'alpha'?: FLOAT, 'beta'?: FLOAT
            }) {
                super(ctx);

                super.$$link("model", opts['model'])
                super.$$link("steps", opts['steps'] ?? tmp["BetaSamplingScheduler"].defaults['steps'])
                super.$$link("alpha", opts['alpha'] ?? tmp["BetaSamplingScheduler"].defaults['alpha'])
                super.$$link("beta", opts['beta'] ?? tmp["BetaSamplingScheduler"].defaults['beta'])
            }

            static defaults = {
                'steps': 20,
                'alpha': 0.6,
                'beta': 0.6
            }
            protected override $$type() {
                return "BetaSamplingScheduler"
            }
        },

        /**
         * SDTurboScheduler from sampling/custom_sampling/schedulers
         * @desc 
        */
        "SDTurboScheduler": class extends Node {
            //Getters
            get 'SIGMAS'(): SIGMAS { return [this.$uid.toString(), 0] as unknown as SIGMAS; }

            /**
              * Constructor
             * @param opts.model
             * @param opts.steps default: 1 max: 10 min: 1
             * @param opts.denoise default: 1 step: 0.01}
            */
            constructor(opts: {
                'model': MODEL, 'steps'?: INT, 'denoise'?: FLOAT
            }) {
                super(ctx);

                super.$$link("model", opts['model'])
                super.$$link("steps", opts['steps'] ?? tmp["SDTurboScheduler"].defaults['steps'])
                super.$$link("denoise", opts['denoise'] ?? tmp["SDTurboScheduler"].defaults['denoise'])
            }

            static defaults = {
                'steps': 1,
                'denoise': 1
            }
            protected override $$type() {
                return "SDTurboScheduler"
            }
        },

        /**
         * KSamplerSelect from sampling/custom_sampling/samplers
         * @desc 
        */
        "KSamplerSelect": class extends Node {
            //Getters
            get 'SAMPLER'(): SAMPLER { return [this.$uid.toString(), 0] as unknown as SAMPLER; }

            /**
              * Constructor
             * @param opts.sampler_name}
            */
            constructor(opts: {
                'sampler_name': 'euler' | 'euler_cfg_pp' | 'euler_ancestral' | 'euler_ancestral_cfg_pp' | 'heun' | 'heunpp2' | 'dpm_2' | 'dpm_2_ancestral' | 'lms' | 'dpm_fast' | 'dpm_adaptive' | 'dpmpp_2s_ancestral' | 'dpmpp_sde' | 'dpmpp_sde_gpu' | 'dpmpp_2m' | 'dpmpp_2m_sde' | 'dpmpp_2m_sde_gpu' | 'dpmpp_3m_sde' | 'dpmpp_3m_sde_gpu' | 'ddpm' | 'lcm' | 'ipndm' | 'ipndm_v' | 'deis' | 'ddim' | 'uni_pc' | 'uni_pc_bh2' | $dyn
            }) {
                super(ctx);

                super.$$link("sampler_name", opts['sampler_name'])
            }

            static defaults = {

            }
            protected override $$type() {
                return "KSamplerSelect"
            }
        },

        /**
         * SamplerEulerAncestral from sampling/custom_sampling/samplers
         * @desc 
        */
        "SamplerEulerAncestral": class extends Node {
            //Getters
            get 'SAMPLER'(): SAMPLER { return [this.$uid.toString(), 0] as unknown as SAMPLER; }

            /**
              * Constructor
             * @param opts.eta default: 1 step: 0.01
             * @param opts.s_noise default: 1 step: 0.01}
            */
            constructor(opts: {
                'eta'?: FLOAT, 's_noise'?: FLOAT
            }) {
                super(ctx);

                super.$$link("eta", opts['eta'] ?? tmp["SamplerEulerAncestral"].defaults['eta'])
                super.$$link("s_noise", opts['s_noise'] ?? tmp["SamplerEulerAncestral"].defaults['s_noise'])
            }

            static defaults = {
                'eta': 1,
                's_noise': 1
            }
            protected override $$type() {
                return "SamplerEulerAncestral"
            }
        },

        /**
         * SamplerEulerAncestralCFG++ from sampling/custom_sampling/samplers
         * @desc 
        */
        "SamplerEulerAncestralCFGPP": class extends Node {
            //Getters
            get 'SAMPLER'(): SAMPLER { return [this.$uid.toString(), 0] as unknown as SAMPLER; }

            /**
              * Constructor
             * @param opts.eta default: 1 step: 0.01
             * @param opts.s_noise default: 1 step: 0.01}
            */
            constructor(opts: {
                'eta'?: FLOAT, 's_noise'?: FLOAT
            }) {
                super(ctx);

                super.$$link("eta", opts['eta'] ?? tmp["SamplerEulerAncestralCFGPP"].defaults['eta'])
                super.$$link("s_noise", opts['s_noise'] ?? tmp["SamplerEulerAncestralCFGPP"].defaults['s_noise'])
            }

            static defaults = {
                'eta': 1,
                's_noise': 1
            }
            protected override $$type() {
                return "SamplerEulerAncestralCFGPP"
            }
        },

        /**
         * SamplerLMS from sampling/custom_sampling/samplers
         * @desc 
        */
        "SamplerLMS": class extends Node {
            //Getters
            get 'SAMPLER'(): SAMPLER { return [this.$uid.toString(), 0] as unknown as SAMPLER; }

            /**
              * Constructor
             * @param opts.order default: 4 max: 100 min: 1}
            */
            constructor(opts: {
                'order'?: INT
            }) {
                super(ctx);

                super.$$link("order", opts['order'] ?? tmp["SamplerLMS"].defaults['order'])
            }

            static defaults = {
                'order': 4
            }
            protected override $$type() {
                return "SamplerLMS"
            }
        },

        /**
         * SamplerDPMPP_3M_SDE from sampling/custom_sampling/samplers
         * @desc 
        */
        "SamplerDPMPP_3M_SDE": class extends Node {
            //Getters
            get 'SAMPLER'(): SAMPLER { return [this.$uid.toString(), 0] as unknown as SAMPLER; }

            /**
              * Constructor
             * @param opts.eta default: 1 step: 0.01
             * @param opts.s_noise default: 1 step: 0.01
             * @param opts.noise_device}
            */
            constructor(opts: {
                'eta'?: FLOAT, 's_noise'?: FLOAT, 'noise_device': 'gpu' | 'cpu' | $dyn
            }) {
                super(ctx);

                super.$$link("eta", opts['eta'] ?? tmp["SamplerDPMPP_3M_SDE"].defaults['eta'])
                super.$$link("s_noise", opts['s_noise'] ?? tmp["SamplerDPMPP_3M_SDE"].defaults['s_noise'])
                super.$$link("noise_device", opts['noise_device'])
            }

            static defaults = {
                'eta': 1,
                's_noise': 1
            }
            protected override $$type() {
                return "SamplerDPMPP_3M_SDE"
            }
        },

        /**
         * SamplerDPMPP_2M_SDE from sampling/custom_sampling/samplers
         * @desc 
        */
        "SamplerDPMPP_2M_SDE": class extends Node {
            //Getters
            get 'SAMPLER'(): SAMPLER { return [this.$uid.toString(), 0] as unknown as SAMPLER; }

            /**
              * Constructor
             * @param opts.solver_type
             * @param opts.eta default: 1 step: 0.01
             * @param opts.s_noise default: 1 step: 0.01
             * @param opts.noise_device}
            */
            constructor(opts: {
                'solver_type': 'midpoint' | 'heun' | $dyn, 'eta'?: FLOAT, 's_noise'?: FLOAT, 'noise_device': 'gpu' | 'cpu' | $dyn
            }) {
                super(ctx);

                super.$$link("solver_type", opts['solver_type'])
                super.$$link("eta", opts['eta'] ?? tmp["SamplerDPMPP_2M_SDE"].defaults['eta'])
                super.$$link("s_noise", opts['s_noise'] ?? tmp["SamplerDPMPP_2M_SDE"].defaults['s_noise'])
                super.$$link("noise_device", opts['noise_device'])
            }

            static defaults = {
                'eta': 1,
                's_noise': 1
            }
            protected override $$type() {
                return "SamplerDPMPP_2M_SDE"
            }
        },

        /**
         * SamplerDPMPP_SDE from sampling/custom_sampling/samplers
         * @desc 
        */
        "SamplerDPMPP_SDE": class extends Node {
            //Getters
            get 'SAMPLER'(): SAMPLER { return [this.$uid.toString(), 0] as unknown as SAMPLER; }

            /**
              * Constructor
             * @param opts.eta default: 1 step: 0.01
             * @param opts.s_noise default: 1 step: 0.01
             * @param opts.r default: 0.5 step: 0.01
             * @param opts.noise_device}
            */
            constructor(opts: {
                'eta'?: FLOAT, 's_noise'?: FLOAT, 'r'?: FLOAT, 'noise_device': 'gpu' | 'cpu' | $dyn
            }) {
                super(ctx);

                super.$$link("eta", opts['eta'] ?? tmp["SamplerDPMPP_SDE"].defaults['eta'])
                super.$$link("s_noise", opts['s_noise'] ?? tmp["SamplerDPMPP_SDE"].defaults['s_noise'])
                super.$$link("r", opts['r'] ?? tmp["SamplerDPMPP_SDE"].defaults['r'])
                super.$$link("noise_device", opts['noise_device'])
            }

            static defaults = {
                'eta': 1,
                's_noise': 1,
                'r': 0.5
            }
            protected override $$type() {
                return "SamplerDPMPP_SDE"
            }
        },

        /**
         * SamplerDPMPP_2S_Ancestral from sampling/custom_sampling/samplers
         * @desc 
        */
        "SamplerDPMPP_2S_Ancestral": class extends Node {
            //Getters
            get 'SAMPLER'(): SAMPLER { return [this.$uid.toString(), 0] as unknown as SAMPLER; }

            /**
              * Constructor
             * @param opts.eta default: 1 step: 0.01
             * @param opts.s_noise default: 1 step: 0.01}
            */
            constructor(opts: {
                'eta'?: FLOAT, 's_noise'?: FLOAT
            }) {
                super(ctx);

                super.$$link("eta", opts['eta'] ?? tmp["SamplerDPMPP_2S_Ancestral"].defaults['eta'])
                super.$$link("s_noise", opts['s_noise'] ?? tmp["SamplerDPMPP_2S_Ancestral"].defaults['s_noise'])
            }

            static defaults = {
                'eta': 1,
                's_noise': 1
            }
            protected override $$type() {
                return "SamplerDPMPP_2S_Ancestral"
            }
        },

        /**
         * SamplerDPMAdaptative from sampling/custom_sampling/samplers
         * @desc 
        */
        "SamplerDPMAdaptative": class extends Node {
            //Getters
            get 'SAMPLER'(): SAMPLER { return [this.$uid.toString(), 0] as unknown as SAMPLER; }

            /**
              * Constructor
             * @param opts.order default: 3 max: 3 min: 2
             * @param opts.rtol default: 0.05 step: 0.01
             * @param opts.atol default: 0.0078 step: 0.01
             * @param opts.h_init default: 0.05 step: 0.01
             * @param opts.pcoeff step: 0.01
             * @param opts.icoeff default: 1 step: 0.01
             * @param opts.dcoeff step: 0.01
             * @param opts.accept_safety default: 0.81 step: 0.01
             * @param opts.eta step: 0.01
             * @param opts.s_noise default: 1 step: 0.01}
            */
            constructor(opts: {
                'order'?: INT, 'rtol'?: FLOAT, 'atol'?: FLOAT, 'h_init'?: FLOAT, 'pcoeff'?: FLOAT, 'icoeff'?: FLOAT, 'dcoeff'?: FLOAT, 'accept_safety'?: FLOAT, 'eta'?: FLOAT, 's_noise'?: FLOAT
            }) {
                super(ctx);

                super.$$link("order", opts['order'] ?? tmp["SamplerDPMAdaptative"].defaults['order'])
                super.$$link("rtol", opts['rtol'] ?? tmp["SamplerDPMAdaptative"].defaults['rtol'])
                super.$$link("atol", opts['atol'] ?? tmp["SamplerDPMAdaptative"].defaults['atol'])
                super.$$link("h_init", opts['h_init'] ?? tmp["SamplerDPMAdaptative"].defaults['h_init'])
                super.$$link("pcoeff", opts['pcoeff'] ?? tmp["SamplerDPMAdaptative"].defaults['pcoeff'])
                super.$$link("icoeff", opts['icoeff'] ?? tmp["SamplerDPMAdaptative"].defaults['icoeff'])
                super.$$link("dcoeff", opts['dcoeff'] ?? tmp["SamplerDPMAdaptative"].defaults['dcoeff'])
                super.$$link("accept_safety", opts['accept_safety'] ?? tmp["SamplerDPMAdaptative"].defaults['accept_safety'])
                super.$$link("eta", opts['eta'] ?? tmp["SamplerDPMAdaptative"].defaults['eta'])
                super.$$link("s_noise", opts['s_noise'] ?? tmp["SamplerDPMAdaptative"].defaults['s_noise'])
            }

            static defaults = {
                'order': 3,
                'rtol': 0.05,
                'atol': 0.0078,
                'h_init': 0.05,
                'pcoeff': 0,
                'icoeff': 1,
                'dcoeff': 0,
                'accept_safety': 0.81,
                'eta': 0,
                's_noise': 1
            }
            protected override $$type() {
                return "SamplerDPMAdaptative"
            }
        },

        /**
         * SplitSigmas from sampling/custom_sampling/sigmas
         * @desc 
        */
        "SplitSigmas": class extends Node {
            //Getters
            get 'high_sigmas'(): SIGMAS { return [this.$uid.toString(), 0] as unknown as SIGMAS; }
            get 'low_sigmas'(): SIGMAS { return [this.$uid.toString(), 1] as unknown as SIGMAS; }

            /**
              * Constructor
             * @param opts.sigmas
             * @param opts.step}
            */
            constructor(opts: {
                'sigmas': SIGMAS, 'step'?: INT
            }) {
                super(ctx);

                super.$$link("sigmas", opts['sigmas'])
                super.$$link("step", opts['step'] ?? tmp["SplitSigmas"].defaults['step'])
            }

            static defaults = {
                'step': 0
            }
            protected override $$type() {
                return "SplitSigmas"
            }
        },

        /**
         * SplitSigmasDenoise from sampling/custom_sampling/sigmas
         * @desc 
        */
        "SplitSigmasDenoise": class extends Node {
            //Getters
            get 'high_sigmas'(): SIGMAS { return [this.$uid.toString(), 0] as unknown as SIGMAS; }
            get 'low_sigmas'(): SIGMAS { return [this.$uid.toString(), 1] as unknown as SIGMAS; }

            /**
              * Constructor
             * @param opts.sigmas
             * @param opts.denoise default: 1 step: 0.01}
            */
            constructor(opts: {
                'sigmas': SIGMAS, 'denoise'?: FLOAT
            }) {
                super(ctx);

                super.$$link("sigmas", opts['sigmas'])
                super.$$link("denoise", opts['denoise'] ?? tmp["SplitSigmasDenoise"].defaults['denoise'])
            }

            static defaults = {
                'denoise': 1
            }
            protected override $$type() {
                return "SplitSigmasDenoise"
            }
        },

        /**
         * FlipSigmas from sampling/custom_sampling/sigmas
         * @desc 
        */
        "FlipSigmas": class extends Node {
            //Getters
            get 'SIGMAS'(): SIGMAS { return [this.$uid.toString(), 0] as unknown as SIGMAS; }

            /**
              * Constructor
             * @param opts.sigmas}
            */
            constructor(opts: {
                'sigmas': SIGMAS
            }) {
                super(ctx);

                super.$$link("sigmas", opts['sigmas'])
            }

            static defaults = {

            }
            protected override $$type() {
                return "FlipSigmas"
            }
        },

        /**
         * CFGGuider from sampling/custom_sampling/guiders
         * @desc 
        */
        "CFGGuider": class extends Node {
            //Getters
            get 'GUIDER'(): GUIDER { return [this.$uid.toString(), 0] as unknown as GUIDER; }

            /**
              * Constructor
             * @param opts.model
             * @param opts.positive
             * @param opts.negative
             * @param opts.cfg default: 8 step: 0.1}
            */
            constructor(opts: {
                'model': MODEL, 'positive': CONDITIONING, 'negative': CONDITIONING, 'cfg'?: FLOAT
            }) {
                super(ctx);

                super.$$link("model", opts['model'])
                super.$$link("positive", opts['positive'])
                super.$$link("negative", opts['negative'])
                super.$$link("cfg", opts['cfg'] ?? tmp["CFGGuider"].defaults['cfg'])
            }

            static defaults = {
                'cfg': 8
            }
            protected override $$type() {
                return "CFGGuider"
            }
        },

        /**
         * DualCFGGuider from sampling/custom_sampling/guiders
         * @desc 
        */
        "DualCFGGuider": class extends Node {
            //Getters
            get 'GUIDER'(): GUIDER { return [this.$uid.toString(), 0] as unknown as GUIDER; }

            /**
              * Constructor
             * @param opts.model
             * @param opts.cond1
             * @param opts.cond2
             * @param opts.negative
             * @param opts.cfg_conds default: 8 step: 0.1
             * @param opts.cfg_cond2_negative default: 8 step: 0.1}
            */
            constructor(opts: {
                'model': MODEL, 'cond1': CONDITIONING, 'cond2': CONDITIONING, 'negative': CONDITIONING, 'cfg_conds'?: FLOAT, 'cfg_cond2_negative'?: FLOAT
            }) {
                super(ctx);

                super.$$link("model", opts['model'])
                super.$$link("cond1", opts['cond1'])
                super.$$link("cond2", opts['cond2'])
                super.$$link("negative", opts['negative'])
                super.$$link("cfg_conds", opts['cfg_conds'] ?? tmp["DualCFGGuider"].defaults['cfg_conds'])
                super.$$link("cfg_cond2_negative", opts['cfg_cond2_negative'] ?? tmp["DualCFGGuider"].defaults['cfg_cond2_negative'])
            }

            static defaults = {
                'cfg_conds': 8,
                'cfg_cond2_negative': 8
            }
            protected override $$type() {
                return "DualCFGGuider"
            }
        },

        /**
         * BasicGuider from sampling/custom_sampling/guiders
         * @desc 
        */
        "BasicGuider": class extends Node {
            //Getters
            get 'GUIDER'(): GUIDER { return [this.$uid.toString(), 0] as unknown as GUIDER; }

            /**
              * Constructor
             * @param opts.model
             * @param opts.conditioning}
            */
            constructor(opts: {
                'model': MODEL, 'conditioning': CONDITIONING
            }) {
                super(ctx);

                super.$$link("model", opts['model'])
                super.$$link("conditioning", opts['conditioning'])
            }

            static defaults = {

            }
            protected override $$type() {
                return "BasicGuider"
            }
        },

        /**
         * RandomNoise from sampling/custom_sampling/noise
         * @desc 
        */
        "RandomNoise": class extends Node {
            //Getters
            get 'NOISE'(): NOISE { return [this.$uid.toString(), 0] as unknown as NOISE; }

            /**
              * Constructor
             * @param opts.noise_seed}
            */
            constructor(opts: {
                'noise_seed'?: INT
            }) {
                super(ctx);

                super.$$link("noise_seed", opts['noise_seed'] ?? tmp["RandomNoise"].defaults['noise_seed'])
            }

            static defaults = {
                'noise_seed': 0
            }
            protected override $$type() {
                return "RandomNoise"
            }
        },

        /**
         * DisableNoise from sampling/custom_sampling/noise
         * @desc 
        */
        "DisableNoise": class extends Node {
            //Getters
            get 'NOISE'(): NOISE { return [this.$uid.toString(), 0] as unknown as NOISE; }

            /**
              * Constructor
    }
            */
            constructor(opts: {

            }) {
                super(ctx);


            }

            static defaults = {

            }
            protected override $$type() {
                return "DisableNoise"
            }
        },

        /**
         * AddNoise from _for_testing/custom_sampling/noise
         * @desc 
        */
        "AddNoise": class extends Node {
            //Getters
            get 'LATENT'(): LATENT { return [this.$uid.toString(), 0] as unknown as LATENT; }

            /**
              * Constructor
             * @param opts.model
             * @param opts.noise
             * @param opts.sigmas
             * @param opts.latent_image}
            */
            constructor(opts: {
                'model': MODEL, 'noise': NOISE, 'sigmas': SIGMAS, 'latent_image': LATENT
            }) {
                super(ctx);

                super.$$link("model", opts['model'])
                super.$$link("noise", opts['noise'])
                super.$$link("sigmas", opts['sigmas'])
                super.$$link("latent_image", opts['latent_image'])
            }

            static defaults = {

            }
            protected override $$type() {
                return "AddNoise"
            }
        },

        /**
         * SamplerCustomAdvanced from sampling/custom_sampling
         * @desc 
        */
        "SamplerCustomAdvanced": class extends Node {
            //Getters
            get 'output'(): LATENT { return [this.$uid.toString(), 0] as unknown as LATENT; }
            get 'denoised_output'(): LATENT { return [this.$uid.toString(), 1] as unknown as LATENT; }

            /**
              * Constructor
             * @param opts.noise
             * @param opts.guider
             * @param opts.sampler
             * @param opts.sigmas
             * @param opts.latent_image}
            */
            constructor(opts: {
                'noise': NOISE, 'guider': GUIDER, 'sampler': SAMPLER, 'sigmas': SIGMAS, 'latent_image': LATENT
            }) {
                super(ctx);

                super.$$link("noise", opts['noise'])
                super.$$link("guider", opts['guider'])
                super.$$link("sampler", opts['sampler'])
                super.$$link("sigmas", opts['sigmas'])
                super.$$link("latent_image", opts['latent_image'])
            }

            static defaults = {

            }
            protected override $$type() {
                return "SamplerCustomAdvanced"
            }
        },

        /**
         * HyperTile from model_patches/unet
         * @desc 
        */
        "HyperTile": class extends Node {
            //Getters
            get 'MODEL'(): MODEL { return [this.$uid.toString(), 0] as unknown as MODEL; }

            /**
              * Constructor
             * @param opts.model
             * @param opts.tile_size default: 256 max: 2048 min: 1
             * @param opts.swap_size default: 2 max: 128 min: 1
             * @param opts.max_depth
             * @param opts.scale_depth}
            */
            constructor(opts: {
                'model': MODEL, 'tile_size'?: INT, 'swap_size'?: INT, 'max_depth'?: INT, 'scale_depth'?: BOOLEAN
            }) {
                super(ctx);

                super.$$link("model", opts['model'])
                super.$$link("tile_size", opts['tile_size'] ?? tmp["HyperTile"].defaults['tile_size'])
                super.$$link("swap_size", opts['swap_size'] ?? tmp["HyperTile"].defaults['swap_size'])
                super.$$link("max_depth", opts['max_depth'] ?? tmp["HyperTile"].defaults['max_depth'])
                super.$$link("scale_depth", opts['scale_depth'] ?? tmp["HyperTile"].defaults['scale_depth'])
            }

            static defaults = {
                'tile_size': 256,
                'swap_size': 2,
                'max_depth': 0,
                'scale_depth': false
            }
            protected override $$type() {
                return "HyperTile"
            }
        },

        /**
         * ModelSamplingDiscrete from advanced/model
         * @desc 
        */
        "ModelSamplingDiscrete": class extends Node {
            //Getters
            get 'MODEL'(): MODEL { return [this.$uid.toString(), 0] as unknown as MODEL; }

            /**
              * Constructor
             * @param opts.model
             * @param opts.sampling
             * @param opts.zsnr}
            */
            constructor(opts: {
                'model': MODEL, 'sampling': 'eps' | 'v_prediction' | 'lcm' | 'x0' | $dyn, 'zsnr'?: BOOLEAN
            }) {
                super(ctx);

                super.$$link("model", opts['model'])
                super.$$link("sampling", opts['sampling'])
                super.$$link("zsnr", opts['zsnr'] ?? tmp["ModelSamplingDiscrete"].defaults['zsnr'])
            }

            static defaults = {
                'zsnr': false
            }
            protected override $$type() {
                return "ModelSamplingDiscrete"
            }
        },

        /**
         * ModelSamplingContinuousEDM from advanced/model
         * @desc 
        */
        "ModelSamplingContinuousEDM": class extends Node {
            //Getters
            get 'MODEL'(): MODEL { return [this.$uid.toString(), 0] as unknown as MODEL; }

            /**
              * Constructor
             * @param opts.model
             * @param opts.sampling
             * @param opts.sigma_max default: 120 step: 0.001
             * @param opts.sigma_min default: 0.002 step: 0.001}
            */
            constructor(opts: {
                'model': MODEL, 'sampling': 'v_prediction' | 'edm_playground_v2.5' | 'eps' | $dyn, 'sigma_max'?: FLOAT, 'sigma_min'?: FLOAT
            }) {
                super(ctx);

                super.$$link("model", opts['model'])
                super.$$link("sampling", opts['sampling'])
                super.$$link("sigma_max", opts['sigma_max'] ?? tmp["ModelSamplingContinuousEDM"].defaults['sigma_max'])
                super.$$link("sigma_min", opts['sigma_min'] ?? tmp["ModelSamplingContinuousEDM"].defaults['sigma_min'])
            }

            static defaults = {
                'sigma_max': 120,
                'sigma_min': 0.002
            }
            protected override $$type() {
                return "ModelSamplingContinuousEDM"
            }
        },

        /**
         * ModelSamplingContinuousV from advanced/model
         * @desc 
        */
        "ModelSamplingContinuousV": class extends Node {
            //Getters
            get 'MODEL'(): MODEL { return [this.$uid.toString(), 0] as unknown as MODEL; }

            /**
              * Constructor
             * @param opts.model
             * @param opts.sampling
             * @param opts.sigma_max default: 500 step: 0.001
             * @param opts.sigma_min default: 0.03 step: 0.001}
            */
            constructor(opts: {
                'model': MODEL, 'sampling': 'v_prediction' | $dyn, 'sigma_max'?: FLOAT, 'sigma_min'?: FLOAT
            }) {
                super(ctx);

                super.$$link("model", opts['model'])
                super.$$link("sampling", opts['sampling'])
                super.$$link("sigma_max", opts['sigma_max'] ?? tmp["ModelSamplingContinuousV"].defaults['sigma_max'])
                super.$$link("sigma_min", opts['sigma_min'] ?? tmp["ModelSamplingContinuousV"].defaults['sigma_min'])
            }

            static defaults = {
                'sigma_max': 500,
                'sigma_min': 0.03
            }
            protected override $$type() {
                return "ModelSamplingContinuousV"
            }
        },

        /**
         * ModelSamplingStableCascade from advanced/model
         * @desc 
        */
        "ModelSamplingStableCascade": class extends Node {
            //Getters
            get 'MODEL'(): MODEL { return [this.$uid.toString(), 0] as unknown as MODEL; }

            /**
              * Constructor
             * @param opts.model
             * @param opts.shift default: 2 step: 0.01}
            */
            constructor(opts: {
                'model': MODEL, 'shift'?: FLOAT
            }) {
                super(ctx);

                super.$$link("model", opts['model'])
                super.$$link("shift", opts['shift'] ?? tmp["ModelSamplingStableCascade"].defaults['shift'])
            }

            static defaults = {
                'shift': 2
            }
            protected override $$type() {
                return "ModelSamplingStableCascade"
            }
        },

        /**
         * ModelSamplingSD3 from advanced/model
         * @desc 
        */
        "ModelSamplingSD3": class extends Node {
            //Getters
            get 'MODEL'(): MODEL { return [this.$uid.toString(), 0] as unknown as MODEL; }

            /**
              * Constructor
             * @param opts.model
             * @param opts.shift default: 3 step: 0.01}
            */
            constructor(opts: {
                'model': MODEL, 'shift'?: FLOAT
            }) {
                super(ctx);

                super.$$link("model", opts['model'])
                super.$$link("shift", opts['shift'] ?? tmp["ModelSamplingSD3"].defaults['shift'])
            }

            static defaults = {
                'shift': 3
            }
            protected override $$type() {
                return "ModelSamplingSD3"
            }
        },

        /**
         * ModelSamplingAuraFlow from advanced/model
         * @desc 
        */
        "ModelSamplingAuraFlow": class extends Node {
            //Getters
            get 'MODEL'(): MODEL { return [this.$uid.toString(), 0] as unknown as MODEL; }

            /**
              * Constructor
             * @param opts.model
             * @param opts.shift default: 1.73 step: 0.01}
            */
            constructor(opts: {
                'model': MODEL, 'shift'?: FLOAT
            }) {
                super(ctx);

                super.$$link("model", opts['model'])
                super.$$link("shift", opts['shift'] ?? tmp["ModelSamplingAuraFlow"].defaults['shift'])
            }

            static defaults = {
                'shift': 1.73
            }
            protected override $$type() {
                return "ModelSamplingAuraFlow"
            }
        },

        /**
         * ModelSamplingFlux from advanced/model
         * @desc 
        */
        "ModelSamplingFlux": class extends Node {
            //Getters
            get 'MODEL'(): MODEL { return [this.$uid.toString(), 0] as unknown as MODEL; }

            /**
              * Constructor
             * @param opts.model
             * @param opts.max_shift default: 1.15 step: 0.01
             * @param opts.base_shift default: 0.5 step: 0.01
             * @param opts.width default: 1024 max: 16384 min: 16 step: 8
             * @param opts.height default: 1024 max: 16384 min: 16 step: 8}
            */
            constructor(opts: {
                'model': MODEL, 'max_shift'?: FLOAT, 'base_shift'?: FLOAT, 'width'?: INT, 'height'?: INT
            }) {
                super(ctx);

                super.$$link("model", opts['model'])
                super.$$link("max_shift", opts['max_shift'] ?? tmp["ModelSamplingFlux"].defaults['max_shift'])
                super.$$link("base_shift", opts['base_shift'] ?? tmp["ModelSamplingFlux"].defaults['base_shift'])
                super.$$link("width", opts['width'] ?? tmp["ModelSamplingFlux"].defaults['width'])
                super.$$link("height", opts['height'] ?? tmp["ModelSamplingFlux"].defaults['height'])
            }

            static defaults = {
                'max_shift': 1.15,
                'base_shift': 0.5,
                'width': 1024,
                'height': 1024
            }
            protected override $$type() {
                return "ModelSamplingFlux"
            }
        },

        /**
         * RescaleCFG from advanced/model
         * @desc 
        */
        "RescaleCFG": class extends Node {
            //Getters
            get 'MODEL'(): MODEL { return [this.$uid.toString(), 0] as unknown as MODEL; }

            /**
              * Constructor
             * @param opts.model
             * @param opts.multiplier default: 0.7 step: 0.01}
            */
            constructor(opts: {
                'model': MODEL, 'multiplier'?: FLOAT
            }) {
                super(ctx);

                super.$$link("model", opts['model'])
                super.$$link("multiplier", opts['multiplier'] ?? tmp["RescaleCFG"].defaults['multiplier'])
            }

            static defaults = {
                'multiplier': 0.7
            }
            protected override $$type() {
                return "RescaleCFG"
            }
        },

        /**
         * PatchModelAddDownscale (Kohya Deep Shrink) from _for_testing
         * @desc 
        */
        "PatchModelAddDownscale": class extends Node {
            //Getters
            get 'MODEL'(): MODEL { return [this.$uid.toString(), 0] as unknown as MODEL; }

            /**
              * Constructor
             * @param opts.model
             * @param opts.block_number default: 3 max: 32 min: 1 step: 1
             * @param opts.downscale_factor default: 2 max: 9 min: 0.1 step: 0.001
             * @param opts.start_percent step: 0.001
             * @param opts.end_percent default: 0.35 step: 0.001
             * @param opts.downscale_after_skip default: true
             * @param opts.downscale_method
             * @param opts.upscale_method}
            */
            constructor(opts: {
                'model': MODEL, 'block_number'?: INT, 'downscale_factor'?: FLOAT, 'start_percent'?: FLOAT, 'end_percent'?: FLOAT, 'downscale_after_skip'?: BOOLEAN, 'downscale_method': 'bicubic' | 'nearest-exact' | 'bilinear' | 'area' | 'bislerp' | $dyn, 'upscale_method': 'bicubic' | 'nearest-exact' | 'bilinear' | 'area' | 'bislerp' | $dyn
            }) {
                super(ctx);

                super.$$link("model", opts['model'])
                super.$$link("block_number", opts['block_number'] ?? tmp["PatchModelAddDownscale"].defaults['block_number'])
                super.$$link("downscale_factor", opts['downscale_factor'] ?? tmp["PatchModelAddDownscale"].defaults['downscale_factor'])
                super.$$link("start_percent", opts['start_percent'] ?? tmp["PatchModelAddDownscale"].defaults['start_percent'])
                super.$$link("end_percent", opts['end_percent'] ?? tmp["PatchModelAddDownscale"].defaults['end_percent'])
                super.$$link("downscale_after_skip", opts['downscale_after_skip'] ?? tmp["PatchModelAddDownscale"].defaults['downscale_after_skip'])
                super.$$link("downscale_method", opts['downscale_method'])
                super.$$link("upscale_method", opts['upscale_method'])
            }

            static defaults = {
                'block_number': 3,
                'downscale_factor': 2,
                'start_percent': 0,
                'end_percent': 0.35,
                'downscale_after_skip': true
            }
            protected override $$type() {
                return "PatchModelAddDownscale"
            }
        },

        /**
         * ImageCrop from image/transform
         * @desc 
        */
        "ImageCrop": class extends Node {
            //Getters
            get 'IMAGE'(): IMAGE { return [this.$uid.toString(), 0] as unknown as IMAGE; }

            /**
              * Constructor
             * @param opts.image
             * @param opts.width default: 512 max: 16384 min: 1 step: 1
             * @param opts.height default: 512 max: 16384 min: 1 step: 1
             * @param opts.x step: 1
             * @param opts.y step: 1}
            */
            constructor(opts: {
                'image': IMAGE, 'width'?: INT, 'height'?: INT, 'x'?: INT, 'y'?: INT
            }) {
                super(ctx);

                super.$$link("image", opts['image'])
                super.$$link("width", opts['width'] ?? tmp["ImageCrop"].defaults['width'])
                super.$$link("height", opts['height'] ?? tmp["ImageCrop"].defaults['height'])
                super.$$link("x", opts['x'] ?? tmp["ImageCrop"].defaults['x'])
                super.$$link("y", opts['y'] ?? tmp["ImageCrop"].defaults['y'])
            }

            static defaults = {
                'width': 512,
                'height': 512,
                'x': 0,
                'y': 0
            }
            protected override $$type() {
                return "ImageCrop"
            }
        },

        /**
         * RepeatImageBatch from image/batch
         * @desc 
        */
        "RepeatImageBatch": class extends Node {
            //Getters
            get 'IMAGE'(): IMAGE { return [this.$uid.toString(), 0] as unknown as IMAGE; }

            /**
              * Constructor
             * @param opts.image
             * @param opts.amount default: 1 max: 4096 min: 1}
            */
            constructor(opts: {
                'image': IMAGE, 'amount'?: INT
            }) {
                super(ctx);

                super.$$link("image", opts['image'])
                super.$$link("amount", opts['amount'] ?? tmp["RepeatImageBatch"].defaults['amount'])
            }

            static defaults = {
                'amount': 1
            }
            protected override $$type() {
                return "RepeatImageBatch"
            }
        },

        /**
         * ImageFromBatch from image/batch
         * @desc 
        */
        "ImageFromBatch": class extends Node {
            //Getters
            get 'IMAGE'(): IMAGE { return [this.$uid.toString(), 0] as unknown as IMAGE; }

            /**
              * Constructor
             * @param opts.image
             * @param opts.batch_index
             * @param opts.length default: 1 max: 4096 min: 1}
            */
            constructor(opts: {
                'image': IMAGE, 'batch_index'?: INT, 'length'?: INT
            }) {
                super(ctx);

                super.$$link("image", opts['image'])
                super.$$link("batch_index", opts['batch_index'] ?? tmp["ImageFromBatch"].defaults['batch_index'])
                super.$$link("length", opts['length'] ?? tmp["ImageFromBatch"].defaults['length'])
            }

            static defaults = {
                'batch_index': 0,
                'length': 1
            }
            protected override $$type() {
                return "ImageFromBatch"
            }
        },

        /**
         * SaveAnimatedWEBP from image/animation
         * @desc 
        */
        "SaveAnimatedWEBP": class extends Node {
            //Getters


            /**
              * Constructor
             * @param opts.images
             * @param opts.filename_prefix default: "ComfyUI"
             * @param opts.fps default: 6 max: 1000 min: 0.01 step: 0.01
             * @param opts.lossless default: true
             * @param opts.quality default: 80
             * @param opts.method}
            */
            constructor(opts: {
                'images': IMAGE, 'filename_prefix'?: STRING, 'fps'?: FLOAT, 'lossless'?: BOOLEAN, 'quality'?: INT, 'method': 'default' | 'fastest' | 'slowest' | $dyn
            }) {
                super(ctx);

                super.$$link("images", opts['images'])
                super.$$link("filename_prefix", opts['filename_prefix'] ?? tmp["SaveAnimatedWEBP"].defaults['filename_prefix'])
                super.$$link("fps", opts['fps'] ?? tmp["SaveAnimatedWEBP"].defaults['fps'])
                super.$$link("lossless", opts['lossless'] ?? tmp["SaveAnimatedWEBP"].defaults['lossless'])
                super.$$link("quality", opts['quality'] ?? tmp["SaveAnimatedWEBP"].defaults['quality'])
                super.$$link("method", opts['method'])
            }

            static defaults = {
                'filename_prefix': "ComfyUI",
                'fps': 6,
                'lossless': true,
                'quality': 80
            }
            protected override $$type() {
                return "SaveAnimatedWEBP"
            }
        },

        /**
         * SaveAnimatedPNG from image/animation
         * @desc 
        */
        "SaveAnimatedPNG": class extends Node {
            //Getters


            /**
              * Constructor
             * @param opts.images
             * @param opts.filename_prefix default: "ComfyUI"
             * @param opts.fps default: 6 max: 1000 min: 0.01 step: 0.01
             * @param opts.compress_level default: 4}
            */
            constructor(opts: {
                'images': IMAGE, 'filename_prefix'?: STRING, 'fps'?: FLOAT, 'compress_level'?: INT
            }) {
                super(ctx);

                super.$$link("images", opts['images'])
                super.$$link("filename_prefix", opts['filename_prefix'] ?? tmp["SaveAnimatedPNG"].defaults['filename_prefix'])
                super.$$link("fps", opts['fps'] ?? tmp["SaveAnimatedPNG"].defaults['fps'])
                super.$$link("compress_level", opts['compress_level'] ?? tmp["SaveAnimatedPNG"].defaults['compress_level'])
            }

            static defaults = {
                'filename_prefix': "ComfyUI",
                'fps': 6,
                'compress_level': 4
            }
            protected override $$type() {
                return "SaveAnimatedPNG"
            }
        },

        /**
         * Image Only Checkpoint Loader (img2vid model) from loaders/video_models
         * @desc 
        */
        "ImageOnlyCheckpointLoader": class extends Node {
            //Getters
            get 'MODEL'(): MODEL { return [this.$uid.toString(), 0] as unknown as MODEL; }
            get 'CLIP_VISION'(): CLIP_VISION { return [this.$uid.toString(), 1] as unknown as CLIP_VISION; }
            get 'VAE'(): VAE { return [this.$uid.toString(), 2] as unknown as VAE; }

            /**
              * Constructor
             * @param opts.ckpt_name}
            */
            constructor(opts: {
                'ckpt_name': $dyn
            }) {
                super(ctx);

                super.$$link("ckpt_name", opts['ckpt_name'])
            }

            static defaults = {

            }
            protected override $$type() {
                return "ImageOnlyCheckpointLoader"
            }
        },

        /**
         * SVD_img2vid_Conditioning from conditioning/video_models
         * @desc 
        */
        "SVD_img2vid_Conditioning": class extends Node {
            //Getters
            get 'positive'(): CONDITIONING { return [this.$uid.toString(), 0] as unknown as CONDITIONING; }
            get 'negative'(): CONDITIONING { return [this.$uid.toString(), 1] as unknown as CONDITIONING; }
            get 'latent'(): LATENT { return [this.$uid.toString(), 2] as unknown as LATENT; }

            /**
              * Constructor
             * @param opts.clip_vision
             * @param opts.init_image
             * @param opts.vae
             * @param opts.width default: 1024 max: 16384 min: 16 step: 8
             * @param opts.height default: 576 max: 16384 min: 16 step: 8
             * @param opts.video_frames default: 14 max: 4096 min: 1
             * @param opts.motion_bucket_id default: 127 max: 1023 min: 1
             * @param opts.fps default: 6 max: 1024 min: 1
             * @param opts.augmentation_level step: 0.01}
            */
            constructor(opts: {
                'clip_vision': CLIP_VISION, 'init_image': IMAGE, 'vae': VAE, 'width'?: INT, 'height'?: INT, 'video_frames'?: INT, 'motion_bucket_id'?: INT, 'fps'?: INT, 'augmentation_level'?: FLOAT
            }) {
                super(ctx);

                super.$$link("clip_vision", opts['clip_vision'])
                super.$$link("init_image", opts['init_image'])
                super.$$link("vae", opts['vae'])
                super.$$link("width", opts['width'] ?? tmp["SVD_img2vid_Conditioning"].defaults['width'])
                super.$$link("height", opts['height'] ?? tmp["SVD_img2vid_Conditioning"].defaults['height'])
                super.$$link("video_frames", opts['video_frames'] ?? tmp["SVD_img2vid_Conditioning"].defaults['video_frames'])
                super.$$link("motion_bucket_id", opts['motion_bucket_id'] ?? tmp["SVD_img2vid_Conditioning"].defaults['motion_bucket_id'])
                super.$$link("fps", opts['fps'] ?? tmp["SVD_img2vid_Conditioning"].defaults['fps'])
                super.$$link("augmentation_level", opts['augmentation_level'] ?? tmp["SVD_img2vid_Conditioning"].defaults['augmentation_level'])
            }

            static defaults = {
                'width': 1024,
                'height': 576,
                'video_frames': 14,
                'motion_bucket_id': 127,
                'fps': 6,
                'augmentation_level': 0
            }
            protected override $$type() {
                return "SVD_img2vid_Conditioning"
            }
        },

        /**
         * VideoLinearCFGGuidance from sampling/video_models
         * @desc 
        */
        "VideoLinearCFGGuidance": class extends Node {
            //Getters
            get 'MODEL'(): MODEL { return [this.$uid.toString(), 0] as unknown as MODEL; }

            /**
              * Constructor
             * @param opts.model
             * @param opts.min_cfg default: 1 step: 0.5}
            */
            constructor(opts: {
                'model': MODEL, 'min_cfg'?: FLOAT
            }) {
                super(ctx);

                super.$$link("model", opts['model'])
                super.$$link("min_cfg", opts['min_cfg'] ?? tmp["VideoLinearCFGGuidance"].defaults['min_cfg'])
            }

            static defaults = {
                'min_cfg': 1
            }
            protected override $$type() {
                return "VideoLinearCFGGuidance"
            }
        },

        /**
         * VideoTriangleCFGGuidance from sampling/video_models
         * @desc 
        */
        "VideoTriangleCFGGuidance": class extends Node {
            //Getters
            get 'MODEL'(): MODEL { return [this.$uid.toString(), 0] as unknown as MODEL; }

            /**
              * Constructor
             * @param opts.model
             * @param opts.min_cfg default: 1 step: 0.5}
            */
            constructor(opts: {
                'model': MODEL, 'min_cfg'?: FLOAT
            }) {
                super(ctx);

                super.$$link("model", opts['model'])
                super.$$link("min_cfg", opts['min_cfg'] ?? tmp["VideoTriangleCFGGuidance"].defaults['min_cfg'])
            }

            static defaults = {
                'min_cfg': 1
            }
            protected override $$type() {
                return "VideoTriangleCFGGuidance"
            }
        },

        /**
         * ImageOnlyCheckpointSave from _for_testing
         * @desc 
        */
        "ImageOnlyCheckpointSave": class extends Node {
            //Getters


            /**
              * Constructor
             * @param opts.model
             * @param opts.clip_vision
             * @param opts.vae
             * @param opts.filename_prefix default: "checkpoints/ComfyUI"}
            */
            constructor(opts: {
                'model': MODEL, 'clip_vision': CLIP_VISION, 'vae': VAE, 'filename_prefix'?: STRING
            }) {
                super(ctx);

                super.$$link("model", opts['model'])
                super.$$link("clip_vision", opts['clip_vision'])
                super.$$link("vae", opts['vae'])
                super.$$link("filename_prefix", opts['filename_prefix'] ?? tmp["ImageOnlyCheckpointSave"].defaults['filename_prefix'])
            }

            static defaults = {
                'filename_prefix': "checkpoints/ComfyUI"
            }
            protected override $$type() {
                return "ImageOnlyCheckpointSave"
            }
        },

        /**
         * Self-Attention Guidance from _for_testing
         * @desc 
        */
        "SelfAttentionGuidance": class extends Node {
            //Getters
            get 'MODEL'(): MODEL { return [this.$uid.toString(), 0] as unknown as MODEL; }

            /**
              * Constructor
             * @param opts.model
             * @param opts.scale default: 0.5 max: 5 min: -2 step: 0.01
             * @param opts.blur_sigma default: 2 step: 0.1}
            */
            constructor(opts: {
                'model': MODEL, 'scale'?: FLOAT, 'blur_sigma'?: FLOAT
            }) {
                super(ctx);

                super.$$link("model", opts['model'])
                super.$$link("scale", opts['scale'] ?? tmp["SelfAttentionGuidance"].defaults['scale'])
                super.$$link("blur_sigma", opts['blur_sigma'] ?? tmp["SelfAttentionGuidance"].defaults['blur_sigma'])
            }

            static defaults = {
                'scale': 0.5,
                'blur_sigma': 2
            }
            protected override $$type() {
                return "SelfAttentionGuidance"
            }
        },

        /**
         * Perp-Neg (DEPRECATED by PerpNegGuider) from _for_testing
         * @desc 
        */
        "PerpNeg": class extends Node {
            //Getters
            get 'MODEL'(): MODEL { return [this.$uid.toString(), 0] as unknown as MODEL; }

            /**
              * Constructor
             * @param opts.model
             * @param opts.empty_conditioning
             * @param opts.neg_scale default: 1 step: 0.01}
            */
            constructor(opts: {
                'model': MODEL, 'empty_conditioning': CONDITIONING, 'neg_scale'?: FLOAT
            }) {
                super(ctx);

                super.$$link("model", opts['model'])
                super.$$link("empty_conditioning", opts['empty_conditioning'])
                super.$$link("neg_scale", opts['neg_scale'] ?? tmp["PerpNeg"].defaults['neg_scale'])
            }

            static defaults = {
                'neg_scale': 1
            }
            protected override $$type() {
                return "PerpNeg"
            }
        },

        /**
         * PerpNegGuider from _for_testing
         * @desc 
        */
        "PerpNegGuider": class extends Node {
            //Getters
            get 'GUIDER'(): GUIDER { return [this.$uid.toString(), 0] as unknown as GUIDER; }

            /**
              * Constructor
             * @param opts.model
             * @param opts.positive
             * @param opts.negative
             * @param opts.empty_conditioning
             * @param opts.cfg default: 8 step: 0.1
             * @param opts.neg_scale default: 1 step: 0.01}
            */
            constructor(opts: {
                'model': MODEL, 'positive': CONDITIONING, 'negative': CONDITIONING, 'empty_conditioning': CONDITIONING, 'cfg'?: FLOAT, 'neg_scale'?: FLOAT
            }) {
                super(ctx);

                super.$$link("model", opts['model'])
                super.$$link("positive", opts['positive'])
                super.$$link("negative", opts['negative'])
                super.$$link("empty_conditioning", opts['empty_conditioning'])
                super.$$link("cfg", opts['cfg'] ?? tmp["PerpNegGuider"].defaults['cfg'])
                super.$$link("neg_scale", opts['neg_scale'] ?? tmp["PerpNegGuider"].defaults['neg_scale'])
            }

            static defaults = {
                'cfg': 8,
                'neg_scale': 1
            }
            protected override $$type() {
                return "PerpNegGuider"
            }
        },

        /**
         * StableZero123_Conditioning from conditioning/3d_models
         * @desc 
        */
        "StableZero123_Conditioning": class extends Node {
            //Getters
            get 'positive'(): CONDITIONING { return [this.$uid.toString(), 0] as unknown as CONDITIONING; }
            get 'negative'(): CONDITIONING { return [this.$uid.toString(), 1] as unknown as CONDITIONING; }
            get 'latent'(): LATENT { return [this.$uid.toString(), 2] as unknown as LATENT; }

            /**
              * Constructor
             * @param opts.clip_vision
             * @param opts.init_image
             * @param opts.vae
             * @param opts.width default: 256 max: 16384 min: 16 step: 8
             * @param opts.height default: 256 max: 16384 min: 16 step: 8
             * @param opts.batch_size default: 1 max: 4096 min: 1
             * @param opts.elevation max: 180 min: -180 step: 0.1
             * @param opts.azimuth max: 180 min: -180 step: 0.1}
            */
            constructor(opts: {
                'clip_vision': CLIP_VISION, 'init_image': IMAGE, 'vae': VAE, 'width'?: INT, 'height'?: INT, 'batch_size'?: INT, 'elevation'?: FLOAT, 'azimuth'?: FLOAT
            }) {
                super(ctx);

                super.$$link("clip_vision", opts['clip_vision'])
                super.$$link("init_image", opts['init_image'])
                super.$$link("vae", opts['vae'])
                super.$$link("width", opts['width'] ?? tmp["StableZero123_Conditioning"].defaults['width'])
                super.$$link("height", opts['height'] ?? tmp["StableZero123_Conditioning"].defaults['height'])
                super.$$link("batch_size", opts['batch_size'] ?? tmp["StableZero123_Conditioning"].defaults['batch_size'])
                super.$$link("elevation", opts['elevation'] ?? tmp["StableZero123_Conditioning"].defaults['elevation'])
                super.$$link("azimuth", opts['azimuth'] ?? tmp["StableZero123_Conditioning"].defaults['azimuth'])
            }

            static defaults = {
                'width': 256,
                'height': 256,
                'batch_size': 1,
                'elevation': 0,
                'azimuth': 0
            }
            protected override $$type() {
                return "StableZero123_Conditioning"
            }
        },

        /**
         * StableZero123_Conditioning_Batched from conditioning/3d_models
         * @desc 
        */
        "StableZero123_Conditioning_Batched": class extends Node {
            //Getters
            get 'positive'(): CONDITIONING { return [this.$uid.toString(), 0] as unknown as CONDITIONING; }
            get 'negative'(): CONDITIONING { return [this.$uid.toString(), 1] as unknown as CONDITIONING; }
            get 'latent'(): LATENT { return [this.$uid.toString(), 2] as unknown as LATENT; }

            /**
              * Constructor
             * @param opts.clip_vision
             * @param opts.init_image
             * @param opts.vae
             * @param opts.width default: 256 max: 16384 min: 16 step: 8
             * @param opts.height default: 256 max: 16384 min: 16 step: 8
             * @param opts.batch_size default: 1 max: 4096 min: 1
             * @param opts.elevation max: 180 min: -180 step: 0.1
             * @param opts.azimuth max: 180 min: -180 step: 0.1
             * @param opts.elevation_batch_increment max: 180 min: -180 step: 0.1
             * @param opts.azimuth_batch_increment max: 180 min: -180 step: 0.1}
            */
            constructor(opts: {
                'clip_vision': CLIP_VISION, 'init_image': IMAGE, 'vae': VAE, 'width'?: INT, 'height'?: INT, 'batch_size'?: INT, 'elevation'?: FLOAT, 'azimuth'?: FLOAT, 'elevation_batch_increment'?: FLOAT, 'azimuth_batch_increment'?: FLOAT
            }) {
                super(ctx);

                super.$$link("clip_vision", opts['clip_vision'])
                super.$$link("init_image", opts['init_image'])
                super.$$link("vae", opts['vae'])
                super.$$link("width", opts['width'] ?? tmp["StableZero123_Conditioning_Batched"].defaults['width'])
                super.$$link("height", opts['height'] ?? tmp["StableZero123_Conditioning_Batched"].defaults['height'])
                super.$$link("batch_size", opts['batch_size'] ?? tmp["StableZero123_Conditioning_Batched"].defaults['batch_size'])
                super.$$link("elevation", opts['elevation'] ?? tmp["StableZero123_Conditioning_Batched"].defaults['elevation'])
                super.$$link("azimuth", opts['azimuth'] ?? tmp["StableZero123_Conditioning_Batched"].defaults['azimuth'])
                super.$$link("elevation_batch_increment", opts['elevation_batch_increment'] ?? tmp["StableZero123_Conditioning_Batched"].defaults['elevation_batch_increment'])
                super.$$link("azimuth_batch_increment", opts['azimuth_batch_increment'] ?? tmp["StableZero123_Conditioning_Batched"].defaults['azimuth_batch_increment'])
            }

            static defaults = {
                'width': 256,
                'height': 256,
                'batch_size': 1,
                'elevation': 0,
                'azimuth': 0,
                'elevation_batch_increment': 0,
                'azimuth_batch_increment': 0
            }
            protected override $$type() {
                return "StableZero123_Conditioning_Batched"
            }
        },

        /**
         * SV3D_Conditioning from conditioning/3d_models
         * @desc 
        */
        "SV3D_Conditioning": class extends Node {
            //Getters
            get 'positive'(): CONDITIONING { return [this.$uid.toString(), 0] as unknown as CONDITIONING; }
            get 'negative'(): CONDITIONING { return [this.$uid.toString(), 1] as unknown as CONDITIONING; }
            get 'latent'(): LATENT { return [this.$uid.toString(), 2] as unknown as LATENT; }

            /**
              * Constructor
             * @param opts.clip_vision
             * @param opts.init_image
             * @param opts.vae
             * @param opts.width default: 576 max: 16384 min: 16 step: 8
             * @param opts.height default: 576 max: 16384 min: 16 step: 8
             * @param opts.video_frames default: 21 max: 4096 min: 1
             * @param opts.elevation max: 90 min: -90 step: 0.1}
            */
            constructor(opts: {
                'clip_vision': CLIP_VISION, 'init_image': IMAGE, 'vae': VAE, 'width'?: INT, 'height'?: INT, 'video_frames'?: INT, 'elevation'?: FLOAT
            }) {
                super(ctx);

                super.$$link("clip_vision", opts['clip_vision'])
                super.$$link("init_image", opts['init_image'])
                super.$$link("vae", opts['vae'])
                super.$$link("width", opts['width'] ?? tmp["SV3D_Conditioning"].defaults['width'])
                super.$$link("height", opts['height'] ?? tmp["SV3D_Conditioning"].defaults['height'])
                super.$$link("video_frames", opts['video_frames'] ?? tmp["SV3D_Conditioning"].defaults['video_frames'])
                super.$$link("elevation", opts['elevation'] ?? tmp["SV3D_Conditioning"].defaults['elevation'])
            }

            static defaults = {
                'width': 576,
                'height': 576,
                'video_frames': 21,
                'elevation': 0
            }
            protected override $$type() {
                return "SV3D_Conditioning"
            }
        },

        /**
         * SD_4XUpscale_Conditioning from conditioning/upscale_diffusion
         * @desc 
        */
        "SD_4XUpscale_Conditioning": class extends Node {
            //Getters
            get 'positive'(): CONDITIONING { return [this.$uid.toString(), 0] as unknown as CONDITIONING; }
            get 'negative'(): CONDITIONING { return [this.$uid.toString(), 1] as unknown as CONDITIONING; }
            get 'latent'(): LATENT { return [this.$uid.toString(), 2] as unknown as LATENT; }

            /**
              * Constructor
             * @param opts.images
             * @param opts.positive
             * @param opts.negative
             * @param opts.scale_ratio default: 4 step: 0.01
             * @param opts.noise_augmentation step: 0.001}
            */
            constructor(opts: {
                'images': IMAGE, 'positive': CONDITIONING, 'negative': CONDITIONING, 'scale_ratio'?: FLOAT, 'noise_augmentation'?: FLOAT
            }) {
                super(ctx);

                super.$$link("images", opts['images'])
                super.$$link("positive", opts['positive'])
                super.$$link("negative", opts['negative'])
                super.$$link("scale_ratio", opts['scale_ratio'] ?? tmp["SD_4XUpscale_Conditioning"].defaults['scale_ratio'])
                super.$$link("noise_augmentation", opts['noise_augmentation'] ?? tmp["SD_4XUpscale_Conditioning"].defaults['noise_augmentation'])
            }

            static defaults = {
                'scale_ratio': 4,
                'noise_augmentation': 0
            }
            protected override $$type() {
                return "SD_4XUpscale_Conditioning"
            }
        },

        /**
         * PhotoMakerLoader from _for_testing/photomaker
         * @desc 
        */
        "PhotoMakerLoader": class extends Node {
            //Getters
            get 'PHOTOMAKER'(): PHOTOMAKER { return [this.$uid.toString(), 0] as unknown as PHOTOMAKER; }

            /**
              * Constructor
             * @param opts.photomaker_model_name}
            */
            constructor(opts: {
                'photomaker_model_name': $dyn
            }) {
                super(ctx);

                super.$$link("photomaker_model_name", opts['photomaker_model_name'])
            }

            static defaults = {

            }
            protected override $$type() {
                return "PhotoMakerLoader"
            }
        },

        /**
         * PhotoMakerEncode from _for_testing/photomaker
         * @desc 
        */
        "PhotoMakerEncode": class extends Node {
            //Getters
            get 'CONDITIONING'(): CONDITIONING { return [this.$uid.toString(), 0] as unknown as CONDITIONING; }

            /**
              * Constructor
             * @param opts.photomaker
             * @param opts.image
             * @param opts.clip
             * @param opts.text default: "photograph of photomaker"}
            */
            constructor(opts: {
                'photomaker': PHOTOMAKER, 'image': IMAGE, 'clip': CLIP, 'text'?: STRING
            }) {
                super(ctx);

                super.$$link("photomaker", opts['photomaker'])
                super.$$link("image", opts['image'])
                super.$$link("clip", opts['clip'])
                super.$$link("text", opts['text'] ?? tmp["PhotoMakerEncode"].defaults['text'])
            }

            static defaults = {
                'text': "photograph of photomaker"
            }
            protected override $$type() {
                return "PhotoMakerEncode"
            }
        },

        /**
         * CLIPTextEncodeControlnet from _for_testing/conditioning
         * @desc 
        */
        "CLIPTextEncodeControlnet": class extends Node {
            //Getters
            get 'CONDITIONING'(): CONDITIONING { return [this.$uid.toString(), 0] as unknown as CONDITIONING; }

            /**
              * Constructor
             * @param opts.clip
             * @param opts.conditioning
             * @param opts.text}
            */
            constructor(opts: {
                'clip': CLIP, 'conditioning': CONDITIONING, 'text': STRING
            }) {
                super(ctx);

                super.$$link("clip", opts['clip'])
                super.$$link("conditioning", opts['conditioning'])
                super.$$link("text", opts['text'])
            }

            static defaults = {

            }
            protected override $$type() {
                return "CLIPTextEncodeControlnet"
            }
        },

        /**
         * ImageMorphology from image/postprocessing
         * @desc 
        */
        "Morphology": class extends Node {
            //Getters
            get 'IMAGE'(): IMAGE { return [this.$uid.toString(), 0] as unknown as IMAGE; }

            /**
              * Constructor
             * @param opts.image
             * @param opts.operation
             * @param opts.kernel_size default: 3 max: 999 min: 3 step: 1}
            */
            constructor(opts: {
                'image': IMAGE, 'operation': 'erode' | 'dilate' | 'open' | 'close' | 'gradient' | 'bottom_hat' | 'top_hat' | $dyn, 'kernel_size'?: INT
            }) {
                super(ctx);

                super.$$link("image", opts['image'])
                super.$$link("operation", opts['operation'])
                super.$$link("kernel_size", opts['kernel_size'] ?? tmp["Morphology"].defaults['kernel_size'])
            }

            static defaults = {
                'kernel_size': 3
            }
            protected override $$type() {
                return "Morphology"
            }
        },

        /**
         * StableCascade_EmptyLatentImage from latent/stable_cascade
         * @desc 
        */
        "StableCascade_EmptyLatentImage": class extends Node {
            //Getters
            get 'stage_c'(): LATENT { return [this.$uid.toString(), 0] as unknown as LATENT; }
            get 'stage_b'(): LATENT { return [this.$uid.toString(), 1] as unknown as LATENT; }

            /**
              * Constructor
             * @param opts.width default: 1024 max: 16384 min: 256 step: 8
             * @param opts.height default: 1024 max: 16384 min: 256 step: 8
             * @param opts.compression default: 42 max: 128 min: 4 step: 1
             * @param opts.batch_size default: 1 max: 4096 min: 1}
            */
            constructor(opts: {
                'width'?: INT, 'height'?: INT, 'compression'?: INT, 'batch_size'?: INT
            }) {
                super(ctx);

                super.$$link("width", opts['width'] ?? tmp["StableCascade_EmptyLatentImage"].defaults['width'])
                super.$$link("height", opts['height'] ?? tmp["StableCascade_EmptyLatentImage"].defaults['height'])
                super.$$link("compression", opts['compression'] ?? tmp["StableCascade_EmptyLatentImage"].defaults['compression'])
                super.$$link("batch_size", opts['batch_size'] ?? tmp["StableCascade_EmptyLatentImage"].defaults['batch_size'])
            }

            static defaults = {
                'width': 1024,
                'height': 1024,
                'compression': 42,
                'batch_size': 1
            }
            protected override $$type() {
                return "StableCascade_EmptyLatentImage"
            }
        },

        /**
         * StableCascade_StageB_Conditioning from conditioning/stable_cascade
         * @desc 
        */
        "StableCascade_StageB_Conditioning": class extends Node {
            //Getters
            get 'CONDITIONING'(): CONDITIONING { return [this.$uid.toString(), 0] as unknown as CONDITIONING; }

            /**
              * Constructor
             * @param opts.conditioning
             * @param opts.stage_c}
            */
            constructor(opts: {
                'conditioning': CONDITIONING, 'stage_c': LATENT
            }) {
                super(ctx);

                super.$$link("conditioning", opts['conditioning'])
                super.$$link("stage_c", opts['stage_c'])
            }

            static defaults = {

            }
            protected override $$type() {
                return "StableCascade_StageB_Conditioning"
            }
        },

        /**
         * StableCascade_StageC_VAEEncode from latent/stable_cascade
         * @desc 
        */
        "StableCascade_StageC_VAEEncode": class extends Node {
            //Getters
            get 'stage_c'(): LATENT { return [this.$uid.toString(), 0] as unknown as LATENT; }
            get 'stage_b'(): LATENT { return [this.$uid.toString(), 1] as unknown as LATENT; }

            /**
              * Constructor
             * @param opts.image
             * @param opts.vae
             * @param opts.compression default: 42 max: 128 min: 4 step: 1}
            */
            constructor(opts: {
                'image': IMAGE, 'vae': VAE, 'compression'?: INT
            }) {
                super(ctx);

                super.$$link("image", opts['image'])
                super.$$link("vae", opts['vae'])
                super.$$link("compression", opts['compression'] ?? tmp["StableCascade_StageC_VAEEncode"].defaults['compression'])
            }

            static defaults = {
                'compression': 42
            }
            protected override $$type() {
                return "StableCascade_StageC_VAEEncode"
            }
        },

        /**
         * StableCascade_SuperResolutionControlnet from _for_testing/stable_cascade
         * @desc 
        */
        "StableCascade_SuperResolutionControlnet": class extends Node {
            //Getters
            get 'controlnet_input'(): IMAGE { return [this.$uid.toString(), 0] as unknown as IMAGE; }
            get 'stage_c'(): LATENT { return [this.$uid.toString(), 1] as unknown as LATENT; }
            get 'stage_b'(): LATENT { return [this.$uid.toString(), 2] as unknown as LATENT; }

            /**
              * Constructor
             * @param opts.image
             * @param opts.vae}
            */
            constructor(opts: {
                'image': IMAGE, 'vae': VAE
            }) {
                super(ctx);

                super.$$link("image", opts['image'])
                super.$$link("vae", opts['vae'])
            }

            static defaults = {

            }
            protected override $$type() {
                return "StableCascade_SuperResolutionControlnet"
            }
        },

        /**
         * Differential Diffusion from _for_testing
         * @desc 
        */
        "DifferentialDiffusion": class extends Node {
            //Getters
            get 'MODEL'(): MODEL { return [this.$uid.toString(), 0] as unknown as MODEL; }

            /**
              * Constructor
             * @param opts.model}
            */
            constructor(opts: {
                'model': MODEL
            }) {
                super(ctx);

                super.$$link("model", opts['model'])
            }

            static defaults = {

            }
            protected override $$type() {
                return "DifferentialDiffusion"
            }
        },

        /**
         * InstructPixToPixConditioning from conditioning/instructpix2pix
         * @desc 
        */
        "InstructPixToPixConditioning": class extends Node {
            //Getters
            get 'positive'(): CONDITIONING { return [this.$uid.toString(), 0] as unknown as CONDITIONING; }
            get 'negative'(): CONDITIONING { return [this.$uid.toString(), 1] as unknown as CONDITIONING; }
            get 'latent'(): LATENT { return [this.$uid.toString(), 2] as unknown as LATENT; }

            /**
              * Constructor
             * @param opts.positive
             * @param opts.negative
             * @param opts.vae
             * @param opts.pixels}
            */
            constructor(opts: {
                'positive': CONDITIONING, 'negative': CONDITIONING, 'vae': VAE, 'pixels': IMAGE
            }) {
                super(ctx);

                super.$$link("positive", opts['positive'])
                super.$$link("negative", opts['negative'])
                super.$$link("vae", opts['vae'])
                super.$$link("pixels", opts['pixels'])
            }

            static defaults = {

            }
            protected override $$type() {
                return "InstructPixToPixConditioning"
            }
        },

        /**
         * ModelMergeSD1 from advanced/model_merging/model_specific
         * @desc 
        */
        "ModelMergeSD1": class extends Node {
            //Getters
            get 'MODEL'(): MODEL { return [this.$uid.toString(), 0] as unknown as MODEL; }

            /**
              * Constructor
             * @param opts.model1
             * @param opts.model2
             * @param opts.time_embed. default: 1 step: 0.01
             * @param opts.label_emb. default: 1 step: 0.01
             * @param opts.input_blocks.0. default: 1 step: 0.01
             * @param opts.input_blocks.1. default: 1 step: 0.01
             * @param opts.input_blocks.2. default: 1 step: 0.01
             * @param opts.input_blocks.3. default: 1 step: 0.01
             * @param opts.input_blocks.4. default: 1 step: 0.01
             * @param opts.input_blocks.5. default: 1 step: 0.01
             * @param opts.input_blocks.6. default: 1 step: 0.01
             * @param opts.input_blocks.7. default: 1 step: 0.01
             * @param opts.input_blocks.8. default: 1 step: 0.01
             * @param opts.input_blocks.9. default: 1 step: 0.01
             * @param opts.input_blocks.10. default: 1 step: 0.01
             * @param opts.input_blocks.11. default: 1 step: 0.01
             * @param opts.middle_block.0. default: 1 step: 0.01
             * @param opts.middle_block.1. default: 1 step: 0.01
             * @param opts.middle_block.2. default: 1 step: 0.01
             * @param opts.output_blocks.0. default: 1 step: 0.01
             * @param opts.output_blocks.1. default: 1 step: 0.01
             * @param opts.output_blocks.2. default: 1 step: 0.01
             * @param opts.output_blocks.3. default: 1 step: 0.01
             * @param opts.output_blocks.4. default: 1 step: 0.01
             * @param opts.output_blocks.5. default: 1 step: 0.01
             * @param opts.output_blocks.6. default: 1 step: 0.01
             * @param opts.output_blocks.7. default: 1 step: 0.01
             * @param opts.output_blocks.8. default: 1 step: 0.01
             * @param opts.output_blocks.9. default: 1 step: 0.01
             * @param opts.output_blocks.10. default: 1 step: 0.01
             * @param opts.output_blocks.11. default: 1 step: 0.01
             * @param opts.out. default: 1 step: 0.01}
            */
            constructor(opts: {
                'model1': MODEL, 'model2': MODEL, 'time_embed.'?: FLOAT, 'label_emb.'?: FLOAT, 'input_blocks.0.'?: FLOAT, 'input_blocks.1.'?: FLOAT, 'input_blocks.2.'?: FLOAT, 'input_blocks.3.'?: FLOAT, 'input_blocks.4.'?: FLOAT, 'input_blocks.5.'?: FLOAT, 'input_blocks.6.'?: FLOAT, 'input_blocks.7.'?: FLOAT, 'input_blocks.8.'?: FLOAT, 'input_blocks.9.'?: FLOAT, 'input_blocks.10.'?: FLOAT, 'input_blocks.11.'?: FLOAT, 'middle_block.0.'?: FLOAT, 'middle_block.1.'?: FLOAT, 'middle_block.2.'?: FLOAT, 'output_blocks.0.'?: FLOAT, 'output_blocks.1.'?: FLOAT, 'output_blocks.2.'?: FLOAT, 'output_blocks.3.'?: FLOAT, 'output_blocks.4.'?: FLOAT, 'output_blocks.5.'?: FLOAT, 'output_blocks.6.'?: FLOAT, 'output_blocks.7.'?: FLOAT, 'output_blocks.8.'?: FLOAT, 'output_blocks.9.'?: FLOAT, 'output_blocks.10.'?: FLOAT, 'output_blocks.11.'?: FLOAT, 'out.'?: FLOAT
            }) {
                super(ctx);

                super.$$link("model1", opts['model1'])
                super.$$link("model2", opts['model2'])
                super.$$link("time_embed.", opts['time_embed.'] ?? tmp["ModelMergeSD1"].defaults['time_embed.'])
                super.$$link("label_emb.", opts['label_emb.'] ?? tmp["ModelMergeSD1"].defaults['label_emb.'])
                super.$$link("input_blocks.0.", opts['input_blocks.0.'] ?? tmp["ModelMergeSD1"].defaults['input_blocks.0.'])
                super.$$link("input_blocks.1.", opts['input_blocks.1.'] ?? tmp["ModelMergeSD1"].defaults['input_blocks.1.'])
                super.$$link("input_blocks.2.", opts['input_blocks.2.'] ?? tmp["ModelMergeSD1"].defaults['input_blocks.2.'])
                super.$$link("input_blocks.3.", opts['input_blocks.3.'] ?? tmp["ModelMergeSD1"].defaults['input_blocks.3.'])
                super.$$link("input_blocks.4.", opts['input_blocks.4.'] ?? tmp["ModelMergeSD1"].defaults['input_blocks.4.'])
                super.$$link("input_blocks.5.", opts['input_blocks.5.'] ?? tmp["ModelMergeSD1"].defaults['input_blocks.5.'])
                super.$$link("input_blocks.6.", opts['input_blocks.6.'] ?? tmp["ModelMergeSD1"].defaults['input_blocks.6.'])
                super.$$link("input_blocks.7.", opts['input_blocks.7.'] ?? tmp["ModelMergeSD1"].defaults['input_blocks.7.'])
                super.$$link("input_blocks.8.", opts['input_blocks.8.'] ?? tmp["ModelMergeSD1"].defaults['input_blocks.8.'])
                super.$$link("input_blocks.9.", opts['input_blocks.9.'] ?? tmp["ModelMergeSD1"].defaults['input_blocks.9.'])
                super.$$link("input_blocks.10.", opts['input_blocks.10.'] ?? tmp["ModelMergeSD1"].defaults['input_blocks.10.'])
                super.$$link("input_blocks.11.", opts['input_blocks.11.'] ?? tmp["ModelMergeSD1"].defaults['input_blocks.11.'])
                super.$$link("middle_block.0.", opts['middle_block.0.'] ?? tmp["ModelMergeSD1"].defaults['middle_block.0.'])
                super.$$link("middle_block.1.", opts['middle_block.1.'] ?? tmp["ModelMergeSD1"].defaults['middle_block.1.'])
                super.$$link("middle_block.2.", opts['middle_block.2.'] ?? tmp["ModelMergeSD1"].defaults['middle_block.2.'])
                super.$$link("output_blocks.0.", opts['output_blocks.0.'] ?? tmp["ModelMergeSD1"].defaults['output_blocks.0.'])
                super.$$link("output_blocks.1.", opts['output_blocks.1.'] ?? tmp["ModelMergeSD1"].defaults['output_blocks.1.'])
                super.$$link("output_blocks.2.", opts['output_blocks.2.'] ?? tmp["ModelMergeSD1"].defaults['output_blocks.2.'])
                super.$$link("output_blocks.3.", opts['output_blocks.3.'] ?? tmp["ModelMergeSD1"].defaults['output_blocks.3.'])
                super.$$link("output_blocks.4.", opts['output_blocks.4.'] ?? tmp["ModelMergeSD1"].defaults['output_blocks.4.'])
                super.$$link("output_blocks.5.", opts['output_blocks.5.'] ?? tmp["ModelMergeSD1"].defaults['output_blocks.5.'])
                super.$$link("output_blocks.6.", opts['output_blocks.6.'] ?? tmp["ModelMergeSD1"].defaults['output_blocks.6.'])
                super.$$link("output_blocks.7.", opts['output_blocks.7.'] ?? tmp["ModelMergeSD1"].defaults['output_blocks.7.'])
                super.$$link("output_blocks.8.", opts['output_blocks.8.'] ?? tmp["ModelMergeSD1"].defaults['output_blocks.8.'])
                super.$$link("output_blocks.9.", opts['output_blocks.9.'] ?? tmp["ModelMergeSD1"].defaults['output_blocks.9.'])
                super.$$link("output_blocks.10.", opts['output_blocks.10.'] ?? tmp["ModelMergeSD1"].defaults['output_blocks.10.'])
                super.$$link("output_blocks.11.", opts['output_blocks.11.'] ?? tmp["ModelMergeSD1"].defaults['output_blocks.11.'])
                super.$$link("out.", opts['out.'] ?? tmp["ModelMergeSD1"].defaults['out.'])
            }

            static defaults = {
                'time_embed.': 1,
                'label_emb.': 1,
                'input_blocks.0.': 1,
                'input_blocks.1.': 1,
                'input_blocks.2.': 1,
                'input_blocks.3.': 1,
                'input_blocks.4.': 1,
                'input_blocks.5.': 1,
                'input_blocks.6.': 1,
                'input_blocks.7.': 1,
                'input_blocks.8.': 1,
                'input_blocks.9.': 1,
                'input_blocks.10.': 1,
                'input_blocks.11.': 1,
                'middle_block.0.': 1,
                'middle_block.1.': 1,
                'middle_block.2.': 1,
                'output_blocks.0.': 1,
                'output_blocks.1.': 1,
                'output_blocks.2.': 1,
                'output_blocks.3.': 1,
                'output_blocks.4.': 1,
                'output_blocks.5.': 1,
                'output_blocks.6.': 1,
                'output_blocks.7.': 1,
                'output_blocks.8.': 1,
                'output_blocks.9.': 1,
                'output_blocks.10.': 1,
                'output_blocks.11.': 1,
                'out.': 1
            }
            protected override $$type() {
                return "ModelMergeSD1"
            }
        },

        /**
         * ModelMergeSD2 from advanced/model_merging/model_specific
         * @desc 
        */
        "ModelMergeSD2": class extends Node {
            //Getters
            get 'MODEL'(): MODEL { return [this.$uid.toString(), 0] as unknown as MODEL; }

            /**
              * Constructor
             * @param opts.model1
             * @param opts.model2
             * @param opts.time_embed. default: 1 step: 0.01
             * @param opts.label_emb. default: 1 step: 0.01
             * @param opts.input_blocks.0. default: 1 step: 0.01
             * @param opts.input_blocks.1. default: 1 step: 0.01
             * @param opts.input_blocks.2. default: 1 step: 0.01
             * @param opts.input_blocks.3. default: 1 step: 0.01
             * @param opts.input_blocks.4. default: 1 step: 0.01
             * @param opts.input_blocks.5. default: 1 step: 0.01
             * @param opts.input_blocks.6. default: 1 step: 0.01
             * @param opts.input_blocks.7. default: 1 step: 0.01
             * @param opts.input_blocks.8. default: 1 step: 0.01
             * @param opts.input_blocks.9. default: 1 step: 0.01
             * @param opts.input_blocks.10. default: 1 step: 0.01
             * @param opts.input_blocks.11. default: 1 step: 0.01
             * @param opts.middle_block.0. default: 1 step: 0.01
             * @param opts.middle_block.1. default: 1 step: 0.01
             * @param opts.middle_block.2. default: 1 step: 0.01
             * @param opts.output_blocks.0. default: 1 step: 0.01
             * @param opts.output_blocks.1. default: 1 step: 0.01
             * @param opts.output_blocks.2. default: 1 step: 0.01
             * @param opts.output_blocks.3. default: 1 step: 0.01
             * @param opts.output_blocks.4. default: 1 step: 0.01
             * @param opts.output_blocks.5. default: 1 step: 0.01
             * @param opts.output_blocks.6. default: 1 step: 0.01
             * @param opts.output_blocks.7. default: 1 step: 0.01
             * @param opts.output_blocks.8. default: 1 step: 0.01
             * @param opts.output_blocks.9. default: 1 step: 0.01
             * @param opts.output_blocks.10. default: 1 step: 0.01
             * @param opts.output_blocks.11. default: 1 step: 0.01
             * @param opts.out. default: 1 step: 0.01}
            */
            constructor(opts: {
                'model1': MODEL, 'model2': MODEL, 'time_embed.'?: FLOAT, 'label_emb.'?: FLOAT, 'input_blocks.0.'?: FLOAT, 'input_blocks.1.'?: FLOAT, 'input_blocks.2.'?: FLOAT, 'input_blocks.3.'?: FLOAT, 'input_blocks.4.'?: FLOAT, 'input_blocks.5.'?: FLOAT, 'input_blocks.6.'?: FLOAT, 'input_blocks.7.'?: FLOAT, 'input_blocks.8.'?: FLOAT, 'input_blocks.9.'?: FLOAT, 'input_blocks.10.'?: FLOAT, 'input_blocks.11.'?: FLOAT, 'middle_block.0.'?: FLOAT, 'middle_block.1.'?: FLOAT, 'middle_block.2.'?: FLOAT, 'output_blocks.0.'?: FLOAT, 'output_blocks.1.'?: FLOAT, 'output_blocks.2.'?: FLOAT, 'output_blocks.3.'?: FLOAT, 'output_blocks.4.'?: FLOAT, 'output_blocks.5.'?: FLOAT, 'output_blocks.6.'?: FLOAT, 'output_blocks.7.'?: FLOAT, 'output_blocks.8.'?: FLOAT, 'output_blocks.9.'?: FLOAT, 'output_blocks.10.'?: FLOAT, 'output_blocks.11.'?: FLOAT, 'out.'?: FLOAT
            }) {
                super(ctx);

                super.$$link("model1", opts['model1'])
                super.$$link("model2", opts['model2'])
                super.$$link("time_embed.", opts['time_embed.'] ?? tmp["ModelMergeSD2"].defaults['time_embed.'])
                super.$$link("label_emb.", opts['label_emb.'] ?? tmp["ModelMergeSD2"].defaults['label_emb.'])
                super.$$link("input_blocks.0.", opts['input_blocks.0.'] ?? tmp["ModelMergeSD2"].defaults['input_blocks.0.'])
                super.$$link("input_blocks.1.", opts['input_blocks.1.'] ?? tmp["ModelMergeSD2"].defaults['input_blocks.1.'])
                super.$$link("input_blocks.2.", opts['input_blocks.2.'] ?? tmp["ModelMergeSD2"].defaults['input_blocks.2.'])
                super.$$link("input_blocks.3.", opts['input_blocks.3.'] ?? tmp["ModelMergeSD2"].defaults['input_blocks.3.'])
                super.$$link("input_blocks.4.", opts['input_blocks.4.'] ?? tmp["ModelMergeSD2"].defaults['input_blocks.4.'])
                super.$$link("input_blocks.5.", opts['input_blocks.5.'] ?? tmp["ModelMergeSD2"].defaults['input_blocks.5.'])
                super.$$link("input_blocks.6.", opts['input_blocks.6.'] ?? tmp["ModelMergeSD2"].defaults['input_blocks.6.'])
                super.$$link("input_blocks.7.", opts['input_blocks.7.'] ?? tmp["ModelMergeSD2"].defaults['input_blocks.7.'])
                super.$$link("input_blocks.8.", opts['input_blocks.8.'] ?? tmp["ModelMergeSD2"].defaults['input_blocks.8.'])
                super.$$link("input_blocks.9.", opts['input_blocks.9.'] ?? tmp["ModelMergeSD2"].defaults['input_blocks.9.'])
                super.$$link("input_blocks.10.", opts['input_blocks.10.'] ?? tmp["ModelMergeSD2"].defaults['input_blocks.10.'])
                super.$$link("input_blocks.11.", opts['input_blocks.11.'] ?? tmp["ModelMergeSD2"].defaults['input_blocks.11.'])
                super.$$link("middle_block.0.", opts['middle_block.0.'] ?? tmp["ModelMergeSD2"].defaults['middle_block.0.'])
                super.$$link("middle_block.1.", opts['middle_block.1.'] ?? tmp["ModelMergeSD2"].defaults['middle_block.1.'])
                super.$$link("middle_block.2.", opts['middle_block.2.'] ?? tmp["ModelMergeSD2"].defaults['middle_block.2.'])
                super.$$link("output_blocks.0.", opts['output_blocks.0.'] ?? tmp["ModelMergeSD2"].defaults['output_blocks.0.'])
                super.$$link("output_blocks.1.", opts['output_blocks.1.'] ?? tmp["ModelMergeSD2"].defaults['output_blocks.1.'])
                super.$$link("output_blocks.2.", opts['output_blocks.2.'] ?? tmp["ModelMergeSD2"].defaults['output_blocks.2.'])
                super.$$link("output_blocks.3.", opts['output_blocks.3.'] ?? tmp["ModelMergeSD2"].defaults['output_blocks.3.'])
                super.$$link("output_blocks.4.", opts['output_blocks.4.'] ?? tmp["ModelMergeSD2"].defaults['output_blocks.4.'])
                super.$$link("output_blocks.5.", opts['output_blocks.5.'] ?? tmp["ModelMergeSD2"].defaults['output_blocks.5.'])
                super.$$link("output_blocks.6.", opts['output_blocks.6.'] ?? tmp["ModelMergeSD2"].defaults['output_blocks.6.'])
                super.$$link("output_blocks.7.", opts['output_blocks.7.'] ?? tmp["ModelMergeSD2"].defaults['output_blocks.7.'])
                super.$$link("output_blocks.8.", opts['output_blocks.8.'] ?? tmp["ModelMergeSD2"].defaults['output_blocks.8.'])
                super.$$link("output_blocks.9.", opts['output_blocks.9.'] ?? tmp["ModelMergeSD2"].defaults['output_blocks.9.'])
                super.$$link("output_blocks.10.", opts['output_blocks.10.'] ?? tmp["ModelMergeSD2"].defaults['output_blocks.10.'])
                super.$$link("output_blocks.11.", opts['output_blocks.11.'] ?? tmp["ModelMergeSD2"].defaults['output_blocks.11.'])
                super.$$link("out.", opts['out.'] ?? tmp["ModelMergeSD2"].defaults['out.'])
            }

            static defaults = {
                'time_embed.': 1,
                'label_emb.': 1,
                'input_blocks.0.': 1,
                'input_blocks.1.': 1,
                'input_blocks.2.': 1,
                'input_blocks.3.': 1,
                'input_blocks.4.': 1,
                'input_blocks.5.': 1,
                'input_blocks.6.': 1,
                'input_blocks.7.': 1,
                'input_blocks.8.': 1,
                'input_blocks.9.': 1,
                'input_blocks.10.': 1,
                'input_blocks.11.': 1,
                'middle_block.0.': 1,
                'middle_block.1.': 1,
                'middle_block.2.': 1,
                'output_blocks.0.': 1,
                'output_blocks.1.': 1,
                'output_blocks.2.': 1,
                'output_blocks.3.': 1,
                'output_blocks.4.': 1,
                'output_blocks.5.': 1,
                'output_blocks.6.': 1,
                'output_blocks.7.': 1,
                'output_blocks.8.': 1,
                'output_blocks.9.': 1,
                'output_blocks.10.': 1,
                'output_blocks.11.': 1,
                'out.': 1
            }
            protected override $$type() {
                return "ModelMergeSD2"
            }
        },

        /**
         * ModelMergeSDXL from advanced/model_merging/model_specific
         * @desc 
        */
        "ModelMergeSDXL": class extends Node {
            //Getters
            get 'MODEL'(): MODEL { return [this.$uid.toString(), 0] as unknown as MODEL; }

            /**
              * Constructor
             * @param opts.model1
             * @param opts.model2
             * @param opts.time_embed. default: 1 step: 0.01
             * @param opts.label_emb. default: 1 step: 0.01
             * @param opts.input_blocks.0 default: 1 step: 0.01
             * @param opts.input_blocks.1 default: 1 step: 0.01
             * @param opts.input_blocks.2 default: 1 step: 0.01
             * @param opts.input_blocks.3 default: 1 step: 0.01
             * @param opts.input_blocks.4 default: 1 step: 0.01
             * @param opts.input_blocks.5 default: 1 step: 0.01
             * @param opts.input_blocks.6 default: 1 step: 0.01
             * @param opts.input_blocks.7 default: 1 step: 0.01
             * @param opts.input_blocks.8 default: 1 step: 0.01
             * @param opts.middle_block.0 default: 1 step: 0.01
             * @param opts.middle_block.1 default: 1 step: 0.01
             * @param opts.middle_block.2 default: 1 step: 0.01
             * @param opts.output_blocks.0 default: 1 step: 0.01
             * @param opts.output_blocks.1 default: 1 step: 0.01
             * @param opts.output_blocks.2 default: 1 step: 0.01
             * @param opts.output_blocks.3 default: 1 step: 0.01
             * @param opts.output_blocks.4 default: 1 step: 0.01
             * @param opts.output_blocks.5 default: 1 step: 0.01
             * @param opts.output_blocks.6 default: 1 step: 0.01
             * @param opts.output_blocks.7 default: 1 step: 0.01
             * @param opts.output_blocks.8 default: 1 step: 0.01
             * @param opts.out. default: 1 step: 0.01}
            */
            constructor(opts: {
                'model1': MODEL, 'model2': MODEL, 'time_embed.'?: FLOAT, 'label_emb.'?: FLOAT, 'input_blocks.0'?: FLOAT, 'input_blocks.1'?: FLOAT, 'input_blocks.2'?: FLOAT, 'input_blocks.3'?: FLOAT, 'input_blocks.4'?: FLOAT, 'input_blocks.5'?: FLOAT, 'input_blocks.6'?: FLOAT, 'input_blocks.7'?: FLOAT, 'input_blocks.8'?: FLOAT, 'middle_block.0'?: FLOAT, 'middle_block.1'?: FLOAT, 'middle_block.2'?: FLOAT, 'output_blocks.0'?: FLOAT, 'output_blocks.1'?: FLOAT, 'output_blocks.2'?: FLOAT, 'output_blocks.3'?: FLOAT, 'output_blocks.4'?: FLOAT, 'output_blocks.5'?: FLOAT, 'output_blocks.6'?: FLOAT, 'output_blocks.7'?: FLOAT, 'output_blocks.8'?: FLOAT, 'out.'?: FLOAT
            }) {
                super(ctx);

                super.$$link("model1", opts['model1'])
                super.$$link("model2", opts['model2'])
                super.$$link("time_embed.", opts['time_embed.'] ?? tmp["ModelMergeSDXL"].defaults['time_embed.'])
                super.$$link("label_emb.", opts['label_emb.'] ?? tmp["ModelMergeSDXL"].defaults['label_emb.'])
                super.$$link("input_blocks.0", opts['input_blocks.0'] ?? tmp["ModelMergeSDXL"].defaults['input_blocks.0'])
                super.$$link("input_blocks.1", opts['input_blocks.1'] ?? tmp["ModelMergeSDXL"].defaults['input_blocks.1'])
                super.$$link("input_blocks.2", opts['input_blocks.2'] ?? tmp["ModelMergeSDXL"].defaults['input_blocks.2'])
                super.$$link("input_blocks.3", opts['input_blocks.3'] ?? tmp["ModelMergeSDXL"].defaults['input_blocks.3'])
                super.$$link("input_blocks.4", opts['input_blocks.4'] ?? tmp["ModelMergeSDXL"].defaults['input_blocks.4'])
                super.$$link("input_blocks.5", opts['input_blocks.5'] ?? tmp["ModelMergeSDXL"].defaults['input_blocks.5'])
                super.$$link("input_blocks.6", opts['input_blocks.6'] ?? tmp["ModelMergeSDXL"].defaults['input_blocks.6'])
                super.$$link("input_blocks.7", opts['input_blocks.7'] ?? tmp["ModelMergeSDXL"].defaults['input_blocks.7'])
                super.$$link("input_blocks.8", opts['input_blocks.8'] ?? tmp["ModelMergeSDXL"].defaults['input_blocks.8'])
                super.$$link("middle_block.0", opts['middle_block.0'] ?? tmp["ModelMergeSDXL"].defaults['middle_block.0'])
                super.$$link("middle_block.1", opts['middle_block.1'] ?? tmp["ModelMergeSDXL"].defaults['middle_block.1'])
                super.$$link("middle_block.2", opts['middle_block.2'] ?? tmp["ModelMergeSDXL"].defaults['middle_block.2'])
                super.$$link("output_blocks.0", opts['output_blocks.0'] ?? tmp["ModelMergeSDXL"].defaults['output_blocks.0'])
                super.$$link("output_blocks.1", opts['output_blocks.1'] ?? tmp["ModelMergeSDXL"].defaults['output_blocks.1'])
                super.$$link("output_blocks.2", opts['output_blocks.2'] ?? tmp["ModelMergeSDXL"].defaults['output_blocks.2'])
                super.$$link("output_blocks.3", opts['output_blocks.3'] ?? tmp["ModelMergeSDXL"].defaults['output_blocks.3'])
                super.$$link("output_blocks.4", opts['output_blocks.4'] ?? tmp["ModelMergeSDXL"].defaults['output_blocks.4'])
                super.$$link("output_blocks.5", opts['output_blocks.5'] ?? tmp["ModelMergeSDXL"].defaults['output_blocks.5'])
                super.$$link("output_blocks.6", opts['output_blocks.6'] ?? tmp["ModelMergeSDXL"].defaults['output_blocks.6'])
                super.$$link("output_blocks.7", opts['output_blocks.7'] ?? tmp["ModelMergeSDXL"].defaults['output_blocks.7'])
                super.$$link("output_blocks.8", opts['output_blocks.8'] ?? tmp["ModelMergeSDXL"].defaults['output_blocks.8'])
                super.$$link("out.", opts['out.'] ?? tmp["ModelMergeSDXL"].defaults['out.'])
            }

            static defaults = {
                'time_embed.': 1,
                'label_emb.': 1,
                'input_blocks.0': 1,
                'input_blocks.1': 1,
                'input_blocks.2': 1,
                'input_blocks.3': 1,
                'input_blocks.4': 1,
                'input_blocks.5': 1,
                'input_blocks.6': 1,
                'input_blocks.7': 1,
                'input_blocks.8': 1,
                'middle_block.0': 1,
                'middle_block.1': 1,
                'middle_block.2': 1,
                'output_blocks.0': 1,
                'output_blocks.1': 1,
                'output_blocks.2': 1,
                'output_blocks.3': 1,
                'output_blocks.4': 1,
                'output_blocks.5': 1,
                'output_blocks.6': 1,
                'output_blocks.7': 1,
                'output_blocks.8': 1,
                'out.': 1
            }
            protected override $$type() {
                return "ModelMergeSDXL"
            }
        },

        /**
         * ModelMergeSD3_2B from advanced/model_merging/model_specific
         * @desc 
        */
        "ModelMergeSD3_2B": class extends Node {
            //Getters
            get 'MODEL'(): MODEL { return [this.$uid.toString(), 0] as unknown as MODEL; }

            /**
              * Constructor
             * @param opts.model1
             * @param opts.model2
             * @param opts.pos_embed. default: 1 step: 0.01
             * @param opts.x_embedder. default: 1 step: 0.01
             * @param opts.context_embedder. default: 1 step: 0.01
             * @param opts.y_embedder. default: 1 step: 0.01
             * @param opts.t_embedder. default: 1 step: 0.01
             * @param opts.joint_blocks.0. default: 1 step: 0.01
             * @param opts.joint_blocks.1. default: 1 step: 0.01
             * @param opts.joint_blocks.2. default: 1 step: 0.01
             * @param opts.joint_blocks.3. default: 1 step: 0.01
             * @param opts.joint_blocks.4. default: 1 step: 0.01
             * @param opts.joint_blocks.5. default: 1 step: 0.01
             * @param opts.joint_blocks.6. default: 1 step: 0.01
             * @param opts.joint_blocks.7. default: 1 step: 0.01
             * @param opts.joint_blocks.8. default: 1 step: 0.01
             * @param opts.joint_blocks.9. default: 1 step: 0.01
             * @param opts.joint_blocks.10. default: 1 step: 0.01
             * @param opts.joint_blocks.11. default: 1 step: 0.01
             * @param opts.joint_blocks.12. default: 1 step: 0.01
             * @param opts.joint_blocks.13. default: 1 step: 0.01
             * @param opts.joint_blocks.14. default: 1 step: 0.01
             * @param opts.joint_blocks.15. default: 1 step: 0.01
             * @param opts.joint_blocks.16. default: 1 step: 0.01
             * @param opts.joint_blocks.17. default: 1 step: 0.01
             * @param opts.joint_blocks.18. default: 1 step: 0.01
             * @param opts.joint_blocks.19. default: 1 step: 0.01
             * @param opts.joint_blocks.20. default: 1 step: 0.01
             * @param opts.joint_blocks.21. default: 1 step: 0.01
             * @param opts.joint_blocks.22. default: 1 step: 0.01
             * @param opts.joint_blocks.23. default: 1 step: 0.01
             * @param opts.final_layer. default: 1 step: 0.01}
            */
            constructor(opts: {
                'model1': MODEL, 'model2': MODEL, 'pos_embed.'?: FLOAT, 'x_embedder.'?: FLOAT, 'context_embedder.'?: FLOAT, 'y_embedder.'?: FLOAT, 't_embedder.'?: FLOAT, 'joint_blocks.0.'?: FLOAT, 'joint_blocks.1.'?: FLOAT, 'joint_blocks.2.'?: FLOAT, 'joint_blocks.3.'?: FLOAT, 'joint_blocks.4.'?: FLOAT, 'joint_blocks.5.'?: FLOAT, 'joint_blocks.6.'?: FLOAT, 'joint_blocks.7.'?: FLOAT, 'joint_blocks.8.'?: FLOAT, 'joint_blocks.9.'?: FLOAT, 'joint_blocks.10.'?: FLOAT, 'joint_blocks.11.'?: FLOAT, 'joint_blocks.12.'?: FLOAT, 'joint_blocks.13.'?: FLOAT, 'joint_blocks.14.'?: FLOAT, 'joint_blocks.15.'?: FLOAT, 'joint_blocks.16.'?: FLOAT, 'joint_blocks.17.'?: FLOAT, 'joint_blocks.18.'?: FLOAT, 'joint_blocks.19.'?: FLOAT, 'joint_blocks.20.'?: FLOAT, 'joint_blocks.21.'?: FLOAT, 'joint_blocks.22.'?: FLOAT, 'joint_blocks.23.'?: FLOAT, 'final_layer.'?: FLOAT
            }) {
                super(ctx);

                super.$$link("model1", opts['model1'])
                super.$$link("model2", opts['model2'])
                super.$$link("pos_embed.", opts['pos_embed.'] ?? tmp["ModelMergeSD3_2B"].defaults['pos_embed.'])
                super.$$link("x_embedder.", opts['x_embedder.'] ?? tmp["ModelMergeSD3_2B"].defaults['x_embedder.'])
                super.$$link("context_embedder.", opts['context_embedder.'] ?? tmp["ModelMergeSD3_2B"].defaults['context_embedder.'])
                super.$$link("y_embedder.", opts['y_embedder.'] ?? tmp["ModelMergeSD3_2B"].defaults['y_embedder.'])
                super.$$link("t_embedder.", opts['t_embedder.'] ?? tmp["ModelMergeSD3_2B"].defaults['t_embedder.'])
                super.$$link("joint_blocks.0.", opts['joint_blocks.0.'] ?? tmp["ModelMergeSD3_2B"].defaults['joint_blocks.0.'])
                super.$$link("joint_blocks.1.", opts['joint_blocks.1.'] ?? tmp["ModelMergeSD3_2B"].defaults['joint_blocks.1.'])
                super.$$link("joint_blocks.2.", opts['joint_blocks.2.'] ?? tmp["ModelMergeSD3_2B"].defaults['joint_blocks.2.'])
                super.$$link("joint_blocks.3.", opts['joint_blocks.3.'] ?? tmp["ModelMergeSD3_2B"].defaults['joint_blocks.3.'])
                super.$$link("joint_blocks.4.", opts['joint_blocks.4.'] ?? tmp["ModelMergeSD3_2B"].defaults['joint_blocks.4.'])
                super.$$link("joint_blocks.5.", opts['joint_blocks.5.'] ?? tmp["ModelMergeSD3_2B"].defaults['joint_blocks.5.'])
                super.$$link("joint_blocks.6.", opts['joint_blocks.6.'] ?? tmp["ModelMergeSD3_2B"].defaults['joint_blocks.6.'])
                super.$$link("joint_blocks.7.", opts['joint_blocks.7.'] ?? tmp["ModelMergeSD3_2B"].defaults['joint_blocks.7.'])
                super.$$link("joint_blocks.8.", opts['joint_blocks.8.'] ?? tmp["ModelMergeSD3_2B"].defaults['joint_blocks.8.'])
                super.$$link("joint_blocks.9.", opts['joint_blocks.9.'] ?? tmp["ModelMergeSD3_2B"].defaults['joint_blocks.9.'])
                super.$$link("joint_blocks.10.", opts['joint_blocks.10.'] ?? tmp["ModelMergeSD3_2B"].defaults['joint_blocks.10.'])
                super.$$link("joint_blocks.11.", opts['joint_blocks.11.'] ?? tmp["ModelMergeSD3_2B"].defaults['joint_blocks.11.'])
                super.$$link("joint_blocks.12.", opts['joint_blocks.12.'] ?? tmp["ModelMergeSD3_2B"].defaults['joint_blocks.12.'])
                super.$$link("joint_blocks.13.", opts['joint_blocks.13.'] ?? tmp["ModelMergeSD3_2B"].defaults['joint_blocks.13.'])
                super.$$link("joint_blocks.14.", opts['joint_blocks.14.'] ?? tmp["ModelMergeSD3_2B"].defaults['joint_blocks.14.'])
                super.$$link("joint_blocks.15.", opts['joint_blocks.15.'] ?? tmp["ModelMergeSD3_2B"].defaults['joint_blocks.15.'])
                super.$$link("joint_blocks.16.", opts['joint_blocks.16.'] ?? tmp["ModelMergeSD3_2B"].defaults['joint_blocks.16.'])
                super.$$link("joint_blocks.17.", opts['joint_blocks.17.'] ?? tmp["ModelMergeSD3_2B"].defaults['joint_blocks.17.'])
                super.$$link("joint_blocks.18.", opts['joint_blocks.18.'] ?? tmp["ModelMergeSD3_2B"].defaults['joint_blocks.18.'])
                super.$$link("joint_blocks.19.", opts['joint_blocks.19.'] ?? tmp["ModelMergeSD3_2B"].defaults['joint_blocks.19.'])
                super.$$link("joint_blocks.20.", opts['joint_blocks.20.'] ?? tmp["ModelMergeSD3_2B"].defaults['joint_blocks.20.'])
                super.$$link("joint_blocks.21.", opts['joint_blocks.21.'] ?? tmp["ModelMergeSD3_2B"].defaults['joint_blocks.21.'])
                super.$$link("joint_blocks.22.", opts['joint_blocks.22.'] ?? tmp["ModelMergeSD3_2B"].defaults['joint_blocks.22.'])
                super.$$link("joint_blocks.23.", opts['joint_blocks.23.'] ?? tmp["ModelMergeSD3_2B"].defaults['joint_blocks.23.'])
                super.$$link("final_layer.", opts['final_layer.'] ?? tmp["ModelMergeSD3_2B"].defaults['final_layer.'])
            }

            static defaults = {
                'pos_embed.': 1,
                'x_embedder.': 1,
                'context_embedder.': 1,
                'y_embedder.': 1,
                't_embedder.': 1,
                'joint_blocks.0.': 1,
                'joint_blocks.1.': 1,
                'joint_blocks.2.': 1,
                'joint_blocks.3.': 1,
                'joint_blocks.4.': 1,
                'joint_blocks.5.': 1,
                'joint_blocks.6.': 1,
                'joint_blocks.7.': 1,
                'joint_blocks.8.': 1,
                'joint_blocks.9.': 1,
                'joint_blocks.10.': 1,
                'joint_blocks.11.': 1,
                'joint_blocks.12.': 1,
                'joint_blocks.13.': 1,
                'joint_blocks.14.': 1,
                'joint_blocks.15.': 1,
                'joint_blocks.16.': 1,
                'joint_blocks.17.': 1,
                'joint_blocks.18.': 1,
                'joint_blocks.19.': 1,
                'joint_blocks.20.': 1,
                'joint_blocks.21.': 1,
                'joint_blocks.22.': 1,
                'joint_blocks.23.': 1,
                'final_layer.': 1
            }
            protected override $$type() {
                return "ModelMergeSD3_2B"
            }
        },

        /**
         * ModelMergeFlux1 from advanced/model_merging/model_specific
         * @desc 
        */
        "ModelMergeFlux1": class extends Node {
            //Getters
            get 'MODEL'(): MODEL { return [this.$uid.toString(), 0] as unknown as MODEL; }

            /**
              * Constructor
             * @param opts.model1
             * @param opts.model2
             * @param opts.img_in. default: 1 step: 0.01
             * @param opts.time_in. default: 1 step: 0.01
             * @param opts.guidance_in default: 1 step: 0.01
             * @param opts.vector_in. default: 1 step: 0.01
             * @param opts.txt_in. default: 1 step: 0.01
             * @param opts.double_blocks.0. default: 1 step: 0.01
             * @param opts.double_blocks.1. default: 1 step: 0.01
             * @param opts.double_blocks.2. default: 1 step: 0.01
             * @param opts.double_blocks.3. default: 1 step: 0.01
             * @param opts.double_blocks.4. default: 1 step: 0.01
             * @param opts.double_blocks.5. default: 1 step: 0.01
             * @param opts.double_blocks.6. default: 1 step: 0.01
             * @param opts.double_blocks.7. default: 1 step: 0.01
             * @param opts.double_blocks.8. default: 1 step: 0.01
             * @param opts.double_blocks.9. default: 1 step: 0.01
             * @param opts.double_blocks.10. default: 1 step: 0.01
             * @param opts.double_blocks.11. default: 1 step: 0.01
             * @param opts.double_blocks.12. default: 1 step: 0.01
             * @param opts.double_blocks.13. default: 1 step: 0.01
             * @param opts.double_blocks.14. default: 1 step: 0.01
             * @param opts.double_blocks.15. default: 1 step: 0.01
             * @param opts.double_blocks.16. default: 1 step: 0.01
             * @param opts.double_blocks.17. default: 1 step: 0.01
             * @param opts.double_blocks.18. default: 1 step: 0.01
             * @param opts.single_blocks.0. default: 1 step: 0.01
             * @param opts.single_blocks.1. default: 1 step: 0.01
             * @param opts.single_blocks.2. default: 1 step: 0.01
             * @param opts.single_blocks.3. default: 1 step: 0.01
             * @param opts.single_blocks.4. default: 1 step: 0.01
             * @param opts.single_blocks.5. default: 1 step: 0.01
             * @param opts.single_blocks.6. default: 1 step: 0.01
             * @param opts.single_blocks.7. default: 1 step: 0.01
             * @param opts.single_blocks.8. default: 1 step: 0.01
             * @param opts.single_blocks.9. default: 1 step: 0.01
             * @param opts.single_blocks.10. default: 1 step: 0.01
             * @param opts.single_blocks.11. default: 1 step: 0.01
             * @param opts.single_blocks.12. default: 1 step: 0.01
             * @param opts.single_blocks.13. default: 1 step: 0.01
             * @param opts.single_blocks.14. default: 1 step: 0.01
             * @param opts.single_blocks.15. default: 1 step: 0.01
             * @param opts.single_blocks.16. default: 1 step: 0.01
             * @param opts.single_blocks.17. default: 1 step: 0.01
             * @param opts.single_blocks.18. default: 1 step: 0.01
             * @param opts.single_blocks.19. default: 1 step: 0.01
             * @param opts.single_blocks.20. default: 1 step: 0.01
             * @param opts.single_blocks.21. default: 1 step: 0.01
             * @param opts.single_blocks.22. default: 1 step: 0.01
             * @param opts.single_blocks.23. default: 1 step: 0.01
             * @param opts.single_blocks.24. default: 1 step: 0.01
             * @param opts.single_blocks.25. default: 1 step: 0.01
             * @param opts.single_blocks.26. default: 1 step: 0.01
             * @param opts.single_blocks.27. default: 1 step: 0.01
             * @param opts.single_blocks.28. default: 1 step: 0.01
             * @param opts.single_blocks.29. default: 1 step: 0.01
             * @param opts.single_blocks.30. default: 1 step: 0.01
             * @param opts.single_blocks.31. default: 1 step: 0.01
             * @param opts.single_blocks.32. default: 1 step: 0.01
             * @param opts.single_blocks.33. default: 1 step: 0.01
             * @param opts.single_blocks.34. default: 1 step: 0.01
             * @param opts.single_blocks.35. default: 1 step: 0.01
             * @param opts.single_blocks.36. default: 1 step: 0.01
             * @param opts.single_blocks.37. default: 1 step: 0.01
             * @param opts.final_layer. default: 1 step: 0.01}
            */
            constructor(opts: {
                'model1': MODEL, 'model2': MODEL, 'img_in.'?: FLOAT, 'time_in.'?: FLOAT, 'guidance_in'?: FLOAT, 'vector_in.'?: FLOAT, 'txt_in.'?: FLOAT, 'double_blocks.0.'?: FLOAT, 'double_blocks.1.'?: FLOAT, 'double_blocks.2.'?: FLOAT, 'double_blocks.3.'?: FLOAT, 'double_blocks.4.'?: FLOAT, 'double_blocks.5.'?: FLOAT, 'double_blocks.6.'?: FLOAT, 'double_blocks.7.'?: FLOAT, 'double_blocks.8.'?: FLOAT, 'double_blocks.9.'?: FLOAT, 'double_blocks.10.'?: FLOAT, 'double_blocks.11.'?: FLOAT, 'double_blocks.12.'?: FLOAT, 'double_blocks.13.'?: FLOAT, 'double_blocks.14.'?: FLOAT, 'double_blocks.15.'?: FLOAT, 'double_blocks.16.'?: FLOAT, 'double_blocks.17.'?: FLOAT, 'double_blocks.18.'?: FLOAT, 'single_blocks.0.'?: FLOAT, 'single_blocks.1.'?: FLOAT, 'single_blocks.2.'?: FLOAT, 'single_blocks.3.'?: FLOAT, 'single_blocks.4.'?: FLOAT, 'single_blocks.5.'?: FLOAT, 'single_blocks.6.'?: FLOAT, 'single_blocks.7.'?: FLOAT, 'single_blocks.8.'?: FLOAT, 'single_blocks.9.'?: FLOAT, 'single_blocks.10.'?: FLOAT, 'single_blocks.11.'?: FLOAT, 'single_blocks.12.'?: FLOAT, 'single_blocks.13.'?: FLOAT, 'single_blocks.14.'?: FLOAT, 'single_blocks.15.'?: FLOAT, 'single_blocks.16.'?: FLOAT, 'single_blocks.17.'?: FLOAT, 'single_blocks.18.'?: FLOAT, 'single_blocks.19.'?: FLOAT, 'single_blocks.20.'?: FLOAT, 'single_blocks.21.'?: FLOAT, 'single_blocks.22.'?: FLOAT, 'single_blocks.23.'?: FLOAT, 'single_blocks.24.'?: FLOAT, 'single_blocks.25.'?: FLOAT, 'single_blocks.26.'?: FLOAT, 'single_blocks.27.'?: FLOAT, 'single_blocks.28.'?: FLOAT, 'single_blocks.29.'?: FLOAT, 'single_blocks.30.'?: FLOAT, 'single_blocks.31.'?: FLOAT, 'single_blocks.32.'?: FLOAT, 'single_blocks.33.'?: FLOAT, 'single_blocks.34.'?: FLOAT, 'single_blocks.35.'?: FLOAT, 'single_blocks.36.'?: FLOAT, 'single_blocks.37.'?: FLOAT, 'final_layer.'?: FLOAT
            }) {
                super(ctx);

                super.$$link("model1", opts['model1'])
                super.$$link("model2", opts['model2'])
                super.$$link("img_in.", opts['img_in.'] ?? tmp["ModelMergeFlux1"].defaults['img_in.'])
                super.$$link("time_in.", opts['time_in.'] ?? tmp["ModelMergeFlux1"].defaults['time_in.'])
                super.$$link("guidance_in", opts['guidance_in'] ?? tmp["ModelMergeFlux1"].defaults['guidance_in'])
                super.$$link("vector_in.", opts['vector_in.'] ?? tmp["ModelMergeFlux1"].defaults['vector_in.'])
                super.$$link("txt_in.", opts['txt_in.'] ?? tmp["ModelMergeFlux1"].defaults['txt_in.'])
                super.$$link("double_blocks.0.", opts['double_blocks.0.'] ?? tmp["ModelMergeFlux1"].defaults['double_blocks.0.'])
                super.$$link("double_blocks.1.", opts['double_blocks.1.'] ?? tmp["ModelMergeFlux1"].defaults['double_blocks.1.'])
                super.$$link("double_blocks.2.", opts['double_blocks.2.'] ?? tmp["ModelMergeFlux1"].defaults['double_blocks.2.'])
                super.$$link("double_blocks.3.", opts['double_blocks.3.'] ?? tmp["ModelMergeFlux1"].defaults['double_blocks.3.'])
                super.$$link("double_blocks.4.", opts['double_blocks.4.'] ?? tmp["ModelMergeFlux1"].defaults['double_blocks.4.'])
                super.$$link("double_blocks.5.", opts['double_blocks.5.'] ?? tmp["ModelMergeFlux1"].defaults['double_blocks.5.'])
                super.$$link("double_blocks.6.", opts['double_blocks.6.'] ?? tmp["ModelMergeFlux1"].defaults['double_blocks.6.'])
                super.$$link("double_blocks.7.", opts['double_blocks.7.'] ?? tmp["ModelMergeFlux1"].defaults['double_blocks.7.'])
                super.$$link("double_blocks.8.", opts['double_blocks.8.'] ?? tmp["ModelMergeFlux1"].defaults['double_blocks.8.'])
                super.$$link("double_blocks.9.", opts['double_blocks.9.'] ?? tmp["ModelMergeFlux1"].defaults['double_blocks.9.'])
                super.$$link("double_blocks.10.", opts['double_blocks.10.'] ?? tmp["ModelMergeFlux1"].defaults['double_blocks.10.'])
                super.$$link("double_blocks.11.", opts['double_blocks.11.'] ?? tmp["ModelMergeFlux1"].defaults['double_blocks.11.'])
                super.$$link("double_blocks.12.", opts['double_blocks.12.'] ?? tmp["ModelMergeFlux1"].defaults['double_blocks.12.'])
                super.$$link("double_blocks.13.", opts['double_blocks.13.'] ?? tmp["ModelMergeFlux1"].defaults['double_blocks.13.'])
                super.$$link("double_blocks.14.", opts['double_blocks.14.'] ?? tmp["ModelMergeFlux1"].defaults['double_blocks.14.'])
                super.$$link("double_blocks.15.", opts['double_blocks.15.'] ?? tmp["ModelMergeFlux1"].defaults['double_blocks.15.'])
                super.$$link("double_blocks.16.", opts['double_blocks.16.'] ?? tmp["ModelMergeFlux1"].defaults['double_blocks.16.'])
                super.$$link("double_blocks.17.", opts['double_blocks.17.'] ?? tmp["ModelMergeFlux1"].defaults['double_blocks.17.'])
                super.$$link("double_blocks.18.", opts['double_blocks.18.'] ?? tmp["ModelMergeFlux1"].defaults['double_blocks.18.'])
                super.$$link("single_blocks.0.", opts['single_blocks.0.'] ?? tmp["ModelMergeFlux1"].defaults['single_blocks.0.'])
                super.$$link("single_blocks.1.", opts['single_blocks.1.'] ?? tmp["ModelMergeFlux1"].defaults['single_blocks.1.'])
                super.$$link("single_blocks.2.", opts['single_blocks.2.'] ?? tmp["ModelMergeFlux1"].defaults['single_blocks.2.'])
                super.$$link("single_blocks.3.", opts['single_blocks.3.'] ?? tmp["ModelMergeFlux1"].defaults['single_blocks.3.'])
                super.$$link("single_blocks.4.", opts['single_blocks.4.'] ?? tmp["ModelMergeFlux1"].defaults['single_blocks.4.'])
                super.$$link("single_blocks.5.", opts['single_blocks.5.'] ?? tmp["ModelMergeFlux1"].defaults['single_blocks.5.'])
                super.$$link("single_blocks.6.", opts['single_blocks.6.'] ?? tmp["ModelMergeFlux1"].defaults['single_blocks.6.'])
                super.$$link("single_blocks.7.", opts['single_blocks.7.'] ?? tmp["ModelMergeFlux1"].defaults['single_blocks.7.'])
                super.$$link("single_blocks.8.", opts['single_blocks.8.'] ?? tmp["ModelMergeFlux1"].defaults['single_blocks.8.'])
                super.$$link("single_blocks.9.", opts['single_blocks.9.'] ?? tmp["ModelMergeFlux1"].defaults['single_blocks.9.'])
                super.$$link("single_blocks.10.", opts['single_blocks.10.'] ?? tmp["ModelMergeFlux1"].defaults['single_blocks.10.'])
                super.$$link("single_blocks.11.", opts['single_blocks.11.'] ?? tmp["ModelMergeFlux1"].defaults['single_blocks.11.'])
                super.$$link("single_blocks.12.", opts['single_blocks.12.'] ?? tmp["ModelMergeFlux1"].defaults['single_blocks.12.'])
                super.$$link("single_blocks.13.", opts['single_blocks.13.'] ?? tmp["ModelMergeFlux1"].defaults['single_blocks.13.'])
                super.$$link("single_blocks.14.", opts['single_blocks.14.'] ?? tmp["ModelMergeFlux1"].defaults['single_blocks.14.'])
                super.$$link("single_blocks.15.", opts['single_blocks.15.'] ?? tmp["ModelMergeFlux1"].defaults['single_blocks.15.'])
                super.$$link("single_blocks.16.", opts['single_blocks.16.'] ?? tmp["ModelMergeFlux1"].defaults['single_blocks.16.'])
                super.$$link("single_blocks.17.", opts['single_blocks.17.'] ?? tmp["ModelMergeFlux1"].defaults['single_blocks.17.'])
                super.$$link("single_blocks.18.", opts['single_blocks.18.'] ?? tmp["ModelMergeFlux1"].defaults['single_blocks.18.'])
                super.$$link("single_blocks.19.", opts['single_blocks.19.'] ?? tmp["ModelMergeFlux1"].defaults['single_blocks.19.'])
                super.$$link("single_blocks.20.", opts['single_blocks.20.'] ?? tmp["ModelMergeFlux1"].defaults['single_blocks.20.'])
                super.$$link("single_blocks.21.", opts['single_blocks.21.'] ?? tmp["ModelMergeFlux1"].defaults['single_blocks.21.'])
                super.$$link("single_blocks.22.", opts['single_blocks.22.'] ?? tmp["ModelMergeFlux1"].defaults['single_blocks.22.'])
                super.$$link("single_blocks.23.", opts['single_blocks.23.'] ?? tmp["ModelMergeFlux1"].defaults['single_blocks.23.'])
                super.$$link("single_blocks.24.", opts['single_blocks.24.'] ?? tmp["ModelMergeFlux1"].defaults['single_blocks.24.'])
                super.$$link("single_blocks.25.", opts['single_blocks.25.'] ?? tmp["ModelMergeFlux1"].defaults['single_blocks.25.'])
                super.$$link("single_blocks.26.", opts['single_blocks.26.'] ?? tmp["ModelMergeFlux1"].defaults['single_blocks.26.'])
                super.$$link("single_blocks.27.", opts['single_blocks.27.'] ?? tmp["ModelMergeFlux1"].defaults['single_blocks.27.'])
                super.$$link("single_blocks.28.", opts['single_blocks.28.'] ?? tmp["ModelMergeFlux1"].defaults['single_blocks.28.'])
                super.$$link("single_blocks.29.", opts['single_blocks.29.'] ?? tmp["ModelMergeFlux1"].defaults['single_blocks.29.'])
                super.$$link("single_blocks.30.", opts['single_blocks.30.'] ?? tmp["ModelMergeFlux1"].defaults['single_blocks.30.'])
                super.$$link("single_blocks.31.", opts['single_blocks.31.'] ?? tmp["ModelMergeFlux1"].defaults['single_blocks.31.'])
                super.$$link("single_blocks.32.", opts['single_blocks.32.'] ?? tmp["ModelMergeFlux1"].defaults['single_blocks.32.'])
                super.$$link("single_blocks.33.", opts['single_blocks.33.'] ?? tmp["ModelMergeFlux1"].defaults['single_blocks.33.'])
                super.$$link("single_blocks.34.", opts['single_blocks.34.'] ?? tmp["ModelMergeFlux1"].defaults['single_blocks.34.'])
                super.$$link("single_blocks.35.", opts['single_blocks.35.'] ?? tmp["ModelMergeFlux1"].defaults['single_blocks.35.'])
                super.$$link("single_blocks.36.", opts['single_blocks.36.'] ?? tmp["ModelMergeFlux1"].defaults['single_blocks.36.'])
                super.$$link("single_blocks.37.", opts['single_blocks.37.'] ?? tmp["ModelMergeFlux1"].defaults['single_blocks.37.'])
                super.$$link("final_layer.", opts['final_layer.'] ?? tmp["ModelMergeFlux1"].defaults['final_layer.'])
            }

            static defaults = {
                'img_in.': 1,
                'time_in.': 1,
                'guidance_in': 1,
                'vector_in.': 1,
                'txt_in.': 1,
                'double_blocks.0.': 1,
                'double_blocks.1.': 1,
                'double_blocks.2.': 1,
                'double_blocks.3.': 1,
                'double_blocks.4.': 1,
                'double_blocks.5.': 1,
                'double_blocks.6.': 1,
                'double_blocks.7.': 1,
                'double_blocks.8.': 1,
                'double_blocks.9.': 1,
                'double_blocks.10.': 1,
                'double_blocks.11.': 1,
                'double_blocks.12.': 1,
                'double_blocks.13.': 1,
                'double_blocks.14.': 1,
                'double_blocks.15.': 1,
                'double_blocks.16.': 1,
                'double_blocks.17.': 1,
                'double_blocks.18.': 1,
                'single_blocks.0.': 1,
                'single_blocks.1.': 1,
                'single_blocks.2.': 1,
                'single_blocks.3.': 1,
                'single_blocks.4.': 1,
                'single_blocks.5.': 1,
                'single_blocks.6.': 1,
                'single_blocks.7.': 1,
                'single_blocks.8.': 1,
                'single_blocks.9.': 1,
                'single_blocks.10.': 1,
                'single_blocks.11.': 1,
                'single_blocks.12.': 1,
                'single_blocks.13.': 1,
                'single_blocks.14.': 1,
                'single_blocks.15.': 1,
                'single_blocks.16.': 1,
                'single_blocks.17.': 1,
                'single_blocks.18.': 1,
                'single_blocks.19.': 1,
                'single_blocks.20.': 1,
                'single_blocks.21.': 1,
                'single_blocks.22.': 1,
                'single_blocks.23.': 1,
                'single_blocks.24.': 1,
                'single_blocks.25.': 1,
                'single_blocks.26.': 1,
                'single_blocks.27.': 1,
                'single_blocks.28.': 1,
                'single_blocks.29.': 1,
                'single_blocks.30.': 1,
                'single_blocks.31.': 1,
                'single_blocks.32.': 1,
                'single_blocks.33.': 1,
                'single_blocks.34.': 1,
                'single_blocks.35.': 1,
                'single_blocks.36.': 1,
                'single_blocks.37.': 1,
                'final_layer.': 1
            }
            protected override $$type() {
                return "ModelMergeFlux1"
            }
        },

        /**
         * PerturbedAttentionGuidance from model_patches/unet
         * @desc 
        */
        "PerturbedAttentionGuidance": class extends Node {
            //Getters
            get 'MODEL'(): MODEL { return [this.$uid.toString(), 0] as unknown as MODEL; }

            /**
              * Constructor
             * @param opts.model
             * @param opts.scale default: 3 step: 0.01}
            */
            constructor(opts: {
                'model': MODEL, 'scale'?: FLOAT
            }) {
                super(ctx);

                super.$$link("model", opts['model'])
                super.$$link("scale", opts['scale'] ?? tmp["PerturbedAttentionGuidance"].defaults['scale'])
            }

            static defaults = {
                'scale': 3
            }
            protected override $$type() {
                return "PerturbedAttentionGuidance"
            }
        },

        /**
         * AlignYourStepsScheduler from sampling/custom_sampling/schedulers
         * @desc 
        */
        "AlignYourStepsScheduler": class extends Node {
            //Getters
            get 'SIGMAS'(): SIGMAS { return [this.$uid.toString(), 0] as unknown as SIGMAS; }

            /**
              * Constructor
             * @param opts.model_type
             * @param opts.steps default: 10 max: 10000 min: 10
             * @param opts.denoise default: 1 step: 0.01}
            */
            constructor(opts: {
                'model_type': 'SD1' | 'SDXL' | 'SVD' | $dyn, 'steps'?: INT, 'denoise'?: FLOAT
            }) {
                super(ctx);

                super.$$link("model_type", opts['model_type'])
                super.$$link("steps", opts['steps'] ?? tmp["AlignYourStepsScheduler"].defaults['steps'])
                super.$$link("denoise", opts['denoise'] ?? tmp["AlignYourStepsScheduler"].defaults['denoise'])
            }

            static defaults = {
                'steps': 10,
                'denoise': 1
            }
            protected override $$type() {
                return "AlignYourStepsScheduler"
            }
        },

        /**
         * UNetSelfAttentionMultiply from _for_testing/attention_experiments
         * @desc 
        */
        "UNetSelfAttentionMultiply": class extends Node {
            //Getters
            get 'MODEL'(): MODEL { return [this.$uid.toString(), 0] as unknown as MODEL; }

            /**
              * Constructor
             * @param opts.model
             * @param opts.q default: 1 step: 0.01
             * @param opts.k default: 1 step: 0.01
             * @param opts.v default: 1 step: 0.01
             * @param opts.out default: 1 step: 0.01}
            */
            constructor(opts: {
                'model': MODEL, 'q'?: FLOAT, 'k'?: FLOAT, 'v'?: FLOAT, 'out'?: FLOAT
            }) {
                super(ctx);

                super.$$link("model", opts['model'])
                super.$$link("q", opts['q'] ?? tmp["UNetSelfAttentionMultiply"].defaults['q'])
                super.$$link("k", opts['k'] ?? tmp["UNetSelfAttentionMultiply"].defaults['k'])
                super.$$link("v", opts['v'] ?? tmp["UNetSelfAttentionMultiply"].defaults['v'])
                super.$$link("out", opts['out'] ?? tmp["UNetSelfAttentionMultiply"].defaults['out'])
            }

            static defaults = {
                'q': 1,
                'k': 1,
                'v': 1,
                'out': 1
            }
            protected override $$type() {
                return "UNetSelfAttentionMultiply"
            }
        },

        /**
         * UNetCrossAttentionMultiply from _for_testing/attention_experiments
         * @desc 
        */
        "UNetCrossAttentionMultiply": class extends Node {
            //Getters
            get 'MODEL'(): MODEL { return [this.$uid.toString(), 0] as unknown as MODEL; }

            /**
              * Constructor
             * @param opts.model
             * @param opts.q default: 1 step: 0.01
             * @param opts.k default: 1 step: 0.01
             * @param opts.v default: 1 step: 0.01
             * @param opts.out default: 1 step: 0.01}
            */
            constructor(opts: {
                'model': MODEL, 'q'?: FLOAT, 'k'?: FLOAT, 'v'?: FLOAT, 'out'?: FLOAT
            }) {
                super(ctx);

                super.$$link("model", opts['model'])
                super.$$link("q", opts['q'] ?? tmp["UNetCrossAttentionMultiply"].defaults['q'])
                super.$$link("k", opts['k'] ?? tmp["UNetCrossAttentionMultiply"].defaults['k'])
                super.$$link("v", opts['v'] ?? tmp["UNetCrossAttentionMultiply"].defaults['v'])
                super.$$link("out", opts['out'] ?? tmp["UNetCrossAttentionMultiply"].defaults['out'])
            }

            static defaults = {
                'q': 1,
                'k': 1,
                'v': 1,
                'out': 1
            }
            protected override $$type() {
                return "UNetCrossAttentionMultiply"
            }
        },

        /**
         * CLIPAttentionMultiply from _for_testing/attention_experiments
         * @desc 
        */
        "CLIPAttentionMultiply": class extends Node {
            //Getters
            get 'CLIP'(): CLIP { return [this.$uid.toString(), 0] as unknown as CLIP; }

            /**
              * Constructor
             * @param opts.clip
             * @param opts.q default: 1 step: 0.01
             * @param opts.k default: 1 step: 0.01
             * @param opts.v default: 1 step: 0.01
             * @param opts.out default: 1 step: 0.01}
            */
            constructor(opts: {
                'clip': CLIP, 'q'?: FLOAT, 'k'?: FLOAT, 'v'?: FLOAT, 'out'?: FLOAT
            }) {
                super(ctx);

                super.$$link("clip", opts['clip'])
                super.$$link("q", opts['q'] ?? tmp["CLIPAttentionMultiply"].defaults['q'])
                super.$$link("k", opts['k'] ?? tmp["CLIPAttentionMultiply"].defaults['k'])
                super.$$link("v", opts['v'] ?? tmp["CLIPAttentionMultiply"].defaults['v'])
                super.$$link("out", opts['out'] ?? tmp["CLIPAttentionMultiply"].defaults['out'])
            }

            static defaults = {
                'q': 1,
                'k': 1,
                'v': 1,
                'out': 1
            }
            protected override $$type() {
                return "CLIPAttentionMultiply"
            }
        },

        /**
         * UNetTemporalAttentionMultiply from _for_testing/attention_experiments
         * @desc 
        */
        "UNetTemporalAttentionMultiply": class extends Node {
            //Getters
            get 'MODEL'(): MODEL { return [this.$uid.toString(), 0] as unknown as MODEL; }

            /**
              * Constructor
             * @param opts.model
             * @param opts.self_structural default: 1 step: 0.01
             * @param opts.self_temporal default: 1 step: 0.01
             * @param opts.cross_structural default: 1 step: 0.01
             * @param opts.cross_temporal default: 1 step: 0.01}
            */
            constructor(opts: {
                'model': MODEL, 'self_structural'?: FLOAT, 'self_temporal'?: FLOAT, 'cross_structural'?: FLOAT, 'cross_temporal'?: FLOAT
            }) {
                super(ctx);

                super.$$link("model", opts['model'])
                super.$$link("self_structural", opts['self_structural'] ?? tmp["UNetTemporalAttentionMultiply"].defaults['self_structural'])
                super.$$link("self_temporal", opts['self_temporal'] ?? tmp["UNetTemporalAttentionMultiply"].defaults['self_temporal'])
                super.$$link("cross_structural", opts['cross_structural'] ?? tmp["UNetTemporalAttentionMultiply"].defaults['cross_structural'])
                super.$$link("cross_temporal", opts['cross_temporal'] ?? tmp["UNetTemporalAttentionMultiply"].defaults['cross_temporal'])
            }

            static defaults = {
                'self_structural': 1,
                'self_temporal': 1,
                'cross_structural': 1,
                'cross_temporal': 1
            }
            protected override $$type() {
                return "UNetTemporalAttentionMultiply"
            }
        },

        /**
         * SamplerLCMUpscale from sampling/custom_sampling/samplers
         * @desc 
        */
        "SamplerLCMUpscale": class extends Node {
            //Getters
            get 'SAMPLER'(): SAMPLER { return [this.$uid.toString(), 0] as unknown as SAMPLER; }

            /**
              * Constructor
             * @param opts.scale_ratio default: 1 max: 20 min: 0.1 step: 0.01
             * @param opts.scale_steps default: -1 max: 1000 min: -1 step: 1
             * @param opts.upscale_method}
            */
            constructor(opts: {
                'scale_ratio'?: FLOAT, 'scale_steps'?: INT, 'upscale_method': 'bislerp' | 'nearest-exact' | 'bilinear' | 'area' | 'bicubic' | $dyn
            }) {
                super(ctx);

                super.$$link("scale_ratio", opts['scale_ratio'] ?? tmp["SamplerLCMUpscale"].defaults['scale_ratio'])
                super.$$link("scale_steps", opts['scale_steps'] ?? tmp["SamplerLCMUpscale"].defaults['scale_steps'])
                super.$$link("upscale_method", opts['upscale_method'])
            }

            static defaults = {
                'scale_ratio': 1,
                'scale_steps': -1
            }
            protected override $$type() {
                return "SamplerLCMUpscale"
            }
        },

        /**
         * SamplerEulerCFG++ from _for_testing
         * @desc 
        */
        "SamplerEulerCFGpp": class extends Node {
            //Getters
            get 'SAMPLER'(): SAMPLER { return [this.$uid.toString(), 0] as unknown as SAMPLER; }

            /**
              * Constructor
             * @param opts.version}
            */
            constructor(opts: {
                'version': 'regular' | 'alternative' | $dyn
            }) {
                super(ctx);

                super.$$link("version", opts['version'])
            }

            static defaults = {

            }
            protected override $$type() {
                return "SamplerEulerCFGpp"
            }
        },

        /**
         * Webcam Capture from image
         * @desc 
        */
        "WebcamCapture": class extends Node {
            //Getters
            get 'IMAGE'(): IMAGE { return [this.$uid.toString(), 0] as unknown as IMAGE; }

            /**
              * Constructor
             * @param opts.image
             * @param opts.width step: 1
             * @param opts.height step: 1
             * @param opts.capture_on_queue default: true}
            */
            constructor(opts: {
                'image': WEBCAM, 'width'?: INT, 'height'?: INT, 'capture_on_queue'?: BOOLEAN
            }) {
                super(ctx);

                super.$$link("image", opts['image'])
                super.$$link("width", opts['width'] ?? tmp["WebcamCapture"].defaults['width'])
                super.$$link("height", opts['height'] ?? tmp["WebcamCapture"].defaults['height'])
                super.$$link("capture_on_queue", opts['capture_on_queue'] ?? tmp["WebcamCapture"].defaults['capture_on_queue'])
            }

            static defaults = {
                'width': 0,
                'height': 0,
                'capture_on_queue': true
            }
            protected override $$type() {
                return "WebcamCapture"
            }
        },

        /**
         * EmptyLatentAudio from latent/audio
         * @desc 
        */
        "EmptyLatentAudio": class extends Node {
            //Getters
            get 'LATENT'(): LATENT { return [this.$uid.toString(), 0] as unknown as LATENT; }

            /**
              * Constructor
             * @param opts.seconds default: 47.6 max: 1000 min: 1 step: 0.1}
            */
            constructor(opts: {
                'seconds'?: FLOAT
            }) {
                super(ctx);

                super.$$link("seconds", opts['seconds'] ?? tmp["EmptyLatentAudio"].defaults['seconds'])
            }

            static defaults = {
                'seconds': 47.6
            }
            protected override $$type() {
                return "EmptyLatentAudio"
            }
        },

        /**
         * VAEEncodeAudio from latent/audio
         * @desc 
        */
        "VAEEncodeAudio": class extends Node {
            //Getters
            get 'LATENT'(): LATENT { return [this.$uid.toString(), 0] as unknown as LATENT; }

            /**
              * Constructor
             * @param opts.audio
             * @param opts.vae}
            */
            constructor(opts: {
                'audio': AUDIO, 'vae': VAE
            }) {
                super(ctx);

                super.$$link("audio", opts['audio'])
                super.$$link("vae", opts['vae'])
            }

            static defaults = {

            }
            protected override $$type() {
                return "VAEEncodeAudio"
            }
        },

        /**
         * VAEDecodeAudio from latent/audio
         * @desc 
        */
        "VAEDecodeAudio": class extends Node {
            //Getters
            get 'AUDIO'(): AUDIO { return [this.$uid.toString(), 0] as unknown as AUDIO; }

            /**
              * Constructor
             * @param opts.samples
             * @param opts.vae}
            */
            constructor(opts: {
                'samples': LATENT, 'vae': VAE
            }) {
                super(ctx);

                super.$$link("samples", opts['samples'])
                super.$$link("vae", opts['vae'])
            }

            static defaults = {

            }
            protected override $$type() {
                return "VAEDecodeAudio"
            }
        },

        /**
         * SaveAudio from audio
         * @desc 
        */
        "SaveAudio": class extends Node {
            //Getters


            /**
              * Constructor
             * @param opts.audio
             * @param opts.filename_prefix default: "audio/ComfyUI"}
            */
            constructor(opts: {
                'audio': AUDIO, 'filename_prefix'?: STRING
            }) {
                super(ctx);

                super.$$link("audio", opts['audio'])
                super.$$link("filename_prefix", opts['filename_prefix'] ?? tmp["SaveAudio"].defaults['filename_prefix'])
            }

            static defaults = {
                'filename_prefix': "audio/ComfyUI"
            }
            protected override $$type() {
                return "SaveAudio"
            }
        },

        /**
         * LoadAudio from audio
         * @desc 
        */
        "LoadAudio": class extends Node {
            //Getters
            get 'AUDIO'(): AUDIO { return [this.$uid.toString(), 0] as unknown as AUDIO; }

            /**
              * Constructor
             * @param opts.audio}
            */
            constructor(opts: {
                'audio': $dyn
            }) {
                super(ctx);

                super.$$link("audio", opts['audio'])
            }

            static defaults = {

            }
            protected override $$type() {
                return "LoadAudio"
            }
        },

        /**
         * PreviewAudio from audio
         * @desc 
        */
        "PreviewAudio": class extends Node {
            //Getters


            /**
              * Constructor
             * @param opts.audio}
            */
            constructor(opts: {
                'audio': AUDIO
            }) {
                super(ctx);

                super.$$link("audio", opts['audio'])
            }

            static defaults = {

            }
            protected override $$type() {
                return "PreviewAudio"
            }
        },

        /**
         * TripleCLIPLoader from advanced/loaders
         * @desc 
        */
        "TripleCLIPLoader": class extends Node {
            //Getters
            get 'CLIP'(): CLIP { return [this.$uid.toString(), 0] as unknown as CLIP; }

            /**
              * Constructor
             * @param opts.clip_name1
             * @param opts.clip_name2
             * @param opts.clip_name3}
            */
            constructor(opts: {
                'clip_name1': $dyn, 'clip_name2': $dyn, 'clip_name3': $dyn
            }) {
                super(ctx);

                super.$$link("clip_name1", opts['clip_name1'])
                super.$$link("clip_name2", opts['clip_name2'])
                super.$$link("clip_name3", opts['clip_name3'])
            }

            static defaults = {

            }
            protected override $$type() {
                return "TripleCLIPLoader"
            }
        },

        /**
         * EmptySD3LatentImage from latent/sd3
         * @desc 
        */
        "EmptySD3LatentImage": class extends Node {
            //Getters
            get 'LATENT'(): LATENT { return [this.$uid.toString(), 0] as unknown as LATENT; }

            /**
              * Constructor
             * @param opts.width default: 1024 max: 16384 min: 16 step: 16
             * @param opts.height default: 1024 max: 16384 min: 16 step: 16
             * @param opts.batch_size default: 1 max: 4096 min: 1}
            */
            constructor(opts: {
                'width'?: INT, 'height'?: INT, 'batch_size'?: INT
            }) {
                super(ctx);

                super.$$link("width", opts['width'] ?? tmp["EmptySD3LatentImage"].defaults['width'])
                super.$$link("height", opts['height'] ?? tmp["EmptySD3LatentImage"].defaults['height'])
                super.$$link("batch_size", opts['batch_size'] ?? tmp["EmptySD3LatentImage"].defaults['batch_size'])
            }

            static defaults = {
                'width': 1024,
                'height': 1024,
                'batch_size': 1
            }
            protected override $$type() {
                return "EmptySD3LatentImage"
            }
        },

        /**
         * CLIPTextEncodeSD3 from advanced/conditioning
         * @desc 
        */
        "CLIPTextEncodeSD3": class extends Node {
            //Getters
            get 'CONDITIONING'(): CONDITIONING { return [this.$uid.toString(), 0] as unknown as CONDITIONING; }

            /**
              * Constructor
             * @param opts.clip
             * @param opts.clip_l
             * @param opts.clip_g
             * @param opts.t5xxl
             * @param opts.empty_padding}
            */
            constructor(opts: {
                'clip': CLIP, 'clip_l': STRING, 'clip_g': STRING, 't5xxl': STRING, 'empty_padding': 'none' | 'empty_prompt' | $dyn
            }) {
                super(ctx);

                super.$$link("clip", opts['clip'])
                super.$$link("clip_l", opts['clip_l'])
                super.$$link("clip_g", opts['clip_g'])
                super.$$link("t5xxl", opts['t5xxl'])
                super.$$link("empty_padding", opts['empty_padding'])
            }

            static defaults = {

            }
            protected override $$type() {
                return "CLIPTextEncodeSD3"
            }
        },

        /**
         * ControlNetApply SD3 and HunyuanDiT from conditioning/controlnet
         * @desc 
        */
        "ControlNetApplySD3": class extends Node {
            //Getters
            get 'positive'(): CONDITIONING { return [this.$uid.toString(), 0] as unknown as CONDITIONING; }
            get 'negative'(): CONDITIONING { return [this.$uid.toString(), 1] as unknown as CONDITIONING; }

            /**
              * Constructor
             * @param opts.positive
             * @param opts.negative
             * @param opts.control_net
             * @param opts.vae
             * @param opts.image
             * @param opts.strength default: 1 step: 0.01
             * @param opts.start_percent step: 0.001
             * @param opts.end_percent default: 1 step: 0.001}
            */
            constructor(opts: {
                'positive': CONDITIONING, 'negative': CONDITIONING, 'control_net': CONTROL_NET, 'vae': VAE, 'image': IMAGE, 'strength'?: FLOAT, 'start_percent'?: FLOAT, 'end_percent'?: FLOAT
            }) {
                super(ctx);

                super.$$link("positive", opts['positive'])
                super.$$link("negative", opts['negative'])
                super.$$link("control_net", opts['control_net'])
                super.$$link("vae", opts['vae'])
                super.$$link("image", opts['image'])
                super.$$link("strength", opts['strength'] ?? tmp["ControlNetApplySD3"].defaults['strength'])
                super.$$link("start_percent", opts['start_percent'] ?? tmp["ControlNetApplySD3"].defaults['start_percent'])
                super.$$link("end_percent", opts['end_percent'] ?? tmp["ControlNetApplySD3"].defaults['end_percent'])
            }

            static defaults = {
                'strength': 1,
                'start_percent': 0,
                'end_percent': 1
            }
            protected override $$type() {
                return "ControlNetApplySD3"
            }
        },

        /**
         * GITSScheduler from sampling/custom_sampling/schedulers
         * @desc 
        */
        "GITSScheduler": class extends Node {
            //Getters
            get 'SIGMAS'(): SIGMAS { return [this.$uid.toString(), 0] as unknown as SIGMAS; }

            /**
              * Constructor
             * @param opts.coeff default: 1.2 max: 1.5 min: 0.8 step: 0.05
             * @param opts.steps default: 10 max: 1000 min: 2
             * @param opts.denoise default: 1 step: 0.01}
            */
            constructor(opts: {
                'coeff'?: FLOAT, 'steps'?: INT, 'denoise'?: FLOAT
            }) {
                super(ctx);

                super.$$link("coeff", opts['coeff'] ?? tmp["GITSScheduler"].defaults['coeff'])
                super.$$link("steps", opts['steps'] ?? tmp["GITSScheduler"].defaults['steps'])
                super.$$link("denoise", opts['denoise'] ?? tmp["GITSScheduler"].defaults['denoise'])
            }

            static defaults = {
                'coeff': 1.2,
                'steps': 10,
                'denoise': 1
            }
            protected override $$type() {
                return "GITSScheduler"
            }
        },

        /**
         * SetUnionControlNetType from conditioning/controlnet
         * @desc 
        */
        "SetUnionControlNetType": class extends Node {
            //Getters
            get 'CONTROL_NET'(): CONTROL_NET { return [this.$uid.toString(), 0] as unknown as CONTROL_NET; }

            /**
              * Constructor
             * @param opts.control_net
             * @param opts.type}
            */
            constructor(opts: {
                'control_net': CONTROL_NET, 'type': 'auto' | 'openpose' | 'depth' | 'hed/pidi/scribble/ted' | 'canny/lineart/anime_lineart/mlsd' | 'normal' | 'segment' | 'tile' | 'repaint' | $dyn
            }) {
                super(ctx);

                super.$$link("control_net", opts['control_net'])
                super.$$link("type", opts['type'])
            }

            static defaults = {

            }
            protected override $$type() {
                return "SetUnionControlNetType"
            }
        },

        /**
         * CLIPTextEncodeHunyuanDiT from advanced/conditioning
         * @desc 
        */
        "CLIPTextEncodeHunyuanDiT": class extends Node {
            //Getters
            get 'CONDITIONING'(): CONDITIONING { return [this.$uid.toString(), 0] as unknown as CONDITIONING; }

            /**
              * Constructor
             * @param opts.clip
             * @param opts.bert
             * @param opts.mt5xl}
            */
            constructor(opts: {
                'clip': CLIP, 'bert': STRING, 'mt5xl': STRING
            }) {
                super(ctx);

                super.$$link("clip", opts['clip'])
                super.$$link("bert", opts['bert'])
                super.$$link("mt5xl", opts['mt5xl'])
            }

            static defaults = {

            }
            protected override $$type() {
                return "CLIPTextEncodeHunyuanDiT"
            }
        },

        /**
         * CLIPTextEncodeFlux from advanced/conditioning/flux
         * @desc 
        */
        "CLIPTextEncodeFlux": class extends Node {
            //Getters
            get 'CONDITIONING'(): CONDITIONING { return [this.$uid.toString(), 0] as unknown as CONDITIONING; }

            /**
              * Constructor
             * @param opts.clip
             * @param opts.clip_l
             * @param opts.t5xxl
             * @param opts.guidance default: 3.5 step: 0.1}
            */
            constructor(opts: {
                'clip': CLIP, 'clip_l': STRING, 't5xxl': STRING, 'guidance'?: FLOAT
            }) {
                super(ctx);

                super.$$link("clip", opts['clip'])
                super.$$link("clip_l", opts['clip_l'])
                super.$$link("t5xxl", opts['t5xxl'])
                super.$$link("guidance", opts['guidance'] ?? tmp["CLIPTextEncodeFlux"].defaults['guidance'])
            }

            static defaults = {
                'guidance': 3.5
            }
            protected override $$type() {
                return "CLIPTextEncodeFlux"
            }
        },

        /**
         * FluxGuidance from advanced/conditioning/flux
         * @desc 
        */
        "FluxGuidance": class extends Node {
            //Getters
            get 'CONDITIONING'(): CONDITIONING { return [this.$uid.toString(), 0] as unknown as CONDITIONING; }

            /**
              * Constructor
             * @param opts.conditioning
             * @param opts.guidance default: 3.5 step: 0.1}
            */
            constructor(opts: {
                'conditioning': CONDITIONING, 'guidance'?: FLOAT
            }) {
                super(ctx);

                super.$$link("conditioning", opts['conditioning'])
                super.$$link("guidance", opts['guidance'] ?? tmp["FluxGuidance"].defaults['guidance'])
            }

            static defaults = {
                'guidance': 3.5
            }
            protected override $$type() {
                return "FluxGuidance"
            }
        },

        /**
         * LoraSave from _for_testing
         * @desc 
        */
        "LoraSave": class extends Node {
            //Getters


            /**
              * Constructor
             * @param opts.filename_prefix default: "loras/ComfyUI_extracted_lora"
             * @param opts.rank default: 8 max: 4096 min: 1 step: 1
             * @param opts.lora_type
             * @param opts.bias_diff default: true
             * @param opts.model_diff
             * @param opts.text_encoder_diff}
            */
            constructor(opts: {
                'filename_prefix'?: STRING, 'rank'?: INT, 'lora_type': 'standard' | 'full_diff' | $dyn, 'bias_diff'?: BOOLEAN, 'model_diff'?: MODEL, 'text_encoder_diff'?: CLIP
            }) {
                super(ctx);

                super.$$link("filename_prefix", opts['filename_prefix'] ?? tmp["LoraSave"].defaults['filename_prefix'])
                super.$$link("rank", opts['rank'] ?? tmp["LoraSave"].defaults['rank'])
                super.$$link("lora_type", opts['lora_type'])
                super.$$link("bias_diff", opts['bias_diff'] ?? tmp["LoraSave"].defaults['bias_diff'])
                super.$$link("model_diff", opts['model_diff'])
                super.$$link("text_encoder_diff", opts['text_encoder_diff'])
            }

            static defaults = {
                'filename_prefix': "loras/ComfyUI_extracted_lora",
                'rank': 8,
                'bias_diff': true
            }
            protected override $$type() {
                return "LoraSave"
            }
        },

        /**
         * SaveImageWebsocket from api/image
         * @desc 
        */
        "SaveImageWebsocket": class extends Node {
            //Getters


            /**
              * Constructor
             * @param opts.images}
            */
            constructor(opts: {
                'images': IMAGE
            }) {
                super(ctx);

                super.$$link("images", opts['images'])
            }

            static defaults = {

            }
            protected override $$type() {
                return "SaveImageWebsocket"
            }
        },
        $compile: async function (client_id: string) {
            return Node.CompileAll(ctx, client_id)
        }
    }

    return tmp;
} 