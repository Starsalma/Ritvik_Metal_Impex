/**
 * Re-encodes everything in public/images to sane web settings.
 *
 * The photographs were being shipped straight from the camera or the supplier:
 * alloy-bars.jpg was 725 kB at only 1170×800, sheets-plates-coils.jpg 291 kB at
 * 700×700, and logo.png — on every page, in the navbar and the footer — was
 * 900 kB at 1254×1254 to be displayed at about 96 px. The homepage totalled
 * 5.6 MB, which is what decides the Largest Contentful Paint on a phone.
 *
 * Run after adding photographs:  npm run images:optimise
 * Then regenerate the dimension manifest:  npm run images
 *
 * Safe to run repeatedly — it skips anything it cannot make smaller.
 *
 * MAX_EDGE must stay at or above MIN_SOCIAL_IMAGE_EDGE (1200) in
 * src/data/site.js. Below that, socialImage() decides a picture is too small
 * for a large social card and substitutes the brand image instead, so
 * over-shrinking here would quietly replace every product's share preview.
 */
import sharp from 'sharp';
import { readdirSync, statSync, renameSync, unlinkSync } from 'node:fs';
import { join, extname, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIR = join(ROOT, 'public/images');

const MAX_EDGE = 1600;
const JPEG_QUALITY = 80;
/** The logo is never displayed above ~112 px CSS; 256 covers 2× and the Apple touch icon. */
const LOGO_EDGE = 256;

const files = [];
(function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full);
    else if (/\.(jpe?g|png)$/i.test(entry)) files.push(full);
  }
})(DIR);

const kb = (bytes) => Math.round(bytes / 1024);
let before = 0;
let after = 0;
let changed = 0;

for (const file of files) {
  const originalSize = statSync(file).size;
  before += originalSize;

  const isPng = extname(file).toLowerCase() === '.png';
  const isLogo = /logo\.png$/i.test(file);
  const image = sharp(file);
  const meta = await image.metadata();
  const edge = isLogo ? LOGO_EDGE : MAX_EDGE;

  let pipeline = image;
  if (Math.max(meta.width, meta.height) > edge) {
    pipeline = pipeline.resize({ width: edge, height: edge, fit: 'inside', withoutEnlargement: true });
  }
  pipeline = isPng
    ? pipeline.png({ compressionLevel: 9, palette: true })
    : pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true, progressive: true });

  const tmp = `${file}.tmp`;
  await pipeline.toFile(tmp);

  const newSize = statSync(tmp).size;
  if (newSize < originalSize) {
    renameSync(tmp, file);
    after += newSize;
    changed += 1;
    const saved = Math.round((1 - newSize / originalSize) * 100);
    if (originalSize - newSize > 40 * 1024) {
      console.log(
        `  ${file.replace(`${DIR}/`, '').padEnd(38)} ${String(kb(originalSize)).padStart(4)} kB → ${String(kb(newSize)).padStart(4)} kB  (-${saved}%)`,
      );
    }
  } else {
    unlinkSync(tmp);
    after += originalSize;
  }
}

console.log(
  `\n  ${changed}/${files.length} images re-encoded: ${kb(before)} kB → ${kb(after)} kB ` +
    `(-${Math.round((1 - after / before) * 100)}%)`,
);
console.log('  Run `npm run images` to refresh src/data/imageSizes.js.');
