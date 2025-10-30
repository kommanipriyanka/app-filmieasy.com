import { Edit, Eye, MoreVertical } from "lucide-react";
import { Button } from "../ui/button";
import { ColumnDef } from "@tanstack/react-table";

export interface User {
  fullName: string;
  gender: "male" | "female";
  email: string;
  department: string;
  phone: string;
  dob: string;
  address: string;
  charges: string;
  status: "available" | "unavailable";
}

function createUserColumns(): ColumnDef<User>[] {
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: 'fullName',
      header: 'Full Name',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
            {row.original.fullName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium">{row.original.fullName}</span>
              {row.original.gender === 'male' ? (
                <span className="text-blue-400">♂</span>
              ) : (
                <span className="text-pink-400">♀</span>
              )}
            </div>
            <div className="text-xs text-zinc-500">{row.original.email}</div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'department',
      header: 'Department',
      cell: ({ row }) => <span className="text-zinc-300">{row.getValue('department')}</span>,
    },
    {
      accessorKey: 'phone',
      header: 'Phone Number',
      cell: ({ row }) => <span className="text-zinc-300">{row.getValue('phone')}</span>,
    },
    {
      accessorKey: 'dob',
      header: 'DOB',
      cell: ({ row }) => <span className="text-zinc-300">{row.getValue('dob')}</span>,
    },
    {
      accessorKey: 'address',
      header: 'Address',
      enableSorting: false,
      cell: ({ row }) => <span className="text-zinc-300">{row.getValue('address')}</span>,
    },
    {
      accessorKey: 'charges',
      header: 'Charges',
      cell: ({ row }) => <span className="text-zinc-300">{row.getValue('charges')}</span>,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      enableSorting: false,
      cell: ({ row }) => {
        const status = row.getValue('status');
        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              status === 'available'
                ? 'bg-green-500/20 text-green-400'
                : 'bg-red-500/20 text-red-400'
            }`}
          >
            {status === 'available' ? 'Available' : 'Unavailable'}
          </span>
        );
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button className="p-1.5 hover:bg-zinc-800 rounded transition-colors">
            <Edit className="w-4 h-4 text-zinc-400" />
          </Button>
          <Button className="p-1.5 hover:bg-zinc-800 rounded transition-colors">
            <Eye className="w-4 h-4 text-zinc-400" />
          </Button>
          <Button className="p-1.5 hover:bg-zinc-800 rounded transition-colors">
            <MoreVertical className="w-4 h-4 text-zinc-400" />
          </Button>
        </div>
      ),
    },
  ];

  return columns;
}

export default createUserColumns