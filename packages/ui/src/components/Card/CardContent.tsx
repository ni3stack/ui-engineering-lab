import type { HTMLAttributes, PropsWithChildren } from "react";

export type CardContentProps = PropsWithChildren<
  HTMLAttributes<HTMLDivElement>>;

export function CardContent({
  children,
  className,
  ...props
}:CardContentProps) {
  const contentClass = [
    "card-content",
    className
  ].filter(Boolean).join(" ");

  return (
    <div
      {...props}
      className={contentClass}
    >
      {children}
    </div>
  )
}