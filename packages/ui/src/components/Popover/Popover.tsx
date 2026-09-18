import {
  useState,
  useRef,
} from "react";

import type { 
  PopoverProps, 
} from "./Popover.types";

import "./popover.css";
import { PopoverContent } from "./PopoverContent";
import { PopoverTrigger } from "./PopoverTrigger";
import { PopoverContext } from "./PopoverContext";


function PopoverRoot({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange
}:PopoverProps) {

  const triggerRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null);

  const [isInternalOpen, setIsInternalOpen] = useState(defaultOpen);

  const isControlledOpen = controlledOpen !== undefined;

  const open = isControlledOpen
    ? controlledOpen
    : isInternalOpen;

  const setOpen = (nextOpen: boolean) => {
    if(!isControlledOpen) {
      setIsInternalOpen(nextOpen)
    }
    onOpenChange?.(nextOpen);
  }

  return (
    <PopoverContext.Provider 
      value={{ 
        open, 
        setOpen, 
        triggerRef,
        contentRef
      }}>
      {children}
    </PopoverContext.Provider>
  )
}

export const Popover = Object.assign(PopoverRoot, {
  Trigger: PopoverTrigger,
  Content: PopoverContent
})



