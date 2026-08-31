"use client";

import { useState } from "react";
import FormField from "@/components/molecules/FormField/FormField";
import Button from "@/components/atoms/Button/Button";
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

export default function ContactForm({
  labels,
  endpoint,
  fallbackEmail,
}: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [topic, setTopic] = useState<string | null>(null);

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
        <p className={styles.successHeading}>{labels.successHeading}</p>
        <p className={styles.successText}>{labels.success}</p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
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
          {status === "sending" ? labels.sending : labels.send}
        </Button>
        <p className={styles.note}>{labels.formNote}</p>
      </div>
    </form>
  );
}
