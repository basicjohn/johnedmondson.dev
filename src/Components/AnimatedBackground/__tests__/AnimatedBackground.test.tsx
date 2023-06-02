import React from "react";
import { render, screen } from "@testing-library/react";
import AnimatedBackground from "../AnimatedBackground";

describe("AnimatedBackground", () => {
  it("renders without crashing", () => {
    render(<AnimatedBackground />);
    const getByTestId = screen.getByTestId("animated-background");
    expect(getByTestId).toBeInTheDocument();
  });

  it("renders the expected number of shapes", () => {
    render(<AnimatedBackground />);
    const shapes = screen.getAllByRole("presentation");
    expect(shapes.length).toBe(40);
  });

  it("renders shapes with the expected colors", () => {
    render(<AnimatedBackground />);
    const shapes = screen.getAllByRole("presentation");
    const colors = [
      "#f4b659",
      "#3945AF",
      "#FFA7C4",
      "#57a957",
      "#E3A3E3",
      "#c583c5",
      "#F6D05B",
      "#484848",
    ];
    shapes.forEach((shape) => {
      const color = window.getComputedStyle(shape).backgroundColor;
      expect(colors).toContain(color);
    });
  });
});