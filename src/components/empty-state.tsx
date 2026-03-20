import { motion } from "motion/react";
import * as React from "react";
import { cn } from "../lib/utils";
import { Button } from "./button";
import type { GlassLevel } from "./card";
import { glassClasses } from "./card";

/**
 * Empty State component — glass is now optional.
 * Default: no glass (solid card background).
 * Pass `glass="sm"` / `"md"` / `"lg"` to enable glassmorphism.
 */

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  /** Glass intensity. Default: no glass. */
  glass?: GlassLevel | false;
  /** Disable entrance animations. Default: true. */
  animated?: boolean;
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, icon, title, description, action, glass, animated = true, ...props }, ref) => {
    const resolvedGlass = glass ? glass : null;

    const wrapperClasses = cn(
      "flex flex-col items-center justify-center text-center p-8 rounded-xl",
      resolvedGlass
        ? glassClasses[resolvedGlass]
        : "bg-card text-card-foreground border border-border",
      className,
    );

    const content = (
      <>
        {icon && (
          <div className="mb-4 text-muted-foreground">{icon}</div>
        )}
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground mb-6 max-w-md">{description}</p>
        )}
        {action && (
          <Button onClick={action.onClick} variant="primary">
            {action.label}
          </Button>
        )}
      </>
    );

    if (!animated) {
      return (
        <div ref={ref} className={wrapperClasses} {...(props as any)}>
          {content}
        </div>
      );
    }

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={wrapperClasses}
        {...(props as any)}
      >
        {icon && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
            className="mb-4 text-muted-foreground"
          >
            {icon}
          </motion.div>
        )}
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg font-semibold text-foreground mb-2"
        >
          {title}
        </motion.h3>
        {description && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sm text-muted-foreground mb-6 max-w-md"
          >
            {description}
          </motion.p>
        )}
        {action && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button onClick={action.onClick} variant="primary">
              {action.label}
            </Button>
          </motion.div>
        )}
      </motion.div>
    );
  },
);
EmptyState.displayName = "EmptyState";

export { EmptyState };
