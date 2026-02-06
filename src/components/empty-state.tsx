import * as React from "react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";
import { Button } from "@/components/ui/button";

/**
 * Empty State component with glassmorphism
 * For displaying when there's no data
 */

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, icon, title, description, action, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "flex flex-col items-center justify-center text-center p-8 glass-card rounded-xl",
          className,
        )}
        {...props}
      >
        {icon && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.1,
            }}
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
