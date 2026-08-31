import { describe, it, expect, beforeAll } from "vitest";
import { render, screen } from "@testing-library/react";
import RootPage, { metadata } from "./page";
import { locales } from "@/lib/types";

// Render this page the way the misconfigured catch-all rewrite serves it:
// for a path that is NOT "/". jsdom executes the inline redirect script on
// render, so this both exercises the guard's do-nothing branch and keeps the
// output free of jsdom "navigation not implemented" noise.
beforeAll(() => {
  window.history.replaceState(null, "", "/en/portfolio");
});

// This page is served for "/" and, when a catch-all rewrite is misconfigured,
// for every other path too. It must therefore be safe to render anywhere —
// which above all means it must not redirect unconditionally.
describe("root landing page", () => {
  it("carries no meta refresh, which cannot check the path before firing", () => {
    // A meta refresh here becomes an infinite reload the moment this file is
    // served for the path it refreshes to. That outage is the reason these
    // assertions exist.
    render(<RootPage />);

    expect(
      document.head.querySelector('meta[http-equiv="refresh"]'),
    ).toBeNull();
  });

  it("guards the language redirect behind an exact check for the bare root", () => {
    const { container } = render(<RootPage />);

    const script = container.querySelector("script");
    expect(script, "the language redirect script").not.toBeNull();
    // The guard is the loop-safety property; everything after it is
    // preference detection.
    expect(script!.textContent).toContain('location.pathname !== "/"');
  });

  it("prefers a stored language choice over browser detection", () => {
    const { container } = render(<RootPage />);
    const script = container.querySelector("script")!.textContent!;

    expect(script.indexOf("document.cookie")).toBeGreaterThan(-1);
    expect(script.indexOf("document.cookie")).toBeLessThan(
      script.indexOf("navigator.languages"),
    );
  });

  it("links to every locale", () => {
    render(<RootPage />);

    for (const locale of locales) {
      const link = screen
        .getAllByRole("link")
        .find((a) => a.getAttribute("href") === `/${locale}`);
      expect(link, `no link to /${locale}`).toBeDefined();
    }
  });

  it("renders something legible rather than an empty document", () => {
    render(<RootPage />);

    expect(screen.getByRole("heading")).toHaveTextContent("John Edmondson");
    expect(document.body.textContent!.trim().length).toBeGreaterThan(20);
  });

  it("is excluded from indexing but still passes link equity", () => {
    expect(metadata.robots).toMatchObject({ index: false, follow: true });
  });
});
