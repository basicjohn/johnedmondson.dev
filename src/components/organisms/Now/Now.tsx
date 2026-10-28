import Link from "next/link";
import type { Locale } from "@/lib/types";
import Asterisk from "@/components/atoms/Asterisk/Asterisk";
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

type GroupProps = Omit<Props, "locale" | "updated"> & {
  updated?: string;
  updatedText: string | null;
  /** The second pass, there only to close the ticker's loop */
  copy?: boolean;
};

function Group({
  heading,
  items,
  updatedLabel,
  updated,
  updatedText,
  copy = false,
}: GroupProps) {
  return (
    <div
      className={styles.group}
      aria-hidden={copy || undefined}
      inert={copy || undefined}
    >
      <h2 id={copy ? undefined : "now-heading"} className={styles.heading}>
        {heading}
      </h2>
      <dl className={styles.list}>
        {items.map((item) => (
          <div key={item.label} className={styles.item}>
            <dt>{item.label}</dt>
            <dd>
              <Link href={item.href}>{item.text}</Link>
              <Asterisk className={styles.mark} />
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
  );
}

/**
 * "Currently" as a marigold ticker set at a tilt across the seam between
 * the gridded hero and the dark ground: on a contract now, building
 * something on the side, open to new opportunities. The date is the
 * cheapest possible sign the site is alive.
 *
 * It scrolls only where motion is allowed, pausing on hover and focus;
 * otherwise (and without JavaScript) it is one still band, its copy hidden.
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
  const group = { heading, items, updatedLabel, updated, updatedText };

  return (
    <section className={styles.now} aria-labelledby="now-heading">
      <div className={styles.track}>
        <Group {...group} />
        <Group {...group} copy />
      </div>
    </section>
  );
}
