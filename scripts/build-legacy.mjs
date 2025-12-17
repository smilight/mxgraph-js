import fs from 'fs';
import path from 'path';
import url from 'url';

const root = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '..');
const indexHtmlPath = path.join(root, 'index.html');
const sourceJsRoot = path.join(root, 'javascript', 'src', 'js');
const distResources = path.join(root, 'dist', 'resources');

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function parseScriptOrder() {
  const html = fs.readFileSync(indexHtmlPath, 'utf8');
  const regex = /javascript\/src\/js\/([^"']+\.js)/g;
  const order = [];
  const seen = new Set();
  let match;
  while ((match = regex.exec(html))) {
    const rel = match[1];
    if (!seen.has(rel)) {
      seen.add(rel);
      order.push(rel);
    }
  }
  if (order.length === 0) {
    throw new Error('No script order found in index.html');
  }
  return order;
}

function buildBundle(order) {
  ensureDir(distResources);
  const outPath = path.join(distResources, 'mxgraph.js');
  let bundle = '/* Generated mxGraph legacy bundle. */\n';
  for (const rel of order) {
    const filePath = path.join(sourceJsRoot, rel);
    const contents = fs.readFileSync(filePath, 'utf8');
    bundle += `\n// ---- ${rel} ----\n`;
    bundle += contents;
    bundle += '\n';
  }
  fs.writeFileSync(outPath, bundle, 'utf8');
  console.log(`Wrote ${outPath} with ${order.length} sources.`);
}

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  ensureDir(dest);
  if (fs.cpSync) {
    fs.cpSync(src, dest, { recursive: true });
    return;
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else if (entry.isFile()) {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function copyAssets() {
  copyRecursive(path.join(root, 'javascript', 'src', 'resources'), path.join(distResources, 'resources'));
  copyRecursive(path.join(root, 'javascript', 'src', 'images'), path.join(distResources, 'images'));
  copyRecursive(path.join(root, 'javascript', 'src', 'css'), path.join(distResources, 'css'));
  console.log('Copied resources, images, and css assets.');
}

function main() {
  const order = parseScriptOrder();
  buildBundle(order);
  copyAssets();
}

main();
