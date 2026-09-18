import { cloneElement } from "react";
import type { PopoverTriggerProps } from "./Popover.types";
import { usePopoverContext } from "./PopoverContext";
import type  { MouseEvent } from "react";

export function PopoverTrigger({
  children,
  disabled = false,
}:PopoverTriggerProps) {
  const { 
    open, 
    setOpen,
    triggerRef
  } = usePopoverContext();

  const handleClick = (
    event: MouseEvent<HTMLElement>
  ) => {
    children.props.onClick?.(event);

    if(disabled || event.defaultPrevented) {
      return;
    }

    setOpen(!open);
  }

  return (
    cloneElement(children, {
      ref: triggerRef,
      onClick: handleClick,
      "aria-expanded": open,
      "aria-haspopup": "dialog"
    })
  )
}
