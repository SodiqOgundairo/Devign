import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "../lib/utils";

/**
 * Accordion with animated + / × icon.
 *
 * The + icon rotates 45° to become × when open — pure CSS transition,
 * driven by Radix's `data-state` attribute. No JS animation needed.
 *
 * Usage:
 *   <Accordion type="single" collapsible>
 *     <AccordionItem value="item-1">
 *       <AccordionTrigger>Question</AccordionTrigger>
 *       <AccordionContent>Answer</AccordionContent>
 *     </AccordionItem>
 *   </Accordion>
 */

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("rounded-xl bg-card border border-border", className)}
    {...(props as any)}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between p-4 font-medium transition-all",
        "hover:bg-muted/50 rounded-xl",
        // Rotate the + into × when open
        "[&[data-state=open]>svg]:rotate-45",
        className,
      )}
      {...(props as any)}
    >
      {children}
      {/* Plus icon — becomes × via 45° CSS rotation */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="shrink-0 transition-transform duration-300 ease-in-out"
      >
        <line x1="4" y1="8" x2="12" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="8" y1="4" x2="8" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...(props as any)}
  >
    <div className={cn("pb-4 pt-0 px-4", className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
