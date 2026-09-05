import type { HTMLAttributes, PropsWithChildren } from "react";

export type ModalHeaderProps = PropsWithChildren<
  HTMLAttributes<HTMLDivElement>
>;

export function ModalHeader({
  children,
  className,
  ...props
}:ModalHeaderProps) {
  const headerClass = [
    "modal-header",
    className
  ].filter(Boolean).join(" ");

  return (
    <div
      {...props}
      className={headerClass}
    >
      {children}
    </div>
  );
}
