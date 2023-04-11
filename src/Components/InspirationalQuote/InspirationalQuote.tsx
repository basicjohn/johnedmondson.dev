import React, { useState, useEffect } from "react";
import inspirationData from "../../data/inspiration.json";
import styles from "./InspirationalQuote.module.scss";

type Quote = {
  quote: string;
  author: string;
};

const rootClass = "inspirational-quote";

const InspirationalQuote = () => {
  const [randomInspirationalQuote, setRandomInspirationalQuote] = useState(
    {} as Quote
  );

  useEffect(() => {
    const getRandomInspirationalQuote = () => {
      const randomIndex = Math.floor(
        Math.random() * inspirationData.quotes.length
      );
      return inspirationData.quotes[randomIndex];
    };

    setRandomInspirationalQuote(getRandomInspirationalQuote());
  }, []);

  return (
    <blockquote className={styles[rootClass]}>
      {randomInspirationalQuote.quote}
      <br />
      <cite>{randomInspirationalQuote.author}</cite>
    </blockquote>
  );
};

export default InspirationalQuote;
