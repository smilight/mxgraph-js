import { wireMxNamespace } from './core/exports.js';
let initialization = null;
function ensureDocument(doc) {
    const resolved = doc ?? (typeof document !== 'undefined' ? document : undefined);
    if (!resolved) {
        throw new Error('mxgraph-js init requires a Document. Provide options.document when running outside the browser.');
    }
    return resolved;
}
function resolveBaseUrl(custom) {
    if (custom) {
        return custom.endsWith('/') ? custom : `${custom}/`;
    }
    return new URL('./resources/', import.meta.url).toString();
}
function loadScript(src, doc) {
    if (globalThis.mxGraph || globalThis.mxClient) {
        return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
        const script = doc.createElement('script');
        script.async = false;
        script.src = src;
        script.onload = () => resolve();
        script.onerror = (err) => reject(new Error(`Failed to load mxGraph bundle from ${src}: ${err}`));
        doc.head.appendChild(script);
    });
}
export async function initMxGraph(options = {}) {
    if (initialization) {
        return initialization;
    }
    const doc = ensureDocument(options.document);
    const baseUrl = resolveBaseUrl(options.resourcesBaseUrl);
    initialization = (async () => {
        await loadScript(new URL('mxgraph.js', baseUrl).toString(), doc);
        wireMxNamespace(globalThis);
        return globalThis;
    })();
    return initialization;
}
export function getMxGraphNamespace() {
    return globalThis;
}
export function isMxGraphReady() {
    return Boolean(globalThis.mxGraph && globalThis.mxClient);
}
//# sourceMappingURL=init.js.map