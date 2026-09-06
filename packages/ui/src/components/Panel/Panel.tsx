import { createPortal } from "react-dom";
import { useId, useEffect, useRef, useState, useContext } from "react";
import type {
  HTMLAttributes,
  PropsWithChildren,
} from "react";


import "./panel.css";
import { PanelContext } from "./PanelContext";

export type PanelSize =
  | "small"
  | "medium"
  | "large";

export type PanelPosition =
  | "left"
  | "right"
  | "top"
  | "bottom";

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export interface PanelProps
  extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
    open: boolean;
    onClose?: () => void;
    position?: PanelPosition
    size?: PanelSize;
    closeOnEscape?: boolean;
    closeOnBackdropClick?: boolean;
    showCloseButton?: boolean;
  }

export function Panel({
  open,
  onClose,
  position = "right",
  size = "medium",
  closeOnEscape = true,
  closeOnBackdropClick = false,
  showCloseButton = false,
  className,
  children,
  ...props
}: PanelProps) {

  const titleId = useId();
  const descriptionId = useId();

  const [hasDescription, setHasDescription] = useState<boolean>(false);
  const panelClass = [
    "panel",
    `panel--${position}`,
    `panel--${size}`,
    className 
  ]
    .filter(Boolean)
    .join(" ");
  
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement|null>(null);
  const previousBodyOverflow = useRef("");

  // escape effect handler
  useEffect(() => {

    if(!open || !onClose || !closeOnEscape) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if(event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }

  },[open, closeOnEscape, onClose]);

    // focus restoration 

  useEffect(() => {
    if(!open) {
      return;
    }

    previouslyFocusedElement.current = 
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    return () => {
      // Restore focus when the Panel closes or unmounts.
      if(previouslyFocusedElement.current) {
        previouslyFocusedElement.current.focus();
        previouslyFocusedElement.current = null;
      }
    }
  },[open]);

  // initial focus
  useEffect(() => {
    if(!open) {
      return;
    }
    const firstFocusableElement = 
      panelRef.current?.querySelector<HTMLElement>(
        FOCUSABLE_SELECTOR
      );
    
    if(firstFocusableElement) {
      firstFocusableElement.focus();
    } else {
      panelRef.current?.focus();
    }

  },[open]);

  // focus trap

  useEffect(() => {
    if(!open) {
      return;
    }
    const panel = panelRef.current;

    if(!panel) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if(event.key !== "Tab") {
        return;
      }

      const focusableElement = panel.querySelectorAll<HTMLElement>(
        FOCUSABLE_SELECTOR
      );

      if(focusableElement.length === 0) {
        return;
      }

      const firstElement = focusableElement[0];
      const lastElement = focusableElement[focusableElement.length-1];

      // Shift + Tab from first → last
      if(event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
        return;
      }

      // tab from last to first

      if(!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
        return;
      }
    };

    document.addEventListener("keydown",handleKeyDown);
    return () => {
      document.removeEventListener("keydown",handleKeyDown);
    }

  }, [open]);

  //  Body scroll lock

  useEffect(() => {
    if(!open) {
      return;
    }

    previousBodyOverflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow.current;
    }
  });

  if(!open) {
    return null;
  }

  return (
    createPortal(
      <PanelContext.Provider
        value={{
          titleId,
          descriptionId,
          setHasDescription
        }}
      >
        <div
          className={`panel-overlay panel-overlay--${position}`}
          onClick={(event) => {
            if(closeOnBackdropClick && event.currentTarget
              === event.target
            ) {
                onClose?.();
              }
          }}
        >
          <div
            ref={panelRef}
            className={panelClass}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            {
              ...(hasDescription && {
                "aria-describedby": descriptionId
              })
            }
            tabIndex={-1}
            {...props}
          >
            {
              showCloseButton && onClose && (
                <button
                  type="button"
                  className="panel-close"
                  aria-label="Close panel"
                  onClick={onClose}
                >
                  x
                </button>
              )
            }
            {children}
          </div>
        </div>
      </PanelContext.Provider>,
      document.body
    )
  );
}