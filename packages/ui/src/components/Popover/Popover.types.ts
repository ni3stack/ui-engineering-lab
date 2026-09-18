import type { 
  AriaAttributes, 
  MouseEventHandler, 
  ReactElement, 
  ReactNode,
  RefObject,
  Ref
} from "react";

export type PopoverPlacement =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end";

export interface PopoverProps {
  children: ReactNode,
  open? : boolean,
  defaultOpen? : boolean;
  onOpenChange?: (open: boolean) => void
}

export interface PopoverContentProps {
  children: ReactNode;
  placement?: PopoverPlacement;
  className?: string;
}

export interface PopoverContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: RefObject<HTMLElement | null>;
  contentRef: RefObject<HTMLDivElement | null>;
}

export interface PopoverTriggerElementProps {
  ref: Ref<HTMLElement | null>
  onClick: MouseEventHandler<HTMLElement>,
  "aria-expanded": boolean,
  "aria-haspopup": AriaAttributes["aria-haspopup"];
}

export interface PopoverTriggerProps {
  children: ReactElement<PopoverTriggerElementProps>;
  disabled?: boolean;
}