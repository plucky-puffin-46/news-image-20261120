// The World in One Day — entry program for make.fun's news-image-20261120 bounty.
// The poster itself is entry.png beside this file; this program's only job is to
// deliver those exact bytes to the grader as /output/entry.png, deterministically,
// with no network and no dependencies beyond the Node standard library.
import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
copyFileSync(join(here, 'entry.png'), join(outDir, 'entry.png'));

// Sanity check the delivered bytes: the gate wants a whole PNG, so fail loudly
// rather than hand the grader a truncated or wrong file.
const delivered = readFileSync(join(outDir, 'entry.png'));
if (delivered[0] !== 0x89 || delivered[1] !== 0x50 || delivered[2] !== 0x4e || delivered[3] !== 0x47) {
  throw new Error('entry.png is not a whole PNG');
}
console.log(`entry.png delivered: ${delivered.length} bytes`);
