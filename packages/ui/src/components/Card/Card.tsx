import type { HTMLAttributes, PropsWithChildren } from "react";
import "./card.css";

export type CardProps = PropsWithChildren<
  HTMLAttributes<HTMLDivElement>
>;

export function Card({
  children,
  className,
  ...props
}:CardProps) {
  const cardClass = [
    "card",
    className
  ].filter(Boolean).join(" ");

  return (
    <div
      {...props}
      className={cardClass}
    >
      {children}
    </div>
  )
}