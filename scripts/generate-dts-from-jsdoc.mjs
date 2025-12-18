import fs from 'fs';
import path from 'path';

const LEGACY_ROOT = path.resolve('javascript/src/js');
const OUT_DIR = path.resolve('src/generated-dts');

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function readFile(file) {
  return fs.readFileSync(file, 'utf8');
}

function walkLegacy() {
  const files = [];
  const stack = [LEGACY_ROOT];
  while (stack.length) {
    const dir = stack.pop();
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const abs = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        stack.push(abs);
      } else if (entry.isFile() && entry.name.startsWith('mx') && entry.name.endsWith('.js')) {
        files.push(abs);
      }
    }
  }
  return files.sort();
}

function extractClassName(filePath, content) {
  const base = path.basename(filePath, '.js');
  const classMatch = content.match(/Class:\s*([A-Za-z0-9_]+)/);
  if (classMatch) return classMatch[1];
  const ctorMatch = content.match(/function\s+(mx[A-Za-z0-9_]*)\s*\(/);
  if (ctorMatch) return ctorMatch[1];
  return base;
}

function inferType(name, desc = '') {
  const lower = (name + ' ' + desc).toLowerCase();
  const numHints = ['x', 'y', 'width', 'height', 'size', 'left', 'right', 'top', 'bottom', 'scale', 'count', 'index', 'length', 'id'];
  if (numHints.some((h) => lower.includes(h))) return 'number';
  const boolHints = ['flag', 'enabled', 'disabled', 'visible', 'toggle', 'allow', 'use', 'force', 'is', 'show', 'hide'];
  if (boolHints.some((h) => lower.includes(h))) return 'boolean';
  const strHints = ['name', 'url', 'xml', 'action', 'key', 'style', 'color', 'message', 'label'];
  if (strHints.some((h) => lower.includes(h))) return 'string';
  const refMatch = desc.match(/<\s*(mx[A-Za-z0-9_]+)\s*>/);
  if (refMatch) return refMatch[1];
  return 'unknown';
}

function inferReturnType(name, desc = '') {
  const lower = name.toLowerCase();
  const voidPrefixes = ['set', 'add', 'remove', 'delete', 'clear', 'reset', 'destroy', 'enable', 'disable', 'show', 'hide', 'start', 'stop', 'bind', 'unbind', 'redraw', 'refresh', 'update'];
  if (voidPrefixes.some((p) => lower.startsWith(p))) return 'void';
  const refMatch = desc.match(/<\s*(mx[A-Za-z0-9_]+)\s*>/);
  if (refMatch) return refMatch[1];
  return 'unknown';
}

function parseParamTags(block) {
  const params = [];
  const regex = /@param\s+\{([^}]+)\}\s+(\w+)\s*-?\s*([^\n]*)/g;
  let m;
  while ((m = regex.exec(block))) {
    params.push({ name: m[2], type: m[1].trim(), desc: m[3].trim() });
  }
  return params;
}

function parseReturnTag(block) {
  const m = block.match(/@returns?\s+\{([^}]+)\}\s*([^\n]*)/);
  if (m) {
    return { type: m[1].trim(), desc: m[2].trim() };
  }
  return null;
}

function parseMethods(className, content) {
  const methods = new Map();
  const addMethod = (name, params, isStatic = false) => {
    if (!methods.has(name)) {
      methods.set(name, { name, params, isStatic, returnDesc: '', returnType: null, paramTags: [] });
    }
  };

  const protoRegex = new RegExp(`${className}\\.prototype\\.([A-Za-z0-9_]+)\\s*=\\s*function\\s*\\(([^)]*)\\)`, 'g');
  let m;
  while ((m = protoRegex.exec(content))) {
    const [, name, args] = m;
    const params = args.trim() ? args.split(/\s*,\s*/).map((p) => ({ name: p })) : [];
    addMethod(name, params, false);
  }

  const staticRegex = new RegExp(`${className}\\.([A-Za-z0-9_]+)\\s*=\\s*function\\s*\\(([^)]*)\\)`, 'g');
  while ((m = staticRegex.exec(content))) {
    const [, name, args] = m;
    const params = args.trim() ? args.split(/\s*,\s*/).map((p) => ({ name: p })) : [];
    addMethod(name, params, true);
  }

  return methods;
}

function parseJsdocBlocks(content) {
  const blocks = [];
  const regex = /\/\*\*[\s\S]*?\*\//g;
  let m;
  while ((m = regex.exec(content))) {
    blocks.push(m[0]);
  }
  return blocks;
}

function buildDeclaration(symbol, ctorParams, methods) {
  const lines = [];
  lines.push('// AUTO-GENERATED FROM JSDOC. DO NOT EDIT.');
  lines.push(`export declare class ${symbol} {`);
  const ctor = ctorParams.length
    ? ctorParams.map((p) => `${p.name}: ${p.type}`).join(', ')
    : '...args: any[]';
  lines.push(`  constructor(${ctor});`);

  for (const method of methods.values()) {
    const params = method.params.length
      ? method.params.map((p) => `${p.name}: ${p.type ?? 'unknown'}`).join(', ')
      : '...args: any[]';
    const ret = method.returnType ?? 'unknown';
    const keyword = method.isStatic ? 'static ' : '';
    lines.push(`  ${keyword}${method.name}(${params}): ${ret};`);
  }

  lines.push('}');
  return lines.join('\n');
}

function mapTypeString(typeStr) {
  const t = typeStr.trim();
  if (!t || t === '*') return 'unknown';
  if (/string/i.test(t)) return 'string';
  if (/number|int|float|double/i.test(t)) return 'number';
  if (/boolean|bool/i.test(t)) return 'boolean';
  const ref = t.match(/mx[A-Za-z0-9_]+/);
  if (ref) return ref[0];
  return 'unknown';
}

function enrichFromJsdoc(blocks, className, ctorParams, methods) {
  for (const block of blocks) {
    const paramTags = parseParamTags(block);
    const returnTag = parseReturnTag(block);

    if (block.includes('Constructor:') || block.includes('Class:')) {
      if (paramTags.length) {
        ctorParams.length = 0;
        for (const p of paramTags) {
          ctorParams.push({ name: p.name, type: mapTypeString(p.type) });
        }
      }
    }

    const methodNameMatch = block.match(/@method\s+(\w+)/);
    const targetName = methodNameMatch ? methodNameMatch[1] : null;
    if (targetName && methods.has(targetName)) {
      const method = methods.get(targetName);
      if (paramTags.length) {
        method.params = paramTags.map((p) => ({ name: p.name, type: mapTypeString(p.type) }));
      }
      if (returnTag) {
        method.returnType = mapTypeString(returnTag.type);
      }
    }
  }
}

function applyHeuristics(methods) {
  for (const method of methods.values()) {
    method.params = method.params.map((p) => {
      const inferred = inferType(p.name, p.desc ?? '');
      return { name: p.name, type: p.type ?? inferred };
    });
    method.returnType = method.returnType ?? inferReturnType(method.name, method.returnDesc ?? '');
  }
}

function writeDeclaration(symbol, decl) {
  ensureDir(OUT_DIR);
  const target = path.join(OUT_DIR, `${symbol}.d.ts`);
  fs.writeFileSync(target, decl, 'utf8');
}

function main() {
  ensureDir(OUT_DIR);
  const files = walkLegacy();
  const indexExports = [];

  for (const file of files) {
    const content = readFile(file);
    const className = extractClassName(file, content);
    if (!className) continue;
    const ctorMatch = content.match(new RegExp(`function\\s+${className}\\s*\\(([^)]*)\\)`));
    const ctorParams = ctorMatch && ctorMatch[1].trim()
      ? ctorMatch[1].split(/\s*,\s*/).filter(Boolean).map((n) => ({ name: n, type: inferType(n) }))
      : [];
    const methods = parseMethods(className, content);
    const blocks = parseJsdocBlocks(content);
    enrichFromJsdoc(blocks, className, ctorParams, methods);
    applyHeuristics(methods);
    const decl = buildDeclaration(className, ctorParams, methods);
    writeDeclaration(className, decl);
    indexExports.push(`export * from './${className}';`);
  }

  fs.writeFileSync(path.join(OUT_DIR, 'index.d.ts'), indexExports.join('\n') + '\n', 'utf8');
  console.log(`Generated declarations for ${indexExports.length} symbols.`);
}

main();
