import { useState, useEffect } from "react";
import greetingsData from "../../data/greetings.json";

const Greeting = () => {
  const [randomGreeting, setRandomGreeting] = useState("");

  useEffect(() => {
    const getRandomGreeting = () => {
      const randomIndex = Math.floor(
        Math.random() * greetingsData.greetings.length
      );
      return greetingsData.greetings[randomIndex];
    };

    setRandomGreeting(getRandomGreeting());
  }, []);

  return <h2>{randomGreeting}</h2>;
};

export default Greeting;
