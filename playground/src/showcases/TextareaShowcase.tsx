import { Textarea } from "@ui-lab/ui";

export function TextareaShowcase() {
  return (
    <section className="showcase">
      <header className="showcase-header">
        <h1>Textarea</h1>

        <p>
          A multiline text input for longer-form user
          content.
        </p>
      </header>

      <section className="showcase-section">
        <h2>Basic</h2>

        <p className="showcase-description">
          A basic textarea for entering multiline content.
        </p>

        <div className="showcase-input-column">
          <Textarea
            label="Description"
            placeholder="Enter a description"
          />
        </div>
      </section>

      <section className="showcase-section">
        <h2>Rows</h2>

        <p className="showcase-description">
          The native rows attribute controls the initial
          height of the textarea.
        </p>

        <div className="showcase-input-column">
          <Textarea
            label="Comments"
            rows={6}
            placeholder="Enter your comments"
          />
        </div>
      </section>

      <section className="showcase-section">
        <h2>Helper Text</h2>

        <p className="showcase-description">
          Additional information can be displayed below the
          textarea.
        </p>

        <div className="showcase-input-column">
          <Textarea
            label="Bio"
            placeholder="Tell us about yourself"
            helperText="Maximum 500 characters."
          />
        </div>
      </section>

      <section className="showcase-section">
        <h2>Error State</h2>

        <p className="showcase-description">
          Displays validation feedback when the value is
          invalid.
        </p>

        <div className="showcase-input-column">
          <Textarea
            label="Description"
            error="Description is required."
            placeholder="Enter a description"
          />
        </div>
      </section>

      <section className="showcase-section">
        <h2>States</h2>

        <p className="showcase-description">
          Common textarea states.
        </p>

        <div className="showcase-input-column">
          <Textarea
            label="Disabled"
            disabled
            placeholder="This field is disabled"
          />

          <Textarea
            label="Read Only"
            readOnly
            defaultValue="This content cannot be edited."
          />
        </div>
      </section>

      <section className="showcase-section">
        <h2>Character Limit</h2>

        <p className="showcase-description">
          Native maxLength can be used to limit the amount
          of text entered.
        </p>

        <div className="showcase-input-column">
          <Textarea
            label="Short Description"
            maxLength={100}
            placeholder="Maximum 100 characters"
          />
        </div>
      </section>
    </section>
  );
}