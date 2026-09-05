import type { HTMLAttributes, PropsWithChildren } from "react";
import { useContext } from "react";
import { ModalContext } from "./ModalContext";

export type ModalTitleProps = PropsWithChildren<
  HTMLAttributes<HTMLHeadingElement>
>;

export function ModalTitle({
  children,
  className,
  ...props
}:ModalTitleProps) {
  const titleClass = [
    "modal-title",
    className
  ].filter(Boolean).join(" ");

  const context = useContext(ModalContext);

  return (
    <h2
      className={titleClass}
      id={context?.titleId}
      {...props}
    >
      {children}
    </h2>
  );
}
