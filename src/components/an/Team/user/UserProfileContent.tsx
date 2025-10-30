import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import staticImage from "@/assets/image.webp";

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

interface UserProfileContentProps {
  projects: Project[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

// Project Card Component
const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const getStatusColor = (status?: string) => {
    if (!status) return "bg-zinc-500/20 text-zinc-400 border-zinc-500/30";
    
    const statusLower = status.toLowerCase();
    if (statusLower === "pre production" || statusLower === "todo") {
      return "bg-orange-500/20 text-orange-400 border-orange-500/30";
    }
    return "bg-blue-500/20 text-blue-400 border-blue-500/30";
  };

  return (
    <Card className="bg-zinc-900/50 rounded-2xl border-zinc-800 overflow-hidden hover:border-zinc-700 transition-colors cursor-pointer group">

      <div className="relative overflow-hidden bg-zinc-900">
        <img
          src={project.image || staticImage}
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-300"
        />
      </div>
      
      <div className="p-4 space-y-3">
        <div>
          <p className="text-xs text-zinc-500 mb-1">Project Name</p>
          <p className="text-sm font-medium text-white truncate" title={project.name}>
            {project.name}
          </p>
        </div>
        
        {/* Status Badge */}
        {project.status && (
          <Badge className={`${getStatusColor(project.status)} border text-xs`}>
            {project.status}
          </Badge>
        )}
        
        {/* Team Members */}
        {project.teamMembers && project.teamMembers.length > 0 && (
          <div className="flex items-center -space-x-2">
            {project.teamMembers.slice(0, 3).map((member) => (
              <Avatar
                key={member.id}
                className="w-7 h-7 border-2 border-zinc-900"
              >
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback className="bg-zinc-800 text-zinc-400 text-xs">
                  {member.name?.charAt(0) || '?'}
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
        )}
        
        {/* Date Range */}
        {(project.startDate || project.endDate) && (
          <div>
            <p className="text-xs text-zinc-500">
              {project.startDate && project.endDate 
                ? `${project.startDate} – ${project.endDate}`
                : project.startDate || project.endDate}
            </p>
          </div>
        )}
        
        {/* Budget Information */}
        {(project.budget || project.spent) && (
          <p className="text-xs text-zinc-400">
            {project.budget && project.spent
              ? `${project.budget} / ${project.spent}${project.percentage ? ` (${project.percentage}%)` : ''}`
              : project.budget || project.spent}
          </p>
        )}
      </div>
    </Card>
  );
};

// Empty State Component
const EmptyState: React.FC<{ message: string }> = ({ message }) => (
  <div className="col-span-full flex items-center justify-center h-64 text-zinc-500">
    {message}
  </div>
);

function UserProfileContent({ projects, activeTab, setActiveTab }: UserProfileContentProps) {
  return (
    <main className="flex-1 bg-zinc-950 border-zinc-800 m-4 overflow-hidden rounded-xl flex flex-col">

      <div className="border-b border-zinc-800/50 overflow-x-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-transparent border-0 h-12 lg:h-14 px-4 lg:px-6 inline-flex min-w-full w-max gap-6">
            <TabsTrigger
              value="projects"
              className="relative data-[state=active]:bg-transparent data-[state=active]:text-blue-500 data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-blue-500 rounded-none px-0 text-zinc-400 text-sm whitespace-nowrap border-0 hover:text-zinc-300 transition-colors"
            >
              Projects
            </TabsTrigger>
            <TabsTrigger
              value="payment-info"
              className="relative data-[state=active]:bg-transparent data-[state=active]:text-blue-500 data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-blue-500 rounded-none px-0 text-zinc-400 text-sm whitespace-nowrap border-0 hover:text-zinc-300 transition-colors"
            >
              Payment Info Snapshot
            </TabsTrigger>
            <TabsTrigger
              value="call-sheet"
              className="relative data-[state=active]:bg-transparent data-[state=active]:text-blue-500 data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-blue-500 rounded-none px-0 text-zinc-400 text-sm whitespace-nowrap border-0 hover:text-zinc-300 transition-colors"
            >
              Call Sheet & Scheduling
            </TabsTrigger>
            <TabsTrigger
              value="documents"
              className="relative data-[state=active]:bg-transparent data-[state=active]:text-blue-500 data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-blue-500 rounded-none px-0 text-zinc-400 text-sm whitespace-nowrap border-0 hover:text-zinc-300 transition-colors"
            >
              Documents & Files
            </TabsTrigger>
            <TabsTrigger
              value="notes"
              className="relative data-[state=active]:bg-transparent data-[state=active]:text-blue-500 data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-blue-500 rounded-none px-0 text-zinc-400 text-sm whitespace-nowrap border-0 hover:text-zinc-300 transition-colors"
            >
              Notes & Observations
            </TabsTrigger>
            <TabsTrigger
              value="rating"
              className="relative data-[state=active]:bg-transparent data-[state=active]:text-blue-500 data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-blue-500 rounded-none px-0 text-zinc-400 text-sm whitespace-nowrap border-0 hover:text-zinc-300 transition-colors"
            >
              Rating & Review
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Tab Content */}
      <div className="p-4 lg:p-6 overflow-y-auto flex-1">
        {activeTab === "projects" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {projects && projects.length > 0 ? (
              projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))
            ) : (
              <EmptyState message="No projects found" />
            )}
          </div>
        )}

        {activeTab === "payment-info" && (
          <EmptyState message="Payment information will be displayed here" />
        )}

        {activeTab === "call-sheet" && (
          <EmptyState message="Call sheet and scheduling information will be displayed here" />
        )}

        {activeTab === "documents" && (
          <EmptyState message="Documents and files will be displayed here" />
        )}

        {activeTab === "notes" && (
          <EmptyState message="Notes and observations will be displayed here" />
        )}

        {activeTab === "rating" && (
          <EmptyState message="Ratings and reviews will be displayed here" />
        )}
      </div>
    </main>
  );
}

export default UserProfileContent;