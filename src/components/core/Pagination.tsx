import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import React from "react";
import { PaginationProps } from "@/lib/interfaces/core";
import { Select } from "../ui/select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";

function Pagination({
  paginationInfo,
  pageSize,
  setPage,
  setPageSize,
}: PaginationProps) {
  const { current_page, total_pages, total_records } = paginationInfo;

  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (total_pages <= maxPagesToShow) {
      for (let i = 1; i <= total_pages; i++) {
        pages.push(i);
      }
    } else {
      const halfWindow = Math.floor(maxPagesToShow / 2);
      let startPage = Math.max(1, current_page - halfWindow);
      let endPage = Math.min(total_pages, startPage + maxPagesToShow - 1);

      if (endPage - startPage < maxPagesToShow - 1) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
      }

      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) pages.push("...");
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < total_pages) {
        if (endPage < total_pages - 1) pages.push("...");
        pages.push(total_pages);
      }
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Select
            value={pageSize.toString()}
            onValueChange={(value) => {
              const newPageSize = Number(value);
              setPageSize(newPageSize);
              setPage(1);
            }}
          >
            <SelectTrigger className="ml-2 h-8 border border-gray-300 rounded cursor-pointer text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[20, 50, 100, 150, 200].map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-zinc-400 pointer-events-none" />
        </div>
        <span className="text-sm text-zinc-400">Total: {total_records}</span>
      </div>

      <div className="flex items-center gap-2">
        <Button
          onClick={() => setPage(current_page - 1)}
          disabled={current_page <= 1}
          className="p-1.5 hover:bg-zinc-800 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        {getPageNumbers().map((page, index) => (
          <React.Fragment key={index}>
            {typeof page === "number" ? (
              <button
                onClick={() => setPage(page)}
                className={`px-3 py-1.5 rounded text-sm transition-colors ${
                  current_page === page
                    ? "bg-blue-600 text-white font-semibold"
                    : "hover:bg-zinc-800 text-zinc-400"
                }`}
              >
                {page}
              </button>
            ) : (
              <span className="px-2 text-zinc-600">{page}</span>
            )}
          </React.Fragment>
        ))}

        <Button
          onClick={() => setPage(current_page + 1)}
          disabled={current_page >= total_pages}
          className="p-1.5 hover:bg-zinc-800 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

export default Pagination