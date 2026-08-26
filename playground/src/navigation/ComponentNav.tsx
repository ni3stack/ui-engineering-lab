type ComponentName = "button" | "input";

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
      </div>
    </aside>
  )
}