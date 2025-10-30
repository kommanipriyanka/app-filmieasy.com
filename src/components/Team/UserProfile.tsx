import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation, useNavigate } from "@tanstack/react-router";
import { getUserProjectsAPI } from "@/http/services/team";

function UserProfile() {
  const { userId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const initialTab = searchParams.get("tab") || "projects";
  const initialFilter = searchParams.get("filter") || "all";

  const [activeTab, setActiveTab] = useState(initialTab);
  const [projectFilter, setProjectFilter] = useState(initialFilter);

  useEffect(() => {
    const sp = new URLSearchParams(location.search);
    setActiveTab(sp.get("tab") || "projects");
    setProjectFilter(sp.get("filter") || "all");
  }, [location.search]);

  const { data: userProfile, isLoading: profileLoading } = useQuery({
    queryKey: ["userProfile", userId],
    queryFn: async () => {
      const response = await getUserProfileAPI(userId);
      return response?.data?.data;
    },
  });

  const { data: projectsData, isLoading: projectsLoading } = useQuery({
    queryKey: ["userProjects", userId, projectFilter],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (projectFilter && projectFilter !== "all") {
        params.append("status", projectFilter);
      }
      const response = await getUserProjectsAPI(userId);
      return response?.data?.data?.records;
    },
  });

  const transformedProfile = userProfile ? {
    name: userProfile.full_name,
    status: userProfile.availability_status,
    gender: userProfile.gender,
    dob: userProfile.DOB,
    email: userProfile.email,
    phone: userProfile.phone,
    address: userProfile.address,
    avatar: userProfile.profile_image,
    department: userProfile.department?.name,
    languages: userProfile.languages || [],
    roleType: userProfile.role_type,
    talentTags: userProfile.talent_tags || [],
    experience: userProfile.acting_experience,
    association: userProfile.association_membership,
  } : null;

  const transformedProjects = (projectsData || []).map((project: any) => ({
    id: project.id,
    name: project.project_name,
    image: project.thumbnail_image,
    status: project.status,
    startDate: project.start_date,
    endDate: project.end_date,
    budget: project.budget,
    spent: project.spent,
    percentage: project.budget_percentage,
    teamMembers: project.team_members || [],
  }));

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    const params: Record<string, string> = { tab };
    if (projectFilter !== "all") {
      params.filter = projectFilter;
    }
    navigate({ search: params });
  };

  const handleFilterChange = (filter: string) => {
    setProjectFilter(filter);
    const params: Record<string, string> = { tab: activeTab };
    if (filter !== "all") {
      params.filter = filter;
    }
    navigate({ search: params });
  };

  return (
    <UserProfileView
      profile={transformedProfile}
      projects={transformedProjects}
      activeTab={activeTab}
      setActiveTab={handleTabChange}
      projectFilter={projectFilter}
      setProjectFilter={handleFilterChange}
      isLoading={profileLoading || projectsLoading}
    />
  );
}

export default UserProfile;