import Link from "next/link";
import type { Locale } from "@/lib/types";
import styles from "./Now.module.scss";

type Item = { label: string; text: string; href: string };

type Props = {
  locale: Locale;
  heading: string;
  items: Item[];
  updatedLabel: string;
  /** ISO date; rendered as month and year */
  updated?: string;
};

/**
 * Three lines under the hero that connect what the year ranges only imply:
 * on a contract now, building something on the side, looking for a
 * full-time role. The date is the cheapest possible sign the site is alive.
 */
export default function Now({
  locale,
  heading,
  items,
  updatedLabel,
  updated,
}: Props) {
  const updatedText = updated
    ? new Intl.DateTimeFormat(locale === "de" ? "de-DE" : "en-US", {
        month: "long",
        year: "numeric",
      }).format(new Date(`${updated}T00:00:00`))
    : null;

  return (
    <section className={styles.now} aria-labelledby="now-heading">
      <div className={`container ${styles.inner}`}>
        <h2 id="now-heading" className={styles.heading}>
          {heading}
        </h2>
        <dl className={styles.list}>
          {items.map((item) => (
            <div key={item.label} className={styles.item}>
              <dt className={styles.label}>{item.label}</dt>
              <dd className={styles.text}>
                <Link href={item.href} className={styles.link}>
                  {item.text}
                </Link>
              </dd>
            </div>
          ))}
        </dl>
        {updatedText && (
          <p className={styles.updated}>
            {updatedLabel} <time dateTime={updated}>{updatedText}</time>
          </p>
        )}
      </div>
    </section>
  );
}
