import { render, screen } from "@testing-library/react";
import { Textarea } from "./Textarea";
import userEvent from "@testing-library/user-event";
import { useState } from "react";

describe("Textarea", () => {
  it("renders a textarea", () => {
    render(<Textarea />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toBeInTheDocument();
  });

  it("renders a label when provided", () => {
    render(<Textarea label="Description" />); 
    expect(screen.getByRole("textbox", { name: "Description" })).toBeInTheDocument();
  });
  
  it("assosiate the label with the textarea using htmlFor and id", () => {
    render(<Textarea label="Description" id="description" />);
    const textarea = screen.getByRole("textbox", { name: "Description" });
    expect(textarea).toHaveAttribute("id", "description");
  });

  it("generates a unique id if none is provided", () => {
    render(<Textarea label="Description" />);
    const textarea = screen.getByRole("textbox", { name: "Description" });
    expect(textarea).toHaveAttribute("id");
  });

  it("supports placeholder text", () => {
    render(<Textarea label="Description" placeholder="Enter a description" />);
    const textarea = screen.getByPlaceholderText("Enter a description");
    expect(textarea).toBeInTheDocument();
  });

  it("supports default for uncontrolled textarea", () => {
    render(<Textarea label="Description" defaultValue="Default text" />);
    const textarea = screen.getByRole("textbox", { name: "Description" });
    expect(textarea).toHaveValue("Default text");
  });

  it("supports uncontrolled interaction", async () => {
    const user = userEvent.setup();
    render(<Textarea label="Description" />);
    const textarea = screen.getByRole("textbox", { name: "Description" });
    await user.click(textarea);
    await user.type(textarea, "Hello, world!");
    expect(textarea).toHaveValue("Hello, world!");
  });

  it("supports controlled usage", async () => {
    const user = userEvent.setup();
    const ControlledTextarea = () => {
      const [value, setValue] = useState("");
      return (
          <Textarea
              value={value}
              onChange={(event) => setValue(event.target.value)}
              label="Description"
          />
      );
    }
    render(<ControlledTextarea />);
    const textarea = screen.getByRole("textbox", { name: "Description" });
    await user.click(textarea);
    await user.type(textarea, "Hello, world!");
    expect(textarea).toHaveValue("Hello, world!");
  });

  it("supports row", () => {
    render(<Textarea label="Description" rows={5} />);
    const textarea = screen.getByRole("textbox", { name: "Description" });
    expect(textarea).toHaveAttribute("rows", "5");
  });
  
  it("supports cols", () => {
    render(<Textarea label="Description" cols={30} />);
    const textarea = screen.getByRole("textbox", { name: "Description" });
    expect(textarea).toHaveAttribute("cols", "30");
  });

  it("supports maxLength", () => {
    render(<Textarea label="Description" maxLength={100} />);
    const textarea = screen.getByRole("textbox", { name: "Description" });
    expect(textarea).toHaveAttribute("maxLength", "100");
  });

  it("supports disabled state", () => {
    render(<Textarea label="Description" disabled />);
    const textarea = screen.getByRole("textbox", { name: "Description" });
    expect(textarea).toBeDisabled();
  });

  it("supports readOnly state", () => {
    render(<Textarea label="Description" readOnly />);
    const textarea = screen.getByRole("textbox", { name: "Description" });
    expect(textarea).toHaveAttribute("readOnly");
  });

  it("supports required state", () => {
    render(<Textarea label="Description" required />);
    const textarea = screen.getByRole("textbox", { name: "Description" });
    expect(textarea).toBeRequired();
  });

  it("supports aria-label", () => {
    render(<Textarea aria-label="Custom description" />);
    const textarea = screen.getByRole("textbox", { name: "Custom description" });
    expect(textarea).toBeInTheDocument();
  });

  it("supports native name attribute", () => {
    render(<Textarea label="Description" name="description" />);
    const textarea = screen.getByRole("textbox", { name: "Description" });
    expect(textarea).toHaveAttribute("name", "description");
  });

  it("supports aria-describedby for helper text", () => {
    render(<Textarea label="Description" helperText="This is a helper text." />);
    const textarea = screen.getByRole("textbox", { name: "Description" });
    const helperText = screen.getByText("This is a helper text.");
    expect(textarea).toHaveAttribute("aria-describedby", helperText.id);
  });

  it("supports aria-describedby for error message", () => {
    render(<Textarea label="Description" error="This is an error message." />);
    const textarea = screen.getByRole("textbox", { name: "Description" });
    const errorMessage = screen.getByText("This is an error message.");
    expect(textarea).toHaveAttribute("aria-describedby", errorMessage.id);
  });

  it("supports aria-invalid when error is present", () => {
    render(<Textarea label="Description" error="This is an error message." />);
    const textarea = screen.getByRole("textbox", { name: "Description" });
    expect(textarea).toHaveAttribute("aria-invalid", "true");
  });

  it("shows error message instead of helper text when both are provided", () => {
    render(
      <Textarea
        label="Description"
        helperText="This is a helper text."
        error="This is an error message."
      />
    );
    expect(screen.getByText("This is an error message.")).toBeInTheDocument();
    expect(screen.queryByText("This is a helper text.")).not.toBeInTheDocument();
  });

  it("supports custom className", () => {
    render(<Textarea label="Description" className="custom-class" />);
    const textarea = screen.getByRole("textbox", { name: "Description" });
    expect(textarea).toHaveClass("textarea custom-class");
  });
});