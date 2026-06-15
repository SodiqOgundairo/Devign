import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Clock } from "lucide-react";
import { cn } from "../lib/utils";

/**
 * TimePicker — time selection with hour/minute dropdowns.
 *
 * Usage:
 *   <TimePicker value="14:30" onChange={setTime} />
 *   <TimePicker value="09:00" onChange={setTime} use24Hour />
 *   <TimePicker step={15} />
 */

export interface TimePickerProps {
  /** Time value in "HH:mm" 24-hour format. */
  value?: string;
  /** Callback with "HH:mm" string. */
  onChange?: (time: string) => void;
  /** Use 24-hour format display. Default: false (12-hour with AM/PM). */
  use24Hour?: boolean;
  /** Minute step interval. Default: 1. */
  step?: number;
  /** Placeholder text. Default: "Select time". */
  placeholder?: string;
  /** Disabled state. */
  disabled?: boolean;
  /** Input size. */
  inputSize?: "sm" | "default" | "lg";
  /** Additional class names for the trigger. */
  className?: string;
}

function parseTime(val?: string): { hour: number; minute: number } | null {
  if (!val) return null;
  const [h, m] = val.split(":").map(Number);
  if (isNaN(h) || isNaN(m)) return null;
  return { hour: h, minute: m };
}

function formatDisplay(hour: number, minute: number, use24: boolean): string {
  const mm = String(minute).padStart(2, "0");
  if (use24) return `${String(hour).padStart(2, "0")}:${mm}`;
  const period = hour >= 12 ? "PM" : "AM";
  const h12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${h12}:${mm} ${period}`;
}

const sizeClasses = {
  sm: "h-8 px-2 text-xs rounded-lg",
  default: "h-10 px-3 text-sm",
  lg: "h-12 px-4 text-base",
};

const TimePicker: React.FC<TimePickerProps> = ({
  value,
  onChange,
  use24Hour = false,
  step = 1,
  placeholder = "Select time",
  disabled = false,
  inputSize = "default",
  className,
}) => {
  const [open, setOpen] = React.useState(false);
  const parsed = parseTime(value);

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: Math.ceil(60 / step) }, (_, i) => i * step).filter((m) => m < 60);

  const handleHour = (h: number) => {
    const m = parsed?.minute ?? 0;
    onChange?.(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
  };

  const handleMinute = (m: number) => {
    const h = parsed?.hour ?? 0;
    onChange?.(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
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
            !parsed && "text-muted-foreground",
            className,
          )}
        >
          <span className="truncate">
            {parsed ? formatDisplay(parsed.hour, parsed.minute, use24Hour) : placeholder}
          </span>
          <Clock className="h-4 w-4 shrink-0 text-muted-foreground" />
        </button>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          sideOffset={4}
          align="start"
          className={cn(
            "z-popover rounded-xl bg-popover text-popover-foreground border border-border shadow-lg outline-none p-2",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "data-[side=bottom]:slide-in-from-top-2",
            "data-[side=top]:slide-in-from-bottom-2",
          )}
        >
          <div className="flex gap-1">
            {/* Hours column */}
            <div className="flex flex-col h-48 overflow-y-auto scrollbar-none w-14">
              <div className="text-xs font-medium text-muted-foreground text-center mb-1 sticky top-0 bg-popover">
                Hr
              </div>
              {hours.map((h) => {
                const label = use24Hour
                  ? String(h).padStart(2, "0")
                  : `${h === 0 ? 12 : h > 12 ? h - 12 : h} ${h >= 12 ? "PM" : "AM"}`;
                return (
                  <button
                    key={h}
                    type="button"
                    onClick={() => handleHour(h)}
                    className={cn(
                      "text-xs py-1.5 px-2 rounded-md transition-colors text-center",
                      "hover:bg-muted",
                      parsed?.hour === h && "bg-primary text-primary-foreground hover:bg-primary/90",
                    )}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Divider */}
            <div className="w-px bg-border" />

            {/* Minutes column */}
            <div className="flex flex-col h-48 overflow-y-auto scrollbar-none w-12">
              <div className="text-xs font-medium text-muted-foreground text-center mb-1 sticky top-0 bg-popover">
                Min
              </div>
              {minutes.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => handleMinute(m)}
                  className={cn(
                    "text-xs py-1.5 px-2 rounded-md transition-colors text-center",
                    "hover:bg-muted",
                    parsed?.minute === m && "bg-primary text-primary-foreground hover:bg-primary/90",
                  )}
                >
                  {String(m).padStart(2, "0")}
                </button>
              ))}
            </div>
          </div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
};
TimePicker.displayName = "TimePicker";

export { TimePicker };
