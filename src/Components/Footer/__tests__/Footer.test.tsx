import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Footer from "./../Footer";

const renderFooter = () => {
  return render(
    <BrowserRouter>
      <Footer />
    </BrowserRouter>
  );
};

describe("Footer component", () => {
  test("renders Links title", () => {
    renderFooter();
    const linksTitle = screen.getByText("Links");
    expect(linksTitle).toBeInTheDocument();
  });

  test("renders Social title", () => {
    renderFooter();
    const socialTitle = screen.getByText("Social");
    expect(socialTitle).toBeInTheDocument();
  });

  test("renders Newsletter title", () => {
    renderFooter();
    const newsletterTitle = screen.getByText("Newsletter");
    expect(newsletterTitle).toBeInTheDocument();
  });

  test("renders copyright text", () => {
    renderFooter();
    const copyrightText = screen.getByText(
      /© \d{4} John Edmondson. All rights reserved./
    );
    expect(copyrightText).toBeInTheDocument();
  });

  test("renders social links with correct hrefs", () => {
    renderFooter();
    const linkedinLink = screen.getByRole("link", { name: /John Edmondson/i });
    expect(linkedinLink).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/johnedmondsondev/"
    );

    const githubLink = screen.getByRole("link", { name: /GitHub basicjohn/i });
    expect(githubLink).toHaveAttribute("href", "https://github.com/basicjohn");

    const twitterLink = screen.getByRole("link", {
      name: /Twitter @basicjohn/i,
    });
    expect(twitterLink).toHaveAttribute(
      "href",
      "https://twitter.com/basicjohn"
    );

    const pinterestLink = screen.getByRole("link", {
      name: /Pinterest basicjohn/i,
    });
    expect(pinterestLink).toHaveAttribute(
      "href",
      "https://www.pinterest.com/basicjohn/"
    );
  });
  test("renders navigation links with correct hrefs", () => {
    renderFooter();
    const aboutLink = screen.getByRole("link", { name: /About/i });
    expect(aboutLink).toHaveAttribute("href", "/beta#about");

    const portfolioLink = screen.getByRole("link", {
      name: /Apps & Portfolio/i,
    });
    expect(portfolioLink).toHaveAttribute("href", "/beta#portfolio");

    const contactLink = screen.getByRole("link", { name: /Contact/i });
    expect(contactLink).toHaveAttribute("href", "/contact");
  });
});
