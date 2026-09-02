import { describe, it, expect } from "vitest";
import {
  getAllPosts,
  getPostsByType,
  getPostBySlug,
  getPostById,
  getFeaturedPosts,
  getRelatedPosts,
  getAllTags,
  getSiteData,
} from "./content";

// These run against the real content/posts directory rather than fixtures.
// The JSON files are the data model, so assertions are on invariants that
// must hold as posts are added, never on counts that change when John
// publishes.

describe("getAllPosts", () => {
  it("excludes drafts by default", () => {
    const posts = getAllPosts();
    expect(posts.length).toBeGreaterThan(0);
    expect(posts.every((p) => p.status === "published")).toBe(true);
  });

  it("includes drafts only when asked", () => {
    const published = getAllPosts();
    const all = getAllPosts({ includeDrafts: true });

    expect(all.length).toBeGreaterThanOrEqual(published.length);
    expect(all.some((p) => p.status === "draft")).toBe(true);
  });

  it("returns newest first", () => {
    const dates = getAllPosts({ includeDrafts: true }).map((p) => p.date);
    const sorted = [...dates].sort().reverse();
    expect(dates).toEqual(sorted);
  });
});

describe("getPostsByType", () => {
  it.each(["portfolio", "writing"] as const)(
    "returns only published %s posts",
    (type) => {
      const posts = getPostsByType(type);
      expect(posts.length).toBeGreaterThan(0);
      expect(posts.every((p) => p.type === type)).toBe(true);
      expect(posts.every((p) => p.status === "published")).toBe(true);
    },
  );

  it("partitions the published set with no overlap", () => {
    const portfolio = getPostsByType("portfolio");
    const writing = getPostsByType("writing");
    expect(portfolio.length + writing.length).toBe(getAllPosts().length);
  });
});

describe("lookups", () => {
  it("finds a post by slug, including drafts", () => {
    const draft = getAllPosts({ includeDrafts: true }).find(
      (p) => p.status === "draft",
    )!;
    expect(getPostBySlug(draft.slug)?.id).toBe(draft.id);
  });

  it("finds a post by id", () => {
    const first = getAllPosts()[0];
    expect(getPostById(first.id)?.slug).toBe(first.slug);
  });

  it("returns undefined for an unknown slug rather than throwing", () => {
    expect(getPostBySlug("no-such-post-exists")).toBeUndefined();
    expect(getPostById("no-such-id")).toBeUndefined();
  });
});

// The portfolio is curated: `order` decides the listing, and the site's own
// entry — which has none — falls to the back instead of leading.
describe("portfolio order", () => {
  it("lists ordered projects first, ascending", () => {
    const ranks = getPostsByType("portfolio").map(
      (p) => p.order ?? Number.POSITIVE_INFINITY,
    );
    expect(ranks).toEqual([...ranks].sort((a, b) => a - b));
  });

  it("keeps unordered projects newest-first behind them", () => {
    const unordered = getPostsByType("portfolio").filter(
      (p) => p.order === undefined,
    );
    const dates = unordered.map((p) => p.date);
    expect(dates).toEqual([...dates].sort().reverse());
  });

  it("does not lead with this website", () => {
    const [first] = getPostsByType("portfolio");
    expect(first.slug).not.toBe("johnedmondson-dev-v2");
  });

  it("leaves writing chronological", () => {
    const dates = getPostsByType("writing").map((p) => p.date);
    expect(dates).toEqual([...dates].sort().reverse());
  });
});

describe("getFeaturedPosts", () => {
  it("respects the limit", () => {
    expect(getFeaturedPosts("portfolio", 2).length).toBeLessThanOrEqual(2);
  });

  it("never returns drafts", () => {
    const featured = [
      ...getFeaturedPosts("portfolio", 10),
      ...getFeaturedPosts("writing", 10),
    ];
    expect(featured.every((p) => p.status === "published")).toBe(true);
  });

  it("falls back to recent posts when nothing is flagged featured", () => {
    // Whichever branch the real data takes, the result must be non-empty
    // for a type that has published posts — an empty "Featured work"
    // section is the failure this guards.
    for (const type of ["portfolio", "writing"] as const) {
      if (getPostsByType(type).length > 0) {
        expect(getFeaturedPosts(type).length).toBeGreaterThan(0);
      }
    }
  });
});

describe("getRelatedPosts", () => {
  const post = getPostsByType("portfolio")[0];

  it("never includes the post itself", () => {
    expect(getRelatedPosts(post, 10).some((p) => p.id === post.id)).toBe(false);
  });

  it("stays within the same type", () => {
    expect(getRelatedPosts(post, 10).every((p) => p.type === post.type)).toBe(
      true,
    );
  });

  it("ranks posts sharing more tags first", () => {
    const related = getRelatedPosts(post, 10);
    const scores = related.map(
      (p) => p.tags.filter((t) => post.tags.includes(t)).length,
    );
    expect(scores).toEqual([...scores].sort((a, b) => b - a));
  });

  it("respects the limit", () => {
    expect(getRelatedPosts(post, 2).length).toBeLessThanOrEqual(2);
  });
});

describe("getAllTags", () => {
  it("returns unique tags, sorted", () => {
    const tags = getAllTags();
    expect(tags).toEqual([...new Set(tags)].sort());
  });

  it("scopes to a type when asked", () => {
    const portfolioTags = getAllTags("portfolio");
    const fromPosts = new Set(
      getPostsByType("portfolio").flatMap((p) => p.tags),
    );
    expect(new Set(portfolioTags)).toEqual(fromPosts);
  });
});

describe("getSiteData", () => {
  it("exposes socials and a contact address", () => {
    const site = getSiteData();
    expect(site.email).toMatch(/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i);
    expect(site.socials.length).toBeGreaterThan(0);
    expect(
      site.socials.every((s) => s.label && /^https?:\/\//.test(s.url)),
    ).toBe(true);
  });

  it("no longer carries the data Phase 2 removed", () => {
    // greetings, quotes and skills drove the randomized greeting, the
    // rotating footer quote and the skill ticker. Their absence is the
    // thing that keeps them from coming back.
    const site = getSiteData() as Record<string, unknown>;
    expect(site.greetings).toBeUndefined();
    expect(site.quotes).toBeUndefined();
    expect(site.skills).toBeUndefined();
  });
});
