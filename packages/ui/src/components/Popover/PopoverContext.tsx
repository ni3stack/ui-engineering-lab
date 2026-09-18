import { createContext, useContext } from "react";
import type { PopoverContextValue } from "./Popover.types";

export const PopoverContext = createContext<PopoverContextValue|null>(null);

export function usePopoverContext() {
  const context = useContext(PopoverContext);
  if(!context) {
    throw new Error("Popover component must be used within Popover")
  }

  return context;
}
