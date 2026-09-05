import { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalContent,
  ModalFooter,
} from "@ui-lab/ui";

export function ModalShowcase() {
  const [open, setOpen] = useState(false);
  const [longOpen, setLongOpen] = useState(false);
  const [noCloseOpen, setNoCloseOpen] = useState(false);

  return (
    <section className="showcase-section">
      <h2>Modal</h2>

      <p className="showcase-description">
        Accessible dialog with focus management, keyboard handling,
        scroll locking, and composable sections.
      </p>

      <div className="showcase-row">
        <Button onClick={() => setOpen(true)}>
          Open Modal
        </Button>

        <Button onClick={() => setLongOpen(true)}>
          Long Content
        </Button>

        <Button onClick={() => setNoCloseOpen(true)}>
          Without Close Button
        </Button>
      </div>

      {/* Basic Modal */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <ModalHeader>
          <ModalTitle>Delete account</ModalTitle>
          <ModalDescription>
            This action cannot be undone.
          </ModalDescription>
        </ModalHeader>

        <ModalContent>
          Are you sure you want to permanently delete your account?
        </ModalContent>

        <ModalFooter>
          <Button
            variant="secondary"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>

          <Button variant="danger" onClick={() => setOpen(false)}>
            Delete
          </Button>
        </ModalFooter>
      </Modal>

      {/* Long Content */}
      <Modal
        open={longOpen}
        onClose={() => setLongOpen(false)}
        size="medium"
      >
        <ModalHeader>
          <ModalTitle>Terms and Conditions</ModalTitle>
          <ModalDescription>
            Please review the following information.
          </ModalDescription>
        </ModalHeader>

        <ModalContent>
          {Array.from({ length: 20 }, (_, index) => (
            <p key={index}>
              Paragraph {index + 1}: Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Integer vel sem vitae
              justo tincidunt tincidunt. Donec consequat libero
              vitae malesuada nisl.
            </p>
          ))}
        </ModalContent>

        <ModalFooter>
          <Button
            variant="secondary"
            onClick={() => setLongOpen(false)}
          >
            Cancel
          </Button>

          <Button onClick={() => setLongOpen(false)}>
            Accept
          </Button>
        </ModalFooter>
      </Modal>

      {/* No Close Button */}
      <Modal
        open={noCloseOpen}
        onClose={() => setNoCloseOpen(false)}
        showCloseButton={false}
      >
        <ModalHeader>
          <ModalTitle>Confirmation required</ModalTitle>
          <ModalDescription>
            Use one of the actions below to continue.
          </ModalDescription>
        </ModalHeader>

        <ModalContent>
          This modal intentionally has no top-right close button.
        </ModalContent>

        <ModalFooter>
          <Button
            variant="secondary"
            onClick={() => setNoCloseOpen(false)}
          >
            Cancel
          </Button>

          <Button onClick={() => setNoCloseOpen(false)}>
            Continue
          </Button>
        </ModalFooter>
      </Modal>
    </section>
  );
}