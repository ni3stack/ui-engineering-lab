import type { HTMLAttributes, PropsWithChildren } from "react";

export type CardDescriptionProps = PropsWithChildren<
  HTMLAttributes<HTMLParagraphElement>>;

export function CardDescription({
  children,
  className,
  ...props
}:CardDescriptionProps) {

  const classList = [
    "card-description",
    className
  ].filter(Boolean).join(" ");

  return (
    <p
      {...props}
      className={classList}
    >
    {children}
    </p>
  );
}