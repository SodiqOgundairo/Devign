'use strict';

var React11 = require('react');
var AccordionPrimitive = require('@radix-ui/react-accordion');
var lucideReact = require('lucide-react');
var clsx = require('clsx');
var tailwindMerge = require('tailwind-merge');
var jsxRuntime = require('react/jsx-runtime');
var classVarianceAuthority = require('class-variance-authority');
var react = require('motion/react');
var AvatarPrimitive = require('@radix-ui/react-avatar');
var reactSlot = require('@radix-ui/react-slot');
var CheckboxPrimitive = require('@radix-ui/react-checkbox');
var DialogPrimitive = require('@radix-ui/react-dialog');
var DropdownMenuPrimitive = require('@radix-ui/react-dropdown-menu');
var PopoverPrimitive = require('@radix-ui/react-popover');
var ProgressPrimitive = require('@radix-ui/react-progress');
var RadioGroupPrimitive = require('@radix-ui/react-radio-group');
var SelectPrimitive = require('@radix-ui/react-select');
var SeparatorPrimitive = require('@radix-ui/react-separator');
var SwitchPrimitives = require('@radix-ui/react-switch');
var TabsPrimitive = require('@radix-ui/react-tabs');
var ToastPrimitives = require('@radix-ui/react-toast');
var TooltipPrimitive = require('@radix-ui/react-tooltip');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var React11__namespace = /*#__PURE__*/_interopNamespace(React11);
var AccordionPrimitive__namespace = /*#__PURE__*/_interopNamespace(AccordionPrimitive);
var AvatarPrimitive__namespace = /*#__PURE__*/_interopNamespace(AvatarPrimitive);
var CheckboxPrimitive__namespace = /*#__PURE__*/_interopNamespace(CheckboxPrimitive);
var DialogPrimitive__namespace = /*#__PURE__*/_interopNamespace(DialogPrimitive);
var DropdownMenuPrimitive__namespace = /*#__PURE__*/_interopNamespace(DropdownMenuPrimitive);
var PopoverPrimitive__namespace = /*#__PURE__*/_interopNamespace(PopoverPrimitive);
var ProgressPrimitive__namespace = /*#__PURE__*/_interopNamespace(ProgressPrimitive);
var RadioGroupPrimitive__namespace = /*#__PURE__*/_interopNamespace(RadioGroupPrimitive);
var SelectPrimitive__namespace = /*#__PURE__*/_interopNamespace(SelectPrimitive);
var SeparatorPrimitive__namespace = /*#__PURE__*/_interopNamespace(SeparatorPrimitive);
var SwitchPrimitives__namespace = /*#__PURE__*/_interopNamespace(SwitchPrimitives);
var TabsPrimitive__namespace = /*#__PURE__*/_interopNamespace(TabsPrimitive);
var ToastPrimitives__namespace = /*#__PURE__*/_interopNamespace(ToastPrimitives);
var TooltipPrimitive__namespace = /*#__PURE__*/_interopNamespace(TooltipPrimitive);

// src/components/accordion.tsx
function cn(...inputs) {
  return tailwindMerge.twMerge(clsx.clsx(inputs));
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
var Accordion = AccordionPrimitive__namespace.Root;
var AccordionItem = React11__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  AccordionPrimitive__namespace.Item,
  {
    ref,
    className: cn("glass-card rounded-xl border border-border mb-2", className),
    ...props
  }
));
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = React11__namespace.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(AccordionPrimitive__namespace.Header, { className: "flex", children: /* @__PURE__ */ jsxRuntime.jsxs(
  AccordionPrimitive__namespace.Trigger,
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
      /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronDown, { className: "h-4 w-4 shrink-0 transition-transform duration-200" })
    ]
  }
) }));
AccordionTrigger.displayName = AccordionPrimitive__namespace.Trigger.displayName;
var AccordionContent = React11__namespace.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  AccordionPrimitive__namespace.Content,
  {
    ref,
    className: "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    ...props,
    children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: cn("pb-4 pt-0 px-4", className), children })
  }
));
AccordionContent.displayName = AccordionPrimitive__namespace.Content.displayName;
var alertVariants = classVarianceAuthority.cva(
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
var Alert = React11__namespace.forwardRef(
  ({ className, variant, dismissible, onDismiss, children, ...props }, ref) => {
    const [isVisible, setIsVisible] = React11__namespace.useState(true);
    const handleDismiss = () => {
      setIsVisible(false);
      setTimeout(() => onDismiss?.(), 300);
    };
    return /* @__PURE__ */ jsxRuntime.jsx(react.AnimatePresence, { children: isVisible && /* @__PURE__ */ jsxRuntime.jsxs(
      react.motion.div,
      {
        ref,
        initial: { opacity: 0, y: -10, scale: 0.95 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
        className: cn(alertVariants({ variant }), className),
        ...props,
        children: [
          children,
          dismissible && /* @__PURE__ */ jsxRuntime.jsx(
            "button",
            {
              onClick: handleDismiss,
              className: "absolute right-4 top-4 rounded-md p-1 transition-colors hover:bg-muted",
              "aria-label": "Dismiss",
              children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { className: "h-4 w-4" })
            }
          )
        ]
      }
    ) });
  }
);
Alert.displayName = "Alert";
var AlertTitle = React11__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  "h5",
  {
    ref,
    className: cn("mb-1 font-medium leading-none tracking-tight", className),
    ...props
  }
));
AlertTitle.displayName = "AlertTitle";
var AlertDescription = React11__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  "div",
  {
    ref,
    className: cn("text-sm [&_p]:leading-relaxed", className),
    ...props
  }
));
AlertDescription.displayName = "AlertDescription";
var Avatar = React11__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  AvatarPrimitive__namespace.Root,
  {
    ref,
    className: cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    ),
    ...props
  }
));
Avatar.displayName = AvatarPrimitive__namespace.Root.displayName;
var AvatarImage = React11__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  AvatarPrimitive__namespace.Image,
  {
    ref,
    className: cn("aspect-square h-full w-full", className),
    ...props
  }
));
AvatarImage.displayName = AvatarPrimitive__namespace.Image.displayName;
var AvatarFallback = React11__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  AvatarPrimitive__namespace.Fallback,
  {
    ref,
    className: cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted text-sm font-medium",
      className
    ),
    ...props
  }
));
AvatarFallback.displayName = AvatarPrimitive__namespace.Fallback.displayName;
var AvatarGroup = React11__namespace.forwardRef(
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
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "div",
      {
        ref,
        className: cn("flex items-center", spacingClasses[spacing], className),
        ...props,
        children: [
          visible.map((avatar, i) => /* @__PURE__ */ jsxRuntime.jsx(
            react.motion.div,
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
              children: /* @__PURE__ */ jsxRuntime.jsxs(Avatar, { className: sizeClasses[size], children: [
                avatar.src && /* @__PURE__ */ jsxRuntime.jsx(
                  AvatarImage,
                  {
                    src: avatar.src,
                    alt: avatar.alt || avatar.fallback
                  }
                ),
                /* @__PURE__ */ jsxRuntime.jsx(AvatarFallback, { className: sizeClasses[size], children: avatar.fallback })
              ] })
            },
            i
          )),
          overflow > 0 && /* @__PURE__ */ jsxRuntime.jsxs(
            react.motion.div,
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
var badgeVariants = classVarianceAuthority.cva(
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
var Badge = React11__namespace.forwardRef(
  ({ className, variant, size, dot, children, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      ref,
      className: cn(badgeVariants({ variant, size }), className),
      ...props,
      children: [
        dot && /* @__PURE__ */ jsxRuntime.jsx("span", { className: cn("mr-1.5 h-1.5 w-1.5 rounded-full bg-current") }),
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
  return /* @__PURE__ */ jsxRuntime.jsx(Badge, { variant, dot: true, className, children: children || label });
};
StatusBadge.displayName = "StatusBadge";
var Breadcrumbs = React11__namespace.forwardRef(
  ({ className, items, separator, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntime.jsx(
      "nav",
      {
        ref,
        "aria-label": "Breadcrumb",
        className: cn("flex items-center space-x-1 text-sm", className),
        ...props,
        children: /* @__PURE__ */ jsxRuntime.jsx("ol", { className: "flex items-center space-x-1", children: items.map((item, index) => {
          const isLast = index === items.length - 1;
          return /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "flex items-center space-x-1", children: [
            item.href || item.onClick ? /* @__PURE__ */ jsxRuntime.jsx(
              react.motion.a,
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
            ) : /* @__PURE__ */ jsxRuntime.jsx(
              "span",
              {
                className: cn(
                  isLast ? "text-foreground font-medium" : "text-muted-foreground"
                ),
                "aria-current": isLast ? "page" : void 0,
                children: item.label
              }
            ),
            !isLast && /* @__PURE__ */ jsxRuntime.jsx(
              lucideReact.ChevronRight,
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
var buttonVariants = classVarianceAuthority.cva(
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
var Ripple = ({ x, y }) => /* @__PURE__ */ jsxRuntime.jsx(
  react.motion.span,
  {
    className: "absolute rounded-full bg-white/30",
    style: { left: x, top: y, width: 0, height: 0 },
    initial: { width: 0, height: 0, opacity: 0.5 },
    animate: { width: 300, height: 300, opacity: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  }
);
var Button = React11__namespace.forwardRef(
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
    const [ripples, setRipples] = React11__namespace.useState([]);
    const handleClick = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setRipples((prev) => [
        ...prev,
        { x: e.clientX - rect.left, y: e.clientY - rect.top, id: Date.now() }
      ]);
      setTimeout(() => setRipples((prev) => prev.slice(1)), 600);
      onClick?.(e);
    };
    const Comp = asChild ? reactSlot.Slot : "button";
    const content = /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      ripples.map((r) => /* @__PURE__ */ jsxRuntime.jsx(Ripple, { x: r.x, y: r.y }, r.id)),
      isLoading ? /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Loader2, { className: "animate-spin" }) : leftIcon ?? null,
      children,
      !isLoading && rightIcon
    ] });
    if (asChild) {
      return /* @__PURE__ */ jsxRuntime.jsx(
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
    return /* @__PURE__ */ jsxRuntime.jsx(
      react.motion.button,
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
var IconButton = React11__namespace.forwardRef(
  ({ size = "icon", children, className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
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
var Card = React11__namespace.forwardRef(
  ({ className, hover = false, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
    react.motion.div,
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
var CardHeader = React11__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  "div",
  {
    ref,
    className: cn("flex flex-col space-y-1.5 p-6", className),
    ...props
  }
));
CardHeader.displayName = "CardHeader";
var CardTitle = React11__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
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
var CardDescription = React11__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  "p",
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
CardDescription.displayName = "CardDescription";
var CardContent = React11__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx("div", { ref, className: cn("p-6 pt-0", className), ...props }));
CardContent.displayName = "CardContent";
var CardFooter = React11__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
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
}) => /* @__PURE__ */ jsxRuntime.jsx(
  react.motion.div,
  {
    className: cn("glass-card rounded-xl overflow-hidden", className),
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    whileHover: { y: -6, scale: 1.02 },
    transition: { type: "spring", stiffness: 300, damping: 20 },
    children: /* @__PURE__ */ jsxRuntime.jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2 flex-1", children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          react.motion.p,
          {
            className: "text-sm font-medium text-muted-foreground",
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: 0.1 },
            children: title
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-baseline gap-2", children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            react.motion.span,
            {
              className: "text-3xl font-bold text-foreground",
              initial: { opacity: 0, x: -10 },
              animate: { opacity: 1, x: 0 },
              transition: { delay: 0.2, type: "spring" },
              children: value
            }
          ),
          trend && /* @__PURE__ */ jsxRuntime.jsxs(
            react.motion.span,
            {
              className: cn(
                "text-sm font-medium flex items-center gap-1",
                trend.isPositive ? "text-success" : "text-error"
              ),
              initial: { opacity: 0, scale: 0 },
              animate: { opacity: 1, scale: 1 },
              transition: { delay: 0.3, type: "spring", stiffness: 500 },
              children: [
                /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-lg", children: trend.isPositive ? "\u2191" : "\u2193" }),
                Math.abs(trend.value),
                "%"
              ]
            }
          )
        ] }),
        description && /* @__PURE__ */ jsxRuntime.jsx(
          react.motion.p,
          {
            className: "text-xs text-muted-foreground",
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: 0.4 },
            children: description
          }
        )
      ] }),
      icon && /* @__PURE__ */ jsxRuntime.jsx(
        react.motion.div,
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
var Checkbox = React11__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  CheckboxPrimitive__namespace.Root,
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
    children: /* @__PURE__ */ jsxRuntime.jsx(
      CheckboxPrimitive__namespace.Indicator,
      {
        className: cn("flex items-center justify-center text-current"),
        children: /* @__PURE__ */ jsxRuntime.jsx(
          react.motion.div,
          {
            initial: { scale: 0, rotate: -180 },
            animate: { scale: 1, rotate: 0 },
            transition: { type: "spring", stiffness: 500, damping: 15 },
            children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Check, { className: "h-4 w-4" })
          }
        )
      }
    )
  }
));
Checkbox.displayName = CheckboxPrimitive__namespace.Root.displayName;
var Dialog = DialogPrimitive__namespace.Root;
var DialogTrigger = DialogPrimitive__namespace.Trigger;
var DialogPortal = DialogPrimitive__namespace.Portal;
var DialogClose = DialogPrimitive__namespace.Close;
var DialogOverlay = React11__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  DialogPrimitive__namespace.Overlay,
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
DialogOverlay.displayName = DialogPrimitive__namespace.Overlay.displayName;
var DialogContent = React11__namespace.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsxRuntime.jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxRuntime.jsxs(
    DialogPrimitive__namespace.Content,
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
        /* @__PURE__ */ jsxRuntime.jsxs(DialogPrimitive__namespace.Close, { className: "absolute right-4 top-4 rounded-lg p-2 glass hover:bg-muted/50 transition-all hover:rotate-90 duration-300 ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = DialogPrimitive__namespace.Content.displayName;
var DialogHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ jsxRuntime.jsx(
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
}) => /* @__PURE__ */ jsxRuntime.jsx(
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
var DialogTitle = React11__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  DialogPrimitive__namespace.Title,
  {
    ref,
    className: cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  }
));
DialogTitle.displayName = DialogPrimitive__namespace.Title.displayName;
var DialogDescription = React11__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  DialogPrimitive__namespace.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = DialogPrimitive__namespace.Description.displayName;
var DropdownMenu = DropdownMenuPrimitive__namespace.Root;
var DropdownMenuTrigger = DropdownMenuPrimitive__namespace.Trigger;
var DropdownMenuGroup = DropdownMenuPrimitive__namespace.Group;
var DropdownMenuPortal = DropdownMenuPrimitive__namespace.Portal;
var DropdownMenuSub = DropdownMenuPrimitive__namespace.Sub;
var DropdownMenuRadioGroup = DropdownMenuPrimitive__namespace.RadioGroup;
var DropdownMenuSubTrigger = React11__namespace.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsxs(
  DropdownMenuPrimitive__namespace.SubTrigger,
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
      /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronRight, { className: "ml-auto h-4 w-4" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive__namespace.SubTrigger.displayName;
var DropdownMenuSubContent = React11__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  DropdownMenuPrimitive__namespace.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive__namespace.SubContent.displayName;
var DropdownMenuContent = React11__namespace.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(DropdownMenuPrimitive__namespace.Portal, { children: /* @__PURE__ */ jsxRuntime.jsx(
  DropdownMenuPrimitive__namespace.Content,
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
DropdownMenuContent.displayName = DropdownMenuPrimitive__namespace.Content.displayName;
var DropdownMenuItem = React11__namespace.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  DropdownMenuPrimitive__namespace.Item,
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
DropdownMenuItem.displayName = DropdownMenuPrimitive__namespace.Item.displayName;
var DropdownMenuCheckboxItem = React11__namespace.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsxs(
  DropdownMenuPrimitive__namespace.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntime.jsx(DropdownMenuPrimitive__namespace.ItemIndicator, { children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive__namespace.CheckboxItem.displayName;
var DropdownMenuRadioItem = React11__namespace.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsxs(
  DropdownMenuPrimitive__namespace.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntime.jsx(DropdownMenuPrimitive__namespace.ItemIndicator, { children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Circle, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive__namespace.RadioItem.displayName;
var DropdownMenuLabel = React11__namespace.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  DropdownMenuPrimitive__namespace.Label,
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
DropdownMenuLabel.displayName = DropdownMenuPrimitive__namespace.Label.displayName;
var DropdownMenuSeparator = React11__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  DropdownMenuPrimitive__namespace.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive__namespace.Separator.displayName;
var DropdownMenuShortcut = ({
  className,
  ...props
}) => {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "span",
    {
      className: cn("ml-auto text-xs tracking-widest opacity-60", className),
      ...props
    }
  );
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
var EmptyState = React11__namespace.forwardRef(
  ({ className, icon, title, description, action, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntime.jsxs(
      react.motion.div,
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
          icon && /* @__PURE__ */ jsxRuntime.jsx(
            react.motion.div,
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
          /* @__PURE__ */ jsxRuntime.jsx(
            react.motion.h3,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 0.2 },
              className: "text-lg font-semibold text-foreground mb-2",
              children: title
            }
          ),
          description && /* @__PURE__ */ jsxRuntime.jsx(
            react.motion.p,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 0.3 },
              className: "text-sm text-muted-foreground mb-6 max-w-md",
              children: description
            }
          ),
          action && /* @__PURE__ */ jsxRuntime.jsx(
            react.motion.div,
            {
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.4 },
              children: /* @__PURE__ */ jsxRuntime.jsx(Button, { onClick: action.onClick, variant: "primary", children: action.label })
            }
          )
        ]
      }
    );
  }
);
EmptyState.displayName = "EmptyState";
var inputVariants = classVarianceAuthority.cva(
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
var Input = React11__namespace.forwardRef(
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
    const [isFocused, setIsFocused] = React11__namespace.useState(false);
    const hasError = !!error || state === "error";
    const currentState = hasError ? "error" : state;
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "w-full", children: [
      /* @__PURE__ */ jsxRuntime.jsxs(
        react.motion.div,
        {
          className: "relative flex items-center",
          animate: {
            scale: isFocused ? 1.01 : 1
          },
          transition: { type: "spring", stiffness: 300, damping: 20 },
          children: [
            leftAddon && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex items-center glass-card border border-r-0 border-border rounded-l-xl px-3 h-10", children: leftAddon }),
            leftIcon && !leftAddon && /* @__PURE__ */ jsxRuntime.jsx(
              react.motion.div,
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
            /* @__PURE__ */ jsxRuntime.jsx(
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
            rightIcon && !rightAddon && /* @__PURE__ */ jsxRuntime.jsx(
              react.motion.div,
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
            rightAddon && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex items-center glass-card border border-l-0 border-border rounded-r-xl px-3 h-10", children: rightAddon })
          ]
        }
      ),
      error && /* @__PURE__ */ jsxRuntime.jsx(
        react.motion.p,
        {
          initial: { opacity: 0, y: -10, height: 0 },
          animate: { opacity: 1, y: 0, height: "auto" },
          exit: { opacity: 0, y: -10, height: 0 },
          className: "mt-1.5 text-xs text-error",
          id: `${props.id}-error`,
          children: error
        }
      ),
      hint && !error && /* @__PURE__ */ jsxRuntime.jsx(
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
var Label2 = React11__namespace.forwardRef(
  ({ className, required, children, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsxs(
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
        required && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-error ml-1", children: "*" })
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
  return /* @__PURE__ */ jsxRuntime.jsxs(
    react.motion.div,
    {
      className: cn("space-y-2", className),
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.3 },
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(Label2, { htmlFor, required, children: label }),
        children,
        error && /* @__PURE__ */ jsxRuntime.jsx(
          react.motion.p,
          {
            initial: { opacity: 0, y: -10 },
            animate: { opacity: 1, y: 0 },
            className: "text-xs text-error",
            children: error
          }
        ),
        hint && !error && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-xs text-muted-foreground", children: hint })
      ]
    }
  );
};
FormField.displayName = "FormField";
var Textarea = React11__namespace.forwardRef(
  ({ className, variant, state, error, hint, ...props }, ref) => {
    const [isFocused, setIsFocused] = React11__namespace.useState(false);
    const hasError = !!error || state === "error";
    const currentState = hasError ? "error" : state;
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "w-full", children: [
      /* @__PURE__ */ jsxRuntime.jsx(
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
      error && /* @__PURE__ */ jsxRuntime.jsx(
        react.motion.p,
        {
          initial: { opacity: 0, y: -10 },
          animate: { opacity: 1, y: 0 },
          className: "mt-1.5 text-xs text-error",
          children: error
        }
      ),
      hint && !error && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "mt-1.5 text-xs text-muted-foreground", children: hint })
    ] });
  }
);
Textarea.displayName = "Textarea";
var Kbd = React11__namespace.forwardRef(
  ({ className, size = "md", children, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
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
}) => /* @__PURE__ */ jsxRuntime.jsx("span", { className: cn("inline-flex items-center gap-1", className), children: keys.map((key, i) => /* @__PURE__ */ jsxRuntime.jsxs(React11__namespace.Fragment, { children: [
  /* @__PURE__ */ jsxRuntime.jsx(Kbd, { size, children: key }),
  i < keys.length - 1 && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-muted-foreground text-xs", children: "+" })
] }, key)) });
Shortcut.displayName = "Shortcut";
var Container = React11__namespace.forwardRef(
  ({ className, size = "xl", padded = true, ...props }, ref) => {
    const maxWidths = {
      sm: "max-w-screen-sm",
      md: "max-w-screen-md",
      lg: "max-w-screen-lg",
      xl: "max-w-screen-xl",
      full: "max-w-full"
    };
    return /* @__PURE__ */ jsxRuntime.jsx(
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
var Stack = React11__namespace.forwardRef(
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
    return /* @__PURE__ */ jsxRuntime.jsx(
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
var Grid = React11__namespace.forwardRef(
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
    return /* @__PURE__ */ jsxRuntime.jsx(
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
var Divider = React11__namespace.forwardRef(
  ({ className, label, orientation = "horizontal", ...props }, ref) => {
    if (orientation === "vertical") {
      return /* @__PURE__ */ jsxRuntime.jsx(
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
      return /* @__PURE__ */ jsxRuntime.jsxs(
        "div",
        {
          ref,
          className: cn("flex items-center gap-3", className),
          role: "separator",
          ...props,
          children: [
            /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex-1 h-px bg-border" }),
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-xs text-muted-foreground whitespace-nowrap px-1", children: label }),
            /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex-1 h-px bg-border" })
          ]
        }
      );
    }
    return /* @__PURE__ */ jsxRuntime.jsx(
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
var NumberInput = React11__namespace.forwardRef(
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
    const [internalValue, setInternalValue] = React11__namespace.useState(
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
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "w-full", children: [
      /* @__PURE__ */ jsxRuntime.jsxs(
        "div",
        {
          className: cn(
            "inline-flex items-center glass-card border border-border rounded-xl overflow-hidden",
            error && "border-error",
            disabled && "opacity-50 cursor-not-allowed"
          ),
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              react.motion.button,
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
                children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Minus, { className: "h-3.5 w-3.5" })
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(
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
            /* @__PURE__ */ jsxRuntime.jsx(
              react.motion.button,
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
                children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Plus, { className: "h-3.5 w-3.5" })
              }
            )
          ]
        }
      ),
      error && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "mt-1.5 text-xs text-error", children: error }),
      hint && !error && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "mt-1.5 text-xs text-muted-foreground", children: hint })
    ] });
  }
);
NumberInput.displayName = "NumberInput";
var Pagination = React11__namespace.forwardRef(
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
    const paginationRange = React11__namespace.useMemo(() => {
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
    return /* @__PURE__ */ jsxRuntime.jsx(
      "nav",
      {
        ref,
        role: "navigation",
        "aria-label": "pagination",
        className: cn("mx-auto flex w-full justify-center", className),
        ...props,
        children: /* @__PURE__ */ jsxRuntime.jsxs("ul", { className: "flex flex-row items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntime.jsx("li", { children: /* @__PURE__ */ jsxRuntime.jsx(
            Button,
            {
              variant: "ghost-primary",
              size: "icon",
              onClick: () => onPageChange(currentPage - 1),
              disabled: currentPage === 1,
              "aria-label": "Go to previous page",
              children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronLeft, { className: "h-4 w-4" })
            }
          ) }),
          paginationRange.map((pageNumber, index) => {
            if (pageNumber === "dots") {
              return /* @__PURE__ */ jsxRuntime.jsx("li", { children: /* @__PURE__ */ jsxRuntime.jsx("span", { className: "flex h-9 w-9 items-center justify-center", children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.MoreHorizontal, { className: "h-4 w-4" }) }) }, `dots-${index}`);
            }
            const isActive = pageNumber === currentPage;
            return /* @__PURE__ */ jsxRuntime.jsx("li", { children: /* @__PURE__ */ jsxRuntime.jsx(
              react.motion.button,
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
          /* @__PURE__ */ jsxRuntime.jsx("li", { children: /* @__PURE__ */ jsxRuntime.jsx(
            Button,
            {
              variant: "ghost-primary",
              size: "icon",
              onClick: () => onPageChange(currentPage + 1),
              disabled: currentPage === totalPages,
              "aria-label": "Go to next page",
              children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronRight, { className: "h-4 w-4" })
            }
          ) })
        ] })
      }
    );
  }
);
Pagination.displayName = "Pagination";
var Popover = PopoverPrimitive__namespace.Root;
var PopoverTrigger = PopoverPrimitive__namespace.Trigger;
var PopoverContent = React11__namespace.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(PopoverPrimitive__namespace.Portal, { children: /* @__PURE__ */ jsxRuntime.jsx(
  PopoverPrimitive__namespace.Content,
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
PopoverContent.displayName = PopoverPrimitive__namespace.Content.displayName;
var Progress = React11__namespace.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  ProgressPrimitive__namespace.Root,
  {
    ref,
    className: cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsxRuntime.jsx(
      ProgressPrimitive__namespace.Indicator,
      {
        className: "h-full w-full flex-1 bg-primary transition-all",
        style: { transform: `translateX(-${100 - (value || 0)}%)` }
      }
    )
  }
));
Progress.displayName = ProgressPrimitive__namespace.Root.displayName;
var RadioGroup2 = React11__namespace.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsxRuntime.jsx(
    RadioGroupPrimitive__namespace.Root,
    {
      className: cn("grid gap-2", className),
      ...props,
      ref
    }
  );
});
RadioGroup2.displayName = RadioGroupPrimitive__namespace.Root.displayName;
var RadioGroupItem = React11__namespace.forwardRef(({ className, onClick, ...props }, ref) => {
  const [isChecked, setIsChecked] = React11__namespace.useState(false);
  const [showExplosion, setShowExplosion] = React11__namespace.useState(false);
  const handleClick = (e) => {
    setIsChecked(true);
    setShowExplosion(true);
    setTimeout(() => setShowExplosion(false), 800);
    onClick?.(e);
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(
    RadioGroupPrimitive__namespace.Item,
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
        /* @__PURE__ */ jsxRuntime.jsx(react.AnimatePresence, { children: showExplosion && /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: [...Array(12)].map((_, i) => {
          const baseAngle = i * 360 / 12;
          const angleVariation = (Math.random() - 0.5) * 30;
          const angle = baseAngle + angleVariation;
          const baseDistance = 25;
          const distanceVariation = Math.random() * 15 - 5;
          const distance = baseDistance + distanceVariation;
          const size = 1 + Math.random() * 1.5;
          return /* @__PURE__ */ jsxRuntime.jsx(
            react.motion.div,
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
              children: /* @__PURE__ */ jsxRuntime.jsx(
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
        /* @__PURE__ */ jsxRuntime.jsx(react.AnimatePresence, { children: isChecked && /* @__PURE__ */ jsxRuntime.jsx(
          react.motion.div,
          {
            className: "absolute inset-0 rounded-full bg-primary/20 shadow-[0_0_15px_rgba(80,0,171,0.3)]",
            initial: { scale: 0, opacity: 0.6 },
            animate: { scale: 2.5, opacity: 0 },
            exit: { opacity: 0 },
            transition: { duration: 0.6, ease: "easeOut" }
          }
        ) }),
        /* @__PURE__ */ jsxRuntime.jsx(RadioGroupPrimitive__namespace.Indicator, { className: "flex items-center justify-center", children: /* @__PURE__ */ jsxRuntime.jsx(
          react.motion.div,
          {
            initial: { scale: 0 },
            animate: { scale: 1 },
            transition: { type: "spring", stiffness: 500, damping: 15 },
            children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Circle, { className: "h-2.5 w-2.5 fill-primary text-primary drop-shadow-[0_0_4px_rgba(80,0,171,0.5)]" })
          }
        ) })
      ]
    }
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive__namespace.Item.displayName;
var Select = SelectPrimitive__namespace.Root;
var SelectGroup = SelectPrimitive__namespace.Group;
var SelectValue = SelectPrimitive__namespace.Value;
var SelectTrigger = React11__namespace.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsxs(
  SelectPrimitive__namespace.Trigger,
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
      /* @__PURE__ */ jsxRuntime.jsx(SelectPrimitive__namespace.Icon, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronDown, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = SelectPrimitive__namespace.Trigger.displayName;
var SelectScrollUpButton = React11__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  SelectPrimitive__namespace.ScrollUpButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronUp, { className: "h-4 w-4" })
  }
));
SelectScrollUpButton.displayName = SelectPrimitive__namespace.ScrollUpButton.displayName;
var SelectScrollDownButton = React11__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  SelectPrimitive__namespace.ScrollDownButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronDown, { className: "h-4 w-4" })
  }
));
SelectScrollDownButton.displayName = SelectPrimitive__namespace.ScrollDownButton.displayName;
var SelectContent = React11__namespace.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(SelectPrimitive__namespace.Portal, { children: /* @__PURE__ */ jsxRuntime.jsxs(
  SelectPrimitive__namespace.Content,
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
      /* @__PURE__ */ jsxRuntime.jsx(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsxRuntime.jsx(
        SelectPrimitive__namespace.Viewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = SelectPrimitive__namespace.Content.displayName;
var SelectLabel = React11__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  SelectPrimitive__namespace.Label,
  {
    ref,
    className: cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className),
    ...props
  }
));
SelectLabel.displayName = SelectPrimitive__namespace.Label.displayName;
var SelectItem = React11__namespace.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsxs(
  SelectPrimitive__namespace.Item,
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
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntime.jsx(SelectPrimitive__namespace.ItemIndicator, { children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Check, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsxRuntime.jsx(SelectPrimitive__namespace.ItemText, { children })
    ]
  }
));
SelectItem.displayName = SelectPrimitive__namespace.Item.displayName;
var SelectSeparator = React11__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  SelectPrimitive__namespace.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-border", className),
    ...props
  }
));
SelectSeparator.displayName = SelectPrimitive__namespace.Separator.displayName;
var Separator3 = React11__namespace.forwardRef(
  ({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
    SeparatorPrimitive__namespace.Root,
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
Separator3.displayName = SeparatorPrimitive__namespace.Root.displayName;
var Skeleton = React11__namespace.forwardRef(
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
    return /* @__PURE__ */ jsxRuntime.jsx(
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
}) => /* @__PURE__ */ jsxRuntime.jsx("div", { className: cn("space-y-2", className), children: Array.from({ length: lines }).map((_, i) => /* @__PURE__ */ jsxRuntime.jsx(
  Skeleton,
  {
    variant: "text",
    className: i === lines - 1 ? "w-3/4" : "w-full"
  },
  i
)) });
var SkeletonCard = ({ className }) => /* @__PURE__ */ jsxRuntime.jsxs("div", { className: cn("glass-card rounded-xl p-4 space-y-3", className), children: [
  /* @__PURE__ */ jsxRuntime.jsx(Skeleton, { className: "h-48 w-full" }),
  /* @__PURE__ */ jsxRuntime.jsx(Skeleton, { variant: "text", className: "w-3/4" }),
  /* @__PURE__ */ jsxRuntime.jsx(Skeleton, { variant: "text", className: "w-1/2" })
] });
var SkeletonAvatar = ({ size = "md", className }) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12"
  };
  return /* @__PURE__ */ jsxRuntime.jsx(Skeleton, { variant: "circular", className: cn(sizeClasses[size], className) });
};
var SkeletonTable = ({ rows = 5, columns = 4, className }) => /* @__PURE__ */ jsxRuntime.jsxs("div", { className: cn("space-y-2", className), children: [
  /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex gap-4", children: Array.from({ length: columns }).map((_, i) => /* @__PURE__ */ jsxRuntime.jsx(Skeleton, { className: "h-8 flex-1" }, `header-${i}`)) }),
  Array.from({ length: rows }).map((_, rowIndex) => /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex gap-4", children: Array.from({ length: columns }).map((_2, colIndex) => /* @__PURE__ */ jsxRuntime.jsx(
    Skeleton,
    {
      className: "h-12 flex-1"
    },
    `cell-${rowIndex}-${colIndex}`
  )) }, `row-${rowIndex}`))
] });
var spinnerVariants = classVarianceAuthority.cva("", {
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
var Spinner = React11__namespace.forwardRef(
  ({ className, size, variant, label = "Loading...", ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      ref,
      role: "status",
      "aria-label": label,
      className: cn("inline-flex items-center justify-center", className),
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          react.motion.div,
          {
            className: cn("rounded-full", spinnerVariants({ size, variant })),
            animate: { rotate: 360 },
            transition: { duration: 0.75, repeat: Infinity, ease: "linear" }
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "sr-only", children: label })
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
}) => /* @__PURE__ */ jsxRuntime.jsxs("div", { className: cn("relative", className), children: [
  children,
  loading && /* @__PURE__ */ jsxRuntime.jsx(
    react.motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      className: "absolute inset-0 flex items-center justify-center glass rounded-xl z-10",
      children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntime.jsx(Spinner, { size: "lg" }),
        label && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-sm text-muted-foreground", children: label })
      ] })
    }
  )
] });
LoadingOverlay.displayName = "LoadingOverlay";
var Switch = React11__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  SwitchPrimitives__namespace.Root,
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
    children: /* @__PURE__ */ jsxRuntime.jsx(
      SwitchPrimitives__namespace.Thumb,
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
Switch.displayName = SwitchPrimitives__namespace.Root.displayName;
var Table = React11__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ jsxRuntime.jsx(
  "table",
  {
    ref,
    className: cn("w-full caption-bottom text-sm", className),
    ...props
  }
) }));
Table.displayName = "Table";
var TableHeader = React11__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx("thead", { ref, className: cn("[&_tr]:border-b", className), ...props }));
TableHeader.displayName = "TableHeader";
var TableBody = React11__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  "tbody",
  {
    ref,
    className: cn("[&_tr:last-child]:border-0", className),
    ...props
  }
));
TableBody.displayName = "TableBody";
var TableFooter = React11__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
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
var TableRow = React11__namespace.forwardRef(({ className, hover = true, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
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
var TableHead = React11__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
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
var TableCell = React11__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  "td",
  {
    ref,
    className: cn("p-2 align-middle [&:has([role=checkbox])]:pr-0", className),
    ...props
  }
));
TableCell.displayName = "TableCell";
var TableCaption = React11__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  "caption",
  {
    ref,
    className: cn("mt-4 text-sm text-muted-foreground", className),
    ...props
  }
));
TableCaption.displayName = "TableCaption";
var Tabs = TabsPrimitive__namespace.Root;
var TabsList = React11__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  TabsPrimitive__namespace.List,
  {
    ref,
    className: cn(
      "glass-card inline-flex h-10 items-center justify-center rounded-xl p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = TabsPrimitive__namespace.List.displayName;
var TabsTrigger = React11__namespace.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  TabsPrimitive__namespace.Trigger,
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
    children: /* @__PURE__ */ jsxRuntime.jsx(
      react.motion.span,
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
TabsTrigger.displayName = TabsPrimitive__namespace.Trigger.displayName;
var TabsContent = React11__namespace.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  TabsPrimitive__namespace.Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsxRuntime.jsx(
      react.motion.div,
      {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.2 },
        children
      }
    )
  }
));
TabsContent.displayName = TabsPrimitive__namespace.Content.displayName;
var ToastProvider = ToastPrimitives__namespace.Provider;
var ToastViewport = React11__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  ToastPrimitives__namespace.Viewport,
  {
    ref,
    className: cn(
      "fixed top-0 z-100 flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    ),
    ...props
  }
));
ToastViewport.displayName = ToastPrimitives__namespace.Viewport.displayName;
var toastVariants = classVarianceAuthority.cva(
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
var Toast = React11__namespace.forwardRef(({ className, variant, ...props }, ref) => {
  return /* @__PURE__ */ jsxRuntime.jsx(
    ToastPrimitives__namespace.Root,
    {
      ref,
      className: cn(toastVariants({ variant }), className),
      ...props
    }
  );
});
Toast.displayName = ToastPrimitives__namespace.Root.displayName;
var ToastAction = React11__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  ToastPrimitives__namespace.Action,
  {
    ref,
    className: cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    ),
    ...props
  }
));
ToastAction.displayName = ToastPrimitives__namespace.Action.displayName;
var ToastClose = React11__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  ToastPrimitives__namespace.Close,
  {
    ref,
    className: cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    ),
    "toast-close": "",
    ...props,
    children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { className: "h-4 w-4" })
  }
));
ToastClose.displayName = ToastPrimitives__namespace.Close.displayName;
var ToastTitle = React11__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  ToastPrimitives__namespace.Title,
  {
    ref,
    className: cn("text-sm font-semibold", className),
    ...props
  }
));
ToastTitle.displayName = ToastPrimitives__namespace.Title.displayName;
var ToastDescription = React11__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  ToastPrimitives__namespace.Description,
  {
    ref,
    className: cn("text-sm opacity-90", className),
    ...props
  }
));
ToastDescription.displayName = ToastPrimitives__namespace.Description.displayName;
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
  const [state, setState] = React11__namespace.useState(memoryState);
  React11__namespace.useEffect(() => {
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
  return /* @__PURE__ */ jsxRuntime.jsxs(ToastProvider, { children: [
    toasts.map(function({ id, title, description, action, ...props }) {
      return /* @__PURE__ */ jsxRuntime.jsxs(Toast, { ...props, children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-1", children: [
          title && /* @__PURE__ */ jsxRuntime.jsx(ToastTitle, { children: title }),
          description && /* @__PURE__ */ jsxRuntime.jsx(ToastDescription, { children: description })
        ] }),
        action,
        /* @__PURE__ */ jsxRuntime.jsx(ToastClose, {})
      ] }, id);
    }),
    /* @__PURE__ */ jsxRuntime.jsx(ToastViewport, {})
  ] });
}
var TooltipProvider = TooltipPrimitive__namespace.Provider;
var Tooltip = TooltipPrimitive__namespace.Root;
var TooltipTrigger = TooltipPrimitive__namespace.Trigger;
var TooltipContent = React11__namespace.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  TooltipPrimitive__namespace.Content,
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
TooltipContent.displayName = TooltipPrimitive__namespace.Content.displayName;
var headingVariants = classVarianceAuthority.cva("font-semibold tracking-tight text-foreground", {
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
var Heading = React11__namespace.forwardRef(
  ({ className, as: Tag = "h2", size, weight, align, gradient, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
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
var textVariants = classVarianceAuthority.cva("text-foreground", {
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
var Text = React11__namespace.forwardRef(
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
  }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
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
var Code = React11__namespace.forwardRef(
  ({ className, block = false, children, ...props }, ref) => {
    if (block) {
      return /* @__PURE__ */ jsxRuntime.jsx(
        "pre",
        {
          className: cn(
            "glass-card rounded-xl p-4 overflow-x-auto text-sm font-mono",
            "border border-border text-foreground",
            className
          ),
          ...props,
          children: /* @__PURE__ */ jsxRuntime.jsx("code", { children })
        }
      );
    }
    return /* @__PURE__ */ jsxRuntime.jsx(
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
var Lead = React11__namespace.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
    "p",
    {
      ref,
      className: cn("text-xl text-muted-foreground leading-relaxed", className),
      ...props
    }
  )
);
Lead.displayName = "Lead";
var Blockquote = React11__namespace.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
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

exports.Accordion = Accordion;
exports.AccordionContent = AccordionContent;
exports.AccordionItem = AccordionItem;
exports.AccordionTrigger = AccordionTrigger;
exports.Alert = Alert;
exports.AlertDescription = AlertDescription;
exports.AlertTitle = AlertTitle;
exports.Avatar = Avatar;
exports.AvatarFallback = AvatarFallback;
exports.AvatarGroup = AvatarGroup;
exports.AvatarImage = AvatarImage;
exports.Badge = Badge;
exports.Blockquote = Blockquote;
exports.Breadcrumbs = Breadcrumbs;
exports.Button = Button;
exports.Card = Card;
exports.CardContent = CardContent;
exports.CardDescription = CardDescription;
exports.CardFooter = CardFooter;
exports.CardHeader = CardHeader;
exports.CardTitle = CardTitle;
exports.Checkbox = Checkbox;
exports.Code = Code;
exports.Container = Container;
exports.Dialog = Dialog;
exports.DialogClose = DialogClose;
exports.DialogContent = DialogContent;
exports.DialogDescription = DialogDescription;
exports.DialogFooter = DialogFooter;
exports.DialogHeader = DialogHeader;
exports.DialogOverlay = DialogOverlay;
exports.DialogPortal = DialogPortal;
exports.DialogTitle = DialogTitle;
exports.DialogTrigger = DialogTrigger;
exports.Divider = Divider;
exports.DropdownMenu = DropdownMenu;
exports.DropdownMenuCheckboxItem = DropdownMenuCheckboxItem;
exports.DropdownMenuContent = DropdownMenuContent;
exports.DropdownMenuGroup = DropdownMenuGroup;
exports.DropdownMenuItem = DropdownMenuItem;
exports.DropdownMenuLabel = DropdownMenuLabel;
exports.DropdownMenuPortal = DropdownMenuPortal;
exports.DropdownMenuRadioGroup = DropdownMenuRadioGroup;
exports.DropdownMenuRadioItem = DropdownMenuRadioItem;
exports.DropdownMenuSeparator = DropdownMenuSeparator;
exports.DropdownMenuShortcut = DropdownMenuShortcut;
exports.DropdownMenuSub = DropdownMenuSub;
exports.DropdownMenuSubContent = DropdownMenuSubContent;
exports.DropdownMenuSubTrigger = DropdownMenuSubTrigger;
exports.DropdownMenuTrigger = DropdownMenuTrigger;
exports.EmptyState = EmptyState;
exports.FormField = FormField;
exports.Grid = Grid;
exports.Heading = Heading;
exports.IconButton = IconButton;
exports.Input = Input;
exports.Kbd = Kbd;
exports.Label = Label2;
exports.Lead = Lead;
exports.LoadingOverlay = LoadingOverlay;
exports.NumberInput = NumberInput;
exports.Pagination = Pagination;
exports.Popover = Popover;
exports.PopoverContent = PopoverContent;
exports.PopoverTrigger = PopoverTrigger;
exports.Progress = Progress;
exports.RadioGroup = RadioGroup2;
exports.RadioGroupItem = RadioGroupItem;
exports.Select = Select;
exports.SelectContent = SelectContent;
exports.SelectGroup = SelectGroup;
exports.SelectItem = SelectItem;
exports.SelectLabel = SelectLabel;
exports.SelectScrollDownButton = SelectScrollDownButton;
exports.SelectScrollUpButton = SelectScrollUpButton;
exports.SelectSeparator = SelectSeparator;
exports.SelectTrigger = SelectTrigger;
exports.SelectValue = SelectValue;
exports.Separator = Separator3;
exports.Shortcut = Shortcut;
exports.Skeleton = Skeleton;
exports.SkeletonAvatar = SkeletonAvatar;
exports.SkeletonCard = SkeletonCard;
exports.SkeletonTable = SkeletonTable;
exports.SkeletonText = SkeletonText;
exports.Spinner = Spinner;
exports.Stack = Stack;
exports.StatCard = StatCard;
exports.StatusBadge = StatusBadge;
exports.Switch = Switch;
exports.Table = Table;
exports.TableBody = TableBody;
exports.TableCaption = TableCaption;
exports.TableCell = TableCell;
exports.TableFooter = TableFooter;
exports.TableHead = TableHead;
exports.TableHeader = TableHeader;
exports.TableRow = TableRow;
exports.Tabs = Tabs;
exports.TabsContent = TabsContent;
exports.TabsList = TabsList;
exports.TabsTrigger = TabsTrigger;
exports.Text = Text;
exports.Textarea = Textarea;
exports.Toast = Toast;
exports.ToastAction = ToastAction;
exports.ToastClose = ToastClose;
exports.ToastDescription = ToastDescription;
exports.ToastProvider = ToastProvider;
exports.ToastTitle = ToastTitle;
exports.ToastViewport = ToastViewport;
exports.Toaster = Toaster;
exports.Tooltip = Tooltip;
exports.TooltipContent = TooltipContent;
exports.TooltipProvider = TooltipProvider;
exports.TooltipTrigger = TooltipTrigger;
exports.badgeVariants = badgeVariants;
exports.buttonVariants = buttonVariants;
exports.cn = cn;
exports.debounce = debounce;
exports.formatCurrency = formatCurrency;
exports.formatDate = formatDate;
exports.formatRelativeTime = formatRelativeTime;
exports.generateId = generateId;
exports.getInitials = getInitials;
exports.headingVariants = headingVariants;
exports.inputVariants = inputVariants;
exports.reducer = reducer;
exports.sleep = sleep;
exports.spinnerVariants = spinnerVariants;
exports.textVariants = textVariants;
exports.toast = toast;
exports.truncate = truncate;
exports.useToast = useToast;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map