import { render, screen } from "@testing-library/react";
import { Input } from "./Input";

describe("Input", () => {
  it("renders an input with its label", () => {
    render(<Input label="Email" />);
    const input = screen.getByLabelText("Email");
    expect(input).toBeInTheDocument();
  });

  it("uses the provided id to assosiate with its label", () => {
    render(<Input id="email" label="email" />);
    const input = screen.getByLabelText("email");
    expect(input).toHaveAttribute("id","email");
  });

  it("generates an id when one is not provided", () => {
    render(<Input label="email" />);
    const input = screen.getByLabelText("email")
    expect(input).toHaveAttribute("id");
    expect(input.id).not.toBe("");
  });

  it("assosiates helper text with the input", () => {
    render(<Input label="Email" helperText="We will never share you email." />)
    const input = screen.getByLabelText("Email");
    const helperText = screen.getByText("We will never share you email.")
    expect(input).toHaveAttribute(
      "aria-describedBy",
      helperText.id
    );
  });

  it("marks the input invalid when error is provided", () => {
    render(
      <Input 
        label="email"
        error="Please enter a valid email"
      />);
    const input = screen.getByLabelText("email");
    const errorText = screen.getByText("Please enter a valid email");

    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-describedBy", errorText.id);
  });

  it("shows error instead of helperText", () => {
    render(
    <Input 
      label="Email"
      error="Email is required"
      helperText="Enter your email"
    />);
    expect(screen.getByText("Email is required")).toBeInTheDocument();
    expect(screen.queryByText("Enter your email")).not.toBeInTheDocument();
  });

  it("applies the correct size", () => {
    render(
      <Input label="Email" inputSize="large" />
    );
    expect(screen.getByLabelText("Email")).toHaveClass(
      "input", "input--large"
    )
  });

  it("preserve custom class name", () => {
    render(<Input label="Email" className="custom-class" />);
    expect(screen.getByLabelText("Email")).toHaveClass("input custom-class");
  });
});