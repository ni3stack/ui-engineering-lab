import { 
  useId, 
  useEffect, 
  useState,
  useRef
} from "react";
import type { HTMLAttributes, PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import { ModalContext } from "./ModalContext";
import "./modal.css"

export interface ModalProps
  extends PropsWithChildren<
    Omit<HTMLAttributes<HTMLDivElement>, "title">
  > {
    open: boolean;
    onClose: () => void;
    size?: "small" | "medium" | "large";
    closeOnEscape?: boolean;
    closeOnBackdropClick?: boolean;
    showCloseButton?: boolean
}

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Modal({
  open,
  onClose,
  size = "medium",
  closeOnEscape = true,
  closeOnBackdropClick = false,
  showCloseButton = true,
  children,
  className,
  ...props
}:ModalProps) {

    const titleId = useId();
    const descriptionId = useId();
    const [hasDescription, setHasDescription] = useState(false);

    const modalRef = useRef<HTMLDivElement>(null);
    const previouslyFocusedElement = useRef<HTMLElement|null>(null);
    const wasOpen = useRef(false);
    const previousBodyOverflow = useRef("");


    const modalClass = [
      "modal",
      `modal--${size}`,
      className
    ].filter(Boolean).join(" ");


    // Escape-key listener
    useEffect(() => {
      if(!open || !closeOnEscape) { return; }

      const handleKeyDown = (event: KeyboardEvent) => {
        if(event.key === "Escape") {
          onClose();
        }
      };

      document.addEventListener("keydown", handleKeyDown)
      return () => {
        document.removeEventListener("keydown", handleKeyDown)
      }
    },[open, closeOnEscape, onClose])


    // previous focus

    useEffect(() => {
      if(!open) {
        return;
      }

      previouslyFocusedElement.current = 
        document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
      
      return () => {
        // Restore focus when the modal closes or unmounts.
        if (previouslyFocusedElement.current) {
          previouslyFocusedElement.current.focus();
          previouslyFocusedElement.current = null;
          }
      };
    },[open]);

    // Initial focus
    useEffect(() => {
      if(!open) {
        return;
      }

      const firstFocusableElement =
        modalRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);

      if (firstFocusableElement) {
         firstFocusableElement.focus();
      } else {
        modalRef.current?.focus()
      }
     

    },[open]);

    // focus trap

    useEffect(() => {
      if(!open) {
        return;
      }

      const modal = modalRef.current;

      if(!modal) {
        return;
      }

      const handleKeyDown = (event:KeyboardEvent) => {
        if(event.key !== "Tab") {
          return;
        }

        const focusableElements = modal.querySelectorAll<HTMLElement>(
          FOCUSABLE_SELECTOR
        );

        if(focusableElements.length === 0){
          return;
        }

        const firstElement = focusableElements[0]!;
        const lastElememt = focusableElements[focusableElements.length - 1]!;

        if(event.shiftKey && document.activeElement === firstElement){
          event.preventDefault();
          lastElememt.focus();
          return;
        }

        if(!event.shiftKey && document.activeElement === lastElememt) {
          event.preventDefault();
          firstElement.focus();
        }
      };
      modal.addEventListener("keydown", handleKeyDown);

      return () => {
        modal.removeEventListener("keydown",handleKeyDown);
      }
    }, [open]);

    // Body scroll lock
    useEffect(() => {
      if(!open) {
        return
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
        <ModalContext.Provider 
          value={{
            titleId,
            descriptionId,
            setHasDescription
          }}>
          <div 
            className="modal-overlay"
            onClick={(event) => {
              if(closeOnBackdropClick && 
                  event.target === event.currentTarget) 
                {
                  onClose();
                }
            }}
          >
            <div 
              {...props}
              ref={modalRef}
              className={modalClass}
              role="dialog"
              tabIndex={-1}
              aria-modal="true"
              aria-labelledby={titleId}
              {...(hasDescription && {
                "aria-describedby":descriptionId
              })}
            >
              {
                showCloseButton && (
                  <button
                    type="button"
                    className="modal-close"
                    aria-label="Close"
                    onClick={onClose}
                  >
                    x
                  </button>
                )
              }
              { children }
            </div>
          </div>
        </ModalContext.Provider>,
        document.body
      )
    )
} 