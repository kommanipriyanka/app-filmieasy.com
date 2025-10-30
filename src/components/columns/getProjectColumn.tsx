import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Project } from "@/lib/interfaces/Project";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import EditIcon from "../Icons/EditIcon";
import OptionsIcon from "../Icons/OptionsIcon";
import ViewIcon from "../Icons/ViewIcon";

export default function createProjectColumns(): ColumnDef<Project>[] {
  return [
    {
      accessorKey: "image",
      header: "Project Name",
      cell: ({ row }) => {
        const project = row.original;
        return (
          <div className="flex items-center">
            {project.image ? (
              <img
                src={project.image}
                alt={project.name}
                className="w-8 h-8 rounded object-cover mr-3"
              />
            ) : (
              <div className="w-8 h-8 bg-gray-700 rounded mr-3 flex items-center justify-center">
                <span className="text-xs font-medium">{project.name.charAt(0)}</span>
              </div>
            )}
            <span className="font-medium">{project.name}</span>
          </div>
        );
      },
    },

    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => {
        const text = row.original.description || "";
        if (!text) {
          return <span className="text-sm text-zinc-400">-</span>;
        }
        const trimmed = text.length > 30 ? text.slice(0, 30) + "..." : text;

        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-sm cursor-help text-zinc-300 hover:underline">
                  {trimmed}
                </span>
              </TooltipTrigger>
              {text.length > 30 && (
                <TooltipContent className="max-w-xs">
                  <p>{text}</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        );
      },
    },

    {
      accessorKey: "timeline",
      header: "Timeline",
      cell: ({ row }) => {
        const timeline = row.original.timeline;
        if (!timeline || timeline === "Start - End Date") {
          return <span className="text-sm text-zinc-400">-</span>;
        }
        return <span className="text-sm">{timeline}</span>;
      },
    },
    {
      accessorKey: "budget",
      header: "Budget",
      cell: ({ row }) => {
        const budget = row.original.budget;
        return <span className="text-sm">{budget || "-"}</span>;
      },
    },
    {
      accessorKey: "members",
      header: "Members",
      cell: ({ row }) => {
        const members = row.original.members;
        return <span className="text-sm">{members || "-"}</span>;
      },
    },
    {
      accessorKey: "scenes",
      header: "Scene",
      cell: ({ row }) => {
        const scenes = row.original.scenes;
        return <span className="text-sm">{scenes || "-"}</span>;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        if (!status) {
          return <span className="text-sm text-zinc-400">-</span>;
        }
        return (
          <Badge variant={status === "ongoing" ? "default" : "secondary"} className="text-xs">
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
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
            <EditIcon />
          </Button>
          <Button className="p-1.5 hover:bg-zinc-800 rounded transition-colors">
           <ViewIcon  />
          </Button>
          <Button className="p-1.5 hover:bg-zinc-800 rounded transition-colors">
            <OptionsIcon />
          </Button>
        </div>
      ),
    },
  ];
}