import type { HTMLAttributes, PropsWithChildren } from "react";
import { useContext, useEffect } from "react";
import { ModalContext } from "./ModalContext";

export type ModalDescriptionProps = PropsWithChildren<
  HTMLAttributes<HTMLHeadingElement>
>;

export function ModalDescription({
  children,
  className,
  ...props
}:ModalDescriptionProps) {
  const descriptionClass = [
    "modal-description",
    className
  ].filter(Boolean).join(" ");

  const context =  useContext(ModalContext);

  useEffect(() => {
    context?.setHasDescription(true);

    return () => {
      context?.setHasDescription(false);
    };
  },[context]);

  return (
    <div
      className={descriptionClass}
      id={context?.descriptionId}
      {...props}
    >
      {children}
    </div>
  );
}
