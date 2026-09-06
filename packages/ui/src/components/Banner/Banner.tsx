import type { HTMLAttributes, PropsWithChildren } from "react";

import "./banner.css";

export type BannerVariant =
  | "info"
  | "success"
  | "warning"
  | "error";

export interface BannerProps extends 
  PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
    variant?: BannerVariant;
    dismissible?: boolean;
    onClose?: () => void
  }

export function Banner({
  variant = "info",
  dismissible = false,
  onClose,
  className,
  children,
  ...props
}:BannerProps) {

  const bannerClass = [
    "banner",
    `banner--${variant}`,
    className
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={bannerClass}
      role="status"
      {...props}
    >
      <div className="banner-content">
        {children}
      </div>
      { dismissible && onClose &&
        (
          <button
            type="button"
            className="banner-close"
            aria-label="Close banner"
            onClick={onClose}

          >
            X
          </button>
        )
      }
    </div>
  )

}
