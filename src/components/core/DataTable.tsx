import { DataTableProps } from '@/lib/interfaces/core';
import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'

function DataTable({ data, columns, sorting, setSorting, isLoading }: DataTableProps) {
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
      <div className="flex items-center justify-center h-96">
        <div className="text-zinc-500">Loading...</div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <p className="text-zinc-500">No users found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto ">
      <table className="w-full text-[11px] border border-zinc-800/30 rounded-lg">
        <thead >
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-b border-zinc-800 rounded-2xl bg-(--an-table-header-bg)">
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
            <tr key={row.id} className="hover:bg-zinc-900/50 border-b border-zinc-800/30 transition-colors">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-2 py-1 text-white text-[11px] whitespace-nowrap">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;