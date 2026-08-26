import { Input } from "@ui-lab/ui";

export function InputShowcase() {
  return (
    <section className="showcase">
      <header className="showcase-header">
        <h1>Input</h1>
        <p className="showcase-description">
          A text input with labels, helper text, validation,
          sizes, and native input attributes.
        </p>
      </header>
      <section className="showcase-section">
        <h2>Sizes</h2>
        <p className="showcase-description">
          Different input sizes for different UI contexts.
        </p>
        <div className="showcase-input-column">
          <Input
            label="Small"
            inputSize="small"
            placeholder="Small-input"
          />

          <Input
            label="Medium"
            inputSize="medium"
            placeholder="Medium input"
          />

          <Input
            label="Large"
            inputSize="large"
            placeholder="Large input"
          />
        </div>
      </section>
      <section className="showcase-section">
        <h2>Helper Text</h2>
        <p className="show">Additional information displayed below the input</p>
        <div className="showcase-input-column">
          <Input 
            label="Email"
            type="email"
            placeholder="Enter your email"
            helperText = "we'll never share you phone"
          />
        </div>
      </section>
      <section className="showcase-section">
        <h2>Error State</h2>
        <p className="showcasepdess">
          Display validation feedback and marks the input invalid
        </p>
        <div className="showcase-input-column">
          <Input
            label="Emaild"
            id="emaildId"
            value="testInvalid@email"
            error="Enter a valid email address"
            readOnly
          />
        </div>
      </section>
      <section className="showcasesection">
        <h2>Stats</h2>
        <p className="showcase-description">
          Common native input stats
        </p>
        <div className="showcase-input-column">
          <Input
            label="Disabled"
            placeholder="Disabled input"
            disabled
          />
          <Input
            label="Readonly"
            placeholder="Readonly"
            readOnly
          />
          <Input
            label="Required"
            placeholder="Required"
            required
          />
        </div>
      </section>
    </section>
  );
}