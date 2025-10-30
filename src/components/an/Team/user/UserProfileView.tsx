import UserProfileContent from "./UserProfileContent";
import UserProfileSidebar from "./UserProfileSideBar";
import screen1 from "@/assets/screen1.webp";

interface UserProfile {
  name?: string;
  status?: string;
  gender?: string;
  dob?: string;
  email?: string;
  phone?: string;
  address?: string;
  avatar?: string;
  department?: string;
  languages?: string[];
  roleType?: string;
  talentTags?: string[];
  experience?: string;
  association?: string;
}

interface TeamMember {
  id: string | number;
  name: string;
  avatar?: string;
}

interface Project {
  id: string | number;
  name: string;
  image?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  budget?: string | number;
  spent?: string | number;
  percentage?: number;
  teamMembers?: TeamMember[];
}

interface UserProfileViewProps {
  profile: UserProfile | null;
  projects: Project[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isLoading: boolean;
}

function UserProfileView({ 
  profile, 
  projects, 
  activeTab, 
  setActiveTab, 
  isLoading 
}: UserProfileViewProps) {
  if (isLoading || !profile) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-zinc-600 border-t-white rounded-full animate-spin mb-4"></div>
          <div className="text-zinc-500">Loading user profile...</div>
        </div>
      </div>
    );
  }

  return (
<div className="relative min-h-screen bg-black text-white overflow-hidden">
  {/* Background image */}
  <img
    src={screen1}
    alt="Background"
 className="absolute inset-0 w-full h-full object-cover brightness-100"
  />

  {/* Overlay content */}
  <div className="relative flex flex-col lg:flex-row min-h-screen">
    <UserProfileSidebar profile={profile} />
    <UserProfileContent 
      projects={projects} 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
    />
  </div>
</div>

  );
}

export default UserProfileView;