import * as React from "react";
import { useSpring, useTransform, motion } from "motion/react";
import { cn } from "../lib/utils";

/**
 * AnimatedNumber — spring-animated counting display.
 *
 * Usage:
 *   <AnimatedNumber value={1234} />
 *   <AnimatedNumber value={99.5} format={(n) => `${n.toFixed(1)}%`} />
 *   <AnimatedNumber value={5000} format={(n) => `$${n.toLocaleString()}`} duration={1.5} />
 *   <AnimatedNumber value={42} animated={false} />  ← static
 */

export interface AnimatedNumberProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  /** The target number value. */
  value: number;
  /** Format function. Default: locale-aware integer formatting. */
  format?: (value: number) => string;
  /** Animation duration in seconds. Default: 0.8. */
  duration?: number;
  /** Spring stiffness. Default: 100. */
  stiffness?: number;
  /** Spring damping. Default: 30. */
  damping?: number;
  /** Disable animation (render static). Default: true. */
  animated?: boolean;
}

const defaultFormat = (n: number) =>
  Number.isInteger(n) ? n.toLocaleString() : n.toLocaleString(undefined, { maximumFractionDigits: 2 });

const AnimatedNumber = React.forwardRef<HTMLSpanElement, AnimatedNumberProps>(
  (
    {
      value,
      format = defaultFormat,
      duration = 0.8,
      stiffness = 100,
      damping = 30,
      animated = true,
      className,
      ...props
    },
    ref,
  ) => {
    const spring = useSpring(0, { stiffness, damping, duration });
    const display = useTransform(spring, (latest) => format(latest));

    React.useEffect(() => {
      if (animated) {
        spring.set(value);
      }
    }, [value, animated, spring]);

    if (!animated) {
      return (
        <span ref={ref} className={className} {...(props as any)}>
          {format(value)}
        </span>
      );
    }

    return (
      <motion.span ref={ref} className={cn("tabular-nums", className)} {...(props as any)}>
        {display}
      </motion.span>
    );
  },
);
AnimatedNumber.displayName = "AnimatedNumber";

export { AnimatedNumber };
