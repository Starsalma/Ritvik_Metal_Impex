/**
 * Writes src/data/imageSizes.js — a map of public image path to [width, height].
 *
 * og:image:width / og:image:height let social scrapers and Google lay out a
 * card before the image downloads, and they are how a crawler knows an image
 * clears the size bar for a large preview. Hard-coding them drifts the moment
 * someone swaps a photo, so the manifest is generated from the files on disk.
 *
 * Pure Node — reads the JPEG SOF / PNG IHDR / WebP VP8 headers directly rather
 * than pulling in an image library for a build-time script.
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, resolve, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = resolve(__dirname, '../public');
const OUT = resolve(__dirname, '../src/data/imageSizes.js');

const SOF_MARKERS = new Set([
  0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf,
]);

function dimensions(buf) {
  // PNG
  if (buf.length > 24 && buf.readUInt32BE(0) === 0x89504e47) {
    return [buf.readUInt32BE(16), buf.readUInt32BE(20)];
  }

  // WebP (VP8 / VP8L / VP8X)
  if (buf.length > 30 && buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') {
    const fourcc = buf.toString('ascii', 12, 16);
    if (fourcc === 'VP8 ') return [buf.readUInt16LE(26) & 0x3fff, buf.readUInt16LE(28) & 0x3fff];
    if (fourcc === 'VP8L') {
      const bits = buf.readUInt32LE(21);
      return [(bits & 0x3fff) + 1, ((bits >> 14) & 0x3fff) + 1];
    }
    if (fourcc === 'VP8X') {
      return [
        1 + (buf[24] | (buf[25] << 8) | (buf[26] << 16)),
        1 + (buf[27] | (buf[28] << 8) | (buf[29] << 16)),
      ];
    }
  }

  // JPEG — walk the segment chain to the start-of-frame
  if (buf.length > 4 && buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i < buf.length - 9) {
      if (buf[i] !== 0xff) {
        i += 1;
        continue;
      }
      const marker = buf[i + 1];
      if (SOF_MARKERS.has(marker)) {
        return [buf.readUInt16BE(i + 7), buf.readUInt16BE(i + 5)];
      }
      if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
        i += 2;
        continue;
      }
      i += 2 + buf.readUInt16BE(i + 2);
    }
  }

  return null;
}

function walk(dir, acc = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, acc);
    else if (/\.(jpe?g|png|webp|avif)$/i.test(entry)) acc.push(full);
  }
  return acc;
}

const sizes = {};
let unreadable = 0;
let undersized = [];

for (const file of walk(join(PUBLIC_DIR, 'images'))) {
  const key = `/${relative(PUBLIC_DIR, file).split(sep).join('/')}`;
  const dims = dimensions(readFileSync(file));
  if (!dims) {
    unreadable += 1;
    continue;
  }
  sizes[key] = dims;
  // Google needs roughly 1200px on the long edge for a large image preview.
  if (Math.max(dims[0], dims[1]) < 1200 && key.includes('/products/')) {
    undersized.push({ key, label: `${key} (${dims[0]}x${dims[1]})` });
  }
}

/*
 * Only an image a page actually points at can hurt a thumbnail. Files left in
 * public/images/products after a photo is replaced are dead weight, and
 * counting them made the warning read 17 when 13 products were affected — a
 * number that never moves as photos get fixed is a number nobody trusts.
 */
const srcFiles = [];
(function walkSrc(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walkSrc(full);
    // Skip the manifest this script generates: it lists every image path as a
    // key, so scanning it would make every file look referenced.
    else if (/\.(jsx?|mjs|ts|tsx)$/.test(entry) && full !== OUT) srcFiles.push(full);
  }
})(resolve(__dirname, '../src'));

/*
 * Scans all of src, not just the data files. An image referenced only by a
 * component — the homepage gallery, for instance — is still in use, and
 * reporting it as unreferenced would invite someone to delete a live asset.
 */
const referenced = new Set(
  srcFiles.flatMap((f) => [...readFileSync(f, 'utf8').matchAll(/['"`](\/images\/[^'"`]+)['"`]/g)].map((m) => m[1])),
);

const liveUndersized = undersized.filter((u) => referenced.has(u.key));
const orphanUndersized = undersized.filter((u) => !referenced.has(u.key));

const body = `/**
 * GENERATED FILE — do not edit by hand.
 * Run \`npm run images\` (or any build) to regenerate from public/images.
 *
 * Maps a public image path to [width, height] so <Seo /> can emit accurate
 * og:image:width / og:image:height.
 */
export const imageSizes = ${JSON.stringify(sizes, null, 2)};

/** Returns [width, height] for a public image path, or null if unknown. */
export const imageSize = (path) => imageSizes[path] ?? null;
`;

writeFileSync(OUT, body, 'utf8');

console.log(`imageSizes.js written with ${Object.keys(sizes).length} images`);
if (unreadable) console.log(`  ${unreadable} file(s) could not be parsed`);
if (liveUndersized.length) {
  console.log(`  WARNING: ${liveUndersized.length} product image(s) in use are under 1200px — too small for a Google large thumbnail:`);
  liveUndersized.forEach((u) => console.log(`    - ${u.label}`));
}
if (orphanUndersized.length) {
  console.log(`  (${orphanUndersized.length} undersized file(s) on disk are not referenced by any page)`);
}
