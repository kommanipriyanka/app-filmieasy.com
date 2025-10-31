import DataTable from "@/components/core/DataTable";
import Pagination from "@/components/core/Pagination";
import ProjectsBg from "@/assets/ProjectsBg.webp"; // Assuming a background image for projects
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { ProjectsTableProps } from "@/lib/interfaces/Project";
import createProjectColumns from "@/components/columns/getProjectColumn";
import {
  ChevronDown,
  Download,
  Plus,
  Search,
  Upload,
  Calendar as CalendarIcon,
  X,
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
function ProjectsTable({
  data,
  paginationInfo,
  page,
  pageSize,
  setPage,
  setPageSize,
  searchValue,
  setSearchValue,
  selectedDate,
  setSelectedDate,
  selectedStatus,
  setSelectedStatus,
  sorting,
  setSorting,
  isLoading,
}: ProjectsTableProps & {
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
}) {
  const columns = createProjectColumns();
  const navigate = useNavigate();
  const handleStatusSelect = (status: string) => {
    setSelectedStatus(status === "all" ? "" : status);
  };
  return (
    <>
      <div className="min-h-screen relative text-white p-0 overflow-hidden">
        <img
          src={ProjectsBg}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 p-4 min-h-screen flex flex-col">
          <div className="flex-1 flex flex-col bg-black">
            <div className="h-[52px] border-b border-zinc-800/30 px-6 flex items-center justify-between bg-[#0a0a0a]">
              <div className="flex items-center">
                <span className="text-sm font-normal text-white">Projects</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Select
                    value={selectedStatus || "all"}
                    onValueChange={handleStatusSelect}
                  >
                    <SelectTrigger className="w-[160px] h-8 bg-zinc-900/50 border-2 border-zinc-700 text-xs">
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="ongoing">ONGOING</SelectItem>
                      <SelectItem value="completed">COMPLETED</SelectItem>
                      <SelectItem value="paused">TODO</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="relative">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-[160px] h-8 justify-start text-left font-normal bg-zinc-900/50 border-2 border-zinc-700 text-xs",
                          !selectedDate && "text-zinc-600"
                        )}
                      >
                        {selectedDate ? (
                          <div className="flex items-center justify-between w-full">
                            <span className="truncate">{format(new Date(selectedDate), "MMM dd, yyyy")}</span>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedDate("");
                                }}
                                className="h-3.5 w-3.5 p-0"
                              >
                                <X className="h-2.5 w-2.5 text-zinc-600 hover:text-white" />
                              </Button>
                              <CalendarIcon className="h-3.5 w-3.5 opacity-50" />
                            </div>
                          </div>
                        ) : (
                          <>
                            <span>Pick a date</span>
                            <CalendarIcon className="ml-auto h-3.5 w-3.5 opacity-50" />
                          </>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate ? new Date(selectedDate) : undefined}
                        onSelect={(date) => {
                          setSelectedDate(date ? format(date, "yyyy-MM-dd") : "");
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3 h-3 text-zinc-600" />
                  <Input
                    type="text"
                    placeholder="Search Projects"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="h-8 pl-8 pr-2.5 bg-zinc-900/50 border-2 border-zinc-700 rounded-lg text-xs text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-700 focus:border-zinc-700 w-[160px]"
                  />
                </div>
                 <button className="h-8 flex items-center gap-1.5 px-3 bg-(--an-import-bg) border border-zinc-800/50 rounded-lg text-xs font-normal text-white hover:bg-zinc-800 transition-colors cursor-pointer">
                  <Upload className="w-3 h-3" />
                  Import
                </button>
                <button className="h-8 flex items-center gap-1.5 px-3 bg-(--an-import-bg) border border-zinc-800/50 rounded-lg text-xs font-normal text-white hover:bg-zinc-800 transition-colors cursor-pointer">
                  <Download className="w-3 h-3" />
                  Download
                </button>
                <button onClick={()=>{navigate({to:"/projects/add-project"})}} className="h-8 flex items-center gap-1.5 px-3 bg-(--add-btn-bg) cursor-pointer hover:bg-blue-700 rounded-lg text-xs font-medium text-white transition-colors">
                  <Plus className="w-3 h-3" />
                  Add New Project
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-auto p-2">
              <DataTable
                data={data}
                columns={columns}
                sorting={sorting}
                setSorting={setSorting}
                isLoading={isLoading}
              />
            </div>
            <div className="h-[60px] px-6 border-t border-zinc-800/30 flex items-center bg-[#0a0a0a]">
              <Pagination
                paginationInfo={paginationInfo}
                pageSize={pageSize}
                setPage={setPage}
                setPageSize={setPageSize}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ProjectsTable;