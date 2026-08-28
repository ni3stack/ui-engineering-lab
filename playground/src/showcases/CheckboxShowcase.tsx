import { Checkbox } from "@ui-lab/ui";

export function CheckboxShowcase() {
  return (
    <section className="showcase">
      <header className="showcase-header">
        <h1>Checkbox</h1>

        <p>
          A checkbox component for selecting one or more
          independent options.
        </p>
      </header>

      <section className="showcase-section">
        <h2>Basic</h2>

        <p className="showcase-description">
          A basic checkbox with a label.
        </p>

        <div className="showcase-input-column">
          <Checkbox label="Accept terms and conditions" />
          <Checkbox label="Subscribe to newsletter" />
        </div>
      </section>

      <section className="showcase-section">
        <h2>Checked</h2>

        <p className="showcase-description">
          A checkbox can be rendered with a predefined checked
          state.
        </p>

        <div className="showcase-input-column">
          <Checkbox
            label="Receive email notifications"
            defaultChecked
          />
        </div>
      </section>

      <section className="showcase-section">
        <h2>Helper Text</h2>

        <p className="showcase-description">
          Additional information can be displayed below the
          checkbox.
        </p>

        <div className="showcase-input-column">
          <Checkbox
            label="Enable notifications"
            helperText="You can change this preference later."
          />
        </div>
      </section>

      <section className="showcase-section">
        <h2>Error State</h2>

        <p className="showcase-description">
          Displays validation feedback when the checkbox does
          not satisfy a requirement.
        </p>

        <div className="showcase-input-column">
          <Checkbox
            label="Accept terms and conditions"
            error="You must accept the terms to continue."
          />
        </div>
      </section>

      <section className="showcase-section">
        <h2>States</h2>

        <p className="showcase-description">
          Common checkbox states.
        </p>

        <div className="showcase-input-column">
          <Checkbox label="Unchecked" />
          <Checkbox
            label="Checked"
            defaultChecked
          />
          <Checkbox
            label="Disabled"
            disabled
          />
          <Checkbox
            label="Disabled and checked"
            disabled
            defaultChecked
          />
        </div>
      </section>

      <section className="showcase-section">
        <h2>Required</h2>

        <p className="showcase-description">
          A required checkbox can be used when the user must
          explicitly accept an option.
        </p>

        <div className="showcase-input-column">
          <Checkbox
            label="I agree to the terms and conditions"
            required
          />
        </div>
      </section>
    </section>
  );
}