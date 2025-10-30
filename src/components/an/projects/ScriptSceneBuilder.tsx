import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ScriptFormData {
  scenes: {
    name: string;
    description: string;
    members: string[];
    location: string;
    date: string;
    timeFrom: string;
    timeTo: string;
    locationType: "indoor" | "outdoor";
  }[];
  screenplayTitle: string;
  screenplaySubtitle: string;
}

interface ScriptSceneBuilderProps {
  formData: ScriptFormData;
  onAddScene: () => void;
  onRemoveScene: (index: number) => void;
  onUpdateScene: (index: number, updates: Partial<ScriptFormData["scenes"][0]>) => void;
  onUpdateScreenplay: (updates: Partial<Pick<ScriptFormData, "screenplayTitle" | "screenplaySubtitle">>) => void;
  errors: Record<string, string>;
}

function ScriptSceneBuilder({
  formData,
  onAddScene,
  onRemoveScene,
  onUpdateScene,
  onUpdateScreenplay,
  errors,
}: ScriptSceneBuilderProps) {
  const [newScene, setNewScene] = useState({
    name: "",
    description: "",
    members: [] as string[],
    location: "",
    date: "",
    timeFrom: "",
    timeTo: "",
    locationType: "indoor" as "indoor" | "outdoor",
  });

  const handleAddScene = () => {
    if (newScene.name && newScene.description) {
      onUpdateScene(formData.scenes.length, newScene);
      setNewScene({
        name: "",
        description: "",
        members: [],
        location: "",
        date: "",
        timeFrom: "",
        timeTo: "",
        locationType: "indoor",
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto h-full">
      <div className="space-y-6">
        <div className="bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/50 rounded-lg p-6 h-full">
          <h3 className="text-sm font-medium mb-6 text-zinc-400 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            Scenes
          </h3>
          <div className="space-y-4 mb-4">
            <div>
              <Label className="text-xs text-zinc-400 mb-2 block">Scene Name</Label>
              <Input
                value={newScene.name}
                onChange={(e) => setNewScene({ ...newScene, name: e.target.value })}
                className="bg-black/40 border-zinc-800/50 text-white h-10 text-sm placeholder:text-zinc-600"
                placeholder="Enter scene name"
              />
            </div>
            <div>
              <Label className="text-xs text-zinc-400 mb-2 block">Description</Label>
              <Textarea
                value={newScene.description}
                onChange={(e) => setNewScene({ ...newScene, description: e.target.value })}
                className="bg-black/40 border-zinc-800/50 text-white h-20 text-sm placeholder:text-zinc-600 resize-none"
                placeholder="Enter scene description"
              />
            </div>
            <div>
              <Label className="text-xs text-zinc-400 mb-2 block">Select Members</Label>
              <Select value={newScene.members[0] || ""} onValueChange={(v) => setNewScene({ ...newScene, members: [v] })}>
                <SelectTrigger className="bg-black/40 border-zinc-800/50 text-white h-10 text-sm">
                  <SelectValue placeholder="Select membership" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800">
                  <SelectItem value="member1" className="text-white">Member 1</SelectItem>
                  <SelectItem value="member2" className="text-white">Member 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs text-zinc-400 mb-2 block">Select Location</Label>
              <Select value={newScene.location} onValueChange={(v) => setNewScene({ ...newScene, location: v })}>
                <SelectTrigger className="bg-black/40 border-zinc-800/50 text-white h-10 text-sm">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800">
                  <SelectItem value="studio" className="text-white">Studio</SelectItem>
                  <SelectItem value="outdoor" className="text-white">Outdoor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs text-zinc-400 mb-2 block">Select Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal bg-black/40 border-zinc-800/50 h-10 text-sm hover:bg-black/60",
                        !newScene.date && "text-zinc-500"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-teal-400" />
                      {newScene.date ? format(new Date(newScene.date), "MM/dd/yyyy") : "Date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-zinc-900 border-zinc-800" align="start">
                    <Calendar
                      mode="single"
                      selected={newScene.date ? new Date(newScene.date) : undefined}
                      onSelect={(date) => setNewScene({ ...newScene, date: date ? date.toISOString().split('T')[0] : "" })}
                      initialFocus
                      className="bg-zinc-900 text-white"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label className="text-xs text-zinc-400 mb-2 block">Select Date & Time</Label>
                <div className="flex gap-2">
                  <Input
                    type="time"
                    value={newScene.timeFrom}
                    onChange={(e) => setNewScene({ ...newScene, timeFrom: e.target.value })}
                    className="bg-black/40 border-zinc-800/50 text-white h-10 text-sm"
                  />
                  <span className="text-zinc-400 self-center">-</span>
                  <Input
                    type="time"
                    value={newScene.timeTo}
                    onChange={(e) => setNewScene({ ...newScene, timeTo: e.target.value })}
                    className="bg-black/40 border-zinc-800/50 text-white h-10 text-sm"
                  />
                </div>
              </div>
            </div>
            <div>
              <Label className="text-xs text-zinc-400 mb-2 block">Location Type</Label>
              <RadioGroup value={newScene.locationType} onValueChange={(v) => setNewScene({ ...newScene, locationType: v as "indoor" | "outdoor" })} className="flex gap-4">
                <div className="flex items-center gap-2 bg-black/40 border border-zinc-800/50 rounded px-3 py-2">
                  <RadioGroupItem value="indoor" id="indoor" className="border-zinc-700" />
                  <Label htmlFor="indoor" className="text-xs text-zinc-300 cursor-pointer font-normal">Indoor</Label>
                </div>
                <div className="flex items-center gap-2 bg-black/40 border border-zinc-800/50 rounded px-3 py-2">
                  <RadioGroupItem value="outdoor" id="outdoor" className="border-zinc-700" />
                  <Label htmlFor="outdoor" className="text-xs text-zinc-300 cursor-pointer font-normal">Outdoor</Label>
                </div>
              </RadioGroup>
            </div>
            <Button onClick={handleAddScene} className="w-full bg-green-500 hover:bg-green-600 text-white h-10 text-sm">
              + Add Scene
            </Button>
          </div>
          <div className="space-y-3 max-h-[300px] overflow-y-auto">
            {formData.scenes.map((scene, index) => (
              <div key={index} className="p-3 bg-black/20 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">{scene.name}</p>
                    <p className="text-zinc-400 text-xs">{scene.description}</p>
                  </div>
                  <Button
                    onClick={() => onRemoveScene(index)}
                    variant="ghost"
                    size="sm"
                    className="text-red-400 hover:text-red-300 h-6 px-2 text-xs"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
          {errors.scenes && <p className="text-red-500 text-xs mt-1">{errors.scenes}</p>}
        </div>
      </div>
      <div className="space-y-6">
        <div className="bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/50 rounded-lg p-6 h-full flex flex-col">
          <h3 className="text-sm font-medium mb-6 text-zinc-400 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            Screenplay
          </h3>
          <div className="space-y-4 flex-1">
            <div>
              <Label className="text-xs text-zinc-400 mb-2 block">Title</Label>
              <Input
                value={formData.screenplayTitle}
                onChange={(e) => onUpdateScreenplay({ screenplayTitle: e.target.value })}
                className="bg-black/40 border-zinc-800/50 text-white h-10 text-sm placeholder:text-zinc-600"
                placeholder="Untitled Screenplay"
              />
            </div>
            <div>
              <Label className="text-xs text-zinc-400 mb-2 block">Subtitle</Label>
              <Input
                value={formData.screenplaySubtitle}
                onChange={(e) => onUpdateScreenplay({ screenplaySubtitle: e.target.value })}
                className="bg-black/40 border-zinc-800/50 text-white h-10 text-sm placeholder:text-zinc-600"
                placeholder="Subtitle"
              />
            </div>
            <div className="flex-1">
              <Label className="text-xs text-zinc-400 mb-2 block">Content</Label>
              <Textarea
                value=""
                onChange={() => {}}
                className="bg-black/40 border-zinc-800/50 text-white h-full text-sm placeholder:text-zinc-600 resize-none"
                placeholder="Screenplay content..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScriptSceneBuilder;