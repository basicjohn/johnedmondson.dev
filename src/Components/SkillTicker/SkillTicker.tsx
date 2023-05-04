import React, { useEffect, useRef, useState } from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/system";

// data
import skillsData from "../../data/skills.json";

interface Skill {
  id: number;
  label: string;
}

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

shuffleArray(skillsData.skills);
const skills: Skill[] = skillsData.skills.map(
  (skill: string, index: number) => ({
    id: index + 1,
    label: skill,
  })
);

const TickerContainer = styled("div")`
  background-color: #f4b659;
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
  animation: move 250s linear infinite;
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
