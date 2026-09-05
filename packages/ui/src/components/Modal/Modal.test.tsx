import { render, screen } from "@testing-library/react";
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalContent,
  ModalFooter,
} from "./index";
import { Button } from "../Button/Button";
import userEvent from "@testing-library/user-event";
import { useState } from "react";

describe("Modal", () => {
  describe("Modal", () => {
    it("does not render when closed", () => {
      render(
        <Modal open={false} onClose={() => {}}>
          Modal Content
        </Modal>
      );
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("render when open", () => {
      render(
        <Modal onClose={() => {}} open>
          Modal Content
        </Modal>
      );
      expect(screen.getByRole("dialog")).toBeInTheDocument();
      expect(screen.getByText("Modal Content")).toBeInTheDocument();
    });

    it("renders the complete modal composition", () => {
      render(
        <Modal open onClose={() => {}}>
          <ModalHeader>
            <ModalTitle>Delete account</ModalTitle>
            <ModalDescription>This Action can not be undone</ModalDescription>
          </ModalHeader>
          <ModalContent>
            Are you sure, you want to delete this item ?
          </ModalContent>
          <ModalFooter>
            <Button variant="secondary">Cancel</Button>
            <Button variant="danger">Delete</Button>
          </ModalFooter>
        </Modal>
      );
      expect(screen.getByRole("heading", { name: "Delete account" })).toBeInTheDocument();
      expect(screen.getByText("This Action can not be undone")).toBeInTheDocument();
      expect(screen.getByText("Are you sure, you want to delete this item ?")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Delete"})).toBeInTheDocument();
    });

    it("renders the close button by default", () => {
      render(
        <Modal open onClose={() => {}} >
          Modal content
        </Modal>
      );
      expect(screen.getByRole("button", {name: "Close"})).toBeInTheDocument();
    });

    it("does not render the close button when disabled", () => {
      render(
        <Modal open onClose={() => {}} showCloseButton={false}>
            Chaldiren outhput
        </Modal>
      );
      expect(screen.queryByRole("button", {"name":"Close"}))
        .not.toBeInTheDocument();
    }
  )
  });
  describe("Close Behavior", () => {
    let user: ReturnType<typeof userEvent.setup>;
    beforeEach(() => {
      user = userEvent.setup();
    });
  
    it("calls onClose when close button is clicked", async () => {
      const onClose = jest.fn();
      render(
        <Modal open onClose={onClose}>
          Modal Content
        </Modal>
      );
      await user.click(
        screen.getByRole("button", { name:"Close" })
      );
      expect(onClose).toHaveBeenCalledTimes(1)
    });

    it("calls onClose when escape is clicked", async() => {
        const onClose = jest.fn();
        render(
          <Modal open onClose={onClose}>
            Modal Content
          </Modal>
        );
        await user.keyboard("{Escape}");
        expect(onClose).toHaveBeenCalledTimes(1)
    });

    it("does not close on Escape when closeOnEscape is false", async () => {
      const user = userEvent.setup();
      const onClose = jest.fn();

      render(
        <Modal
          open
          onClose={onClose}
          closeOnEscape={false}
        >
          Modal content
        </Modal>
      );

      await user.keyboard("{Escape}");

      expect(onClose).not.toHaveBeenCalled();
    });

    it("does not close when the backdrop is clicked by default", async() => {
        const onClose = jest.fn();
        render(
          <Modal
            open
            onClose={onClose}
          >
            Modal Content
          </Modal>
        );
        const dialog = screen.getByRole("dialog");
        const backDrop = dialog.parentElement;

        expect(backDrop).toHaveClass("modal-overlay");
        await user.click(backDrop!)
        expect(onClose).not.toHaveBeenCalled();
    });
    it("closes when the backdrop is clicked and closeOnBackdropClick is true", async () => {
      const onClose = jest.fn();

      render(
        <Modal
          open
          onClose={onClose}
          closeOnBackdropClick
        >
          Modal content
        </Modal>
      );

      const dialog = screen.getByRole("dialog");
      const backdrop = dialog.parentElement;

      await user.click(backdrop!);

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("does not close when clicking inside the dialog", async () => {
      const user = userEvent.setup();
      const onClose = jest.fn();

      render(
        <Modal
          open
          onClose={onClose}
          closeOnBackdropClick
        >
          <button type="button">Inside</button>
        </Modal>
      );

      await user.click(
        screen.getByRole("button", { name: "Inside" })
      );

      expect(onClose).not.toHaveBeenCalled();
    });

    it("associates the dialog with its title", () => {
      render(
        <Modal open onClose={jest.fn()}>
          <ModalTitle>Delete account</ModalTitle>
        </Modal>
      );

      const dialog = screen.getByRole("dialog");
      const title = screen.getByRole("heading", {
        name: "Delete account",
      });

      expect(dialog).toHaveAttribute(
        "aria-labelledby",
        title.id
      );
    });
    it("associates the dialog with its description", () => {
      render(
        <Modal open onClose={jest.fn()}>
          <ModalDescription>
            This action cannot be undone.
          </ModalDescription>
        </Modal>
      );

      const dialog = screen.getByRole("dialog");
      const description = screen.getByText(
        "This action cannot be undone."
      );

      expect(dialog).toHaveAttribute(
        "aria-describedby",
        description.id
      );
    });
    it("requires an accessible title", () => {
      render(
        <Modal open onClose={jest.fn()}>
          <ModalTitle>Delete account</ModalTitle>
        </Modal>
      );

      const dialog = screen.getByRole("dialog");
      const title = screen.getByRole("heading", {
        name: "Delete account",
      });

      expect(dialog).toHaveAttribute(
        "aria-labelledby",
        title.id
      );
    });

    it("does not set aria-describedby without a description", () => {
      render(
        <Modal open onClose={jest.fn()}>
          <ModalTitle>Delete account</ModalTitle>
        </Modal>
      );

      expect(screen.getByRole("dialog"))
        .not.toHaveAttribute("aria-describedby");
    });
  });
  describe("Modal Focus", ()=> {
    let user: ReturnType<typeof userEvent.setup>;
    beforeEach(() => {
      user = userEvent.setup();
    });
    it("moves focus to the first focusable element when opened", () => {
      render(
        <Modal open onClose={jest.fn()}>
          <ModalTitle>Delete account</ModalTitle>

          <ModalFooter>
            <button type="button">Cancel</button>
            <button type="button">Delete</button>
          </ModalFooter>
        </Modal>
      );

      expect(
        screen.getByRole("button", { name: "Close" })
      ).toHaveFocus();
    });

    it("does not throw when there are no focusable elements", () => {
      expect(() => {
        render(
          <Modal
            open
            onClose={jest.fn()}
            showCloseButton={false}
          >
            <ModalTitle>Information</ModalTitle>
            <ModalContent>
              This modal has no interactive elements.
            </ModalContent>
          </Modal>
        );
      }).not.toThrow();
    });

    it("restore focus to the previously focused element when closed", async() => {
      function TestComponent() {

        const [open, setOpen] = useState(false);
        return (
          <>
            <div>
              <Button onClick={() => setOpen(!open)}>Open Modal</Button>
            </div>
            <Modal open={open} onClose={() => setOpen(!open)}>
              <ModalHeader>
                <ModalTitle>
                  Delete Account
                </ModalTitle>
              </ModalHeader>
              <ModalContent>
                Are you sure ?
              </ModalContent>
            </Modal>
          </>
        )
      }

      render(<TestComponent />);
      const openButton = screen.getByRole("button", { name: "Open Modal" });
      openButton.focus();
      await user.click(openButton);

      const closeButton = screen.getByRole("button", { name: "Close" });

      expect(closeButton).toHaveFocus();

      await user.click(closeButton)
 
      expect(openButton).toHaveFocus();
    });

    it("keep focus inside modal when tabbing forward", async() => {
      render(
        <Modal open onClose={jest.fn()}>
            <ModalHeader>
              <ModalTitle>Test</ModalTitle>
            </ModalHeader>
            <ModalContent>
              Test Content
            </ModalContent>
            <ModalFooter>
              <Button variant="secondary">Cancel</Button>
              <Button variant="danger">Delete</Button>
            </ModalFooter>
        </Modal>
      );
      const closeBtn = screen.getByRole("button", {name: "Close"});
      const cancelBtn = screen.getByRole("button", {name: "Cancel"});
      const deleteBtn = screen.getByRole("button", {name: "Delete"});

      expect(closeBtn).toHaveFocus();
      await user.tab();
      expect(cancelBtn).toHaveFocus();
      await user.tab();
      expect(deleteBtn).toHaveFocus();
      await user.tab();
      expect(closeBtn).toHaveFocus();
    });

    it("focuses the dialog when there are no focusable elements", () => {
      render(
        <Modal
          open
          onClose={jest.fn()}
          showCloseButton={false}
        >
          <ModalTitle>Information</ModalTitle>

          <ModalContent>
            This modal has no interactive elements.
          </ModalContent>
        </Modal>
      );
      const dialog = screen.getByRole("dialog");

      expect(dialog).toHaveAttribute("tabindex", "-1");

      expect(dialog).toHaveFocus();
      expect(screen.getByRole("dialog")).toHaveFocus();
    });

    it("locks the body scroll when opned", () => {
      render(
        <Modal open onClose={jest.fn()}>
            <ModalHeader>
              <ModalTitle>Confirmation</ModalTitle>
            </ModalHeader>
        </Modal>
      )
      expect(document.body.style.overflow).toBe("hidden");
    });

    it("restore the body scroll when modal is closed", async() => {
      const  TestComponent = () => {
        const [open, setOpen] = useState(true);

        return (
           <>
              <button onClick={() => setOpen(false)}>
                Close Modal
              </button>

              <Modal
                open={open}
                onClose={() => setOpen(false)}
              >
                <ModalTitle>Delete account</ModalTitle>
              </Modal>
            </>
        );
      }
      render(<TestComponent />);
      expect(document.body.style.overflow).toBe("hidden");
      await user.click(
        screen.getByRole("button", { name: "Close Modal"})
      );
      expect(document.body.style.overflow).toBe("");
    });

    it("restores the existing body overflow value", () => {
      document.body.style.overflow = "auto";

      const { unmount } = render(
        <Modal open onClose={jest.fn()}>
          <ModalTitle>Delete account</ModalTitle>
        </Modal>
      );

      expect(document.body.style.overflow).toBe("hidden");

      unmount();

      expect(document.body.style.overflow).toBe("auto");
    });

    it("restores focus when the modal unmounts while open", () => {
      const outsideButton = document.createElement("button");
      outsideButton.textContent = "Outside";
      document.body.appendChild(outsideButton);

      outsideButton.focus();

      const { unmount } = render(
        <Modal open onClose={jest.fn()}>
          <ModalTitle>Delete account</ModalTitle>
        </Modal>
      );

      // Focus should have moved into the modal
      expect(document.activeElement).not.toBe(outsideButton);

      // Modal is removed while still open
      unmount();

      // Focus should return to the element that was focused before opening
      expect(document.activeElement).toBe(outsideButton);

      outsideButton.remove();
    });
  });
});