import { describe, it, expect } from "vitest";
import { alternatesFor } from "./seo";
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
