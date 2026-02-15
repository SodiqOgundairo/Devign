import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps } from "motion/react";
import { Loader2 } from "lucide-react";
import { cn } from "../lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "whitespace-nowrap rounded-xl text-sm font-medium",
    "transition-all duration-250",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    "relative overflow-hidden",
  ],
  {
    variants: {
      variant: {
        // Filled variants
        primary: [
          "bg-primary text-primary-foreground",
          "hover:bg-primary/90 hover:shadow-primary",
          "active:scale-95",
        ],
        secondary: [
          "bg-secondary text-secondary-foreground",
          "hover:bg-secondary/90",
          "active:scale-95",
        ],
        accent: [
          "bg-accent text-accent-foreground",
          "hover:bg-accent/90 hover:shadow-accent",
          "active:scale-95",
        ],
        ember: [
          "bg-ember text-ember-foreground",
          "hover:bg-ember/90",
          "active:scale-95",
        ],
        destructive: [
          "bg-destructive text-destructive-foreground",
          "hover:bg-destructive/90",
          "active:scale-95",
        ],

        // Outline variants
        "outline-primary": [
          "glass border-2 border-primary text-primary",
          "hover:bg-primary/10 hover:border-primary/80",
        ],
        "outline-secondary": [
          "glass border-2 border-secondary text-secondary",
          "hover:bg-secondary/10",
        ],
        "outline-accent": [
          "glass border-2 border-accent text-accent",
          "hover:bg-accent/10",
        ],
        "outline-ember": [
          "glass border-2 border-ember text-ember",
          "hover:bg-ember/10",
        ],
        "outline-destructive": [
          "glass border-2 border-destructive text-destructive",
          "hover:bg-destructive/10",
        ],

        // Ghost variants
        "ghost-primary": ["glass text-primary", "hover:bg-primary/10"],
        "ghost-secondary": ["glass text-secondary", "hover:bg-secondary/10"],
        "ghost-accent": ["glass text-accent", "hover:bg-accent/10"],
        "ghost-ember": ["glass text-ember", "hover:bg-ember/10"],
        "ghost-destructive": [
          "glass text-destructive",
          "hover:bg-destructive/10",
        ],

        // Neutral
        ghost: ["glass text-foreground", "hover:bg-muted"],
        outline: [
          "glass border border-border text-foreground",
          "hover:bg-muted",
        ],
        link: ["text-primary underline-offset-4", "hover:underline"],
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-12 rounded-xl px-6 text-base",
        xl: "h-14 rounded-xl px-8 text-lg",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
        "icon-lg": "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    Omit<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      "style" | "onAnimationStart"
    >,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Ripple: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <motion.span
    className="absolute rounded-full bg-white/30"
    style={{ left: x, top: y, width: 0, height: 0 }}
    initial={{ width: 0, height: 0, opacity: 0.5 }}
    animate={{ width: 300, height: 300, opacity: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  />
);

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      onClick,
      ...props
    },
    ref,
  ) => {
    const [ripples, setRipples] = React.useState<
      Array<{ x: number; y: number; id: number }>
    >([]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setRipples((prev) => [
        ...prev,
        { x: e.clientX - rect.left, y: e.clientY - rect.top, id: Date.now() },
      ]);
      setTimeout(() => setRipples((prev) => prev.slice(1)), 600);
      onClick?.(e);
    };

    const Comp = asChild ? Slot : "button";

    const content = (
      <>
        {ripples.map((r) => (
          <Ripple key={r.id} x={r.x} y={r.y} />
        ))}
        {isLoading ? <Loader2 className="animate-spin" /> : (leftIcon ?? null)}
        {children}
        {!isLoading && rightIcon}
      </>
    );

    if (asChild) {
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          disabled={disabled || isLoading}
          {...(props as any)}
        >
          {content}
        </Comp>
      );
    }

    return (
      <motion.button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        onClick={handleClick}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.03 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        {...(props as unknown as HTMLMotionProps<"button">)}
      >
        {content}
      </motion.button>
    );
  },
);
Button.displayName = "Button";

export interface IconButtonProps extends ButtonProps {
  "aria-label": string;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ size = "icon", children, className, ...props }, ref) => (
    <Button
      ref={ref}
      size={size}
      className={cn("rounded-full", className)}
      {...(props as any)}
    >
      {children}
    </Button>
  ),
);
IconButton.displayName = "IconButton";

export { Button, IconButton, buttonVariants };
