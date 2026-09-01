import { render, screen } from "@testing-library/react";
import { Switch } from "./Switch"
import userEvent from "@testing-library/user-event";
import { useState } from "react";

describe("Switch", () => {
  it("renders a switch", () => {
    render(
      <Switch />
    );
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("renders the label", () => {
    render(
      <Switch label="Notifications" />
    );
    expect(screen.getByRole(
      "switch", { name: "Notifications" })
    ).toBeInTheDocument();
  });

  it("assosiate the label with switch", () => {
    render(
      <Switch
        label="Notifications"
        id="notifications"
      />
    );
    const switchElm = screen.getByRole("switch", { name: "Notifications" });
    expect(switchElm).toHaveAttribute("id", "notifications");
  });

  it("generate an id when one is not provided", () => {
    render(
      <Switch
        label="Notifications"
      />
    );
    const switchElm = screen.getByRole("switch", { name: "Notifications" });
    expect(switchElm).toHaveAttribute("id");
  });

  it("renders a checkbox input with switch role", () => {
    render(
      <Switch
        label="Notifications"
      />
    );
    const switchElm = screen.getByRole("switch", { name: "Notifications" });
    expect(switchElm).toHaveAttribute("type", "checkbox");
    expect(switchElm).toHaveAttribute("role", "switch");
  });

  it("support defaultChecked for uncontrolled usage", () => {
    render(
      <Switch label="Notifications" defaultChecked />
    );
    expect(
      screen.getByRole("switch", { name: "Notifications" })
    ).toBeChecked();
  });

  it("support uncontrolled interactions", async () => {
    const user = userEvent.setup();
    render(
      <Switch label="Notifications" />
    );
    const switchElm = screen.getByRole("switch", { name: "Notifications" });
    expect(switchElm).not.toBeChecked();
    await user.click(switchElm);
    expect(switchElm).toBeChecked();
  });

  it("supports controlled usage", async () => {
    const user = userEvent.setup();
    const ControlledComponent = () => {
      const [checked, setChecked] = useState(false);

      return (
        <Switch
          label="Notifications"
          checked={checked}
          onChange={(event) => setChecked(event.target.checked)}
        />
      );
    }
    render(<ControlledComponent />);
    const switchElm = screen.getByRole("switch", { name: "Notifications" });

    expect(switchElm).not.toBeChecked();

    await user.click(switchElm);

    expect(switchElm).toBeChecked();

  });

  it("supports keyboard interaction", async () => {
    const user = userEvent.setup();

    render(<Switch label="Notifications" />);

    const switchElm = screen.getByRole("switch", { name: "Notifications" });

    switchElm.focus();

    expect(switchElm).toHaveFocus();

    await user.keyboard(" ");

    expect(switchElm).toBeChecked;
  });

   it("supports disabled state", () => {
    render(
      <Switch
        label="Notifications"
        disabled
      />
    );

    expect(
      screen.getByRole("switch", {
        name: "Notifications",
      })
    ).toBeDisabled();
  });

  it("supports required state", () => {
    render(
      <Switch
        label="Notifications"
        required
      />
    );

    expect(
      screen.getByRole("switch", {
        name: "Notifications",
      })
    ).toBeRequired();
  });

  it("supports native name and value props", () => {
    render(
      <Switch
        label="Notifications"
        name="notifications"
        value="enabled"
      />
    );

    const switchElement = screen.getByRole("switch", {
      name: "Notifications",
    });

    expect(switchElement).toHaveAttribute(
      "name",
      "notifications"
    );

    expect(switchElement).toHaveAttribute(
      "value",
      "enabled"
    );
  });

  it("renders helper text", () => {
    render(
      <Switch
        label="Notifications"
        helperText="Receive email notifications."
      />
    );

    expect(
      screen.getByText(
        "Receive email notifications."
      )
    ).toBeInTheDocument();
  });

  it("associates helper text with the switch", () => {
    render(
      <Switch
        label="Notifications"
        helperText="Receive email notifications."
      />
    );

    const switchElement = screen.getByRole("switch", {
      name: "Notifications",
    });

    const helperText = screen.getByText(
      "Receive email notifications."
    );

    expect(switchElement).toHaveAttribute(
      "aria-describedby",
      helperText.id
    );
  });

  it("renders error text", () => {
    render(
      <Switch
        label="Notifications"
        error="Notifications are required."
      />
    );

    expect(
      screen.getByText(
        "Notifications are required."
      )
    ).toBeInTheDocument();
  });

  it("marks the switch invalid when error is provided", () => {
    render(
      <Switch
        label="Notifications"
        error="Notifications are required."
      />
    );

    expect(
      screen.getByRole("switch", {
        name: "Notifications",
      })
    ).toHaveAttribute(
      "aria-invalid",
      "true"
    );
  });

  it("associates error text with the switch", () => {
    render(
      <Switch
        label="Notifications"
        error="Notifications are required."
      />
    );

    const switchElement = screen.getByRole("switch", {
      name: "Notifications",
    });

    const error = screen.getByText(
      "Notifications are required."
    );

    expect(switchElement).toHaveAttribute(
      "aria-describedby",
      error.id
    );
  });

  it("shows error instead of helper text", () => {
    render(
      <Switch
        label="Notifications"
        helperText="Receive email notifications."
        error="Notifications are required."
      />
    );

    expect(
      screen.getByText(
        "Notifications are required."
      )
    ).toBeInTheDocument();

    expect(
      screen.queryByText(
        "Receive email notifications."
      )
    ).not.toBeInTheDocument();
  });

  it("preserves custom className", () => {
    render(
      <Switch
        label="Notifications"
        className="custom-switch"
      />
    );

    expect(
      screen.getByRole("switch")
    ).toHaveClass(
      "switch",
      "custom-switch"
    );
  });
});