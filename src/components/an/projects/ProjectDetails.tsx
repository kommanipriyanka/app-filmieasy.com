import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface ProjectFormData {
  name: string;
  status: string;
  genre: string;
  language: string;
  description: string;
  startDate: string;
  endDate: string;
  estimatedBudget: string;
}

interface ProjectDetailsProps {
  formData: ProjectFormData;
  onUpdate: (updates: Partial<ProjectFormData>) => void;
  errors: Record<string, string>;
}

function ProjectDetails({
  formData,
  onUpdate,
  errors,
}: ProjectDetailsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
      <div className="space-y-6">
        <div className=" border border-zinc-800/50 rounded-lg p-6">
          <h3 className="text-sm font-medium mb-6 text-zinc-400 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            Basic Info
          </h3>
          <div className="space-y-5">
            <div>
              <Label className="text-xs text-zinc-400 mb-2 block">
                Project Name
              </Label>
              <Input
                value={formData.name}
                onChange={(e) => onUpdate({ name: e.target.value })}
                className="bg-black/40 border-zinc-800/50 text-white h-10 text-sm placeholder:text-zinc-600"
                placeholder="Enter full name"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs text-zinc-400 mb-2 block">
                  Project Status
                </Label>
                <Select value={formData.status} onValueChange={(v) => onUpdate({ status: v })}>
                  <SelectTrigger className="bg-black/40 border-zinc-800/50 text-white h-10 text-sm">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-800">
                    <SelectItem value="planning" className="text-white">Planning</SelectItem>
                    <SelectItem value="production" className="text-white">Production</SelectItem>
                    <SelectItem value="post-production" className="text-white">Post-Production</SelectItem>
                  </SelectContent>
                </Select>
                {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status}</p>}
              </div>
              <div>
                <Label className="text-xs text-zinc-400 mb-2 block">
                  Genre
                </Label>
                <Select value={formData.genre} onValueChange={(v) => onUpdate({ genre: v })}>
                  <SelectTrigger className="bg-black/40 border-zinc-800/50 text-white h-10 text-sm">
                    <SelectValue placeholder="Select genre" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-800">
                    <SelectItem value="action" className="text-white">Action</SelectItem>
                    <SelectItem value="drama" className="text-white">Drama</SelectItem>
                    <SelectItem value="comedy" className="text-white">Comedy</SelectItem>
                  </SelectContent>
                </Select>
                {errors.genre && <p className="text-red-500 text-xs mt-1">{errors.genre}</p>}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs text-zinc-400 mb-2 block">
                  Language
                </Label>
                <Select value={formData.language} onValueChange={(v) => onUpdate({ language: v })}>
                  <SelectTrigger className="bg-black/40 border-zinc-800/50 text-white h-10 text-sm">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-800">
                    <SelectItem value="english" className="text-white">English</SelectItem>
                    <SelectItem value="hindi" className="text-white">Hindi</SelectItem>
                    <SelectItem value="telugu" className="text-white">Telugu</SelectItem>
                  </SelectContent>
                </Select>
                {errors.language && <p className="text-red-500 text-xs mt-1">{errors.language}</p>}
              </div>
            </div>
            <div>
              <Label className="text-xs text-zinc-400 mb-2 block">Description</Label>
              <Input
                value={formData.description}
                onChange={(e) => onUpdate({ description: e.target.value })}
                className="bg-black/40 border-zinc-800/50 text-white h-10 text-sm placeholder:text-zinc-600"
                placeholder="Enter description"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs text-zinc-400 mb-2 block">Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal bg-black/40 border-zinc-800/50 h-10 text-sm hover:bg-black/60",
                        !formData.startDate && "text-zinc-500"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-teal-400" />
                      {formData.startDate ? format(new Date(formData.startDate), "MM/dd/yyyy") : "Start Date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-zinc-900 border-zinc-800" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.startDate ? new Date(formData.startDate) : undefined}
                      onSelect={(date) => onUpdate({ startDate: date ? date.toISOString().split('T')[0] : "" })}
                      initialFocus
                      className="bg-zinc-900 text-white"
                    />
                  </PopoverContent>
                </Popover>
                {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>}
              </div>
              <div>
                <Label className="text-xs text-zinc-400 mb-2 block">End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal bg-black/40 border-zinc-800/50 h-10 text-sm hover:bg-black/60",
                        !formData.endDate && "text-zinc-500"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-teal-400" />
                      {formData.endDate ? format(new Date(formData.endDate), "MM/dd/yyyy") : "End Date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-zinc-900 border-zinc-800" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.endDate ? new Date(formData.endDate) : undefined}
                      onSelect={(date) => onUpdate({ endDate: date ? date.toISOString().split('T')[0] : "" })}
                      initialFocus
                      className="bg-zinc-900 text-white"
                    />
                  </PopoverContent>
                </Popover>
                {errors.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>}
              </div>
            </div>
            <div>
              <Label className="text-xs text-zinc-400 mb-2 block">Estimated Budget Details</Label>
              <Input
                value={formData.estimatedBudget}
                onChange={(e) => onUpdate({ estimatedBudget: e.target.value })}
                className="bg-black/40 border-zinc-800/50 text-white h-10 text-sm placeholder:text-zinc-600"
                placeholder="Enter estimated budget details"
              />
              {errors.estimatedBudget && <p className="text-red-500 text-xs mt-1">{errors.estimatedBudget}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;