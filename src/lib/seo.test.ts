import { describe, it, expect } from "vitest";
import {
  alternatesFor,
  openGraphFor,
  twitterFor,
  DEFAULT_OG_IMAGE,
} from "./seo";
import { locales } from "./types";

// These exist because the canonical tags were briefly declared on
// [locale]/layout, where they applied to every descendant: /de announced
// itself as a duplicate of /en, and /en/writing pointed at /en. Both are
// silent SEO failures — the pages render perfectly and quietly stop being
// indexed on their own terms.
describe("alternatesFor", () => {
  it("makes every locale canonical to itself, not to the default", () => {
    for (const locale of locales) {
      expect(alternatesFor(locale)).toMatchObject({
        canonical: `/${locale}`,
      });
    }
  });

  it("keeps a sub-page canonical to the sub-page, not its section index", () => {
    expect(alternatesFor("en", "/writing")).toMatchObject({
      canonical: "/en/writing",
    });
    expect(alternatesFor("en", "/writing/some-post")).toMatchObject({
      canonical: "/en/writing/some-post",
    });
  });

  it("never points one locale's canonical at another locale", () => {
    const de = alternatesFor("de", "/portfolio");
    expect(de?.canonical).toBe("/de/portfolio");
    expect(de?.canonical).not.toContain("/en");
  });

  it("advertises every locale in hreflang, at the same path", () => {
    const { languages } = alternatesFor("en", "/contact")!;

    expect(Object.keys(languages!).sort()).toEqual([...locales].sort());
    expect(languages).toEqual({
      en: "/en/contact",
      de: "/de/contact",
    });
  });

  it("produces the same hreflang set regardless of which locale asks", () => {
    const fromEn = alternatesFor("en", "/writing")!.languages;
    const fromDe = alternatesFor("de", "/writing")!.languages;

    expect(fromEn).toEqual(fromDe);
  });

  it("does not emit a trailing slash for a locale home", () => {
    expect(alternatesFor("en").canonical).toBe("/en");
    expect(alternatesFor("en").canonical).not.toMatch(/\/$/);
  });
});

// Next replaces a parent's whole `openGraph` object when a child sets any of
// it. The locale layout once set only `locale`, which silently dropped the
// root's og:image from every page. These pin the helper that supplies the
// complete block.
describe("openGraphFor", () => {
  it("always carries an image, falling back to the portrait card", () => {
    const og = openGraphFor("en") as { images: { url: string }[] };
    expect(og.images).toHaveLength(1);
    expect(og.images[0].url).toBe(DEFAULT_OG_IMAGE.url);
  });

  it("uses the page's own image when it has one", () => {
    const og = openGraphFor("en", "/portfolio/x", {
      image: "/images/portfolio/x.jpg",
      imageAlt: "X",
    }) as { images: { url: string; alt: string }[]; type: string };
    expect(og.images[0]).toEqual({ url: "/images/portfolio/x.jpg", alt: "X" });
  });

  it("leaves title and description to the page", () => {
    const og = openGraphFor("de", "/contact") as Record<string, unknown>;
    expect(og).not.toHaveProperty("title");
    expect(og).not.toHaveProperty("description");
  });

  it("points the url at the page in its own locale", () => {
    expect(openGraphFor("de", "/portfolio")).toMatchObject({
      url: "/de/portfolio",
      locale: "de_DE",
      alternateLocale: ["en_US"],
    });
  });
});

describe("twitterFor", () => {
  it("mirrors the Open Graph image choice", () => {
    expect(twitterFor()).toMatchObject({ images: [DEFAULT_OG_IMAGE.url] });
    expect(twitterFor("/c.jpg")).toMatchObject({ images: ["/c.jpg"] });
  });
});
