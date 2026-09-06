import type {
  HTMLAttributes,
  PropsWithChildren,
} from "react";

export interface PanelHeaderProps
  extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {}

export function PanelHeader({
  className = "",
  children,
  ...props
}: PanelHeaderProps) {

  const panelHeaderClass = ["panel-header", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={panelHeaderClass}
      {...props}
    >
      {children}
    </div>
  );
}