"use client";

import { useRef, useState } from "react";
import { MIN_FILL_MS } from "@/components/organisms/ContactForm/ContactForm";
import Asterisk from "./Asterisk";
import type { ContactPageData } from "./contactData";
import styles from "./Broadsheet.module.scss";
import page from "./Contact.module.scss";

type Props = {
  labels: ContactPageData["labels"];
  endpoint?: string;
  fallbackEmail: string;
};

type Status = "idle" | "sending" | "success" | "error";

/**
 * The live ContactForm's behaviour, field for field — validation, the
 * honeypot and three-second floor, the topic riding inside the message, the
 * mailto fallback — in the Broadsheet's dress. The live component is the
 * source of truth: when this design is promoted, its styles move there and
 * this copy goes.
 */
export default function ContactForm({
  labels,
  endpoint,
  fallbackEmail,
}: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [topic, setTopic] = useState<string | null>(null);
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

    const trapped = String(data.get("website") ?? "").length > 0;
    const tooFast = Date.now() - openedAt.current < MIN_FILL_MS;
    if (trapped || tooFast) {
      setStatus("success");
      return;
    }

    const fullMessage = topic ? `[${topic}] ${message}` : message;

    if (!endpoint) {
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
      <div className={page.success} role="status">
        <Asterisk className={page.successMark} />
        <p className={page.successHeading}>{labels.successHeading}</p>
        <p className={page.successText}>{labels.success}</p>
      </div>
    );
  }

  const field = (
    name: "name" | "email" | "message",
    label: string,
    control: React.ReactNode,
  ) => (
    <div className={page.field}>
      <label className={page.label} htmlFor={`field-${name}`}>
        {label}
        <span className={page.requiredMark} aria-hidden="true">
          {" "}
          *
        </span>
      </label>
      {control}
      {errors[name] && (
        <p className={page.fieldError} id={`field-${name}-error`} role="alert">
          {errors[name]}
        </p>
      )}
    </div>
  );

  const aria = (name: string) => ({
    id: `field-${name}`,
    name,
    required: true,
    "aria-invalid": !!errors[name],
    "aria-describedby": errors[name] ? `field-${name}-error` : undefined,
  });

  return (
    <form className={page.form} onSubmit={handleSubmit} noValidate>
      {/* Honeypot: off-screen, out of the tab order, hidden from assistive
          tech. A bot filling every field it finds fills this one. */}
      <div className={page.trap} aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {field(
        "name",
        labels.name,
        <input
          className={page.control}
          autoComplete="name"
          placeholder={labels.namePlaceholder}
          {...aria("name")}
        />,
      )}
      {field(
        "email",
        labels.email,
        <input
          className={page.control}
          type="email"
          autoComplete="email"
          placeholder={labels.emailPlaceholder}
          {...aria("email")}
        />,
      )}

      <fieldset className={page.topics}>
        <legend className={page.label}>{labels.topicLabel}</legend>
        <div className={page.topicRow}>
          {topics.map((option) => (
            <label key={option} className={page.topic}>
              <input
                className={page.topicInput}
                type="radio"
                name="topic"
                value={option}
                checked={topic === option}
                onChange={() => setTopic(option)}
                onClick={() => {
                  // A second click on the chosen chip clears it: the topic
                  // is optional, and radios can't deselect on their own.
                  if (topic === option) setTopic(null);
                }}
              />
              <span className={page.topicChip}>{option}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {field(
        "message",
        labels.message,
        <textarea
          className={page.control}
          rows={6}
          placeholder={labels.messagePlaceholder}
          {...aria("message")}
        />,
      )}

      {status === "error" && (
        <p className={page.formError} role="alert">
          {labels.error}
        </p>
      )}

      <div className={page.actions}>
        <button
          type="submit"
          className={styles.ctaPrimary}
          disabled={status === "sending"}
        >
          {status === "sending" ? labels.sending : labels.send}{" "}
          <span aria-hidden="true">→</span>
        </button>
        <p className={page.note}>{labels.formNote}</p>
      </div>
    </form>
  );
}
