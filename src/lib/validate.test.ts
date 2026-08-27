import { describe, it, expect, afterEach, vi } from "vitest";
import { validatePost, cmsDisabledError } from "./validate";
import { emptyPost } from "./types";
import type { Post } from "./types";

function validPost(overrides: Partial<Post> = {}): Partial<Post> {
  return {
    ...emptyPost("writing"),
    slug: "a-post",
    date: "2026-01-15",
    title: { en: "A post", de: "Ein Beitrag" },
    ...overrides,
  };
}

describe("validatePost", () => {
  it("accepts a well-formed post", () => {
    expect(validatePost(validPost())).toBeNull();
  });

  it("requires an English title even when German is present", () => {
    const post = validPost({ title: { en: "", de: "Ein Beitrag" } });
    expect(validatePost(post)).toMatch(/English title/);
  });

  it("rejects a whitespace-only title rather than treating it as present", () => {
    expect(validatePost(validPost({ title: { en: "   ", de: "x" } }))).toMatch(
      /English title/,
    );
  });

  it("requires a slug", () => {
    expect(validatePost(validPost({ slug: "" }))).toMatch(/slug/);
  });

  it("rejects unknown post types", () => {
    expect(
      validatePost(validPost({ type: "essay" as unknown as Post["type"] })),
    ).toMatch(/Invalid post type/);
  });

  it("rejects unknown statuses", () => {
    expect(
      validatePost(validPost({ status: "live" as unknown as Post["status"] })),
    ).toMatch(/Invalid status/);
  });

  it.each(["15-01-2026", "2026-1-5", "2026/01/15", "not a date", ""])(
    "rejects the malformed date %j",
    (date) => {
      expect(validatePost(validPost({ date }))).toMatch(/yyyy-mm-dd/);
    },
  );

  it("reports the title problem first when a post has several", () => {
    const broken = validatePost({
      title: { en: "", de: "" },
      slug: "",
      date: "",
    });
    expect(broken).toMatch(/English title/);
  });
});

// The CMS writes to the local filesystem, so it can only ever run under
// `next dev`. Production builds exclude its routes entirely, but this guard
// is the second lock — it is what makes a stray deployment of those routes
// harmless rather than a public write endpoint.
describe("cmsDisabledError", () => {
  const original = process.env.NODE_ENV;

  afterEach(() => {
    vi.stubEnv("NODE_ENV", original ?? "test");
    vi.unstubAllEnvs();
  });

  it("blocks the CMS in production", () => {
    vi.stubEnv("NODE_ENV", "production");
    expect(cmsDisabledError()).toEqual({
      error: "The CMS is only available in local development.",
    });
  });

  it("allows the CMS in development", () => {
    vi.stubEnv("NODE_ENV", "development");
    expect(cmsDisabledError()).toBeNull();
  });

  it("allows the CMS under test, so nothing here is a false pass", () => {
    vi.stubEnv("NODE_ENV", "test");
    expect(cmsDisabledError()).toBeNull();
  });
});
