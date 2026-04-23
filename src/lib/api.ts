export interface ContactFormPayload {
  name: string;
  email: string;
  message: string;
}

const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_API_URL ?? "";

export async function submitContactForm(payload: ContactFormPayload): Promise<void> {
  if (!CONTACT_ENDPOINT) {
    throw new Error("Contact API endpoint is not configured");
  }

  const response = await fetch(`${CONTACT_ENDPOINT}/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
}
