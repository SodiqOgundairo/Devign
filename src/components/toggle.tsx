import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "motion/react";
import { cn } from "../lib/utils";

/**
 * Toggle — a pressable button that toggles between on/off states.
 * ToggleGroup — a set of toggles where one (or many) can be active.
 *
 * Usage:
 *   <Toggle pressed={bold} onPressedChange={setBold}><Bold /></Toggle>
 *
 *   <ToggleGroup value={align} onValueChange={setAlign}>
 *     <ToggleGroupItem value="left"><AlignLeft /></ToggleGroupItem>
 *     <ToggleGroupItem value="center"><AlignCenter /></ToggleGroupItem>
 *     <ToggleGroupItem value="right"><AlignRight /></ToggleGroupItem>
 *   </ToggleGroup>
 */

const toggleVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium",
    "transition-colors duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-transparent text-muted-foreground",
          "hover:bg-muted hover:text-foreground",
          "data-[state=on]:bg-primary/10 data-[state=on]:text-primary",
        ],
        outline: [
          "border border-border bg-transparent text-muted-foreground",
          "hover:bg-muted hover:text-foreground",
          "data-[state=on]:bg-primary/10 data-[state=on]:text-primary data-[state=on]:border-primary",
        ],
        filled: [
          "bg-muted text-muted-foreground",
          "hover:bg-muted/80 hover:text-foreground",
          "data-[state=on]:bg-primary data-[state=on]:text-primary-foreground",
        ],
      },
      size: {
        sm: "h-8 px-2",
        default: "h-9 px-3",
        lg: "h-10 px-4",
        icon: "h-9 w-9",
        "icon-sm": "h-8 w-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

// ── Toggle ──
export interface ToggleProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange">,
    VariantProps<typeof toggleVariants> {
  /** Controlled pressed state. */
  pressed?: boolean;
  /** Default pressed state (uncontrolled). */
  defaultPressed?: boolean;
  /** Callback when pressed state changes. */
  onPressedChange?: (pressed: boolean) => void;
  /** Disable scale animation. Default: true. */
  animated?: boolean;
}

const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      className,
      variant,
      size,
      pressed: controlledPressed,
      defaultPressed = false,
      onPressedChange,
      animated = true,
      children,
      ...props
    },
    ref,
  ) => {
    const [internalPressed, setInternalPressed] = React.useState(defaultPressed);
    const isControlled = controlledPressed !== undefined;
    const pressed = isControlled ? controlledPressed : internalPressed;

    const handleClick = () => {
      const next = !pressed;
      if (!isControlled) setInternalPressed(next);
      onPressedChange?.(next);
    };

    const Comp = animated ? motion.button : "button";
    const motionProps = animated
      ? { whileTap: { scale: 0.95 }, transition: { type: "spring", stiffness: 400, damping: 17 } }
      : {};

    return (
      <Comp
        ref={ref}
        type="button"
        role="switch"
        aria-checked={pressed}
        data-state={pressed ? "on" : "off"}
        onClick={handleClick}
        className={cn(toggleVariants({ variant, size }), className)}
        {...motionProps}
        {...(props as any)}
      >
        {children}
      </Comp>
    );
  },
);
Toggle.displayName = "Toggle";

// ── ToggleGroup Context ──
interface ToggleGroupContextValue {
  value: string | string[];
  onValueChange: (value: string) => void;
  variant?: ToggleProps["variant"];
  size?: ToggleProps["size"];
  animated?: boolean;
  multiple?: boolean;
}

const ToggleGroupContext = React.createContext<ToggleGroupContextValue>({
  value: "",
  onValueChange: () => {},
});

// ── ToggleGroup ──
export interface ToggleGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Active value(s). String for single, string[] for multiple. */
  value: string | string[];
  /** Callback when value changes. */
  onValueChange: (value: string | string[]) => void;
  /** Allow multiple selections. Default: false. */
  multiple?: boolean;
  /** Variant passed to all items. */
  variant?: ToggleProps["variant"];
  /** Size passed to all items. */
  size?: ToggleProps["size"];
  /** Animated items. Default: true. */
  animated?: boolean;
}

const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(
  (
    {
      className,
      value,
      onValueChange,
      multiple = false,
      variant,
      size,
      animated = true,
      children,
      ...props
    },
    ref,
  ) => {
    const handleValueChange = (itemValue: string) => {
      if (multiple) {
        const arr = Array.isArray(value) ? value : [value];
        const next = arr.includes(itemValue)
          ? arr.filter((v) => v !== itemValue)
          : [...arr, itemValue];
        onValueChange(next);
      } else {
        onValueChange(itemValue === value ? "" : itemValue);
      }
    };

    return (
      <ToggleGroupContext.Provider
        value={{ value, onValueChange: handleValueChange, variant, size, animated, multiple }}
      >
        <div
          ref={ref}
          role="group"
          className={cn("flex items-center gap-1", className)}
          {...(props as any)}
        >
          {children}
        </div>
      </ToggleGroupContext.Provider>
    );
  },
);
ToggleGroup.displayName = "ToggleGroup";

// ── ToggleGroupItem ──
export interface ToggleGroupItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange">,
    VariantProps<typeof toggleVariants> {
  value: string;
}

const ToggleGroupItem = React.forwardRef<HTMLButtonElement, ToggleGroupItemProps>(
  ({ className, variant: itemVariant, size: itemSize, value: itemValue, children, ...props }, ref) => {
    const ctx = React.useContext(ToggleGroupContext);
    const isPressed = Array.isArray(ctx.value)
      ? ctx.value.includes(itemValue)
      : ctx.value === itemValue;

    return (
      <Toggle
        ref={ref}
        variant={itemVariant ?? ctx.variant}
        size={itemSize ?? ctx.size}
        pressed={isPressed}
        onPressedChange={() => ctx.onValueChange(itemValue)}
        animated={ctx.animated}
        className={className}
        {...(props as any)}
      >
        {children}
      </Toggle>
    );
  },
);
ToggleGroupItem.displayName = "ToggleGroupItem";

export { Toggle, ToggleGroup, ToggleGroupItem, toggleVariants };
