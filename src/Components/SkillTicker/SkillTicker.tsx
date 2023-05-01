import React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/system";

interface Skill {
  id: number;
  label: string;
}

const skills: Skill[] = [
  { id: 1, label: "React" },
  { id: 2, label: "TypeScript" },
  { id: 3, label: "Material-UI" },
  { id: 4, label: "JavaScript" },
  { id: 5, label: "TDD" },
  { id: 6, label: "D3" },
  { id: 7, label: "Three.js" },
  { id: 8, label: "GraphQL" },
  { id: 9, label: "GIT" },
  { id: 10, label: "AWS" },
  { id: 11, label: "Storybook.js" },
  { id: 12, label: "HTML / CSS" },
  { id: 13, label: "SEO" },
  { id: 14, label: "NX (Monorepo)" },
  { id: 15, label: "React Native" },
  { id: 16, label: "Next.js" },
];

const TickerContainer = styled("div")`
  background-color: #f4b659;
  margin-top: 1rem;
  margin-bottom: 1rem;
  overflow: hidden;
  white-space: nowrap;
  position: relative;
`;

const TickerContent = styled("div")`
  padding: 1rem;
  position: relative;
`;

const AnimatedStack = styled(Stack)`
  display: inline-block;
  animation: move 20s linear infinite;
  position: absolute;
  top: 0;
  white-space: nowrap;

  @keyframes move {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
`;

const SkillTicker: React.FC = () => {
  return (
    <TickerContainer>
      <TickerContent>
        <AnimatedStack direction="row" spacing={1} justifyContent="center">
          {skills.map((skill) => (
            <Chip key={skill.id} label={skill.label} />
          ))}
        </AnimatedStack>
        <AnimatedStack
          direction="row"
          spacing={1}
          justifyContent="center"
          style={{ left: "106%" }}
        >
          {skills.map((skill) => (
            <Chip key={skill.id} label={skill.label} />
          ))}
        </AnimatedStack>
      </TickerContent>
    </TickerContainer>
  );
};

export default SkillTicker;
