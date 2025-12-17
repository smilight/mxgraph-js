# Migration to the ESM/Angular-friendly build

This release restructures `mxgraph-js` to support modern ESM tooling and Angular apps while keeping the full mxGraph surface area.

## What changed
- The public API is now split into core (`mxgraph-js`), explicit initialization (`mxgraph-js/init`), and optional resources (`mxgraph-js/resources/*`).
- Core exports are pure live bindings with no side effects; the legacy mxGraph bundle only loads when `initMxGraph` is called.
- A new build pipeline compiles the TypeScript wrappers to `dist/` and bundles the legacy sources from `javascript/src/js` into `dist/resources/mxgraph.js`, alongside images/css/resource text files.
- The npm package now ships only `dist/`, `README.md`, and `LICENSE` via the `files` allowlist; docs/examples stay out of the tarball.
- TypeScript declaration files are emitted for every public entrypoint.

## Migration guide
1. Update imports to ESM:
   ```ts
   import { mxGraph, mxClient, mxModel } from 'mxgraph-js';
   import { initMxGraph } from 'mxgraph-js/init';
   ```
2. Call `initMxGraph()` once at application startup (for Angular, place it in `main.ts` or a provider initializer). Accessing core exports before init will throw.
3. Optional resources are loaded on demand:
   ```ts
   import { loadBundle } from 'mxgraph-js/resources';
   const graphStrings = await loadBundle('graph', 'de');
   (mxResources || mxgraph().mxResources).parse(graphStrings);
   ```
4. The legacy global script is now served from `dist/resources/mxgraph.js`. If you host assets elsewhere, pass `resourcesBaseUrl` to `initMxGraph`.
5. Packaging is ESM-first. Consumers using CommonJS `require` should switch to dynamic `import()` or an ESM-aware bundler.

## Tree-shaking notes
- Core exports are live bindings without side effects; bundlers drop unused symbols.
- Side effects are isolated to `dist/init.*` and `dist/resources/**` (declared in `package.json#sideEffects`).
- The heavy legacy bundle and assets are only pulled in when `init` or resource helpers are imported.
- Verified with esbuild: bundling a file that only imports `mxGraph` produces a ~90 byte bundle; bundling `init` yields ~15 KB and still excludes the 2.3 MB legacy bundle (loaded at runtime when invoked).

## Assumptions
- The example Angular app targets the latest stable Angular CLI (17+) due to current ecosystem availability; adjust versions as newer Angular releases (21+) land.
- Browser initialization requires a real `document`; for SSR, call `initMxGraph` in a browser-only path and pass a `document` reference if needed.
