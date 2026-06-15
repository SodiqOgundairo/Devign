import * as React from "react";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import { cn } from "../lib/utils";

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement> & {
    /** className for the scroll container (e.g. `max-h-64` to enable a sticky header). */
    containerClassName?: string;
  }
>(({ className, containerClassName, ...props }, ref) => (
  <div className={cn("relative w-full overflow-auto", containerClassName)}>
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...(props as any)}
    />
  </div>
));
Table.displayName = "Table";

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement> & { sticky?: boolean }
>(({ className, sticky = false, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn(
      "[&_tr]:border-b",
      sticky && "sticky top-0 z-10 bg-background",
      className,
    )}
    {...(props as any)}
  />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...(props as any)}
  />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className,
    )}
    {...(props as any)}
  />
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement> & { hover?: boolean }
>(({ className, hover = true, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b border-border transition-colors",
      hover && "hover:bg-muted/50 cursor-pointer",
      "data-[state=selected]:bg-muted",
      className,
    )}
    {...(props as any)}
  />
));
TableRow.displayName = "TableRow";

export type SortDirection = "asc" | "desc";

export interface TableHeadProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  /** Render a sort affordance and make the header interactive. */
  sortable?: boolean;
  /** Current sort direction for this column, or false when not sorted by it. */
  sortDirection?: SortDirection | false;
  /** Called when the header is activated. */
  onSort?: () => void;
}

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  (
    { className, sortable = false, sortDirection = false, onSort, children, ...props },
    ref,
  ) => {
    if (!sortable) {
      return (
        <th
          ref={ref}
          className={cn(
            "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
            className,
          )}
          {...(props as any)}
        >
          {children}
        </th>
      );
    }

    const SortIcon =
      sortDirection === "asc"
        ? ArrowUp
        : sortDirection === "desc"
          ? ArrowDown
          : ChevronsUpDown;

    return (
      <th
        ref={ref}
        aria-sort={
          sortDirection === "asc"
            ? "ascending"
            : sortDirection === "desc"
              ? "descending"
              : "none"
        }
        className={cn(
          "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
          className,
        )}
        {...(props as any)}
      >
        <button
          type="button"
          onClick={onSort}
          className={cn(
            "-ml-2 inline-flex select-none items-center gap-1 rounded px-2 py-1 text-left",
            "transition-colors hover:text-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            sortDirection && "text-foreground",
          )}
        >
          {children}
          <SortIcon
            className={cn("h-3.5 w-3.5", !sortDirection && "opacity-50")}
          />
        </button>
      </th>
    );
  },
);
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-2 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...(props as any)}
  />
));
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...(props as any)}
  />
));
TableCaption.displayName = "TableCaption";

/* ---------------------------------------------------------------------------
   useSortable — headless sort state for the Table primitives.

   const { sorted, getSortProps } = useSortable(rows)
   <TableHead {...getSortProps("name")}>Name</TableHead>
   {sorted.map(...)}
   --------------------------------------------------------------------------- */
export interface UseSortableOptions<T> {
  initialKey?: string | null;
  initialDirection?: SortDirection;
  /** Custom value getter for a column key. Default: `row[key]`. */
  accessor?: (row: T, key: string) => unknown;
}

export interface UseSortableResult<T> {
  sorted: T[];
  sortKey: string | null;
  sortDirection: SortDirection;
  toggleSort: (key: string) => void;
  /** Spread onto a TableHead to wire up sorting for `key`. */
  getSortProps: (key: string) => {
    sortable: true;
    sortDirection: SortDirection | false;
    onSort: () => void;
  };
}

function compareValues(a: unknown, b: unknown): number {
  if (a == null && b == null) return 0;
  if (a == null) return 1;
  if (b == null) return -1;
  if (typeof a === "number" && typeof b === "number") return a - b;
  if (a instanceof Date && b instanceof Date) return a.getTime() - b.getTime();
  if (typeof a === "boolean" && typeof b === "boolean")
    return a === b ? 0 : a ? -1 : 1;
  return String(a).localeCompare(String(b), undefined, { numeric: true });
}

export function useSortable<T>(
  data: T[],
  options: UseSortableOptions<T> = {},
): UseSortableResult<T> {
  const {
    initialKey = null,
    initialDirection = "asc",
    accessor = (row: T, key: string) =>
      (row as Record<string, unknown>)[key],
  } = options;

  const [state, setState] = React.useState<{
    key: string | null;
    direction: SortDirection;
  }>({ key: initialKey, direction: initialDirection });

  // Cycle on the same column: asc -> desc -> cleared.
  const toggleSort = React.useCallback((key: string) => {
    setState((prev) => {
      if (prev.key !== key) return { key, direction: "asc" };
      if (prev.direction === "asc") return { key, direction: "desc" };
      return { key: null, direction: "asc" };
    });
  }, []);

  const sorted = React.useMemo(() => {
    if (!state.key) return data;
    const key = state.key;
    const dir = state.direction === "asc" ? 1 : -1;
    return [...data].sort(
      (a, b) => dir * compareValues(accessor(a, key), accessor(b, key)),
    );
  }, [data, state.key, state.direction, accessor]);

  const getSortProps = React.useCallback(
    (key: string) => ({
      sortable: true as const,
      sortDirection: (state.key === key ? state.direction : false) as
        | SortDirection
        | false,
      onSort: () => toggleSort(key),
    }),
    [state.key, state.direction, toggleSort],
  );

  return {
    sorted,
    sortKey: state.key,
    sortDirection: state.direction,
    toggleSort,
    getSortProps,
  };
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};

