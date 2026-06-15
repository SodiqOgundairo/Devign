import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { CalendarDays } from "lucide-react";
import { cn } from "../lib/utils";
import { Calendar, type CalendarProps } from "./calendar";

/**
 * DatePicker — Input + Popover Calendar for date selection.
 *
 * Usage:
 *   <DatePicker value={date} onChange={setDate} />
 *   <DatePicker value={date} onChange={setDate} placeholder="Pick a date" />
 *   <DatePicker format="dd/mm/yyyy" minDate={new Date()} />
 */

export interface DatePickerProps extends Omit<CalendarProps, "className"> {
  /** Placeholder text. Default: "Select date". */
  placeholder?: string;
  /** Display format. Default: "yyyy-mm-dd". */
  format?: "yyyy-mm-dd" | "mm/dd/yyyy" | "dd/mm/yyyy";
  /** Disabled state. */
  disabled?: boolean;
  /** Input size. */
  inputSize?: "sm" | "default" | "lg";
  /** Additional class names for the trigger. */
  className?: string;
}

function formatDate(date: Date | null | undefined, fmt: string): string {
  if (!date) return "";
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  switch (fmt) {
    case "mm/dd/yyyy": return `${m}/${d}/${y}`;
    case "dd/mm/yyyy": return `${d}/${m}/${y}`;
    default: return `${y}-${m}-${d}`;
  }
}

const sizeClasses = {
  sm: "h-8 px-2 text-xs rounded-lg",
  default: "h-10 px-3 text-sm",
  lg: "h-12 px-4 text-base",
};

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder = "Select date",
  format = "yyyy-mm-dd",
  disabled = false,
  inputSize = "default",
  className,
  ...calendarProps
}) => {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (date: Date) => {
    onChange?.(date);
    setOpen(false);
  };

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild disabled={disabled}>
        <button
          type="button"
          className={cn(
            "flex w-full items-center justify-between gap-2 rounded-xl",
            "border border-border bg-background text-foreground",
            "transition-all duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
            "disabled:cursor-not-allowed disabled:opacity-50",
            sizeClasses[inputSize],
            !value && "text-muted-foreground",
            className,
          )}
        >
          <span className="truncate">
            {value ? formatDate(value, format) : placeholder}
          </span>
          <CalendarDays className="h-4 w-4 shrink-0 text-muted-foreground" />
        </button>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          sideOffset={4}
          align="start"
          className={cn(
            "z-popover rounded-xl bg-popover text-popover-foreground border border-border shadow-lg outline-none",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "data-[side=bottom]:slide-in-from-top-2",
            "data-[side=top]:slide-in-from-bottom-2",
          )}
        >
          <Calendar
            value={value}
            onChange={handleSelect}
            animated={false}
            className="border-0 shadow-none"
            {...calendarProps}
          />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
};
DatePicker.displayName = "DatePicker";

export { DatePicker };
