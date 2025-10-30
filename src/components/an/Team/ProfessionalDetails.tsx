// ProfessionalDetails.tsx
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

interface ProfessionalFormData {
  department: string;
  roleType: string;
  experience: string;
  unionMembership: string;
  status: string;
  blockFrom: string;
  blockTo: string;
}

interface ProfessionalDetailsProps {
  formData: ProfessionalFormData;
  departments: { id: string | number; name: string; count: number }[];
  onUpdate: (updates: Partial<ProfessionalFormData>) => void;
  errors: Record<string, string>;
}

function ProfessionalDetails({
  formData,
  departments,
  onUpdate,
  errors,
}: ProfessionalDetailsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-7xl mx-auto">
      {/* Professional Details Section */}
      <div className="space-y-4">
        <div className="border border-zinc-800/50 rounded-lg p-4">
          <h3 className="text-sm font-medium mb-4 text-zinc-300 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            Professional Details
          </h3>
          <div className="space-y-3.5">
            <div>
              <Label className="text-xs text-zinc-300 mb-2 block">
                Department
              </Label>
              <Select value={formData.department} onValueChange={(v) => onUpdate({ department: v })}>
                <SelectTrigger className="bg-(--input-bg) border-zinc-800/50 text-white h-10 text-sm">
                  <SelectValue placeholder="Enter Department" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800">
                  {departments.map((dept) => (
                    <SelectItem key={dept.id} value={dept.id.toString()} className="text-white">
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
            </div>
            
            <div>
              <Label className="text-xs text-zinc-300 mb-2 block">
                Role Type
              </Label>
              <Select value={formData.roleType} onValueChange={(v) => onUpdate({ roleType: v })}>
                <SelectTrigger className="bg-(--input-bg) border-zinc-800/50 text-white h-10 text-sm">
                  <SelectValue placeholder="Enter Role" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800">
                  <SelectItem value="ACTOR" className="text-white">Actor</SelectItem>
                  <SelectItem value="ACTRESS" className="text-white">Actress</SelectItem>
                  <SelectItem value="PRODUCER" className="text-white">Producer</SelectItem>
                  <SelectItem value="DIRECTOR" className="text-white">Director</SelectItem>
                  <SelectItem value="COSTUME DESIGNER" className="text-white">Costume Designer</SelectItem>
                </SelectContent>
              </Select>
              {errors.roleType && <p className="text-red-500 text-xs mt-1">{errors.roleType}</p>}
            </div>
            
            <div>
              <Label className="text-xs text-zinc-300 mb-2 block">Experience</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={formData.experience}
                  onChange={(e) => onUpdate({ experience: e.target.value })}
                  className="flex-1 bg-(--input-bg) border-zinc-800/50 text-white h-10 text-sm placeholder:text-zinc-300"
                  placeholder="Enter Experience"
                />
                <Select defaultValue="years">
                  <SelectTrigger className="w-28 bg-(--input-bg) border-zinc-800/50 text-white h-10 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-800">
                    <SelectItem value="years" className="text-white">Years</SelectItem>
                    <SelectItem value="months" className="text-white">Months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label className="text-xs text-zinc-300 mb-2 block">
                Union/Association Membership
              </Label>
              <Select
                value={formData.unionMembership}
                onValueChange={(v) => onUpdate({ unionMembership: v })}
              >
                <SelectTrigger className="bg-(--input-bg) border-zinc-800/50 text-white h-10 text-sm">
                  <SelectValue placeholder="Enter Membership" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800">
                  <SelectItem value="yes" className="text-white">Yes</SelectItem>
                  <SelectItem value="no" className="text-white">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Availability Section */}
      <div className="space-y-4">
        <div className="bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/50 rounded-lg p-4">
          <h3 className="text-sm font-medium mb-4 text-zinc-300 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            Availability
          </h3>
          <div className="space-y-3.5">
            <div>
              <Label className="text-xs text-zinc-300 mb-2 block">Status</Label>
              <Select value={formData.status} onValueChange={(v) => onUpdate({ status: v })}>
                <SelectTrigger className="bg-(--input-bg) border-zinc-800/50 text-white h-10 text-sm">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800">
                  <SelectItem value="available" className="text-white">Available</SelectItem>
                  <SelectItem value="unavailable" className="text-white">Unavailable</SelectItem>
                  <SelectItem value="partially-available" className="text-white">Partially Available</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-xs text-zinc-300 mb-2 block">Block Dates</Label>
              <div className="grid grid-cols-2 gap-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal bg-(--input-bg) border-zinc-800/50 h-10 text-sm hover:bg-zinc-800/50",
                        !formData.blockFrom && "text-zinc-300"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-teal-400" />
                      {formData.blockFrom ? format(new Date(formData.blockFrom), "MM/dd/yyyy") : "From"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-zinc-900 border-zinc-800" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.blockFrom ? new Date(formData.blockFrom) : undefined}
                      onSelect={(date) => onUpdate({ blockFrom: date ? date.toISOString().split('T')[0] : "" })}
                      initialFocus
                      className="bg-zinc-900 text-white"
                    />
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal bg-(--input-bg) border-zinc-800/50 h-10 text-sm hover:bg-zinc-800/50",
                        !formData.blockTo && "text-zinc-300"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-teal-400" />
                      {formData.blockTo ? format(new Date(formData.blockTo), "MM/dd/yyyy") : "To"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-zinc-900 border-zinc-800" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.blockTo ? new Date(formData.blockTo) : undefined}
                      onSelect={(date) => onUpdate({ blockTo: date ? date.toISOString().split('T')[0] : "" })}
                      initialFocus
                      className="bg-zinc-900 text-white"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfessionalDetails;