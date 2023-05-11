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
    const chips = screen.getAllByTestId("chip");
    expect(chips).toHaveLength(skillsData.skills.length * 2);
  });
});
