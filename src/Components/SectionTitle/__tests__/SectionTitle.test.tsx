import React from "react";
import { render, screen } from "@testing-library/react";
import SectionTitle from "./../SectionTitle";

describe("SectionTitle component", () => {
  test("renders section title", () => {
    const testTitle = "Test Title";
    render(<SectionTitle title={testTitle} />);
    const titleElement = screen.getByText(testTitle);
    expect(titleElement).toBeInTheDocument();
  });

  test("section title is initially hidden", () => {
    const testTitle = "Test Title";
    render(<SectionTitle title={testTitle} />);
    const titleElement = screen.getByText(testTitle);
    expect(titleElement).toHaveClass("hidden");
  });
});
