import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import RootPage, { metadata } from "./page";
import { locales } from "@/lib/types";

// This page is served for "/" and, when a catch-all rewrite is misconfigured,
// for every other path too. It must therefore be safe to render anywhere —
// which above all means it must not redirect on its own.
describe("root landing page", () => {
  it("does NOT auto-redirect", () => {
    // A meta refresh here becomes an infinite reload the moment this file is
    // served for the path it refreshes to. That outage is the reason these
    // assertions exist.
    render(<RootPage />);

    expect(
      document.head.querySelector('meta[http-equiv="refresh"]'),
    ).toBeNull();
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
    const { container } = render(<RootPage />);

    expect(screen.getByRole("heading")).toHaveTextContent("John Edmondson");
    expect(container.textContent?.trim().length).toBeGreaterThan(20);
  });

  it("is excluded from indexing but still passes link equity", () => {
    expect(metadata.robots).toMatchObject({ index: false, follow: true });
  });
});
