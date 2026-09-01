export type ComponentName =
  | "button"
  | "input"
  | "select"
  | "radio"
  | "checkbox"
  | "textarea"
  | "switch"
  | "card"
  | "modal"
  | "panel" 
  | "popover"
  | "dropdown"
  | "tooltip"
  | "tabs"
  | "accordion"
  | "slider";

export interface ComponentConfig {
  id: ComponentName;
  label: string;
};

export interface ComponentGroup {
  id: string;
  label: string;
  components: ComponentConfig[];
}

export const componentGroups: ComponentGroup[] = [
  {
    id: "form-primitives",
    label: "Form Primitives",
    components: [
      { id: "button", label: "Button" },
      { id: "input", label: "Input" },
      { id: "select", label: "Select" },
      { id: "radio", label: "Radio" },
      { id: "checkbox", label: "Checkbox" },
      { id: "textarea", label: "Textarea" },
      { id: "switch", label: "Switch" }
    ]
  },
  {
    id: "composition",
    label: "Composition",
    components: [
      { id: "card", label: "Card" },
      { id: "modal", label: "Modal" },
      { id: "panel", label: "Panel" }
    ]
  },
  {
    id: "overlay",
    label: "Overlay",
    components: [
      { id: "popover", label: "Popover" },
      { id: "tooltip", label: "Tooltip" },
      { id: "dropdown", label: "Dropdown" },
    ]
  },
  {
    id: "data-display",
    label: "Data Display",
    components: [
      { id: "slider", label: "Slider" }
    ]
  }
]; 


