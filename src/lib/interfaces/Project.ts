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