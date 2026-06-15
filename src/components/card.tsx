import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "../lib/utils";

/* ---------------------------------------------------------------------------
   Glass helper — returns decomposed Tailwind-compatible classes so that
   tailwind-merge can properly deduplicate bg-*, border-*, shadow-*, etc.
   This is the key fix for the `!` override problem.
   --------------------------------------------------------------------------- */
type GlassLevel = "sm" | "md" | "lg";

const glassClasses: Record<GlassLevel, string> = {
  sm: "glass-card-sm",
  md: "glass-card-md",
  lg: "glass-card-lg",
};

/* ---------------------------------------------------------------------------
   Card Variants (CVA)
   --------------------------------------------------------------------------- */
const cardVariants = cva("rounded-xl", {
  variants: {
    variant: {
      // Glass is handled dynamically via the `glass` prop — see Card component
      glass: "",
      solid: "bg-card text-card-foreground border border-border shadow-sm",
      flat: "bg-card text-card-foreground",
      outline: "border border-border bg-transparent text-foreground",
      ghost: "bg-transparent text-foreground",
    },
  },
  defaultVariants: {
    variant: "glass",
  },
});

/* ---------------------------------------------------------------------------
   Radius & shadow presets — override the variant defaults per-instance.
   Merged last via cn() so a passed `className` still wins.
   --------------------------------------------------------------------------- */
const cardRadius = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  full: "rounded-full",
} as const;

const cardShadow = {
  none: "shadow-none",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
} as const;

/* ---------------------------------------------------------------------------
   Card
   --------------------------------------------------------------------------- */
export interface CardProps
  extends HTMLMotionProps<"div">,
    VariantProps<typeof cardVariants> {
  hover?: boolean;
  /**
   * Glass intensity. Only applies when `variant="glass"` (the default).
   * - `"sm"` — subtle frosted hint
   * - `"md"` — balanced glass (default)
   * - `"lg"` — heavy frosted glass
   * - `false` — no glass, same as `variant="solid"`
   */
  glass?: GlassLevel | false;
  /** Border radius preset. Overrides the variant default (xl). */
  radius?: keyof typeof cardRadius;
  /** Box-shadow preset. Overrides the variant default. */
  shadow?: keyof typeof cardShadow;
  /** Disable entrance/hover animations. Default: true. */
  animated?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = false, variant = "glass", glass, radius, shadow, animated = true, ...props }, ref) => {
    // Resolve glass level — only meaningful for glass variant
    const resolvedGlass =
      variant === "glass"
        ? glass === false
          ? null
          : glass ?? "md"
        : null;

    if (!animated) {
      return (
        <div
          ref={ref}
          className={cn(
            cardVariants({ variant }),
            resolvedGlass && glassClasses[resolvedGlass],
            radius && cardRadius[radius],
            shadow && cardShadow[shadow],
            hover && "hover:-translate-y-1 hover:shadow-lg transition-all cursor-pointer",
            className,
          )}
          {...(props as any)}
        />
      );
    }

    return (
      <motion.div
        ref={ref}
        className={cn(
          cardVariants({ variant }),
          resolvedGlass && glassClasses[resolvedGlass],
          radius && cardRadius[radius],
          shadow && cardShadow[shadow],
          hover && "glass-hover cursor-pointer",
          className,
        )}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        {...(hover
          ? {
              whileHover: { y: -4, scale: 1.01 },
              whileTap: { scale: 0.99 },
              transition: { type: "spring", stiffness: 300, damping: 20 },
            }
          : {
              transition: { duration: 0.3, ease: "easeOut" },
            })}
        {...(props as any)}
      />
    );
  },
);
Card.displayName = "Card";

/* ---------------------------------------------------------------------------
   CardHeader
   --------------------------------------------------------------------------- */
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...(props as any)}
  />
));
CardHeader.displayName = "CardHeader";

/* ---------------------------------------------------------------------------
   CardTitle
   --------------------------------------------------------------------------- */
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
    {...(props as any)}
  />
));
CardTitle.displayName = "CardTitle";

/* ---------------------------------------------------------------------------
   CardDescription
   --------------------------------------------------------------------------- */
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...(props as any)}
  />
));
CardDescription.displayName = "CardDescription";

/* ---------------------------------------------------------------------------
   CardContent  (padding + direction props)
   --------------------------------------------------------------------------- */
const contentPadding = {
  none: "p-0",
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
} as const;

export interface CardContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Padding preset. Default: `"lg"` (p-6, matches legacy behavior).
   * Use `"none"` to remove padding entirely.
   */
  padding?: keyof typeof contentPadding;
  /**
   * Layout direction for content. Default: `"vertical"`.
   * Use `"horizontal"` for row layouts (e.g. list items).
   */
  direction?: "vertical" | "horizontal";
}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  (
    {
      className,
      padding = "lg",
      direction = "vertical",
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn(
        contentPadding[padding],
        direction === "horizontal" && "flex items-center gap-3",
        className,
      )}
      {...(props as any)}
    />
  ),
);
CardContent.displayName = "CardContent";

/* ---------------------------------------------------------------------------
   CardFooter
   --------------------------------------------------------------------------- */
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...(props as any)}
  />
));
CardFooter.displayName = "CardFooter";

/* ---------------------------------------------------------------------------
   StatCard
   --------------------------------------------------------------------------- */
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
  /** Card appearance. Default: `"glass"`. */
  variant?: CardProps["variant"];
  /** Glass intensity (when variant="glass"). Default: `"md"`. */
  glass?: CardProps["glass"];
  /** Border radius preset. */
  radius?: CardProps["radius"];
  /** Box-shadow preset. */
  shadow?: CardProps["shadow"];
  /** Disable staggered entrance animations. Default: true. */
  animated?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  description,
  className,
  variant = "glass",
  glass,
  radius,
  shadow,
  animated = true,
}) => {
  const resolvedGlass =
    variant === "glass"
      ? glass === false
        ? null
        : glass ?? "md"
      : null;

  const cardClasses = cn(
    cardVariants({ variant }),
    resolvedGlass && glassClasses[resolvedGlass],
    "rounded-xl overflow-hidden",
    radius && cardRadius[radius],
    shadow && cardShadow[shadow],
    className,
  );

  const content = (
    <CardContent padding="lg">
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-foreground">{value}</span>
            {trend && (
              <span
                className={cn(
                  "text-sm font-medium flex items-center gap-1",
                  trend.isPositive ? "text-success" : "text-error",
                )}
              >
                <span className="text-lg">{trend.isPositive ? "↑" : "↓"}</span>
                {Math.abs(trend.value)}%
              </span>
            )}
          </div>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
        {icon && (
          <div className="rounded-lg bg-primary/10 p-3 text-primary">{icon}</div>
        )}
      </div>
    </CardContent>
  );

  if (!animated) {
    return <div className={cardClasses}>{content}</div>;
  }

  return (
    <motion.div
      className={cardClasses}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {content}
    </motion.div>
  );
};
StatCard.displayName = "StatCard";

export type { GlassLevel };

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  StatCard,
  cardVariants,
  glassClasses,
};
