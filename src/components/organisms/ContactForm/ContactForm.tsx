"use client";

import { useState } from "react";
import FormField from "@/components/molecules/FormField/FormField";
import Button from "@/components/atoms/Button/Button";
import styles from "./ContactForm.module.scss";

type Labels = {
  name: string;
  email: string;
  message: string;
  send: string;
  sending: string;
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

    if (!endpoint) {
      // No backend configured — open the user's mail client instead
      const subject = encodeURIComponent(`Website message from ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:${fallbackEmail}?subject=${subject}&body=${body}`;
      setStatus("success");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
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
      <p className={styles.success} role="status">
        {labels.success}
      </p>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <FormField
        label={labels.name}
        name="name"
        error={errors.name}
        autoComplete="name"
      />
      <FormField
        label={labels.email}
        name="email"
        type="email"
        error={errors.email}
        autoComplete="email"
      />
      <FormField
        as="textarea"
        label={labels.message}
        name="message"
        rows={6}
        error={errors.message}
      />
      {status === "error" && (
        <p className={styles.error} role="alert">
          {labels.error}
        </p>
      )}
      <Button type="submit" disabled={status === "sending"}>
        {status === "sending" ? labels.sending : labels.send}
      </Button>
    </form>
  );
}
