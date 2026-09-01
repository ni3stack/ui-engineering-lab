import { render, screen } from "@testing-library/react";
import { Radio } from "./Radio";
import userEvent from "@testing-library/user-event";
import { useState } from "react";

describe("Radio", () => {
  it("render a radio", () => {
    render(
      <Radio />
    )
    expect(screen.getByRole("radio")).toBeInTheDocument();
  });

  it("renders the label",()=>{
    render(
      <Radio label="India" />)
    expect(screen.getByText("India")).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "India" })).toBeInTheDocument();
  });

  it("assosiate the label with radio input",()=>{
    render(
      <Radio label="India" id="india"/>
    );
    expect(screen.getByRole("radio", { name: "India" })).toHaveAttribute("id","india");
  });

  it("generates an id if not provided",()=>{
    render(
      <Radio label="India" />
    );
    const radioInput = screen.getByRole("radio", { name: "India" });
    expect(radioInput).toHaveAttribute("id");
  });
   
  it("always renders a radio input",()=>{
    render(
      <Radio label="India" />
    );
    expect(screen.getByRole("radio")).toHaveAttribute("type","radio");
  });

  it("supports checked state", () => {
    render(<Radio label="India" checked readOnly />);
    expect(screen.getByRole("radio")).toBeChecked();
  });

  it("supports disabled state", () => {
    render(<Radio label="India" disabled />);
    expect(screen.getByRole("radio")).toBeDisabled();
  });

  it("supports defaultChecked for uncontrolled usage", () => {
    render(<Radio label="India" defaultChecked />);
    expect(screen.getByRole("radio")).toBeChecked();
  });

  it("support uncontrolled interaction", async () => {
    const user = userEvent.setup();
    render(<Radio label="India" name="country" />);

    const radioInput = screen.getByRole("radio", { name: "India"});
    expect(radioInput).not.toBeChecked();
    await user.click(radioInput);
    expect(radioInput).toBeChecked();
  });

  it("supports contolled usage", async () => {
    const user = userEvent.setup();
    const ControlledRadio = () => {
      const [value, setValue] = useState("india");
      return (
        <>
          <Radio
            label="India"
            name="country"
            value="india"
            checked={value === "india"}
            onChange={(e) => setValue(e.target.value)}
          />
          <Radio
            label="USA"
            name="country"
            value="usa"
            checked={value === "usa"}
            onChange={(e) => setValue(e.target.value)}
          />
        </>
      );
    };
    render(<ControlledRadio />);
    const indiaRadio = screen.getByRole("radio", { name: "India" });
    const usaRadio = screen.getByRole("radio", { name: "USA" });

    expect(indiaRadio).toBeChecked();
    expect(usaRadio).not.toBeChecked();

    await user.click(usaRadio);

    expect(indiaRadio).not.toBeChecked();
    expect(usaRadio).toBeChecked(); 

  });
  it("supports radio grouping with name props", async () => {
    const user = userEvent.setup();
    render(
      <>
        <Radio label="India" name="country" value="india" defaultChecked />
        <Radio label="USA" name="country" value="usa" />
      </>
    );
    const indiaRadio = screen.getByRole("radio", { name: "India" });
    const usaRadio = screen.getByRole("radio", { name: "USA" });

    expect(indiaRadio).toBeChecked();
    expect(usaRadio).not.toBeChecked();

    await user.click(usaRadio);

    expect(indiaRadio).not.toBeChecked();
    expect(usaRadio).toBeChecked(); 
  });

  it("supports required state", () => {
    render(<Radio label="India" required />);
    expect(screen.getByRole("radio")).toBeRequired();
  });

  it("supports native name and value props", () => {
    render(<Radio label="India" name="country" value="india" />);
    const radioInput = screen.getByRole("radio", { name: "India" });
    expect(radioInput).toHaveAttribute("name", "country");
    expect(radioInput).toHaveAttribute("value", "india");
  });

  it("renders helper text when provided", () => {
    render(<Radio label="India" helperText="Select your country" />);
    expect(screen.getByText("Select your country")).toBeInTheDocument();
  });

  it("associates helper text with the radio input using aria-describedby", () => {
    render(<Radio label="India" helperText="Select your country" />);
    const radioInput = screen.getByRole("radio", { name: "India" });
    const helperText = screen.getByText("Select your country");
    expect(radioInput).toHaveAttribute("aria-describedby", helperText.id);
  });

  it("renders error message when provided", () => {
    render(<Radio label="India" error="This field is required" />);
    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });

  it("marks the radio input as invalid when error message is provided", () => {
    render(
      <Radio label="India"
        error="This field is required" />
    );
    const radioInput = screen.getByRole("radio", { name: "India" });
    expect(radioInput).toBeInvalid();
    expect(radioInput).toHaveAttribute("aria-invalid", "true");
  });

  it("associates error message with the radio input using aria-describedby", () => {
    render(
      <Radio label="India"
        error="This field is required" />
    );
    const radioInput = screen.getByRole("radio", { name: "India" });
    const errorMessage = screen.getByText("This field is required");
    expect(radioInput).toHaveAttribute("aria-describedby", errorMessage.id);
  });

  it("renders error message instead of helper text when both are provided", () => {
    render(
      <Radio label="India"
        error="This field is required"
        helperText="Select your country" />
    );
    expect(screen.getByText("This field is required")).toBeInTheDocument();
    expect(screen.queryByText("Select your country")).not.toBeInTheDocument();
  });
  
  it("supports custom className prop", () => {
    render(<Radio label="India" className="custom-radio" />);
    const radioInput = screen.getByRole("radio", { name: "India" });
    expect(radioInput).toHaveClass("custom-radio");
  });
});