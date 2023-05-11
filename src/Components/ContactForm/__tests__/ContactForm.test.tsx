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
    expect(screen.getByLabelText(/topic/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  it("displays error messages when fields are touched and left empty", async () => {
    const mockOnFormSubmit = jest.fn();
    render(<ContactForm onFormSubmit={mockOnFormSubmit} />);

    userEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(await screen.findByText("Name is required")).toBeInTheDocument();
    expect(await screen.findByText("Email is required")).toBeInTheDocument();
    expect(await screen.findByText("Message is required")).toBeInTheDocument();
    expect(await screen.findByText("Topic is required")).toBeInTheDocument();
  });

  it("submits the form when all fields are filled correctly", async () => {
    const mockOnFormSubmit = jest.fn();
    render(<ContactForm onFormSubmit={mockOnFormSubmit} />);

    userEvent.type(screen.getByLabelText(/name/i), "John Doe");
    userEvent.type(screen.getByLabelText(/email/i), "john.doe@test.com");
    userEvent.selectOptions(screen.getByLabelText(/topic/i), [
      "Follow the road less traveled!",
    ]);

    userEvent.type(
      screen.getByLabelText(/message:/i),
      "Hello, this is a test message."
    );

    userEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(mockOnFormSubmit).toHaveBeenCalled();
    });
  });
});
