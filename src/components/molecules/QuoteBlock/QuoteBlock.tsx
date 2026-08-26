"use client";

import { useEffect, useState } from "react";
import type { Quote } from "@/lib/types";
import styles from "./QuoteBlock.module.scss";

type Props = {
  quotes: Quote[];
};

export default function QuoteBlock({ quotes }: Props) {
  // Render the first quote on the server, randomize after mount
  // (keeps hydration deterministic while preserving the v1 behavior).
  const [quote, setQuote] = useState<Quote | undefined>(quotes[0]);

  useEffect(() => {
    if (quotes.length > 1) {
      setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }
  }, [quotes]);

  if (!quote) return null;

  return (
    <figure className={styles.quote}>
      <blockquote>“{quote.text}”</blockquote>
      <figcaption>— {quote.author}</figcaption>
    </figure>
  );
}
