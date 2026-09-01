import { Radio } from "@ui-lab/ui";

export function RadioShowcase() {
  return (
    <div className="showcase">
        <header className="showcase-header">
            <h1>Radio</h1>
            <p className="showcase-description">
                A radio button is a graphical control element that allows the user to select only one option from a set of mutually exclusive options.
            </p>
        </header>

        <section className="showcase-section">
            <h2>Basic Usage</h2>
            <p className="showcase-description">
                Radio buttons with the same name form a mutually
                exclusive group.
            </p>
            <div className="showcase-input-column">
                <Radio name="country" label="India" value="india" />
                <Radio name="country" label="USA" value="usa" />
                <Radio name="country" label="Canada" value="canada" />
            </div>
        </section>

        <section className="showcase-section">
          <h2>Checked State</h2>
          <p className="showcase-description">
            Radio buttons can be checked by default.
          </p>
         <div className="showcase-input-column">
            <Radio name="plan" label="Free" value="free" defaultChecked />
            <Radio name="plan" label="Pro" value="pro" />
            <Radio name="plan" label="Enterprise" value="enterprise" />
          </div>
        </section>

        <section className="showcase-section">
          <h2>Helper State</h2>
          <p className="showcase-description">
            Radio buttons can have helper text associated with them.
          </p>
          <div className="showcase-input-column">
            <Radio 
              name="notification" 
              label="Email" value="email"
              helperText="Receive notifications via email"
            />
            <Radio 
              name="notification" 
              label="SMS" value="sms"
              helperText="Receive notifications via SMS"
            />
            <Radio 
              name="notification" 
              label="Push" value="push"
              helperText="Receive notifications via push notifications"
            />
          </div>
        </section>
        <section className="showcase-section">
          <h2>Error State</h2>

          <p className="showcase-description">
            Displays validation feedback when an option is
            invalid.
          </p>
          <div className="showcase-input-column">
            <Radio
              name="terms"
              value="accept"
              label="Accept terms and conditions"
              error="You must select this option."
            />
            <Radio
              name="terms"
              value="decline"
              label="Decline terms and conditions"
              error="You must select this option."
            />
          </div>
        </section>

        <section className="showcase-section">
          <h2>States</h2>
          <p className="showcase-description">
            Common radio states.
          </p>
          <div className="showcase-input-column">
            <Radio name="state" label="Unchecked" value="unchecked" />
            <Radio name="state" label="Checked" value="checked" defaultChecked />
            <Radio name="state" label="Disabled" value="disabled" disabled />
            <Radio name="state" label="Disabled and Checked" value="disabled" disabled defaultChecked />
          </div>
        </section>
        <section className="showcase-section">
          <h2>Required</h2>

          <p className="showcase-description">
            A radio group can require the user to make a
            selection.
          </p>
          <div className="showcase-input-column">
            <Radio
              name="payment"
              value="credit-card"
              label="Credit Card"
              required
            />
            <Radio
              name="payment"
              value="paypal"
              label="PayPal"
            />
          </div>
        </section>
    </div>
  );
}