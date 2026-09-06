import type {
  HTMLAttributes,
  PropsWithChildren,
} from "react";
import { useContext } from "react";
import { PanelContext } from "./PanelContext";

export interface PanelTitleProps
  extends PropsWithChildren<HTMLAttributes<HTMLHeadingElement>> {}

export function PanelTitle({
  className = "",
  children,
  ...props
}: PanelTitleProps) {

  const context = useContext(PanelContext);

  const panelTitleClass = ["panel-title", className]
    .filter(Boolean)
    .join(" ");

  return (
    <h2
      className={panelTitleClass}
      id={context?.titleId}
      {...props}
    >
      {children}
    </h2>
  );
}