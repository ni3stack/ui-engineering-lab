import type {
  HTMLAttributes,
  PropsWithChildren,
} from "react";

export interface PanelContentProps
  extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {}

export function PanelContent({
  className = "",
  children,
  ...props
}: PanelContentProps) {

  const panelContentClass = ["panel-content", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={panelContentClass}
      {...props}
    >
      {children}
    </div>
  );
}