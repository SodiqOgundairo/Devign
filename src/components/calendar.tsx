import * as React from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../lib/utils";

/**
 * Calendar — standalone date grid for date selection.
 *
 * Usage:
 *   <Calendar value={date} onChange={setDate} />
 *   <Calendar value={date} onChange={setDate} minDate={new Date()} />
 *   <Calendar animated={false} />
 */

export interface CalendarProps {
  /** Selected date. */
  value?: Date | null;
  /** Callback when a date is selected. */
  onChange?: (date: Date) => void;
  /** Minimum selectable date. */
  minDate?: Date;
  /** Maximum selectable date. */
  maxDate?: Date;
  /** Disable specific dates. */
  disabledDates?: Date[];
  /** First day of the week. 0 = Sunday, 1 = Monday. Default: 0. */
  weekStartsOn?: 0 | 1;
  /** Enable animation. Default: true. */
  animated?: boolean;
  /** Additional class names. */
  className?: string;
}

const DAYS_SUN = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const DAYS_MON = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isDateDisabled(
  date: Date,
  minDate?: Date,
  maxDate?: Date,
  disabledDates?: Date[],
) {
  if (minDate && date < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())) return true;
  if (maxDate && date > new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate())) return true;
  if (disabledDates?.some((d) => isSameDay(d, date))) return true;
  return false;
}

const Calendar: React.FC<CalendarProps> = ({
  value,
  onChange,
  minDate,
  maxDate,
  disabledDates,
  weekStartsOn = 0,
  animated = true,
  className,
}) => {
  const today = new Date();
  const [viewYear, setViewYear] = React.useState(value?.getFullYear() ?? today.getFullYear());
  const [viewMonth, setViewMonth] = React.useState(value?.getMonth() ?? today.getMonth());

  const dayLabels = weekStartsOn === 1 ? DAYS_MON : DAYS_SUN;
  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  let firstDay = getFirstDayOfMonth(viewYear, viewMonth);
  if (weekStartsOn === 1) {
    firstDay = firstDay === 0 ? 6 : firstDay - 1;
  }

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const Wrapper = animated ? motion.div : "div";
  const wrapperProps = animated
    ? { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.2 } }
    : {};

  return (
    <Wrapper
      className={cn(
        "w-[280px] rounded-xl border border-border bg-card text-card-foreground p-3 shadow-sm select-none",
        className,
      )}
      {...(wrapperProps as any)}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={prevMonth}
          className="p-1 rounded-md hover:bg-muted transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="text-sm font-semibold">
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <button
          type="button"
          onClick={nextMonth}
          className="p-1 rounded-md hover:bg-muted transition-colors"
          aria-label="Next month"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 gap-0 mb-1">
        {dayLabels.map((d) => (
          <div key={d} className="text-center text-xs font-medium text-muted-foreground py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-0">
        {cells.map((day, idx) => {
          if (day === null) {
            return <div key={`empty-${idx}`} className="h-8" />;
          }

          const date = new Date(viewYear, viewMonth, day);
          const disabled = isDateDisabled(date, minDate, maxDate, disabledDates);
          const isToday = isSameDay(date, today);
          const isSelected = value ? isSameDay(date, value) : false;

          return (
            <button
              key={day}
              type="button"
              disabled={disabled}
              onClick={() => !disabled && onChange?.(date)}
              className={cn(
                "h-8 w-8 mx-auto rounded-md text-sm transition-colors",
                "hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isToday && !isSelected && "border border-primary text-primary",
                isSelected && "bg-primary text-primary-foreground hover:bg-primary/90",
                disabled && "opacity-30 cursor-not-allowed hover:bg-transparent",
              )}
            >
              {day}
            </button>
          );
        })}
      </div>
    </Wrapper>
  );
};
Calendar.displayName = "Calendar";

export { Calendar };
