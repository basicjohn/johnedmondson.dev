import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Footer from "../Footer";

// Mock InspirationalQuote component, as it's not being tested here
jest.mock("Components/InspirationalQuote/InspirationalQuote", () => () => (
  <div>InspirationalQuote</div>
));

describe("Footer", () => {
  it("renders without crashing", () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
  });

  it("displays the correct year in the copyright", () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
    const date = new Date();
    const year = date.getFullYear();
    expect(
      screen.getByText(`© ${year} John Edmondson. All rights reserved.`)
    ).toBeInTheDocument();
  });

  it("contains the correct navigation links", () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
    expect(screen.getByRole("link", { name: /about/i })).toHaveAttribute(
      "href",
      "/#about"
    );
    expect(
      screen.getByRole("link", { name: /apps & portfolio/i })
    ).toHaveAttribute("href", "/#portfolio");
    expect(screen.getByRole("link", { name: /contact/i })).toHaveAttribute(
      "href",
      "/contact"
    );
  });

  it("contains the correct social links", () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
    expect(screen.getByRole("link", { name: /linkedin/i })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/johnedmondsondev/"
    );
    expect(screen.getByRole("link", { name: /github/i })).toHaveAttribute(
      "href",
      "https://github.com/basicjohn"
    );
    expect(screen.getByRole("link", { name: /twitter/i })).toHaveAttribute(
      "href",
      "https://twitter.com/basicjohn"
    );
    expect(screen.getByRole("link", { name: /pinterest/i })).toHaveAttribute(
      "href",
      "https://www.pinterest.com/basicjohn/"
    );
  });
});
