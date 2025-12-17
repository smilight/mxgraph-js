import { wireMxNamespace } from './core/exports.js';

export interface InitMxGraphOptions {
  resourcesBaseUrl?: string;
  document?: Document;
}

let initialization: Promise<any> | null = null;

function ensureDocument(doc?: Document): Document {
  const resolved = doc ?? (typeof document !== 'undefined' ? document : undefined);
  if (!resolved) {
    throw new Error('mxgraph-js init requires a Document. Provide options.document when running outside the browser.');
  }
  return resolved;
}

function resolveBaseUrl(custom?: string): string {
  if (custom) {
    return custom.endsWith('/') ? custom : `${custom}/`;
  }
  return new URL('./resources/', import.meta.url).toString();
}

function loadScript(src: string, doc: Document): Promise<void> {
  if ((globalThis as any).mxGraph || (globalThis as any).mxClient) {
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

export async function initMxGraph(options: InitMxGraphOptions = {}): Promise<any> {
  if (initialization) {
    return initialization;
  }
  const doc = ensureDocument(options.document);
  const baseUrl = resolveBaseUrl(options.resourcesBaseUrl);

  initialization = (async () => {
    await loadScript(new URL('mxgraph.js', baseUrl).toString(), doc);
    wireMxNamespace(globalThis as any);
    return globalThis as any;
  })();

  return initialization;
}

export function getMxGraphNamespace(): any {
  return (globalThis as any);
}

export function isMxGraphReady(): boolean {
  return Boolean((globalThis as any).mxGraph && (globalThis as any).mxClient);
}
