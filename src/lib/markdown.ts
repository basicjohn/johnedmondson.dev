// Minimal, dependency-free Markdown → HTML renderer.
// Supports: headings (with ids), paragraphs, bold/italic/inline code, links,
// images (with intrinsic size and responsive renditions), image grids,
// collapsible sections, fenced code blocks, blockquotes, lists, and rules.
import { imageAttrString, imageSize, SIZES } from "./images";
import { slugify } from "./utils";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const IMAGE = /!\[([^\]]*)\]\(([^)\s]+)\)/g;

function imageTag(alt: string, src: string, sizes: string): string {
  return `<img ${imageAttrString(src, sizes)} alt="${alt}" loading="lazy" />`;
}

function inline(text: string, sizes: string = SIZES.prose): string {
  let out = escapeHtml(text);
  out = out.replace(IMAGE, (_m, alt, src) => imageTag(alt, src, sizes));
  out = out.replace(
    /\[([^\]]+)\]\(([^)\s]+)\)/g,
    '<a href="$2" rel="noopener">$1</a>',
  );
  out = out.replace(/`([^`]+)`/g, "<code>$1</code>");
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  return out;
}

/** A line that is nothing but one image */
const IMAGE_LINE = /^!\[([^\]]*)\]\(([^)\s]+)\)$/;

export type Heading = { level: number; text: string; id: string };

function headingId(text: string): string {
  // Strip inline markup before slugging so "**Go** API" and "Go API" agree
  return slugify(text.replace(/[*`_]/g, ""));
}

/**
 * The h2/h3 outline of a document, for an on-page table of contents. Ids
 * match the ones markdownToHtml emits.
 */
export function extractHeadings(md: string): Heading[] {
  const out: Heading[] = [];
  let inFence = false;
  for (const line of md.replace(/\r\n/g, "\n").split("\n")) {
    if (line.startsWith("```")) inFence = !inFence;
    if (inFence) continue;
    const h = line.match(/^(#{2,3})\s+(.*)$/);
    if (h) out.push({ level: h[1].length, text: h[2], id: headingId(h[2]) });
  }
  return out;
}

export function markdownToHtml(md: string): string {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const html: string[] = [];
  let para: string[] = [];
  let i = 0;

  const flushPara = () => {
    if (para.length) {
      html.push(`<p>${inline(para.join(" "))}</p>`);
      para = [];
    }
  };

  while (i < lines.length) {
    const line = lines[i];

    // Fenced code block
    if (line.startsWith("```")) {
      flushPara();
      const lang = line.slice(3).trim();
      const code: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        code.push(lines[i]);
        i++;
      }
      i++; // skip closing fence
      html.push(
        `<pre><code${lang ? ` class="language-${lang}"` : ""}>${escapeHtml(
          code.join("\n"),
        )}</code></pre>`,
      );
      continue;
    }

    // Collapsible section: ":::details Summary text" … ":::". For the parts
    // of a long case study most readers skip — a pitch deck, an appendix —
    // so the page stays scannable without losing them.
    const details = line.match(/^:::details\s+(.+)$/);
    if (details) {
      flushPara();
      const inner: string[] = [];
      i++;
      while (i < lines.length && lines[i].trim() !== ":::") {
        inner.push(lines[i]);
        i++;
      }
      i++; // skip closing :::
      html.push(
        `<details class="prose-details"><summary>${inline(details[1])}</summary>${markdownToHtml(inner.join("\n"))}</details>`,
      );
      continue;
    }

    // Blank line
    if (!line.trim()) {
      flushPara();
      i++;
      continue;
    }

    // Horizontal rule
    if (/^(-{3,}|\*{3,})$/.test(line.trim())) {
      flushPara();
      html.push("<hr />");
      i++;
      continue;
    }

    // Heading — h2/h3 get ids so a table of contents can point at them
    const h = line.match(/^(#{1,4})\s+(.*)$/);
    if (h) {
      flushPara();
      const lvl = h[1].length;
      const id = lvl === 2 || lvl === 3 ? ` id="${headingId(h[2])}"` : "";
      html.push(`<h${lvl}${id}>${inline(h[2])}</h${lvl}>`);
      i++;
      continue;
    }

    // Image grid: two or more image-only paragraphs in a row become one
    // grid, so a run of screenshots reads as a set rather than a scroll.
    if (IMAGE_LINE.test(line.trim())) {
      const images: string[] = [];
      let j = i;
      while (j < lines.length) {
        const t = lines[j].trim();
        if (IMAGE_LINE.test(t)) {
          images.push(t);
          j++;
        } else if (
          !t &&
          j + 1 < lines.length &&
          IMAGE_LINE.test(lines[j + 1].trim())
        ) {
          j++; // a single blank line between images keeps the run going
        } else {
          break;
        }
      }
      if (images.length >= 2) {
        flushPara();
        const parsed = images.map((img) => img.match(IMAGE_LINE)!);
        const cells = parsed
          .map(
            (m) =>
              `<figure>${imageTag(escapeHtml(m[1]), m[2], SIZES.grid)}<figcaption>${inline(m[1])}</figcaption></figure>`,
          )
          .join("");
        // Three across only when every image is wider than it is tall. A
        // run of full-page mockups at a third of the column is a strip of
        // unreadable text; two-up they can still be read.
        const allLandscape = parsed.every((m) => {
          const size = imageSize(m[2]);
          return size !== undefined && size.width > size.height;
        });
        const columns = images.length === 3 && allLandscape ? 3 : 2;
        html.push(
          `<div class="image-grid image-grid-${columns}">${cells}</div>`,
        );
        i = j;
        continue;
      }
    }

    // Blockquote
    if (line.startsWith(">")) {
      flushPara();
      const quote: string[] = [];
      while (i < lines.length && lines[i].startsWith(">")) {
        quote.push(lines[i].replace(/^>\s?/, ""));
        i++;
      }
      html.push(`<blockquote><p>${inline(quote.join(" "))}</p></blockquote>`);
      continue;
    }

    // Unordered list
    if (/^[-*]\s+/.test(line)) {
      flushPara();
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^[-*]\s+/, ""));
        i++;
      }
      html.push(
        `<ul>${items.map((it) => `<li>${inline(it)}</li>`).join("")}</ul>`,
      );
      continue;
    }

    // Ordered list
    if (/^\d+\.\s+/.test(line)) {
      flushPara();
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s+/, ""));
        i++;
      }
      html.push(
        `<ol>${items.map((it) => `<li>${inline(it)}</li>`).join("")}</ol>`,
      );
      continue;
    }

    para.push(line.trim());
    i++;
  }

  flushPara();
  return html.join("\n");
}
