import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ContactForm from "../ContactForm";

vi.mock("lib/api", () => ({
  submitContactForm: vi.fn(),
}));

describe("ContactForm", () => {
  it("renders without crashing", () => {
    render(<ContactForm />);
  });

  it("has the correct fields and a submit button", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /send message/i })
    ).toBeInTheDocument();
  });
});
