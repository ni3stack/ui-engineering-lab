import { fireEvent, render, screen } from "@testing-library/react";
import { Popover } from "./Popover";
import { Button } from "../Button/Button";
import { useState } from "react";

describe("Popover", () => {
  it("renders the trigger", () => {
    render(
      <Popover>
        <Popover.Trigger>
          <Button>Open Popover</Button>
        </Popover.Trigger>
        <Popover.Content>
          Popover content
        </Popover.Content>
      </Popover>
    );
    expect(screen.getByRole("button", { name: "Open Popover"}))
      .toBeInTheDocument();
    
    expect(screen.queryByText("Popover content")).not.toBeInTheDocument();
  });

  it("opens the popover when trigger is clicked", () => {
    render(
      <Popover>
        <Popover.Trigger>
          <Button>Open Popover</Button>
        </Popover.Trigger>
        <Popover.Content>
          Popover content
        </Popover.Content>
      </Popover>
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Open Popover" })
    );
    expect(screen.getByText("Popover content")).toBeInTheDocument();
  });

  it("toggles the popover when trigger is clicked", () => {
    render(
      <Popover>
        <Popover.Trigger>
          <button type="button">Open popover</button>
        </Popover.Trigger>

        <Popover.Content>
          Popover content
        </Popover.Content>
      </Popover>
    );

    const trigger = screen.getByRole("button", {
      name: "Open popover",
    });

    fireEvent.click(trigger);

    expect(
      screen.getByText("Popover content")
    ).toBeInTheDocument();

    fireEvent.click(trigger);

    expect(
      screen.queryByText("Popover content")
    ).not.toBeInTheDocument();
  });

  it("closes the popover when clicking outside", () => {
    render(
      <div>
        <button type="button">Outside</button>

        <Popover>
          <Popover.Trigger>
            <button type="button">Open popover</button>
          </Popover.Trigger>

          <Popover.Content>
            Popover content
          </Popover.Content>
        </Popover>
      </div>
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Open popover" })
    );

    expect(
      screen.getByText("Popover content")
    ).toBeInTheDocument();

    fireEvent.pointerDown(
      screen.getByRole("button", { name: "Outside" })
    );

    expect(
      screen.queryByText("Popover content")
    ).not.toBeInTheDocument();
  });

  it("does not close when clicking inside the popover", () => {
    render(
      <Popover>
        <Popover.Trigger>
          <button type="button">Open popover</button>
        </Popover.Trigger>

        <Popover.Content>
          <button type="button">Settings</button>
        </Popover.Content>
      </Popover>
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Open popover"})
    );

    const content = screen.getByRole("button", {name:"Settings"});

    expect(content).toBeInTheDocument();

    fireEvent.pointerDown(content);

    expect(content).toBeInTheDocument();
  });

  it("closes on Escape and restores focus to trigger", () => {
    render(
      <Popover>
        <Popover.Trigger>
          <button type="button">Open popover</button>
        </Popover.Trigger>

        <Popover.Content>
          Popover content
        </Popover.Content>
      </Popover>
    );

    const trigger = screen.getByRole("button", {
      name: "Open popover",
    });

    fireEvent.click(trigger);

    fireEvent.keyDown(document, {
      key: "Escape",
    });

    expect(
      screen.queryByText("Popover content")
    ).not.toBeInTheDocument();

    expect(trigger).toHaveFocus();
  });

  it("preserves the trigger's existing onClick", () => {
    const handleClick = jest.fn();

    render(
      <Popover>
        <Popover.Trigger>
          <button type="button" onClick={handleClick}>
            Open popover
          </button>
        </Popover.Trigger>

        <Popover.Content>
          Popover content
        </Popover.Content>
      </Popover>
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Open popover" })
    );

    expect(handleClick).toHaveBeenCalledTimes(1);

    expect(
      screen.getByText("Popover content")
    ).toBeInTheDocument();
  });

  it("does not open when trigger prevents default", () => {
    render(
      <Popover>
        <Popover.Trigger>
          <button
            type="button"
            onClick={(event) => event.preventDefault()}
          >
            Open popover
          </button>
        </Popover.Trigger>

        <Popover.Content>
          Popover content
        </Popover.Content>
      </Popover>
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Open popover" })
    );

    expect(
      screen.queryByText("Popover content")
    ).not.toBeInTheDocument();
  });

  it("supports controlled state", () => {
    const handleOpenChange = jest.fn();

    render(
      <Popover
        open={false}
        onOpenChange={handleOpenChange}
      >
        <Popover.Trigger>
          <button type="button">Open popover</button>
        </Popover.Trigger>

        <Popover.Content>
          Popover content
        </Popover.Content>
      </Popover>
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Open popover" })
    );

    expect(handleOpenChange).toHaveBeenCalledWith(true);

    // Parent still owns open=false, so Popover stays closed.
    expect(
      screen.queryByText("Popover content")
    ).not.toBeInTheDocument();
  });
  it("supports controlled open state", () => {

    function ControlledPopover() {
      const [open, setOpen] = useState(false);

      return (
        <Popover
          open={open}
          onOpenChange={setOpen}
        >
          <Popover.Trigger>
            <button type="button">User Menu</button>
          </Popover.Trigger>

          <Popover.Content>
            Controlled content
          </Popover.Content>
        </Popover>
      );
    }
    render(<ControlledPopover />);

    const trigger = screen.getByRole("button", {
      name: "User Menu",
    });

    // Parent state starts false
    expect(
      screen.queryByText("Controlled content")
    ).not.toBeInTheDocument();

    // Trigger asks parent to change open
    fireEvent.click(trigger);

    // Parent updates state → open={true}
    expect(
      screen.getByText("Controlled content")
    ).toBeInTheDocument();

    // Trigger asks parent to close
    fireEvent.click(trigger);

    expect(
      screen.queryByText("Controlled content")
    ).not.toBeInTheDocument();
  });
});