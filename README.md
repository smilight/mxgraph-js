# mxgraph-js (ESM)

An ESM-first packaging of mxGraph tailored for Angular and modern bundlers. Core exports are side-effect free and initialized explicitly so apps can tree-shake what they need.

## Install
```bash
npm install mxgraph-js
```

Or consume directly from GitHub (builds via `prepare`):
```json
{
  "dependencies": {
    "mxgraph-js": "github:smilight/mxgraph-js#v4.2.2-esm"
  }
}
```

## Core usage
```ts
import { mxGraph, mxClient, mxUtils } from 'mxgraph-js';
import { initMxGraph } from 'mxgraph-js/init';

await initMxGraph();
const container = document.getElementById('graph')!;
const graph = new mxGraph(container);
mxUtils.alert(`mxGraph ${mxClient.VERSION} ready`);
```

- The main entrypoint exports live bindings for all mxGraph globals (no side effects).
- Call `initMxGraph` once to load the legacy bundle (`dist/resources/mxgraph.js`) and wire exports.
- If hosting assets elsewhere, pass `initMxGraph({ resourcesBaseUrl: '/static/mxgraph/' })`.

## Per-symbol imports for tree-shaking
```ts
import { mxCellHighlight } from 'mxgraph-js/mxCellHighlight';
// no side effects; call init separately if you need the runtime
```
Each handler/utility entrypoint is side-effect free, so Angular 21+ production builds can drop unused mxGraph classes.
All per-symbol entrypoints are auto-generated from the legacy sources during `npm run build`/`npm run prepare`, including when installed directly from GitHub.

## Loading resources on demand
Optional bundles stay out of core imports:
```ts
import { loadBundle } from 'mxgraph-js/resources';
import { mxResources } from 'mxgraph-js';

const strings = await loadBundle('graph', 'de');
mxResources.parse(strings); // only when you need it
```
Available bundles: `graph` and `editor` with languages `en`, `de`, `zh`.

## Angular 17+ example
A minimal Angular app lives in `examples/angular/` (not published to npm):
- `src/main.ts` calls `initMxGraph()` once before bootstrapping.
- `AppComponent` renders a basic graph without loading optional resources.
- Build with: `npm install` inside the example, then `npm run build`.

## Build & packaging
- `npm run build` – cleans, compiles TypeScript (ESM + d.ts + source maps), and bundles the legacy mxGraph sources plus runtime assets into `dist/resources/`.
- `npm pack` produces a tarball containing only `dist/`, `README.md`, and `LICENSE` (see `package.json#files`).
- Side effects are restricted to `dist/init.*` and `dist/resources/**` for effective tree-shaking.

## Development notes
- The legacy sources remain under `javascript/src/js`; they are concatenated in `scripts/build-legacy.mjs` using the order from `index.html`.
- Core wrappers live in `src/` (`core` exports, `init` loader, `resources` helpers) with generated TypeScript declarations.
