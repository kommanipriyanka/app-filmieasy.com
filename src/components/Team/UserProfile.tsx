import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation, useNavigate } from "@tanstack/react-router";
import { getUserProfileAPI, getUserProjectsAPI } from "@/http/services/team";
import UserProfileView from "../an/Team/user/UserProfileView";

function UserProfile() {
  const { id } = useParams({ strict: false });
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const initialTab = searchParams.get("tab") || "projects";

  const [activeTab, setActiveTab] = useState(initialTab);

  // Sync activeTab with URL changes
  useEffect(() => {
    const tab = new URLSearchParams(location.search).get("tab") || "projects";
    setActiveTab(tab);
  }, [location.search]);

  // Fetch user profile
  const { data: userProfile, isLoading: profileLoading, error: profileError } = useQuery({
    queryKey: ["userProfile", id],
    queryFn: async () => {
      if (!id) throw new Error("User ID is required");
      const response = await getUserProfileAPI(id.toString());
      return response?.data?.data;
    },
    enabled: !!id,
  });

  // Fetch user projects
  const { data: projectsData, isLoading: projectsLoading, error: projectsError } = useQuery({
    queryKey: ["userProjects", id],
    queryFn: async () => {
      if (!id) throw new Error("User ID is required");
      const response = await getUserProjectsAPI(id.toString());
      return response?.data?.data?.records || [];
    },
    enabled: !!id,
  });

  // Transform profile data
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

  // Transform projects data
  const transformedProjects = (projectsData || []).map((project: any) => ({
    id: project.id,
    name: project.name,
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
    navigate({
      search: (prev)  => ({ ...prev, tab }),
    });
  };

  
  if (profileError || projectsError) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-red-400">
          Error loading user profile. Please try again.
        </div>
      </div>
    );
  }

  return (
    <UserProfileView
      profile={transformedProfile}
      projects={transformedProjects}
      activeTab={activeTab}
      setActiveTab={handleTabChange}
      isLoading={profileLoading || projectsLoading}
    />
  );
}

export default UserProfile;