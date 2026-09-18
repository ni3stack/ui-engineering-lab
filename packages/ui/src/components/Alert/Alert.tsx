import type { 
  HTMLAttributes,
  ReactNode,
  Ref
} from 'react';

import {
  Info,
  CircleCheck,
  TriangleAlert,
  CircleX,
  X,
} from 'lucide-react';

import "./alert.css";

const variantIcons = {
  info: Info,
  success: CircleCheck,
  warning: TriangleAlert,
  error: CircleX,
};

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps
  extends HTMLAttributes<HTMLDivElement> {
   /** Visual and semantic intent of the alert. */
  variant?: AlertVariant;

  /** Optional heading displayed above the alert content. */
  heading?: ReactNode;

  /**
   * Custom icon.
   * undefined = default variant icon
   * null = no icon
   * ReactNode = custom icon
   */
  icon?: ReactNode;

  /** Renders a dismiss button when provided. */
  onDismiss?: () => void;

  /** Accessible label for the dismiss button. */
  dismissLabel?: string;

  /** Whether assistive technology should announce the alert immediately. */
  assertive?: boolean;

  /** Reference to the underlying div element. */
  ref?: Ref<HTMLDivElement>;
}

  /** A flexible, accessible alert for status messages and important notices. */
export function Alert(
  {
    ref,
    variant = 'info',
    heading,
    children,
    onDismiss,
    dismissLabel = 'Dismiss alert',
    assertive = false,
    className,
    role,
    icon,
    ...props
  }:AlertProps
){
    const classes = ['alert', `alert--${variant}`, className]
      .filter(Boolean)
      .join(' ');
    
    const DefaultIcon = variantIcons[variant];

    const resolvedIcon =
      icon === undefined
        ? <DefaultIcon />
        : icon;

    return (
      <div
        {...props}
        ref={ref}
        className={classes}
        role={role ?? (assertive ? 'alert' : 'status')}

      >
        { resolvedIcon && (
          <span
            className="alert__icon"
            aria-hidden="true"
          >
            {resolvedIcon}
          </span>
        )}
        <div className="alert__content">
          {heading && <div className="alert__heading">{heading}</div>}
          <div className="alert__message">{children}</div>
        </div>
        {onDismiss && (
          <button
            type="button"
            className="alert__dismiss"
            onClick={onDismiss}
            aria-label={dismissLabel}
          >
            <X aria-hidden="true" />
          </button>
        )}
      </div>
    );
}

export default Alert;
