import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Badge variants following Flock design system
 * Used for status indicators, tags, and labels
 */
const badgeVariants = cva(
  [
    "inline-flex items-center rounded-full px-2.5 py-0.5",
    "text-xs font-semibold",
    "transition-colors",
  ],
  {
    variants: {
      variant: {
        // Filled variants
        primary: "bg-true-azure text-seasalt",
        secondary: "bg-dark-amethyst text-seasalt",
        accent: "bg-sunflower-gold text-black",
        ember: "bg-autumn-ember text-seasalt",
        success: "bg-success text-seasalt",
        warning: "bg-warning text-black",
        error: "bg-error text-seasalt",

        // Outline variants
        "outline-primary":
          "border border-true-azure text-true-azure bg-transparent",
        "outline-secondary":
          "border border-dark-amethyst text-dark-amethyst bg-transparent",
        "outline-accent":
          "border border-sunflower-gold text-sunflower-gold bg-transparent",
        "outline-success": "border border-success text-success bg-transparent",
        "outline-warning": "border border-warning text-warning bg-transparent",
        "outline-error": "border border-error text-error bg-transparent",

        // Soft variants (light background)
        "soft-primary": "bg-true-azure/10 text-true-azure",
        "soft-secondary": "bg-dark-amethyst/10 text-dark-amethyst",
        "soft-accent": "bg-sunflower-gold/10 text-sunflower-gold",
        "soft-success": "bg-success/10 text-success",
        "soft-warning": "bg-warning/10 text-warning",
        "soft-error": "bg-error/10 text-error",

        // Default/neutral
        default: "bg-muted text-muted-foreground",
      },
      size: {
        sm: "px-2 py-0.5 text-[10px]",
        default: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, dot, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            "mr-1.5 h-1.5 w-1.5 rounded-full",
            variant?.includes("success") && "bg-success",
            variant?.includes("warning") && "bg-warning",
            variant?.includes("error") && "bg-error",
            variant?.includes("primary") && "bg-true-azure",
            !variant && "bg-current",
          )}
        />
      )}
      {children}
    </div>
  ),
);
Badge.displayName = "Badge";

/**
 * StatusBadge - Preset badge for common status values
 */
export interface StatusBadgeProps {
  status: "active" | "inactive" | "pending" | "success" | "error" | "warning";
  children?: React.ReactNode;
  className?: string;
}

const statusMap = {
  active: { variant: "soft-success" as const, label: "Active" },
  inactive: { variant: "default" as const, label: "Inactive" },
  pending: { variant: "soft-warning" as const, label: "Pending" },
  success: { variant: "soft-success" as const, label: "Success" },
  error: { variant: "soft-error" as const, label: "Error" },
  warning: { variant: "soft-warning" as const, label: "Warning" },
};

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  children,
  className,
}) => {
  const { variant, label } = statusMap[status];
  return (
    <Badge variant={variant} dot className={className}>
      {children || label}
    </Badge>
  );
};
StatusBadge.displayName = "StatusBadge";

export { Badge, StatusBadge, badgeVariants };
