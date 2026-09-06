import type {
  HTMLAttributes,
  PropsWithChildren,
} from "react";

export interface PanelFooterProps
  extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {}

export function PanelFooter({
  className = "",
  children,
  ...props
}: PanelFooterProps) {

  const panelFooterClass = ["panel-footer", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={panelFooterClass}
      {...props}
    >
      {children}
    </div>
  );
}