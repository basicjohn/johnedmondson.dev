import { describe, it, expect } from "vitest";
import {
  formatDate,
  formatYear,
  readingTime,
  slugify,
  coverGradient,
} from "./utils";

describe("slugify", () => {
  it("lowercases and hyphenates", () => {
    expect(slugify("Atomic Design In Practice")).toBe(
      "atomic-design-in-practice",
    );
  });

  it("transliterates German characters instead of dropping them", () => {
    // Dropping them would collapse "Übergrößen" to "bergren" — a URL that
    // no longer resembles the title it came from.
    expect(slugify("Übergrößen")).toBe("uebergroessen");
    expect(slugify("Öffentlichkeit")).toBe("oeffentlichkeit");
    expect(slugify("Maß")).toBe("mass");
  });

  it("collapses runs of punctuation and whitespace into one hyphen", () => {
    expect(slugify("Hello,   world!! -- again")).toBe("hello-world-again");
  });

  it("trims leading and trailing hyphens", () => {
    expect(slugify("  ...leading and trailing...  ")).toBe(
      "leading-and-trailing",
    );
  });

  it("returns an empty string for input with nothing slug-worthy", () => {
    expect(slugify("!!!")).toBe("");
  });

  it("is idempotent", () => {
    const once = slugify("The Drive of More");
    expect(slugify(once)).toBe(once);
  });
});

describe("formatDate", () => {
  it("formats for the locale asked for", () => {
    expect(formatDate("2026-05-20", "en")).toBe("May 20, 2026");
    expect(formatDate("2026-05-20", "de")).toBe("20. Mai 2026");
  });

  it("does not shift the day across timezones", () => {
    // Parsing "2026-01-01" as bare ISO would be UTC midnight, which renders
    // as 31 December anywhere west of Greenwich.
    expect(formatDate("2026-01-01", "en")).toContain("1");
    expect(formatDate("2026-01-01", "en")).toContain("2026");
    expect(formatDate("2026-01-01", "en")).not.toContain("2025");
  });
});

describe("readingTime", () => {
  it("never reports zero minutes", () => {
    expect(readingTime("one")).toBe(1);
    expect(readingTime("")).toBe(1);
  });

  it("scales with length", () => {
    const short = readingTime(Array(220).fill("word").join(" "));
    const long = readingTime(Array(2200).fill("word").join(" "));
    expect(short).toBe(1);
    expect(long).toBe(10);
    expect(long).toBeGreaterThan(short);
  });
});

describe("coverGradient", () => {
  it("is deterministic for a given seed", () => {
    expect(coverGradient("bold-reuse")).toBe(coverGradient("bold-reuse"));
  });

  it("differs between seeds", () => {
    expect(coverGradient("bold-reuse")).not.toBe(coverGradient("six-pillars"));
  });

  it("produces a usable CSS gradient", () => {
    expect(coverGradient("anything")).toMatch(
      /^linear-gradient\(135deg, hsl\(\d+ \d+% \d+%\), hsl\(\d+ \d+% \d+%\)\)$/,
    );
  });
});

// "2025 – present" leaked onto the German pages untranslated; the year is
// stored once in English and localised on display.
describe("formatYear", () => {
  it("leaves closed ranges alone", () => {
    expect(formatYear("2022 – 2023", "de")).toBe("2022 – 2023");
    expect(formatYear("2026", "de")).toBe("2026");
  });

  it("translates the open end for German", () => {
    expect(formatYear("2025 – present", "de")).toBe("2025 – heute");
  });

  it("keeps English as written", () => {
    expect(formatYear("2025 – present", "en")).toBe("2025 – present");
  });
});
