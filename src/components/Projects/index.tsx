import { useEffect, useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "@tanstack/react-router";
import ProjectsTable from "../an/projects/ProjectsTable";
import { getAllProjectsAPI } from "@/http/services/projects";

function ProjectsTableContainer() {
  const queryClient = useQueryClient();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const initialPage = Number(searchParams.get("page")) || 1;
  const initialPageSize = Number(searchParams.get("pageSize")) || 10;
  const initialSearch = searchParams.get("searchString") || "";
  const initialStatus = searchParams.get("status") || "";
  const initialDate = searchParams.get("date") || "";
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [searchInput, setSearchInput] = useState(initialSearch);
  const [searchValue, setSearchValue] = useState(initialSearch);
  const [selectedStatus, setSelectedStatus] = useState(initialStatus);
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [sorting, setSorting] = useState<any[]>([]);

  // Debounce search value for API/query
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchValue(searchInput);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Sync states from URL search params when location changes
  useEffect(() => {
    const sp = new URLSearchParams(location.search);
    setPage(Number(sp.get("page") || 1));
    setPageSize(Number(sp.get("pageSize") || 10));
    const newSearch = sp.get("searchString") || "";
    setSearchInput(newSearch);
    setSearchValue(newSearch);
    setSelectedStatus(sp.get("status") || "");
    setSelectedDate(sp.get("date") || "");
  }, [location.search]);

  // Handlers for filters to reset page
  const handleSetStatus = useCallback((value: string) => {
    setSelectedStatus(value);
    setPage(1);
  }, []);

  const handleSetDate = useCallback((value: string) => {
    setSelectedDate(value);
    setPage(1);
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearchInput(value);
    setPage(1);
  }, []);

  const { data: projectsResponse, isLoading: projectsLoading } = useQuery({
    queryKey: ["projects", page, pageSize, searchValue, selectedStatus, selectedDate],
    queryFn: async () => {
      const paramObj: Record<string, string> = {
        page: page.toString(),
        pageSize: pageSize.toString(),
      };
      if (searchValue) paramObj.searchString = searchValue;
      if (selectedStatus) paramObj.status = selectedStatus;
      if (selectedDate) paramObj.date = selectedDate;
      const params = new URLSearchParams(paramObj);
      const response = await getAllProjectsAPI(params.toString());
      return response?.data?.data;
    },
  });

const transformedProjects = (projectsResponse?.records || []).map((project: any) => ({
  id: project.id,
  name: project.name,
  description: project.description || null,
  timeline: project.start_date && project.end_date 
    ? `${project.start_date} - ${project.end_date}` 
    : null, 
  budget: project.estimated_budget ? `${project.estimated_budget}/100CR` : null,
  members: project.membersCount !== undefined ? `${project.membersCount} Members` : null,
  scenes: project.scenes ? `Scene ${project.scenes}` : null, 
  status: project.status || null, 
  address: project.address || null,
  image: project.image_url || null,
}));

  const paginationInfo = projectsResponse?.pagination_info || {
    total_records: 0,
    total_pages: 0,
    current_page: page,
    page_size: pageSize,
    next_page: null,
    prev_page: null
  };

  useEffect(() => {
    const params: Record<string, any> = {
      page,
      pageSize,
    };
    if (searchValue) params.searchString = searchValue;
    if (selectedStatus) params.status = selectedStatus;
    if (selectedDate) params.date = selectedDate;
    navigate({ to: "/projects", search: params });
  }, [page, pageSize, searchValue, selectedStatus, selectedDate, navigate]);

  return (
    <ProjectsTable
      data={transformedProjects}
      paginationInfo={paginationInfo}
      page={page}
      pageSize={pageSize}
      setPage={setPage}
      setPageSize={setPageSize}
      searchValue={searchInput}
      setSearchValue={handleSearchChange} 
      selectedDate={selectedDate}
      setSelectedDate={handleSetDate}
      selectedStatus={selectedStatus}
      setSelectedStatus={handleSetStatus}
      sorting={sorting}
      setSorting={setSorting}
      isLoading={projectsLoading}
    />
  );
}

export default ProjectsTableContainer;