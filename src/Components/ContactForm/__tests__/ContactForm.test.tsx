import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from "../ContactForm";

jest.mock("aws-amplify", () => ({
  API: {
    post: jest.fn(),
  },
}));

describe("ContactForm", () => {
  it("renders without crashing", () => {
    const mockOnFormSubmit = jest.fn();
    render(<ContactForm onFormSubmit={mockOnFormSubmit} />);
  });

  it("has the correct fields and a submit button", () => {
    const mockOnFormSubmit = jest.fn();
    render(<ContactForm onFormSubmit={mockOnFormSubmit} />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByTestId("topic-select")).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });
});
