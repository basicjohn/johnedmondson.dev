"use client";

import { useRef, useState } from "react";
import FormField from "@/components/molecules/FormField/FormField";
import Button from "@/components/atoms/Button/Button";
import Asterisk from "@/components/atoms/Asterisk/Asterisk";
import styles from "./ContactForm.module.scss";

type Labels = {
  name: string;
  namePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  message: string;
  messagePlaceholder: string;
  topicLabel: string;
  topicHiring: string;
  topicContract: string;
  topicCollaboration: string;
  topicOther: string;
  send: string;
  sending: string;
  formNote: string;
  successHeading: string;
  success: string;
  error: string;
  required: string;
  invalidEmail: string;
};

type Props = {
  labels: Labels;
  /** Optional POST endpoint (e.g. your existing Amplify Lambda). Falls back to mailto. */
  endpoint?: string;
  fallbackEmail: string;
};

type Status = "idle" | "sending" | "success" | "error";

/** Nobody reads the page, types a name, an address and a message in less */
export const MIN_FILL_MS = 3000;

export default function ContactForm({
  labels,
  endpoint,
  fallbackEmail,
}: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [topic, setTopic] = useState<string | null>(null);
  // The endpoint accepts any POST and sends mail, so the form does the
  // filtering a bot would not expect: a field people never see, and a floor
  // on how fast a person could plausibly fill three fields.
  const openedAt = useRef(Date.now());

  const topics = [
    labels.topicHiring,
    labels.topicContract,
    labels.topicCollaboration,
    labels.topicOther,
  ];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const nextErrors: Record<string, string> = {};
    if (!name) nextErrors.name = labels.required;
    if (!email) nextErrors.email = labels.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      nextErrors.email = labels.invalidEmail;
    if (!message) nextErrors.message = labels.required;
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    // A filled honeypot or a sub-3-second submission is not a person. Show
    // the success panel anyway: telling a bot it was caught only helps it.
    const trapped = String(data.get("website") ?? "").length > 0;
    const tooFast = Date.now() - openedAt.current < MIN_FILL_MS;
    if (trapped || tooFast) {
      setStatus("success");
      return;
    }

    // The backend forwards `message` verbatim, so the chosen topic rides
    // inside it rather than needing a Lambda change.
    const fullMessage = topic ? `[${topic}] ${message}` : message;

    if (!endpoint) {
      // No backend configured — open the user's mail client instead
      const subject = encodeURIComponent(
        `Website message from ${name}${topic ? ` — ${topic}` : ""}`,
      );
      const body = encodeURIComponent(`${fullMessage}\n\n— ${name} (${email})`);
      window.location.href = `mailto:${fallbackEmail}?subject=${subject}&body=${body}`;
      setStatus("success");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message: fullMessage }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className={styles.success} role="status">
        <Asterisk className={styles.successMark} />
        <p className={styles.successHeading}>{labels.successHeading}</p>
        <p className={styles.successText}>{labels.success}</p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {/* Honeypot: off-screen, out of the tab order, hidden from assistive
          tech. A bot filling every field it finds fills this one. */}
      <div className={styles.trap} aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <FormField
        label={labels.name}
        name="name"
        error={errors.name}
        autoComplete="name"
        placeholder={labels.namePlaceholder}
        required
      />
      <FormField
        label={labels.email}
        name="email"
        type="email"
        error={errors.email}
        autoComplete="email"
        placeholder={labels.emailPlaceholder}
        required
      />
      <fieldset className={styles.topics}>
        <legend className={styles.topicsLegend}>{labels.topicLabel}</legend>
        <div className={styles.topicRow}>
          {topics.map((option) => (
            <label key={option} className={styles.topic}>
              <input
                className={styles.topicInput}
                type="radio"
                name="topic"
                value={option}
                checked={topic === option}
                onChange={() => setTopic(option)}
                onClick={() => {
                  // Second click on the active chip clears it — the topic is
                  // optional and radios can't deselect on their own.
                  if (topic === option) setTopic(null);
                }}
              />
              <span className={styles.topicChip}>{option}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <FormField
        as="textarea"
        label={labels.message}
        name="message"
        rows={6}
        error={errors.message}
        placeholder={labels.messagePlaceholder}
        required
      />
      {status === "error" && (
        <p className={styles.error} role="alert">
          {labels.error}
        </p>
      )}
      <div className={styles.actions}>
        <Button type="submit" disabled={status === "sending"}>
          {status === "sending" ? labels.sending : labels.send}{" "}
          <span aria-hidden="true">→</span>
        </Button>
        <p className={styles.note}>{labels.formNote}</p>
      </div>
    </form>
  );
}
