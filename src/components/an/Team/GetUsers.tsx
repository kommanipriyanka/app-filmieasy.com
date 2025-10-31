import { useState, useEffect } from "react";
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
import {
  ChevronDown,
  Download,
  Plus,
  Search,
  Upload,
  X,
} from "lucide-react";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { UsersTableProps } from "@/lib/interfaces/Team";
import createUserColumns from "@/components/columns/getUsersColumn";
import DataTable from "@/components/core/DataTable";
import Pagination from "@/components/core/Pagination";
import TeamBg from "@/assets/TeamBg.webp";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "@tanstack/react-router";

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
  departmentError,
  departmentSuccess,
  onResetSuccess,
  onClearError,
  showSidebar,
}: UsersTableProps) {
  const [isAddDepartmentOpen, setIsAddDepartmentOpen] = useState(false);
  const [newDepartmentName, setNewDepartmentName] = useState("");
  const [localSearchValue, setLocalSearchValue] = useState(searchValue);
  const navigate = useNavigate();
  const columns = createUserColumns();

  const handleDepartmentSelect = (deptId: string) => {
    setSelectedDepartment(deptId === "all" ? "" : deptId);
  };

  const isDepartmentSelected = (deptId: string) => {
    return (
      selectedDepartment === deptId ||
      (selectedDepartment === "" && deptId === "all")
    );
  };

  const handleStatusSelect = (status: string) => {
    setSelectedStatus(status === "all" ? "" : status);
  };

  const handleAddDepartment = () => {
    if (newDepartmentName.trim()) {
      onCreateDepartment(newDepartmentName.trim());
    }
  };

  useEffect(() => {
    setLocalSearchValue(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchValue(localSearchValue);
    }, 300);
    return () => clearTimeout(timer);
  }, [localSearchValue, setSearchValue]);

  useEffect(() => {
    if (isAddDepartmentOpen) {
      setNewDepartmentName("");
      onClearError();
    }
  }, [isAddDepartmentOpen, onClearError]);

  useEffect(() => {
    if (departmentSuccess) {
      setIsAddDepartmentOpen(false);
      setNewDepartmentName("");
      onResetSuccess();
    }
  }, [departmentSuccess, onResetSuccess]);

  return (
    <>
      <div className="min-h-screen relative text-white p-0 overflow-hidden">
        <img
          src={TeamBg}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className={`relative z-10 min-h-screen flex ${
            showSidebar ? "p-4" : "p-0 m-0"
          }`}
        >
          {showSidebar && (
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
        <span className="text-sm font-normal text-white">
          Departments
        </span>
      </div>
      <ChevronDown className="w-4 h-4 text-zinc-600" />
    </div>
    <div className="flex-1 flex flex-col">
      <ScrollArea className="flex-1 max-h-[420px]">
        <div className="py-1.5 px-3">
          <ul className="space-y-0.5">
            {departments.map((dept) => (
              <li key={dept.id}>
                <button
                  onClick={() => handleDepartmentSelect(dept.id.toString())}
                  className={`w-full text-left h-[36px] px-2.5 rounded-lg text-[13px] flex justify-between items-center transition-all ${
                    isDepartmentSelected(dept.id.toString())
                      ? "bg-zinc-600 text-zinc-300"
                      : "text-white hover:bg-zinc-900/50 hover:text-zinc-400"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-zinc-900 flex items-center justify-center overflow-hidden border border-zinc-800/50">
                      <span className="text-xs font-medium text-zinc-600 uppercase">
                        {dept.name === "All"
                          ? "A"
                          : dept.name.charAt(0)}
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
      </ScrollArea>
      <div className="p-3 border-t border-zinc-800/30">
        <button
          onClick={() => setIsAddDepartmentOpen(true)}
          className="w-full h-10 flex items-center justify-center gap-2 px-3 bg-zinc-900 hover:bg-zinc-600 border border-zinc-800/50 rounded-lg text-[13px] font-normal text-white transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Department
        </button>
      </div>
    </div>
  </div>
)}
          <div className={`flex-1 flex flex-col ${showSidebar ? 'ml-4' : ''}`}>
            <div className="bg-black rounded-t-xl overflow-hidden flex-1 flex flex-col">
              <div className="h-[52px] border-b border-zinc-800/30 px-6 flex items-center justify-between bg-[#0a0a0a]">
                <div className="flex items-center">
                  <span className="text-sm font-normal text-white">Users</span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="relative">
                    <Select
                      value={selectedStatus || "all"}
                      onValueChange={handleStatusSelect}
                    >
                      <SelectTrigger className="w-[160px] h-8 bg-zinc-900/50 border-2 border-zinc-700 text-xs">
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-zinc-700">
                        <SelectItem value="all" className="text-white hover:bg-zinc-800">All</SelectItem>
                        <SelectItem value="available" className="text-white hover:bg-zinc-800">Available</SelectItem>
                        <SelectItem value="unavailable" className="text-white hover:bg-zinc-800">Unavailable</SelectItem>
                        <SelectItem value="partially-available" className="text-white hover:bg-zinc-800">
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
                            "w-[160px] h-8 justify-start text-left font-normal bg-zinc-900/50 border-2 border-zinc-700 text-xs",
                            !selectedDate && "text-zinc-600"
                          )}
                        >
                          {selectedDate ? (
                            <div className="flex items-center justify-between w-full">
                              <span className="truncate">
                                {format(new Date(selectedDate), "MMM dd, yyyy")}
                              </span>
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
                      <PopoverContent className="w-auto p-0 bg-zinc-900 border-zinc-700" align="start">
                        <Calendar
                          mode="single"
                          selected={
                            selectedDate ? new Date(selectedDate) : undefined
                          }
                          onSelect={(date) => {
                            setSelectedDate(
                              date ? format(date, "yyyy-MM-dd") : ""
                            );
                          }}
                          initialFocus
                          className="bg-zinc-900 text-white"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 text-zinc-600" />
                    <Input
                      type="text"
                      placeholder="Search Users"
                      value={localSearchValue}
                      onChange={(e) => setLocalSearchValue(e.target.value)}
                      className="h-8 pl-9 pr-3 bg-zinc-900/50 border-2 border-zinc-700 rounded-lg text-xs text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-700 focus:border-zinc-700 w-[160px]"
                    />
                  </div>
                  <button className="h-8 flex items-center gap-1.5 px-3 bg-zinc-900 border border-zinc-800/50 rounded-lg text-xs font-normal text-white hover:bg-zinc-800 transition-colors cursor-pointer min-w-[72px]">
                    <Upload className="w-3 h-3" />
                    Import
                  </button>
                  <button className="h-8 flex items-center gap-1.5 px-3 bg-zinc-900 border border-zinc-800/50 rounded-lg text-xs font-normal text-white hover:bg-zinc-800 transition-colors cursor-pointer min-w-[72px]">
                    <Download className="w-3 h-3" />
                    Download
                  </button>
                  <button
                    onClick={()=>navigate({to:"/team/add-user"})}
                    className="h-8 flex items-center gap-1.5 px-3.5 bg-blue-600 cursor-pointer hover:bg-blue-700 rounded-lg text-xs font-medium text-white transition-colors min-w-[100px]"
                  >
                    <Plus className="w-3 h-3" />
                    Add User
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-auto p-2 bg-[#0a0a0a]">
                <DataTable
                  data={data}
                  columns={columns}
                  sorting={sorting}
                  setSorting={setSorting}
                  isLoading={isLoading}
                />
              </div>
              <div className="h-[60px] px-6 border-t border-zinc-800/30 flex items-center justify-between bg-[#0a0a0a]">
                <Pagination
                  paginationInfo={paginationInfo}
                  pageSize={pageSize}
                  setPageSize={setPageSize}
                  setPage={setPage}
                />
              </div>
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
              onChange={(e) => {
                setNewDepartmentName(e.target.value);
                if (e.target.value.trim()) {
                  onClearError();
                }
              }}
              className="bg-zinc-800 border-zinc-700 text-white"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddDepartment();
                }
              }}
            />
            {departmentError && (
              <p className="text-red-500 text-xs mt-2">{departmentError}</p>
            )}
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