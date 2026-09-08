// Derives the responsive image set from public/images.
//
// For every raster under public/images this writes WebP renditions at the
// widths below (never upscaling) into public/images/_opt, and records each
// source's intrinsic size and available widths in src/generated/images.json.
// The manifest is committed; the renditions are not (see .gitignore) and are
// rebuilt by `predev` and `prebuild`, so a fresh checkout never needs to
// think about it. SVGs are left alone: they scale on their own.
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "public", "images");
const OUT_DIR = path.join(SRC, "_opt");
const MANIFEST = path.join(ROOT, "src", "generated", "images.json");
const WIDTHS = [640, 1024, 1600];
const RASTER = /\.(png|jpe?g)$/i;

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (p !== OUT_DIR) files.push(...(await walk(p)));
    } else if (RASTER.test(e.name)) {
      files.push(p);
    }
  }
  return files.sort();
}

const manifest = {};
let written = 0;
for (const file of await walk(SRC)) {
  const rel = path.relative(SRC, file); // portfolio/x.png
  const url = "/images/" + rel.split(path.sep).join("/");
  const image = sharp(file);
  const { width, height } = await image.metadata();
  const widths = WIDTHS.filter((w) => w < width);
  // Always include the source width so the largest rendition is lossless in
  // size, and so a small image still gets one WebP.
  widths.push(width);
  const stem = rel.replace(RASTER, "");
  for (const w of widths) {
    const target = path.join(OUT_DIR, `${stem}-${w}.webp`);
    await fs.mkdir(path.dirname(target), { recursive: true });
    try {
      await fs.access(target);
    } catch {
      await image
        .clone()
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: 82 })
        .toFile(target);
      written++;
    }
  }
  manifest[url] = { width, height, widths };
}

await fs.mkdir(path.dirname(MANIFEST), { recursive: true });
await fs.writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
console.log(
  `images: ${Object.keys(manifest).length} sources, ${written} new renditions`,
);
