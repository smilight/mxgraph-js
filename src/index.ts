import { assertMxGraphReady, wireMxNamespace } from './core/exports.js';
export * from './core/exports.js';

export function getMxGraph(): any {
  assertMxGraphReady();
  return (globalThis as any);
}

export function attachMxGraph(mx: any): void {
  wireMxNamespace(mx);
}
