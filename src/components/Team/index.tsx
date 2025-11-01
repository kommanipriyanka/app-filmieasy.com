import { useState, useEffect, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "@tanstack/react-router";
import UsersTable from "../an/Team/GetUsers";
import { getAllDepartmentsAPI, createDepartmentAPI, getAllUsersAPI } from "@/http/services/team";
import { toast } from "sonner";

interface UserTableContainerProps {
  users?: any[];
  isProjectView?: boolean;
}

function UserTableContainer({ users: projectUsers, isProjectView = false }: UserTableContainerProps) {
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
  const [searchValue, setSearchValue] = useState(initialSearch);
  const [selectedDepartment, setSelectedDepartment] = useState(initialDepartment);
  const [selectedStatus, setSelectedStatus] = useState(initialStatus);
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [sorting, setSorting] = useState([]);
  const [departmentError, setDepartmentError] = useState<string | null>(null);
  const [departmentSuccess, setDepartmentSuccess] = useState(false);

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
    setSearchValue(value);
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
    enabled: !isProjectView,
  });

  const createDepartmentMutation = useMutation({
    mutationFn: createDepartmentAPI,
    onSuccess: () => {
      setDepartmentError(null);
      setDepartmentSuccess(true);
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      toast.success("Department added successfully");
    },
    onError: (error: any) => {
      const errorMessage = error.data?.message || 'Failed to create department';
      setDepartmentError(errorMessage);
      if (error.data?.status === 422 || error.data?.status === 409) {
        toast.error(error.data.message);
      } else {
        toast.error('An unexpected error occurred');
      }
    },
  });

  const handleCreateDepartment = (name: string) => {
    createDepartmentMutation.mutate(name);
  };

  const rawUsers = isProjectView
    ? (projectUsers || [])
    : (usersResponse?.records || []);
  const allTransformedUsers = rawUsers.map((user: any) => ({
    id: user.id,
    fullName: user.full_name,
    email: user.email,
    gender: user.gender,
    department: user.department?.name,
    phone: user.phone,
    dob: user.DOB,
    address: user.address,
    charges: user.charges,
    status: user.status,
  }));
  
  let filteredUsers = [...allTransformedUsers];
  
  if (isProjectView) {
    if (searchValue) {
      filteredUsers = filteredUsers.filter(user =>
        user.fullName?.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.phone?.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
   
    if (selectedDepartment) {
      filteredUsers = filteredUsers.filter(user =>
        user.department?.toLowerCase() === selectedDepartment.toLowerCase()
      );
    }
   
    if (selectedStatus) {
      filteredUsers = filteredUsers.filter(user =>
        user.status?.toLowerCase() === selectedStatus.toLowerCase()
      );
    }
  }

  let paginatedUsers: any[];
  let paginationInfo: any;
  if (isProjectView) {
    const totalRecords = filteredUsers.length;
    const totalPages = Math.ceil(totalRecords / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
   
    paginatedUsers = filteredUsers.slice(startIndex, endIndex);
   
    paginationInfo = {
      total_records: totalRecords,
      total_pages: totalPages,
      current_page: page,
      page_size: pageSize,
      next_page: page < totalPages ? page + 1 : null,
      prev_page: page > 1 ? page - 1 : null,
    };
  } else {
    paginatedUsers = allTransformedUsers;
    paginationInfo = usersResponse?.pagination_info || {
      total_records: 0,
      total_pages: 0,
      current_page: page,
      page_size: pageSize,
      next_page: null,
      prev_page: null,
    };
  }

  const departmentsWithCount = [
    {
      id: "all",
      name: "All",
      count: isProjectView ? allTransformedUsers.length : paginationInfo.total_records
    },
    ...(departmentsData || []).map((dept) => ({
      id: dept.id,
      name: dept.name,
      count: allTransformedUsers.filter(
        (user: any) => user.department?.toLowerCase() === dept.name.toLowerCase()
      ).length,
    })),
  ];

  useEffect(() => {
    if (location.pathname === "/team") {
      const params: Record<string, any> = {
        page,
        pageSize,
      };
      if (searchValue) params.searchString = searchValue;
      if (selectedDepartment) params.departmentId = Number(selectedDepartment);
      if (selectedStatus) params.status = selectedStatus;
      if (selectedDate) params.date = selectedDate;
      navigate({ to: "/team", search: params });
    }
  }, [page, pageSize, searchValue, selectedDepartment, selectedStatus, selectedDate, navigate]);

  const showSidebar = !isProjectView;

  return (
    <UsersTable
      data={paginatedUsers}
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
      isLoading={isProjectView ? false : (usersLoading || departmentsLoading)}
      departments={departmentsWithCount}
      onCreateDepartment={handleCreateDepartment}
      isCreatingDepartment={createDepartmentMutation.isPending}
      departmentError={departmentError}
      departmentSuccess={departmentSuccess}
      onResetSuccess={() => setDepartmentSuccess(false)}
      onClearError={() => setDepartmentError(null)}
      showSidebar={showSidebar}
      isProjectView={isProjectView}
    />
  );
}

export default UserTableContainer;