export interface Project {
  id: string;
  name: string;
  description: string;
  timeline: string;
  budget: string;
  members: string;
  scenes: string;
  status: string;
  address: string;
  image?: string;
}

export interface ProjectsTableProps {
  data: Project[];
  paginationInfo: {
    total_records: number;
    total_pages: number;
    current_page: number;
    page_size: number;
    next_page: number | null;
    prev_page: number | null;
  };
  page: number;
  pageSize: number;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  sorting: any[];
  setSorting: (sorting: any[]) => void;
  isLoading: boolean;
}

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

export interface AddProjectFormProps {
  currentStep: number;
  formData: FormData;
  availableUsers: { id: string; name: string; department: string; image?: string }[];
  onUpdateProject: (updates: Partial<FormData["project"]>) => void;
  onAddTeamMember: (userId: string) => void;
  onRemoveTeamMember: (index: number) => void;
  onUpdateTeamMember: (index: number, updates: Partial<{ department: string; role: string }>) => void;
  onAddScene: () => void;
  onRemoveScene: (index: number) => void;
  onUploadFile: (file: File) => Promise<string | null>;
  onUpdateScene: (index: number, updates: Partial<FormData["script"]["scenes"][0]>) => void;
  onUpdateScreenplay: (updates: Partial<FormData["script"] & { screenplayTitle?: string; screenplaySubtitle?: string }>) => void;
  onNext: () => void;
  onUploadDocument: (file: File | any) => void;
  onPrev: () => void;
  onSubmit: () => void;
  handleImageUpload: (file: File) => void;
  isLoading: boolean;
  errors: Record<string, string>;
}


export interface ProjectData {
  id: number;
  name: string;
  description: string;
  genre: string;
  languages: string[];
  start_date: string;
  end_date: string;
  status: string;
  estimated_budget: number | null;
  created_by: number;
  created_at: string;
  updated_at: string;
}

export interface UserData {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  gender: string;
  DOB: string;
  address: string | null;
  role_type: string;
  languages: string[];
  experience: any;
  department_id: number;
  invited_by: number;
  created_at: string;
  updated_at: string;
  department: {
    name: string;
  };
}

export interface Props {
  projectData?: ProjectData;
  projectUsersData: UserData[];
}


export interface ProjectFormData {
  name: string;
  status: string;
  genre: string;
  language: string;
  description: string;
  startDate: string;
  endDate: string;
  estimatedBudget: string;
  profileImage?: string;
}

export interface ProjectDetailsProps {
  formData: ProjectFormData;
  onUpdate: (updates: Partial<ProjectFormData>) => void;
  errors: Record<string, string>;
  handleImageUpload: (file: File) => void;
}
