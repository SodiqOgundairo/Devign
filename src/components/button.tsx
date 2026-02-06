import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps } from "motion/react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Button with GLASSMORPHISM and MICRO-INTERACTIONS
 * Features: ripple effect, hover glow, smooth transitions
 */
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
        // Filled variants with glass effect
        primary: [
          "bg-true-azure text-seasalt",
          "hover:bg-true-azure/90 hover:shadow-primary",
          "active:scale-95",
        ],
        secondary: [
          "bg-dark-amethyst text-seasalt",
          "hover:bg-dark-amethyst/90",
          "active:scale-95",
        ],
        accent: [
          "bg-sunflower-gold text-black",
          "hover:bg-sunflower-gold/90 hover:shadow-accent",
          "active:scale-95",
        ],
        ember: [
          "bg-autumn-ember text-seasalt",
          "hover:bg-autumn-ember/90",
          "active:scale-95",
        ],
        destructive: [
          "bg-error text-seasalt",
          "hover:bg-error/90",
          "active:scale-95",
        ],

        // Glass outline variants
        "outline-primary": [
          "glass border-2 border-true-azure text-true-azure",
          "hover:bg-true-azure/10 hover:border-true-azure/80",
        ],
        "outline-secondary": [
          "glass border-2 border-dark-amethyst text-dark-amethyst",
          "hover:bg-dark-amethyst/10",
        ],
        "outline-accent": [
          "glass border-2 border-sunflower-gold text-sunflower-gold",
          "hover:bg-sunflower-gold/10",
        ],
        "outline-ember": [
          "glass border-2 border-autumn-ember text-autumn-ember",
          "hover:bg-autumn-ember/10",
        ],
        "outline-destructive": [
          "glass border-2 border-error text-error",
          "hover:bg-error/10",
        ],

        // Ghost glass variants
        "ghost-primary": ["glass text-true-azure", "hover:bg-true-azure/10"],
        "ghost-secondary": [
          "glass text-dark-amethyst",
          "hover:bg-dark-amethyst/10",
        ],
        "ghost-accent": [
          "glass text-sunflower-gold",
          "hover:bg-sunflower-gold/10",
        ],
        "ghost-ember": ["glass text-autumn-ember", "hover:bg-autumn-ember/10"],
        "ghost-destructive": ["glass text-error", "hover:bg-error/10"],

        link: ["text-true-azure underline-offset-4", "hover:underline"],

        ghost: ["glass text-foreground", "hover:bg-muted"],
        outline: [
          "glass border border-border text-foreground",
          "hover:bg-muted",
        ],
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
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "style">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

/**
 * Ripple effect component
 */
const Ripple: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <motion.span
    className="absolute rounded-full bg-white/30"
    style={{
      left: x,
      top: y,
      width: 0,
      height: 0,
    }}
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
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setRipples([...ripples, { x, y, id: Date.now() }]);
      setTimeout(() => setRipples((prev) => prev.slice(1)), 600);

      onClick?.(e);
    };

    const Comp = asChild ? Slot : "button";

    const content = (
      <>
        {ripples.map((ripple) => (
          <Ripple key={ripple.id} x={ripple.x} y={ripple.y} />
        ))}
        {isLoading ? (
          <Loader2 className="animate-spin" />
        ) : leftIcon ? (
          leftIcon
        ) : null}
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
          {...props}
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
        {...(props as HTMLMotionProps<"button">)}
      >
        {content}
      </motion.button>
    );
  },
);
Button.displayName = "Button";

/**
 * Icon Button with enhanced micro-interactions
 */
export interface IconButtonProps extends ButtonProps {
  "aria-label": string;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ size = "icon", children, className, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        size={size}
        className={cn("rounded-full", className)}
        {...props}
      >
        {children}
      </Button>
    );
  },
);
IconButton.displayName = "IconButton";

export { Button, IconButton, buttonVariants };
