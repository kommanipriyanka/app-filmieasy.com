import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import screen1 from "@/assets/screen1.webp";
import screen2 from "@/assets/screen1.webp";
import screen3 from "@/assets/screen1.webp";
import ProjectDetails from "./ProjectDetails";
import CrewArtists from "./TeamFormData";
import ScriptSceneBuilder from "./ScriptSceneBuilder";

interface FormData {
  project: {
    name: string;
    status: string;
    genre: string;
    language: string;
    description: string;
    startDate: string;
    endDate: string;
    estimatedBudget: string;
  };
  team: {
    members: { userId: string }[];
  };
  script: {
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
  };
}

interface AddProjectFormProps {
  currentStep: number;
  formData: FormData;
  availableUsers: { id: string; name: string; department: string; image?: string }[];
  onUpdateProject: (updates: Partial<FormData["project"]>) => void;
  onAddTeamMember: (userId: string) => void;
  onRemoveTeamMember: (index: number) => void;
  onUpdateTeamMember: (index: number, updates: Partial<{ department: string; role: string }>) => void;
  onAddScene: () => void;
  onRemoveScene: (index: number) => void;
  onUpdateScene: (index: number, updates: Partial<FormData["script"]["scenes"][0]>) => void;
  onUpdateScreenplay: (updates: Partial<FormData["script"] & { screenplayTitle?: string; screenplaySubtitle?: string }>) => void;
  onNext: () => void;
  onPrev: () => void;
  onSubmit: () => void;
  isLoading: boolean;
  errors: Record<string, string>;
}

function AddProjectForm({
  currentStep,
  formData,
  availableUsers,
  onUpdateProject,
  onAddTeamMember,
  onRemoveTeamMember,
  onUpdateTeamMember,
  onAddScene,
  onRemoveScene,
  onUpdateScene,
  onUpdateScreenplay,
  onNext,
  onPrev,
  onSubmit,
  isLoading,
  errors,
}: AddProjectFormProps) {
  const navigate = useNavigate();

  const backgroundImages = [screen1, screen2, screen3];
  const currentBg = backgroundImages[currentStep - 1] || screen1;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-black/80">
      <div className="w-full max-w-7xl mx-auto h-[95vh] bg-zinc-900/20 border border-zinc-800 rounded-lg p-4 relative overflow-hidden">
        <img
          src={currentBg}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover rounded-lg"
        />
        
        <div className="relative z-10 h-full flex flex-col">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-3 gap-2">
            <Button
              onClick={() => navigate({ to: "/projects" })}
              variant="ghost"
              className="text-white h-8 px-3 text-sm"
            >
              ← Back
            </Button>
            <div className="flex items-center space-x-2 flex-wrap gap-2">
              {currentStep > 1 && (
                <Button onClick={onPrev} disabled={isLoading} className="h-8 px-4 text-sm">
                  Previous
                </Button>
              )}
              {currentStep < 3 ? (
                <Button onClick={onNext} disabled={isLoading} className="h-8 px-4 text-sm bg-zinc">
                  Next
                </Button>
              ) : (
                <Button onClick={onSubmit} disabled={isLoading} className="h-8 px-4 text-sm">
                  {isLoading ? "Submitting..." : "Submit"}
                </Button>
              )}
            </div>
          </div>
          
          <div className="flex justify-center mb-3 overflow-x-auto pb-2 gap-4">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className="flex items-center gap-2 whitespace-nowrap"
              >
                <div
                  className={cn(
                    "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-medium",
                    currentStep === step
                      ? "bg-green-500 text-white"
                      : currentStep > step
                        ? "bg-green-500 text-white"
                        : "bg-zinc-700 text-zinc-400"
                  )}
                >
                  {step}
                </div>
                <span className="text-xs text-zinc-300 capitalize">
                  {
                    [
                      "Project Details",
                      "Crew & Artists",
                      "Script & Scene Builder",
                    ][step - 1]
                  }
                </span>
              </div>
            ))}
          </div>
          
          <div className={`flex-1 ${currentStep === 2 ? 'overflow-hidden' : 'overflow-y-auto pr-2'}`}>
            {currentStep === 1 && (
              <ProjectDetails
                formData={formData.project}
                onUpdate={onUpdateProject}
                errors={errors}
              />
            )}
            {currentStep === 2 && (
              <CrewArtists
                formData={formData.team}
                availableUsers={availableUsers}
                onAddTeamMember={onAddTeamMember}
                onRemoveTeamMember={onRemoveTeamMember}
                onUpdateTeamMember={onUpdateTeamMember}
                errors={errors}
              />
            )}
            {currentStep === 3 && (
              <ScriptSceneBuilder
                formData={formData.script}
                onAddScene={onAddScene}
                onRemoveScene={onRemoveScene}
                onUpdateScene={onUpdateScene}
                onUpdateScreenplay={onUpdateScreenplay}
                errors={errors}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProjectForm;