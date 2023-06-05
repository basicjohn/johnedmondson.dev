import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CallToAction from "../CallToAction";

describe("CallToAction", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <CallToAction />
      </MemoryRouter>
    );
  });

  it("displays the correct heading", () => {
    render(
      <MemoryRouter>
        <CallToAction />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", { name: /start the conversation/i })
    ).toBeInTheDocument();
  });

});