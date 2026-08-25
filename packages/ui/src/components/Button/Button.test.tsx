import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";


describe("Button", () => {
  it("renders a button with its children", () => {
    render(<Button>Save</Button>);
    expect(
        screen.getByRole("button", { name: "Save" })
    ).toBeInTheDocument();
  });

  it("supports native button attributes", () => {
    render(
      <Button
       type="submit"
       disabled
       aria-label="Save"
      >
        Save
      </Button>
    )
    const button = screen.getByRole("button", {
      name: "Save"
    });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("type", "submit");
  });

  it("handle click events", async () => {
    const handleClick = jest.fn();
    render(
      <Button onClick={handleClick}>
        Save
      </Button>
    );
    await userEvent.click(
      screen.getByRole("button", {name: "Save"}), 
    );
    expect(handleClick).toHaveBeenCalledTimes(1);
    
  });
  it("applies the correct variant", () => {
    render(<Button variant="primary">Save</Button>);

    expect(screen.getByRole("button", {
      name: "Save"
    })).toHaveClass("button--primary");
  });

  it("preserves custom classname", () => {
    render(<Button className="my-button">Save</Button>);
    const btn = screen.getByRole("button", {
      name: "Save"
    });
    expect(btn).toHaveClass("button button--primary my-button");
  });

  it("applies the correct size", () => {
    render(
      <Button size="large">Save</Button>
    );
    expect(screen.getByRole("button", {
      name: "Save"
    })).toHaveClass("button--large");
  });

  it("uses primary variant and medium size by default", () => {
    render(<Button>Save</Button>);
    const button = screen.getByRole("button", { name : "Save" });
    expect(button).toHaveClass(
      "button",
      "button--primary",
      "button--medium"
    )
  });

  it("disables the button while loading", () => {
    render(
      <Button loading>Save</Button>
    );
    const button = screen.getByRole("button", {
      name: "Save"
    });
    expect(button).toBeDisabled();
  });

  it("does not trigger click while loading", async () => {
    const handleClick = jest.fn();
    render(
      <Button loading onClick={handleClick}>Save</Button>
    );
    const button = screen.getByRole("button", {
      name: "Save"
    });
    await userEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
});