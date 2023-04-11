import React from "react";
import { render, screen } from "@testing-library/react";
import Greeting from "./../Greeting";
import greetingsData from "../../../data/greetings.json";

describe("Greeting component", () => {
  test("renders a random greeting from greetings.json", () => {
    render(<Greeting />);

    const greetingElement = screen.getByRole("heading", { level: 2 });
    expect(greetingsData.greetings).toContain(greetingElement.textContent);
  });
});
