import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Header from "./../Header";

describe("Header Component", () => {
  it("renders without crashing", () => {
    const currentTitle = "John's Portfolio";
    render(<Header currentTitle={currentTitle} />);
    expect(
      screen.getByAltText("John Edmondson Ilustrated Icon")
    ).toBeInTheDocument();
  });

  it("displays social media icons", () => {
    const currentTitle = "John's Portfolio";
    render(<Header currentTitle={currentTitle} />);
    expect(screen.getByAltText("LinkedIn")).toBeInTheDocument();
    expect(screen.getByAltText("GitHub")).toBeInTheDocument();
    expect(screen.getByAltText("Twitter")).toBeInTheDocument();
    expect(screen.getByAltText("Pinterest")).toBeInTheDocument();
  });

  it("contains a 'Let's Chat!' button", () => {
    const currentTitle = "John's Portfolio";
    render(<Header currentTitle={currentTitle} />);
    expect(screen.getByText("Let's Chat!")).toBeInTheDocument();
  });
});
