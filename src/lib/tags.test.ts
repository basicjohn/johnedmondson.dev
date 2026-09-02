import { describe, it, expect } from "vitest";
import { tagLabel } from "./tags";
import { getAllPosts } from "./content";

describe("tagLabel", () => {
  it("returns English tags unchanged", () => {
    expect(tagLabel("Architecture", "en")).toBe("Architecture");
  });

  it("translates ordinary words for German", () => {
    expect(tagLabel("Architecture", "de")).toBe("Architektur");
    expect(tagLabel("Process", "de")).toBe("Prozess");
    expect(tagLabel("Design Systems", "de")).toBe("Designsysteme");
  });

  it("leaves technical nouns as they are in German", () => {
    for (const tag of ["Next.js", "GraphQL", "Frontend", "CMS", "AWS"]) {
      expect(tagLabel(tag, "de")).toBe(tag);
    }
  });

  // Every tag on a published post is either a technical noun or has a
  // German label. This is the list the site actually shows; a new tag that
  // is an ordinary English word fails here until it is translated.
  it("has a German label for every ordinary-word tag in use", () => {
    const technical = new Set([
      "AWS",
      "CMS",
      "Dashboard",
      "Frontend",
      "Full-Stack",
      "GraphQL",
      "Next.js",
      "Operations",
      "PostgreSQL",
      "SaaS",
      "i18n",
    ]);
    const untranslated = [
      ...new Set(getAllPosts().flatMap((p) => p.tags)),
    ].filter((tag) => !technical.has(tag) && tagLabel(tag, "de") === tag);
    expect(untranslated).toEqual([]);
  });
});
