import * as React11 from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown, X, ChevronRight, Loader2, Check, Circle, Minus, Plus, ChevronLeft, MoreHorizontal, ChevronUp } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { cva } from 'class-variance-authority';
import { AnimatePresence, motion } from 'motion/react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { Slot } from '@radix-ui/react-slot';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import * as SelectPrimitive from '@radix-ui/react-select';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as ToastPrimitives from '@radix-ui/react-toast';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

// src/components/accordion.tsx
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function formatCurrency(amount, currency = "NGN") {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount);
}
function formatDate(date, options) {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-NG", {
    dateStyle: "medium",
    ...options
  }).format(dateObj);
}
function formatRelativeTime(date) {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const now = /* @__PURE__ */ new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1e3);
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  if (diffInSeconds < 60) return rtf.format(-diffInSeconds, "second");
  if (diffInSeconds < 3600) return rtf.format(-Math.floor(diffInSeconds / 60), "minute");
  if (diffInSeconds < 86400) return rtf.format(-Math.floor(diffInSeconds / 3600), "hour");
  if (diffInSeconds < 604800) return rtf.format(-Math.floor(diffInSeconds / 86400), "day");
  if (diffInSeconds < 2592e3) return rtf.format(-Math.floor(diffInSeconds / 604800), "week");
  if (diffInSeconds < 31536e3) return rtf.format(-Math.floor(diffInSeconds / 2592e3), "month");
  return rtf.format(-Math.floor(diffInSeconds / 31536e3), "year");
}
function getInitials(name) {
  return name.split(" ").map((part) => part.charAt(0).toUpperCase()).slice(0, 2).join("");
}
function truncate(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + "...";
}
function debounce(func, wait) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), wait);
  };
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function generateId() {
  return Math.random().toString(36).substring(2, 11);
}
var Accordion = AccordionPrimitive.Root;
var AccordionItem = React11.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AccordionPrimitive.Item,
  {
    ref,
    className: cn("glass-card rounded-xl border border-border mb-2", className),
    ...props
  }
));
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = React11.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(AccordionPrimitive.Header, { className: "flex", children: /* @__PURE__ */ jsxs(
  AccordionPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex flex-1 items-center justify-between p-4 font-medium transition-all",
      "hover:bg-muted/50 rounded-xl",
      "[&[data-state=open]>svg]:rotate-180",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 shrink-0 transition-transform duration-200" })
    ]
  }
) }));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;
var AccordionContent = React11.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(
  AccordionPrimitive.Content,
  {
    ref,
    className: "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    ...props,
    children: /* @__PURE__ */ jsx("div", { className: cn("pb-4 pt-0 px-4", className), children })
  }
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;
var alertVariants = cva(
  [
    "relative w-full rounded-xl glass-card border p-4",
    "transition-all duration-300",
    "[&>svg~*]:pl-7 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground"
  ],
  {
    variants: {
      variant: {
        default: "bg-background text-foreground border-border",
        info: "border-primary/50 bg-primary/5 text-primary [&>svg]:text-primary",
        success: "border-success/50 bg-success/5 text-success [&>svg]:text-success",
        warning: "border-warning/50 bg-warning/5 text-warning [&>svg]:text-warning",
        error: "border-error/50 bg-error/5 text-error [&>svg]:text-error"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
var Alert = React11.forwardRef(
  ({ className, variant, dismissible, onDismiss, children, ...props }, ref) => {
    const [isVisible, setIsVisible] = React11.useState(true);
    const handleDismiss = () => {
      setIsVisible(false);
      setTimeout(() => onDismiss?.(), 300);
    };
    return /* @__PURE__ */ jsx(AnimatePresence, { children: isVisible && /* @__PURE__ */ jsxs(
      motion.div,
      {
        ref,
        initial: { opacity: 0, y: -10, scale: 0.95 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
        className: cn(alertVariants({ variant }), className),
        ...props,
        children: [
          children,
          dismissible && /* @__PURE__ */ jsx(
            "button",
            {
              onClick: handleDismiss,
              className: "absolute right-4 top-4 rounded-md p-1 transition-colors hover:bg-muted",
              "aria-label": "Dismiss",
              children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
            }
          )
        ]
      }
    ) });
  }
);
Alert.displayName = "Alert";
var AlertTitle = React11.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "h5",
  {
    ref,
    className: cn("mb-1 font-medium leading-none tracking-tight", className),
    ...props
  }
));
AlertTitle.displayName = "AlertTitle";
var AlertDescription = React11.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("text-sm [&_p]:leading-relaxed", className),
    ...props
  }
));
AlertDescription.displayName = "AlertDescription";
var Avatar = React11.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Root,
  {
    ref,
    className: cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    ),
    ...props
  }
));
Avatar.displayName = AvatarPrimitive.Root.displayName;
var AvatarImage = React11.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Image,
  {
    ref,
    className: cn("aspect-square h-full w-full", className),
    ...props
  }
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;
var AvatarFallback = React11.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Fallback,
  {
    ref,
    className: cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted text-sm font-medium",
      className
    ),
    ...props
  }
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;
var AvatarGroup = React11.forwardRef(
  ({ className, avatars, max = 5, size = "md", spacing = "normal", ...props }, ref) => {
    const visible = avatars.slice(0, max);
    const overflow = avatars.length - max;
    const sizeClasses = {
      sm: "h-7 w-7 text-xs",
      md: "h-9 w-9 text-sm",
      lg: "h-11 w-11 text-base"
    };
    const spacingClasses = {
      tight: "-space-x-3",
      normal: "-space-x-2",
      loose: "-space-x-1"
    };
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        className: cn("flex items-center", spacingClasses[spacing], className),
        ...props,
        children: [
          visible.map((avatar, i) => /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { opacity: 0, x: -10 },
              animate: { opacity: 1, x: 0 },
              transition: {
                delay: i * 0.05,
                type: "spring",
                stiffness: 400,
                damping: 20
              },
              whileHover: { zIndex: 10, scale: 1.15, translateY: -4 },
              className: "relative ring-2 ring-background rounded-full",
              style: { zIndex: visible.length - i },
              children: /* @__PURE__ */ jsxs(Avatar, { className: sizeClasses[size], children: [
                avatar.src && /* @__PURE__ */ jsx(
                  AvatarImage,
                  {
                    src: avatar.src,
                    alt: avatar.alt || avatar.fallback
                  }
                ),
                /* @__PURE__ */ jsx(AvatarFallback, { className: sizeClasses[size], children: avatar.fallback })
              ] })
            },
            i
          )),
          overflow > 0 && /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.8 },
              animate: { opacity: 1, scale: 1 },
              transition: { delay: visible.length * 0.05 },
              className: cn(
                "relative flex items-center justify-center rounded-full",
                "ring-2 ring-background",
                "glass-card font-medium text-muted-foreground",
                sizeClasses[size]
              ),
              style: { zIndex: 0 },
              children: [
                "+",
                overflow
              ]
            }
          )
        ]
      }
    );
  }
);
AvatarGroup.displayName = "AvatarGroup";
var badgeVariants = cva(
  [
    "inline-flex items-center rounded-full px-2.5 py-0.5",
    "text-xs font-semibold",
    "transition-colors"
  ],
  {
    variants: {
      variant: {
        // Filled
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        accent: "bg-accent text-accent-foreground",
        ember: "bg-ember text-ember-foreground",
        success: "bg-success text-white",
        warning: "bg-warning text-black",
        error: "bg-error text-white",
        // Outline
        "outline-primary": "border border-primary text-primary bg-transparent",
        "outline-secondary": "border border-secondary text-secondary bg-transparent",
        "outline-accent": "border border-accent text-accent bg-transparent",
        "outline-success": "border border-success text-success bg-transparent",
        "outline-warning": "border border-warning text-warning bg-transparent",
        "outline-error": "border border-error text-error bg-transparent",
        // Soft
        "soft-primary": "bg-primary/10 text-primary",
        "soft-secondary": "bg-secondary/10 text-secondary",
        "soft-accent": "bg-accent/10 text-accent",
        "soft-success": "bg-success/10 text-success",
        "soft-warning": "bg-warning/10 text-warning",
        "soft-error": "bg-error/10 text-error",
        // Neutral
        default: "bg-muted text-muted-foreground"
      },
      size: {
        sm: "px-2 py-0.5 text-[10px]",
        default: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
var Badge = React11.forwardRef(
  ({ className, variant, size, dot, children, ...props }, ref) => /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      className: cn(badgeVariants({ variant, size }), className),
      ...props,
      children: [
        dot && /* @__PURE__ */ jsx("span", { className: cn("mr-1.5 h-1.5 w-1.5 rounded-full bg-current") }),
        children
      ]
    }
  )
);
Badge.displayName = "Badge";
var statusMap = {
  active: { variant: "soft-success", label: "Active" },
  inactive: { variant: "default", label: "Inactive" },
  pending: { variant: "soft-warning", label: "Pending" },
  success: { variant: "soft-success", label: "Success" },
  error: { variant: "soft-error", label: "Error" },
  warning: { variant: "soft-warning", label: "Warning" }
};
var StatusBadge = ({
  status,
  children,
  className
}) => {
  const { variant, label } = statusMap[status];
  return /* @__PURE__ */ jsx(Badge, { variant, dot: true, className, children: children || label });
};
StatusBadge.displayName = "StatusBadge";
var Breadcrumbs = React11.forwardRef(
  ({ className, items, separator, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "nav",
      {
        ref,
        "aria-label": "Breadcrumb",
        className: cn("flex items-center space-x-1 text-sm", className),
        ...props,
        children: /* @__PURE__ */ jsx("ol", { className: "flex items-center space-x-1", children: items.map((item, index) => {
          const isLast = index === items.length - 1;
          return /* @__PURE__ */ jsxs("li", { className: "flex items-center space-x-1", children: [
            item.href || item.onClick ? /* @__PURE__ */ jsx(
              motion.a,
              {
                href: item.href,
                onClick: item.onClick,
                whileHover: { x: 2 },
                className: cn(
                  "transition-colors hover:text-primary",
                  isLast ? "text-foreground font-medium" : "text-muted-foreground"
                ),
                "aria-current": isLast ? "page" : void 0,
                children: item.label
              }
            ) : /* @__PURE__ */ jsx(
              "span",
              {
                className: cn(
                  isLast ? "text-foreground font-medium" : "text-muted-foreground"
                ),
                "aria-current": isLast ? "page" : void 0,
                children: item.label
              }
            ),
            !isLast && /* @__PURE__ */ jsx(
              ChevronRight,
              {
                className: "h-4 w-4 text-muted-foreground",
                "aria-hidden": "true"
              }
            )
          ] }, index);
        }) })
      }
    );
  }
);
Breadcrumbs.displayName = "Breadcrumbs";
var buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "whitespace-nowrap rounded-xl text-sm font-medium",
    "transition-all duration-250",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    "relative overflow-hidden"
  ],
  {
    variants: {
      variant: {
        // Filled variants
        primary: [
          "bg-primary text-primary-foreground",
          "hover:bg-primary/90 hover:shadow-primary",
          "active:scale-95"
        ],
        secondary: [
          "bg-secondary text-secondary-foreground",
          "hover:bg-secondary/90",
          "active:scale-95"
        ],
        accent: [
          "bg-accent text-accent-foreground",
          "hover:bg-accent/90 hover:shadow-accent",
          "active:scale-95"
        ],
        ember: [
          "bg-ember text-ember-foreground",
          "hover:bg-ember/90",
          "active:scale-95"
        ],
        destructive: [
          "bg-destructive text-destructive-foreground",
          "hover:bg-destructive/90",
          "active:scale-95"
        ],
        // Outline variants
        "outline-primary": [
          "glass border-2 border-primary text-primary",
          "hover:bg-primary/10 hover:border-primary/80"
        ],
        "outline-secondary": [
          "glass border-2 border-secondary text-secondary",
          "hover:bg-secondary/10"
        ],
        "outline-accent": [
          "glass border-2 border-accent text-accent",
          "hover:bg-accent/10"
        ],
        "outline-ember": [
          "glass border-2 border-ember text-ember",
          "hover:bg-ember/10"
        ],
        "outline-destructive": [
          "glass border-2 border-destructive text-destructive",
          "hover:bg-destructive/10"
        ],
        // Ghost variants
        "ghost-primary": ["glass text-primary", "hover:bg-primary/10"],
        "ghost-secondary": ["glass text-secondary", "hover:bg-secondary/10"],
        "ghost-accent": ["glass text-accent", "hover:bg-accent/10"],
        "ghost-ember": ["glass text-ember", "hover:bg-ember/10"],
        "ghost-destructive": [
          "glass text-destructive",
          "hover:bg-destructive/10"
        ],
        // Neutral
        ghost: ["glass text-foreground", "hover:bg-muted"],
        outline: [
          "glass border border-border text-foreground",
          "hover:bg-muted"
        ],
        link: ["text-primary underline-offset-4", "hover:underline"]
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-12 rounded-xl px-6 text-base",
        xl: "h-14 rounded-xl px-8 text-lg",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
        "icon-lg": "h-12 w-12"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "default"
    }
  }
);
var Ripple = ({ x, y }) => /* @__PURE__ */ jsx(
  motion.span,
  {
    className: "absolute rounded-full bg-white/30",
    style: { left: x, top: y, width: 0, height: 0 },
    initial: { width: 0, height: 0, opacity: 0.5 },
    animate: { width: 300, height: 300, opacity: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  }
);
var Button = React11.forwardRef(
  ({
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
  }, ref) => {
    const [ripples, setRipples] = React11.useState([]);
    const handleClick = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setRipples((prev) => [
        ...prev,
        { x: e.clientX - rect.left, y: e.clientY - rect.top, id: Date.now() }
      ]);
      setTimeout(() => setRipples((prev) => prev.slice(1)), 600);
      onClick?.(e);
    };
    const Comp = asChild ? Slot : "button";
    const content = /* @__PURE__ */ jsxs(Fragment, { children: [
      ripples.map((r) => /* @__PURE__ */ jsx(Ripple, { x: r.x, y: r.y }, r.id)),
      isLoading ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }) : leftIcon ?? null,
      children,
      !isLoading && rightIcon
    ] });
    if (asChild) {
      return /* @__PURE__ */ jsx(
        Comp,
        {
          className: cn(buttonVariants({ variant, size, className })),
          ref,
          disabled: disabled || isLoading,
          ...props,
          children: content
        }
      );
    }
    return /* @__PURE__ */ jsx(
      motion.button,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        disabled: disabled || isLoading,
        onClick: handleClick,
        whileHover: { scale: disabled || isLoading ? 1 : 1.03 },
        whileTap: { scale: disabled || isLoading ? 1 : 0.97 },
        transition: { type: "spring", stiffness: 400, damping: 17 },
        ...props,
        children: content
      }
    );
  }
);
Button.displayName = "Button";
var IconButton = React11.forwardRef(
  ({ size = "icon", children, className, ...props }, ref) => /* @__PURE__ */ jsx(
    Button,
    {
      ref,
      size,
      className: cn("rounded-full", className),
      ...props,
      children
    }
  )
);
IconButton.displayName = "IconButton";
var Card = React11.forwardRef(
  ({ className, hover = false, ...props }, ref) => /* @__PURE__ */ jsx(
    motion.div,
    {
      ref,
      className: cn(
        "glass-card rounded-xl",
        hover && "glass-hover cursor-pointer",
        className
      ),
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      ...hover ? {
        whileHover: { y: -4, scale: 1.01 },
        whileTap: { scale: 0.99 },
        transition: { type: "spring", stiffness: 300, damping: 20 }
      } : {
        transition: { duration: 0.3, ease: "easeOut" }
      },
      ...props
    }
  )
);
Card.displayName = "Card";
var CardHeader = React11.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("flex flex-col space-y-1.5 p-6", className),
    ...props
  }
));
CardHeader.displayName = "CardHeader";
var CardTitle = React11.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "h3",
  {
    ref,
    className: cn(
      "text-xl font-semibold leading-none tracking-tight",
      "transition-colors duration-200",
      className
    ),
    ...props
  }
));
CardTitle.displayName = "CardTitle";
var CardDescription = React11.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "p",
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
CardDescription.displayName = "CardDescription";
var CardContent = React11.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("p-6 pt-0", className), ...props }));
CardContent.displayName = "CardContent";
var CardFooter = React11.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("flex items-center p-6 pt-0", className),
    ...props
  }
));
CardFooter.displayName = "CardFooter";
var StatCard = ({
  title,
  value,
  icon,
  trend,
  description,
  className
}) => /* @__PURE__ */ jsx(
  motion.div,
  {
    className: cn("glass-card rounded-xl overflow-hidden", className),
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    whileHover: { y: -6, scale: 1.02 },
    transition: { type: "spring", stiffness: 300, damping: 20 },
    children: /* @__PURE__ */ jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-2 flex-1", children: [
        /* @__PURE__ */ jsx(
          motion.p,
          {
            className: "text-sm font-medium text-muted-foreground",
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: 0.1 },
            children: title
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-2", children: [
          /* @__PURE__ */ jsx(
            motion.span,
            {
              className: "text-3xl font-bold text-foreground",
              initial: { opacity: 0, x: -10 },
              animate: { opacity: 1, x: 0 },
              transition: { delay: 0.2, type: "spring" },
              children: value
            }
          ),
          trend && /* @__PURE__ */ jsxs(
            motion.span,
            {
              className: cn(
                "text-sm font-medium flex items-center gap-1",
                trend.isPositive ? "text-success" : "text-error"
              ),
              initial: { opacity: 0, scale: 0 },
              animate: { opacity: 1, scale: 1 },
              transition: { delay: 0.3, type: "spring", stiffness: 500 },
              children: [
                /* @__PURE__ */ jsx("span", { className: "text-lg", children: trend.isPositive ? "\u2191" : "\u2193" }),
                Math.abs(trend.value),
                "%"
              ]
            }
          )
        ] }),
        description && /* @__PURE__ */ jsx(
          motion.p,
          {
            className: "text-xs text-muted-foreground",
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: 0.4 },
            children: description
          }
        )
      ] }),
      icon && /* @__PURE__ */ jsx(
        motion.div,
        {
          className: "rounded-lg bg-primary/10 p-3 text-primary",
          initial: { opacity: 0, rotate: -180, scale: 0 },
          animate: { opacity: 1, rotate: 0, scale: 1 },
          transition: { delay: 0.2, type: "spring", stiffness: 200 },
          whileHover: { rotate: 360, scale: 1.1 },
          children: icon
        }
      )
    ] }) })
  }
);
StatCard.displayName = "StatCard";
var Checkbox = React11.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  CheckboxPrimitive.Root,
  {
    ref,
    className: cn(
      "peer h-5 w-5 shrink-0 rounded-md glass-card border border-border ring-offset-background",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary",
      "transition-all duration-200",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(
      CheckboxPrimitive.Indicator,
      {
        className: cn("flex items-center justify-center text-current"),
        children: /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { scale: 0, rotate: -180 },
            animate: { scale: 1, rotate: 0 },
            transition: { type: "spring", stiffness: 500, damping: 15 },
            children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" })
          }
        )
      }
    )
  }
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;
var Dialog = DialogPrimitive.Root;
var DialogTrigger = DialogPrimitive.Trigger;
var DialogPortal = DialogPrimitive.Portal;
var DialogClose = DialogPrimitive.Close;
var DialogOverlay = React11.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
var DialogContent = React11.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxs(
    DialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 p-6",
        "glass-strong border-2 border-white/30 rounded-2xl shadow-2xl",
        // Enhanced liquid glass effect
        "backdrop-blur-3xl bg-gradient-to-br from-white/80 via-white/60 to-white/40",
        "dark:from-gray-900/80 dark:via-gray-900/60 dark:to-gray-900/40",
        // Subtle glow effect
        "shadow-[0_0_30px_rgba(80,0,171,0.2),0_20px_60px_rgba(0,0,0,0.3)]",
        "dark:shadow-[0_0_40px_rgba(80,0,171,0.3),0_20px_80px_rgba(0,0,0,0.5)]",
        // Animations
        "duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
        "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxs(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-lg p-2 glass hover:bg-muted/50 transition-all hover:rotate-90 duration-300 ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = DialogPrimitive.Content.displayName;
var DialogHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    ),
    ...props
  }
);
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    ),
    ...props
  }
);
DialogFooter.displayName = "DialogFooter";
var DialogTitle = React11.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Title,
  {
    ref,
    className: cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  }
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
var DialogDescription = React11.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
var DropdownMenu = DropdownMenuPrimitive.Root;
var DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
var DropdownMenuGroup = DropdownMenuPrimitive.Group;
var DropdownMenuPortal = DropdownMenuPrimitive.Portal;
var DropdownMenuSub = DropdownMenuPrimitive.Sub;
var DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
var DropdownMenuSubTrigger = React11.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.SubTrigger,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronRight, { className: "ml-auto h-4 w-4" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
var DropdownMenuSubContent = React11.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
var DropdownMenuContent = React11.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
var DropdownMenuItem = React11.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
var DropdownMenuCheckboxItem = React11.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
var DropdownMenuRadioItem = React11.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Circle, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
var DropdownMenuLabel = React11.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Label,
  {
    ref,
    className: cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
var DropdownMenuSeparator = React11.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
var DropdownMenuShortcut = ({
  className,
  ...props
}) => {
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: cn("ml-auto text-xs tracking-widest opacity-60", className),
      ...props
    }
  );
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
var EmptyState = React11.forwardRef(
  ({ className, icon, title, description, action, ...props }, ref) => {
    return /* @__PURE__ */ jsxs(
      motion.div,
      {
        ref,
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        className: cn(
          "flex flex-col items-center justify-center text-center p-8 glass-card rounded-xl",
          className
        ),
        ...props,
        children: [
          icon && /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { scale: 0 },
              animate: { scale: 1 },
              transition: {
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.1
              },
              className: "mb-4 text-muted-foreground",
              children: icon
            }
          ),
          /* @__PURE__ */ jsx(
            motion.h3,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 0.2 },
              className: "text-lg font-semibold text-foreground mb-2",
              children: title
            }
          ),
          description && /* @__PURE__ */ jsx(
            motion.p,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 0.3 },
              className: "text-sm text-muted-foreground mb-6 max-w-md",
              children: description
            }
          ),
          action && /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.4 },
              children: /* @__PURE__ */ jsx(Button, { onClick: action.onClick, variant: "primary", children: action.label })
            }
          )
        ]
      }
    );
  }
);
EmptyState.displayName = "EmptyState";
var inputVariants = cva(
  [
    "flex w-full rounded-xl px-3 py-2",
    "text-base text-foreground",
    "placeholder:text-muted-foreground",
    "transition-all duration-250",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "file:border-0 file:bg-transparent file:text-sm file:font-medium",
    "md:text-sm"
  ],
  {
    variants: {
      variant: {
        default: [
          "glass border border-border",
          "focus-visible:border-primary focus-visible:shadow-primary"
        ],
        filled: [
          "glass-card",
          "focus-visible:glass-strong focus-visible:border-primary"
        ],
        ghost: [
          "glass",
          "hover:glass-card",
          "focus-visible:glass-strong focus-visible:border-primary"
        ]
      },
      inputSize: {
        sm: "h-8 px-2 text-xs rounded-lg",
        default: "h-10 px-3",
        lg: "h-12 px-4 text-base"
      },
      state: {
        default: "",
        error: [
          "border-error text-error",
          "focus-visible:ring-error/50 focus-visible:border-error"
        ],
        success: [
          "border-success text-success",
          "focus-visible:ring-success/50 focus-visible:border-success"
        ]
      }
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
      state: "default"
    }
  }
);
var Input = React11.forwardRef(
  ({
    className,
    type = "text",
    variant,
    inputSize,
    state,
    leftIcon,
    rightIcon,
    leftAddon,
    rightAddon,
    error,
    hint,
    disabled,
    ...props
  }, ref) => {
    const [isFocused, setIsFocused] = React11.useState(false);
    const hasError = !!error || state === "error";
    const currentState = hasError ? "error" : state;
    return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          className: "relative flex items-center",
          animate: {
            scale: isFocused ? 1.01 : 1
          },
          transition: { type: "spring", stiffness: 300, damping: 20 },
          children: [
            leftAddon && /* @__PURE__ */ jsx("div", { className: "flex items-center glass-card border border-r-0 border-border rounded-l-xl px-3 h-10", children: leftAddon }),
            leftIcon && !leftAddon && /* @__PURE__ */ jsx(
              motion.div,
              {
                className: "absolute left-3 text-muted-foreground pointer-events-none",
                animate: {
                  x: isFocused ? 2 : 0,
                  scale: isFocused ? 1.1 : 1
                },
                transition: { type: "spring", stiffness: 400, damping: 20 },
                children: leftIcon
              }
            ),
            /* @__PURE__ */ jsx(
              "input",
              {
                type,
                className: cn(
                  inputVariants({ variant, inputSize, state: currentState }),
                  leftIcon && !leftAddon && "pl-10",
                  rightIcon && !rightAddon && "pr-10",
                  leftAddon && "rounded-l-none",
                  rightAddon && "rounded-r-none",
                  className
                ),
                ref,
                disabled,
                onFocus: () => setIsFocused(true),
                onBlur: () => setIsFocused(false),
                "aria-invalid": hasError,
                "aria-describedby": error ? `${props.id}-error` : hint ? `${props.id}-hint` : void 0,
                ...props
              }
            ),
            rightIcon && !rightAddon && /* @__PURE__ */ jsx(
              motion.div,
              {
                className: "absolute right-3 text-muted-foreground pointer-events-none",
                animate: {
                  x: isFocused ? -2 : 0,
                  scale: isFocused ? 1.1 : 1
                },
                transition: { type: "spring", stiffness: 400, damping: 20 },
                children: rightIcon
              }
            ),
            rightAddon && /* @__PURE__ */ jsx("div", { className: "flex items-center glass-card border border-l-0 border-border rounded-r-xl px-3 h-10", children: rightAddon })
          ]
        }
      ),
      error && /* @__PURE__ */ jsx(
        motion.p,
        {
          initial: { opacity: 0, y: -10, height: 0 },
          animate: { opacity: 1, y: 0, height: "auto" },
          exit: { opacity: 0, y: -10, height: 0 },
          className: "mt-1.5 text-xs text-error",
          id: `${props.id}-error`,
          children: error
        }
      ),
      hint && !error && /* @__PURE__ */ jsx(
        "p",
        {
          className: "mt-1.5 text-xs text-muted-foreground",
          id: `${props.id}-hint`,
          children: hint
        }
      )
    ] });
  }
);
Input.displayName = "Input";
var Label2 = React11.forwardRef(
  ({ className, required, children, ...props }, ref) => /* @__PURE__ */ jsxs(
    "label",
    {
      ref,
      className: cn(
        "text-sm font-medium text-foreground leading-none",
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        "transition-all duration-200 hover:translate-x-0.5",
        className
      ),
      ...props,
      children: [
        children,
        required && /* @__PURE__ */ jsx("span", { className: "text-error ml-1", children: "*" })
      ]
    }
  )
);
Label2.displayName = "Label";
var FormField = ({
  label,
  htmlFor,
  required,
  error,
  hint,
  children,
  className
}) => {
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      className: cn("space-y-2", className),
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.3 },
      children: [
        /* @__PURE__ */ jsx(Label2, { htmlFor, required, children: label }),
        children,
        error && /* @__PURE__ */ jsx(
          motion.p,
          {
            initial: { opacity: 0, y: -10 },
            animate: { opacity: 1, y: 0 },
            className: "text-xs text-error",
            children: error
          }
        ),
        hint && !error && /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: hint })
      ]
    }
  );
};
FormField.displayName = "FormField";
var Textarea = React11.forwardRef(
  ({ className, variant, state, error, hint, ...props }, ref) => {
    const [isFocused, setIsFocused] = React11.useState(false);
    const hasError = !!error || state === "error";
    const currentState = hasError ? "error" : state;
    return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
      /* @__PURE__ */ jsx(
        "textarea",
        {
          className: cn(
            inputVariants({ variant, state: currentState }),
            "min-h-[80px] resize-y transition-transform duration-200",
            isFocused && "scale-[1.01]",
            className
          ),
          ref,
          onFocus: () => setIsFocused(true),
          onBlur: () => setIsFocused(false),
          "aria-invalid": hasError,
          ...props
        }
      ),
      error && /* @__PURE__ */ jsx(
        motion.p,
        {
          initial: { opacity: 0, y: -10 },
          animate: { opacity: 1, y: 0 },
          className: "mt-1.5 text-xs text-error",
          children: error
        }
      ),
      hint && !error && /* @__PURE__ */ jsx("p", { className: "mt-1.5 text-xs text-muted-foreground", children: hint })
    ] });
  }
);
Textarea.displayName = "Textarea";
var Kbd = React11.forwardRef(
  ({ className, size = "md", children, ...props }, ref) => /* @__PURE__ */ jsx(
    "kbd",
    {
      ref,
      className: cn(
        "inline-flex items-center justify-center font-mono font-medium",
        "glass-card border border-border rounded",
        "text-foreground shadow-sm select-none",
        // Bottom shadow gives the "key" depth effect
        "shadow-[inset_0_-2px_0_0_rgba(0,0,0,0.15),0_1px_3px_rgba(0,0,0,0.1)]",
        {
          sm: "h-5 min-w-5 px-1 text-[10px]",
          md: "h-6 min-w-6 px-1.5 text-xs",
          lg: "h-7 min-w-7 px-2 text-sm"
        }[size],
        className
      ),
      ...props,
      children
    }
  )
);
Kbd.displayName = "Kbd";
var Shortcut = ({
  keys,
  size = "md",
  className
}) => /* @__PURE__ */ jsx("span", { className: cn("inline-flex items-center gap-1", className), children: keys.map((key, i) => /* @__PURE__ */ jsxs(React11.Fragment, { children: [
  /* @__PURE__ */ jsx(Kbd, { size, children: key }),
  i < keys.length - 1 && /* @__PURE__ */ jsx("span", { className: "text-muted-foreground text-xs", children: "+" })
] }, key)) });
Shortcut.displayName = "Shortcut";
var Container = React11.forwardRef(
  ({ className, size = "xl", padded = true, ...props }, ref) => {
    const maxWidths = {
      sm: "max-w-screen-sm",
      md: "max-w-screen-md",
      lg: "max-w-screen-lg",
      xl: "max-w-screen-xl",
      full: "max-w-full"
    };
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: cn(
          "mx-auto w-full",
          maxWidths[size],
          padded && "px-4 md:px-6 lg:px-8",
          className
        ),
        ...props
      }
    );
  }
);
Container.displayName = "Container";
var Stack = React11.forwardRef(
  ({
    className,
    direction = "col",
    gap = 4,
    align = "stretch",
    justify = "start",
    wrap = false,
    ...props
  }, ref) => {
    const gapClasses = {
      0: "gap-0",
      1: "gap-1",
      2: "gap-2",
      3: "gap-3",
      4: "gap-4",
      6: "gap-6",
      8: "gap-8",
      10: "gap-10",
      12: "gap-12"
    };
    const alignClasses = {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
      baseline: "items-baseline"
    };
    const justifyClasses = {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly"
    };
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: cn(
          "flex",
          direction === "col" ? "flex-col" : "flex-row",
          gapClasses[gap],
          alignClasses[align],
          justifyClasses[justify],
          wrap && "flex-wrap",
          className
        ),
        ...props
      }
    );
  }
);
Stack.displayName = "Stack";
var Grid = React11.forwardRef(
  ({ className, cols = 1, mdCols, lgCols, gap = 4, ...props }, ref) => {
    const colClasses = {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      6: "grid-cols-6",
      12: "grid-cols-12"
    };
    const mdColClasses = {
      1: "md:grid-cols-1",
      2: "md:grid-cols-2",
      3: "md:grid-cols-3",
      4: "md:grid-cols-4",
      6: "md:grid-cols-6",
      12: "md:grid-cols-12"
    };
    const lgColClasses = {
      1: "lg:grid-cols-1",
      2: "lg:grid-cols-2",
      3: "lg:grid-cols-3",
      4: "lg:grid-cols-4",
      6: "lg:grid-cols-6",
      12: "lg:grid-cols-12"
    };
    const gapClasses = {
      2: "gap-2",
      4: "gap-4",
      6: "gap-6",
      8: "gap-8"
    };
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: cn(
          "grid",
          colClasses[cols],
          mdCols && mdColClasses[mdCols],
          lgCols && lgColClasses[lgCols],
          gapClasses[gap],
          className
        ),
        ...props
      }
    );
  }
);
Grid.displayName = "Grid";
var Divider = React11.forwardRef(
  ({ className, label, orientation = "horizontal", ...props }, ref) => {
    if (orientation === "vertical") {
      return /* @__PURE__ */ jsx(
        "div",
        {
          ref,
          className: cn("w-px self-stretch bg-border", className),
          role: "separator",
          "aria-orientation": "vertical",
          ...props
        }
      );
    }
    if (label) {
      return /* @__PURE__ */ jsxs(
        "div",
        {
          ref,
          className: cn("flex items-center gap-3", className),
          role: "separator",
          ...props,
          children: [
            /* @__PURE__ */ jsx("div", { className: "flex-1 h-px bg-border" }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground whitespace-nowrap px-1", children: label }),
            /* @__PURE__ */ jsx("div", { className: "flex-1 h-px bg-border" })
          ]
        }
      );
    }
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: cn("h-px w-full bg-border", className),
        role: "separator",
        ...props
      }
    );
  }
);
Divider.displayName = "Divider";
var NumberInput = React11.forwardRef(
  ({
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
  }, ref) => {
    const [internalValue, setInternalValue] = React11.useState(
      value ?? 0
    );
    const current = value !== void 0 ? value : internalValue;
    const set = (next) => {
      const clamped = Math.min(Math.max(next, min), max);
      setInternalValue(clamped);
      onChange?.(clamped);
    };
    const sizeClasses = {
      sm: { input: "h-8 text-xs", btn: "h-8 w-8" },
      md: { input: "h-10 text-sm", btn: "h-10 w-10" },
      lg: { input: "h-12 text-base", btn: "h-12 w-12" }
    };
    const canDecrement = current > min;
    const canIncrement = current < max;
    return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: cn(
            "inline-flex items-center glass-card border border-border rounded-xl overflow-hidden",
            error && "border-error",
            disabled && "opacity-50 cursor-not-allowed"
          ),
          children: [
            /* @__PURE__ */ jsx(
              motion.button,
              {
                type: "button",
                onClick: () => set(current - step),
                disabled: disabled || !canDecrement,
                whileTap: { scale: 0.9 },
                className: cn(
                  "flex items-center justify-center shrink-0",
                  "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                  "transition-colors duration-150",
                  "disabled:opacity-30 disabled:cursor-not-allowed",
                  "border-r border-border",
                  sizeClasses[size].btn
                ),
                "aria-label": "Decrease",
                children: /* @__PURE__ */ jsx(Minus, { className: "h-3.5 w-3.5" })
              }
            ),
            /* @__PURE__ */ jsx(
              "input",
              {
                ref,
                type: "number",
                value: current,
                min,
                max,
                step,
                disabled,
                onChange: (e) => set(parseFloat(e.target.value) || 0),
                className: cn(
                  "flex-1 min-w-0 text-center bg-transparent",
                  "text-foreground font-medium",
                  "focus:outline-none",
                  "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
                  sizeClasses[size].input,
                  className
                ),
                ...props
              }
            ),
            /* @__PURE__ */ jsx(
              motion.button,
              {
                type: "button",
                onClick: () => set(current + step),
                disabled: disabled || !canIncrement,
                whileTap: { scale: 0.9 },
                className: cn(
                  "flex items-center justify-center shrink-0",
                  "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                  "transition-colors duration-150",
                  "disabled:opacity-30 disabled:cursor-not-allowed",
                  "border-l border-border",
                  sizeClasses[size].btn
                ),
                "aria-label": "Increase",
                children: /* @__PURE__ */ jsx(Plus, { className: "h-3.5 w-3.5" })
              }
            )
          ]
        }
      ),
      error && /* @__PURE__ */ jsx("p", { className: "mt-1.5 text-xs text-error", children: error }),
      hint && !error && /* @__PURE__ */ jsx("p", { className: "mt-1.5 text-xs text-muted-foreground", children: hint })
    ] });
  }
);
NumberInput.displayName = "NumberInput";
var Pagination = React11.forwardRef(
  ({
    className,
    currentPage,
    totalPages,
    onPageChange,
    siblingCount = 1,
    ...props
  }, ref) => {
    const range = (start, end) => {
      const length = end - start + 1;
      return Array.from({ length }, (_, idx) => start + idx);
    };
    const paginationRange = React11.useMemo(() => {
      const totalPageNumbers = siblingCount + 5;
      if (totalPageNumbers >= totalPages) {
        return range(1, totalPages);
      }
      const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
      const rightSiblingIndex = Math.min(
        currentPage + siblingCount,
        totalPages
      );
      const shouldShowLeftDots = leftSiblingIndex > 2;
      const shouldShowRightDots = rightSiblingIndex < totalPages - 2;
      const firstPageIndex = 1;
      const lastPageIndex = totalPages;
      if (!shouldShowLeftDots && shouldShowRightDots) {
        const leftItemCount = 3 + 2 * siblingCount;
        const leftRange = range(1, leftItemCount);
        return [...leftRange, "dots", totalPages];
      }
      if (shouldShowLeftDots && !shouldShowRightDots) {
        const rightItemCount = 3 + 2 * siblingCount;
        const rightRange = range(totalPages - rightItemCount + 1, totalPages);
        return [firstPageIndex, "dots", ...rightRange];
      }
      if (shouldShowLeftDots && shouldShowRightDots) {
        const middleRange = range(leftSiblingIndex, rightSiblingIndex);
        return [firstPageIndex, "dots", ...middleRange, "dots", lastPageIndex];
      }
      return [];
    }, [totalPages, siblingCount, currentPage]);
    return /* @__PURE__ */ jsx(
      "nav",
      {
        ref,
        role: "navigation",
        "aria-label": "pagination",
        className: cn("mx-auto flex w-full justify-center", className),
        ...props,
        children: /* @__PURE__ */ jsxs("ul", { className: "flex flex-row items-center gap-1", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            Button,
            {
              variant: "ghost-primary",
              size: "icon",
              onClick: () => onPageChange(currentPage - 1),
              disabled: currentPage === 1,
              "aria-label": "Go to previous page",
              children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" })
            }
          ) }),
          paginationRange.map((pageNumber, index) => {
            if (pageNumber === "dots") {
              return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("span", { className: "flex h-9 w-9 items-center justify-center", children: /* @__PURE__ */ jsx(MoreHorizontal, { className: "h-4 w-4" }) }) }, `dots-${index}`);
            }
            const isActive = pageNumber === currentPage;
            return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
              motion.button,
              {
                whileHover: { scale: 1.05 },
                whileTap: { scale: 0.95 },
                onClick: () => onPageChange(pageNumber),
                className: cn(
                  "flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-all",
                  isActive ? "glass-card border border-primary bg-primary/10 text-primary shadow-primary-glow" : "glass hover:bg-muted text-foreground"
                ),
                "aria-label": `Go to page ${pageNumber}`,
                "aria-current": isActive ? "page" : void 0,
                children: pageNumber
              }
            ) }, pageNumber);
          }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            Button,
            {
              variant: "ghost-primary",
              size: "icon",
              onClick: () => onPageChange(currentPage + 1),
              disabled: currentPage === totalPages,
              "aria-label": "Go to next page",
              children: /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4" })
            }
          ) })
        ] })
      }
    );
  }
);
Pagination.displayName = "Pagination";
var Popover = PopoverPrimitive.Root;
var PopoverTrigger = PopoverPrimitive.Trigger;
var PopoverContent = React11.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  PopoverPrimitive.Content,
  {
    ref,
    align,
    sideOffset,
    className: cn(
      "z-50 w-72 rounded-xl glass-strong border border-border p-4 shadow-lg outline-none",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
      "data-[side=bottom]:slide-in-from-top-2",
      "data-[side=left]:slide-in-from-right-2",
      "data-[side=right]:slide-in-from-left-2",
      "data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;
var Progress = React11.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ jsx(
  ProgressPrimitive.Root,
  {
    ref,
    className: cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(
      ProgressPrimitive.Indicator,
      {
        className: "h-full w-full flex-1 bg-primary transition-all",
        style: { transform: `translateX(-${100 - (value || 0)}%)` }
      }
    )
  }
));
Progress.displayName = ProgressPrimitive.Root.displayName;
var RadioGroup2 = React11.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    RadioGroupPrimitive.Root,
    {
      className: cn("grid gap-2", className),
      ...props,
      ref
    }
  );
});
RadioGroup2.displayName = RadioGroupPrimitive.Root.displayName;
var RadioGroupItem = React11.forwardRef(({ className, onClick, ...props }, ref) => {
  const [isChecked, setIsChecked] = React11.useState(false);
  const [showExplosion, setShowExplosion] = React11.useState(false);
  const handleClick = (e) => {
    setIsChecked(true);
    setShowExplosion(true);
    setTimeout(() => setShowExplosion(false), 800);
    onClick?.(e);
  };
  return /* @__PURE__ */ jsxs(
    RadioGroupPrimitive.Item,
    {
      ref,
      className: cn(
        "aspect-square h-5 w-5 rounded-full glass-card border-2 border-border text-primary ring-offset-background relative",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "transition-all duration-300",
        "data-[state=checked]:border-primary data-[state=checked]:bg-primary/10",
        // Subtle glow
        "data-[state=checked]:shadow-[0_0_15px_rgba(80,0,171,0.3)]",
        "hover:scale-110 hover:shadow-[0_0_10px_rgba(80,0,171,0.2)]",
        className
      ),
      onClick: handleClick,
      ...props,
      children: [
        /* @__PURE__ */ jsx(AnimatePresence, { children: showExplosion && /* @__PURE__ */ jsx(Fragment, { children: [...Array(12)].map((_, i) => {
          const baseAngle = i * 360 / 12;
          const angleVariation = (Math.random() - 0.5) * 30;
          const angle = baseAngle + angleVariation;
          const baseDistance = 25;
          const distanceVariation = Math.random() * 15 - 5;
          const distance = baseDistance + distanceVariation;
          const size = 1 + Math.random() * 1.5;
          return /* @__PURE__ */ jsx(
            motion.div,
            {
              className: "absolute inset-0 pointer-events-none",
              initial: {
                scale: 0,
                opacity: 1,
                x: 0,
                y: 0
              },
              animate: {
                scale: 0,
                opacity: 0,
                x: Math.cos(angle * Math.PI / 180) * distance,
                y: Math.sin(angle * Math.PI / 180) * distance
              },
              exit: { opacity: 0 },
              transition: {
                duration: 0.6 + Math.random() * 0.2,
                ease: [0.16, 1, 0.3, 1]
              },
              children: /* @__PURE__ */ jsx(
                "div",
                {
                  className: "absolute top-1/2 left-1/2 rounded-full bg-primary shadow-[0_0_4px_rgba(80,0,171,0.5)]",
                  style: {
                    width: `${size}px`,
                    height: `${size}px`,
                    transform: "translate(-50%, -50%)"
                  }
                }
              )
            },
            i
          );
        }) }) }),
        /* @__PURE__ */ jsx(AnimatePresence, { children: isChecked && /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "absolute inset-0 rounded-full bg-primary/20 shadow-[0_0_15px_rgba(80,0,171,0.3)]",
            initial: { scale: 0, opacity: 0.6 },
            animate: { scale: 2.5, opacity: 0 },
            exit: { opacity: 0 },
            transition: { duration: 0.6, ease: "easeOut" }
          }
        ) }),
        /* @__PURE__ */ jsx(RadioGroupPrimitive.Indicator, { className: "flex items-center justify-center", children: /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { scale: 0 },
            animate: { scale: 1 },
            transition: { type: "spring", stiffness: 500, damping: 15 },
            children: /* @__PURE__ */ jsx(Circle, { className: "h-2.5 w-2.5 fill-primary text-primary drop-shadow-[0_0_4px_rgba(80,0,171,0.5)]" })
          }
        ) })
      ]
    }
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;
var Select = SelectPrimitive.Root;
var SelectGroup = SelectPrimitive.Group;
var SelectValue = SelectPrimitive.Value;
var SelectTrigger = React11.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-border bg-background px-3 py-2 text-sm",
      "placeholder:text-muted-foreground",
      "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "[&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
var SelectScrollUpButton = React11.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollUpButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronUp, { className: "h-4 w-4" })
  }
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
var SelectScrollDownButton = React11.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollDownButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" })
  }
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
var SelectContent = React11.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
  SelectPrimitive.Content,
  {
    ref,
    className: cn(
      "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-md",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsx(
        SelectPrimitive.Viewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ jsx(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = SelectPrimitive.Content.displayName;
var SelectLabel = React11.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Label,
  {
    ref,
    className: cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className),
    ...props
  }
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
var SelectItem = React11.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none",
      "focus:bg-accent focus:text-accent-foreground",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
    ]
  }
));
SelectItem.displayName = SelectPrimitive.Item.displayName;
var SelectSeparator = React11.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-border", className),
    ...props
  }
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
var Separator3 = React11.forwardRef(
  ({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ jsx(
    SeparatorPrimitive.Root,
    {
      ref,
      decorative,
      orientation,
      className: cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className
      ),
      ...props
    }
  )
);
Separator3.displayName = SeparatorPrimitive.Root.displayName;
var Skeleton = React11.forwardRef(
  ({ className, variant = "rectangular", animation = "pulse", ...props }, ref) => {
    const baseClasses = "glass-card bg-muted/50";
    const variantClasses = {
      text: "h-4 w-full rounded",
      circular: "rounded-full",
      rectangular: "rounded-xl"
    };
    const animationClasses = {
      pulse: "animate-pulse",
      wave: "animate-shimmer bg-gradient-to-r from-muted/50 via-muted/80 to-muted/50 bg-[length:200%_100%]",
      none: ""
    };
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: cn(
          baseClasses,
          variantClasses[variant],
          animationClasses[animation],
          className
        ),
        ...props
      }
    );
  }
);
Skeleton.displayName = "Skeleton";
var SkeletonText = ({
  lines = 3,
  className
}) => /* @__PURE__ */ jsx("div", { className: cn("space-y-2", className), children: Array.from({ length: lines }).map((_, i) => /* @__PURE__ */ jsx(
  Skeleton,
  {
    variant: "text",
    className: i === lines - 1 ? "w-3/4" : "w-full"
  },
  i
)) });
var SkeletonCard = ({ className }) => /* @__PURE__ */ jsxs("div", { className: cn("glass-card rounded-xl p-4 space-y-3", className), children: [
  /* @__PURE__ */ jsx(Skeleton, { className: "h-48 w-full" }),
  /* @__PURE__ */ jsx(Skeleton, { variant: "text", className: "w-3/4" }),
  /* @__PURE__ */ jsx(Skeleton, { variant: "text", className: "w-1/2" })
] });
var SkeletonAvatar = ({ size = "md", className }) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12"
  };
  return /* @__PURE__ */ jsx(Skeleton, { variant: "circular", className: cn(sizeClasses[size], className) });
};
var SkeletonTable = ({ rows = 5, columns = 4, className }) => /* @__PURE__ */ jsxs("div", { className: cn("space-y-2", className), children: [
  /* @__PURE__ */ jsx("div", { className: "flex gap-4", children: Array.from({ length: columns }).map((_, i) => /* @__PURE__ */ jsx(Skeleton, { className: "h-8 flex-1" }, `header-${i}`)) }),
  Array.from({ length: rows }).map((_, rowIndex) => /* @__PURE__ */ jsx("div", { className: "flex gap-4", children: Array.from({ length: columns }).map((_2, colIndex) => /* @__PURE__ */ jsx(
    Skeleton,
    {
      className: "h-12 flex-1"
    },
    `cell-${rowIndex}-${colIndex}`
  )) }, `row-${rowIndex}`))
] });
var spinnerVariants = cva("", {
  variants: {
    size: {
      xs: "h-3 w-3 border",
      sm: "h-4 w-4 border-2",
      md: "h-6 w-6 border-2",
      lg: "h-8 w-8 border-[3px]",
      xl: "h-12 w-12 border-4"
    },
    variant: {
      primary: "border-primary/30 border-t-primary",
      secondary: "border-secondary/30 border-t-secondary",
      accent: "border-accent/30 border-t-accent",
      white: "border-white/30 border-t-white",
      muted: "border-muted-foreground/30 border-t-muted-foreground"
    }
  },
  defaultVariants: {
    size: "md",
    variant: "primary"
  }
});
var Spinner = React11.forwardRef(
  ({ className, size, variant, label = "Loading...", ...props }, ref) => /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      role: "status",
      "aria-label": label,
      className: cn("inline-flex items-center justify-center", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            className: cn("rounded-full", spinnerVariants({ size, variant })),
            animate: { rotate: 360 },
            transition: { duration: 0.75, repeat: Infinity, ease: "linear" }
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: label })
      ]
    }
  )
);
Spinner.displayName = "Spinner";
var LoadingOverlay = ({
  loading,
  children,
  label = "Loading...",
  className
}) => /* @__PURE__ */ jsxs("div", { className: cn("relative", className), children: [
  children,
  loading && /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      className: "absolute inset-0 flex items-center justify-center glass rounded-xl z-10",
      children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-3", children: [
        /* @__PURE__ */ jsx(Spinner, { size: "lg" }),
        label && /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: label })
      ] })
    }
  )
] });
LoadingOverlay.displayName = "LoadingOverlay";
var Switch = React11.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SwitchPrimitives.Root,
  {
    className: cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-border",
      "transition-all duration-300",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:bg-primary data-[state=checked]:border-primary",
      // Uses CSS variable tokens — responds to .dark class correctly
      "data-[state=unchecked]:bg-muted",
      className
    ),
    ...props,
    ref,
    children: /* @__PURE__ */ jsx(
      SwitchPrimitives.Thumb,
      {
        className: cn(
          // bg-background resolves to white in light, dark surface in dark mode
          "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-md ring-0",
          "transition-transform duration-300 ease-out",
          "data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
        )
      }
    )
  }
));
Switch.displayName = SwitchPrimitives.Root.displayName;
var Table = React11.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ jsx(
  "table",
  {
    ref,
    className: cn("w-full caption-bottom text-sm", className),
    ...props
  }
) }));
Table.displayName = "Table";
var TableHeader = React11.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("thead", { ref, className: cn("[&_tr]:border-b", className), ...props }));
TableHeader.displayName = "TableHeader";
var TableBody = React11.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "tbody",
  {
    ref,
    className: cn("[&_tr:last-child]:border-0", className),
    ...props
  }
));
TableBody.displayName = "TableBody";
var TableFooter = React11.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "tfoot",
  {
    ref,
    className: cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    ),
    ...props
  }
));
TableFooter.displayName = "TableFooter";
var TableRow = React11.forwardRef(({ className, hover = true, ...props }, ref) => /* @__PURE__ */ jsx(
  "tr",
  {
    ref,
    className: cn(
      "border-b border-border transition-colors",
      hover && "hover:bg-muted/50 cursor-pointer",
      "data-[state=selected]:bg-muted",
      className
    ),
    ...props
  }
));
TableRow.displayName = "TableRow";
var TableHead = React11.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "th",
  {
    ref,
    className: cn(
      "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className
    ),
    ...props
  }
));
TableHead.displayName = "TableHead";
var TableCell = React11.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "td",
  {
    ref,
    className: cn("p-2 align-middle [&:has([role=checkbox])]:pr-0", className),
    ...props
  }
));
TableCell.displayName = "TableCell";
var TableCaption = React11.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "caption",
  {
    ref,
    className: cn("mt-4 text-sm text-muted-foreground", className),
    ...props
  }
));
TableCaption.displayName = "TableCaption";
var Tabs = TabsPrimitive.Root;
var TabsList = React11.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.List,
  {
    ref,
    className: cn(
      "glass-card inline-flex h-10 items-center justify-center rounded-xl p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = TabsPrimitive.List.displayName;
var TabsTrigger = React11.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium ring-offset-background transition-all",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",
      "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm",
      "hover:bg-muted/50",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(
      motion.span,
      {
        initial: { scale: 1 },
        whileHover: { scale: 1.05 },
        whileTap: { scale: 0.95 },
        transition: { type: "spring", stiffness: 400, damping: 17 },
        children
      }
    )
  }
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
var TabsContent = React11.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.2 },
        children
      }
    )
  }
));
TabsContent.displayName = TabsPrimitive.Content.displayName;
var ToastProvider = ToastPrimitives.Provider;
var ToastViewport = React11.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Viewport,
  {
    ref,
    className: cn(
      "fixed top-0 z-100 flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    ),
    ...props
  }
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;
var toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
var Toast = React11.forwardRef(({ className, variant, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    ToastPrimitives.Root,
    {
      ref,
      className: cn(toastVariants({ variant }), className),
      ...props
    }
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;
var ToastAction = React11.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Action,
  {
    ref,
    className: cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    ),
    ...props
  }
));
ToastAction.displayName = ToastPrimitives.Action.displayName;
var ToastClose = React11.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Close,
  {
    ref,
    className: cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    ),
    "toast-close": "",
    ...props,
    children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
  }
));
ToastClose.displayName = ToastPrimitives.Close.displayName;
var ToastTitle = React11.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Title,
  {
    ref,
    className: cn("text-sm font-semibold", className),
    ...props
  }
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;
var ToastDescription = React11.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Description,
  {
    ref,
    className: cn("text-sm opacity-90", className),
    ...props
  }
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;
var TOAST_LIMIT = 1;
var TOAST_REMOVE_DELAY = 1e6;
var count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}
var toastTimeouts = /* @__PURE__ */ new Map();
var addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId
    });
  }, TOAST_REMOVE_DELAY);
  toastTimeouts.set(toastId, timeout);
};
var reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT)
      };
    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === action.toast.id ? { ...t, ...action.toast } : t
        )
      };
    case "DISMISS_TOAST": {
      const { toastId } = action;
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast2) => {
          addToRemoveQueue(toast2.id);
        });
      }
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === toastId || toastId === void 0 ? {
            ...t,
            open: false
          } : t
        )
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === void 0) {
        return {
          ...state,
          toasts: []
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId)
      };
  }
};
var listeners = [];
var memoryState = { toasts: [] };
function dispatch(action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}
function toast({ ...props }) {
  const id = genId();
  const update = (props2) => dispatch({
    type: "UPDATE_TOAST",
    toast: { ...props2, id }
  });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      }
    }
  });
  return {
    id,
    dismiss,
    update
  };
}
function useToast() {
  const [state, setState] = React11.useState(memoryState);
  React11.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);
  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: "DISMISS_TOAST", toastId })
  };
}
function Toaster() {
  const { toasts } = useToast();
  return /* @__PURE__ */ jsxs(ToastProvider, { children: [
    toasts.map(function({ id, title, description, action, ...props }) {
      return /* @__PURE__ */ jsxs(Toast, { ...props, children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-1", children: [
          title && /* @__PURE__ */ jsx(ToastTitle, { children: title }),
          description && /* @__PURE__ */ jsx(ToastDescription, { children: description })
        ] }),
        action,
        /* @__PURE__ */ jsx(ToastClose, {})
      ] }, id);
    }),
    /* @__PURE__ */ jsx(ToastViewport, {})
  ] });
}
var TooltipProvider = TooltipPrimitive.Provider;
var Tooltip = TooltipPrimitive.Root;
var TooltipTrigger = TooltipPrimitive.Trigger;
var TooltipContent = React11.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(
  TooltipPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;
var headingVariants = cva("font-semibold tracking-tight text-foreground", {
  variants: {
    size: {
      "4xl": "text-4xl lg:text-5xl",
      "3xl": "text-3xl lg:text-4xl",
      "2xl": "text-2xl lg:text-3xl",
      xl: "text-xl lg:text-2xl",
      lg: "text-lg lg:text-xl",
      md: "text-base lg:text-lg"
    },
    weight: {
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      black: "font-black"
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right"
    },
    gradient: {
      none: "",
      primary: "bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent",
      accent: "bg-gradient-to-r from-accent to-ember bg-clip-text text-transparent",
      cool: "bg-gradient-to-r from-primary via-sky to-accent bg-clip-text text-transparent"
    }
  },
  defaultVariants: {
    size: "2xl",
    weight: "semibold",
    align: "left",
    gradient: "none"
  }
});
var Heading = React11.forwardRef(
  ({ className, as: Tag = "h2", size, weight, align, gradient, ...props }, ref) => /* @__PURE__ */ jsx(
    Tag,
    {
      ref,
      className: cn(
        headingVariants({ size, weight, align, gradient }),
        className
      ),
      ...props
    }
  )
);
Heading.displayName = "Heading";
var textVariants = cva("text-foreground", {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl"
    },
    weight: {
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold"
    },
    variant: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      primary: "text-primary",
      accent: "text-accent",
      success: "text-success",
      warning: "text-warning",
      error: "text-error"
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify"
    },
    leading: {
      tight: "leading-tight",
      snug: "leading-snug",
      normal: "leading-normal",
      relaxed: "leading-relaxed",
      loose: "leading-loose"
    },
    truncate: {
      true: "truncate",
      false: ""
    }
  },
  defaultVariants: {
    size: "md",
    weight: "normal",
    variant: "default",
    align: "left",
    leading: "normal",
    truncate: false
  }
});
var Text = React11.forwardRef(
  ({
    className,
    as: Tag = "p",
    size,
    weight,
    variant,
    align,
    leading,
    truncate: truncate2,
    ...props
  }, ref) => /* @__PURE__ */ jsx(
    Tag,
    {
      ref,
      className: cn(
        textVariants({ size, weight, variant, align, leading, truncate: truncate2 }),
        className
      ),
      ...props
    }
  )
);
Text.displayName = "Text";
var Code = React11.forwardRef(
  ({ className, block = false, children, ...props }, ref) => {
    if (block) {
      return /* @__PURE__ */ jsx(
        "pre",
        {
          className: cn(
            "glass-card rounded-xl p-4 overflow-x-auto text-sm font-mono",
            "border border-border text-foreground",
            className
          ),
          ...props,
          children: /* @__PURE__ */ jsx("code", { children })
        }
      );
    }
    return /* @__PURE__ */ jsx(
      "code",
      {
        ref,
        className: cn(
          "rounded px-1.5 py-0.5 font-mono text-sm",
          "bg-muted text-primary border border-border/50",
          className
        ),
        ...props,
        children
      }
    );
  }
);
Code.displayName = "Code";
var Lead = React11.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "p",
    {
      ref,
      className: cn("text-xl text-muted-foreground leading-relaxed", className),
      ...props
    }
  )
);
Lead.displayName = "Lead";
var Blockquote = React11.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "blockquote",
    {
      ref,
      className: cn(
        "border-l-4 border-primary pl-4 italic text-muted-foreground",
        "glass-card rounded-r-xl py-3 pr-4",
        className
      ),
      ...props
    }
  )
);
Blockquote.displayName = "Blockquote";

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Alert, AlertDescription, AlertTitle, Avatar, AvatarFallback, AvatarGroup, AvatarImage, Badge, Blockquote, Breadcrumbs, Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Checkbox, Code, Container, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger, Divider, DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, EmptyState, FormField, Grid, Heading, IconButton, Input, Kbd, Label2 as Label, Lead, LoadingOverlay, NumberInput, Pagination, Popover, PopoverContent, PopoverTrigger, Progress, RadioGroup2 as RadioGroup, RadioGroupItem, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue, Separator3 as Separator, Shortcut, Skeleton, SkeletonAvatar, SkeletonCard, SkeletonTable, SkeletonText, Spinner, Stack, StatCard, StatusBadge, Switch, Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow, Tabs, TabsContent, TabsList, TabsTrigger, Text, Textarea, Toast, ToastAction, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport, Toaster, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, badgeVariants, buttonVariants, cn, debounce, formatCurrency, formatDate, formatRelativeTime, generateId, getInitials, headingVariants, inputVariants, reducer, sleep, spinnerVariants, textVariants, toast, truncate, useToast };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map