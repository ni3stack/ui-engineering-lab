import type { HTMLAttributes, PropsWithChildren } from "react";

export type ModalContentProps = PropsWithChildren<
  HTMLAttributes<HTMLDivElement>
>;

export function ModalContent({
  children,
  className,
  ...props
}:ModalContentProps) {
  const footerClass = [
    "modal-content",
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
