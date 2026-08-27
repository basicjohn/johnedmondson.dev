import { describe, it, expect } from "vitest";
import { getAllPosts } from "./content";
import { locales } from "./types";

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
});
