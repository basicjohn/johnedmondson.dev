import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../Header";

describe("Header component", () => {
  test("renders portfolio title", () => {
    render(<Header />);
    const titleElement = screen.getByText(/Portfolio/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("renders menu icon", () => {
    render(<Header />);
    const menuIconElement = screen.getByLabelText(/menu/i);
    expect(menuIconElement).toBeInTheDocument();
  });
});
