import * as React from "react";
import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";

/**
 * Breadcrumbs component with glassmorphism
 * For navigation hierarchy
 */

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbsProps extends React.ComponentProps<"nav"> {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
}

const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(
  ({ className, items, separator, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={cn("flex items-center space-x-1 text-sm", className)}
        {...props}
      >
        <ol className="flex items-center space-x-1">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={index} className="flex items-center space-x-1">
                {item.href || item.onClick ? (
                  <motion.a
                    href={item.href}
                    onClick={item.onClick}
                    whileHover={{ x: 2 }}
                    className={cn(
                      "transition-colors hover:text-primary",
                      isLast
                        ? "text-foreground font-medium"
                        : "text-muted-foreground",
                    )}
                    aria-current={isLast ? "page" : undefined}
                  >
                    {item.label}
                  </motion.a>
                ) : (
                  <span
                    className={cn(
                      isLast
                        ? "text-foreground font-medium"
                        : "text-muted-foreground",
                    )}
                    aria-current={isLast ? "page" : undefined}
                  >
                    {item.label}
                  </span>
                )}

                {!isLast && (
                  <ChevronRight
                    className="h-4 w-4 text-muted-foreground"
                    aria-hidden="true"
                  />
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  },
);
Breadcrumbs.displayName = "Breadcrumbs";

export { Breadcrumbs };
