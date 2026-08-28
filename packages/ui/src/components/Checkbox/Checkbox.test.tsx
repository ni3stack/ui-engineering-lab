import { render, screen } from "@testing-library/react";
import { Checkbox } from "./Checkbox";
import userEvent from "@testing-library/user-event";
import { useState } from "react";

describe("Checkbox", () => {
  it("render a checkbox", () => {
    render(<Checkbox />);
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("renders the label", () => {
    render(
      <Checkbox
        label="Accept the terms and Conditions"
      />
    );
    expect(screen.getByRole("checkbox", { name: "Accept the terms and Conditions"}))
      .toBeInTheDocument();
  });

  it("assosiate the label with checkbox", () => {
    render(
      <Checkbox
        id="terms"
        label="Accept terms"
      />
    );
    const checkBox = screen.getByRole("checkbox", { name: "Accept terms"});
    expect(checkBox).toHaveAttribute("id", "terms");
  });

  it("generates an id when one is not provided", () => {
    render(
      <Checkbox label="accept terms" />
    );
    expect(screen.getByRole("checkbox", { name: "accept terms" }))
      .toHaveAttribute("id");
  });

  it("always renders a checkbox input", () => {
    render(
      <Checkbox />
    );
    expect(screen.getByRole("checkbox")).toHaveAttribute("type","checkbox");
  });

  it("support checked state", () => {
    render(
      <Checkbox
        label="Accept terms"
        checked
        readOnly
      />
    );
    expect(screen.getByRole("checkbox", {name: "Accept terms"}))
      .toBeChecked();
  });

  it("supports defaultChecked for uncontrolled usage", () => {
    render(
      <Checkbox label="Accept terms" defaultChecked />
    );
    expect(screen.getByRole("checkbox", { name: "Accept terms" }))
      .toBeChecked();
  });

  it("Supports uncontrolled interaction", async() => {
    const user = userEvent.setup();
    render(<Checkbox label="Accept terms" />);
    const checkbox = screen.getByRole("checkbox", { name: "Accept terms" });
    expect(checkbox).not.toBeChecked();
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it("supports controlled usage", async () => {
    const user = userEvent.setup();

    function TestComponent() {
      const [checked, setChecked] = useState(false);

      return(
        <Checkbox
          label="Accept terms"
          checked={checked}
          onChange={(event) => setChecked(event.target.checked)}
        />
      );
    }
    render(<TestComponent />);
    const checkedElm = screen.getByRole("checkbox", { name: "Accept terms" });
    expect(checkedElm).not.toBeChecked();
    await user.click(checkedElm);
    expect(checkedElm).toBeChecked();
  });

  it("supprots disabled state", () => {
    render(
      <Checkbox 
        label="Accept terms"
        disabled
      />
    );
    expect(screen.getByRole("checkbox", {name: "Accept terms"}))
      .toBeDisabled();
  });

  it("supports required state", () => {
    render(
      <Checkbox
        label="Accept terms"
        required
      />
    );
    expect(screen.getByRole("checkbox", { name: "Accept terms" }))
      .toBeRequired();
  });

  it("support native name and value props", () => {
    render(
      <Checkbox
        label="Accept terms"
        name="terms"
        value="accepted"
      />
    );
    const checkBox = screen.getByRole("checkbox", { name: "Accept terms" });
    expect(checkBox).toHaveAttribute("name","terms");
    expect(checkBox).toHaveAttribute("value", "accepted");
  });

  it("renders helper text", () => {
    render(
      <Checkbox
        label="Accept terms"
        helperText="You must accept the terms"
      />
    );
    expect(screen.getByText("You must accept the terms")).toBeInTheDocument();
  });

  it("assosiate helper text with the checkbox", () => {
    render(
      <Checkbox
        label="Accept terms"
        helperText="You must accept the terms"
      />
    );
    const checkbox = screen.getByRole("checkbox", {name:"Accept terms"});
    const helperText = screen.getByText("You must accept the terms");
    expect(checkbox).toHaveAttribute("aria-describedBy", helperText.id);
  });

  it("renders error texts", () => {
    render(
      <Checkbox
        label="Accept terms"
        error="You must accept the terms"
      />
    );
    expect(screen.getByText("You must accept the terms")).toBeInTheDocument();
  });

  it("marks the checkbox invalid when error is provided", () => {
    render(
      <Checkbox
        label="Accept terms"
        error="You must accept the terms"
      />
    );
    const checkbox = screen.getByRole("checkbox", { name: "Accept terms" });
    expect(checkbox).toHaveAttribute("aria-invalid", "true");
  });

  it("assosiate error text with checkbox", () => {
    render(
      <Checkbox
        label="Accept terms"
        error="You must accept the terms"
      />
    );
    const checkbox = screen.getByRole("checkbox", { name: "Accept terms" });
    const errorText = screen.getByText("You must accept the terms");
    expect(checkbox).toHaveAttribute("aria-describedBy",errorText.id);
  });

  it("shows error instead of helper text", () => {
    render(
      <Checkbox
        label="Accept terms"
        helperText="You must accept the terms."
        error="Terms are required."
      />
    );
    expect(screen.getByText("Terms are required.")).toBeInTheDocument();
    expect(screen.queryByText("You must accept the terms.")).not.toBeInTheDocument();
  });

  it("preserve custom class", () => {
    render(
      <Checkbox
        label="Accept Terms"
        helperText="You must accept the terms"
        className="custom-class"
      />
    );
    expect(screen.getByRole("checkbox", { name: "Accept Terms"}))
      .toHaveClass("custom-class")
  });
});