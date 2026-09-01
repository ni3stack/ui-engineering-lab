import { Switch } from "@ui-lab/ui";

export function SwitchShowcase() {
  return (
    <section className="showcase">
      <header className="showcase-header">
        <h1>Switch</h1>

        <p>
          A switch component for toggling between two
          states.
        </p>
      </header>

      <section className="showcase-section">
        <h2>Basic</h2>

        <p className="showcase-description">
          A basic switch for enabling or disabling an option.
        </p>

        <div className="showcase-input-column">
          <Switch
            label="Notifications"
            name="notifications"
          />
        </div>
      </section>

      <section className="showcase-section">
        <h2>Sizes</h2>

        <p className="showcase-description">
          Choose a switch size based on the surrounding
          context.
        </p>

        <div className="showcase-input-column">
          <Switch
            label="Small"
            switchSize="small"
            defaultChecked
          />

          <Switch
            label="Medium"
            switchSize="medium"
            defaultChecked
          />

          <Switch
            label="Large"
            switchSize="large"
            defaultChecked
          />
        </div>
      </section>

      <section className="showcase-section">
        <h2>States</h2>

        <p className="showcase-description">
          Common switch states.
        </p>

        <div className="showcase-input-column">
          <Switch
            label="Unchecked"
          />

          <Switch
            label="Checked"
            defaultChecked
          />

          <Switch
            label="Disabled"
            disabled
          />

          <Switch
            label="Disabled and checked"
            disabled
            defaultChecked
          />
        </div>
      </section>

      <section className="showcase-section">
        <h2>Helper Text</h2>

        <p className="showcase-description">
          Additional information can be displayed below the
          switch.
        </p>

        <div className="showcase-input-column">
          <Switch
            label="Email notifications"
            helperText="Receive notifications when important events occur."
            defaultChecked
          />
        </div>
      </section>

      <section className="showcase-section">
        <h2>Error State</h2>

        <p className="showcase-description">
          Displays validation feedback when the switch does
          not satisfy a requirement.
        </p>

        <div className="showcase-input-column">
          <Switch
            label="Accept notifications"
            error="You must enable notifications to continue."
          />
        </div>
      </section>
    </section>
  );
}