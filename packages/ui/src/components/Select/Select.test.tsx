import { render, screen } from "@testing-library/react";
import { Select } from "./Select";
import userEvent from "@testing-library/user-event";
import { useState } from "react";

const options = [
  { value: "in", label: "India" },
  { value: "us", label: "United States" },
  { value: "sl", label: "Sri Lanka" },
];

describe("Select", () => {
  it("renders a select with correct label", () => {
    render(
      <Select 
        label="Country" 
        options={options}
      />
    );
    const select = screen.getByRole("combobox", { name: "Country" });
    expect(select).toBeInTheDocument();
  });

  it("assosiate the label with provided id", () => {
    render(
      <Select
        id="country"
        label="Country"
        options={options}
      />
    );
    expect(screen.getByRole("combobox", { name: "Country" })
    ).toHaveAttribute("id", "country");
  });

  it("generates an id when one is not provided", () => {
    render(
      <Select
        label="Country"
        options={options}
      />
    );
    expect(screen.getByRole("combobox", { name: "Country" }))
      .toHaveAttribute("id");
  });

  it("render all options", () => {
    render(
      <Select
        label="Country"
        options={options}
      />
    );
    expect(screen.getByRole("option", { name: "India" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "United States" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Sri Lanka" })).toBeInTheDocument();
  });

  it("support disabled options", () => {
    render(
      <Select
        label="Country"
        options={[
          ...options,
          {
            value: "ca",
            label: "Canada",
            disabled: true
          }
        ]}
    />);
    expect(screen.getByRole("option", { name: "Canada" }))
        .toBeDisabled
  });
  
  it("renders a disabled placeholder", () => {
    render(
      <Select
        label="Country"
        options={options}
        placeholder="Select a Country"
      />
    );
    const placeholder = screen.getByRole("option", { name: "Select a Country" });
    expect(placeholder).toBeDisabled();
  });

  it("supports native select attributes", () => {
    render(
      <Select
        label="Country"
        name="country"
        required
        disabled
        options={options}
      />
    );

    const select = screen.getByRole("combobox", { name: "Country" });
    expect(select).toBeDisabled();
    expect(select).toBeRequired();
    expect(select).toHaveAttribute("name", "country");
  });

  it("supports uncontrolled usages with defaultValue", () => {
      render(
        <Select
          label="Country"
          options={options}
          defaultValue="in"
        />
      );
      expect(screen.getByRole("combobox", {
        name: "Country"
      })).toHaveValue("in");
  });
  
  it("supports controlled usage with value and onChange", async () => {
    const handleChange = jest.fn();
    const user = userEvent.setup();

    render(
      <Select
        label="Country"
        value="in"
        onChange={handleChange}
        options={options}
      />
    );

    const select = screen.getByRole("combobox", {
      name: "Country",
    });

    await user.selectOptions(select, "us");

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(select).toHaveValue("in");
  });

  it("supports controlled usage with value and onChange - 2", async () => {
    const user = userEvent.setup();

    function TestComponent() {
      const [value, setValue] = useState("us");

      return (
        <Select
          label="Country"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          options={options}
        />
      );
    }

    render(<TestComponent />);

    const select = screen.getByRole("combobox", {
      name: "Country",
    });

    await user.selectOptions(select, "in");

    expect(select).toHaveValue("in");
  });

  it("assosiate helper text with select", () => {
      render(
        <Select
          label="Country"
          helperText="Choose your country"
          options={options}
        />
      );
      const select = screen.getByRole("combobox", { name: "Country" });
      const helperText = screen.getByText("Choose your country");
      expect(select).toHaveAttribute(
        "aria-describedBy",
        helperText.id
      );
  });

  it("mark the select invalid when error is provided", () => {
    render( 
      <Select
        label="Country"
        options={options}
        errorText="Please select a country"
      />
    );
    const select = screen.getByRole("combobox", { name: "Country" });
    const errorText   = screen.getByText("Please select a country");
    expect(select).toHaveAttribute(
      "aria-invalid",
      "true"
    );
      expect(select).toHaveAttribute(
      "aria-describedby", errorText.id
    );
  })
  it("shows error text instead of helper text", () => {
    render(
      <Select
        label="Country"
        options={options}
        helperText="Choose a country"
        errorText="Country is required"
      />
    );
    expect(screen.getByText("Country is required")).toBeInTheDocument();
    expect(screen.queryByText("Choose a country")).not.toBeInTheDocument();
  });

  it("preserve custom class", () => {
    render(
      <Select
        label="Country"
        options={options}
        className="custom-class"
      />
    );
    expect(screen.getByRole("combobox", { name: "Country" }))
      .toHaveClass("select", "custom-class");
  });
});