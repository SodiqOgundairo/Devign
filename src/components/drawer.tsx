import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "../lib/utils";
import type { GlassLevel } from "./card";

/**
 * Drawer / Sheet — slides in from any edge.
 *
 * Props on DrawerContent:
 *   position   — "right" | "left" | "top" | "bottom" (default: "right")
 *   size       — "sm" | "md" | "lg" | "full" (default: "md")
 *   glass      — glass intensity on panel (default: false — solid bg)
 *   persistent — if true, cannot be closed by overlay click or Esc (default: false)
 *
 * Usage:
 *   <Drawer open={open} onOpenChange={setOpen}>
 *     <DrawerTrigger asChild><Button>Open</Button></DrawerTrigger>
 *     <DrawerContent position="right" size="lg">
 *       <DrawerHeader title="Edit" description="..." />
 *       <DrawerBody>...</DrawerBody>
 *       <DrawerFooter>...</DrawerFooter>
 *     </DrawerContent>
 *   </Drawer>
 */

const Drawer = DialogPrimitive.Root;
const DrawerTrigger = DialogPrimitive.Trigger;
const DrawerClose = DialogPrimitive.Close;

// ── Size tokens ──
const hSizeClasses = {
  sm: "max-w-xs",      // 320px
  md: "max-w-md",      // 448px (~28rem)
  lg: "max-w-2xl",     // 672px (~42rem)
  full: "max-w-full",
} as const;

const vSizeClasses = {
  sm: "max-h-[30vh]",
  md: "max-h-[50vh]",
  lg: "max-h-[75vh]",
  full: "max-h-screen",
} as const;

// ── Slide directions ──
type Position = "right" | "left" | "top" | "bottom";

const slideAnimations: Record<Position, { in: string; out: string }> = {
  right: {
    in: "data-[state=open]:slide-in-from-right",
    out: "data-[state=closed]:slide-out-to-right",
  },
  left: {
    in: "data-[state=open]:slide-in-from-left",
    out: "data-[state=closed]:slide-out-to-left",
  },
  top: {
    in: "data-[state=open]:slide-in-from-top",
    out: "data-[state=closed]:slide-out-to-top",
  },
  bottom: {
    in: "data-[state=open]:slide-in-from-bottom",
    out: "data-[state=closed]:slide-out-to-bottom",
  },
};

const positionClasses: Record<Position, string> = {
  right: "inset-y-0 right-0",
  left: "inset-y-0 left-0",
  top: "inset-x-0 top-0",
  bottom: "inset-x-0 bottom-0",
};

const isHorizontal = (p: Position) => p === "left" || p === "right";

// ── Glass class lookup (module-level) ──
const drawerGlassClasses: Record<GlassLevel, string> = {
  sm: "glass-card-sm",
  md: "glass-card-md",
  lg: "glass-card-lg",
};

// ── Overlay ──
const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-overlay bg-black/50 backdrop-blur-sm",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...(props as any)}
  />
));
DrawerOverlay.displayName = "DrawerOverlay";

// ── Content ──
export interface DrawerContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  /** Which edge to slide from. Default: "right". */
  position?: Position;
  /** Panel width/height. Default: "md". */
  size?: "sm" | "md" | "lg" | "full";
  /** Glass intensity. Default: false (solid). */
  glass?: GlassLevel | false;
  /** If true, cannot be closed by overlay click or Esc key. Default: false. */
  persistent?: boolean;
}

const preventDefault = (e: Event) => e.preventDefault();

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DrawerContentProps
>(
  (
    {
      className,
      children,
      position = "right",
      size = "md",
      glass = false,
      persistent = false,
      ...props
    },
    ref,
  ) => {
    const horizontal = isHorizontal(position);
    const anim = slideAnimations[position];

    const panelClasses = cn(
      "fixed z-drawer flex flex-col shadow-xl",
      positionClasses[position],
      horizontal
        ? ["w-full", hSizeClasses[size], "h-full"]
        : ["h-auto", vSizeClasses[size], "w-full"],
      glass
        ? drawerGlassClasses[glass as GlassLevel]
        : "bg-card text-card-foreground border-l border-border",
      // Radix CSS animations
      "duration-300 ease-in-out",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      anim.in,
      anim.out,
      className,
    );

    return (
      <DialogPrimitive.Portal>
        <DrawerOverlay />
        <DialogPrimitive.Content
          ref={ref}
          className={panelClasses}
          onEscapeKeyDown={persistent ? preventDefault : undefined}
          onInteractOutside={persistent ? preventDefault : undefined}
          {...(props as any)}
        >
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    );
  },
);
DrawerContent.displayName = "DrawerContent";

// ── Header ──
export interface DrawerHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Hide the close button. Default: false. */
  hideClose?: boolean;
}

const DrawerHeader: React.FC<DrawerHeaderProps> = ({
  title,
  description,
  hideClose = false,
  className,
  children,
  ...props
}) => (
  <div
    className={cn(
      "flex items-start justify-between gap-4 px-6 py-4 border-b border-border shrink-0",
      className,
    )}
    {...(props as any)}
  >
    <div className="space-y-1 min-w-0">
      <DialogPrimitive.Title className="text-lg font-semibold leading-none tracking-tight">
        {title}
      </DialogPrimitive.Title>
      {description && (
        <DialogPrimitive.Description className="text-sm text-muted-foreground">
          {description}
        </DialogPrimitive.Description>
      )}
    </div>
    {!hideClose && (
      <DialogPrimitive.Close className="rounded-lg p-2 hover:bg-muted transition-colors shrink-0">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    )}
    {children}
  </div>
);
DrawerHeader.displayName = "DrawerHeader";

// ── Body (scrollable) ──
const DrawerBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex-1 overflow-y-auto px-6 py-4", className)}
    {...(props as any)}
  />
));
DrawerBody.displayName = "DrawerBody";

// ── Footer ──
const DrawerFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center justify-end gap-2 px-6 py-4 border-t border-border shrink-0",
      className,
    )}
    {...(props as any)}
  />
));
DrawerFooter.displayName = "DrawerFooter";

export {
  Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerOverlay,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
};
