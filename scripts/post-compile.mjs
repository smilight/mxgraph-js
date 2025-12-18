import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
const entrypointsDir = path.join(distDir, 'entrypoints');

if (!fs.existsSync(entrypointsDir)) {
  process.exit(0);
}

for (const file of fs.readdirSync(entrypointsDir)) {
  const from = path.join(entrypointsDir, file);
  const to = path.join(distDir, file);
  fs.renameSync(from, to);
}

fs.rmSync(entrypointsDir, { recursive: true, force: true });
