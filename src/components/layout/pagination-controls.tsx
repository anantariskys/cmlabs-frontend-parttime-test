import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

type PaginationControlsProps = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  itemLabel: string;
};

export function PaginationControls({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  itemLabel,
}: PaginationControlsProps) {
  if (totalItems <= pageSize) {
    return null;
  }

  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border/80 bg-card px-4 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="text-sm text-muted-foreground">
        Showing {start}-{end} of {totalItems} {itemLabel}
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <ChevronLeft className="size-4" />
          Prev
        </Button>
        <div className="rounded-xl border border-border/70 bg-background px-3 py-2 text-sm font-medium">
          Page {currentPage} / {totalPages}
        </div>
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
