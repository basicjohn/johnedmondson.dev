import { describe, it, expect } from "vitest";
import { extractHeadings, markdownToHtml } from "./markdown";

// The renderer is hand-rolled, so the few constructs the site depends on
// are pinned here: heading ids the table of contents links to, image runs
// becoming grids, collapsible sections, and images carrying their size.

describe("headings", () => {
  it("gives h2 and h3 ids that extractHeadings agrees with", () => {
    const md = "## The core idea\n\ntext\n\n### Go **API**\n\nmore";
    const html = markdownToHtml(md);
    const headings = extractHeadings(md);

    expect(headings).toEqual([
      { level: 2, text: "The core idea", id: "the-core-idea" },
      { level: 3, text: "Go **API**", id: "go-api" },
    ]);
    for (const h of headings) expect(html).toContain(`id="${h.id}"`);
  });

  it("ignores headings inside code fences", () => {
    const md = "## Real\n\n```\n## not a heading\n```";
    expect(extractHeadings(md).map((h) => h.text)).toEqual(["Real"]);
  });
});

describe("images", () => {
  it("emits width, height and WebP renditions for a known image", () => {
    const html = markdownToHtml(
      "![Cover](/images/portfolio/six-pillars-cover.jpg)",
    );
    expect(html).toContain('width="1100"');
    expect(html).toContain('height="619"');
    expect(html).toContain(
      "/images/_opt/portfolio/six-pillars-cover-640.webp 640w",
    );
    expect(html).toContain('sizes="');
    expect(html).toContain('loading="lazy"');
  });

  it("falls back to a plain img for an unknown path", () => {
    const html = markdownToHtml("![Diagram](/images/portfolio/nope.svg)");
    expect(html).toContain('<img src="/images/portfolio/nope.svg"');
    expect(html).not.toContain("srcset");
  });

  it("turns a run of image paragraphs into one grid with captions", () => {
    const md = [
      "![One](/images/a.png)",
      "",
      "![Two](/images/b.png)",
      "",
      "![Three](/images/c.png)",
      "",
      "A paragraph after.",
    ].join("\n");
    const html = markdownToHtml(md);

    // Unknown sizes are not assumed landscape, so this run stays two-up
    expect(html.match(/class="image-grid image-grid-2"/g)).toHaveLength(1);
    expect(html.match(/<figure>/g)).toHaveLength(3);
    expect(html).toContain("<figcaption>Two</figcaption>");
    expect(html).toContain("<p>A paragraph after.</p>");
  });

  it("goes three across only when every image is landscape", () => {
    const landscape = [
      "![A](/images/portfolio/six-pillars-app-login.png)",
      "![B](/images/portfolio/six-pillars-app-recommendation.png)",
      "![C](/images/portfolio/six-pillars-app-performance-comparison.png)",
    ].join("\n\n");
    expect(markdownToHtml(landscape)).toContain("image-grid-3");

    // The optimization-flow run: three full-page mockups, all portrait
    const tall = [
      "![A](/images/portfolio/six-pillars-volume-management.png)",
      "![B](/images/portfolio/six-pillars-resource-analysis.png)",
      "![C](/images/portfolio/six-pillars-optimization-results.png)",
    ].join("\n\n");
    expect(markdownToHtml(tall)).toContain("image-grid-2");
    expect(markdownToHtml(tall)).not.toContain("image-grid-3");
  });

  it("leaves a single image as an image, not a grid", () => {
    const html = markdownToHtml("![Solo](/images/a.png)\n\nText.");
    expect(html).not.toContain("image-grid");
    expect(html).toContain('alt="Solo"');
  });
});

describe("collapsible sections", () => {
  it("renders :::details as <details> with rendered markdown inside", () => {
    const md =
      ":::details Three slides\n\nSome **bold** text.\n\n:::\n\nAfter.";
    const html = markdownToHtml(md);

    expect(html).toContain(
      '<details class="prose-details"><summary>Three slides</summary>',
    );
    expect(html).toContain("<p>Some <strong>bold</strong> text.</p></details>");
    expect(html).toContain("<p>After.</p>");
  });
});
