"use client";

import { useEffect, useState } from "react";
import type { Locale, SocialLink } from "@/lib/types";
import Button from "@/components/atoms/Button/Button";
import styles from "./ContactAside.module.scss";

type Labels = {
  detailsHeading: string;
  emailLabel: string;
  copy: string;
  copied: string;
  locationLabel: string;
  location: string;
  localTime: string;
  responseLabel: string;
  response: string;
  scheduleHeading: string;
  scheduleText: string;
  scheduleCta: string;
  elsewhere: string;
};

type Props = {
  locale: Locale;
  labels: Labels;
  email: string;
  socials: SocialLink[];
  calendarUrl: string;
};

const TIME_ZONE = "Europe/Berlin";

/**
 * What a recruiter checks before writing: the address (with a copy button,
 * because mailto: opens the wrong client for most people), where and what
 * time it is there, how long a reply takes, the calendar, and the two
 * profiles. Beside the form from 1024px, beneath it before that.
 */
export default function ContactAside({
  locale,
  labels,
  email,
  socials,
  calendarUrl,
}: Props) {
  const [copied, setCopied] = useState(false);
  // Rendered only on the client: a server-rendered clock is wrong by the
  // time it is read, and would mismatch on hydration anyway.
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat(locale === "de" ? "de-DE" : "en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: TIME_ZONE,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, [locale]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (insecure context, denied): the address is
      // selectable text right beside the button.
    }
  }

  return (
    <aside className={styles.aside}>
      <section className={styles.card} aria-labelledby="contact-details">
        <h2 id="contact-details" className={styles.heading}>
          {labels.detailsHeading}
        </h2>
        <dl className={styles.facts}>
          <div className={styles.fact}>
            <dt>{labels.emailLabel}</dt>
            <dd className={styles.emailRow}>
              <a className={styles.email} href={`mailto:${email}`}>
                {email}
              </a>
              <button
                type="button"
                className={styles.copy}
                onClick={copyEmail}
                aria-live="polite"
              >
                {copied ? labels.copied : labels.copy}
              </button>
            </dd>
          </div>
          <div className={styles.fact}>
            <dt>{labels.locationLabel}</dt>
            <dd>
              {labels.location}
              {time && (
                <span className={styles.time}>
                  {" "}
                  · {time} {labels.localTime}
                </span>
              )}
            </dd>
          </div>
          <div className={styles.fact}>
            <dt>{labels.responseLabel}</dt>
            <dd>{labels.response}</dd>
          </div>
          <div className={styles.fact}>
            <dt>{labels.elsewhere}</dt>
            <dd>
              <ul className={styles.socials}>
                {socials.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
      </section>

      {/* The alternative to writing, read after the form on a phone and
          beside it on a desktop. */}
      <section className={styles.card} aria-labelledby="contact-schedule">
        <h2 id="contact-schedule" className={styles.heading}>
          {labels.scheduleHeading}
        </h2>
        <p className={styles.text}>{labels.scheduleText}</p>
        <Button variant="secondary" href={calendarUrl} external>
          {labels.scheduleCta}
        </Button>
      </section>
    </aside>
  );
}
