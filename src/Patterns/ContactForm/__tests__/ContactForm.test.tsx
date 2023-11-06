import React from "react";
import { render, screen } from "@testing-library/react";
import ContactForm from "../ContactForm";

jest.mock("aws-amplify", () => ({
  API: {
    post: jest.fn(),
  },
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
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });
});