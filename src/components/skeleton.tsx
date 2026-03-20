import * as React from "react";
import { cn } from "../lib/utils";

/**
 * Skeleton Loader — now with size presets and optional glass.
 *
 * Size presets let you match common text/element sizes without
 * manually setting h-* w-* classes:
 *   "text-xs"  → h-3
 *   "text-sm"  → h-3.5
 *   "text-base"→ h-4
 *   "text-lg"  → h-5
 *   "text-xl"  → h-6
 *   "text-2xl" → h-7
 *   "avatar-sm"→ h-8 w-8   rounded-full
 *   "avatar"   → h-10 w-10 rounded-full
 *   "avatar-lg"→ h-12 w-12 rounded-full
 *
 * You can also pass explicit `width` and `height` props
 * (any Tailwind size value like "40", "full", "1/2").
 */

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular";
  animation?: "pulse" | "wave" | "none";
  /**
   * Quick size preset. Overrides default height/width for the variant.
   */
  size?:
    | "text-xs"
    | "text-sm"
    | "text-base"
    | "text-lg"
    | "text-xl"
    | "text-2xl"
    | "avatar-sm"
    | "avatar"
    | "avatar-lg";
  /** Tailwind height class value, e.g. "6", "10", "48" */
  height?: string;
  /** Tailwind width class value, e.g. "40", "full", "1/2" */
  width?: string;
  /** Use glass background. Default: false. */
  glass?: boolean;
}

const sizePresets: Record<
  NonNullable<SkeletonProps["size"]>,
  string
> = {
  "text-xs": "h-3 w-full rounded",
  "text-sm": "h-3.5 w-full rounded",
  "text-base": "h-4 w-full rounded",
  "text-lg": "h-5 w-full rounded",
  "text-xl": "h-6 w-full rounded",
  "text-2xl": "h-7 w-full rounded",
  "avatar-sm": "h-8 w-8 rounded-full",
  avatar: "h-10 w-10 rounded-full",
  "avatar-lg": "h-12 w-12 rounded-full",
};

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      className,
      variant = "rectangular",
      animation = "pulse",
      size,
      height,
      width,
      glass = false,
      ...props
    },
    ref,
  ) => {
    const baseClasses = glass ? "glass-card bg-muted" : "bg-muted";

    const variantClasses = {
      text: "h-4 w-full rounded",
      circular: "rounded-full",
      rectangular: "rounded-xl",
    };

    const animationClasses = {
      pulse: "animate-pulse",
      wave: "animate-shimmer bg-gradient-to-r from-muted via-muted-foreground/20 to-muted bg-[length:200%_100%]",
      none: "",
    };

    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          // Size preset takes priority over variant default
          size ? sizePresets[size] : variantClasses[variant],
          animationClasses[animation],
          // Explicit height/width override everything
          height && `h-${height}`,
          width && `w-${width}`,
          className,
        )}
        {...(props as any)}
      />
    );
  },
);
Skeleton.displayName = "Skeleton";

/**
 * Skeleton variants for common use cases
 */
const SkeletonText: React.FC<{ lines?: number; className?: string }> = ({
  lines = 3,
  className,
}) => (
  <div className={cn("space-y-2", className)}>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton
        key={i}
        variant="text"
        className={i === lines - 1 ? "w-3/4" : "w-full"}
      />
    ))}
  </div>
);

const SkeletonCard: React.FC<{ className?: string; glass?: boolean }> = ({
  className,
  glass = false,
}) => (
  <div
    className={cn(
      "rounded-xl p-4 space-y-3",
      glass ? "glass-card" : "bg-card border border-border",
      className,
    )}
  >
    <Skeleton className="h-48 w-full" />
    <Skeleton variant="text" className="w-3/4" />
    <Skeleton variant="text" className="w-1/2" />
  </div>
);

const SkeletonAvatar: React.FC<{
  size?: "sm" | "md" | "lg";
  className?: string;
}> = ({ size = "md", className }) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  return (
    <Skeleton variant="circular" className={cn(sizeClasses[size], className)} />
  );
};

const SkeletonTable: React.FC<{
  rows?: number;
  columns?: number;
  className?: string;
}> = ({ rows = 5, columns = 4, className }) => (
  <div className={cn("space-y-2", className)}>
    {/* Header */}
    <div className="flex gap-4">
      {Array.from({ length: columns }).map((_, i) => (
        <Skeleton key={`header-${i}`} className="h-8 flex-1" />
      ))}
    </div>
    {/* Rows */}
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <div key={`row-${rowIndex}`} className="flex gap-4">
        {Array.from({ length: columns }).map((_, colIndex) => (
          <Skeleton
            key={`cell-${rowIndex}-${colIndex}`}
            className="h-12 flex-1"
          />
        ))}
      </div>
    ))}
  </div>
);

export { Skeleton, SkeletonText, SkeletonCard, SkeletonAvatar, SkeletonTable };
