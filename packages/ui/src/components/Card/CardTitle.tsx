import type { HTMLAttributes, PropsWithChildren } from "react";

export type CardTitleProps = PropsWithChildren<
  HTMLAttributes<HTMLHeadingElement>
>;

export function CardTitle({
  children,
  className,
  ...props
}: CardTitleProps) {

  const clasList = [
    "card-title",
    className
  ].filter(Boolean).join(" ");

  return (
    <h3 
      {...props}
      className={clasList}
    >
      {children}
    </h3>
  );
}