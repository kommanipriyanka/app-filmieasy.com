import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { createProjectAPI } from "@/http/services/projects";
import AddProjectForm from "../an/projects/AddProjectForm";
import { getAllUsersAPI } from "@/http/services/team";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import { FormData } from "@/lib/interfaces/AddProject";
import {
  getFileAPI,
  getS3UploadUrl,
  uploadToPresignedUrl,
} from "@/http/services/file";

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
    profileImage: "",
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
        : [];
      const language = !isEmpty(data.project?.language)
        ? data.project.language
        : null;
      const languages = language ? [language] : [];
      const estimatedBudget = !isEmpty(data.project?.estimatedBudget)
        ? Number(data.project.estimatedBudget)
        : null;
      const scenesRaw = !isEmpty(data.script?.scenes)
        ? data.script.scenes.filter((s: any) => !isEmpty(s.name))
        : [];
      const projectScenes =
        scenesRaw.length > 0
          ? scenesRaw.map((s: any) => {
              const scene: any = {
                name: s.name,
                description: s.description,
              };

              if (s.date) {
                scene.start_date = s.date;
                scene.end_date = s.date;
              }
              if (s.members && s.members.length > 0) {
                scene.scene_members = s.members.map((id: string) => Number(id));
              }
              if (s.uploadedDocument) {
                scene.scene_path = s.uploadedDocument;
              }
              if (s.location) {
                scene.location = s.location;
              }
              if (s.locationType) {
                scene.location_type = s.locationType;
              }
              if (s.timeFrom) {
                scene.time_from = s.timeFrom;
              }
              if (s.timeTo) {
                scene.time_to = s.timeTo;
              }

              return scene;
            })
          : [];
      const payload: any = {
        name: data.project?.name || null,
        ...(!isEmpty(data.project?.description)
          ? { description: data.project.description }
          : {}),
        ...(!isEmpty(data.project?.genre) ? { genre: data.project.genre } : {}),
        ...(languages.length > 0 ? { languages } : {}),
        ...(estimatedBudget ? { estimated_budget: estimatedBudget } : {}),
        ...(startDateFormatted ? { start_date: startDateFormatted } : {}),
        ...(endDateFormatted ? { end_date: endDateFormatted } : {}),
        ...(!isEmpty(data.project?.status)
          ? { status: data.project.status }
          : {}),
        ...(!isEmpty(data.project?.profileImage) &&
        !data.project?.profileImage.startsWith("data:image/")
          ? { project_logo: data.project.profileImage }
          : {}),
        ...(members.length > 0 ? { team_members: members } : {}),
        ...(projectScenes.length > 0 ? { project_scenes: projectScenes } : {}),
        ...(!isEmpty(data.script?.screenplayTitle)
          ? { screenplay_title: data.script.screenplayTitle }
          : {}),
        ...(!isEmpty(data.script?.screenplaySubtitle)
          ? { screenplay_subtitle: data.script.screenplaySubtitle }
          : {}),
      };

      Object.keys(payload).forEach((key) => {
        if (payload[key] === null || payload[key] === undefined) {
          delete payload[key];
        }
      });
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
      setCurrentStep(1);
      toast.error("Failed to create project");
      if (error?.data?.status === 422) {
        const errData = error?.data?.errData;
        if (!errData) return;
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
            case "project_scenes":
            case "scenes":
              fieldKey = "scenes";
              break;
            case "project_logo":
              fieldKey = "profileImage";
              break;
            default:
              fieldKey = key;
          }
          transformedErrors[fieldKey] = message as string;
        });
        setErrors(transformedErrors);
      } else {
        setErrors({ general: error?.message || "An error occurred" });
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

  const handleFileUpload = async (file: File) => {
    if (!file) return null;
    const s3Data = {
      name: file.name,
      contentType: file.type,
    };
    try {
      const response = await getS3UploadUrl(s3Data);
      const signedUrl = response?.data?.data?.uploadUrl;
      const fileKey = response?.data?.data?.path;
      if (!signedUrl) throw new Error("Failed to get signed upload URL");
      await uploadToPresignedUrl(signedUrl, file);
      const resp = await getFileAPI(fileKey);
      console.log(resp.data.data,"resp");
      return resp?.data?.path || resp?.data?.fileKey || fileKey;

    } catch (error: any) {
      toast.error(error.message || "File upload failed");
      return null;
    }
  };

  const handleImageUpload = async (file: File) => {
    const path = await handleFileUpload(file);
    if (path) {
      clearFieldErrors(["profileImage"]);
      updateFormData({
        project: { ...formData.project, profileImage: path },
      });
    }
    return path;
  };

  const onUploadDocument = async (file: File) => {
    return await handleFileUpload(file);
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

  const addScene = (sceneData?: Partial<FormData["script"]["scenes"][0]>) => {
    clearFieldErrors(["scenes"]);

    const newScene = sceneData || {
      name: "",
      description: "",
      members: [],
      location: "",
      date: "",
      timeFrom: "",
      timeTo: "",
      locationType: "indoor" as const,
      uploadedDocument: null,
    };

    updateFormData({
      script: {
        ...formData.script,
        scenes: [
          ...formData.script.scenes,
          newScene as FormData["script"]["scenes"][0],
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

  if (usersLoading) {
    return <div>Loading...</div>;
  }

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
      onUploadFile={onUploadDocument}
      onUploadDocument={onUploadDocument}
      onNext={nextStep}
      onPrev={prevStep}
      onSubmit={handleSubmit}
      handleImageUpload={handleImageUpload}
      isLoading={isLoading}
      errors={errors}
    />
  );
}

export default AddProject;
