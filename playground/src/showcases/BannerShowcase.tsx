import { useState } from "react";

import { Banner, Button } from "@ni3stack/ui";

export function BannerShowcase() {
  const [showDismissible, setShowDismissible] = useState(true);

  return (
    <section className="showcase-section">
      <header className="showcase-header">
        <h1>Banner</h1>
        <p className="showcase-description">
          A page-level message used to communicate important
          information or status.
        </p>
      </header>

      <div className="showcase-group">
        <h2>Variants</h2>

        <div className="showcase-stack">
          <Banner variant="info">
            Your account is currently under review.
          </Banner>

          <Banner variant="success">
            Your changes have been saved successfully.
          </Banner>

          <Banner variant="warning">
            Your session will expire in 5 minutes.
          </Banner>

          <Banner variant="error">
            We couldn't save your changes. Please try again.
          </Banner>
        </div>
      </div>

      <div className="showcase-group">
        <h2>Dismissible</h2>

        {showDismissible ? (
          <Banner
            variant="success"
            dismissible
            onClose={() => setShowDismissible(false)}
          >
            This banner can be dismissed.
          </Banner>
        ) : (
          <Button onClick={() => setShowDismissible(true)}>
            Show Banner
          </Button>
        )}
      </div>
    </section>
  );
}