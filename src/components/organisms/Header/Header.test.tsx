import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "./Header";
import en from "@/dictionaries/en.json";
import de from "@/dictionaries/de.json";

const pathname = vi.hoisted(() => ({ current: "/en" }));
const flags = vi.hoisted(() => ({ writingPublic: false }));

vi.mock("next/navigation", () => ({
  usePathname: () => pathname.current,
}));

vi.mock("@/lib/config", () => ({
  get WRITING_SECTION_PUBLIC() {
    return flags.writingPublic;
  },
}));

beforeEach(() => {
  pathname.current = "/en";
  flags.writingPublic = false;
});

const renderHeader = (locale: "en" | "de" = "en") => {
  const dict = locale === "de" ? de : en;
  return render(
    <Header
      locale={locale}
      nav={dict.nav}
      languageLabel={dict.common.languageLabel}
    />,
  );
};

// The CRA site had no navigation at all — review finding 06. These tests
// hold the line on the section links existing and pointing somewhere real.
describe("Header navigation", () => {
  it("links to every always-public section, locale-prefixed", () => {
    renderHeader();
    const nav = screen.getByRole("navigation", { name: en.nav.label });

    const expected = [
      [en.nav.home, "/en"],
      [en.nav.portfolio, "/en/portfolio"],
      [en.nav.contact, "/en/contact"],
    ] as const;

    for (const [label, href] of expected) {
      expect(within(nav).getByRole("link", { name: label })).toHaveAttribute(
        "href",
        href,
      );
    }
  });

  // The section builds either way; the flag decides whether anything points
  // at it. Both states are asserted so re-linking is a one-line change.
  it("hides the writing link while the section is not public", () => {
    flags.writingPublic = false;
    renderHeader();
    const nav = screen.getByRole("navigation", { name: en.nav.label });

    expect(
      within(nav).queryByRole("link", { name: en.nav.writing }),
    ).not.toBeInTheDocument();
  });

  it("shows the writing link once the section is public", () => {
    flags.writingPublic = true;
    renderHeader();
    const nav = screen.getByRole("navigation", { name: en.nav.label });

    expect(
      within(nav).getByRole("link", { name: en.nav.writing }),
    ).toHaveAttribute("href", "/en/writing");
  });

  it("prefixes links with the active locale", () => {
    renderHeader("de");
    const nav = screen.getByRole("navigation", { name: de.nav.label });

    for (const link of within(nav).getAllByRole("link")) {
      expect(link.getAttribute("href")).toMatch(/^\/de/);
    }
  });

  it("marks the current page with aria-current", () => {
    pathname.current = "/en/portfolio";
    renderHeader();

    const nav = screen.getByRole("navigation", { name: en.nav.label });
    expect(
      within(nav).getByRole("link", { name: en.nav.portfolio }),
    ).toHaveAttribute("aria-current", "page");
    expect(
      within(nav).getByRole("link", { name: en.nav.contact }),
    ).not.toHaveAttribute("aria-current");
  });

  it("matches home exactly, so it is not active on every page", () => {
    pathname.current = "/en/portfolio";
    renderHeader();

    const nav = screen.getByRole("navigation", { name: en.nav.label });
    expect(
      within(nav).getByRole("link", { name: en.nav.home }),
    ).not.toHaveAttribute("aria-current");
    expect(
      within(nav).getByRole("link", { name: en.nav.portfolio }),
    ).toHaveAttribute("aria-current", "page");
  });

  it("keeps a post page under its section", () => {
    pathname.current = "/en/portfolio/bold-reuse";
    renderHeader();

    const nav = screen.getByRole("navigation", { name: en.nav.label });
    expect(
      within(nav).getByRole("link", { name: en.nav.portfolio }),
    ).toHaveAttribute("aria-current", "page");
  });
});

describe("Header mobile menu", () => {
  it("starts collapsed", () => {
    renderHeader();
    expect(screen.getByRole("button")).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("toggles on click and announces its state", async () => {
    const user = userEvent.setup();
    renderHeader();
    const button = screen.getByRole("button");

    await user.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(en.nav.menuClose)).toBeInTheDocument();

    await user.click(button);
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByText(en.nav.menuOpen)).toBeInTheDocument();
  });

  it("controls the element it says it controls", () => {
    renderHeader();
    const controls = screen.getByRole("button").getAttribute("aria-controls");

    expect(controls).toBe("site-nav");
    expect(document.getElementById(controls!)).toBeInTheDocument();
  });

  it("closes when a nav link is followed", async () => {
    const user = userEvent.setup();
    renderHeader();
    const button = screen.getByRole("button");

    await user.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");

    const nav = screen.getByRole("navigation", { name: en.nav.label });
    await user.click(within(nav).getByRole("link", { name: en.nav.contact }));
    expect(button).toHaveAttribute("aria-expanded", "false");
  });
});
