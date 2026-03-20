import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { cn } from "../lib/utils";

/**
 * Collapsible — single-item expand/collapse (lighter than Accordion).
 *
 * Usage:
 *   <Collapsible>
 *     <CollapsibleTrigger>Show details</CollapsibleTrigger>
 *     <CollapsibleContent>Hidden content here</CollapsibleContent>
 *   </Collapsible>
 *
 *   // Controlled:
 *   <Collapsible open={isOpen} onOpenChange={setIsOpen}>...</Collapsible>
 */

interface CollapsibleContextValue {
  open: boolean;
  toggle: () => void;
  animated: boolean;
}

const CollapsibleContext = React.createContext<CollapsibleContextValue>({
  open: false,
  toggle: () => {},
  animated: true,
});

export interface CollapsibleProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Controlled open state. */
  open?: boolean;
  /** Callback when open state changes. */
  onOpenChange?: (open: boolean) => void;
  /** Start open. Default: false. */
  defaultOpen?: boolean;
  /** Enable expand/collapse animation. Default: true. */
  animated?: boolean;
}

const Collapsible = React.forwardRef<HTMLDivElement, CollapsibleProps>(
  (
    {
      open: controlledOpen,
      onOpenChange,
      defaultOpen = false,
      animated = true,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : internalOpen;

    const toggle = () => {
      const next = !open;
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    };

    return (
      <CollapsibleContext.Provider value={{ open, toggle, animated }}>
        <div ref={ref} className={className} {...(props as any)}>
          {children}
        </div>
      </CollapsibleContext.Provider>
    );
  },
);
Collapsible.displayName = "Collapsible";

// ── Trigger ──
export interface CollapsibleTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Show chevron indicator. Default: true. */
  showChevron?: boolean;
}

const CollapsibleTrigger = React.forwardRef<
  HTMLButtonElement,
  CollapsibleTriggerProps
>(({ className, showChevron = true, children, ...props }, ref) => {
  const { open, toggle } = React.useContext(CollapsibleContext);

  return (
    <button
      ref={ref}
      type="button"
      onClick={toggle}
      aria-expanded={open}
      className={cn(
        "flex w-full items-center justify-between gap-2 py-2 text-sm font-medium transition-colors hover:text-foreground",
        className,
      )}
      {...(props as any)}
    >
      {children}
      {showChevron && (
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      )}
    </button>
  );
});
CollapsibleTrigger.displayName = "CollapsibleTrigger";

// ── Content ──
const CollapsibleContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { open, animated } = React.useContext(CollapsibleContext);

  if (!animated) {
    if (!open) return null;
    return (
      <div ref={ref} className={className} {...(props as any)}>
        {children}
      </div>
    );
  }

  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          ref={ref}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className={cn("overflow-hidden", className)}
          {...(props as any)}
        >
          <div className="pt-1 pb-2">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});
CollapsibleContent.displayName = "CollapsibleContent";

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
