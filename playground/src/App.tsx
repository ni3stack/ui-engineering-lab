import { useState } from "react";
import "./playground.css";
import { ComponentNav } from "./navigation/ComponentNav";
import { ButtonShowcase } from "./showcases/ButtonShowcase";

type ComponentName = "button";

export default function App() {

  const [ activeComponent, setActiveComponent ] = useState<ComponentName>("button");

  return (
    <div className="playground">
      <header className="playground-header">
        <h1>UI Engineering Lab</h1>
        <p>Reusable UI components</p>
      </header>
      <div className="playground-body">
          <ComponentNav 
            activeComponent={activeComponent}
            onSelect={(component) => setActiveComponent(component)}
          />

          <main className="playground-content">
              { activeComponent === "button" && <ButtonShowcase />}
          </main>
      </div>
    </div>
  );
}