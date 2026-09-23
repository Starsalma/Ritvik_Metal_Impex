/**
 * Reports which products still carry an unverified placeholder price.
 *
 * Nothing in src/data/pricing.js renders until `verified: true`, so an
 * unverified entry is invisible rather than wrong. This script exists so the
 * invisible state is still legible from the terminal.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const load = async (rel) => {
  const src = readFileSync(resolve(root, rel), 'utf8');
  const mod = `data:text/javascript;base64,${Buffer.from(src).toString('base64')}`;
  return import(mod);
};

const { priceRanges, formatPriceRange, PRICE_AS_OF } = await load('src/data/pricing.js');
const productsSrc = readFileSync(resolve(root, 'src/data/products.js'), 'utf8');
const names = Object.fromEntries(
  [...productsSrc.matchAll(/id:\s*(\d+),\s*\n\s*name:\s*"([^"]+)"/g)].map((m) => [m[1], m[2]]),
);

const entries = Object.entries(priceRanges);
const pending = entries.filter(([, r]) => !r.verified);
const live = entries.filter(([, r]) => r.verified);

console.log(`\nIndicative prices — as of ${PRICE_AS_OF}\n`);

if (live.length) {
  console.log(`  PUBLISHED (${live.length})`);
  for (const [id, r] of live) {
    console.log(`    ${String(id).padStart(2)}  ${(names[id] ?? '?').padEnd(38)} ${formatPriceRange(r)}`);
  }
  console.log('');
}

if (pending.length) {
  console.log(`  UNVERIFIED — not shown on the site (${pending.length})`);
  for (const [id, r] of pending) {
    console.log(`    ${String(id).padStart(2)}  ${(names[id] ?? '?').padEnd(38)} ${formatPriceRange(r)}  <- placeholder`);
  }
  console.log('\n  Replace the figures with your own, then set verified: true in src/data/pricing.js.');
}

console.log(`\n  ${live.length} of ${entries.length} published.\n`);
