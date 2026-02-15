import * as React from "react";
import { cn } from "../lib/utils";

// =============================================================================
// KBD — single keyboard key
// =============================================================================

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  size?: "sm" | "md" | "lg";
}

const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ className, size = "md", children, ...props }, ref) => (
    <kbd
      ref={ref as any}
      className={cn(
        "inline-flex items-center justify-center font-mono font-medium",
        "glass-card border border-border rounded",
        "text-foreground shadow-sm select-none",
        // Bottom shadow gives the "key" depth effect
        "shadow-[inset_0_-2px_0_0_rgba(0,0,0,0.15),0_1px_3px_rgba(0,0,0,0.1)]",
        {
          sm: "h-5 min-w-5 px-1 text-[10px]",
          md: "h-6 min-w-6 px-1.5 text-xs",
          lg: "h-7 min-w-7 px-2 text-sm",
        }[size],
        className,
      )}
      {...(props as any)}
    >
      {children}
    </kbd>
  ),
);
Kbd.displayName = "Kbd";

// =============================================================================
// SHORTCUT — renders a keyboard combination like ⌘ + K
// =============================================================================

export interface ShortcutProps {
  keys: string[];
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Shortcut: React.FC<ShortcutProps> = ({
  keys,
  size = "md",
  className,
}) => (
  <span className={cn("inline-flex items-center gap-1", className)}>
    {keys.map((key, i) => (
      <React.Fragment key={key}>
        <Kbd size={size}>{key}</Kbd>
        {i < keys.length - 1 && (
          <span className="text-muted-foreground text-xs">+</span>
        )}
      </React.Fragment>
    ))}
  </span>
);
Shortcut.displayName = "Shortcut";

export { Kbd, Shortcut };
