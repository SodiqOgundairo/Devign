import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const badgeVariants = cva(
  [
    "inline-flex items-center rounded-full px-2.5 py-0.5",
    "text-xs font-semibold",
    "transition-colors",
  ],
  {
    variants: {
      variant: {
        // Filled
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        accent: "bg-accent text-accent-foreground",
        ember: "bg-ember text-ember-foreground",
        success: "bg-success text-white",
        warning: "bg-warning text-black",
        error: "bg-error text-white",

        // Outline
        "outline-primary": "border border-primary text-primary bg-transparent",
        "outline-secondary":
          "border border-secondary text-secondary bg-transparent",
        "outline-accent": "border border-accent text-accent bg-transparent",
        "outline-success": "border border-success text-success bg-transparent",
        "outline-warning": "border border-warning text-warning bg-transparent",
        "outline-error": "border border-error text-error bg-transparent",

        // Soft
        "soft-primary": "bg-primary/10 text-primary",
        "soft-secondary": "bg-secondary/10 text-secondary",
        "soft-accent": "bg-accent/10 text-accent",
        "soft-success": "bg-success/10 text-success",
        "soft-warning": "bg-warning/10 text-warning",
        "soft-error": "bg-error/10 text-error",

        // Neutral
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
      {...(props as any)}
    >
      {dot && (
        <span className={cn("mr-1.5 h-1.5 w-1.5 rounded-full bg-current")} />
      )}
      {children}
    </div>
  ),
);
Badge.displayName = "Badge";

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
