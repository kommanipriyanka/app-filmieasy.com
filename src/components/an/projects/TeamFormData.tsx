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
import { Card } from "@/components/ui/card";
import { Search } from "lucide-react";
import { useState } from "react";

interface TeamFormData {
  members: { userId: string }[];
}

interface AvailableUser {
  id: string;
  name: string;
  department: string;
  image?: string;
}

interface CrewArtistsProps {
  formData: TeamFormData;
  availableUsers: AvailableUser[];
  onAddTeamMember: (userId: string) => void;
  onRemoveTeamMember: (index: number) => void;
  onUpdateTeamMember: (index: number, updates: Partial<{ department: string; role: string }>) => void;
  errors: Record<string, string>;
}

function CrewArtists({
  formData,
  availableUsers,
  onAddTeamMember,
  onRemoveTeamMember,
  onUpdateTeamMember,
  errors,
}: CrewArtistsProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = availableUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto h-full">
      <div className="space-y-6">
        <div className="bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/50 rounded-lg p-6 h-full">
          <h3 className="text-sm font-medium mb-6 text-zinc-400 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            Available Users
          </h3>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 h-4 w-4" />
            <Input
              placeholder="Search users"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-black/40 border-zinc-800/50 text-white h-10 text-sm placeholder:text-zinc-600"
            />
          </div>
          <div className="space-y-3 max-h-[calc(100%-100px)] overflow-y-auto">
            {filteredUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <img
                    src={user.image || ""}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-white text-sm font-medium">{user.name}</p>
                    <p className="text-zinc-400 text-xs">{user.department}</p>
                  </div>
                </div>
                <Button
                  onClick={() => onAddTeamMember(user.id)}
                  variant="ghost"
                  size="sm"
                  className="text-green-400 hover:text-green-300 h-8 px-3 text-xs"
                >
                  + Add
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <div className="bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/50 rounded-lg p-6 h-full">
          <h3 className="text-sm font-medium mb-6 text-zinc-400 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            Project Team ({formData.members.length})
          </h3>
          <div className="space-y-3 max-h-[calc(100%-50px)] overflow-y-auto">
            {formData.members.map((member, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-black/20 rounded-lg">
                <img
                  src={availableUsers.find(u => u.id === member.userId)?.image || ""}
                  alt={availableUsers.find(u => u.id === member.userId)?.name || ""}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">
                    {availableUsers.find(u => u.id === member.userId)?.name}
                  </p>
                  {/* <div className="grid grid-cols-2 gap-2 mt-1">
                    <Select value={member.department} onValueChange={(v) => onUpdateTeamMember(index, { department: v })}>
                      <SelectTrigger className="bg-black/40 border-zinc-800/50 text-white h-8 text-xs">
                        <SelectValue placeholder="Department" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-zinc-800">
                        <SelectItem value="art" className="text-white">Art</SelectItem>
                        <SelectItem value="production" className="text-white">Production</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={member.role} onValueChange={(v) => onUpdateTeamMember(index, { role: v })}>
                      <SelectTrigger className="bg-black/40 border-zinc-800/50 text-white h-8 text-xs">
                        <SelectValue placeholder="Role" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-zinc-800">
                        <SelectItem value="actor" className="text-white">Actor</SelectItem>
                        <SelectItem value="director" className="text-white">Director</SelectItem>
                      </SelectContent>
                    </Select>
                  </div> */}
                </div>
                <Button
                  onClick={() => onRemoveTeamMember(index)}
                  variant="ghost"
                  size="sm"
                  className="text-red-400 hover:text-red-300 h-8 px-3 text-xs"
                >
                  ×
                </Button>
              </div>
            ))}
          </div>
          {errors.team && <p className="text-red-500 text-xs mt-1">{errors.team}</p>}
        </div>
      </div>
    </div>
  );
}

export default CrewArtists;