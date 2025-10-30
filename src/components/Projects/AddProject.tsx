import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { createProjectAPI } from "@/http/services/projects";
import AddProjectForm from "../an/projects/AddProjectForm";
import { getAllUsersAPI } from "@/http/services/team";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

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

const initialFormData: FormData = {
  project: {
    name: "",
    status: "",
    genre: "",
    language: "",
    description: "",
    startDate: "",
    endDate: "",
    estimatedBudget: "",
  },
  team: {
    members: [],
  },
  script: {
    scenes: [],
    screenplayTitle: "",
    screenplaySubtitle: "",
  },
};

function AddProject() {
  const queryClient = useQueryClient();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const { data: availableUsersData, isLoading: usersLoading } = useQuery({
    queryKey: ["availableUsers"],
    queryFn: async () => {
      const response = await getAllUsersAPI();
      return response?.data?.data?.records || [];
    },
  });

  const availableUsers = (availableUsersData || []).map((user: any) => ({
    id: user.id,
    name: user.full_name,
    department: user.department?.name || "",
    image: user.profileImage,
  }));

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const isEmpty = (value: any): boolean => {
        return (
          value === undefined ||
          value === null ||
          value === "" ||
          (Array.isArray(value) && value.length === 0)
        );
      };

      const startDateFormatted = !isEmpty(data.project?.startDate)
        ? data.project.startDate
        : null;
      const endDateFormatted = !isEmpty(data.project?.endDate)
        ? data.project.endDate
        : null;

      const members = !isEmpty(data.team?.members)
        ? data.team.members.map((m: any) => Number(m.userId))
        : null;

      const scenes = !isEmpty(data.script?.scenes)
        ? data.script.scenes.filter((s: any) => !isEmpty(s.name))
        : null;

      const payload = {
        name: isEmpty(data.project?.name) ? null : data.project.name,
        status: data.project?.status ? data.project.status : undefined,
        genre: data.project?.genre ? data.project.genre : undefined,
        language: data.project?.language ? data.project.language : undefined,
        description: data.project?.description
          ? data.project.description
          : undefined,
        ...(startDateFormatted ? { start_date: startDateFormatted } : {}),
        ...(endDateFormatted ? { end_date: endDateFormatted } : {}),
        ...(data.project?.estimatedBudget
          ? { estimated_budget: data.project.estimatedBudget }
          : {}),
        ...(data.project?.genre ? { genre: data.project.genre } : {}),
        ...(data.project?.language ? { language: data.project.language } : {}),
        ...(data.project?.description
          ? { description: data.project.description }
          : {}),
        ...(members ? { team_members: members } : {}),

        ...(scenes ? { scenes: scenes } : {}),
        ...(data.script?.screenplayTitle
          ? { screenplay_title: data.script.screenplayTitle }
          : {}),
        ...(data.script?.screenplaySubtitle
          ? { screenplay_subtitle: data.script.screenplaySubtitle }
          : {}),
      };

      return createProjectAPI(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project created successfully");
      setCurrentStep(1);
      setFormData(initialFormData);
      setErrors({});
      navigate({ to: "/projects" });
    },
    onError: (error: any) => {
      console.log(error?.data, "error adfjdsf");
      if (error?.data?.status === 422) {
        const errData = error.data.errData;
        const transformedErrors: Record<string, string> = {};
        Object.entries(errData).forEach(([key, message]) => {
          let fieldKey: string;
          switch (key) {
            case "name":
              fieldKey = "name";
              break;
            case "start_date":
              fieldKey = "startDate";
              break;
            case "team_members":
              fieldKey = "team";
              break;
            case "scenes":
              fieldKey = "scenes";
              break;
            default:
              fieldKey = key;
          }
          transformedErrors[fieldKey] = message as string;
        });
        setErrors(transformedErrors);
        console.log(transformedErrors);
      } else {
        setErrors({ general: error.message || "An error occurred" });
      }
    },
  });

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const clearFieldErrors = (fieldKeys: string[]) => {
    const newErrors = { ...errors };
    fieldKeys.forEach((key) => {
      delete newErrors[key];
    });
    setErrors(newErrors);
  };

  const updateProject = (updates: Partial<FormData["project"]>) => {
    const fieldKeys = Object.keys(updates) as (keyof FormData["project"])[];
    clearFieldErrors(fieldKeys.map((k) => k.toString()));
    updateFormData({ project: { ...formData.project, ...updates } });
  };

  const addTeamMember = (userId: string) => {
    clearFieldErrors(["team"]);
    updateFormData({
      team: { members: [...formData.team.members, { userId }] },
    });
  };

  const removeTeamMember = (index: number) => {
    clearFieldErrors(["team"]);
    const members = formData.team.members.filter((_, i) => i !== index);
    updateFormData({ team: { members } });
  };

  const updateTeamMember = (
    index: number,
    updates: Partial<{ department: string; role: string }>
  ) => {
    clearFieldErrors(["team"]);
    const members = formData.team.members.map((m, i) =>
      i === index ? { ...m, ...updates } : m
    );
    updateFormData({ team: { members } });
  };

  const addScene = () => {
    clearFieldErrors(["scenes"]);
    updateFormData({
      script: {
        ...formData.script,
        scenes: [
          ...formData.script.scenes,
          {
            name: "",
            description: "",
            members: [],
            location: "",
            date: "",
            timeFrom: "",
            timeTo: "",
            locationType: "indoor",
          },
        ],
      },
    });
  };

  const removeScene = (index: number) => {
    clearFieldErrors(["scenes"]);
    const scenes = formData.script.scenes.filter((_, i) => i !== index);
    updateFormData({ script: { ...formData.script, scenes } });
  };

  const updateScene = (
    index: number,
    updates: Partial<FormData["script"]["scenes"][0]>
  ) => {
    clearFieldErrors(["scenes"]);
    const scenes = formData.script.scenes.map((s, i) =>
      i === index ? { ...s, ...updates } : s
    );
    updateFormData({ script: { ...formData.script, scenes } });
  };

  const updateScreenplay = (
    updates: Partial<
      Pick<FormData["script"], "screenplayTitle" | "screenplaySubtitle">
    >
  ) => {
    clearFieldErrors(["screenplayTitle", "screenplaySubtitle"]);
    updateFormData({ script: { ...formData.script, ...updates } });
  };

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    mutation.mutate(formData);
  };

  const isLoading = mutation.isPending;
  return (
    <AddProjectForm
      currentStep={currentStep}
      formData={formData}
      availableUsers={availableUsers}
      onUpdateProject={updateProject}
      onAddTeamMember={addTeamMember}
      onRemoveTeamMember={removeTeamMember}
      onUpdateTeamMember={updateTeamMember}
      onAddScene={addScene}
      onRemoveScene={removeScene}
      onUpdateScene={updateScene}
      onUpdateScreenplay={updateScreenplay}
      onNext={nextStep}
      onPrev={prevStep}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      errors={errors}
    />
  );
}

export default AddProject;
