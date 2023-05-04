import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "./../Header";

const renderHeader = () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
};

describe("Header component", () => {
  test("renders Header component", () => {
    renderHeader();
    const headerElement = screen.getByRole("banner");
    expect(headerElement).toBeInTheDocument();
  });

  test("renders social links with correct hrefs", () => {
    renderHeader();
    const linkedinLink = screen.getByRole("link", { name: /LinkedIn/i });
    expect(linkedinLink).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/johnedmondsondev/"
    );

    const githubLink = screen.getByRole("link", { name: /GitHub/i });
    expect(githubLink).toHaveAttribute("href", "https://github.com/basicjohn");

    const twitterLink = screen.getByRole("link", { name: /Twitter/i });
    expect(twitterLink).toHaveAttribute(
      "href",
      "https://twitter.com/basicjohn"
    );

    const pinterestLink = screen.getByRole("link", { name: /Pinterest/i });
    expect(pinterestLink).toHaveAttribute(
      "href",
      "https://www.pinterest.com/basicjohn/"
    );
  });

  test("renders Let's Chat! button with correct link", () => {
    renderHeader();
    const letsChatButton = screen.getByRole("link", { name: /Let's Chat!/i });
    expect(letsChatButton).toHaveAttribute("href", "/contact");
  });
});
