import type { HTMLAttributes, Ref } from "react";
import { X } from "lucide-react";

import "./banner.css";

export type BannerVariant =
  | "info"
  | "success"
  | "warning"
  | "error";

export interface BannerProps
  extends HTMLAttributes<HTMLDivElement> {
  variant?: BannerVariant;
  onDismiss?: () => void;
  /** Accessible label for the dismiss button. */
  dismissLabel?: string;
  /** Reference to the underlying div element. */
  ref?: Ref<HTMLDivElement>;
}

export function Banner({
  ref,
  variant = "info",
  dismissLabel = "Dismiss banner",
  onDismiss,
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
      {...props}
      ref={ref}
      className={bannerClass}
      role="status"
    >
      <div className="banner-content">
        {children}
      </div>
      {onDismiss && (
          <button
            type="button"
            className="banner-dismiss"
            aria-label={dismissLabel}
            onClick={onDismiss}
          >
            <X aria-hidden="true" />
          </button>
      )}
    </div>
  )

}
