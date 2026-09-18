import { useEffect, useLayoutEffect, useState } from "react";
import type { PopoverContentProps } from "./Popover.types";
import { createPortal } from "react-dom";
import { usePopoverContext } from "./PopoverContext";
import { calculatePopoverPosition } from "./Popover.utils";


export function PopoverContent({
  children,
  placement = "bottom",
  className = ""
}:PopoverContentProps) {

  const { 
    open,
    setOpen,
    triggerRef,
    contentRef
  } = usePopoverContext();
  
  const [position, setPosition] = useState({
    top: 0,
    left: 0
  });

useLayoutEffect(() => {
  if (!open) return;

  const updatePosition = () => {
    const trigger = triggerRef.current;
    const content = contentRef.current;

    if (!trigger || !content) return;

    const triggerRect = trigger.getBoundingClientRect();
    const contentRect = content.getBoundingClientRect();

    setPosition(
      calculatePopoverPosition(
        triggerRect,
        contentRect,
        placement
      )
    );
  };

  // Initial positioning
  updatePosition();

  // Recalculate when viewport/layout changes
  window.addEventListener("resize", updatePosition);
  window.addEventListener("scroll", updatePosition, true);

  return () => {
    window.removeEventListener("resize", updatePosition);
    window.removeEventListener("scroll", updatePosition, true);
  };
}, [open, placement]);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
    
      if(contentRef.current?.contains(target)
        || triggerRef.current?.contains(target)) {
        
        return;
      }
      setOpen(false);
    }

    const handleKeyDown = (event:KeyboardEvent) => {
      if(event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener(
        "pointerdown",
        handlePointerDown
      );

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };

  },[open, setOpen, triggerRef, contentRef]);

  if(!open) {
    return null;
  }

  return (
    createPortal(
      <div
        ref={contentRef}
        role="dialog"
        className={`popover-content ${className ?? ""}`.trim()}
        style={{
          top: position.top,
          left: position.left,
        }}
      >
        {children}
      </div>,
      document.body
    )
  );
}