import React from "react";
import { render, screen } from "@testing-library/react";
import SkillTicker from "../SkillTicker";
import skillsData from "../../../data/skills.json";

describe("SkillTicker", () => {
  it("renders without crashing", () => {
    render(<SkillTicker />);
  });

  it("displays the correct number of skills", () => {
    render(<SkillTicker />);
    const skills = screen.getAllByRole("button");
    expect(skills).toHaveLength(skillsData.skills.length * 2); // Each skill appears twice in the ticker
  });
});
