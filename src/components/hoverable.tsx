import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { cn } from "../lib/utils";

/**
 * Hoverable — wraps any content with rich, adjustable hover effects.
 *
 * Preset effects (composable — use multiple at once):
 *   "lift"       — float up with shadow
 *   "scale"      — grow on hover
 *   "glow"       — primary-colored shadow
 *   "tilt"       — 3D perspective tilt following cursor
 *   "spotlight"  — radial light follows cursor
 *   "magnetic"   — element subtly follows cursor
 *   "shine"      — light sweep across surface
 *   "pop"        — scale + lift combo
 *   "press"      — scale down (pressed feel)
 *   "bounce"     — spring bounce on enter
 *
 * Intensity: "sm" | "md" | "lg" controls how strong the effect is.
 *
 * Usage:
 *   <Hoverable effect="tilt">         — single effect
 *   <Hoverable effect={["tilt","glow"]}> — multiple effects
 *   <Hoverable effect="tilt" intensity="lg"> — stronger
 *   <Hoverable effect={false}>        — disabled (renders plain div)
 */

type HoverEffect =
  | "lift"
  | "scale"
  | "glow"
  | "tilt"
  | "spotlight"
  | "magnetic"
  | "shine"
  | "pop"
  | "press"
  | "bounce";

type Intensity = "sm" | "md" | "lg";

export interface HoverableProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Effect preset(s). Pass false to disable. */
  effect: HoverEffect | HoverEffect[] | false;
  /** How strong the effect is. Default: "md". */
  intensity?: Intensity;
  /** Glow color override (CSS color value). Defaults to primary. */
  glowColor?: string;
  children: React.ReactNode;
  /** Render as a different element. Default: "div". */
  as?: "div" | "span" | "li" | "article" | "section";
}

// ── intensity multipliers ──
const intensityScale: Record<Intensity, number> = { sm: 0.5, md: 1, lg: 1.6 };

// ── lift presets ──
const liftY: Record<Intensity, number> = { sm: -2, md: -4, lg: -8 };

// ── scale presets ──
const scaleUp: Record<Intensity, number> = { sm: 1.015, md: 1.03, lg: 1.06 };
const scaleDown: Record<Intensity, number> = { sm: 0.985, md: 0.97, lg: 0.94 };

// ── tilt presets (degrees) ──
const tiltMax: Record<Intensity, number> = { sm: 4, md: 8, lg: 15 };

// ── magnetic presets (px) ──
const magneticRange: Record<Intensity, number> = { sm: 4, md: 8, lg: 16 };

const Hoverable = React.forwardRef<HTMLDivElement, HoverableProps>(
  (
    {
      effect,
      intensity = "md",
      glowColor,
      className,
      children,
      style,
      as: Tag = "div",
      ...props
    },
    ref,
  ) => {
    // Disabled — render plain div
    if (effect === false) {
      return (
        <Tag ref={ref as any} className={className} style={style} {...(props as any)}>
          {children}
        </Tag>
      );
    }

    const effects = Array.isArray(effect) ? effect : [effect];
    const scale = intensityScale[intensity];

    // ── Mouse position for tilt / spotlight / magnetic ──
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isHovered, setIsHovered] = React.useState(false);

    const needsMouse = effects.some((e) =>
      ["tilt", "spotlight", "magnetic"].includes(e),
    );

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!needsMouse) return;
      const rect = e.currentTarget.getBoundingClientRect();
      // Normalize to -0.5 … +0.5
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => {
      setIsHovered(false);
      mouseX.set(0);
      mouseY.set(0);
    };

    // ── Tilt transforms ──
    const maxDeg = tiltMax[intensity];
    const springConfig = { stiffness: 300, damping: 20 };
    const rotateX = useSpring(
      useTransform(mouseY, [-0.5, 0.5], [maxDeg, -maxDeg]),
      springConfig,
    );
    const rotateY = useSpring(
      useTransform(mouseX, [-0.5, 0.5], [-maxDeg, maxDeg]),
      springConfig,
    );

    // ── Magnetic offset ──
    const magRange = magneticRange[intensity];
    const magX = useSpring(
      useTransform(mouseX, [-0.5, 0.5], [-magRange, magRange]),
      springConfig,
    );
    const magY = useSpring(
      useTransform(mouseY, [-0.5, 0.5], [-magRange, magRange]),
      springConfig,
    );

    // ── Spotlight position (%) ──
    const spotX = useTransform(mouseX, [-0.5, 0.5], [0, 100]);
    const spotY = useTransform(mouseY, [-0.5, 0.5], [0, 100]);

    // ── Build motion props ──
    const whileHover: Record<string, any> = {};
    const transition: Record<string, any> = {
      type: "spring",
      stiffness: 300,
      damping: 20,
    };

    for (const fx of effects) {
      switch (fx) {
        case "lift":
          whileHover.y = liftY[intensity];
          break;
        case "scale":
          whileHover.scale = scaleUp[intensity];
          break;
        case "pop":
          whileHover.scale = scaleUp[intensity];
          whileHover.y = liftY[intensity] * 0.5;
          break;
        case "press":
          whileHover.scale = scaleDown[intensity];
          break;
        case "bounce":
          transition.type = "spring";
          transition.stiffness = 500;
          transition.damping = 12;
          whileHover.scale = scaleUp[intensity];
          break;
        case "glow":
          // Handled via CSS class
          break;
        case "shine":
          // Handled via CSS class
          break;
        case "tilt":
          // Handled via rotateX/rotateY motion values
          break;
        case "magnetic":
          // Handled via magX/magY motion values
          break;
        case "spotlight":
          // Handled via custom style in render
          break;
      }
    }

    // ── CSS classes for non-JS effects ──
    const cssEffects: string[] = [];
    if (effects.includes("glow")) cssEffects.push("hover-glow");
    if (effects.includes("shine")) cssEffects.push("hover-shine");
    if (effects.includes("lift") && !effects.includes("pop"))
      cssEffects.push(
        intensity === "sm" ? "hover-lift-sm" : "hover-lift",
      );

    // ── Dynamic style for tilt ──
    const motionStyle: Record<string, any> = { ...style };
    if (effects.includes("tilt")) {
      motionStyle.rotateX = rotateX;
      motionStyle.rotateY = rotateY;
      motionStyle.transformStyle = "preserve-3d";
      motionStyle.perspective = 800;
    }
    if (effects.includes("magnetic")) {
      motionStyle.x = magX;
      motionStyle.y = magY;
    }

    // ── Glow color override ──
    const glowStyle = glowColor
      ? ({ "--_hover-glow": glowColor } as React.CSSProperties)
      : undefined;

    return (
      <motion.div
        ref={ref}
        className={cn(
          ...cssEffects,
          effects.includes("tilt") && "will-change-transform",
          className,
        )}
        style={{ ...motionStyle, ...glowStyle }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        whileHover={Object.keys(whileHover).length > 0 ? whileHover : undefined}
        transition={transition}
        {...(props as any)}
      >
        {children}

        {/* Spotlight overlay */}
        {effects.includes("spotlight") && (
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-[inherit] z-10"
            style={{
              opacity: isHovered ? 0.15 * scale : 0,
              background: useTransform(
                [spotX, spotY],
                ([x, y]) =>
                  `radial-gradient(circle at ${x}% ${y}%, var(--color-primary), transparent 60%)`,
              ),
              transition: "opacity 0.3s",
            }}
          />
        )}
      </motion.div>
    );
  },
);
Hoverable.displayName = "Hoverable";

export { Hoverable };
export type { HoverEffect, Intensity };
