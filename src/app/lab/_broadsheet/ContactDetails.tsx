"use client";

import { useEffect, useState } from "react";
import type { ContactPageData } from "./contactData";
import page from "./Contact.module.scss";

type Props = Pick<ContactPageData, "locale" | "labels" | "email" | "socials">;

const TIME_ZONE = "Europe/Berlin";

/**
 * The live ContactAside's first card — the address with a copy button,
 * where and what time it is there, how long a reply takes, the profiles —
 * as a ruled fact list beside the form.
 */
export default function ContactDetails({
  locale,
  labels,
  email,
  socials,
}: Props) {
  const [copied, setCopied] = useState(false);
  // Client-only: a server-rendered clock is wrong by the time it is read.
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
      // Clipboard unavailable: the address is selectable text beside it.
    }
  }

  return (
    <section className={page.details} aria-labelledby="contact-details">
      <h2 id="contact-details" className={page.detailsHeading}>
        {labels.detailsHeading}
      </h2>
      <dl className={page.facts}>
        <div>
          <dt>{labels.emailLabel}</dt>
          <dd className={page.emailRow}>
            <a className={page.email} href={`mailto:${email}`}>
              {email}
            </a>
            <button
              type="button"
              className={page.copy}
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
              <span className={page.time}>
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
            <ul className={page.socials}>
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
    </section>
  );
}
