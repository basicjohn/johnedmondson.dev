import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../Header";

describe("Header component", () => {
  test("renders portfolio title", () => {
    render(<Header currentTitle="Portfolio" />);
    const titleElement = screen.getByText(/Portfolio/i);
    expect(titleElement).toBeInTheDocument();
  });
});
