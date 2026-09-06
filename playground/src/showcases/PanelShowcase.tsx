import { useState } from "react";

import {
  Button,
  Input,
  Panel,
  PanelContent,
  PanelDescription,
  PanelFooter,
  PanelHeader,
  PanelTitle,
  Textarea,
  type PanelPosition,
  type PanelSize,
} from "@ui-lab/ui";

export function PanelShowcase() {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<PanelPosition>("right");
  const [size, setPanelSize] = useState<PanelSize>("medium");
  const [closeOnBackdrop, setCloseOnBackdrop] = useState(false);
  const [showCloseButton, setShowCloseButton] = useState(false);
  
  return (
    <section className="showcase-section">
      <header className="showcase-header">
        <h1>Panel</h1>
        <p className="showcase-description">
          A configurable drawer that can open from any
          edge of the viewport.
        </p>
      </header>

      <div className="showcase-controls">
        <label>
          Position
          <select
            value={position}
            onChange={(event) => 
              setPosition(
                event.target.value as PanelPosition
              )
            }
          >
            <option value="right">Right</option>
            <option value="left">Left</option>
            <option value="top">Top</option>
            <option value="bottom">Bottom</option>
          </select>
        </label>
        <label>
          Size
          <select
            value={size}
            onChange={(event) => {
              setPanelSize(event.target.value as PanelSize)
            }}
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </label>
        <label className="showcase-checkbox">
          <input
            type="checkbox"
            checked={closeOnBackdrop}
            onChange={(event) => (
              setCloseOnBackdrop(event.target.checked)
            )}
          />
          Close on backdrop
        </label>
        <label className="showcase-checkbox">
          <input
            type="checkbox"
            checked={showCloseButton}
            onChange={(event) =>
              setShowCloseButton(
                event.target.checked
              )
            }
          />
          Show close button
        </label>
      </div>
      <Button onClick={() => setOpen(true)}>Open Panel</Button>
      <Panel 
        open={open}
        onClose={() => setOpen(false)}
        position={position}
        size={size}
        closeOnBackdropClick={closeOnBackdrop}
        showCloseButton={showCloseButton}
      >
        <PanelHeader>
          <PanelTitle>Edit Account</PanelTitle>
          <PanelDescription>
            Update your account information.
          </PanelDescription>
        </PanelHeader>
        <PanelContent>
          <div className="showcase-form">
            <Input
              type="text"
              label="Name"
              defaultValue="John Doe"
              helperText="Enter user name"
            />

            <Input
              type="email"
              label="Email"
              defaultValue="JohnDoe@gmail.com"
              helperText="Enter user email address"
            />

            <Textarea
              label="Description"
              defaultValue="Account description..."
              rows={8}
              helperText="Enter account description"
            />
            <p>
              This content is intentionally long so we
              can verify that only the PanelContent area
              scrolls while the header and footer remain
              fixed.
            </p>

            <p>
              Additional content to verify scrolling.
            </p>

            <p>
              Additional content to verify scrolling.
            </p>

            <p>
              Additional content to verify scrolling.
            </p>
          </div>
        </PanelContent>
        <PanelFooter>
          <Button
            variant="secondary"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              // Consumer-controlled action
              setOpen(false);
            }}
          >
          Save
        </Button>
        </PanelFooter>
      </Panel>
    </section>
  );
}