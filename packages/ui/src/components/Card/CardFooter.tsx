import type { HTMLAttributes, PropsWithChildren } from "react";

export type CardFooterProps = PropsWithChildren<
  HTMLAttributes<HTMLDivElement>
>;

export function CardFooter({
  children,
  className,
  ...props
}: CardFooterProps) {
  const footerClass = [
    "card-footer",
    className,
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