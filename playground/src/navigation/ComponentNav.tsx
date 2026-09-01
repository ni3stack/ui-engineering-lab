type ComponentName = "button" | "input" | "select" | "radio" | "checkbox";

interface ComponentNavProps  {
  activeComponent: string;
  onSelect: (component: ComponentName) => void;
}

export function ComponentNav({
  activeComponent,
  onSelect
}:ComponentNavProps) {
  return (
    <aside className="component-nav">
      <h2>Components</h2>
      <div className="nav-items">
        <button 
          className={
            activeComponent === "button"
              ? "nav-item nav-item--active"
              : "nav-item"
          }
          onClick={() => onSelect("button")}
         >
          Button
        </button>
        <button 
          className={
            activeComponent === "input"
              ? "nav-item nav-item--active"
              : "nav-item"
          }
          onClick={() => onSelect("input")}
         >
          Input
        </button>
        <button
          className={ activeComponent === "select"
            ? "nav-item nav-item--active"
            : "nav-item"
          }
          onClick={() => onSelect("select")}
        >
          Select
        </button>
        <button
          className={ activeComponent === "radio"
            ? "nav-item nav-item--active"
            : "nav-item"
          }
          onClick={() => onSelect("radio")}
        >
          Radio
        </button>
        <button
          className={ activeComponent === "checkbox"
            ? "nav-item nav-item--active"
            : "nav-item"
          }
          onClick={() => onSelect("checkbox")}
        >
          Checkbox
        </button>
      </div>
    </aside>
  )
}