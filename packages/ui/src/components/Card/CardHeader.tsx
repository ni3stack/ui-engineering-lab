import type { HTMLAttributes, PropsWithChildren } from "react";

export type CardHeaderProps = PropsWithChildren<
  HTMLAttributes<HTMLDivElement>
>;

export function CardHeader({
  children,
  className,
  ...props
}:CardHeaderProps) {

  const headerClass = [
    "card-header",
    className
  ].filter(Boolean).join(" ");

  return (
    <div 
      {...props}
      className={headerClass}
    >
      {children}
    </div>
  )
}