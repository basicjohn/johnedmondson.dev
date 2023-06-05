import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "../Header";

describe("Header", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
  });

  it("displays the profile photo", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const profilePhotoElement = screen.getByAltText(
      "Illustrated icon of John Edmondson"
    );
    expect(profilePhotoElement).toBeInTheDocument();
  });

  it("has links to social media profiles", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const linkedInLink = screen.getByTitle("John's LinkedIn");
    expect(linkedInLink).toBeInTheDocument();
    expect(linkedInLink).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/johnedmondsondev/"
    );

    const gitHubLink = screen.getByTitle("John's GitHub");
    expect(gitHubLink).toBeInTheDocument();
    expect(gitHubLink).toHaveAttribute(
      "href",
      "https://github.com/basicjohn"
    );

    const twitterLink = screen.getByTitle("John's Twitter");
    expect(twitterLink).toBeInTheDocument();
    expect(twitterLink).toHaveAttribute(
      "href",
      "https://twitter.com/basicjohn"
    );

    const pinterestLink = screen.getByTitle("John's Pinterest");
    expect(pinterestLink).toBeInTheDocument();
    expect(pinterestLink).toHaveAttribute(
      "href",
      "https://www.pinterest.com/basicjohn/"
    );
  });

  it("displays the contact button with the correct text and link", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const contactButton = screen.getByRole("button", { name: /let's chat!/i });
    expect(contactButton).toBeInTheDocument();
    expect(contactButton).toHaveAttribute("href", "/contact");

    // Click the button to navigate to the contact page
    contactButton.click();

    const backButton = screen.getByRole("button", { name: /go back to homepage/i });
    expect(backButton).toBeInTheDocument();
    expect(backButton).toHaveAttribute("href", "/");
  });
});