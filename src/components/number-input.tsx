import * as React from "react";
import { motion } from "motion/react";
import { Minus, Plus } from "lucide-react";
import { cn } from "../lib/utils";

export interface NumberInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "onChange" | "value" | "size"
> {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  size?: "sm" | "md" | "lg";
  error?: string;
  hint?: string;
}

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      className,
      value,
      onChange,
      min = -Infinity,
      max = Infinity,
      step = 1,
      size = "md",
      disabled,
      error,
      hint,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = React.useState<number>(
      value ?? 0,
    );

    const current = value !== undefined ? value : internalValue;

    const set = (next: number) => {
      const clamped = Math.min(Math.max(next, min), max);
      setInternalValue(clamped);
      onChange?.(clamped);
    };

    const sizeClasses = {
      sm: { input: "h-8 text-xs", btn: "h-8 w-8" },
      md: { input: "h-10 text-sm", btn: "h-10 w-10" },
      lg: { input: "h-12 text-base", btn: "h-12 w-12" },
    };

    const canDecrement = current > min;
    const canIncrement = current < max;

    return (
      <div className="w-full">
        <div
          className={cn(
            "inline-flex items-center glass-card border border-border rounded-xl overflow-hidden",
            error && "border-error",
            disabled && "opacity-50 cursor-not-allowed",
          )}
        >
          {/* Decrement */}
          <motion.button
            type="button"
            onClick={() => set(current - step)}
            disabled={disabled || !canDecrement}
            whileTap={{ scale: 0.9 }}
            className={cn(
              "flex items-center justify-center shrink-0",
              "text-muted-foreground hover:text-foreground hover:bg-muted/50",
              "transition-colors duration-150",
              "disabled:opacity-30 disabled:cursor-not-allowed",
              "border-r border-border",
              sizeClasses[size].btn,
            )}
            aria-label="Decrease"
          >
            <Minus className="h-3.5 w-3.5" />
          </motion.button>

          {/* Input */}
          <input
            ref={ref}
            type="number"
            value={current}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            onChange={(e) => set(parseFloat(e.target.value) || 0)}
            className={cn(
              "flex-1 min-w-0 text-center bg-transparent",
              "text-foreground font-medium",
              "focus:outline-none",
              "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
              sizeClasses[size].input,
              className,
            )}
            {...(props as any)}
          />

          {/* Increment */}
          <motion.button
            type="button"
            onClick={() => set(current + step)}
            disabled={disabled || !canIncrement}
            whileTap={{ scale: 0.9 }}
            className={cn(
              "flex items-center justify-center shrink-0",
              "text-muted-foreground hover:text-foreground hover:bg-muted/50",
              "transition-colors duration-150",
              "disabled:opacity-30 disabled:cursor-not-allowed",
              "border-l border-border",
              sizeClasses[size].btn,
            )}
            aria-label="Increase"
          >
            <Plus className="h-3.5 w-3.5" />
          </motion.button>
        </div>

        {error && <p className="mt-1.5 text-xs text-error">{error}</p>}
        {hint && !error && (
          <p className="mt-1.5 text-xs text-muted-foreground">{hint}</p>
        )}
      </div>
    );
  },
);
NumberInput.displayName = "NumberInput";

export { NumberInput };
