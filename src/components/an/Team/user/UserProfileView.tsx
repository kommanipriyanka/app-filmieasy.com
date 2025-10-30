import { Badge } from "@/components/ui/badge";
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

interface UserProfile {
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

interface Project {
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

interface UserProfileViewProps {
  profile: UserProfile | null;
  projects: Project[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  projectFilter: string;
  setProjectFilter: (filter: string) => void;
  isLoading: boolean;
}

function UserProfileView({
  profile,
  projects,
  activeTab,
  setActiveTab,
  isLoading,
}: UserProfileViewProps) {
  if (isLoading || !profile) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-zinc-500">Loading...</div>
      </div>
    );
  }

  const statusColors: Record<string, string> = {
    available: "bg-green-500/20 text-green-400 border-green-500/30",
    unavailable: "bg-red-500/20 text-red-400 border-red-500/30",
    "partially-available": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex min-h-screen">
        <aside className="w-[300px] border-r border-zinc-800/50 bg-zinc-950/50 p-6 flex flex-col gap-6">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="w-20 h-20 border-2 border-zinc-800">
              <AvatarImage src={profile.avatar} alt={profile.name} />
              <AvatarFallback className="bg-zinc-900 text-zinc-400 text-xl">
                {profile.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h1 className="text-xl font-semibold text-white mb-2">
                {profile.name}
              </h1>
              <Badge
                className={`${
                  statusColors[profile.status] ||
                  "bg-zinc-500/20 text-zinc-400 border-zinc-500/30"
                } border rounded-full px-3 py-1 text-xs font-medium capitalize`}
              >
                {profile.status.replace("-", " ")}
              </Badge>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <svg
                className="w-4 h-4 text-zinc-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="text-zinc-400 capitalize">{profile.gender}</span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <svg
                className="w-4 h-4 text-zinc-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-zinc-400">{profile.dob}</span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <svg
                className="w-4 h-4 text-zinc-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="text-zinc-400 text-xs">{profile.email}</span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <svg
                className="w-4 h-4 text-zinc-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span className="text-zinc-400">{profile.phone}</span>
            </div>

            <div className="flex items-start gap-3 text-sm">
              <svg
                className="w-4 h-4 text-zinc-500 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="text-zinc-400 text-xs">{profile.address}</span>
            </div>
          </div>

          <div className="pt-6 border-t border-zinc-800/50">
            <h3 className="text-sm font-semibold text-white mb-4">
              Professional Details
            </h3>

            <div className="space-y-4">
              <div>
                <p className="text-xs text-zinc-500 mb-2">Department</p>
                <Badge className="bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-800">
                  {profile.department}
                </Badge>
              </div>

              <div>
                <p className="text-xs text-zinc-500 mb-2">Languages Known</p>
                <div className="flex flex-wrap gap-2">
                  {profile.languages.map((lang) => (
                    <Badge
                      key={lang}
                      className="bg-purple-500/20 text-purple-300 border-purple-500/30 hover:bg-purple-500/20"
                    >
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs text-zinc-500 mb-2">Role Type</p>
                <Badge className="bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-800">
                  {profile.roleType}
                </Badge>
              </div>

              <div>
                <p className="text-xs text-zinc-500 mb-2">Talent Tags</p>
                <div className="flex flex-wrap gap-2">
                  {profile.talentTags.map((tag) => (
                    <Badge
                      key={tag}
                      className="bg-pink-500/20 text-pink-300 border-pink-500/30 hover:bg-pink-500/20"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs text-zinc-500 mb-2">Acting Experience</p>
                <Badge className="bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-800">
                  {profile.experience}
                </Badge>
              </div>

              <div>
                <p className="text-xs text-zinc-500 mb-2">
                  Association Membership
                </p>
                <Badge className="bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-800">
                  {profile.association}
                </Badge>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 bg-zinc-950">
          <div className="border-b border-zinc-800/50">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-transparent border-0 h-14 px-6">
                <TabsTrigger
                  value="projects"
                  className="data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none px-6 text-zinc-400"
                >
                  Projects
                </TabsTrigger>
                <TabsTrigger
                  value="payment-info"
                  className="data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none px-6 text-zinc-400"
                >
                  Payment Info Snapshot
                </TabsTrigger>
                <TabsTrigger
                  value="call-sheet"
                  className="data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none px-6 text-zinc-400"
                >
                  Call Sheet & Scheduling
                </TabsTrigger>
                <TabsTrigger
                  value="documents"
                  className="data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none px-6 text-zinc-400"
                >
                  Documents & Files
                </TabsTrigger>
                <TabsTrigger
                  value="notes"
                  className="data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none px-6 text-zinc-400"
                >
                  Notes & Observations
                </TabsTrigger>
                <TabsTrigger
                  value="rating"
                  className="data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none px-6 text-zinc-400"
                >
                  Rating & Review
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="p-6">
            {activeTab === "projects" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                {projects.map((project) => (
                  <Card
                    key={project.id}
                    className="bg-zinc-900/50 border-zinc-800/50 overflow-hidden hover:border-zinc-700 transition-colors cursor-pointer group"
                  >
                    <div className="aspect-[3/4] relative overflow-hidden bg-zinc-900">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4 space-y-3">
                      <div>
                        <p className="text-xs text-zinc-500 mb-1">
                          Project Name
                        </p>
                        <p className="text-sm font-medium text-white">
                          {project.name}
                        </p>
                      </div>
                      <Badge
                        className={`${
                          project.status === "Pre Production"
                            ? "bg-orange-500/20 text-orange-400 border-orange-500/30"
                            : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                        } border text-xs`}
                      >
                        {project.status}
                      </Badge>
                      <div className="flex items-center -space-x-2">
                        {project.teamMembers.slice(0, 3).map((member, idx) => (
                          <Avatar
                            key={member.id}
                            className="w-7 h-7 border-2 border-zinc-900"
                          >
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback className="bg-zinc-800 text-zinc-400 text-xs">
                              {member.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        {project.teamMembers.length > 3 && (
                          <div className="w-7 h-7 rounded-full bg-zinc-800 border-2 border-zinc-900 flex items-center justify-center">
                            <span className="text-xs text-zinc-400">
                              +{project.teamMembers.length - 3}
                            </span>
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500">
                          {project.startDate} – {project.endDate}
                        </p>
                        <p className="text-xs text-zinc-400 mt-1">
                          {project.budget} / {project.spent} ({project.percentage}%)
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {activeTab !== "projects" && (
              <div className="flex items-center justify-center h-64 text-zinc-500">
                Content for {activeTab} tab
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default UserProfileView;