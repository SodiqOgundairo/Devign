import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";
import { Button } from "./button";

/**
 * Pagination component with glassmorphism
 * For navigating through pages of data
 */

export interface PaginationProps extends React.ComponentProps<"nav"> {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
}

const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  (
    {
      className,
      currentPage,
      totalPages,
      onPageChange,
      siblingCount = 1,
      ...props
    },
    ref,
  ) => {
    const range = (start: number, end: number) => {
      const length = end - start + 1;
      return Array.from({ length }, (_, idx) => start + idx);
    };

    const paginationRange = React.useMemo(() => {
      const totalPageNumbers = siblingCount + 5;

      if (totalPageNumbers >= totalPages) {
        return range(1, totalPages);
      }

      const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
      const rightSiblingIndex = Math.min(
        currentPage + siblingCount,
        totalPages,
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

    return (
      <nav
        ref={ref}
        role="navigation"
        aria-label="pagination"
        className={cn("mx-auto flex w-full justify-center", className)}
        {...props}
      >
        <ul className="flex flex-row items-center gap-1">
          <li>
            <Button
              variant="ghost-primary"
              size="icon"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Go to previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </li>

          {paginationRange.map((pageNumber, index) => {
            if (pageNumber === "dots") {
              return (
                <li key={`dots-${index}`}>
                  <span className="flex h-9 w-9 items-center justify-center">
                    <MoreHorizontal className="h-4 w-4" />
                  </span>
                </li>
              );
            }

            const isActive = pageNumber === currentPage;

            return (
              <li key={pageNumber}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onPageChange(pageNumber as number)}
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-all",
                    isActive
                      ? "glass-card border border-primary bg-primary/10 text-primary shadow-primary-glow"
                      : "glass hover:bg-muted text-foreground",
                  )}
                  aria-label={`Go to page ${pageNumber}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {pageNumber}
                </motion.button>
              </li>
            );
          })}

          <li>
            <Button
              variant="ghost-primary"
              size="icon"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Go to next page"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </li>
        </ul>
      </nav>
    );
  },
);
Pagination.displayName = "Pagination";

export { Pagination };
