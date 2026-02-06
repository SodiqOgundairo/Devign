import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Radio Group with glassmorphism and EXPLOSIVE DISPERSION effect
 */

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  const [isChecked, setIsChecked] = React.useState(false);
  const [showExplosion, setShowExplosion] = React.useState(false);

  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-5 w-5 rounded-full glass-card border-2 border-border text-primary ring-offset-background relative",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "transition-all duration-300",
        "data-[state=checked]:border-primary data-[state=checked]:bg-primary/10",
        // Subtle glow
        "data-[state=checked]:shadow-[0_0_15px_rgba(80,0,171,0.3)]",
        "hover:scale-110 hover:shadow-[0_0_10px_rgba(80,0,171,0.2)]",
        className,
      )}
      onCheckedChange={(checked: boolean) => {
        if (checked) {
          setIsChecked(true);
          setShowExplosion(true);
          setTimeout(() => setShowExplosion(false), 800);
        } else {
          setIsChecked(false);
        }
      }}
      {...props}
    >
      {/* Explosion effect with DISPERSION */}
      <AnimatePresence>
        {showExplosion && (
          <>
            {[...Array(12)].map((_, i) => {
              // Random angle variation for dispersion
              const baseAngle = (i * 360) / 12;
              const angleVariation = (Math.random() - 0.5) * 30; // ±15 degrees
              const angle = baseAngle + angleVariation;

              // Random distance variation
              const baseDistance = 25;
              const distanceVariation = Math.random() * 15 - 5;
              const distance = baseDistance + distanceVariation;

              // Random size
              const size = 1 + Math.random() * 1.5;

              return (
                <motion.div
                  key={i}
                  className="absolute inset-0 pointer-events-none"
                  initial={{
                    scale: 0,
                    opacity: 1,
                    x: 0,
                    y: 0,
                  }}
                  animate={{
                    scale: 0,
                    opacity: 0,
                    x: Math.cos((angle * Math.PI) / 180) * distance,
                    y: Math.sin((angle * Math.PI) / 180) * distance,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.6 + Math.random() * 0.2,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <div
                    className="absolute top-1/2 left-1/2 rounded-full bg-primary shadow-[0_0_4px_rgba(80,0,171,0.5)]"
                    style={{
                      width: `${size}px`,
                      height: `${size}px`,
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                </motion.div>
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* Ripple effect on check */}
      <AnimatePresence>
        {isChecked && (
          <motion.div
            className="absolute inset-0 rounded-full bg-primary/20 shadow-[0_0_15px_rgba(80,0,171,0.3)]"
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 2.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 15 }}
        >
          <Circle className="h-2.5 w-2.5 fill-primary text-primary drop-shadow-[0_0_4px_rgba(80,0,171,0.5)]" />
        </motion.div>
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
