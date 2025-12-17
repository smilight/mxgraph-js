export interface ResourceRequestOptions {
  baseUrl?: string;
  fetchImpl?: typeof fetch;
}

const resources = {
  graph: ['en', 'de', 'zh'],
  editor: ['en', 'de', 'zh']
} as const;

type BundleName = keyof typeof resources;
type LanguageCode = (typeof resources)[BundleName][number];

function resolveBaseUrl(baseUrl?: string): string {
  if (baseUrl) {
    return baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  }
  return new URL('./resources/', import.meta.url).toString();
}

export function getResourceUrl(relativePath: string, options: ResourceRequestOptions = {}): string {
  const base = resolveBaseUrl(options.baseUrl);
  return new URL(relativePath, base).toString();
}

export async function fetchResource(relativePath: string, options: ResourceRequestOptions = {}): Promise<string> {
  const fetcher = options.fetchImpl ?? (typeof fetch !== 'undefined' ? fetch : undefined);
  if (!fetcher) {
    throw new Error('No fetch implementation available to load mxgraph-js resources.');
  }
  const url = getResourceUrl(relativePath, options);
  const res = await fetcher(url);
  if (!res.ok) {
    throw new Error(`Failed to load resource ${url}: ${res.status} ${res.statusText}`);
  }
  return res.text();
}

export async function loadBundle(bundle: BundleName, language: LanguageCode = 'en', options: ResourceRequestOptions = {}): Promise<string> {
  const supported = resources[bundle];
  if (!supported.includes(language)) {
    throw new Error(`Unsupported language ${language} for bundle ${bundle}. Supported: ${supported.join(', ')}`);
  }
  const suffix = language === 'en' ? '' : `_${language}`;
  return fetchResource(`resources/${bundle}${suffix}.txt`, options);
}

export function listAvailableBundles(): Record<string, string[]> {
  return {
    graph: [...resources.graph],
    editor: [...resources.editor]
  };
}
