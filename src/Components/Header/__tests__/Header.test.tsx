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

});