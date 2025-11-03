import { DataTableProps } from '@/lib/interfaces/core';
import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { ScrollArea } from '../ui/scroll-area';

interface DataTableWithHeightProps extends DataTableProps {
  maxHeight?: string;
}

function DataTable({ data, columns, sorting, setSorting, isLoading, maxHeight }: DataTableWithHeightProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full p-2">
        <div className="text-zinc-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="h-full p-2 border border-zinc-800/30 rounded-lg overflow-hidden flex flex-col">
      <ScrollArea 
        className="flex-1" 
        style={{ 
          height: maxHeight || undefined, 
          maxHeight: maxHeight || undefined 
        }}
      >
        <table className="w-full text-[11px] relative">
<thead className="sticky top-0 z-10 bg-[#FFFFFF2E] backdrop-blur-2xl border-b border-zinc-800">

            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-2 py-2 text-left text-zinc-300 font-semibold uppercase tracking-wider whitespace-nowrap"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={`flex items-center gap-2 ${
                          header.column.getCanSort() ? 'cursor-pointer select-none' : ''
                        }`}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getCanSort() && (
                          <span className="text-xs">
                            {{
                              asc: '▲',
                              desc: '▼',
                            }[header.column.getIsSorted() as string] ?? null}
                          </span>
                        )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-zinc-900/50 border-b border-zinc-800/30 ">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-2 py-1 text-white text-[11px] whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollArea>
    </div>
  );
}

export default DataTable;