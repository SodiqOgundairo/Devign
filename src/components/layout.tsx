import * as React from "react";
import { cn } from "../lib/utils";

// =============================================================================
// CONTAINER — max-width page wrapper
// =============================================================================

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl" | "full";
  padded?: boolean;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = "xl", padded = true, ...props }, ref) => {
    const maxWidths = {
      sm: "max-w-screen-sm",
      md: "max-w-screen-md",
      lg: "max-w-screen-lg",
      xl: "max-w-screen-xl",
      full: "max-w-full",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "mx-auto w-full",
          maxWidths[size],
          padded && "px-4 md:px-6 lg:px-8",
          className,
        )}
        {...(props as any)}
      />
    );
  },
);
Container.displayName = "Container";

// =============================================================================
// STACK — vertical or horizontal flex container with consistent gap
// =============================================================================

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "row" | "col";
  gap?: 0 | 1 | 2 | 3 | 4 | 6 | 8 | 10 | 12;
  align?: "start" | "center" | "end" | "stretch" | "baseline";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  wrap?: boolean;
}

const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  (
    {
      className,
      direction = "col",
      gap = 4,
      align = "stretch",
      justify = "start",
      wrap = false,
      ...props
    },
    ref,
  ) => {
    const gapClasses: Record<number, string> = {
      0: "gap-0",
      1: "gap-1",
      2: "gap-2",
      3: "gap-3",
      4: "gap-4",
      6: "gap-6",
      8: "gap-8",
      10: "gap-10",
      12: "gap-12",
    };

    const alignClasses = {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
      baseline: "items-baseline",
    };

    const justifyClasses = {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex",
          direction === "col" ? "flex-col" : "flex-row",
          gapClasses[gap],
          alignClasses[align],
          justifyClasses[justify],
          wrap && "flex-wrap",
          className,
        )}
        {...(props as any)}
      />
    );
  },
);
Stack.displayName = "Stack";

// =============================================================================
// GRID — responsive grid layout
// =============================================================================

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  mdCols?: 1 | 2 | 3 | 4 | 6 | 12;
  lgCols?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: 2 | 4 | 6 | 8;
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols = 1, mdCols, lgCols, gap = 4, ...props }, ref) => {
    const colClasses: Record<number, string> = {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      6: "grid-cols-6",
      12: "grid-cols-12",
    };
    const mdColClasses: Record<number, string> = {
      1: "md:grid-cols-1",
      2: "md:grid-cols-2",
      3: "md:grid-cols-3",
      4: "md:grid-cols-4",
      6: "md:grid-cols-6",
      12: "md:grid-cols-12",
    };
    const lgColClasses: Record<number, string> = {
      1: "lg:grid-cols-1",
      2: "lg:grid-cols-2",
      3: "lg:grid-cols-3",
      4: "lg:grid-cols-4",
      6: "lg:grid-cols-6",
      12: "lg:grid-cols-12",
    };
    const gapClasses: Record<number, string> = {
      2: "gap-2",
      4: "gap-4",
      6: "gap-6",
      8: "gap-8",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "grid",
          colClasses[cols],
          mdCols && mdColClasses[mdCols],
          lgCols && lgColClasses[lgCols],
          gapClasses[gap],
          className,
        )}
        {...(props as any)}
      />
    );
  },
);
Grid.displayName = "Grid";

// =============================================================================
// DIVIDER — semantic section divider with optional label
// =============================================================================

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  orientation?: "horizontal" | "vertical";
}

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, label, orientation = "horizontal", ...props }, ref) => {
    if (orientation === "vertical") {
      return (
        <div
          ref={ref}
          className={cn("w-px self-stretch bg-border", className)}
          role="separator"
          aria-orientation="vertical"
          {...(props as any)}
        />
      );
    }

    if (label) {
      return (
        <div
          ref={ref}
          className={cn("flex items-center gap-3", className)}
          role="separator"
          {...(props as any)}
        >
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground whitespace-nowrap px-1">
            {label}
          </span>
          <div className="flex-1 h-px bg-border" />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn("h-px w-full bg-border", className)}
        role="separator"
        {...(props as any)}
      />
    );
  },
);
Divider.displayName = "Divider";

export { Container, Stack, Grid, Divider };
