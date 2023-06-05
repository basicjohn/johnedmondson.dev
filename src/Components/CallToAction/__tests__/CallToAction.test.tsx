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

  it("has a link to the contact page", () => {
    render(
      <MemoryRouter>
        <CallToAction />
      </MemoryRouter>
    );

    const linkElement = screen.getByRole("link", { name: /let's chat!/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/contact");
  });
});