import React from "react";
import { render, screen } from "@testing-library/react";
import Contact from "../Contact";

describe("Contact", () => {
  it("renders without crashing", () => {
    render(<Contact />);
  });

  it("displays the correct number of social media links", () => {
    render(<Contact />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(5); // 4 social media links + 1 Calendly link
  });
});
