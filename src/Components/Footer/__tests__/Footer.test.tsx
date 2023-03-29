import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../Footer";

describe("Footer component", () => {
  test("renders copyright", () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    const copyrightElement = screen.getByText(
      new RegExp(`© ${currentYear} John Edmondson. All rights reserved.`, "i")
    );
    expect(copyrightElement).toBeInTheDocument();
  });
});
