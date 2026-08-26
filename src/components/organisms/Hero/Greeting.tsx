"use client";

import { useEffect, useState } from "react";
import styles from "./Hero.module.scss";

type Props = {
  greetings: string[];
};

export default function Greeting({ greetings }: Props) {
  // Deterministic first render, randomized after mount (v1 behavior).
  const [greeting, setGreeting] = useState(greetings[0] ?? "Hello!");

  useEffect(() => {
    if (greetings.length > 1) {
      setGreeting(greetings[Math.floor(Math.random() * greetings.length)]);
    }
  }, [greetings]);

  return <p className={styles.greeting}>{greeting}</p>;
}
