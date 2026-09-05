import type { HTMLAttributes, PropsWithChildren } from "react";

export type ModalFooterProps = PropsWithChildren<
  HTMLAttributes<HTMLDivElement>
>;

export function ModalFooter({
  children,
  className,
  ...props
}:ModalFooterProps) {
  const footerClass = [
    "modal-footer",
    className
  ].filter(Boolean).join(" ");

  return (
    <div
      {...props}
      className={footerClass}
    >
      {children}
    </div>
  );
}
