/**
 * Whether a line of display type has letters that hang below the baseline.
 * Poster titles are set at 0.85 line height, so a "j" or "g" reaches past
 * the title's box; the line under such a title needs the extra room, and
 * one without them (Let's talk) can sit closer.
 */
export function hasDescender(text: string): boolean {
  return /[gjpqyQ]/.test(text);
}
