import React from "react";
import { render, screen } from "@testing-library/react";
import Container from "../Container";

describe("Container component", () => {
  test("renders children correctly", () => {
    const testContent = "Test Content";
    render(<Container>{testContent}</Container>);
    const contentElement = screen.getByText(testContent);
    expect(contentElement).toBeInTheDocument();
  });
});
