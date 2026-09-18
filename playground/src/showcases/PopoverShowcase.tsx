import { Button, Popover } from "@ni3stack/ui";

export function PopoverShowcase() {
  return (
    <section className="showcase">
      <header className="showcase-header">
        <h1>Popover</h1>
        <p className="showcase-description">
          A reusable popover component for displaying contextual content relative to a trigger element.
        </p>
      </header>
      <section className="showcase-section">
          <h2>Placements</h2>
          <div className="showcase-row">
            <Popover>
              <Popover.Trigger>
                <Button variant="secondary">Top Start</Button>
              </Popover.Trigger>

              <Popover.Content placement="top-start">
                Top start content
              </Popover.Content>
            </Popover>

            <Popover>
              <Popover.Trigger>
                <Button variant="secondary">Top</Button>
              </Popover.Trigger>

              <Popover.Content placement="top">
                Top content
              </Popover.Content>
            </Popover>

            <Popover>
              <Popover.Trigger>
                <Button variant="secondary">Top End</Button>
              </Popover.Trigger>

              <Popover.Content placement="top-end">
                Top end content
              </Popover.Content>
            </Popover>

            <Popover>
              <Popover.Trigger>
                <Button variant="secondary">Bottom Start</Button>
              </Popover.Trigger>

              <Popover.Content placement="bottom-start">
                Bottom start content
              </Popover.Content>
            </Popover>

            <Popover>
              <Popover.Trigger>
                <Button variant="secondary">Bottom</Button>
              </Popover.Trigger>

              <Popover.Content placement="bottom">
                Bottom content
              </Popover.Content>
            </Popover>

            <Popover>
              <Popover.Trigger>
                <Button variant="secondary">Bottom End</Button>
              </Popover.Trigger>

              <Popover.Content placement="bottom-end">
                Bottom end content
              </Popover.Content>
            </Popover>
          </div>
      </section>
    </section>
  )
}