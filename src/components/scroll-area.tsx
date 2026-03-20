import * as React from "react";
import { cn } from "../lib/utils";

/**
 * ScrollArea — styled scrollable container with custom scrollbar.
 *
 * Usage:
 *   <ScrollArea className="h-64">
 *     <p>Long content...</p>
 *   </ScrollArea>
 *
 *   <ScrollArea orientation="horizontal" className="w-full">
 *     <div className="flex gap-4">...</div>
 *   </ScrollArea>
 */

export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Scroll direction. Default: "vertical". */
  orientation?: "vertical" | "horizontal" | "both";
  /** Hide scrollbar completely. Default: false. */
  hideScrollbar?: boolean;
}

const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  (
    { className, orientation = "vertical", hideScrollbar = false, children, ...props },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn(
        "relative",
        orientation === "vertical" && "overflow-y-auto overflow-x-hidden",
        orientation === "horizontal" && "overflow-x-auto overflow-y-hidden",
        orientation === "both" && "overflow-auto",
        hideScrollbar && "scrollbar-none",
        className,
      )}
      {...(props as any)}
    >
      {children}
    </div>
  ),
);
ScrollArea.displayName = "ScrollArea";

export { ScrollArea };
