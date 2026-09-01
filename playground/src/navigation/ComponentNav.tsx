import type { ComponentName } from "./componentConfig";
import { componentGroups } from "./componentConfig";

export interface ComponentNavProps {
  activeComponent: ComponentName;
  onSelect: (component: ComponentName) => void;
}

export function ComponentNav({
  activeComponent,
  onSelect
}:ComponentNavProps) {
  return (
    <aside className="component-nav">
      <h2>Components</h2>
      {
        componentGroups.map(group => (
          <div key={group.id} className="nav-group">
            <h3 className="nav-group-title">{group.label}</h3>
            <div className="nav-items">
              {
                group.components.map(component => (
                  <button
                    key={component.id}
                    className={
                      activeComponent === component.id
                        ? "nav-item nav-item--active"
                        : "nav-item"
                    }
                    onClick={() => onSelect(component.id)}
                  >
                    {component.label}
                  </button>
                ))
              }
            </div>
          </div>
        ))
      }
    </aside>
  )
}