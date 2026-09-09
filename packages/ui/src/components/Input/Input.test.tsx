import { render, screen } from "@testing-library/react";
import { Input } from "./Input";
import userEvent from "@testing-library/user-event";

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

  describe("Password visibility", () => {
    it("does not show the password by default", () => {
      render(
        <Input type="password" aria-label="Password" />
      );

      expect(screen.queryByRole("button", { name: "Show password" }))
        .not.toBeInTheDocument();
    });

    it("shows the toggle for password inputs", () => {
      render(
        <Input 
          type="password" 
          aria-label="Password"
          showPasswordToggle
        />
      );

      expect(screen.getByRole("button", { name: "Show password" }))
        .toBeInTheDocument();
    });

    it("toggle password visibility", async () => {
      const user = userEvent.setup();

      render(
        <Input
          type="password"
          showPasswordToggle
          label="Password"
        />
      );

      const input = screen.getByLabelText("Password");

      expect(input).toHaveAttribute("type", "password");

      await user.click(
        screen.getByRole("button", { name: "Show password" })
      );

      expect(input).toHaveAttribute("type", "text");

      expect(
        screen.getByRole("button", { name: "Hide password" })
      ).toBeInTheDocument();

      await user.click(
        screen.getByRole("button", { name: "Hide password" })
      );

      expect(input).toHaveAttribute("type", "password");
    });

    it("does not show the toggle for non-password inputs", () => {
      render(
        <Input
          type="text"
          showPasswordToggle
          aria-label="Username"
        />
      );

      expect(
        screen.queryByRole("button", { name: "Show password" })
      ).not.toBeInTheDocument();
    });

    it("disables the toggle when the input is disabled", () => {
      render(
        <Input
          type="password"
          showPasswordToggle
          disabled
          aria-label="Password"
        />
      );

      expect(
        screen.getByRole("button", { name: "Show password" })
      ).toBeDisabled();
    });
  });
});