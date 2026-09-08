import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm, { MIN_FILL_MS } from "./ContactForm";
import en from "@/dictionaries/en.json";

// The contact endpoint is open: anyone who POSTs to it sends mail. The
// form's two silent filters are the only thing between it and a bot, and a
// regression in either would show up as spam, not as a failing page.

const ENDPOINT = "https://example.test/contact";

function renderForm() {
  return render(
    <ContactForm
      labels={en.contact}
      endpoint={ENDPOINT}
      fallbackEmail="contact@example.dev"
    />,
  );
}

async function fillLikeAPerson(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/^Name/), "Jane Rivera");
  await user.type(screen.getByLabelText(/^Email/), "jane@company.com");
  await user.type(screen.getByLabelText(/^Message/), "About the role.");
}

describe("ContactForm spam filters", () => {
  let fetchMock: ReturnType<typeof vi.fn>;
  let now: number;

  beforeEach(() => {
    now = 1_000_000;
    vi.spyOn(Date, "now").mockImplementation(() => now);
    fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("sends a message a person took their time over", async () => {
    const user = userEvent.setup();
    renderForm();
    await fillLikeAPerson(user);
    now += MIN_FILL_MS + 1;

    await user.click(screen.getByRole("button", { name: en.contact.send }));

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][0]).toBe(ENDPOINT);
    expect(await screen.findByRole("status")).toHaveTextContent(
      en.contact.successHeading,
    );
  });

  it("drops a submission that filled the hidden field, but still says sent", async () => {
    const user = userEvent.setup();
    const { container } = renderForm();
    await fillLikeAPerson(user);
    const trap = container.querySelector<HTMLInputElement>(
      'input[name="website"]',
    )!;
    // Off the tab order and aria-hidden, so it is set the way a bot would
    await user.type(trap, "https://spam.example");
    now += MIN_FILL_MS + 1;

    await user.click(screen.getByRole("button", { name: en.contact.send }));

    expect(fetchMock).not.toHaveBeenCalled();
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("drops a submission faster than a person could type it", async () => {
    const user = userEvent.setup();
    renderForm();
    await fillLikeAPerson(user);
    // No time passes: Date.now is pinned

    await user.click(screen.getByRole("button", { name: en.contact.send }));

    expect(fetchMock).not.toHaveBeenCalled();
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("keeps the trap out of the accessibility tree and the tab order", () => {
    const { container } = renderForm();
    const trap = container.querySelector('input[name="website"]')!;
    expect(trap).toHaveAttribute("tabindex", "-1");
    expect(trap.closest("[aria-hidden='true']")).not.toBeNull();
    // Role queries honour aria-hidden the way assistive tech does
    expect(screen.queryByRole("textbox", { name: "Website" })).toBeNull();
  });
});
