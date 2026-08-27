import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import RootPage, { metadata } from "./page";
import { defaultLocale } from "@/lib/types";

// Static export drops middleware.ts without warning, and Next's redirect()
// leaves only a client-side hop. That combination renders a blank page to
// anything that does not run JavaScript, which is the failure these guard.
describe("root redirect page", () => {
  it("carries a meta refresh to the default locale", () => {
    render(<RootPage />);
    // React 19 hoists <meta> out of the component tree into <head>, which is
    // exactly what makes it work here — so that is where it has to be found.
    const meta = document.head.querySelector('meta[http-equiv="refresh"]');

    expect(meta).not.toBeNull();
    expect(meta?.getAttribute("content")).toBe(`0; url=/${defaultLocale}`);
  });

  it("offers a real link, so the page works even without the refresh", () => {
    render(<RootPage />);

    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      `/${defaultLocale}`,
    );
  });

  it("renders visible text rather than an empty document", () => {
    const { container } = render(<RootPage />);
    expect(container.textContent?.trim()).not.toBe("");
  });

  it("is excluded from indexing but still passes link equity", () => {
    // A redirect stub competing with /en in search results would be worse
    // than the redirect not existing.
    expect(metadata.robots).toMatchObject({ index: false, follow: true });
  });
});
