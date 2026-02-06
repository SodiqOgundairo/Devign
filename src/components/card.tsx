import * as React from "react";
import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "../lib/utils";

/**
 * Card components with LIQUID GLASS effect
 * Features glassmorphism with backdrop blur and micro-interactions
 */

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { hover?: boolean }
>(({ className, hover = false, ...props }, ref) => (
  <motion.div
    ref={ref}
    className={cn(
      "glass-card rounded-xl",
      hover && "glass-hover cursor-pointer",
      className,
    )}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    {...(hover
      ? {
          whileHover: { y: -4, scale: 1.01 },
          whileTap: { scale: 0.99 },
          transition: { type: "spring", stiffness: 300, damping: 20 },
        }
      : {})}
    {...(props as HTMLMotionProps<"div">)}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-xl font-semibold leading-none tracking-tight",
      "transition-colors duration-200",
      className,
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

/**
 * StatCard - Glass dashboard statistics card with micro-interactions
 */
export interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  description?: string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  description,
  className,
}) => (
  <motion.div
    className={cn("glass-card rounded-xl overflow-hidden", className)}
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ y: -6, scale: 1.02 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
  >
    <CardContent className="p-6">
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <motion.p
            className="text-sm font-medium text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {title}
          </motion.p>
          <div className="flex items-baseline gap-2">
            <motion.span
              className="text-3xl font-bold text-foreground"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              {value}
            </motion.span>
            {trend && (
              <motion.span
                className={cn(
                  "text-sm font-medium flex items-center gap-1",
                  trend.isPositive ? "text-success" : "text-error",
                )}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 500 }}
              >
                <span className="text-lg">{trend.isPositive ? "↑" : "↓"}</span>
                {Math.abs(trend.value)}%
              </motion.span>
            )}
          </div>
          {description && (
            <motion.p
              className="text-xs text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {description}
            </motion.p>
          )}
        </div>
        {icon && (
          <motion.div
            className="rounded-lg bg-primary/10 p-3 text-primary"
            initial={{ opacity: 0, rotate: -180, scale: 0 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            whileHover={{ rotate: 360, scale: 1.1 }}
          >
            {icon}
          </motion.div>
        )}
      </div>
    </CardContent>
  </motion.div>
);
StatCard.displayName = "StatCard";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  StatCard,
};
