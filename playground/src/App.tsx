import { useState } from "react";
import "./playground.css";
import type { ComponentName } from "./navigation/componentConfig";
import { ComponentNav } from "./navigation/ComponentNav";
import { ButtonShowcase } from "./showcases/ButtonShowcase";
import { InputShowcase } from "./showcases/InputShowcase";
import { SelectShowcase } from "./showcases/SelectShowcase";
import { CheckboxShowcase } from "./showcases/CheckboxShowcase";
import { RadioShowcase } from "./showcases/RadioShowcase";
import { TextareaShowcase } from "./showcases/TextareaShowcase";


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
              { activeComponent === "input" && <InputShowcase />}
              { activeComponent === "select" && <SelectShowcase />}
              { activeComponent === "checkbox" && <CheckboxShowcase />}
              { activeComponent === "radio" && <RadioShowcase />}
              { activeComponent === "textarea" && <TextareaShowcase />}
          </main>
      </div>
    </div>
  );
}