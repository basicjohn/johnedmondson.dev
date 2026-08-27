import { describe, it, expect } from "vitest";
import { getDictionary, isLocale } from "./i18n";
import { locales } from "./types";
import en from "@/dictionaries/en.json";
import de from "@/dictionaries/de.json";

type Dict = Record<string, unknown>;

function flatten(obj: Dict, prefix = ""): Record<string, string> {
  return Object.entries(obj).reduce<Record<string, string>>((acc, [k, v]) => {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === "object" && !Array.isArray(v)) {
      Object.assign(acc, flatten(v as Dict, key));
    } else {
      acc[key] = String(v);
    }
    return acc;
  }, {});
}

const flatEn = flatten(en as Dict);
const flatDe = flatten(de as Dict);

describe("isLocale", () => {
  it.each([...locales])("accepts %s", (locale) => {
    expect(isLocale(locale)).toBe(true);
  });

  it.each(["fr", "EN", "en-US", "", "admin"])("rejects %j", (value) => {
    expect(isLocale(value)).toBe(false);
  });
});

describe("getDictionary", () => {
  it.each([...locales])("returns the %s dictionary", (locale) => {
    expect(getDictionary(locale)).toBeDefined();
  });

  it("falls back to English rather than returning undefined", () => {
    const unknown = "fr" as unknown as (typeof locales)[number];
    expect(getDictionary(unknown)).toEqual(en);
  });
});

// A bilingual site whose German half silently falls back to English is
// worse than a monolingual one — it looks finished and is not.
describe("dictionary parity", () => {
  it("defines the same keys in both languages", () => {
    expect(Object.keys(flatDe).sort()).toEqual(Object.keys(flatEn).sort());
  });

  it("has no empty values in either language", () => {
    for (const [locale, dict] of [
      ["en", flatEn],
      ["de", flatDe],
    ] as const) {
      const empty = Object.entries(dict)
        .filter(([, v]) => !v.trim())
        .map(([k]) => k);
      expect(empty, `empty ${locale} keys`).toEqual([]);
    }
  });

  it("leaves only genuine cognates untranslated", () => {
    // Identical strings are usually an untranslated key. These few are the
    // same word in both languages, so the list is pinned rather than the
    // count — a new entry appearing here means a missed translation.
    const identical = Object.keys(flatEn)
      .filter((k) => flatEn[k] === flatDe[k])
      .sort();

    expect(identical).toEqual(
      ["contact.name", "nav.portfolio", "portfolio.title", "post.stack"].sort(),
    );
  });

  it("carries the availability copy Phase 2 introduced, in both languages", () => {
    expect(flatEn["footer.availabilityHeading"]).toBeTruthy();
    expect(flatDe["footer.availabilityHeading"]).toBeTruthy();
    expect(flatEn["footer.availabilityText"]).toMatch(/full-time/i);
    expect(flatDe["footer.availabilityText"]).not.toBe(
      flatEn["footer.availabilityText"],
    );
  });

  it("no longer carries the newsletter or skills copy", () => {
    for (const key of [
      "footer.newsletterHeading",
      "footer.newsletterText",
      "footer.newsletterCta",
      "home.skillsHeading",
    ]) {
      expect(flatEn[key], `en.${key}`).toBeUndefined();
      expect(flatDe[key], `de.${key}`).toBeUndefined();
    }
  });
});
