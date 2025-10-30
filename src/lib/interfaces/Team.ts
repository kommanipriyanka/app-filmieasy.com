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
    sorting: any;
    setSorting: (sorting: any) => void;
    isLoading: boolean;
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
