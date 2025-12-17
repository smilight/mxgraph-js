import { assertMxGraphReady, wireMxNamespace } from './core/exports.js';
export * from './core/exports.js';
export function getMxGraph() {
    assertMxGraphReady();
    return globalThis;
}
export function attachMxGraph(mx) {
    wireMxNamespace(mx);
}
//# sourceMappingURL=index.js.map