import { motion } from "motion/react";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";
import type { GlassLevel } from "./card";

/**
 * Input with optional glassmorphism and micro-interactions.
 *
 * Variants:
 *   default — glass border input (legacy)
 *   filled  — glass-card fill
 *   ghost   — transparent until hover
 *   plain   — standard solid input, no glass, fully Tailwind-composable
 *
 * The `glass` prop controls blur intensity for glass-based variants.
 * Set `glass={false}` to disable glass on any variant.
 */

const inputVariants = cva(
  [
    "flex w-full rounded-xl px-3 py-2",
    "text-base text-foreground",
    "placeholder:text-muted-foreground",
    "transition-all duration-250",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "file:border-0 file:bg-transparent file:text-sm file:font-medium",
    "md:text-sm",
  ],
  {
    variants: {
      variant: {
        default: [
          "border border-border",
          "focus-visible:border-primary focus-visible:shadow-primary",
        ],
        filled: [
          "focus-visible:border-primary",
        ],
        ghost: [
          "hover:bg-muted/50",
          "focus-visible:border-primary",
        ],
        plain: [
          "bg-background border border-border",
          "focus-visible:border-primary focus-visible:ring-primary/20",
        ],
      },
      inputSize: {
        sm: "h-8 px-2 text-xs rounded-lg",
        default: "h-10 px-3",
        lg: "h-12 px-4 text-base",
      },
      state: {
        default: "",
        error: [
          "border-error text-error",
          "focus-visible:ring-error/50 focus-visible:border-error",
        ],
        success: [
          "border-success text-success",
          "focus-visible:ring-success/50 focus-visible:border-success",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
      state: "default",
    },
  },
);

/** Glass classes for input — using utility classes from styles.css */
const inputGlassClasses: Record<GlassLevel, string> = {
  sm: "glass-input-sm",
  md: "glass-input-md",
  lg: "glass-input-lg",
};

const inputFilledGlassClasses: Record<GlassLevel, string> = {
  sm: "glass-card-sm",
  md: "glass-card-md",
  lg: "glass-card-lg",
};

export interface InputProps
  extends
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
  error?: string;
  hint?: string;
  /**
   * Glass intensity. Default: `"md"` for glass-based variants, ignored for `plain`.
   * Set to `false` to disable glass on any variant.
   */
  glass?: GlassLevel | false;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      variant = "default",
      inputSize,
      state,
      leftIcon,
      rightIcon,
      leftAddon,
      rightAddon,
      error,
      hint,
      disabled,
      glass,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const hasError = !!error || state === "error";
    const currentState = hasError ? "error" : state;

    // Resolve glass: plain variant never gets glass; others get md by default
    const resolvedGlass =
      variant === "plain"
        ? null
        : glass === false
          ? null
          : glass ?? "md";

    const glassClass = resolvedGlass
      ? variant === "filled"
        ? inputFilledGlassClasses[resolvedGlass]
        : variant === "ghost"
          ? inputGlassClasses[resolvedGlass]
          : inputGlassClasses[resolvedGlass]
      : null;

    return (
      <div className="w-full">
        <motion.div
          className="relative flex items-center"
          animate={{
            scale: isFocused ? 1.01 : 1,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Left Addon */}
          {leftAddon && (
            <div className="flex items-center border border-r-0 border-border rounded-l-xl px-3 h-10 bg-muted">
              {leftAddon}
            </div>
          )}

          {/* Left Icon with animation */}
          {leftIcon && !leftAddon && (
            <motion.div
              className="absolute left-3 text-muted-foreground pointer-events-none"
              animate={{
                x: isFocused ? 2 : 0,
                scale: isFocused ? 1.1 : 1,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              {leftIcon}
            </motion.div>
          )}

          <input
            type={type}
            className={cn(
              inputVariants({ variant, inputSize, state: currentState }),
              glassClass,
              leftIcon && !leftAddon && "pl-10",
              rightIcon && !rightAddon && "pr-10",
              leftAddon && "rounded-l-none",
              rightAddon && "rounded-r-none",
              className,
            )}
            ref={ref}
            disabled={disabled}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            aria-invalid={hasError}
            aria-describedby={
              error
                ? `${props.id}-error`
                : hint
                  ? `${props.id}-hint`
                  : undefined
            }
            {...(props as any)}
          />

          {/* Right Icon with animation */}
          {rightIcon && !rightAddon && (
            <motion.div
              className="absolute right-3 text-muted-foreground pointer-events-none"
              animate={{
                x: isFocused ? -2 : 0,
                scale: isFocused ? 1.1 : 1,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              {rightIcon}
            </motion.div>
          )}

          {/* Right Addon */}
          {rightAddon && (
            <div className="flex items-center border border-l-0 border-border rounded-r-xl px-3 h-10 bg-muted">
              {rightAddon}
            </div>
          )}
        </motion.div>

        {/* Error Message with slide animation */}
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="mt-1.5 text-xs text-error"
            id={`${props.id}-error`}
          >
            {error}
          </motion.p>
        )}

        {/* Hint Text */}
        {hint && !error && (
          <p
            className="mt-1.5 text-xs text-muted-foreground"
            id={`${props.id}-hint`}
          >
            {hint}
          </p>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

/**
 * Label with micro-interaction
 */
export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, required, children, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        "text-sm font-medium text-foreground leading-none",
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        "transition-all duration-200 hover:translate-x-0.5",
        className,
      )}
      {...(props as any)}
    >
      {children}
      {required && <span className="text-error ml-1">*</span>}
    </label>
  ),
);
Label.displayName = "Label";

/**
 * FormField with staggered animations
 */
export interface FormFieldProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  htmlFor,
  required,
  error,
  hint,
  children,
  className,
}) => {
  return (
    <motion.div
      className={cn("space-y-2", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Label htmlFor={htmlFor} required={required}>
        {label}
      </Label>
      {children}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-error"
        >
          {error}
        </motion.p>
      )}
      {hint && !error && (
        <p className="text-xs text-muted-foreground">{hint}</p>
      )}
    </motion.div>
  );
};
FormField.displayName = "FormField";

/**
 * Textarea with optional glass effect
 */
export interface TextareaProps
  extends
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    Omit<VariantProps<typeof inputVariants>, "inputSize"> {
  error?: string;
  hint?: string;
  glass?: GlassLevel | false;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant = "default", state, error, hint, glass, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const hasError = !!error || state === "error";
    const currentState = hasError ? "error" : state;

    const resolvedGlass =
      variant === "plain"
        ? null
        : glass === false
          ? null
          : glass ?? "md";

    const glassClass = resolvedGlass ? inputGlassClasses[resolvedGlass] : null;

    return (
      <div className="w-full">
        <textarea
          className={cn(
            inputVariants({ variant, state: currentState }),
            glassClass,
            "min-h-[80px] resize-y transition-transform duration-200",
            isFocused && "scale-[1.01]",
            className,
          )}
          ref={ref}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          aria-invalid={hasError}
          {...(props as any)}
        />
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1.5 text-xs text-error"
          >
            {error}
          </motion.p>
        )}
        {hint && !error && (
          <p className="mt-1.5 text-xs text-muted-foreground">{hint}</p>
        )}
      </div>
    );
  },
);
Textarea.displayName = "Textarea";

export { Input, Label, FormField, Textarea, inputVariants };
