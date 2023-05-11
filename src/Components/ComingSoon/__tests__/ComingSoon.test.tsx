import React from "react";
import { render, screen } from "@testing-library/react";
import ComingSoon from "../ComingSoon";

describe("ComingSoon", () => {
  it("renders without crashing", () => {
    render(<ComingSoon />);
  });

  it("displays the correct heading", () => {
    render(<ComingSoon />);
    expect(
      screen.getByRole("heading", { name: /oh hey, i'm looking for work!/i })
    ).toBeInTheDocument();
  });

  it("displays the correct paragraphs", () => {
    render(<ComingSoon />);
    const paragraphs = screen.getAllByRole("paragraph");
    expect(paragraphs[0]).toHaveTextContent(
      "I'm building a website for presenting my wares...therefore a portfolio site is coming soon."
    );
    expect(paragraphs[1]).toHaveTextContent(
      "For those of you interested in seeing a sneak peek, you can view my progress HERE."
    );
  });

  it("has a link to the GitHub page", () => {
    render(<ComingSoon />);
    const linkElement = screen.getByRole("link", { name: /here/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute(
      "href",
      "https://github.com/basicjohn/johnedmondson.dev"
    );
  });
});
