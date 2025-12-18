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
      methods.set(name, { name, params, isStatic, returnDesc: '', returnType: null, paramTags: [], variadic: false });
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

function buildDeclaration(symbol, ctorParams, methods, options = {}) {
  const { ctorVariadic = false } = options;
  const lines = [];
  lines.push('// AUTO-GENERATED FROM JSDOC. DO NOT EDIT.');
  lines.push(`export declare class ${symbol} {`);
  const ctorParts = ctorParams.length ? ctorParams.map((p) => `${p.name}: ${p.type}`) : [];
  if (ctorVariadic) {
    ctorParts.push('...args: any[]');
  }
  const ctorSignature = ctorParts.length ? ctorParts.join(', ') : '...args: any[]';
  lines.push(`  constructor(${ctorSignature});`);

  for (const method of methods.values()) {
    const methodParts = method.params.length
      ? method.params.map((p) => `${p.name}: ${p.type ?? 'unknown'}`)
      : [];
    if (method.variadic) {
      methodParts.push('...args: any[]');
    }
    const params = methodParts.length ? methodParts.join(', ') : '...args: any[]';
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
  if (/\bArray\b/i.test(t)) return 'any[]';
  if (/string/i.test(t)) return 'string';
  if (/number|int|float|double/i.test(t)) return 'number';
  if (/boolean|bool/i.test(t)) return 'boolean';
  if (/function/i.test(t)) return '(...args: any[]) => any';
  const ref = t.match(/mx[A-Za-z0-9_]+/);
  if (ref) return ref[0];
  return 'unknown';
}

function detectCtorVariadic(className, content, ctorMatch) {
  if (!ctorMatch || ctorMatch.index == null) return false;
  const start = ctorMatch.index;
  const snippet = content.slice(start, start + 500);
  return /arguments\s*(?:\[|\.length)/.test(snippet);
}

function parseParametersSection(block) {
  const lines = block.split('\n').map((l) => l.replace(/^\s*\*\s?/, '').trim());
  const params = [];
  let inParams = false;
  for (const line of lines) {
    if (/^Parameters:?$/i.test(line)) {
      inParams = true;
      continue;
    }
    if (inParams) {
      if (!line || /^[A-Z][a-z]+:/.test(line)) break;
      const m = line.match(/^([\w$]+)\s*-\s*(.*)/);
      if (m) {
        params.push({ name: m[1], desc: m[2].trim() });
        continue;
      }
      if (params.length) {
        params[params.length - 1].desc += ' ' + line.trim();
      }
    }
  }
  return params;
}

function extractTypeFromDesc(desc = '') {
  const tag = desc.match(/<\s*([^>]+)\s*>/);
  if (tag) return mapTypeString(tag[1]);
  if (/true\s+or\s+false|boolean/i.test(desc)) return 'boolean';
  if (/array/i.test(desc)) return 'any[]';
  return null;
}

function parseReturnHint(block) {
  const m = block.match(/Returns\s+<\s*([^>]+)\s*>/i);
  if (m) return mapTypeString(m[1]);
  if (/Returns\s+(?:true|false)/i.test(block)) return 'boolean';
  return null;
}

function detectMethodVariadic(content, className, methodName, isStatic) {
  const target = isStatic
    ? `${className}\\.${methodName}`
    : `${className}\\.prototype\\.${methodName}`;
  const regex = new RegExp(`${target}\\s*=\\s*function\\s*\\([^)]*\\)\\s*\\{([\\s\\S]*?)\\n\\};`);
  const m = content.match(regex);
  if (!m) return false;
  return /arguments\s*(?:\[|\.length|\.slice|\.apply)/.test(m[1]);
}

function enrichFromJsdoc(blocks, className, ctorParams, methods) {
  for (const block of blocks) {
    const paramTags = parseParamTags(block);
    const returnTag = parseReturnTag(block);
    const sectionParams = parseParametersSection(block);

    const paramsFromBlock = paramTags.length
      ? paramTags.map((p) => ({ name: p.name, type: mapTypeString(p.type), desc: p.desc }))
      : sectionParams.map((p) => ({ name: p.name, type: extractTypeFromDesc(p.desc) ?? inferType(p.name, p.desc), desc: p.desc }));
    const returnHint = returnTag ? mapTypeString(returnTag.type) : parseReturnHint(block);

    if (block.includes('Constructor:') || block.includes('Class:')) {
      if (paramsFromBlock.length) {
        ctorParams.length = 0;
        for (const p of paramsFromBlock) {
          ctorParams.push({ name: p.name, type: p.type });
        }
      }
    }

    const methodNameMatch = block.match(/@method\s+(\w+)/) ?? block.match(/Function:\s*([A-Za-z0-9_]+)/);
    const targetName = methodNameMatch ? methodNameMatch[1] : null;
    if (targetName && methods.has(targetName)) {
      const method = methods.get(targetName);
      if (paramsFromBlock.length) {
        method.params = paramsFromBlock.map((p) => ({ name: p.name, type: p.type, desc: p.desc }));
      }
      if (returnHint) {
        method.returnType = returnHint;
      }
      if (returnTag && returnTag.desc) {
        method.returnDesc = returnTag.desc;
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
    const ctorVariadic = detectCtorVariadic(className, content, ctorMatch);
    const ctorParams = ctorMatch && ctorMatch[1].trim()
      ? ctorMatch[1].split(/\s*,\s*/).filter(Boolean).map((n) => ({ name: n, type: inferType(n) }))
      : [];
    const methods = parseMethods(className, content);
    const blocks = parseJsdocBlocks(content);
    enrichFromJsdoc(blocks, className, ctorParams, methods);
    for (const method of methods.values()) {
      method.variadic = detectMethodVariadic(content, className, method.name, method.isStatic);
    }
    applyHeuristics(methods);
    const decl = buildDeclaration(className, ctorParams, methods, { ctorVariadic });
    writeDeclaration(className, decl);
    indexExports.push(`export * from './${className}';`);
  }

  fs.writeFileSync(path.join(OUT_DIR, 'index.d.ts'), indexExports.join('\n') + '\n', 'utf8');
  console.log(`Generated declarations for ${indexExports.length} symbols.`);
}

main();
