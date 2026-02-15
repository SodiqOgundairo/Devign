import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

// =============================================================================
// HEADING
// =============================================================================

const headingVariants = cva("font-semibold tracking-tight text-foreground", {
  variants: {
    size: {
      "4xl": "text-4xl lg:text-5xl",
      "3xl": "text-3xl lg:text-4xl",
      "2xl": "text-2xl lg:text-3xl",
      xl: "text-xl lg:text-2xl",
      lg: "text-lg lg:text-xl",
      md: "text-base lg:text-lg",
    },
    weight: {
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      black: "font-black",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
    gradient: {
      none: "",
      primary:
        "bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent",
      accent:
        "bg-gradient-to-r from-accent to-ember bg-clip-text text-transparent",
      cool: "bg-gradient-to-r from-primary via-sky to-accent bg-clip-text text-transparent",
    },
  },
  defaultVariants: {
    size: "2xl",
    weight: "semibold",
    align: "left",
    gradient: "none",
  },
});

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface HeadingProps
  extends
    React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: HeadingLevel;
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    { className, as: Tag = "h2", size, weight, align, gradient, ...props },
    ref,
  ) => (
    <Tag
      ref={ref}
      className={cn(
        headingVariants({ size, weight, align, gradient }),
        className,
      )}
      {...(props as any)}
    />
  ),
);
Heading.displayName = "Heading";

// =============================================================================
// TEXT
// =============================================================================

const textVariants = cva("text-foreground", {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
    },
    weight: {
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    variant: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      primary: "text-primary",
      accent: "text-accent",
      success: "text-success",
      warning: "text-warning",
      error: "text-error",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
    },
    leading: {
      tight: "leading-tight",
      snug: "leading-snug",
      normal: "leading-normal",
      relaxed: "leading-relaxed",
      loose: "leading-loose",
    },
    truncate: {
      true: "truncate",
      false: "",
    },
  },
  defaultVariants: {
    size: "md",
    weight: "normal",
    variant: "default",
    align: "left",
    leading: "normal",
    truncate: false,
  },
});

type TextElement = "p" | "span" | "div" | "label" | "small" | "strong" | "em";

export interface TextProps
  extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof textVariants> {
  as?: TextElement;
}

const Text = React.forwardRef<HTMLElement, TextProps>(
  (
    {
      className,
      as: Tag = "p",
      size,
      weight,
      variant,
      align,
      leading,
      truncate,
      ...props
    },
    ref,
  ) => (
    <Tag
      ref={ref as any}
      className={cn(
        textVariants({ size, weight, variant, align, leading, truncate }),
        className,
      )}
      {...(props as any)}
    />
  ),
);
Text.displayName = "Text";

// =============================================================================
// CODE — inline and block
// =============================================================================

export interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  block?: boolean;
}

const Code = React.forwardRef<HTMLElement, CodeProps>(
  ({ className, block = false, children, ...props }, ref) => {
    if (block) {
      return (
        <pre
          className={cn(
            "glass-card rounded-xl p-4 overflow-x-auto text-sm font-mono",
            "border border-border text-foreground",
            className,
          )}
          {...(props as any)}
        >
          <code>{children}</code>
        </pre>
      );
    }

    return (
      <code
        ref={ref as any}
        className={cn(
          "rounded px-1.5 py-0.5 font-mono text-sm",
          "bg-muted text-primary border border-border/50",
          className,
        )}
        {...(props as any)}
      >
        {children}
      </code>
    );
  },
);
Code.displayName = "Code";

// =============================================================================
// LEAD — large intro paragraph
// =============================================================================

export interface LeadProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const Lead = React.forwardRef<HTMLParagraphElement, LeadProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-xl text-muted-foreground leading-relaxed", className)}
      {...(props as any)}
    />
  ),
);
Lead.displayName = "Lead";

// =============================================================================
// BLOCKQUOTE
// =============================================================================

export interface BlockquoteProps extends React.HTMLAttributes<HTMLQuoteElement> {}

const Blockquote = React.forwardRef<HTMLQuoteElement, BlockquoteProps>(
  ({ className, ...props }, ref) => (
    <blockquote
      ref={ref}
      className={cn(
        "border-l-4 border-primary pl-4 italic text-muted-foreground",
        "glass-card rounded-r-xl py-3 pr-4",
        className,
      )}
      {...(props as any)}
    />
  ),
);
Blockquote.displayName = "Blockquote";

export { Heading, Text, Code, Lead, Blockquote, headingVariants, textVariants };
