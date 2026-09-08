import manifest from "@/generated/images.json";

type Entry = { width: number; height: number; widths: number[] };
const entries = manifest as Record<string, Entry>;

/**
 * How wide an image is laid out, as a `sizes` attribute, so the browser can
 * pick the smallest rendition that still fills it. Named for where the
 * image sits, not for a pixel value.
 */
export const SIZES = {
  /** One card of a two-column grid inside the 72rem container */
  card: "(min-width: 1152px) 34rem, (min-width: 768px) 50vw, 100vw",
  /** The home page's lead card, full container width */
  feature: "(min-width: 1152px) 69rem, 100vw",
  /** The reading column on a project or writing page */
  prose: "(min-width: 1024px) 42rem, 100vw",
  /** One cell of a two-up figure grid in the reading column */
  grid: "(min-width: 1024px) 21rem, (min-width: 768px) 50vw, 100vw",
} as const;

export type ImageAttrs = {
  src: string;
  width?: number;
  height?: number;
  srcSet?: string;
  sizes?: string;
};

/**
 * Intrinsic size and WebP renditions for a path under /images, when the
 * manifest knows it. Unknown paths (SVGs, remote URLs, images added since
 * the last `npm run dev`) fall back to the plain src, so nothing breaks —
 * the page merely loses the layout reservation and the smaller files.
 */
export function imageAttrs(src: string, sizes: string): ImageAttrs {
  const entry = entries[src];
  if (!entry) return { src };
  const stem = src.replace(/\.(png|jpe?g)$/i, "");
  const srcSet = entry.widths
    .map((w) => `${stem.replace("/images/", "/images/_opt/")}-${w}.webp ${w}w`)
    .join(", ");
  return { src, width: entry.width, height: entry.height, srcSet, sizes };
}

/** Intrinsic size when known; undefined for SVGs and unknown paths */
export function imageSize(
  src: string,
): { width: number; height: number } | undefined {
  const entry = entries[src];
  return entry ? { width: entry.width, height: entry.height } : undefined;
}

/** The same, as an HTML attribute string for the markdown renderer */
export function imageAttrString(src: string, sizes: string): string {
  const a = imageAttrs(src, sizes);
  const parts = [`src="${a.src}"`];
  if (a.width && a.height)
    parts.push(`width="${a.width}"`, `height="${a.height}"`);
  if (a.srcSet) parts.push(`srcset="${a.srcSet}"`, `sizes="${a.sizes}"`);
  return parts.join(" ");
}
