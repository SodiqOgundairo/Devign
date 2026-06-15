import * as React from "react";
import { cn } from "../lib/utils";
import { type CalendarProps } from "./calendar";
import { DatePicker, type DatePickerProps } from "./date-picker";
import { TimePicker } from "./time-picker";

/**
 * DateTimePicker — combined date + time selection into a single `Date`.
 *
 * Composes DatePicker and TimePicker; the date part and time part stay in
 * sync on one `Date` value.
 *
 * Usage:
 *   <DateTimePicker value={dt} onChange={setDt} />
 *   <DateTimePicker value={dt} onChange={setDt} use24Hour step={15} />
 *   <DateTimePicker dateFormat="dd/mm/yyyy" layout="stack" />
 */

export interface DateTimePickerProps
  extends Omit<CalendarProps, "value" | "onChange" | "className"> {
  value?: Date | null;
  onChange?: (date: Date) => void;
  /** Date display format. Default: "yyyy-mm-dd". */
  dateFormat?: DatePickerProps["format"];
  /** 24-hour time display. Default: false (12-hour AM/PM). */
  use24Hour?: boolean;
  /** Minute step for the time picker. Default: 5. */
  step?: number;
  datePlaceholder?: string;
  timePlaceholder?: string;
  disabled?: boolean;
  inputSize?: "sm" | "default" | "lg";
  className?: string;
  /** Layout of the two fields. Default: "row". */
  layout?: "row" | "stack";
}

const pad = (n: number) => String(n).padStart(2, "0");

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  value,
  onChange,
  dateFormat = "yyyy-mm-dd",
  use24Hour = false,
  step = 5,
  datePlaceholder = "Select date",
  timePlaceholder = "Select time",
  disabled = false,
  inputSize = "default",
  className,
  layout = "row",
  ...calendarProps
}) => {
  const timeString = value ? `${pad(value.getHours())}:${pad(value.getMinutes())}` : undefined;

  const handleDate = (date: Date) => {
    const next = new Date(date);
    if (value) next.setHours(value.getHours(), value.getMinutes(), 0, 0);
    else next.setHours(0, 0, 0, 0);
    onChange?.(next);
  };

  const handleTime = (time: string) => {
    const [h, m] = time.split(":").map(Number);
    const base = value ? new Date(value) : new Date();
    base.setHours(h, m, 0, 0);
    onChange?.(base);
  };

  return (
    <div
      className={cn(
        "flex gap-2",
        layout === "stack" && "flex-col",
        className,
      )}
    >
      <DatePicker
        value={value ?? undefined}
        onChange={handleDate}
        format={dateFormat}
        disabled={disabled}
        inputSize={inputSize}
        placeholder={datePlaceholder}
        className="flex-1"
        {...calendarProps}
      />
      <TimePicker
        value={timeString}
        onChange={handleTime}
        use24Hour={use24Hour}
        step={step}
        disabled={disabled}
        inputSize={inputSize}
        placeholder={timePlaceholder}
        className={layout === "row" ? "w-40" : undefined}
      />
    </div>
  );
};
DateTimePicker.displayName = "DateTimePicker";

export { DateTimePicker };
