import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import Footer from "./Footer";
import en from "@/dictionaries/en.json";
import de from "@/dictionaries/de.json";

const socials = [
  { label: "GitHub", url: "https://github.com/basicjohn" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/johnedmondsondev/" },
];

const renderFooter = (labels = en.footer) =>
  render(
    <Footer labels={labels} socials={socials} email="contact@example.dev" />,
  );

describe("Footer", () => {
  it("renders without crashing", () => {
    renderFooter();
  });

  it("leads with the availability line", () => {
    renderFooter();

    expect(
      screen.getByRole("heading", { name: en.footer.availabilityHeading }),
    ).toBeInTheDocument();
    expect(screen.getByText(en.footer.availabilityText)).toBeInTheDocument();
  });

  it("renders the contact address as a mailto link", () => {
    renderFooter();

    const email = screen.getByRole("link", { name: "contact@example.dev" });
    expect(email).toHaveAttribute("href", "mailto:contact@example.dev");
  });

  it("takes the address from props rather than hardcoding one", () => {
    render(
      <Footer labels={en.footer} socials={socials} email="other@example.dev" />,
    );

    expect(
      screen.getByRole("link", { name: "other@example.dev" }),
    ).toHaveAttribute("href", "mailto:other@example.dev");
  });

  it("lists each social link, opening off-site links safely", () => {
    renderFooter();

    for (const social of socials) {
      const link = screen.getByRole("link", { name: social.label });
      expect(link).toHaveAttribute("href", social.url);
      expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
    }
  });

  it("shows the current year in the copyright", () => {
    renderFooter();

    expect(
      screen.getByText(new RegExp(String(new Date().getFullYear()))),
    ).toBeInTheDocument();
  });

  it("renders German copy when handed the German dictionary", () => {
    renderFooter(de.footer);

    expect(screen.getByText(de.footer.availabilityText)).toBeInTheDocument();
    expect(
      screen.queryByText(en.footer.availabilityText),
    ).not.toBeInTheDocument();
  });
});

// v2 predates the design review and shipped all of these. They were removed
// on the way in; without these tests nothing would notice them returning.
describe("Footer — elements Phase 2 removed", () => {
  it("embeds no iframe, so no newsletter signup can reappear", () => {
    const { container } = renderFooter();
    expect(container.querySelector("iframe")).toBeNull();
  });

  it("has no newsletter heading or call to action", () => {
    renderFooter();

    expect(screen.queryByText(/newsletter/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/substack/i)).not.toBeInTheDocument();
  });

  it("renders no rotating quote", () => {
    const { container } = renderFooter();

    expect(container.querySelector("blockquote")).toBeNull();
    expect(screen.queryByText(/angelou|vonnegut|einstein/i)).toBeNull();
  });

  it("renders the same markup on every render, with nothing randomized", () => {
    const first = renderFooter().container.innerHTML;
    const second = renderFooter().container.innerHTML;

    expect(first).toBe(second);
  });

  it("has exactly two columns of content", () => {
    renderFooter();

    const headings = screen.getAllByRole("heading");
    expect(headings.map((h) => h.textContent)).toEqual([
      en.footer.availabilityHeading,
      en.footer.elsewhere,
    ]);
  });
});

// The résumé link is the one document a recruiter asks for. It must not
// appear until a scrubbed PDF exists — the current one carries a phone
// number and a home address — so it keys off site.json, not a label.
describe("Footer — résumé link", () => {
  it("renders no résumé link when no file is configured", () => {
    renderFooter();
    expect(
      screen.queryByRole("link", { name: en.footer.resume }),
    ).not.toBeInTheDocument();
  });

  it("links the résumé under the availability line once configured", () => {
    render(
      <Footer
        labels={en.footer}
        socials={socials}
        email="contact@example.dev"
        resume="/files/resume.pdf"
      />,
    );
    expect(
      screen.getByRole("link", { name: en.footer.resume }),
    ).toHaveAttribute("href", "/files/resume.pdf");
  });
});

describe("Footer — social links", () => {
  it("renders only the socials it is given", () => {
    render(
      <Footer
        labels={en.footer}
        socials={[{ label: "GitHub", url: "https://github.com/basicjohn" }]}
        email="contact@example.dev"
      />,
    );

    const list = screen.getByRole("list");
    expect(within(list).getAllByRole("link")).toHaveLength(1);
  });

  it("renders an empty social list without crashing", () => {
    render(
      <Footer labels={en.footer} socials={[]} email="contact@example.dev" />,
    );

    expect(
      within(screen.getByRole("list")).queryAllByRole("link"),
    ).toHaveLength(0);
  });
});
