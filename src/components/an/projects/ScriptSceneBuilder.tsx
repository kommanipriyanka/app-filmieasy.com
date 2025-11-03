import { useState, useRef, useEffect } from "react";
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
import { CalendarIcon, Clock, Upload, FileText, X, Plus } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ScriptFormData {
  scenes: {
    name: string;
    description: string;
    members: any;
    location: string;
    date: string;
    timeFrom: string;
    timeTo: string;
    locationType: "indoor" | "outdoor";
    uploadedDocument?: string | null;
    selectedFileName?: string | undefined;
  }[];
  screenplayTitle: string;
  screenplaySubtitle: string;
}

interface ScriptSceneBuilderProps {
  formData: ScriptFormData;
  availableUsers: Array<{ id: string; name: string; department: string; image?: string }>;
  onAddScene: (sceneData?: Partial<ScriptFormData["scenes"][0]>) => void;
  onRemoveScene: (index: number) => void;
  onUpdateScene: (index: number, updates: Partial<ScriptFormData["scenes"][0]>) => void;
  onUpdateScreenplay: (updates: Partial<Pick<ScriptFormData, "screenplayTitle" | "screenplaySubtitle">>) => void;
  onUploadFile: (file: File) => Promise<string | null>;
  errors: Record<string, string>;
}

function ScriptSceneBuilder({
  formData,
  availableUsers,
  onAddScene,
  onRemoveScene,
  onUpdateScene,
  onUpdateScreenplay,
  onUploadFile,
  errors,
}: ScriptSceneBuilderProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(formData.scenes.length > 0 ? 0 : -1);
  const [newScene, setNewScene] = useState({
    name: "",
    description: "",
    members: "",
    location: "",
    date: "",
    timeFrom: "",
    timeTo: "",
    locationType: "indoor" as "indoor" | "outdoor",
    uploadedDocument: null as string | null,
    selectedFileName: undefined as string | undefined,
  });
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const prevLengthRef = useRef(formData.scenes.length);

  useEffect(() => {
    const currentLength = formData.scenes.length;
    if (currentLength > prevLengthRef.current && selectedIndex === -1) {
      setSelectedIndex(currentLength - 1);
    }
    prevLengthRef.current = currentLength;
  }, [formData.scenes.length]);

  useEffect(() => {
    if (formData.scenes.length === 0 && selectedIndex !== -1) {
      setSelectedIndex(-1);
    } else if (formData.scenes.length > 0 && selectedIndex < 0) {
      setSelectedIndex(0);
    }
  }, [formData.scenes.length]);

  const isNew = selectedIndex === -1;
  const currentIndex = selectedIndex;
  const currentScene = isNew ? newScene : formData.scenes[currentIndex];

  const getFileName = (doc: string | null | undefined): string => {
    return doc ? doc.split('/').pop()?.split('?')[0] || 'Document' : '';
  };

  const currentUploaded = isNew ? newScene.uploadedDocument : formData.scenes[currentIndex]?.uploadedDocument;
  const currentSelectedFileName = isNew ? newScene.selectedFileName : formData.scenes[currentIndex]?.selectedFileName;
  const currentFileName = currentSelectedFileName || getFileName(currentUploaded);
  const hasDocument = isNew ? !!(previewSrc || newScene.uploadedDocument || newScene.selectedFileName) : !!formData.scenes[currentIndex]?.uploadedDocument;
  const previewUrl = isNew ? (previewSrc || newScene.uploadedDocument || '') : (formData.scenes[currentIndex]?.uploadedDocument || '');

  const updateField = (updates: Partial<ScriptFormData["scenes"][0]>) => {
    if (isNew) {
      setNewScene((prev) => ({ ...prev, ...updates }));
    } else {
      onUpdateScene(currentIndex, updates);
    }
  };

  const handleAddScene = () => {
    if (newScene.name && newScene.description) {
      onAddScene(newScene);
      setNewScene({
        name: "",
        description: "",
        members: "",
        location: "",
        date: "",
        timeFrom: "",
        timeTo: "",
        locationType: "indoor",
        uploadedDocument: null,
        selectedFileName: undefined,
      });
      setPreviewSrc(null);
    }
  };

  const handleRemoveScene = (index: number) => {
    onRemoveScene(index);
    if (index === selectedIndex) {
      setSelectedIndex(selectedIndex > 0 ? selectedIndex - 1 : -1);
    } else if (index < selectedIndex) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const handleUploadDocument = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".pdf,.doc,.docx,.txt";
    input.onchange = async (e: any) => {
      const file = e.target.files?.[0] || null;
      if (file) {
        if (isNew) {
          setNewScene((prev) => ({ ...prev, selectedFileName: file.name, uploadedDocument: null }));
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreviewSrc(reader.result as string);
          };
          reader.readAsDataURL(file);
          const path = await onUploadFile(file);
          if (path) {
            setNewScene((prev) => ({ ...prev, uploadedDocument: path, selectedFileName: undefined }));
          } else {
            setNewScene((prev) => ({ ...prev, selectedFileName: undefined }));
            setPreviewSrc(null);
          }
        } else {
          onUpdateScene(currentIndex, { selectedFileName: file.name, uploadedDocument: null });
          const path = await onUploadFile(file);
          if (path) {
            onUpdateScene(currentIndex, { uploadedDocument: path, selectedFileName: undefined });
          } else {
            onUpdateScene(currentIndex, { selectedFileName: undefined });
          }
        }
      }
    };
    input.click();
  };

  const handleRemoveDocument = () => {
    if (isNew) {
      setPreviewSrc(null);
      setNewScene((prev) => ({ ...prev, uploadedDocument: null, selectedFileName: undefined }));
    } else {
      onUpdateScene(currentIndex, { uploadedDocument: null, selectedFileName: undefined });
    }
  };

  return (
    <div className="flex h-full max-w-7xl mx-auto">
      <aside className="w-48 flex flex-col border-r border-zinc-800/50 bg-zinc-900 min-w-[12rem]">
        <ScrollArea className="flex-1 py-2">
          {formData.scenes.map((scene, index) => (
            <div key={index} className="relative group mb-1 mx-1 rounded">
              <button
                onClick={() => setSelectedIndex(index)}
                className={cn(
                  "w-full text-left px-2 py-2 rounded text-xs truncate block",
                  selectedIndex === index
                    ? "bg-zinc-700 text-white border border-zinc-600"
                    : "text-zinc-300 hover:bg-zinc-800"
                )}
              >
                {scene.name || `Scene ${index + 1}`}
              </button>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveScene(index);
                }}
                className="absolute -right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-0.5 rounded-full hover:bg-red-500/20 transition-opacity"
              >
                <X className="h-3 w-3 text-red-400 hover:text-red-300" />
              </Button>
            </div>
          ))}
        </ScrollArea>
        <button
          onClick={() => setSelectedIndex(-1)}
          className="mx-1 mb-2 p-2 text-green-400 hover:bg-zinc-800 rounded flex items-center justify-center gap-1"
        >
          <Plus className="h-4 w-4" />
          <span className="text-xs">Add</span>
        </button>
      </aside>
      <div className="flex flex-1">
        <ScrollArea className="flex-1 p-4">
          <h3 className="text-sm font-medium mb-4 text-zinc-300 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            {isNew ? "New Scene" : `Scene ${currentIndex + 1}: ${currentScene.name}`}
          </h3>
          <div className="space-y-3.5">
            <div>
              <Label className="text-xs text-zinc-300 mb-2 block">Scene Name</Label>
              <Input
                value={currentScene.name}
                onChange={(e) => updateField({ name: e.target.value })}
                className="bg-zinc-800/50 border-zinc-800/50 text-white h-10 text-sm placeholder:text-zinc-300"
                placeholder="Enter scene name"
              />
            </div>
            <div>
              <Label className="text-xs text-zinc-300 mb-2 block">Description</Label>
              <Textarea
                value={currentScene.description}
                onChange={(e) => updateField({ description: e.target.value })}
                className="bg-zinc-800/50 border-zinc-800/50 text-white h-20 text-sm placeholder:text-zinc-300 resize-none"
                placeholder="Enter scene description"
              />
            </div>
            <div>
              <Label className="text-xs text-zinc-300 mb-2 block">Select Member</Label>
              <Select value={currentScene.members} onValueChange={(v) => updateField({ members: v })}>
                <SelectTrigger className="bg-zinc-800/50 border-zinc-800/50 text-white h-10 text-sm">
                  <SelectValue placeholder="Select member" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800">
                  {availableUsers.map((user) => (
                    <SelectItem key={user.id} value={user.id} className="text-white">
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs text-zinc-300 mb-2 block">Select Location</Label>
              <Select value={currentScene.location} onValueChange={(v) => updateField({ location: v })}>
                <SelectTrigger className="bg-zinc-800/50 border-zinc-800/50 text-white h-10 text-sm">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800">
                  <SelectItem value="studio" className="text-white">Studio</SelectItem>
                  <SelectItem value="outdoor" className="text-white">Outdoor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs text-zinc-300 mb-2 block">Select Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal bg-zinc-800/50 border-zinc-800/50 h-10 text-sm hover:bg-zinc-700 hover:text-white",
                        !currentScene.date && "text-zinc-300"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-teal-400" />
                      {currentScene.date ? format(new Date(currentScene.date), "MM/dd/yyyy") : "Date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-zinc-900 border-zinc-800" align="start">
                    <Calendar
                      mode="single"
                      selected={currentScene.date ? new Date(currentScene.date) : undefined}
                      onSelect={(date) => updateField({ date: date ? date.toISOString().split('T')[0] : "" })}
                      initialFocus
                      className="bg-zinc-900 text-white"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label className="text-xs text-zinc-300 mb-2 block">Time</Label>
                <div className="flex gap-2">
                  <Input
                    type="time"
                    value={currentScene.timeFrom}
                    onChange={(e) => updateField({ timeFrom: e.target.value })}
                    className="bg-zinc-800/50 border-zinc-800/50 text-white h-10 text-sm placeholder:text-zinc-300 flex-1"
                  />
                  <span className="text-zinc-300 self-center">-</span>
                  <Input
                    type="time"
                    value={currentScene.timeTo}
                    onChange={(e) => updateField({ timeTo: e.target.value })}
                    className="bg-zinc-800/50 border-zinc-800/50 text-white h-10 text-sm placeholder:text-zinc-300 flex-1"
                  />
                </div>
              </div>
            </div>
            <div>
              <Label className="text-xs text-zinc-300 mb-2 block">Location Type</Label>
              <RadioGroup
                value={currentScene.locationType}
                onValueChange={(v) => updateField({ locationType: v as "indoor" | "outdoor" })}
                className="flex gap-4"
              >
                <div className="flex items-center gap-2 bg-zinc-800/50 border border-zinc-800/50 rounded px-3 py-2">
                  <RadioGroupItem value="indoor" id="indoor" className="border-zinc-700" />
                  <Label htmlFor="indoor" className="text-xs text-zinc-300 cursor-pointer font-normal">Indoor</Label>
                </div>
                <div className="flex items-center gap-2 bg-zinc-800/50 border border-zinc-800/50 rounded px-3 py-2">
                  <RadioGroupItem value="outdoor" id="outdoor" className="border-zinc-700" />
                  <Label htmlFor="outdoor" className="text-xs text-zinc-300 cursor-pointer font-normal">Outdoor</Label>
                </div>
              </RadioGroup>
            </div>
            <div>
              <Label className="text-xs text-zinc-300 mb-2 block">Scene Document</Label>
              <div className="flex items-center justify-between">
                <span className={cn("text-sm", currentFileName ? "text-white" : "text-zinc-400")}>
                  {currentFileName || "No document selected"}
                </span>
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleUploadDocument}
                    className="h-8 px-3 text-xs border-zinc-700 bg-zinc-800/50"
                  >
                    <Upload className="h-3 w-3 mr-1" />
                    {hasDocument ? "Replace" : "Upload"}
                  </Button>
                  {hasDocument && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleRemoveDocument}
                      className="h-8 px-2 text-red-400 hover:text-red-300"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
            {isNew && (
              <Button onClick={handleAddScene} className="w-full bg-green-500 hover:bg-green-600 text-white h-10 text-sm">
                + Add Scene
              </Button>
            )}
          </div>
          {errors.scenes && <p className="text-red-500 text-xs mt-4 px-1">{errors.scenes}</p>}
        </ScrollArea>
        <div className="w-96 flex flex-col border-l border-zinc-800/50">
          <h3 className="p-4 border-b border-zinc-800/50 text-sm font-medium text-zinc-300 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            Document Preview
          </h3>
          <div className="flex-1 overflow-hidden">
            {previewUrl ? (
              <iframe
                src={previewUrl}
                className="w-full h-full border-0"
                title="Document Preview"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-zinc-400 p-8">
                <FileText className="h-12 w-12 mb-4 opacity-50" />
                <p className="text-sm mb-2">No document to preview</p>
                <p className="text-xs">Upload a file to see it here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScriptSceneBuilder;