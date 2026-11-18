import { describe, it, expect } from "vitest";
import { getAllPosts, getHomeIntro, getSiteData } from "./content";
import { locales, projectKinds } from "./types";

// The CMS writes these files, and nothing between it and a deploy checks
// them. A missing German body or a duplicated slug does not fail the build;
// it ships a broken page. These tests are that missing check.

const all = getAllPosts({ includeDrafts: true });
const published = all.filter((p) => p.status === "published");

describe("post collection", () => {
  it("has posts to render", () => {
    expect(all.length).toBeGreaterThan(0);
  });

  it("has unique ids", () => {
    const ids = all.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has unique slugs, since slugs are the URL", () => {
    const slugs = all.map((p) => p.slug);
    const duplicates = slugs.filter((s, i) => slugs.indexOf(s) !== i);
    expect(duplicates).toEqual([]);
  });
});

describe.each(all.map((p) => [p.slug, p] as const))(
  "post: %s",
  (_slug, post) => {
    it("has a URL-safe slug", () => {
      expect(post.slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    });

    it("has a valid ISO date", () => {
      expect(post.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number.isNaN(Date.parse(post.date))).toBe(false);
    });

    it("has a known type and status", () => {
      expect(["portfolio", "writing"]).toContain(post.type);
      expect(["draft", "published"]).toContain(post.status);
    });

    it("has an array of tags and a boolean featured flag", () => {
      expect(Array.isArray(post.tags)).toBe(true);
      expect(typeof post.featured).toBe("boolean");
    });

    it("carries a title, excerpt and body object for both locales", () => {
      for (const field of ["title", "excerpt", "body"] as const) {
        expect(Object.keys(post[field]).sort()).toEqual([...locales].sort());
      }
    });
  },
);

// Drafts are allowed to be half-written — that is what a draft is. Published
// posts are what the static export turns into pages, in both languages.
describe.each(published.map((p) => [p.slug, p] as const))(
  "published post: %s",
  (_slug, post) => {
    it.each([...locales])("has a non-empty title in %s", (locale) => {
      expect(post.title[locale].trim()).not.toBe("");
    });

    it.each([...locales])("has a non-empty excerpt in %s", (locale) => {
      expect(post.excerpt[locale].trim()).not.toBe("");
    });

    it.each([...locales])("has a non-empty body in %s", (locale) => {
      expect(post.body[locale].trim()).not.toBe("");
    });

    it("has at least one tag, so related posts can rank it", () => {
      expect(post.tags.length).toBeGreaterThan(0);
    });
  },
);

describe("portfolio posts", () => {
  const portfolio = published.filter((p) => p.type === "portfolio");

  it.each(portfolio.map((p) => [p.slug, p] as const))(
    "%s names the role held",
    (_slug, post) => {
      expect(post.role?.trim()).toBeTruthy();
    },
  );

  // The eyebrow reads "year · kind"; a project without a kind is the one
  // card a reader cannot place.
  it.each(portfolio.map((p) => [p.slug, p] as const))(
    "%s says what kind of engagement it was",
    (_slug, post) => {
      expect(projectKinds).toContain(post.kind);
    },
  );

  // Two projects once shared an order and the home page's third slot was
  // decided by whichever file the sort happened to see first.
  it("gives no two projects the same order", () => {
    const orders = portfolio
      .map((p) => p.order)
      .filter((o): o is number => o !== undefined);
    expect(new Set(orders).size).toBe(orders.length);
  });

  // Cards show the summary; the excerpt is the project page's standfirst
  // and runs to 250 characters, which is five lines on a card.
  describe.each(portfolio.map((p) => [p.slug, p] as const))(
    "%s card summary",
    (_slug, post) => {
      it.each([...locales])("exists in %s", (locale) => {
        expect(post.summary?.[locale]?.trim()).toBeTruthy();
      });

      it.each([...locales])("fits on a card in %s", (locale) => {
        expect(post.summary![locale].length).toBeLessThanOrEqual(140);
      });
    },
  );
});

// Any post may carry a summary; when it does, it must be a card's worth.
describe.each(all.filter((p) => p.summary).map((p) => [p.slug, p] as const))(
  "summary on %s",
  (_slug, post) => {
    it("is present for every locale, not just one", () => {
      expect(Object.keys(post.summary!).sort()).toEqual([...locales].sort());
    });
  },
);

// A project's title is its name; what it is goes in the subhead. The two
// used to share one string ("Six Pillars — Cloud Optimization Platform"),
// and a dash creeping back into a title would print the description twice.
describe.each(
  published
    .filter((p) => p.type === "portfolio")
    .map((p) => [p.slug, p] as const),
)("project subhead on %s", (_slug, post) => {
  it.each([...locales])("exists in %s", (locale) => {
    expect(post.subtitle?.[locale]?.trim()).toBeTruthy();
  });

  it.each([...locales])("is not repeated in the %s title", (locale) => {
    expect(post.title[locale]).not.toMatch(/ [—–-] /);
  });
});

// content/site.json is edited by hand. These are the mistakes a hand makes:
// a sentence changed in one language only, a typo in the intro switch, a
// link written with its language prefix.
describe("site.json", () => {
  const site = getSiteData();

  // Every { en, de } pair in the file, by its path
  function localized(
    value: unknown,
    path: string,
  ): [string, Record<string, unknown>][] {
    if (!value || typeof value !== "object") return [];
    const obj = value as Record<string, unknown>;
    if (locales.some((l) => typeof obj[l] === "string")) return [[path, obj]];
    return Object.entries(obj).flatMap(([k, v]) =>
      localized(v, path ? `${path}.${k}` : k),
    );
  }
  const pairs = localized(site, "");

  it("has copy to check", () => {
    expect(pairs.length).toBeGreaterThan(10);
  });

  it.each(pairs)("%s is written in every language", (_path, pair) => {
    for (const locale of locales) {
      expect(String(pair[locale] ?? "").trim(), locale).not.toBe("");
    }
  });

  it("points home.intro at an intro that exists", () => {
    expect(Object.keys(site.home.intros)).toContain(site.home.intro);
    expect(getHomeIntro(site).searchDescription.trim()).not.toBe("");
  });

  it("gives every intro a search description", () => {
    for (const [name, intro] of Object.entries(site.home.intros)) {
      expect(intro.searchDescription?.trim(), name).toBeTruthy();
    }
  });

  it("writes ticker links as site paths without a language", () => {
    for (const item of site.now.items) {
      if (item.href === undefined) continue;
      expect(item.href).toMatch(/^\/(?!en\b|de\b)[a-z0-9/-]*$/);
    }
  });

  it("links the ticker only to pages that exist", () => {
    const slugs = published
      .filter((p) => p.type === "portfolio")
      .map((p) => `/portfolio/${p.slug}`);
    const known = ["/contact", "/portfolio", "/writing", ...slugs];
    for (const item of site.now.items) {
      if (item.href !== undefined) expect(known).toContain(item.href);
    }
  });

  it("dates the ticker with a valid ISO date", () => {
    expect(site.now.updated).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});
