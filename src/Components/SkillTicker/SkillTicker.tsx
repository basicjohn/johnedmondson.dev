import React, { useEffect, useRef, useState } from "react";
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
  //   margin-top: 1rem;
  //   margin-bottom: 1rem;
  padding-top: 1rem;
  padding-bottom: 2rem;
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
  animation: move 500s linear infinite;
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

const chipStyle = {
  // backgroundColor: "rgba(#fff, 0.02)",
  backgroundColor: "rgba(227, 170, 82, 0.02)",
  color: "#ffffff",
  borderColor: "rgba(#fff, 0.01)",
  borderWidth: "1px",
  borderStyle: "solid",
  borderRadius: "16px",
  fontSize: "1rem",
  fontWeight: "bold",
  padding: "0.5rem",
  margin: "0.5rem",
  "&:hover": {
    backgroundColor: "rgba(227, 170, 82, 0.8)",
    color: "#ffffff",
    borderColor: "rgba(#fff, 0.1)",
    borderWidth: "1px",
    borderStyle: "solid",
    borderRadius: "16px",
    fontSize: "1rem",
    fontWeight: "bold",
  },
};

const SkillTicker: React.FC = () => {
  const skillsListRef = useRef<HTMLDivElement>(null);
  const [skillsListWidth, setSkillsListWidth] = useState<number | undefined>();

  useEffect(() => {
    if (skillsListRef.current) {
      setSkillsListWidth(skillsListRef.current.offsetWidth + 25);
    }
  }, []);

  return (
    <TickerContainer>
      <TickerContent>
        <AnimatedStack
          direction="row"
          spacing={1}
          justifyContent="center"
          ref={skillsListRef}
        >
          {skills.map((skill) => (
            <Chip key={skill.id} label={skill.label} sx={chipStyle} />
          ))}
        </AnimatedStack>
        <AnimatedStack
          direction="row"
          spacing={1}
          justifyContent="center"
          style={{ left: skillsListWidth }}
        >
          {skills.map((skill) => (
            <Chip key={skill.id} label={skill.label} sx={chipStyle} />
          ))}
        </AnimatedStack>
      </TickerContent>
    </TickerContainer>
  );
};

export default SkillTicker;
