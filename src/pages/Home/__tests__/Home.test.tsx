import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../Home";

describe("Home", () => {
  it("renders without crashing", () => {
    render(<Home />);
  });

  it("displays the correct number of links", () => {
    render(<Home />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(8); // 7 project links + 1 CallToAction link
  });
});
