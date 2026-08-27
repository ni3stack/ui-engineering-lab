import { Select, type SelectOption } from "@ui-lab/ui";

const countries:SelectOption[] = [
  { value: "in", label: "India" },
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
];

export function SelectShowcase() {
  return (
    <section className="showcase">
      <header className="showcase-header">
        <h1>Select</h1>
        <p className="showcase-description">
          A native select component with labels, helper text,
          validation, placeholders, and native select attributes.
        </p>
      </header>
      <section className="showcase-section">
        <h2>Basic</h2>
        <p className="showcase-description">
          A simple select with a list of options.
        </p>
        <div className="showcase-input-column">
          <Select
            label="Country"
            options={countries}
          />
        </div>
      </section>
      <section className="showcase-section">
        <h2>Placeholder</h2>
        <p className="showcase-description">
          A disabled placeholder shown before a selection is made.
        </p>
        <div className="showcase-input-column">
          <Select
            label="Country"
            options={countries}
            placeholder="Select a country"
          />
        </div>
      </section>
      <section>
        <h2>Helper Text</h2>
        <p className="showcase-description">
          Additional information displayed below the select.
        </p>
        <div className="showcase-input-column">
          <Select
            label="Country"
            options={countries}
            placeholder="Select a country"
            helperText="Choose the country where you currently live."
          />
        </div>
      </section>
      <section className="showcase-section">
        <h2>Error State</h2>
        <p className="showcase-description">
          Displays validation feedback when the selected value is invalid.
        </p>
        <div className="showcase-input-column">
          <Select
            label="Country"
            errorText="Please select a country."
            options={countries}
          />
        </div>
      </section>
      <section className="showcase-section">
        <h2>State</h2>
        <p className="showcase-description">
          Common native select states.
        </p>
        <div className="showcase-input-column">
          <Select
            label="Disabled"
            disabled
            options={countries}
          />
          <Select
            label="Required"
            required
            placeholder="Select a country"
            options={countries}
          />
        </div>
      </section>
    </section>
  )
}