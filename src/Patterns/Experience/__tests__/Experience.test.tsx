import { render, screen, within } from "@testing-library/react";
import Experience from "../Experience";
import experienceData from "../../../data/experience.json";

describe("Experience", () => {
  it("renders without crashing", () => {
    render(<Experience />);
  });

  it("exposes the section with an accessible name", () => {
    render(<Experience />);

    expect(screen.getByRole("region", { name: "Work" })).toBeInTheDocument();
  });

  it("renders every company in the data", () => {
    render(<Experience />);

    [...experienceData.roles, ...experienceData.earlier].forEach((role) => {
      expect(
        screen.getByRole("heading", { name: role.company }),
      ).toBeInTheDocument();
    });
  });

  it("renders each full role's title, dates, and highlights", () => {
    render(<Experience />);

    experienceData.roles.forEach((role) => {
      expect(screen.getByText(role.title)).toBeInTheDocument();
      expect(screen.getByText(role.dates)).toBeInTheDocument();

      role.highlights.forEach((highlight) => {
        expect(screen.getByText(highlight)).toBeInTheDocument();
      });
    });
  });

  it("lists roles in the order the data declares", () => {
    render(<Experience />);

    const section = screen.getByRole("region", { name: "Work" });
    const companies = within(section)
      .getAllByRole("heading", { level: 3 })
      .map((heading) => heading.textContent);

    expect(companies).toEqual([
      ...experienceData.roles.map((role) => role.company),
      ...experienceData.earlier.map((role) => role.company),
    ]);
  });
});
