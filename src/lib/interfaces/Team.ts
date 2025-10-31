export interface UsersTableProps {
    data: any[];
    paginationInfo: any;
    page: number;
    pageSize: number;
    setPage: (page: number) => void;
    setPageSize: (pageSize: number) => void;
    searchValue: string;
    setSearchValue: (searchValue: string) => void;
    selectedDate: string;
    setSelectedDate: (selectedDate: string) => void;
    selectedDepartment: string;
    setSelectedDepartment: (selectedDepartment: string) => void;
    selectedStatus: string;
    setSelectedStatus: (status: string) => void;
    sorting: any;
    setSorting: (sorting: any) => void;
    isLoading: boolean;
    departments: { id: string | number; name: string; count: number }[];
    onCreateDepartment: (name: string) => void;
    isCreatingDepartment: boolean;
    departmentError?: string | null;
    departmentSuccess: boolean;
    onResetSuccess: () => void;
    onClearError: () => void;
    showSidebar: boolean;
}

export interface Department {
  id: number;
  name: string;
}

export interface DepartmentData {
  records: Department[];
}

export interface DepartmentResponse {
  status: number;
  success: boolean;
  message: string;
  data: DepartmentData;
}


export interface Department {
  id: number;
  name: string;
}

export interface DepartmentListData {
  records: Department[];
}

export interface DepartmentListResponse {
  status: number;
  success: boolean;
  message: string;
  data: DepartmentListData;
}

export interface DepartmentCreateResponse {
  status: number;
  success: boolean;
  message: string;
  data: Department;
}


export interface ArtistResponse {
  status: number;
  success: boolean;
  message?: string;
  data: ArtistData;
}

export interface ArtistData {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  gender: "MALE" | "FEMALE" | "OTHER"; 
  DOB: string; 
  address: string | null;
  role_type: string;
  languages: string[];
  experience: string | null;
  department_id: number;
}


export interface UserProfile {
  name: string;
  status: string;
  gender: string;
  dob: string;
  email: string;
  phone: string;
  address: string;
  avatar?: string;
  department: string;
  languages: string[];
  roleType: string;
  talentTags: string[];
  experience: string;
  association: string;
}

export interface Project {
  id: string | number;
  name: string;
  image: string;
  status: string;
  startDate: string;
  endDate: string;
  budget: string;
  spent: string;
  percentage: number;
  teamMembers: { id: string; avatar?: string; name: string }[];
}

export interface UserProfileViewProps {
  profile: UserProfile | null;
  projects: Project[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  projectFilter: string;
  setProjectFilter: (filter: string) => void;
  isLoading: boolean;
}


export interface FormData {
  personal: {
    fullName: string;
    gender: string;
    dob: string;
    address: string;
    phone: string;
    email: string;
    languages: { name: string }[];
    profileImage?: string;
  };
  professional: {
    department: string;
    roleType: string;
    experience: string;
    unionMembership: string;
    status: string;
    blockFrom: string;
    blockTo: string;
  };
  payment: {
    rateType: string;
    currency: string;
    amount: string;
    paymentMethod: string;
    gstPan: string;
    documents: File[];
  };
}

export interface AddUserFormProps {
  currentStep: number;
  formData: FormData;
  departments: { id: string | number; name: string; count: number }[];
  onUpdatePersonal: (updates: Partial<FormData["personal"]>) => void;
  onUpdateProfessional: (updates: Partial<FormData["professional"]>) => void;
  onUpdatePayment: (updates: Partial<FormData["payment"]>) => void;
  onAddLanguage: (name: string) => void;
  onRemoveLanguage: (index: number) => void;
  onUpdateLanguage: (index: number, name: string) => void;
  onAddDocument: (file: File) => void;
  onRemoveDocument: (index: number) => void;
  onNext: () => void;
  onPrev: () => void;
  onSubmit: () => void;
  isLoading: boolean;
  errors: Record<string, string>;
}