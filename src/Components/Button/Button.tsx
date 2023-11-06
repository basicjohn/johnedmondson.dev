// dependencies
import { useState, useEffect } from "react";

// data
import greetingsData from "../../data/greetings.json";

// styles
import styles from "./Button.module.scss";

const rootClass = "button";

const Button = () => {
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

  return <h2 className={styles[rootClass]}>{randomGreeting}</h2>;
};

export default Button;
