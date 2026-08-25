import { Button } from "@ui-lab/ui";

export function ButtonShowcase() {
  return (
    <section className="showcase">
      <header className="showcase-header">
        <h1>Button</h1>
        <p className="showcase-description"> 
          A reusable button components with different variants, sizes and states.
        </p>
      </header>
      <section className="showcase-section">
        <h2>Variants</h2>
        <p className="showcase-description">
          Different visual styles for different button actions.
        </p>
        <div className="showcase-row">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      </section>
      <section className="showcase-section">
        <h2>Sizes</h2>
        <p className="showcase-description">
          Choose a button size based on the surrounding context.
        </p>
        <div className="showcase-row">
          <Button size="small">Small</Button>
          <Button size="medium">Medium</Button>
          <Button size="large">Large</Button>
        </div>
      </section>
      <section className="showcase-section">
        <h2>States</h2>
        <p className="showcase-description">
          Common interaction states including default, disabled, and loading.
        </p>
        <div className="showcase-row">
          <Button>Default</Button>
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
        </div>
      </section>
      <section className="showcase-section">
        <h2>Native attributes</h2>
        <p className="showcase-description">
          Supports standard HTML button attributes and event handlers.
        </p>
        <div className="showcase-row">
          <Button type="submit">Submit</Button>
          <Button 
            aria-label="saved-reports"
            onClick={() => alert("save clicked")}>Save</Button>
        </div>
      </section>
    </section>
  )
}