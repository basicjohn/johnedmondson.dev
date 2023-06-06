import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Footer from "../Footer";

describe("Footer", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
  });

  it("displays the newsletter subscription form", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const newsletterIframe = screen.getByTitle("Newsletter");
    expect(newsletterIframe).toBeInTheDocument();
    expect(newsletterIframe).toHaveAttribute(
      "src",
      "https://basicjohn.substack.com/embed"
    );
  });

  it("displays the correct copyright information", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const profilePhotoElement = screen.getByAltText(
      "Illustrated icon of John Edmondson"
    );
    expect(profilePhotoElement).toBeInTheDocument();

  });
});