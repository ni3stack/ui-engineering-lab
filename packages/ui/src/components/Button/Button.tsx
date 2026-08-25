import type { 
    ButtonHTMLAttributes,
    ReactNode 
} from "react";

import "./button.css";

export type ButtonVariant = 
  | "primary"
  | "secondary"
  | "danger"
  | "ghost";

export type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
}
export function Button({ 
    children,
    variant = "primary",
    size = "medium",
    loading = false,
    disabled,
    className,
    ...props 
}: ButtonProps) {
    const classes = [
      "button",
      `button--${variant}`,
      `button--${size}`,
      className
    ].filter(Boolean).join(" ");

    return (
      <button
        className={classes}
        disabled={ disabled || loading }
        {...props}
      >
        { children }
      </button>
    )
}