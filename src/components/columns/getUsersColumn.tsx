import { useNavigate, useSearch } from "@tanstack/react-router";
import EditIcon from "../Icons/EditIcon";
import OptionsIcon from "../Icons/OptionsIcon";
import ViewIcon from "../Icons/ViewIcon";
import { Button } from "../ui/button";
import { ColumnDef } from "@tanstack/react-table";

export interface User {
  id: string;
  fullName: string;
  image?: string;
  name?: string;
  gender: "MALE" | "FEMALE";
  email: string;
  department: string;
  phone: string;
  dob: string;
  address: string;
  charges: string;
  status: "completed" | "ongoing" | "todo";
}

function createUserColumns(): ColumnDef<User>[] {
  const navigate = useNavigate();
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "fullName",
      header: "Full Name",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          {row.original?.image ? (
            <img
              src={row.original.image}
              alt={row.original.name ?? row.original.fullName}
              className="w-8 h-8 rounded object-cover mr-3"
            />
          ) : (
            <div className="w-8 h-8 bg-gray-700 rounded mr-3 flex items-center justify-center">
              <span className="text-xs font-medium">
                {row.original.fullName.charAt(0)}
              </span>
            </div>
          )}
          <div>
            <div className="flex items-center">
              <span className="font-medium">{row.original.fullName}</span>
            </div>
            <div className="text-xs text-zinc-400">
              {row.original.email ?? "-"}
            </div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "gender",
      header: "",
      size: 3,
      cell: ({ row }) => {
        const gender = row.getValue("gender");
        if (!gender) {
          return <span className="text-zinc-300">-</span>;
        }
        return (
          <span
            className={gender === "MALE" ? "text-blue-400" : "text-pink-400"}
          >
            {gender === "MALE" ? "♂" : "♀"}
          </span>
        );
      },
    },
    {
      accessorKey: "department",
      header: "Department",
      cell: ({ row }) => (
        <span className="text-zinc-300">
          {row.getValue("department") ?? "-"}
        </span>
      ),
    },
    {
      accessorKey: "phone",
      header: "Phone Number",
      cell: ({ row }) => (
        <span className="text-zinc-300">{row.getValue("phone") ?? "-"}</span>
      ),
    },
    {
      accessorKey: "dob",
      header: "DOB",
      cell: ({ row }) => (
        <span className="text-zinc-300">{row.getValue("dob") ?? "-"}</span>
      ),
    },
    {
      accessorKey: "address",
      header: "Address",
      enableSorting: false,
      cell: ({ row }) => (
        <span className="text-zinc-300">{row.getValue("address") ?? "-"}</span>
      ),
    },
    {
      accessorKey: "charges",
      header: "Charges",
      cell: ({ row }) => (
        <span className="text-zinc-300">{row.getValue("charges") ?? "-"}</span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      enableSorting: false,
      cell: ({ row }) => {
        let status = row.getValue("status") as User["status"] | undefined;
        if (!status) {
          return <span className="text-zinc-300">-</span>;
        }
        // Normalize to lowercase to handle case variations from backend (e.g., "TODO" -> "todo")
        const normalizedStatus = status.toLowerCase() as User["status"];
        const statusStyles: Record<User["status"], string> = {
          todo: "bg-red-500/20 text-red-400",
          ongoing: "bg-yellow-500/20 text-yellow-400",
          completed: "bg-green-500/20 text-green-400",
        };
        const statusLabels: Record<User["status"], string> = {
          todo: "TODO",
          ongoing: "Ongoing",
          completed: "Completed",
        };
        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              statusStyles[normalizedStatus] || "bg-gray-500/20 text-gray-400"
            }`}
          >
            {statusLabels[normalizedStatus] || "Unknown"}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button className="p-1.5 rounded transition-colors cursor-pointer">
            <EditIcon />
          </Button>
          <Button
            className="p-1.5 rounded transition-colors cursor-pointer"
            onClick={() => {
              navigate({ to: `/team/${row.original.id}` });
            }}
          >
            <ViewIcon />
          </Button>
          <Button className="p-1.5 rounded transition-colors cursor-pointer">
            <OptionsIcon />
          </Button>
        </div>
      ),
    },
  ];
  return columns;
}

export default createUserColumns;