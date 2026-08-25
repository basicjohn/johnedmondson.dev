import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Footer from "../Footer";

const renderFooter = () =>
  render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>,
  );

describe("Footer", () => {
  it("renders without crashing", () => {
    renderFooter();
  });

  it("displays its navigation links", () => {
    renderFooter();

    [
      "Send a Message",
      "UpWork",
      "Schedule Appointment",
      "View Repository",
    ].forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it("displays the correct copyright information", () => {
    renderFooter();

    const profilePhotoElement = screen.getByAltText(
      "Illustrated icon of John Edmondson",
    );
    expect(profilePhotoElement).toBeInTheDocument();
    expect(
      screen.getByText(`© ${new Date().getFullYear()} John Edmondson`),
    ).toBeInTheDocument();
  });

  // The Substack embed was a fixed-height iframe whose legal line collided
  // with its own wordmark at wide breakpoints. It should stay gone until
  // there are posts to sign up for.
  it("no longer embeds the newsletter iframe", () => {
    renderFooter();

    expect(screen.queryByTitle("Newsletter")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("complementary", { name: "Newsletter Subscription" }),
    ).not.toBeInTheDocument();
  });

  it("displays the availability line and a mailto link", () => {
    renderFooter();

    expect(
      screen.getByRole("complementary", { name: "Availability" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Open to full-time product engineering roles."),
    ).toBeInTheDocument();

    const email = screen.getByRole("link", {
      name: "Email John at contact@johnedmondson.dev",
    });
    expect(email).toHaveAttribute("href", "mailto:contact@johnedmondson.dev");
  });
});
