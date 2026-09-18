import type { PopoverPlacement } from "./Popover.types";

interface PopoverPosition {
  top: number;
  left: number;
}

export function calculatePopoverPosition(
  triggerRect: DOMRect,
  contentRect: DOMRect,
  placement: PopoverPlacement
): PopoverPosition {
  const gap = 8;

  let top: number;
  let left: number;

  switch (placement) {
    case "top":
      top = triggerRect.top - contentRect.height - gap;
      left =
        triggerRect.left +
        (triggerRect.width - contentRect.width) / 2;
      break;

    case "top-start":
      top = triggerRect.top - contentRect.height - gap;
      left = triggerRect.left;
      break;

    case "top-end":
      top = triggerRect.top - contentRect.height - gap;
      left = triggerRect.right - contentRect.width;
      break;

    case "bottom-start":
      top = triggerRect.bottom + gap;
      left = triggerRect.left;
      break;

    case "bottom-end":
      top = triggerRect.bottom + gap;
      left = triggerRect.right - contentRect.width;
      break;

    case "bottom":
    default:
      top = triggerRect.bottom + gap;
      left =
        triggerRect.left +
        (triggerRect.width - contentRect.width) / 2;
  }

  const viewportPadding = 8;

  left = Math.max(
    viewportPadding,
    Math.min(
      left,
      window.innerWidth -
        contentRect.width -
        viewportPadding
    )
  );

  top = Math.max(
    viewportPadding,
    Math.min(
      top,
      window.innerHeight -
        contentRect.height -
        viewportPadding
    )
  );

  return { top, left };
}