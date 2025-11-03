import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import React from "react";
import { PaginationProps } from "@/lib/interfaces/core";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";



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
      <Select
  value={pageSize.toString()}
  onValueChange={(value) => {
    const newPageSize = Number(value);
    setPageSize(newPageSize);
    setPage(1);
  }}
>
  <SelectTrigger className="ml-2 w-20 h-8 border border-gray-300 rounded cursor-pointer text-sm flex items-center justify-between px-3 bg-zinc-900 text-white">
    <SelectValue />
   
  </SelectTrigger>

  <SelectContent className="z-50 w-20 bg-zinc-900 border border-zinc-700 text-white">
    {[20, 50, 100, 150, 200].map((size) => (
      <SelectItem
        key={size}
        value={size.toString()}
        className="text-sm hover:bg-zinc-800 cursor-pointer focus:bg-zinc-800 focus:text-white"
      >
        {size}
      </SelectItem>
    ))}
  </SelectContent>
</Select>


        <span className="text-sm text-zinc-400">Total: {total_records}</span>
      </div>

      <div className="flex items-center gap-2">
        <Button
          onClick={() => setPage(current_page - 1)}
          disabled={current_page <= 1}
          className="p-1.5 hover:bg-zinc-800 rounded disabled:opacity-30 disabled:cursor-not-allowed "
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        {getPageNumbers().map((page, index) => (
          <React.Fragment key={index}>
            {typeof page === "number" ? (
              <button
                onClick={() => setPage(page)}
                className={`px-3 py-1.5 rounded text-sm  ${
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
          className="p-1.5 hover:bg-zinc-800 rounded disabled:opacity-30 disabled:cursor-not-allowed "
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

export default Pagination;