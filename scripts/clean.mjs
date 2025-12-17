import fs from 'fs';
import path from 'path';

const dist = path.resolve('dist');
fs.rmSync(dist, { recursive: true, force: true });
console.log(`Removed ${dist}`);
