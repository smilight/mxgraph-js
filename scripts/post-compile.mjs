import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
const entrypointsDir = path.join(distDir, 'entrypoints');
const generatedDtsDir = path.resolve('src/generated-dts');

if (fs.existsSync(entrypointsDir)) {
  for (const file of fs.readdirSync(entrypointsDir)) {
    const from = path.join(entrypointsDir, file);
    const to = path.join(distDir, file);
    fs.renameSync(from, to);
  }
  fs.rmSync(entrypointsDir, { recursive: true, force: true });
}

if (fs.existsSync(generatedDtsDir)) {
  for (const entry of fs.readdirSync(generatedDtsDir)) {
    if (!entry.endsWith('.d.ts')) continue;
    const src = path.join(generatedDtsDir, entry);
    const dest = path.join(distDir, entry);
    fs.copyFileSync(src, dest);
  }
}
