import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";

/**
 * Alert/Banner component with glassmorphism
 * For system messages, notifications, and important info
 */

const alertVariants = cva(
  [
    "relative w-full rounded-xl glass-card border p-4",
    "transition-all duration-300",
    "[&>svg~*]:pl-7 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  ],
  {
    variants: {
      variant: {
        default: "bg-background text-foreground border-border",
        info: "border-primary/50 bg-primary/5 text-primary [&>svg]:text-primary",
        success:
          "border-success/50 bg-success/5 text-success [&>svg]:text-success",
        warning:
          "border-warning/50 bg-warning/5 text-warning [&>svg]:text-warning",
        error: "border-error/50 bg-error/5 text-error [&>svg]:text-error",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface AlertProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  dismissible?: boolean;
  onDismiss?: () => void;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, dismissible, onDismiss, children, ...props }, ref) => {
    const [isVisible, setIsVisible] = React.useState(true);

    const handleDismiss = () => {
      setIsVisible(false);
      setTimeout(() => onDismiss?.(), 300);
    };

    return (
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            className={cn(alertVariants({ variant }), className)}
            {...props}
          >
            {children}
            {dismissible && (
              <button
                onClick={handleDismiss}
                className="absolute right-4 top-4 rounded-md p-1 transition-colors hover:bg-muted"
                aria-label="Dismiss"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    );
  },
);
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
