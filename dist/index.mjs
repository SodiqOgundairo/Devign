import * as React18 from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown, X, ChevronRight, Loader2, Check, Circle, ChevronLeft, MoreHorizontal, ChevronUp } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
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

// src/components/accordion.tsx
var Accordion = AccordionPrimitive.Root;
var AccordionItem = React18.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React18.createElement(
  AccordionPrimitive.Item,
  {
    ref,
    className: cn("glass-card rounded-xl border border-border mb-2", className),
    ...props
  }
));
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = React18.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ React18.createElement(AccordionPrimitive.Header, { className: "flex" }, /* @__PURE__ */ React18.createElement(
  AccordionPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex flex-1 items-center justify-between p-4 font-medium transition-all",
      "hover:bg-muted/50 rounded-xl",
      "[&[data-state=open]>svg]:rotate-180",
      className
    ),
    ...props
  },
  children,
  /* @__PURE__ */ React18.createElement(ChevronDown, { className: "h-4 w-4 shrink-0 transition-transform duration-200" })
)));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;
var AccordionContent = React18.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ React18.createElement(
  AccordionPrimitive.Content,
  {
    ref,
    className: "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    ...props
  },
  /* @__PURE__ */ React18.createElement("div", { className: cn("pb-4 pt-0 px-4", className) }, children)
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
var Alert = React18.forwardRef(
  ({ className, variant, dismissible, onDismiss, children, ...props }, ref) => {
    const [isVisible, setIsVisible] = React18.useState(true);
    const handleDismiss = () => {
      setIsVisible(false);
      setTimeout(() => onDismiss == null ? void 0 : onDismiss(), 300);
    };
    return /* @__PURE__ */ React18.createElement(AnimatePresence, null, isVisible && /* @__PURE__ */ React18.createElement(
      motion.div,
      {
        ref,
        initial: { opacity: 0, y: -10, scale: 0.95 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
        className: cn(alertVariants({ variant }), className),
        ...props
      },
      children,
      dismissible && /* @__PURE__ */ React18.createElement(
        "button",
        {
          onClick: handleDismiss,
          className: "absolute right-4 top-4 rounded-md p-1 transition-colors hover:bg-muted",
          "aria-label": "Dismiss"
        },
        /* @__PURE__ */ React18.createElement(X, { className: "h-4 w-4" })
      )
    ));
  }
);
Alert.displayName = "Alert";
var AlertTitle = React18.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React18.createElement(
  "h5",
  {
    ref,
    className: cn("mb-1 font-medium leading-none tracking-tight", className),
    ...props
  }
));
AlertTitle.displayName = "AlertTitle";
var AlertDescription = React18.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React18.createElement(
  "div",
  {
    ref,
    className: cn("text-sm [&_p]:leading-relaxed", className),
    ...props
  }
));
AlertDescription.displayName = "AlertDescription";
var Avatar = React18.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React18.createElement(
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
var AvatarImage = React18.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React18.createElement(
  AvatarPrimitive.Image,
  {
    ref,
    className: cn("aspect-square h-full w-full", className),
    ...props
  }
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;
var AvatarFallback = React18.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React18.createElement(
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
var badgeVariants = cva(
  [
    "inline-flex items-center rounded-full px-2.5 py-0.5",
    "text-xs font-semibold",
    "transition-colors"
  ],
  {
    variants: {
      variant: {
        // Filled variants
        primary: "bg-true-azure text-seasalt",
        secondary: "bg-dark-amethyst text-seasalt",
        accent: "bg-sunflower-gold text-black",
        ember: "bg-autumn-ember text-seasalt",
        success: "bg-success text-seasalt",
        warning: "bg-warning text-black",
        error: "bg-error text-seasalt",
        // Outline variants
        "outline-primary": "border border-true-azure text-true-azure bg-transparent",
        "outline-secondary": "border border-dark-amethyst text-dark-amethyst bg-transparent",
        "outline-accent": "border border-sunflower-gold text-sunflower-gold bg-transparent",
        "outline-success": "border border-success text-success bg-transparent",
        "outline-warning": "border border-warning text-warning bg-transparent",
        "outline-error": "border border-error text-error bg-transparent",
        // Soft variants (light background)
        "soft-primary": "bg-true-azure/10 text-true-azure",
        "soft-secondary": "bg-dark-amethyst/10 text-dark-amethyst",
        "soft-accent": "bg-sunflower-gold/10 text-sunflower-gold",
        "soft-success": "bg-success/10 text-success",
        "soft-warning": "bg-warning/10 text-warning",
        "soft-error": "bg-error/10 text-error",
        // Default/neutral
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
var Badge = React18.forwardRef(
  ({ className, variant, size, dot, children, ...props }, ref) => /* @__PURE__ */ React18.createElement(
    "div",
    {
      ref,
      className: cn(badgeVariants({ variant, size }), className),
      ...props
    },
    dot && /* @__PURE__ */ React18.createElement(
      "span",
      {
        className: cn(
          "mr-1.5 h-1.5 w-1.5 rounded-full",
          (variant == null ? void 0 : variant.includes("success")) && "bg-success",
          (variant == null ? void 0 : variant.includes("warning")) && "bg-warning",
          (variant == null ? void 0 : variant.includes("error")) && "bg-error",
          (variant == null ? void 0 : variant.includes("primary")) && "bg-true-azure",
          !variant && "bg-current"
        )
      }
    ),
    children
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
  return /* @__PURE__ */ React18.createElement(Badge, { variant, dot: true, className }, children || label);
};
StatusBadge.displayName = "StatusBadge";
var Breadcrumbs = React18.forwardRef(
  ({ className, items, separator, ...props }, ref) => {
    return /* @__PURE__ */ React18.createElement(
      "nav",
      {
        ref,
        "aria-label": "Breadcrumb",
        className: cn("flex items-center space-x-1 text-sm", className),
        ...props
      },
      /* @__PURE__ */ React18.createElement("ol", { className: "flex items-center space-x-1" }, items.map((item, index) => {
        const isLast = index === items.length - 1;
        return /* @__PURE__ */ React18.createElement("li", { key: index, className: "flex items-center space-x-1" }, item.href || item.onClick ? /* @__PURE__ */ React18.createElement(
          motion.a,
          {
            href: item.href,
            onClick: item.onClick,
            whileHover: { x: 2 },
            className: cn(
              "transition-colors hover:text-primary",
              isLast ? "text-foreground font-medium" : "text-muted-foreground"
            ),
            "aria-current": isLast ? "page" : void 0
          },
          item.label
        ) : /* @__PURE__ */ React18.createElement(
          "span",
          {
            className: cn(
              isLast ? "text-foreground font-medium" : "text-muted-foreground"
            ),
            "aria-current": isLast ? "page" : void 0
          },
          item.label
        ), !isLast && /* @__PURE__ */ React18.createElement(
          ChevronRight,
          {
            className: "h-4 w-4 text-muted-foreground",
            "aria-hidden": "true"
          }
        ));
      }))
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
        // Filled variants with glass effect
        primary: [
          "bg-true-azure text-seasalt",
          "hover:bg-true-azure/90 hover:shadow-primary",
          "active:scale-95"
        ],
        secondary: [
          "bg-dark-amethyst text-seasalt",
          "hover:bg-dark-amethyst/90",
          "active:scale-95"
        ],
        accent: [
          "bg-sunflower-gold text-black",
          "hover:bg-sunflower-gold/90 hover:shadow-accent",
          "active:scale-95"
        ],
        ember: [
          "bg-autumn-ember text-seasalt",
          "hover:bg-autumn-ember/90",
          "active:scale-95"
        ],
        destructive: [
          "bg-error text-seasalt",
          "hover:bg-error/90",
          "active:scale-95"
        ],
        // Glass outline variants
        "outline-primary": [
          "glass border-2 border-true-azure text-true-azure",
          "hover:bg-true-azure/10 hover:border-true-azure/80"
        ],
        "outline-secondary": [
          "glass border-2 border-dark-amethyst text-dark-amethyst",
          "hover:bg-dark-amethyst/10"
        ],
        "outline-accent": [
          "glass border-2 border-sunflower-gold text-sunflower-gold",
          "hover:bg-sunflower-gold/10"
        ],
        "outline-ember": [
          "glass border-2 border-autumn-ember text-autumn-ember",
          "hover:bg-autumn-ember/10"
        ],
        "outline-destructive": [
          "glass border-2 border-error text-error",
          "hover:bg-error/10"
        ],
        // Ghost glass variants
        "ghost-primary": ["glass text-true-azure", "hover:bg-true-azure/10"],
        "ghost-secondary": [
          "glass text-dark-amethyst",
          "hover:bg-dark-amethyst/10"
        ],
        "ghost-accent": [
          "glass text-sunflower-gold",
          "hover:bg-sunflower-gold/10"
        ],
        "ghost-ember": ["glass text-autumn-ember", "hover:bg-autumn-ember/10"],
        "ghost-destructive": ["glass text-error", "hover:bg-error/10"],
        link: ["text-true-azure underline-offset-4", "hover:underline"],
        ghost: ["glass text-foreground", "hover:bg-muted"],
        outline: [
          "glass border border-border text-foreground",
          "hover:bg-muted"
        ]
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
var Ripple = ({ x, y }) => /* @__PURE__ */ React18.createElement(
  motion.span,
  {
    className: "absolute rounded-full bg-white/30",
    style: {
      left: x,
      top: y,
      width: 0,
      height: 0
    },
    initial: { width: 0, height: 0, opacity: 0.5 },
    animate: { width: 300, height: 300, opacity: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  }
);
var Button = React18.forwardRef(
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
    const [ripples, setRipples] = React18.useState([]);
    const handleClick = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setRipples([...ripples, { x, y, id: Date.now() }]);
      setTimeout(() => setRipples((prev) => prev.slice(1)), 600);
      onClick == null ? void 0 : onClick(e);
    };
    const Comp = asChild ? Slot : "button";
    const content = /* @__PURE__ */ React18.createElement(React18.Fragment, null, ripples.map((ripple) => /* @__PURE__ */ React18.createElement(Ripple, { key: ripple.id, x: ripple.x, y: ripple.y })), isLoading ? /* @__PURE__ */ React18.createElement(Loader2, { className: "animate-spin" }) : leftIcon ? leftIcon : null, children, !isLoading && rightIcon);
    if (asChild) {
      return /* @__PURE__ */ React18.createElement(
        Comp,
        {
          className: cn(buttonVariants({ variant, size, className })),
          ref,
          disabled: disabled || isLoading,
          ...props
        },
        content
      );
    }
    return /* @__PURE__ */ React18.createElement(
      motion.button,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        disabled: disabled || isLoading,
        onClick: handleClick,
        whileHover: { scale: disabled || isLoading ? 1 : 1.03 },
        whileTap: { scale: disabled || isLoading ? 1 : 0.97 },
        transition: { type: "spring", stiffness: 400, damping: 17 },
        ...props
      },
      content
    );
  }
);
Button.displayName = "Button";
var IconButton = React18.forwardRef(
  ({ size = "icon", children, className, ...props }, ref) => {
    return /* @__PURE__ */ React18.createElement(
      Button,
      {
        ref,
        size,
        className: cn("rounded-full", className),
        ...props
      },
      children
    );
  }
);
IconButton.displayName = "IconButton";
var Card = React18.forwardRef(({ className, hover = false, ...props }, ref) => /* @__PURE__ */ React18.createElement(
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
));
Card.displayName = "Card";
var CardHeader = React18.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React18.createElement(
  "div",
  {
    ref,
    className: cn("flex flex-col space-y-1.5 p-6", className),
    ...props
  }
));
CardHeader.displayName = "CardHeader";
var CardTitle = React18.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React18.createElement(
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
var CardDescription = React18.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React18.createElement(
  "p",
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
CardDescription.displayName = "CardDescription";
var CardContent = React18.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React18.createElement("div", { ref, className: cn("p-6 pt-0", className), ...props }));
CardContent.displayName = "CardContent";
var CardFooter = React18.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React18.createElement(
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
}) => /* @__PURE__ */ React18.createElement(
  motion.div,
  {
    className: cn("glass-card rounded-xl overflow-hidden", className),
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    whileHover: { y: -6, scale: 1.02 },
    transition: { type: "spring", stiffness: 300, damping: 20 }
  },
  /* @__PURE__ */ React18.createElement(CardContent, { className: "p-6" }, /* @__PURE__ */ React18.createElement("div", { className: "flex items-start justify-between" }, /* @__PURE__ */ React18.createElement("div", { className: "space-y-2 flex-1" }, /* @__PURE__ */ React18.createElement(
    motion.p,
    {
      className: "text-sm font-medium text-muted-foreground",
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { delay: 0.1 }
    },
    title
  ), /* @__PURE__ */ React18.createElement("div", { className: "flex items-baseline gap-2" }, /* @__PURE__ */ React18.createElement(
    motion.span,
    {
      className: "text-3xl font-bold text-foreground",
      initial: { opacity: 0, x: -10 },
      animate: { opacity: 1, x: 0 },
      transition: { delay: 0.2, type: "spring" }
    },
    value
  ), trend && /* @__PURE__ */ React18.createElement(
    motion.span,
    {
      className: cn(
        "text-sm font-medium flex items-center gap-1",
        trend.isPositive ? "text-success" : "text-error"
      ),
      initial: { opacity: 0, scale: 0 },
      animate: { opacity: 1, scale: 1 },
      transition: { delay: 0.3, type: "spring", stiffness: 500 }
    },
    /* @__PURE__ */ React18.createElement("span", { className: "text-lg" }, trend.isPositive ? "\u2191" : "\u2193"),
    Math.abs(trend.value),
    "%"
  )), description && /* @__PURE__ */ React18.createElement(
    motion.p,
    {
      className: "text-xs text-muted-foreground",
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { delay: 0.4 }
    },
    description
  )), icon && /* @__PURE__ */ React18.createElement(
    motion.div,
    {
      className: "rounded-lg bg-primary/10 p-3 text-primary",
      initial: { opacity: 0, rotate: -180, scale: 0 },
      animate: { opacity: 1, rotate: 0, scale: 1 },
      transition: { delay: 0.2, type: "spring", stiffness: 200 },
      whileHover: { rotate: 360, scale: 1.1 }
    },
    icon
  )))
);
StatCard.displayName = "StatCard";
var Checkbox = React18.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React18.createElement(
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
    ...props
  },
  /* @__PURE__ */ React18.createElement(
    CheckboxPrimitive.Indicator,
    {
      className: cn("flex items-center justify-center text-current")
    },
    /* @__PURE__ */ React18.createElement(
      motion.div,
      {
        initial: { scale: 0, rotate: -180 },
        animate: { scale: 1, rotate: 0 },
        transition: { type: "spring", stiffness: 500, damping: 15 }
      },
      /* @__PURE__ */ React18.createElement(Check, { className: "h-4 w-4" })
    )
  )
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;
var Dialog = DialogPrimitive.Root;
var DialogTrigger = DialogPrimitive.Trigger;
var DialogPortal = DialogPrimitive.Portal;
var DialogClose = DialogPrimitive.Close;
var DialogOverlay = React18.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React18.createElement(
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
var DialogContent = React18.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ React18.createElement(DialogPortal, null, /* @__PURE__ */ React18.createElement(DialogOverlay, null), /* @__PURE__ */ React18.createElement(
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
    ...props
  },
  children,
  /* @__PURE__ */ React18.createElement(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-lg p-2 glass hover:bg-muted/50 transition-all hover:rotate-90 duration-300 ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground" }, /* @__PURE__ */ React18.createElement(X, { className: "h-4 w-4" }), /* @__PURE__ */ React18.createElement("span", { className: "sr-only" }, "Close"))
)));
DialogContent.displayName = DialogPrimitive.Content.displayName;
var DialogHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ React18.createElement(
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
}) => /* @__PURE__ */ React18.createElement(
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
var DialogTitle = React18.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React18.createElement(
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
var DialogDescription = React18.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React18.createElement(
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
var DropdownMenuSubTrigger = React18.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ React18.createElement(
  DropdownMenuPrimitive.SubTrigger,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
      inset && "pl-8",
      className
    ),
    ...props
  },
  children,
  /* @__PURE__ */ React18.createElement(ChevronRight, { className: "ml-auto h-4 w-4" })
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
var DropdownMenuSubContent = React18.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React18.createElement(
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
var DropdownMenuContent = React18.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ React18.createElement(DropdownMenuPrimitive.Portal, null, /* @__PURE__ */ React18.createElement(
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
)));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
var DropdownMenuItem = React18.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ React18.createElement(
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
var DropdownMenuCheckboxItem = React18.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ React18.createElement(
  DropdownMenuPrimitive.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
      className
    ),
    checked,
    ...props
  },
  /* @__PURE__ */ React18.createElement("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center" }, /* @__PURE__ */ React18.createElement(DropdownMenuPrimitive.ItemIndicator, null, /* @__PURE__ */ React18.createElement(Check, { className: "h-4 w-4" }))),
  children
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
var DropdownMenuRadioItem = React18.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ React18.createElement(
  DropdownMenuPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
      className
    ),
    ...props
  },
  /* @__PURE__ */ React18.createElement("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center" }, /* @__PURE__ */ React18.createElement(DropdownMenuPrimitive.ItemIndicator, null, /* @__PURE__ */ React18.createElement(Circle, { className: "h-2 w-2 fill-current" }))),
  children
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
var DropdownMenuLabel = React18.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ React18.createElement(
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
var DropdownMenuSeparator = React18.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React18.createElement(
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
  return /* @__PURE__ */ React18.createElement(
    "span",
    {
      className: cn("ml-auto text-xs tracking-widest opacity-60", className),
      ...props
    }
  );
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
var EmptyState = React18.forwardRef(
  ({ className, icon, title, description, action, ...props }, ref) => {
    return /* @__PURE__ */ React18.createElement(
      motion.div,
      {
        ref,
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        className: cn(
          "flex flex-col items-center justify-center text-center p-8 glass-card rounded-xl",
          className
        ),
        ...props
      },
      icon && /* @__PURE__ */ React18.createElement(
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
          className: "mb-4 text-muted-foreground"
        },
        icon
      ),
      /* @__PURE__ */ React18.createElement(
        motion.h3,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: 0.2 },
          className: "text-lg font-semibold text-foreground mb-2"
        },
        title
      ),
      description && /* @__PURE__ */ React18.createElement(
        motion.p,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: 0.3 },
          className: "text-sm text-muted-foreground mb-6 max-w-md"
        },
        description
      ),
      action && /* @__PURE__ */ React18.createElement(
        motion.div,
        {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.4 }
        },
        /* @__PURE__ */ React18.createElement(Button, { onClick: action.onClick, variant: "primary" }, action.label)
      )
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
var Input = React18.forwardRef(
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
    const [isFocused, setIsFocused] = React18.useState(false);
    const hasError = !!error || state === "error";
    const currentState = hasError ? "error" : state;
    return /* @__PURE__ */ React18.createElement("div", { className: "w-full" }, /* @__PURE__ */ React18.createElement(
      motion.div,
      {
        className: "relative flex items-center",
        animate: {
          scale: isFocused ? 1.01 : 1
        },
        transition: { type: "spring", stiffness: 300, damping: 20 }
      },
      leftAddon && /* @__PURE__ */ React18.createElement("div", { className: "flex items-center glass-card border border-r-0 border-border rounded-l-xl px-3 h-10" }, leftAddon),
      leftIcon && !leftAddon && /* @__PURE__ */ React18.createElement(
        motion.div,
        {
          className: "absolute left-3 text-muted-foreground pointer-events-none",
          animate: {
            x: isFocused ? 2 : 0,
            scale: isFocused ? 1.1 : 1
          },
          transition: { type: "spring", stiffness: 400, damping: 20 }
        },
        leftIcon
      ),
      /* @__PURE__ */ React18.createElement(
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
      rightIcon && !rightAddon && /* @__PURE__ */ React18.createElement(
        motion.div,
        {
          className: "absolute right-3 text-muted-foreground pointer-events-none",
          animate: {
            x: isFocused ? -2 : 0,
            scale: isFocused ? 1.1 : 1
          },
          transition: { type: "spring", stiffness: 400, damping: 20 }
        },
        rightIcon
      ),
      rightAddon && /* @__PURE__ */ React18.createElement("div", { className: "flex items-center glass-card border border-l-0 border-border rounded-r-xl px-3 h-10" }, rightAddon)
    ), error && /* @__PURE__ */ React18.createElement(
      motion.p,
      {
        initial: { opacity: 0, y: -10, height: 0 },
        animate: { opacity: 1, y: 0, height: "auto" },
        exit: { opacity: 0, y: -10, height: 0 },
        className: "mt-1.5 text-xs text-error",
        id: `${props.id}-error`
      },
      error
    ), hint && !error && /* @__PURE__ */ React18.createElement(
      "p",
      {
        className: "mt-1.5 text-xs text-muted-foreground",
        id: `${props.id}-hint`
      },
      hint
    ));
  }
);
Input.displayName = "Input";
var Label2 = React18.forwardRef(
  ({ className, required, children, ...props }, ref) => /* @__PURE__ */ React18.createElement(
    "label",
    {
      ref,
      className: cn(
        "text-sm font-medium text-foreground leading-none",
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        "transition-all duration-200 hover:translate-x-0.5",
        className
      ),
      ...props
    },
    children,
    required && /* @__PURE__ */ React18.createElement("span", { className: "text-error ml-1" }, "*")
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
  return /* @__PURE__ */ React18.createElement(
    motion.div,
    {
      className: cn("space-y-2", className),
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.3 }
    },
    /* @__PURE__ */ React18.createElement(Label2, { htmlFor, required }, label),
    children,
    error && /* @__PURE__ */ React18.createElement(
      motion.p,
      {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0 },
        className: "text-xs text-error"
      },
      error
    ),
    hint && !error && /* @__PURE__ */ React18.createElement("p", { className: "text-xs text-muted-foreground" }, hint)
  );
};
FormField.displayName = "FormField";
var Textarea = React18.forwardRef(
  ({ className, variant, state, error, hint, ...props }, ref) => {
    const [isFocused, setIsFocused] = React18.useState(false);
    const hasError = !!error || state === "error";
    const currentState = hasError ? "error" : state;
    return /* @__PURE__ */ React18.createElement("div", { className: "w-full" }, /* @__PURE__ */ React18.createElement(
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
    ), error && /* @__PURE__ */ React18.createElement(
      motion.p,
      {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0 },
        className: "mt-1.5 text-xs text-error"
      },
      error
    ), hint && !error && /* @__PURE__ */ React18.createElement("p", { className: "mt-1.5 text-xs text-muted-foreground" }, hint));
  }
);
Textarea.displayName = "Textarea";
var Pagination = React18.forwardRef(
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
    const paginationRange = React18.useMemo(() => {
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
    return /* @__PURE__ */ React18.createElement(
      "nav",
      {
        ref,
        role: "navigation",
        "aria-label": "pagination",
        className: cn("mx-auto flex w-full justify-center", className),
        ...props
      },
      /* @__PURE__ */ React18.createElement("ul", { className: "flex flex-row items-center gap-1" }, /* @__PURE__ */ React18.createElement("li", null, /* @__PURE__ */ React18.createElement(
        Button,
        {
          variant: "ghost-primary",
          size: "icon",
          onClick: () => onPageChange(currentPage - 1),
          disabled: currentPage === 1,
          "aria-label": "Go to previous page"
        },
        /* @__PURE__ */ React18.createElement(ChevronLeft, { className: "h-4 w-4" })
      )), paginationRange.map((pageNumber, index) => {
        if (pageNumber === "dots") {
          return /* @__PURE__ */ React18.createElement("li", { key: `dots-${index}` }, /* @__PURE__ */ React18.createElement("span", { className: "flex h-9 w-9 items-center justify-center" }, /* @__PURE__ */ React18.createElement(MoreHorizontal, { className: "h-4 w-4" })));
        }
        const isActive = pageNumber === currentPage;
        return /* @__PURE__ */ React18.createElement("li", { key: pageNumber }, /* @__PURE__ */ React18.createElement(
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
            "aria-current": isActive ? "page" : void 0
          },
          pageNumber
        ));
      }), /* @__PURE__ */ React18.createElement("li", null, /* @__PURE__ */ React18.createElement(
        Button,
        {
          variant: "ghost-primary",
          size: "icon",
          onClick: () => onPageChange(currentPage + 1),
          disabled: currentPage === totalPages,
          "aria-label": "Go to next page"
        },
        /* @__PURE__ */ React18.createElement(ChevronRight, { className: "h-4 w-4" })
      )))
    );
  }
);
Pagination.displayName = "Pagination";
var Popover = PopoverPrimitive.Root;
var PopoverTrigger = PopoverPrimitive.Trigger;
var PopoverContent = React18.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ React18.createElement(PopoverPrimitive.Portal, null, /* @__PURE__ */ React18.createElement(
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
)));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;
var Progress = React18.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ React18.createElement(
  ProgressPrimitive.Root,
  {
    ref,
    className: cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    ),
    ...props
  },
  /* @__PURE__ */ React18.createElement(
    ProgressPrimitive.Indicator,
    {
      className: "h-full w-full flex-1 bg-primary transition-all",
      style: { transform: `translateX(-${100 - (value || 0)}%)` }
    }
  )
));
Progress.displayName = ProgressPrimitive.Root.displayName;
var RadioGroup2 = React18.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ React18.createElement(
    RadioGroupPrimitive.Root,
    {
      className: cn("grid gap-2", className),
      ...props,
      ref
    }
  );
});
RadioGroup2.displayName = RadioGroupPrimitive.Root.displayName;
var RadioGroupItem = React18.forwardRef(({ className, onClick, ...props }, ref) => {
  const [isChecked, setIsChecked] = React18.useState(false);
  const [showExplosion, setShowExplosion] = React18.useState(false);
  const handleClick = (e) => {
    setIsChecked(true);
    setShowExplosion(true);
    setTimeout(() => setShowExplosion(false), 800);
    onClick == null ? void 0 : onClick(e);
  };
  return /* @__PURE__ */ React18.createElement(
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
      ...props
    },
    /* @__PURE__ */ React18.createElement(AnimatePresence, null, showExplosion && /* @__PURE__ */ React18.createElement(React18.Fragment, null, [...Array(12)].map((_, i) => {
      const baseAngle = i * 360 / 12;
      const angleVariation = (Math.random() - 0.5) * 30;
      const angle = baseAngle + angleVariation;
      const baseDistance = 25;
      const distanceVariation = Math.random() * 15 - 5;
      const distance = baseDistance + distanceVariation;
      const size = 1 + Math.random() * 1.5;
      return /* @__PURE__ */ React18.createElement(
        motion.div,
        {
          key: i,
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
          }
        },
        /* @__PURE__ */ React18.createElement(
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
      );
    }))),
    /* @__PURE__ */ React18.createElement(AnimatePresence, null, isChecked && /* @__PURE__ */ React18.createElement(
      motion.div,
      {
        className: "absolute inset-0 rounded-full bg-primary/20 shadow-[0_0_15px_rgba(80,0,171,0.3)]",
        initial: { scale: 0, opacity: 0.6 },
        animate: { scale: 2.5, opacity: 0 },
        exit: { opacity: 0 },
        transition: { duration: 0.6, ease: "easeOut" }
      }
    )),
    /* @__PURE__ */ React18.createElement(RadioGroupPrimitive.Indicator, { className: "flex items-center justify-center" }, /* @__PURE__ */ React18.createElement(
      motion.div,
      {
        initial: { scale: 0 },
        animate: { scale: 1 },
        transition: { type: "spring", stiffness: 500, damping: 15 }
      },
      /* @__PURE__ */ React18.createElement(Circle, { className: "h-2.5 w-2.5 fill-primary text-primary drop-shadow-[0_0_4px_rgba(80,0,171,0.5)]" })
    ))
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;
var Select = SelectPrimitive.Root;
var SelectGroup = SelectPrimitive.Group;
var SelectValue = SelectPrimitive.Value;
var SelectTrigger = React18.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ React18.createElement(
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
    ...props
  },
  children,
  /* @__PURE__ */ React18.createElement(SelectPrimitive.Icon, { asChild: true }, /* @__PURE__ */ React18.createElement(ChevronDown, { className: "h-4 w-4 opacity-50" }))
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
var SelectScrollUpButton = React18.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React18.createElement(
  SelectPrimitive.ScrollUpButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1",
      className
    ),
    ...props
  },
  /* @__PURE__ */ React18.createElement(ChevronUp, { className: "h-4 w-4" })
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
var SelectScrollDownButton = React18.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React18.createElement(
  SelectPrimitive.ScrollDownButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1",
      className
    ),
    ...props
  },
  /* @__PURE__ */ React18.createElement(ChevronDown, { className: "h-4 w-4" })
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
var SelectContent = React18.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ React18.createElement(SelectPrimitive.Portal, null, /* @__PURE__ */ React18.createElement(
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
    ...props
  },
  /* @__PURE__ */ React18.createElement(SelectScrollUpButton, null),
  /* @__PURE__ */ React18.createElement(
    SelectPrimitive.Viewport,
    {
      className: cn(
        "p-1",
        position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
      )
    },
    children
  ),
  /* @__PURE__ */ React18.createElement(SelectScrollDownButton, null)
)));
SelectContent.displayName = SelectPrimitive.Content.displayName;
var SelectLabel = React18.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React18.createElement(
  SelectPrimitive.Label,
  {
    ref,
    className: cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className),
    ...props
  }
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
var SelectItem = React18.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ React18.createElement(
  SelectPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none",
      "focus:bg-accent focus:text-accent-foreground",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props
  },
  /* @__PURE__ */ React18.createElement("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center" }, /* @__PURE__ */ React18.createElement(SelectPrimitive.ItemIndicator, null, /* @__PURE__ */ React18.createElement(Check, { className: "h-4 w-4" }))),
  /* @__PURE__ */ React18.createElement(SelectPrimitive.ItemText, null, children)
));
SelectItem.displayName = SelectPrimitive.Item.displayName;
var SelectSeparator = React18.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React18.createElement(
  SelectPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-border", className),
    ...props
  }
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
var Separator3 = React18.forwardRef(
  ({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ React18.createElement(
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
var Skeleton = React18.forwardRef(
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
    return /* @__PURE__ */ React18.createElement(
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
}) => /* @__PURE__ */ React18.createElement("div", { className: cn("space-y-2", className) }, Array.from({ length: lines }).map((_, i) => /* @__PURE__ */ React18.createElement(
  Skeleton,
  {
    key: i,
    variant: "text",
    className: i === lines - 1 ? "w-3/4" : "w-full"
  }
)));
var SkeletonCard = ({ className }) => /* @__PURE__ */ React18.createElement("div", { className: cn("glass-card rounded-xl p-4 space-y-3", className) }, /* @__PURE__ */ React18.createElement(Skeleton, { className: "h-48 w-full" }), /* @__PURE__ */ React18.createElement(Skeleton, { variant: "text", className: "w-3/4" }), /* @__PURE__ */ React18.createElement(Skeleton, { variant: "text", className: "w-1/2" }));
var SkeletonAvatar = ({ size = "md", className }) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12"
  };
  return /* @__PURE__ */ React18.createElement(Skeleton, { variant: "circular", className: cn(sizeClasses[size], className) });
};
var SkeletonTable = ({ rows = 5, columns = 4, className }) => /* @__PURE__ */ React18.createElement("div", { className: cn("space-y-2", className) }, /* @__PURE__ */ React18.createElement("div", { className: "flex gap-4" }, Array.from({ length: columns }).map((_, i) => /* @__PURE__ */ React18.createElement(Skeleton, { key: `header-${i}`, className: "h-8 flex-1" }))), Array.from({ length: rows }).map((_, rowIndex) => /* @__PURE__ */ React18.createElement("div", { key: `row-${rowIndex}`, className: "flex gap-4" }, Array.from({ length: columns }).map((_2, colIndex) => /* @__PURE__ */ React18.createElement(
  Skeleton,
  {
    key: `cell-${rowIndex}-${colIndex}`,
    className: "h-12 flex-1"
  }
)))));
var Switch = React18.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React18.createElement(
  SwitchPrimitives.Root,
  {
    className: cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-border",
      "transition-all duration-300",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:bg-primary data-[state=checked]:border-primary",
      "data-[state=unchecked]:bg-secondary/30 dark:data-[state=unchecked]:bg-secondary/50",
      className
    ),
    ...props,
    ref
  },
  /* @__PURE__ */ React18.createElement(
    SwitchPrimitives.Thumb,
    {
      className: cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-white dark:bg-slate-200 shadow-md ring-0",
        "transition-transform duration-300 ease-out",
        "data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
      )
    }
  )
));
Switch.displayName = SwitchPrimitives.Root.displayName;
var Table = React18.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React18.createElement("div", { className: "relative w-full overflow-auto" }, /* @__PURE__ */ React18.createElement(
  "table",
  {
    ref,
    className: cn("w-full caption-bottom text-sm", className),
    ...props
  }
)));
Table.displayName = "Table";
var TableHeader = React18.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React18.createElement("thead", { ref, className: cn("[&_tr]:border-b", className), ...props }));
TableHeader.displayName = "TableHeader";
var TableBody = React18.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React18.createElement(
  "tbody",
  {
    ref,
    className: cn("[&_tr:last-child]:border-0", className),
    ...props
  }
));
TableBody.displayName = "TableBody";
var TableFooter = React18.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React18.createElement(
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
var TableRow = React18.forwardRef(({ className, hover = true, ...props }, ref) => /* @__PURE__ */ React18.createElement(
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
var TableHead = React18.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React18.createElement(
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
var TableCell = React18.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React18.createElement(
  "td",
  {
    ref,
    className: cn("p-2 align-middle [&:has([role=checkbox])]:pr-0", className),
    ...props
  }
));
TableCell.displayName = "TableCell";
var TableCaption = React18.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React18.createElement(
  "caption",
  {
    ref,
    className: cn("mt-4 text-sm text-muted-foreground", className),
    ...props
  }
));
TableCaption.displayName = "TableCaption";
var Tabs = TabsPrimitive.Root;
var TabsList = React18.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React18.createElement(
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
var TabsTrigger = React18.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ React18.createElement(
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
    ...props
  },
  /* @__PURE__ */ React18.createElement(
    motion.span,
    {
      initial: { scale: 1 },
      whileHover: { scale: 1.05 },
      whileTap: { scale: 0.95 },
      transition: { type: "spring", stiffness: 400, damping: 17 }
    },
    children
  )
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
var TabsContent = React18.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ React18.createElement(
  TabsPrimitive.Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  },
  /* @__PURE__ */ React18.createElement(
    motion.div,
    {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.2 }
    },
    children
  )
));
TabsContent.displayName = TabsPrimitive.Content.displayName;
var ToastProvider = ToastPrimitives.Provider;
var ToastViewport = React18.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React18.createElement(
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
var Toast = React18.forwardRef(({ className, variant, ...props }, ref) => {
  return /* @__PURE__ */ React18.createElement(
    ToastPrimitives.Root,
    {
      ref,
      className: cn(toastVariants({ variant }), className),
      ...props
    }
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;
var ToastAction = React18.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React18.createElement(
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
var ToastClose = React18.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React18.createElement(
  ToastPrimitives.Close,
  {
    ref,
    className: cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    ),
    "toast-close": "",
    ...props
  },
  /* @__PURE__ */ React18.createElement(X, { className: "h-4 w-4" })
));
ToastClose.displayName = ToastPrimitives.Close.displayName;
var ToastTitle = React18.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React18.createElement(
  ToastPrimitives.Title,
  {
    ref,
    className: cn("text-sm font-semibold", className),
    ...props
  }
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;
var ToastDescription = React18.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React18.createElement(
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
  const [state, setState] = React18.useState(memoryState);
  React18.useEffect(() => {
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

// src/components/toaster.tsx
function Toaster() {
  const { toasts } = useToast();
  return /* @__PURE__ */ React.createElement(ToastProvider, null, toasts.map(function({ id, title, description, action, ...props }) {
    return /* @__PURE__ */ React.createElement(Toast, { key: id, ...props }, /* @__PURE__ */ React.createElement("div", { className: "grid gap-1" }, title && /* @__PURE__ */ React.createElement(ToastTitle, null, title), description && /* @__PURE__ */ React.createElement(ToastDescription, null, description)), action, /* @__PURE__ */ React.createElement(ToastClose, null));
  }), /* @__PURE__ */ React.createElement(ToastViewport, null));
}
var TooltipProvider = TooltipPrimitive.Provider;
var Tooltip = TooltipPrimitive.Root;
var TooltipTrigger = TooltipPrimitive.Trigger;
var TooltipContent = React18.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ React18.createElement(
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

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Alert, AlertDescription, AlertTitle, Avatar, AvatarFallback, AvatarImage, Badge, Breadcrumbs, Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Checkbox, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger, DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, EmptyState, FormField, IconButton, Input, Label2 as Label, Pagination, Popover, PopoverContent, PopoverTrigger, Progress, RadioGroup2 as RadioGroup, RadioGroupItem, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue, Separator3 as Separator, Skeleton, SkeletonAvatar, SkeletonCard, SkeletonTable, SkeletonText, StatCard, StatusBadge, Switch, Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow, Tabs, TabsContent, TabsList, TabsTrigger, Textarea, Toast, ToastAction, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport, Toaster, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, badgeVariants, buttonVariants, cn, debounce, formatCurrency, formatDate, formatRelativeTime, generateId, getInitials, inputVariants, reducer, sleep, toast, truncate, useToast };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map