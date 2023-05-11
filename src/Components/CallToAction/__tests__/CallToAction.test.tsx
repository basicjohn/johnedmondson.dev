import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
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

  it("navigates to the correct page when 'Let's Chat!' button is clicked", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <CallToAction />
      </MemoryRouter>
    );

    userEvent.click(screen.getByText(/let's chat!/i));
    expect(window.location.pathname).toBe("/contact");
  });
});
