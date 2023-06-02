import React from "react";
import { render, screen } from "@testing-library/react";
import ComingSoon from "../ComingSoon";

describe("ComingSoon", () => {
  it("renders without crashing", () => {
    render(<ComingSoon />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
  });

  it("renders the expected text", () => {
    render(<ComingSoon />);
    const text = screen.getByText(/a portfolio site is coming soon/i);
    expect(text).toBeInTheDocument();
  });

  it("renders a link to the GitHub repository", () => {
    render(<ComingSoon />);
    const link = screen.getByRole("link", { name: /view my progress/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://github.com/basicjohn/johnedmondson.dev");
  });
});