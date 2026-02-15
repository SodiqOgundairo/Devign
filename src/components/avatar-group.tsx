import * as React from "react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

export interface AvatarGroupItem {
  src?: string;
  fallback: string;
  alt?: string;
}

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  avatars: AvatarGroupItem[];
  max?: number;
  size?: "sm" | "md" | "lg";
  spacing?: "tight" | "normal" | "loose";
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  (
    { className, avatars, max = 5, size = "md", spacing = "normal", ...props },
    ref,
  ) => {
    const visible = avatars.slice(0, max);
    const overflow = avatars.length - max;

    const sizeClasses = {
      sm: "h-7 w-7 text-xs",
      md: "h-9 w-9 text-sm",
      lg: "h-11 w-11 text-base",
    };

    const spacingClasses = {
      tight: "-space-x-3",
      normal: "-space-x-2",
      loose: "-space-x-1",
    };

    return (
      <div
        ref={ref}
        className={cn("flex items-center", spacingClasses[spacing], className)}
        {...(props as any)}
      >
        {visible.map((avatar, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: i * 0.05,
              type: "spring",
              stiffness: 400,
              damping: 20,
            }}
            whileHover={{ zIndex: 10, scale: 1.15, translateY: -4 }}
            className="relative ring-2 ring-background rounded-full"
            style={{ zIndex: visible.length - i }}
          >
            <Avatar className={sizeClasses[size]}>
              {avatar.src && (
                <AvatarImage
                  src={avatar.src}
                  alt={avatar.alt || avatar.fallback}
                />
              )}
              <AvatarFallback className={sizeClasses[size]}>
                {avatar.fallback}
              </AvatarFallback>
            </Avatar>
          </motion.div>
        ))}

        {overflow > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: visible.length * 0.05 }}
            className={cn(
              "relative flex items-center justify-center rounded-full",
              "ring-2 ring-background",
              "glass-card font-medium text-muted-foreground",
              sizeClasses[size],
            )}
            style={{ zIndex: 0 }}
          >
            +{overflow}
          </motion.div>
        )}
      </div>
    );
  },
);
AvatarGroup.displayName = "AvatarGroup";

export { AvatarGroup };
