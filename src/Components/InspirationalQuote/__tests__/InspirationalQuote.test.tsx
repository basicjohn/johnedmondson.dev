import React from "react";
import { render, screen } from "@testing-library/react";
import InspirationalQuote from "./../InspirationalQuote";
import inspirationData from "../../../data/inspiration.json";

jest.mock("../../../data/inspiration.json", () => ({
  quotes: [
    {
      quote: "Test Quote",
      author: "Test Author",
    },
  ],
}));

describe("InspirationalQuote", () => {
  it("renders the quote and author correctly", () => {
    render(<InspirationalQuote />);
    expect(screen.getByText("Test Quote")).toBeInTheDocument();
    expect(screen.getByText("Test Author")).toBeInTheDocument();
  });

  it("selects a random quote from the inspiration data", () => {
    const spy = jest.spyOn(Math, "random");
    spy.mockReturnValue(0.5);

    render(<InspirationalQuote />);
    const randomIndex = Math.floor(
      Math.random() * inspirationData.quotes.length
    );

    expect(spy).toHaveBeenCalled();
    expect(
      screen.getByText(inspirationData.quotes[randomIndex].quote)
    ).toBeInTheDocument();
    expect(
      screen.getByText(inspirationData.quotes[randomIndex].author)
    ).toBeInTheDocument();

    spy.mockRestore();
  });
});
