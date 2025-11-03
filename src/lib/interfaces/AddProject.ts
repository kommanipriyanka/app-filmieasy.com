export interface FormData {
  project: {
    name: string;
    status: string;
    genre: string;
    language: string;
    description: string;
    startDate: string;
    endDate: string;
    estimatedBudget: string;
    profileImage: string;
  };
  team: {
    members: Array<{ userId: string; department?: string; role?: string }>;
  };
  script: {
    scenes: Array<{
      name: string;
      description: string;
      members: string[];
      location: string;
      date: string;
      timeFrom: string;
      timeTo: string;
      locationType: "indoor" | "outdoor";
      uploadedDocument?: string | null;
    }>;
    screenplayTitle: string;
    screenplaySubtitle: string;
  };
}