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

  it("has links to the correct pages", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const aboutLink = screen.getByRole("link", { name: /about/i });
    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink).toHaveAttribute("href", "/#about");

    const portfolioLink = screen.getByRole("link", { name: /apps & portfolio/i });
    expect(portfolioLink).toBeInTheDocument();
    expect(portfolioLink).toHaveAttribute("href", "/#portfolio");

    const contactLink = screen.getByRole("link", { name: /contact/i });
    expect(contactLink).toBeInTheDocument();
    expect(contactLink).toHaveAttribute("href", "/contact");

    const scheduleLink = screen.getByRole("link", { name: /schedule appointment/i });
    expect(scheduleLink).toBeInTheDocument();
    expect(scheduleLink).toHaveAttribute(
      "href",
      "https://calendly.com/johnedmondsondev/lets-chat"
    );

    const repositoryLink = screen.getByRole("link", { name: /view repository/i });
    expect(repositoryLink).toBeInTheDocument();
    expect(repositoryLink).toHaveAttribute(
      "href",
      "https://github.com/basicjohn/johnedmondson.dev"
    );
  });

  it("has links to social media profiles", () => {
    render(
      <MemoryRouter>
        <Footer />
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
    expect(gitHubLink).toHaveAttribute("href", "https://github.com/basicjohn");

    const twitterLink = screen.getByTitle("John's Twitter");
    expect(twitterLink).toBeInTheDocument();
    expect(twitterLink).toHaveAttribute("href", "https://twitter.com/basicjohn");

    const pinterestLink = screen.getByTitle("John's Pinterest");
    expect(pinterestLink).toBeInTheDocument();
    expect(pinterestLink).toHaveAttribute("href", "https://www.pinterest.com/basicjohn/");
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

  it("displays the inspirational quote", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const quoteElement = screen.getByText(/"Believe you can and you're halfway there."/i);
    expect(quoteElement).toBeInTheDocument();
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

    const year = new Date().getFullYear();
    const copyrightElement = screen.getByText(
      `© ${year} John Edmondson. All rights reserved.`
    );
    expect(profilePhotoElement).toBeInTheDocument();
  });
});