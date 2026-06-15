import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Check, ChevronDown, Loader2, Search, X } from "lucide-react";
import { cn } from "../lib/utils";

/**
 * Combobox — searchable / type-ahead select.
 *
 * Supports single and multi-select, internal filtering or async `onSearch`
 * (parent-controlled options), grouped options, and a custom trigger.
 *
 * Built on Radix Popover so content portals to the body and never clips.
 */

export interface ComboboxOption {
  value: string;
  label: string;
  /** Optional group heading. Options sharing a group render together. */
  group?: string;
  disabled?: boolean;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  /** Controlled value. `string` for single, `string[]` for multiple. */
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  /** Allow selecting multiple options. Default: false. */
  multiple?: boolean;
  /** Show the search input. Default: true. */
  searchable?: boolean;
  /**
   * Async / controlled search. When provided, internal filtering is disabled
   * and the parent is responsible for updating `options` for the query.
   */
  onSearch?: (query: string) => void;
  /** Show a loading state in the search row and empty list. */
  loading?: boolean;
  disabled?: boolean;
  /** Trigger placeholder when nothing is selected. */
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  /** Max chips shown before "+N" (multiple only). Default: 3. */
  maxDisplay?: number;
  /** className for the trigger. */
  className?: string;
  /** className for the popover content. */
  contentClassName?: string;
  align?: "start" | "center" | "end";
  /** Custom trigger renderer. Receives the selected option(s) and open state. */
  renderTrigger?: (args: {
    selected: ComboboxOption[];
    open: boolean;
  }) => React.ReactNode;
}

function toArray(v: string | string[] | undefined): string[] {
  if (v == null) return [];
  return Array.isArray(v) ? v : [v];
}

const Combobox = React.forwardRef<HTMLButtonElement, ComboboxProps>(
  (
    {
      options,
      value,
      defaultValue,
      onValueChange,
      multiple = false,
      searchable = true,
      onSearch,
      loading = false,
      disabled = false,
      placeholder = "Select...",
      searchPlaceholder = "Search...",
      emptyText = "No results found.",
      maxDisplay = 3,
      className,
      contentClassName,
      align = "start",
      renderTrigger,
    },
    ref,
  ) => {
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = React.useState<string[]>(() =>
      toArray(defaultValue),
    );
    const selectedValues = isControlled ? toArray(value) : internalValue;

    const [open, setOpen] = React.useState(false);
    const [query, setQuery] = React.useState("");
    const [highlight, setHighlight] = React.useState(0);
    const listRef = React.useRef<HTMLDivElement>(null);

    const commitValue = (next: string[]) => {
      if (!isControlled) setInternalValue(next);
      onValueChange?.(multiple ? next : (next[0] ?? ""));
    };

    const handleSelect = (option: ComboboxOption) => {
      if (option.disabled) return;
      if (multiple) {
        const next = selectedValues.includes(option.value)
          ? selectedValues.filter((v) => v !== option.value)
          : [...selectedValues, option.value];
        commitValue(next);
      } else {
        commitValue([option.value]);
        setOpen(false);
        setQuery("");
      }
    };

    // Internal filter is skipped when onSearch is provided (parent controls options).
    const filtered = React.useMemo(() => {
      if (onSearch || !searchable || query.trim() === "") return options;
      const q = query.toLowerCase();
      return options.filter((o) => o.label.toLowerCase().includes(q));
    }, [options, query, onSearch, searchable]);

    // Preserve insertion order while collecting groups.
    const grouped = React.useMemo(() => {
      const groups = new Map<string, ComboboxOption[]>();
      for (const o of filtered) {
        const key = o.group ?? "";
        const arr = groups.get(key);
        if (arr) arr.push(o);
        else groups.set(key, [o]);
      }
      return groups;
    }, [filtered]);

    // Flat list in the SAME order options are rendered, for keyboard nav.
    const flatList = React.useMemo(() => {
      const arr: ComboboxOption[] = [];
      for (const items of grouped.values()) arr.push(...items);
      return arr;
    }, [grouped]);

    React.useEffect(() => {
      setHighlight(0);
    }, [query, open]);

    // Keep the highlighted option in view during keyboard navigation.
    React.useEffect(() => {
      if (!open) return;
      const el = listRef.current?.querySelector<HTMLElement>(
        '[data-active="true"]',
      );
      el?.scrollIntoView({ block: "nearest" });
    }, [highlight, open]);

    const handleQueryChange = (v: string) => {
      setQuery(v);
      onSearch?.(v);
    };

    const moveHighlight = (delta: number) => {
      setHighlight((h) => {
        const n = flatList.length;
        if (n === 0) return 0;
        let next = h;
        for (let i = 0; i < n; i++) {
          next = (next + delta + n) % n;
          if (!flatList[next]?.disabled) break;
        }
        return next;
      });
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        moveHighlight(1);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        moveHighlight(-1);
      } else if (e.key === "Enter") {
        e.preventDefault();
        const opt = flatList[highlight];
        if (opt) handleSelect(opt);
      }
    };

    const selectedOptions = React.useMemo(
      () => options.filter((o) => selectedValues.includes(o.value)),
      [options, selectedValues],
    );

    const triggerContent = () => {
      if (renderTrigger) return renderTrigger({ selected: selectedOptions, open });
      if (selectedOptions.length === 0)
        return <span className="text-muted-foreground">{placeholder}</span>;
      if (!multiple)
        return <span className="line-clamp-1">{selectedOptions[0]?.label}</span>;
      const shown = selectedOptions.slice(0, maxDisplay);
      const extra = selectedOptions.length - shown.length;
      return (
        <span className="flex flex-wrap items-center gap-1">
          {shown.map((o) => (
            <span
              key={o.value}
              className="inline-flex items-center gap-1 rounded bg-muted px-1.5 py-0.5 text-xs"
            >
              {o.label}
              <span
                role="button"
                tabIndex={-1}
                aria-label={`Remove ${o.label}`}
                className="hover:text-destructive"
                onPointerDown={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  handleSelect(o);
                }}
              >
                <X className="h-3 w-3" />
              </span>
            </span>
          ))}
          {extra > 0 && (
            <span className="text-xs text-muted-foreground">+{extra}</span>
          )}
        </span>
      );
    };

    // Tracks the cumulative render position so it lines up with flatList/highlight.
    let renderIndex = -1;

    return (
      <PopoverPrimitive.Root
        open={open}
        onOpenChange={(o) => {
          setOpen(o);
          if (!o) setQuery("");
        }}
      >
        <PopoverPrimitive.Trigger asChild>
          <button
            ref={ref}
            type="button"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className={cn(
              "flex h-10 w-full items-center justify-between gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
              "disabled:cursor-not-allowed disabled:opacity-50",
              className,
            )}
          >
            <span className="flex min-w-0 flex-1 items-center text-left">
              {triggerContent()}
            </span>
            <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
          </button>
        </PopoverPrimitive.Trigger>
        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            align={align}
            sideOffset={4}
            onOpenAutoFocus={(e) => {
              if (searchable) e.preventDefault();
            }}
            className={cn(
              "z-popover w-[var(--radix-popover-trigger-width)] min-w-[12rem] overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-md",
              "data-[state=open]:animate-in data-[state=closed]:animate-out",
              "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
              "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
              contentClassName,
            )}
          >
            {searchable && (
              <div className="flex items-center border-b border-border px-3">
                {loading ? (
                  <Loader2 className="h-4 w-4 shrink-0 animate-spin opacity-50" />
                ) : (
                  <Search className="h-4 w-4 shrink-0 opacity-50" />
                )}
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => handleQueryChange(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={searchPlaceholder}
                  className="flex h-10 w-full bg-transparent px-2 text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>
            )}
            <div
              ref={listRef}
              role="listbox"
              className="max-h-72 overflow-y-auto p-1"
            >
              {flatList.length === 0 ? (
                <div className="py-6 text-center text-sm text-muted-foreground">
                  {loading ? "Loading..." : emptyText}
                </div>
              ) : (
                Array.from(grouped.entries()).map(([groupName, items]) => (
                  <div key={groupName || "__ungrouped"}>
                    {groupName && (
                      <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                        {groupName}
                      </div>
                    )}
                    {items.map((o) => {
                      renderIndex += 1;
                      const idx = renderIndex;
                      const isSelected = selectedValues.includes(o.value);
                      const isActive = idx === highlight;
                      return (
                        <div
                          key={o.value}
                          role="option"
                          aria-selected={isSelected}
                          data-active={isActive ? "true" : undefined}
                          onPointerEnter={() => setHighlight(idx)}
                          onPointerDown={(e) => {
                            e.preventDefault();
                            handleSelect(o);
                          }}
                          className={cn(
                            "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none",
                            isActive && "bg-accent text-accent-foreground",
                            o.disabled && "pointer-events-none opacity-50",
                          )}
                        >
                          <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                            {isSelected && <Check className="h-4 w-4" />}
                          </span>
                          {o.label}
                        </div>
                      );
                    })}
                  </div>
                ))
              )}
            </div>
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
    );
  },
);
Combobox.displayName = "Combobox";

export { Combobox };
