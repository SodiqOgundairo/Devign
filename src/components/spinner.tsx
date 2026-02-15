import * as React from "react";
import { motion } from "motion/react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const spinnerVariants = cva("", {
  variants: {
    size: {
      xs: "h-3 w-3 border",
      sm: "h-4 w-4 border-2",
      md: "h-6 w-6 border-2",
      lg: "h-8 w-8 border-[3px]",
      xl: "h-12 w-12 border-4",
    },
    variant: {
      primary: "border-primary/30 border-t-primary",
      secondary: "border-secondary/30 border-t-secondary",
      accent: "border-accent/30 border-t-accent",
      white: "border-white/30 border-t-white",
      muted: "border-muted-foreground/30 border-t-muted-foreground",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "primary",
  },
});

export interface SpinnerProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
  label?: string;
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size, variant, label = "Loading...", ...props }, ref) => (
    <div
      ref={ref}
      role="status"
      aria-label={label}
      className={cn("inline-flex items-center justify-center", className)}
      {...(props as any)}
    >
      <motion.div
        className={cn("rounded-full", spinnerVariants({ size, variant }))}
        animate={{ rotate: 360 }}
        transition={{ duration: 0.75, repeat: Infinity, ease: "linear" }}
      />
      <span className="sr-only">{label}</span>
    </div>
  ),
);
Spinner.displayName = "Spinner";

// =============================================================================
// LOADING OVERLAY — covers a container with a spinner
// =============================================================================

export interface LoadingOverlayProps {
  loading: boolean;
  children: React.ReactNode;
  label?: string;
  className?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  loading,
  children,
  label = "Loading...",
  className,
}) => (
  <div className={cn("relative", className)}>
    {children}
    {loading && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 flex items-center justify-center glass rounded-xl z-10"
      >
        <div className="flex flex-col items-center gap-3">
          <Spinner size="lg" />
          {label && (
            <span className="text-sm text-muted-foreground">{label}</span>
          )}
        </div>
      </motion.div>
    )}
  </div>
);
LoadingOverlay.displayName = "LoadingOverlay";

export { Spinner, LoadingOverlay, spinnerVariants };
