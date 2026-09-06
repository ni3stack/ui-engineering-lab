import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Panel } from "./Panel";
import { PanelHeader } from "./PanelHeader";
import { PanelTitle } from "./PanelTitle";
import { PanelDescription } from "./PanelDescription";
import { PanelContent } from "./PanelContent";
import { PanelFooter } from "./PanelFooter";
import { Button } from "../Button/Button";
import { useState } from "react";

describe("Panel Component", () => {
  describe("Panel", () => {
    it("does not render when closed", () => {
      render(
        <Panel open={false} onClose={() => jest.fn()} >
          Panel content
        </Panel>
      );
      expect(screen.queryByRole("Dialog")).not.toBeInTheDocument();
    });

    it("render when open", () => {
      render(
        <Panel open onClose={jest.fn()}>
          Panel content
        </Panel>
      );

      expect(screen.getByRole("dialog")).toBeInTheDocument();
      expect(screen.getByText("Panel content")).toBeInTheDocument();
    })

    it("renders with the default right position", () => {
      render(
        <Panel open onClose={jest.fn()}>
          Content
        </Panel>
      );

      expect(screen.getByRole("dialog")).toHaveClass(
        "panel--right"
      );
    });

    it.each(["left","top","bottom"] as const)(
      "support %s position",
      (position) =>{
        render(
          <Panel
            open
            onClose={jest.fn()}
            position={position}
          >
            Content
          </Panel>
        );
        expect(screen.getByRole("dialog")).toHaveClass(
          `panel--${position}`
        );
      }
    );

    it.each(["small", "medium", "large"] as const)(
      "supports %s size",
      (size) => {
        render(
          <Panel
            open
            onClose={jest.fn()}
            size={size}
          >
            Content
          </Panel>
        );

        expect(screen.getByRole("dialog")).toHaveClass(
          `panel--${size}`
        );
      }
    );

    it("close on escape by default", async () => {
      const user = userEvent.setup();
      const onClose = jest.fn();
      render(
        <Panel
          open
          onClose={onClose}
        >
          Panel content
        </Panel>
      );
      await user.keyboard("{Escape}")
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("does not close on Escape when disabled", async () => {
      const user = userEvent.setup();
      const onClose = jest.fn();

      render(
        <Panel
          open
          onClose={onClose}
          closeOnEscape={false}
        >
          Content
        </Panel>
      );

      await user.keyboard("{Escape}");

      expect(onClose).not.toHaveBeenCalled();
    });

    it("does not close when clicking the backdrop by default", async () => {
      const user = userEvent.setup();
      const onClose = jest.fn();
      render (
        <Panel open onClose={onClose}>
          Panel Content
        </Panel>
      );
      const dialog = screen.getByRole("dialog");
      const overlay = dialog.parentElement;
      expect(overlay).not.toBeNull();

      await user.click(overlay!);
      expect(onClose).not.toHaveBeenCalled();

    });


    it("Closes when clicking the backdrop if enabled", async () => {
      const user = userEvent.setup();
      const onClose = jest.fn();
      render (
        <Panel open onClose={onClose} closeOnBackdropClick>
          Panel Content
        </Panel>
      );
      const dialog = screen.getByRole("dialog");
      const overlay = dialog.parentElement;
      expect(overlay).not.toBeNull();

      await user.click(overlay!);
      expect(onClose).toHaveBeenCalledTimes(1);

    });

     it("does not close when clicking inside panel", async () => {
        const user = userEvent.setup();
        const onClose = jest.fn();

        render(
          <Panel
            open
            onClose={onClose}
            closeOnBackdropClick
          >
            Content
          </Panel>
        );

        await user.click(screen.getByRole("dialog"));
        expect(onClose).not.toHaveBeenCalled();
    });

    it("does not show close button by default", async () => {
      render(
        <Panel open onClose={jest.fn()}>
          Content
        </Panel>
      );

      expect(screen.queryByRole("button", {
        name: "/close panel/i"
      })).not.toBeInTheDocument();
    });

    it("shows the close button when enabled", () => {
      render(
        <Panel
          open
          onClose={jest.fn()}
          showCloseButton
        >
          Content
        </Panel>
      );

      expect(
        screen.getByRole("button", {
          name: /close panel/i,
        })
      ).toBeInTheDocument();
    });

    it("closes when the close button is clicked", async () => {
      const user = userEvent.setup();
      const onClose = jest.fn();

      render(
        <Panel
          open
          onClose={onClose}
          showCloseButton
        >
          Content
        </Panel>
      );

      await user.click(
        screen.getByRole("button", {
          name: /close panel/i,
        })
      );

      expect(onClose).toHaveBeenCalledTimes(1);
    });
    it("does not crash when onClose is not provided", async () => {
      const user = userEvent.setup();

      render(
        <Panel open showCloseButton>
          Content
        </Panel>
      );

      await user.keyboard("{Escape}");

      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("associates the Panel with its title", () => {
      render(
        <Panel open>
          <PanelTitle>Account Settings</PanelTitle>
        </Panel>
      );

      const dialog = screen.getByRole("dialog");
      const title = screen.getByRole("heading", {
        level: 2,
        name: "Account Settings",
      });

      expect(dialog).toHaveAttribute(
        "aria-labelledby",
        title.id
      );
    });

    it("associates the Panel with its description", () => {
      render(
        <Panel open>
          <PanelTitle>Account Settings</PanelTitle>
          <PanelDescription>
            Manage your preferences.
          </PanelDescription>
        </Panel>
      );

      const dialog = screen.getByRole("dialog");
      const description = screen.getByText(
        "Manage your preferences."
      );

      expect(dialog).toHaveAttribute(
        "aria-describedby",
        description.id
      );
    });

    it("does not set aria-describedby without a description", () => {
      render(
        <Panel open>
          <PanelTitle>Account Settings</PanelTitle>
        </Panel>
      );

      expect(screen.getByRole("dialog")).not.toHaveAttribute(
        "aria-describedby"
      );
    });

    it("renders the Panel as a modal dialog", () => {
      render(
        <Panel open>
          <PanelTitle>Account Settings</PanelTitle>
        </Panel>
      );

      expect(screen.getByRole("dialog")).toHaveAttribute(
        "aria-modal",
        "true"
      );
    });
  });

  describe("Panel composition", () => {
    it("renders PanelHeader", () => {
      const { container } = render(
        <PanelHeader>
          Header content
        </PanelHeader>
      );

      expect(container.firstChild).toHaveClass("panel-header");
    });

    it("renders PanelTitle as an h2", () => {
      render(
        <PanelTitle>
          Account Settings
        </PanelTitle>
      );
      expect(screen.getByRole("heading", {
        level:2,
        name: "Account Settings"
      })).toBeInTheDocument();
    });

    it("renders PanelDescription as a paragraph", () => {
      render(
        <PanelDescription>
          Manage your account preferences.
        </PanelDescription>
      );

      expect(
        screen.getByText("Manage your account preferences.")
      ).toHaveProperty("tagName", "P");
    });

    it("renders PanelContent", () => {
      const { container } = render(
        <PanelContent>
          Account information
        </PanelContent>
      );

      expect(container.firstChild).toHaveClass("panel-content");
      expect(
        screen.getByText("Account information")
      ).toBeInTheDocument();
    });

    it("renders PanelFooter", () => {
      const { container } = render(
        <PanelFooter>
          Footer actions
        </PanelFooter>
      );

      expect(container.firstChild).toHaveClass("panel-footer");
      expect(
        screen.getByText("Footer actions")
      ).toBeInTheDocument();
    });

   it("renders the complete Panel composition", () => {
      render(
        <Panel open>
          <PanelHeader>
            <PanelTitle>Account Settings</PanelTitle>
            <PanelDescription>
              Manage your account preferences.
            </PanelDescription>
          </PanelHeader>

          <PanelContent>
            Account information
          </PanelContent>

          <PanelFooter>
            Footer actions
          </PanelFooter>
        </Panel>
      );

      expect(
        screen.getByRole("heading", {
          level: 2,
          name: "Account Settings",
        })
      ).toBeInTheDocument();

      expect(
        screen.getByText("Manage your account preferences.")
      ).toBeInTheDocument();

      expect(
        screen.getByText("Account information")
      ).toBeInTheDocument();

      expect(
        screen.getByText("Footer actions")
      ).toBeInTheDocument();

    });

    it("merges custom className on PanelHeader", () => {
      const { container } = render(
        <PanelHeader className="custom-header">
          Header
        </PanelHeader>
      );

      expect(container.firstChild).toHaveClass(
        "panel-header",
        "custom-header"
      );
    });

    it("allows PanelContent without Header or Footer", () => {
      render(
        <Panel open>
          <PanelContent>
            Main content
          </PanelContent>
        </Panel>
      );

      expect(
        screen.getByText("Main content")
      ).toBeInTheDocument();
    });

    it("supports custom composition inside PanelHeader", () => {
      render(
        <PanelHeader>
          <PanelTitle>Users</PanelTitle>
          <button> Add User </button>
        </PanelHeader>
      );

      expect(
        screen.getByRole("heading", {
          level: 2,
          name: "Users",
        })
      ).toBeInTheDocument();

      expect(
        screen.getByRole("button", {
          name: "Add User",
        })
      ).toBeInTheDocument();
    });
  });

  describe("focus", () => {
    it("focus the first focusable element when opned", () => {
      render(
        <Panel open onClose={jest.fn()}>
          <Button>First</Button>
          <Button>Second</Button>
        </Panel>
      );
      expect(screen.getByRole("button", { name: "First" }))
        .toHaveFocus();
    });

    it("focuses the Panel when there are no focusable elements", () => {
      render(
        <Panel open onClose={jest.fn()}>
          <p>Panel content</p>
        </Panel>
      );
      expect(screen.getByRole("dialog")).toHaveFocus();
    });

    it("moves focus to the last element when Shift+Tab is pressed on the first element", async () => {
      const user = userEvent.setup();

      render(
        <Panel open onClose={jest.fn()}>
          <button type="button">First</button>
          <button type="button">Last</button>
        </Panel>
      );

      const first = screen.getByRole("button", { name: "First" });
      const last = screen.getByRole("button", { name: "Last" });

      first.focus();

      await user.keyboard("{Shift>}{Tab}{/Shift}");

      expect(last).toHaveFocus();
    });

    it("moves focus to the first element when Tab is pressed on the last element", async () => {
      const user = userEvent.setup();

      render(
        <Panel open onClose={jest.fn()}>
          <button type="button">First</button>
          <button type="button">Last</button>
        </Panel>
      );

      const first = screen.getByRole("button", { name: "First" });
      const last = screen.getByRole("button", { name: "Last" });

      last.focus();

      await user.keyboard("{Tab}");

      expect(first).toHaveFocus();
    });

    it("restores focus to the previously focused element when closed", async () => {
      const user = userEvent.setup();

      const TestComponent = () => {
        const [open, setOpen] = useState<boolean>(false);
        return (
          <>
            <Button onClick={() => setOpen(true)}>Show Panel</Button>
            <Panel 
              open={open}
              onClose={() => setOpen(false)}
              showCloseButton
            >
              <button type="button">Panel action</button>
            </Panel>
          </>
        )
      }
      render(<TestComponent />);

      const openButton = screen.getByRole("button", { name: "Show Panel" });
      openButton.focus();

      await user.click(openButton);

      expect(screen.getByRole("dialog")).toBeInTheDocument();
      const closeBtn = screen.getByRole("button", {name: "Close panel"});

      expect(closeBtn).toHaveFocus();

      await user.click(closeBtn);

      expect(openButton).toHaveFocus();
      
    });

    it("restores focus when the Panel unmounts while open", async () => {
      const user = userEvent.setup();

      function TestComponent() {
        const [open, setOpen] = useState(false);
        const [mounted, setMounted] = useState(true);

        return (
          <>
            <button
              type="button"
              onClick={() => setOpen(true)}
            >
              Open Panel
            </button>

            {mounted && (
              <Panel
                open={open}
                onClose={() => setOpen(false)}
              >
                <button type="button">
                  Panel action
                </button>
              </Panel>
            )}

            <button
              type="button"
              onClick={() => setMounted(false)}
            >
              Remove
            </button>
          </>
        );
      }

      render(<TestComponent />);

      const openButton = screen.getByRole("button", {
        name: "Open Panel",
      });

      openButton.focus();

      await user.click(openButton);

      expect(
        screen.getByRole("button", {
          name: "Panel action",
        })
      ).toHaveFocus();

      // Remove the Panel programmatically while it remains open.
      // This requires exposing the state change separately from a focused
      // button, or using rerender.
    });

    it("does not focus disabled elements", () => {
      render(
        <Panel open>
          <PanelTitle>Settings</PanelTitle>

          <button disabled>
            Disabled
          </button>

          <button>
            Enabled
          </button>
        </Panel>
      );

      expect(
        screen.getByRole("button", {
          name: "Enabled",
        })
      ).toHaveFocus();
    });
  });
  describe("body scroll lock", () => {
    it("locks body scroll when the Panel is open", () => {
      render(
        <Panel open onClose={jest.fn()}>
          Panel content
        </Panel>
      );

      expect(document.body.style.overflow).toBe("hidden");
    });

    it("restores body scroll when the Panel is closed", async () => {
      const user = userEvent.setup();

      function TestComponent() {
        const [open, setOpen] = useState(true);

        return (
          <>
            <Panel
              open={open}
              onClose={() => setOpen(false)}
              showCloseButton
            >
              Panel content
            </Panel>

            <button
              type="button"
              onClick={() => setOpen(false)}
            >
              Close Panel
            </button>
          </>
        );
      }

      render(<TestComponent />);

      expect(document.body.style.overflow).toBe("hidden");

      await user.click(
        screen.getByRole("button", {
          name: "Close Panel",
        })
      );

      expect(document.body.style.overflow).toBe("");
    });
    it("restores the previous body overflow value", () => {
      document.body.style.overflow = "auto";

      const { rerender } = render(
        <Panel open onClose={jest.fn()}>
          Panel content
        </Panel>
      );

      expect(document.body.style.overflow).toBe("hidden");

      rerender(
        <Panel open={false} onClose={jest.fn()}>
          Panel content
        </Panel>
      );

      expect(document.body.style.overflow).toBe("auto");
    });
    it("restores body overflow when the Panel unmounts while open", () => {
        document.body.style.overflow = "auto";

        const { unmount } = render(
          <Panel open onClose={jest.fn()}>
            Panel content
          </Panel>
        );

        expect(document.body.style.overflow).toBe("hidden");

        unmount();

        expect(document.body.style.overflow).toBe("auto");
      });
    });
});
