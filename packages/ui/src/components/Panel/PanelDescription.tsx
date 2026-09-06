import type {
  HTMLAttributes,
  PropsWithChildren,
} from "react";

import { useContext, useEffect } from "react";

import { PanelContext } from "./PanelContext";

export interface PanelDescriptionProps
  extends PropsWithChildren<HTMLAttributes<HTMLParagraphElement>> {}

export function PanelDescription({
  className = "",
  children,
  ...props
}: PanelDescriptionProps) {

  const context = useContext(PanelContext);

  const panelDescriptionClass = ["panel-description", className]
    .filter(Boolean)
    .join(" ");

  useEffect(() => {
    context?.setHasDescription(true);

    return () => {
      context?.setHasDescription(false);
    }
  },[context])
  
  return (
    <p
      id={context?.descriptionId}
      className={panelDescriptionClass}
      {...props}
    >
      {children}
    </p>
  );
}