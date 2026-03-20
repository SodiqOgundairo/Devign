import * as React from "react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";

/**
 * Slider — range input with design system styling.
 *
 * Usage:
 *   <Slider value={50} onChange={setValue} />
 *   <Slider value={[20, 80]} onChange={setRange} />  ← range mode
 *   <Slider value={50} min={0} max={100} step={5} size="lg" />
 */

export interface SliderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Current value. Number for single, [min, max] tuple for range. */
  value: number | [number, number];
  /** Callback when value changes. */
  onChange?: (value: number | [number, number]) => void;
  /** Minimum value. Default: 0. */
  min?: number;
  /** Maximum value. Default: 100. */
  max?: number;
  /** Step increment. Default: 1. */
  step?: number;
  /** Track size. Default: "md". */
  size?: "sm" | "md" | "lg";
  /** Disabled state. */
  disabled?: boolean;
  /** Show value tooltip on thumb. Default: false. */
  showValue?: boolean;
  /** Enable animated thumb. Default: true. */
  animated?: boolean;
}

const trackSizes = {
  sm: "h-1",
  md: "h-1.5",
  lg: "h-2",
};

const thumbSizes = {
  sm: "h-3.5 w-3.5",
  md: "h-4.5 w-4.5",
  lg: "h-5.5 w-5.5",
};

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      value,
      onChange,
      min = 0,
      max = 100,
      step = 1,
      size = "md",
      disabled = false,
      showValue = false,
      animated = true,
      className,
      ...props
    },
    ref,
  ) => {
    const isRange = Array.isArray(value);
    const trackRef = React.useRef<HTMLDivElement>(null);

    const toPercent = (v: number) => ((v - min) / (max - min)) * 100;
    const fromPercent = (pct: number) => {
      const raw = min + (pct / 100) * (max - min);
      return Math.round(raw / step) * step;
    };

    const getPercentFromEvent = (e: React.PointerEvent | PointerEvent) => {
      const rect = trackRef.current?.getBoundingClientRect();
      if (!rect) return 0;
      return Math.min(100, Math.max(0, ((e.clientX - rect.left) / rect.width) * 100));
    };

    const [dragging, setDragging] = React.useState<null | "start" | "end" | "single">(null);

    const handlePointerDown = (thumb: "start" | "end" | "single") => (e: React.PointerEvent) => {
      if (disabled) return;
      e.preventDefault();
      setDragging(thumb);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: React.PointerEvent) => {
      if (!dragging || disabled) return;
      const pct = getPercentFromEvent(e);
      const newVal = fromPercent(pct);

      if (isRange) {
        const [s, end] = value as [number, number];
        if (dragging === "start") {
          onChange?.([Math.min(newVal, end), end]);
        } else {
          onChange?.([s, Math.max(newVal, s)]);
        }
      } else {
        onChange?.(newVal);
      }
    };

    const handlePointerUp = () => setDragging(null);

    // Track click
    const handleTrackClick = (e: React.PointerEvent) => {
      if (disabled) return;
      const pct = getPercentFromEvent(e);
      const newVal = fromPercent(pct);

      if (isRange) {
        const [s, end] = value as [number, number];
        // Move closest thumb
        if (Math.abs(newVal - s) < Math.abs(newVal - end)) {
          onChange?.([newVal, end]);
        } else {
          onChange?.([s, newVal]);
        }
      } else {
        onChange?.(newVal);
      }
    };

    const Thumb = animated ? motion.div : "div";
    const thumbMotion = animated
      ? { whileHover: { scale: 1.2 }, whileTap: { scale: 0.9 } }
      : {};

    const renderThumb = (pct: number, id: "start" | "end" | "single") => (
      <Thumb
        key={id}
        className={cn(
          "absolute top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full",
          "bg-primary border-2 border-background shadow-md cursor-grab",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          disabled && "cursor-not-allowed opacity-50",
          thumbSizes[size],
        )}
        style={{ left: `${pct}%` }}
        onPointerDown={handlePointerDown(id)}
        tabIndex={0}
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={isRange ? (id === "start" ? (value as [number, number])[0] : (value as [number, number])[1]) : (value as number)}
        {...(thumbMotion as any)}
      >
        {showValue && (
          <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-xs font-medium bg-primary text-primary-foreground px-1.5 py-0.5 rounded">
            {isRange
              ? id === "start"
                ? (value as [number, number])[0]
                : (value as [number, number])[1]
              : value as number}
          </span>
        )}
      </Thumb>
    );

    const startPct = isRange ? toPercent((value as [number, number])[0]) : 0;
    const endPct = isRange ? toPercent((value as [number, number])[1]) : toPercent(value as number);

    return (
      <div
        ref={ref}
        className={cn("relative w-full py-2", disabled && "opacity-50", className)}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        {...(props as any)}
      >
        {/* Track */}
        <div
          ref={trackRef}
          className={cn(
            "relative w-full rounded-full bg-muted cursor-pointer",
            trackSizes[size],
          )}
          onPointerDown={handleTrackClick}
        >
          {/* Active fill */}
          <div
            className="absolute h-full rounded-full bg-primary"
            style={{
              left: `${startPct}%`,
              width: `${endPct - startPct}%`,
            }}
          />
        </div>

        {/* Thumbs */}
        <div className="relative">
          {isRange ? (
            <>
              {renderThumb(startPct, "start")}
              {renderThumb(endPct, "end")}
            </>
          ) : (
            renderThumb(endPct, "single")
          )}
        </div>
      </div>
    );
  },
);
Slider.displayName = "Slider";

export { Slider };
