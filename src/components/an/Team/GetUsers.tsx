import { useState } from "react";
import createUserColumns from "@/components/columns/getUsersColumn";
import DataTable from "@/components/core/DataTable";
import Pagination from "@/components/core/Pagination";
import TeamBg from "@/assets/TeamBg.webp";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { UsersTableProps } from "@/lib/interfaces/Team";
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
function UsersTable({
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
  selectedDepartment,
  setSelectedDepartment,
  selectedStatus,
  setSelectedStatus,
  sorting,
  setSorting,
  isLoading,
  departments,
  onCreateDepartment,
  isCreatingDepartment,
}: UsersTableProps & {
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  departments: { id: string | number; name: string; count: number }[];
  onCreateDepartment: (name: string) => void;
  isCreatingDepartment: boolean;
}) {
  const columns = createUserColumns();
  const [isAddDepartmentOpen, setIsAddDepartmentOpen] = useState(false);
  const [newDepartmentName, setNewDepartmentName] = useState("");
  const navigate = useNavigate();
  const handleDepartmentSelect = (deptName: string) => {
    setSelectedDepartment(deptName === "All" ? "" : deptName);
  };
  const isDepartmentSelected = (deptName: string) => {
    return (
      selectedDepartment === deptName ||
      (selectedDepartment === "" && deptName === "All")
    );
  };
  const handleStatusSelect = (status: string) => {
    setSelectedStatus(status === "all" ? "" : status);
  };
  const handleAddDepartment = () => {
    if (newDepartmentName.trim()) {
      onCreateDepartment(newDepartmentName.trim());
      setIsAddDepartmentOpen(false);
      setNewDepartmentName("");
    }
  };
  return (
    <>
      <div className="min-h-screen relative text-white p-0 overflow-hidden">
        <img
          src={TeamBg}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 p-4 min-h-screen flex">
          <div className="w-64 border-r border-zinc-800/30 bg-black/20 backdrop-blur-sm flex flex-col">
            <div className="h-[52px] px-4 border-b border-zinc-800/30 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded bg-zinc-900 flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-zinc-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-white">
                  Departments
                </span>
              </div>
              <ChevronDown className="w-4 h-4 text-zinc-600" />
            </div>
            <div>
              <div className="flex-1 overflow-y-auto py-1.5 px-3">
                <ul className="space-y-0">
                  {departments.map((dept) => (
                    <li key={dept.id}>
                      <button
                        onClick={() => handleDepartmentSelect(dept.name)}
                        className={`w-full text-left h-[42px] px-2.5 rounded-lg text-[13px] flex justify-between items-center transition-all ${
                          isDepartmentSelected(dept.name)
                            ? "bg-zinc-600 text-zinc-300"
                            : "text-white hover:bg-zinc-900/50 hover:text-zinc-400"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center overflow-hidden border border-zinc-800/50">
                            <span className="text-xs font-medium text-zinc-600 uppercase">
                              {dept.name === "All" ? "A" : dept.name.charAt(0)}
                            </span>
                          </div>
                          <span className="font-normal">{dept.name}</span>
                        </div>
                        <span className="text-xs text-zinc-600 font-normal">
                          {dept.count}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-3 border-t border-zinc-800/30">
                <button
                  onClick={() => setIsAddDepartmentOpen(true)}
                  className="w-full h-10 flex items-center justify-center gap-2 px-3 bg-(--an-dark-bg) hover:bg-zinc-600 border border-zinc-800/50 rounded-lg text-[13px] font-normal text-white transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  Add Department
                </button>
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col bg-black ml-4">
            <div className="h-[52px] border-b border-zinc-800/30 px-6 flex items-center justify-between bg-[#0a0a0a]">
              <div className="flex items-center">
                <span className="text-sm font-normal text-white">Users</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Select
                    value={selectedStatus || "all"}
                    onValueChange={handleStatusSelect}
                  >
                    <SelectTrigger className="w-[180px] h-9 bg-zinc-900/50 border-2 border-zinc-700 text-xs">
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="unavailable">Unavailable</SelectItem>
                      <SelectItem value="partially-available">
                        Partially Available
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="relative">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-[180px] h-9 justify-start text-left font-normal bg-zinc-900/50 border-2 border-zinc-700 text-xs",
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
                                className="h-4 w-4 p-0"
                              >
                                <X className="h-3 w-3 text-zinc-600 hover:text-white" />
                              </Button>
                              <CalendarIcon className="h-4 w-4 opacity-50" />
                            </div>
                          </div>
                        ) : (
                          <>
                            <span>Pick a date</span>
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
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
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" />
                  <Input
                    type="text"
                    placeholder="Search Users"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="h-9 pl-9 pr-3 bg-zinc-900/50 border-2 border-zinc-700 rounded-lg text-xs text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-700 focus:border-zinc-700 w-[180px]"
                  />
                </div>
                <button className="h-9 flex items-center gap-2 px-3.5 bg-(--an-import-bg) border border-zinc-800/50 rounded-lg text-xs font-normal text-white hover:bg-zinc-800 transition-colors cursor-pointer">
                  <Upload className="w-3.5 h-3.5" />
                  Import
                </button>
                <button className="h-9 flex items-center gap-2 px-3.5 bg-(--an-import-bg) border border-zinc-800/50 rounded-lg text-xs font-normal text-white hover:bg-zinc-800 transition-colors cursor-pointer">
                  <Download className="w-3.5 h-3.5" />
                  Download
                </button>
                <button onClick={()=>{console.log("cleick"); navigate({to:"/team/add-user"})}} className="h-9 flex items-center gap-2 px-4 bg-(--add-btn-bg) cursor-pointer hover:bg-blue-700 rounded-lg text-xs font-medium text-white transition-colors">
                  <Plus className="w-3.5 h-3.5" />
                  Add New User
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
      <Dialog open={isAddDepartmentOpen} onOpenChange={setIsAddDepartmentOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[9999] max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">Add New Department</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="Department Name"
              value={newDepartmentName}
              onChange={(e) => setNewDepartmentName(e.target.value)}
              className="bg-zinc-800 border-zinc-700 text-white"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddDepartment();
                }
              }}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddDepartmentOpen(false)}
              className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddDepartment}
              disabled={!newDepartmentName.trim() || isCreatingDepartment}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isCreatingDepartment ? "Adding..." : "Add Department"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
export default UsersTable;