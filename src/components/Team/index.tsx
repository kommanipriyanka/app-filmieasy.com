import { useEffect, useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "@tanstack/react-router";
import UsersTable from "../an/Team/GetUsers";
import { getAllDepartmentsAPI, createDepartmentAPI, getAllUsersAPI } from "@/http/services/team";

function UserTableContainer() {
  const queryClient = useQueryClient();
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const initialPage = Number(searchParams.get("page")) || 1;
  const initialPageSize = Number(searchParams.get("pageSize")) || 10;
  const initialSearch = searchParams.get("searchString") || "";
  const initialDepartment = searchParams.get("department") || "";
  const initialStatus = searchParams.get("status") || "";
  const initialDate = searchParams.get("date") || "";

  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [searchInput, setSearchInput] = useState(initialSearch);
  const [searchValue, setSearchValue] = useState(initialSearch);
  const [selectedDepartment, setSelectedDepartment] = useState(initialDepartment);
  const [selectedStatus, setSelectedStatus] = useState(initialStatus);
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [sorting, setSorting] = useState([]);

  // Debounce search value
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
    setSelectedDepartment(sp.get("department") || "");
    setSelectedStatus(sp.get("status") || "");
    setSelectedDate(sp.get("date") || "");
  }, [location.search]);

  // Handlers for filters to reset page
  const handleSetDepartment = useCallback((value: string) => {
    setSelectedDepartment(value);
    setPage(1);
  }, []);

  const handleSetStatus = useCallback((value: string) => {
    setSelectedStatus(value);
    setPage(1);
  }, []);

  const handleSetDate = useCallback((value: string) => {
    setSelectedDate(value);
    setPage(1);
  }, []);

  const debouncedSetSearchValue = useCallback((value: string) => {
    setSearchInput(value);
    setPage(1);
  }, []);

  const { data: departmentsData, isLoading: departmentsLoading } = useQuery({
    queryKey: ["departments"],
    queryFn: async () => {
      const response = await getAllDepartmentsAPI();
      return response?.data?.data?.records;
    },
  });

  const { data: usersResponse, isLoading: usersLoading } = useQuery({
    queryKey: ["users", page, pageSize, searchValue, selectedDepartment, selectedStatus, selectedDate],
    queryFn: async () => {
      const paramObj: Record<string, string> = {
        page: page.toString(),
        pageSize: pageSize.toString(),
      };
      if (searchValue) paramObj.searchString = searchValue;
      if (selectedDepartment) paramObj.department = selectedDepartment;
      if (selectedStatus) paramObj.status = selectedStatus;
      if (selectedDate) paramObj.date = selectedDate;
      const params = new URLSearchParams(paramObj);
      const response = await getAllUsersAPI(params.toString());
      return response?.data?.data;
    },
  });

  const createDepartmentMutation = useMutation({
    mutationFn: createDepartmentAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });

  const handleCreateDepartment = (name: string) => {
    createDepartmentMutation.mutate(name);
  };

  const transformedUsers = (usersResponse?.records || []).map((user: any) => ({
    id: user.id,
    fullName: user.full_name,
    email: user.email,
    gender: "male",
    department: user.department?.name || "",
    phone: user.phone,
    dob: user.DOB,
    address: user.address || "",
    charges: "$0/Day",
    status: "available"
  }));
  const paginationInfo = usersResponse?.pagination_info || {
    total_records: 0,
    total_pages: 0,
    current_page: page,
    page_size: pageSize,
    next_page: null,
    prev_page: null
  };

  const departmentsWithCount = [
    { id: "all", name: "All", count: paginationInfo.total_records },
    ...(departmentsData || []).map((dept) => ({
      id: dept.id,
      name: dept.name,
      count: transformedUsers.filter(
        (user: any) => user.department.toLowerCase() === dept.name.toLowerCase()
      ).length,
    })),
  ];

  // Update URL params when relevant states change
  useEffect(() => {
    const params: Record<string, any> = {
      page,
      pageSize,
    };
    if (searchValue) params.searchString = searchValue;
    if (selectedDepartment) params.department = selectedDepartment;
    if (selectedStatus) params.status = selectedStatus;
    if (selectedDate) params.date = selectedDate;
    navigate({ to: "/team", search: params });
  }, [page, pageSize, searchValue, selectedDepartment, selectedStatus, selectedDate, navigate]);

  return (
    <UsersTable
      data={transformedUsers}
      paginationInfo={paginationInfo}
      page={page}
      pageSize={pageSize}
      setPage={setPage}
      setPageSize={setPageSize}
      searchValue={searchValue}
      setSearchValue={debouncedSetSearchValue}
      selectedDate={selectedDate}
      setSelectedDate={handleSetDate}
      selectedDepartment={selectedDepartment}
      setSelectedDepartment={handleSetDepartment}
      selectedStatus={selectedStatus}
      setSelectedStatus={handleSetStatus}
      sorting={sorting}
      setSorting={setSorting}
      isLoading={usersLoading || departmentsLoading}
      departments={departmentsWithCount}
      onCreateDepartment={handleCreateDepartment}
      isCreatingDepartment={createDepartmentMutation.isPending}
    />
  );
}

export default UserTableContainer;