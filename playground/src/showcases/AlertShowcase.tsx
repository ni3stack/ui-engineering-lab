import { useState } from "react";
import { Alert, Button } from "@ni3stack/ui";

export function AlertShowcase() {
  const [showDismissible, setShowDismissible] = useState(true);

  return (
    <section className="showcase-section">
      <header className="showcase-header">
        <h1>Alert</h1>
        <p className="showcase-description">
          An inline message for communicating status, warnings, and errors.
        </p>
      </header>

      <div className="showcase-group">
        <h2>Variants</h2>

        <div className="showcase-stack">
          <Alert variant="info" heading="Account review">
            Your account is currently under review.
          </Alert>
          <Alert variant="success" heading="Changes saved">
            Your profile has been updated successfully.
          </Alert>
          <Alert variant="warning" heading="Session expiring">
            Your session will expire in five minutes.
          </Alert>
          <Alert assertive variant="error" heading="Unable to save">
            We could not save your changes. Please try again.
          </Alert>
        </div>
      </div>

      <div className="showcase-group">
        <h2>Dismissible</h2>

        {showDismissible ? (
          <Alert
            variant="success"
            heading="Profile complete"
            onDismiss={() => setShowDismissible(false)}
          >
            Your profile is ready to share.
          </Alert>
        ) : (
          <Button onClick={() => setShowDismissible(true)}>Show Alert</Button>
        )}
      </div>
    </section>
  );
}
