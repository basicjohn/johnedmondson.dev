import React, { useState, useEffect } from "react";
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

  return <h1>{randomGreeting}</h1>;
};

export default Greeting;
