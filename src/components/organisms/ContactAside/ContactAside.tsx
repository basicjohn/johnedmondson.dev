"use client";

import { useEffect, useState } from "react";
import type { Locale, SocialLink } from "@/lib/types";
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
  elsewhere: string;
};

type Props = {
  locale: Locale;
  labels: Labels;
  email: string;
  socials: SocialLink[];
};

const TIME_ZONE = "Europe/Berlin";

/**
 * What a recruiter checks before writing: the address (with a copy button,
 * because mailto: opens the wrong client for most people), where and what
 * time it is there, how long a reply takes, and the two profiles, as a
 * ruled fact list. Beside the form from 1024px, beneath it before that.
 * (The calendar card is gone: John doesn't want visitors booking slots.)
 */
export default function ContactAside({
  locale,
  labels,
  email,
  socials,
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
    <aside className={styles.aside} aria-labelledby="contact-details">
      <h2 id="contact-details" className={styles.heading}>
        {labels.detailsHeading}
      </h2>
      <dl className={styles.facts}>
        <div>
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
        <div>
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
        <div>
          <dt>{labels.responseLabel}</dt>
          <dd>{labels.response}</dd>
        </div>
        <div>
          <dt>{labels.elsewhere}</dt>
          <dd>
            <ul className={styles.socials}>
              {socials.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer">
                    {s.label} <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>
    </aside>
  );
}
