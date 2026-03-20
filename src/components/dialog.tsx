import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "../lib/utils";
import type { GlassLevel } from "./card";

/**
 * Dialog (Modal) — glass is opt-in, position & persistent support.
 *
 * Props on DialogContent:
 *   glass      — "sm" | "md" | "lg" | false (default: false — solid bg)
 *   position   — "center" | "top" | "bottom" (default: "center")
 *   persistent — if true, no close button, can't be closed via Esc or overlay click
 *   hideClose  — hide just the X button but still allow Esc / overlay close
 */

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

// ── Overlay ──
const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...(props as any)}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

// ── Position presets ──
type DialogPosition = "center" | "top" | "bottom";

const positionStyles: Record<DialogPosition, string> = {
  center: cn(
    "fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]",
    "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
    "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
    "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
  ),
  top: cn(
    "fixed left-[50%] top-0 translate-x-[-50%] mt-4 sm:mt-8",
    "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
    "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
  ),
  bottom: cn(
    "fixed left-[50%] bottom-0 translate-x-[-50%] mb-4 sm:mb-8",
    "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
    "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
  ),
};

// ── Glass class lookup (module-level) ──
const dialogGlassClasses: Record<GlassLevel, string> = {
  sm: "glass-card-sm",
  md: "glass-card-md",
  lg: "glass-card-lg",
};

// ── Content ──
export interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  /** Glass intensity. Default: false (solid). */
  glass?: GlassLevel | false;
  /** Modal position. Default: "center". */
  position?: DialogPosition;
  /** If true, cannot be closed via Esc, overlay click, or close button. Default: false. */
  persistent?: boolean;
  /** Hide just the close button (still closeable via Esc/overlay). Default: false. */
  hideClose?: boolean;
}

const preventDefault = (e: Event) => e.preventDefault();

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({
  className,
  children,
  glass = false,
  position = "center",
  persistent = false,
  hideClose = false,
  ...props
}, ref) => {
  const showClose = !persistent && !hideClose;

  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "z-50 grid w-full max-w-lg gap-4 p-6",
          "rounded-2xl shadow-2xl",
          positionStyles[position],
          glass
            ? dialogGlassClasses[glass as GlassLevel]
            : "bg-card text-card-foreground border border-border",
          "duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          className,
        )}
        onEscapeKeyDown={persistent ? preventDefault : undefined}
        onInteractOutside={persistent ? preventDefault : undefined}
        {...(props as any)}
      >
        {children}
        {showClose && (
          <DialogPrimitive.Close className="absolute right-4 top-4 rounded-lg p-2 hover:bg-muted/50 transition-all hover:rotate-90 duration-300 ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
});
DialogContent.displayName = DialogPrimitive.Content.displayName;

// ── Header ──
const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)}
    {...(props as any)}
  />
);
DialogHeader.displayName = "DialogHeader";

// ── Footer ──
const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
    {...(props as any)}
  />
);
DialogFooter.displayName = "DialogFooter";

// ── Title ──
const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...(props as any)}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

// ── Description ──
const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...(props as any)}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
