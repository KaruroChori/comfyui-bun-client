/**
 * Wrappers around the ComfyUI REST endopoints & related types.
 */

import { sleep } from "bun";
import { BunFileToFile } from "./utils";
import { basename, dirname } from "node:path"
import type { Static } from "@sinclair/typebox";
import { WorkflowSchema } from "./comfy-types-base";
import { Value } from "@sinclair/typebox/value";
import sharp from "sharp";

/**
 * States for a job to be in.
 */
export type ComfyJob_Status = "building" | "queued" | "running" | "completed" | "failed" | "cancelled"

/**
 * Possible resource types in ComfyUI
 */
export type ComfyResType = 'input' | 'output' | 'temp'

/**
 * A comfyui client, exposing all its REST endpoints.
 */
export class ComfyClient {
    #endpoint: string;
    #secure: boolean;
    #socket: WebSocket;
    #uid = crypto.randomUUID();
    #running = false;
    #debug = false;

    #jobs: Map<string, {
        onStart: () => (void | Promise<void>),
        onCompleted: () => (void | Promise<void>),
        onCancelled: () => (void | Promise<void>),
        onUpdate: (node: number, done: boolean) => (void | Promise<void>),
        onError: (errors: unknown) => (void | Promise<void>),
    }>

    get running() { return this.#running }
    get uid() { return this.#uid }

    /**
     * 
     * @param endpoint The location of the endpoint.
     * @param param1.debug If true it shows additional debugging output.
     * @param param1.secure If true it use https and wss in place of the not encrypted versions.
     */
    constructor(endpoint: string, opts: { debug?: boolean, secure?: boolean } = {
        debug: false,
        secure: false,
    }) {
        this.#debug = opts.debug ?? false
        this.#secure = opts.secure ?? false;
        this.#endpoint = endpoint
        this.#socket = new WebSocket(`ws${this.#secure ? 's' : ''}://${this.#endpoint}/ws?${new URLSearchParams({
            clientId: this.#uid,
        }).toString()}`);
        this.#jobs = new Map()

        // message is received
        this.#socket.addEventListener("message", async (event) => {
            if (event.type === "message") {
                //Ignore messages with blobs, as they are for preview and not relevant.
                if (typeof event.data !== 'string') return;

                const data = JSON.parse(event.data);

                if (data.type === "status") {
                    if (this.#debug) { console.log("Status"); console.log(data.data); }
                }
                else if (data.type === "execution_start") {
                    if (this.#debug) { console.log('Execution start'); console.log(data.data); }
                    const t = this.#jobs.get(data.data.prompt_id);
                    if (t) {
                        await t.onStart();
                    }
                }
                else if (data.type === "execution_cached") {
                    if (this.#debug) { console.log('Execution cached'); console.log(data.data); }
                }
                else if (data.type === "executing") {
                    if (this.#debug) { console.log('Executing'); console.log(data.data); }
                    const t = this.#jobs.get(data.data.prompt_id)
                    //Last execution for the prompt (?)
                    if (data.data.node === null && t) {
                        await t.onCompleted()
                    }
                    else if (t) {
                        await t.onUpdate(data.data.node, false)
                    }
                }
                else if (data.type === "progress") {
                    //TODO: Ignore for now, progress is not important for headless operations
                }
                else if (data.type === "executed") {
                    if (this.#debug) { console.log('Executed'); console.log(data.data); }
                    const t = this.#jobs.get(data.data.prompt_id)
                    if (t) {
                        await t.onUpdate(data.data.node, true)
                    }
                }
                else if (data.type === "crystools.monitor") {
                    //TODO: Ignore for now, based on an external extension
                }
                else {
                    if (this.#debug) console.warn("Unhandled msg on ws", data.type, data.data)
                }
            }
        });

        // socket opened
        this.#socket.addEventListener("open", event => {
            if (this.#debug)
                console.log(
                    `Connection at ${this.#endpoint} started with identity ${this.#uid}`,
                );
            this.#running = true;
        });

        // socket closed
        this.#socket.addEventListener("close", event => {
            if (this.#debug)
                console.log('Connection with the comfyui backend closed');
            this.#running = false;
        });

        // error handler
        this.#socket.addEventListener("error", event => {
            if (this.#debug)
                console.error('Error in the comfyui backend', event);
            this.#running = false;
        });
    }

    /**
     * Manually closes the current connection. Usually not needed if the client is defined with the keyword `using`.
     */
    close() {
        this.#socket.close()
        this.#running = false;
    }

    //Destructor
    [Symbol.dispose] = () => this.close()

    /**
     * @returns System stats from ComfyUI
     */
    async system_stats() {
        return await (
            await fetch(
                `http${this.#secure ? "s" : ""}://${this.#endpoint}/system_stats?${new URLSearchParams({
                    clientId: this.#uid,
                }).toString()}`,
                { method: "GET" },
            )
        ).json()
    }

    /**
     * @returns Available embeddings from ComfyUI
     * @deprecated This function has been de-facto replaced by models("embeddings") on modern comfy instances
     */
    async embeddings() {
        return await (
            await fetch(
                `http${this.#secure ? "s" : ""}://${this.#endpoint}/embeddings?${new URLSearchParams({
                    clientId: this.#uid,
                }).toString()}`,
                { method: "GET" },
            )
        ).json()
    }

    /**
     * @returns Available embeddings from ComfyUI
     * @deprecated This function has been de-facto replaced by models("embeddings") on modern comfy instances
     */
    async models(type: string) {
        return await (
            await fetch(
                `http${this.#secure ? "s" : ""}://${this.#endpoint}/models/${type}?${new URLSearchParams({
                    clientId: this.#uid,
                }).toString()}`,
                { method: "GET" },
            )
        ).json()
    }


    /**
     * @returns Listing all extensions installed on a ComfyUI instance
     */
    async extensions() {
        return await (
            await fetch(
                `http${this.#secure ? "s" : ""}://${this.#endpoint}/extensions?${new URLSearchParams({
                    clientId: this.#uid,
                }).toString()}`,
                { method: "GET" },
            )
        ).json()
    }

    /**
     * 
     * @param content A blob containing the image binary to be uploaded
     * @param opts.overwrite If true, it overwrites the resource (it defaults to false)
     * @param opts.subfolder If set, it determines a subfolder where to place the image
     * @param opts.type It determine the resource types, like temporary, input or output
     * @returns 
     */
    async upload_image(content: Blob,
        opts: {
            overwrite?: boolean,
            subfolder?: string,
            type?: ComfyResType
        } = {}) {
        const form = new FormData()
        if (opts.overwrite === true) form.set("overwrite", "true");
        form.set('image', content, content.name)
        form.set('subfolder', opts.subfolder ?? '')
        form.set('type', opts.type ?? 'input')
        const tmp =
            await fetch(
                `http${this.#secure ? "s" : ""}://${this.#endpoint}/upload/image?${new URLSearchParams({
                    clientId: this.#uid,
                }).toString()}`,
                { method: 'POST', body: form }
            )
        if (tmp.ok) {
            return await tmp.json();
        }

        throw Error(tmp.statusText, { cause: tmp.status })
    }

    /**
     * 
     * @param content A blob containing the mask binary to be uploaded
     * @param opts.overwrite If true, it overwrites the resource (it defaults to false)
     * @param opts.subfolder If set, it determines a subfolder where to place the image
     * @param opts.type It determine the resource types, like temporary, input or output
     * @returns 
     */
    async upload_mask(content: Blob,
        opts: {
            overwrite?: boolean,
            subfolder?: string,
            type?: ComfyResType
            original_ref: { filename: string, type?: ComfyResType, subfolder?: string }
        }) {
        const form = new FormData()
        if (opts.overwrite === true) form.set("overwrite", "true");
        form.set('image', content, content.name)
        form.set('subfolder', opts.subfolder ?? '')
        if (opts.original_ref !== undefined) form.set('original_ref', JSON.stringify(opts.original_ref ?? { type: opts.type ?? 'input', subfolder: opts.subfolder ?? '', filename: content.name }))
        form.set('type', opts.type ?? 'input')
        const tmp =
            await fetch(
                `http${this.#secure ? "s" : ""}://${this.#endpoint}/upload/mask?${new URLSearchParams({
                    clientId: this.#uid,
                }).toString()}`,
                { method: 'POST', body: form }
            )
        if (tmp.ok) {
            return await tmp.json();
        }

        throw Error(tmp.statusText, { cause: tmp.status })
    }

    /**
     * Retrieve a file from the ComfyUI backend or it provides a preview for images.
     * @param filename The target file name
     * @param opts.subfolder Subfolder where it is located.
     * @param opts.type It determine the resource types, like temporary, input or output
     * @param opts.channel For images, limit the result to some channels
     * @param opts.format For images, set the preview format. If left empty the full file will be requested.
     * @param opts.format For images, quality to determine the compression level in case a preview is requested.
     * @returns The blob with the image content.
     */
    async view(filename: string, opts: { type?: ComfyResType, subfolder?: string, channel?: 'rgba' | 'rgb' | 'a', format?: 'jpg' | 'png' | 'webp', quality?: number } = {}) {
        const tmp =
            await fetch(
                `http${this.#secure ? "s" : ""}://${this.#endpoint}/view?${new URLSearchParams({
                    clientId: this.#uid,
                    filename: filename,
                    ...(opts.subfolder ? { subfolder: opts.subfolder } : {}),
                    ...(opts.format
                        ? {
                            preview: `${opts.format}${opts.quality ? `;${opts.quality}` : undefined}`,
                        }
                        : {}),
                    ...(opts.channel ? { channel: opts.channel } : {}),
                    ...(opts.type ? { type: opts.type } : {})
                }).toString()}`,
                { method: "GET" },
            )
        if (tmp.ok) {
            return await tmp.blob();
        }

        throw Error(tmp.statusText, { cause: tmp.status })
    }

    /**
     * 
     * @param folder Location of the file
     * @param filename Name of the file
     * @returns The metadata associated to a given `safetensors` file.
     */
    async view_metadata(folder: string, filename: string) {
        const tmp =
            await fetch(
                `http${this.#secure ? "s" : ""}://${this.#endpoint}/view_metadata/${folder}?${new URLSearchParams({
                    clientId: this.#uid,
                    filename: filename
                }).toString()}`,
                { method: "GET" },
            )
        if (tmp.ok) {
            return await tmp.json();
        }

        throw Error(tmp.statusText, { cause: tmp.status })
    }

    /**
     * Information about the supported node types by a specific ComfyUI instance.
     * @param subclass If not set a full list is returned, otherwise it will end up being filtered.
     * @returns JSON with all the schema details.
     */
    async object_info(subclass?: string) {
        const tmp = (
            await fetch(
                `http${this.#secure ? "s" : ""}://${this.#endpoint}/object_info${subclass ? `/${subclass}` : ''}?${new URLSearchParams({
                    clientId: this.#uid,
                }).toString()}`,
                { method: "GET" },
            )
        )
        if (tmp.ok) {
            return await tmp.json();
        }

        throw Error(tmp.statusText, { cause: tmp.status })
    }

    /**
     * It stops the execution of the current job.
     */
    async interrupt() {
        const tmp = (
            await fetch(
                `http${this.#secure ? "s" : ""}://${this.#endpoint}/interrupt?${new URLSearchParams({
                    clientId: this.#uid,
                }).toString()}`,
                { method: "POST" },
            )
        )
        if (tmp.ok) {
            return await tmp.json();
        }

        throw Error(tmp.statusText, { cause: tmp.status })
    }

    /**
     * It frees resources on the backend.
     * @param opts.unload_models If true, models will be unloaded.
     * @param opts.free_memory If true, memory will be freed.
     */
    async free(opts: { unload_models?: boolean, free_memory?: boolean }) {
        const tmp = (
            await fetch(
                `http${this.#secure ? "s" : ""}://${this.#endpoint}/free?${new URLSearchParams({
                    clientId: this.#uid,
                }).toString()}`,
                { method: "POST", body: JSON.stringify(opts) },
            )
        )
        if (tmp.ok) {
            return await tmp.json();
        }

        throw Error(tmp.statusText, { cause: tmp.status })
    }

    //HISTORY

    /**
     * Obtain information about the history of requests.
     * @returns The current state of history.
     */
    async get_history(id?: string) {
        const tmp = (
            await fetch(
                `http${this.#secure ? "s" : ""}://${this.#endpoint}/history${id ? `/${id}` : ''}?${new URLSearchParams({
                    clientId: this.#uid,
                }).toString()}`,
                { method: "GET" },
            )
        )
        if (tmp.ok) {
            return await tmp.json();
        }

        throw Error(tmp.statusText, { cause: tmp.status })
    }

    /**
     * Remove all past requests from history.
     */
    async clear_history() {
        const tmp = (
            await fetch(
                `http${this.#secure ? "s" : ""}://${this.#endpoint}/history?${new URLSearchParams({
                    clientId: this.#uid,
                }).toString()}`,
                { method: "POST", body: JSON.stringify({ clear: true }) },
            )
        )
        if (tmp.ok) {
            return await tmp.json();
        }

        throw Error(tmp.statusText, { cause: tmp.status })
    }

    /**
     * Remove some requests from history.
     * @param entries IDs of the requests to be removed
     */
    async delete_history_entries(entries: string[]) {
        const tmp = (
            await fetch(
                `http${this.#secure ? "s" : ""}://${this.#endpoint}/history?${new URLSearchParams({
                    clientId: this.#uid,
                }).toString()}`,
                { method: "POST", body: JSON.stringify({ delete: entries }) },
            )
        )
        if (tmp.ok) {
            return await tmp.json();
        }

        throw Error(tmp.statusText, { cause: tmp.status })
    }

    //QUEUE

    /**
     * Obtain information about the current queue of requests.
     * @returns The current state of the queue.
     */
    async get_queue() {
        const tmp = (
            await fetch(
                `http${this.#secure ? "s" : ""}://${this.#endpoint}/queue?${new URLSearchParams({
                    clientId: this.#uid,
                }).toString()}`,
                { method: "GET" },
            )
        )
        if (tmp.ok) {
            return await tmp.json();
        }

        throw Error(tmp.statusText, { cause: tmp.status })
    }

    /**
     * Remove all requests from the current queue.
     */
    async clear_queue() {
        const tmp = (
            await fetch(
                `http${this.#secure ? "s" : ""}://${this.#endpoint}/queue?${new URLSearchParams({
                    clientId: this.#uid,
                }).toString()}`,
                { method: "POST", body: JSON.stringify({ clear: true }) },
            )
        )
        if (tmp.ok) {
            for (const [key, value] of this.#jobs) {
                //Make sure all current jobs are going to error out if not completed already
                await value.onError([])
            }
            return await tmp.json();
        }

        throw Error(tmp.statusText, { cause: tmp.status })
    }

    /**
     * Remove some requests from the current queue.
     * @param entries IDs of the requests to suspend/delete
     */
    async delete_queue_entries(entries: string[]) {
        const tmp = (
            await fetch(
                `http${this.#secure ? "s" : ""}://${this.#endpoint}/queue?${new URLSearchParams({
                    clientId: this.#uid,
                }).toString()}`,
                { method: "POST", body: JSON.stringify({ delete: entries }) },
            )
        )
        if (tmp.ok) {
            for (const [key, value] of this.#jobs) {
                //Make sure all current jobs filtered are going to error out if not completed already
                if (entries.includes(key)) await value.onError([]);
            }
            return await tmp.json();
        }

        throw Error(tmp.statusText, { cause: tmp.status })
    }

    // PROMPT

    /**
     * @returns Information about the requests currently in execution.
     */
    async get_prompt() {
        const tmp = (
            await fetch(
                `http${this.#secure ? "s" : ""}://${this.#endpoint}/prompt?${new URLSearchParams({
                    clientId: this.#uid,
                }).toString()}`,
                { method: "GET" },
            )
        )
        if (tmp.ok) {
            return await tmp.json();
        }

        throw Error(tmp.statusText, { cause: tmp.status })
    }

    /**
     * Schedule a new request for execution.
     * @param workflow The JSON of the complete workflow for submission.
     * @returns Endpoint response with information like the ID.
     */
    async post_prompt(workflow: Static<typeof WorkflowSchema>) {
        const tmp = (
            await fetch(
                `http${this.#secure ? "s" : ""}://${this.#endpoint}/prompt?${new URLSearchParams({
                    clientId: this.#uid,
                }).toString()}`,
                { method: "POST", body: JSON.stringify(workflow) },
            )
        )
        if (tmp.ok) {
            return await tmp.json();
        }

        throw Error(tmp.statusText, { cause: tmp.status })
    }


    /**
     * Generate a new job (automatic handling of submission, callbacks and final cleanup)
     * @param workflow The full JSON workflow to submit as part of the request.
     * @param infiles List of files to be uploaded as resources (and their naming mapping)
     * @param infiles List of files to be downloaded upon completion (and their naming mapping)
     * @param cb All the custom callbacks defined for the lifetime of this job
     * @returns A handle for the newly scheduled job.
     * @deprecated
     */
    async schedule_job(workflow: unknown,
        infiles: { from: string; to?: string; original?: string, tmp?: boolean; mask?: boolean }[],
        outfiles: { from: number; to: (x: number, filename?: string, format?: 'images' | 'latents') => string, metadata?: boolean }[],
        cb: {
            onStart?: () => (void | Promise<void>)
            onCompleted?: () => (void | Promise<void>)
            onCancelled?: () => (void | Promise<void>)
            onUpdate?: (node: number, done: boolean) => (void | Promise<void>)
            onError?: (errors: unknown) => (void | Promise<void>)
        }
    ) {
        const tmp = this.job(workflow);
        await (await tmp
            .onStart(cb.onStart)
            .onCompleted(async () => {
                await tmp.collect_to_files(outfiles)
                if (cb.onCompleted) return cb.onCompleted();
            })
            .onCancelled(cb.onCancelled)
            .onUpdate(cb.onUpdate)
            .onError(cb.onError)
            .upload_from_files(infiles)).schedule()
        return tmp;
    }


    /**
     * Generate a new job (automatic handling of submission, callbacks and final cleanup)
     * @returns A handle for the newly scheduled job.
     */
    job(workflow: unknown) {
        //Only this function is checking the workflow against the schema. Raw call to post_prompt are not.
        if (!Value.Check(WorkflowSchema, workflow)) {
            for (const err of Value.Errors(WorkflowSchema, workflow)) console.error(err);
            throw new Error("Schema validation for workflow failed!");
        }

        let status: ComfyJob_Status = "building"
        const errors: unknown[] = [];

        let tmp: { prompt_id: string, node_errors: string[] }
        let uid: string
        const cb: {
            onStart?: () => (void | Promise<void>)
            onCompleted?: () => (void | Promise<void>)
            onCancelled?: () => (void | Promise<void>)
            onUpdate?: (node: number, done: boolean) => (void | Promise<void>)
            onError?: (errors: unknown) => (void | Promise<void>)
        } = {}

        const parent = this;

        return {
            get uid() { return uid },
            get status() { return status },
            get errors() { return errors },

            onStart(fn?: () => (void | Promise<void>)) { if (status !== 'building') throw Error("Job set callback outside building"); cb.onStart = fn; return this; },
            onCompleted(fn?: () => (void | Promise<void>)) { if (status !== 'building') throw Error("Job set callback outside building"); cb.onCompleted = fn; return this; },
            onCancelled(fn?: () => (void | Promise<void>)) { if (status !== 'building') throw Error("Job set callback outside building"); cb.onCancelled = fn; return this; },
            onUpdate(fn?: (node: number, done: boolean) => (void | Promise<void>)) { if (status !== 'building') throw Error("Job set callback outside building"); cb.onUpdate = fn; return this; },
            onError(fn?: (errors: unknown) => (void | Promise<void>)) { if (status !== 'building') throw Error("Job set callback outside building"); cb.onError = fn; return this; },

            async schedule() {
                if (status !== 'building') throw Error("Job scheduled for execution outside building");

                tmp = await parent.post_prompt(workflow)
                uid = tmp.prompt_id
                status = 'queued'

                if (Object.keys(tmp.node_errors).length !== 0) {
                    status = 'failed'
                    errors.push(tmp.node_errors)
                    if (cb.onError) await cb.onError(tmp.node_errors);
                }


                parent.#jobs.set(uid, {
                    onStart: async () => {
                        status = "running";
                        if (cb.onStart) await cb.onStart();
                    },
                    onCompleted: async () => {
                        status = "completed";
                        parent.#jobs.delete(uid);
                        if (cb.onCompleted) await cb.onCompleted();

                    },
                    onUpdate: async (node, done) => {
                        status = "running";
                        if (cb.onUpdate) await cb.onUpdate(node, done);
                    },
                    onError: async (e) => {
                        status = "failed";
                        errors.push(errors);
                        parent.#jobs.delete(uid);
                        if (cb.onError) await cb.onError(e);
                    },
                    onCancelled: async () => {
                        status = "cancelled";
                        parent.#jobs.delete(uid);
                        if (cb.onCancelled) await cb.onCancelled();
                    }
                })

            },

            //To await completion, collect the result and do something with it.
            async completion() {
                while (true) {
                    if (status === 'running' || status === 'queued') await sleep(0)
                    else break;
                }
                return this;
            },

            //Upload blobs to the backend
            async upload(infiles: { from: Blob; to?: string; original?: string, tmp?: boolean; mask?: boolean }[],
            ) {
                if (status !== 'building') throw Error("Job upload resources outside building");
                for (const file of infiles) {
                    const tmp = (file.mask ?? true) ?
                        await parent.upload_image(file.from, { overwrite: true, subfolder: file.to ? dirname(file.to) : undefined, type: (file.tmp ?? true) ? 'temp' : 'input' }) :
                        undefined
                    if (parent.#debug) console.log(`Loaded ${file.from}`, tmp)
                }
                return this;
            },


            //Upload files to the backend
            async upload_from_files(infiles: { from: string; to?: string; original?: string, tmp?: boolean; mask?: boolean }[],
            ) {
                if (status !== 'building') throw Error("Job upload resources outside building");
                for (const file of infiles) {
                    const tmp = (file.mask ?? true) ?
                        await parent.upload_image(BunFileToFile(Bun.file(file.from), file.to ? basename(file.to) : undefined), { overwrite: true, subfolder: file.to ? dirname(file.to) : undefined, type: (file.tmp ?? true) ? 'temp' : 'input' }) :
                        undefined
                    if (parent.#debug) console.log(`Loaded ${file.from}`, tmp)
                }
                return this;
            },

            /**
             * Collect blobs from ComfyUI after a job has finished.
             * @param outfiles Schema for the dictionary of blobs to collect.
             * @returns 
             */
            async collect(outfiles: {
                from: number,
                to: string,
            }[]) {
                if (status !== 'completed') throw Error("Job collection requested before completion");
                const ret: Record<string, Blob[]> = {}
                for (const file of outfiles) {
                    //Recover all artifacts from the server.
                    const result = await parent.get_history(uid)
                    const t = parent.#jobs.get(uid);
                    ret[file.to] = []
                    for (const [format, entries] of Object.entries(result[uid].outputs[file.from])) {
                        const entires = entries as { filename: string, subfolder: string, type: ComfyResType }[];
                        let i = 0;
                        for (const [_, entry] of Object.entries(entires)) {
                            const tmp = await parent.view(entry.filename, { subfolder: entry.subfolder, type: entry.type });
                            ret[file.to].push(tmp)
                            i++;
                            if (parent.#debug) console.log(`Collected ${file.from}`, tmp);
                        }
                    }

                }
                return ret;
            },

            //Get files back from the backend
            async collect_to_files(outfiles: { from: number; to: (x: number, filename?: string, format?: 'images' | 'latents') => string }[],
            ) {
                if (status !== 'completed') throw Error("Job collection requested before completion");
                for (const file of outfiles) {
                    //Recover all artifacts from the server.
                    const result = await parent.get_history(uid)
                    const t = parent.#jobs.get(uid);
                    for (const [format, entries] of Object.entries(result[uid].outputs[file.from])) {
                        const entires = entries as { filename: string, subfolder: string, type: ComfyResType }[];
                        let i = 0;
                        for (const [_, entry] of Object.entries(entires)) {
                            const tmp = await parent.view(entry.filename, { subfolder: entry.subfolder, type: entry.type });

                            await Bun.write(file.to(i, entry.filename, 'images'), tmp);

                            i++;
                            if (parent.#debug) console.log(`Saved ${file.from} to ${file.to}`, tmp);
                        }
                    }

                }
                return;
            },

            /**
             * Cancel this job, regardless of its current progression.
             */
            async cancel() {
                if (['cancelled', 'failed', 'completed', 'building'].includes(status)) return;    //Ignore deletion for these cases
                const tmp = await parent.delete_queue_entries([uid])
                return this;
            }
        }
    }

}
