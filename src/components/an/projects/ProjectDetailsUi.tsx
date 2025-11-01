import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Thermometer,
  Droplets,
} from "lucide-react";
import UserTableContainer from "../../Team";
import backgroundImage from "@/assets/TeamBg.webp";
import Cloud from "@/components/Icons/Projects/Cloud";
import { Props } from "@/lib/interfaces/Project";

function ProjectDetailsUi({ projectData, projectUsersData }: Props) {
  const [activeTab, setActiveTab] = useState("crew");

  const fullDescription = projectData?.description || "";
  const projectName = projectData?.name || "Untitled Project";
  const projectGenre = projectData?.genre || "N/A";
  const projectLanguages = projectData?.languages
    ? projectData.languages.join(", ")
    : "N/A";
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };
  const startDate = projectData?.start_date
    ? formatDate(projectData.start_date)
    : "N/A";
  const endDate = projectData?.end_date
    ? formatDate(projectData.end_date)
    : "N/A";
  const timeline = `${startDate} - ${endDate}`;
  const budget = projectData?.estimated_budget
    ? `${projectData.estimated_budget.toLocaleString()} / TBD`
    : "N/A";
  const statusBadge =
    projectData?.status === "TODO"
      ? "Planning"
      : projectData?.status || "Unknown";
  const avatarFallback = projectName.charAt(0).toUpperCase();

  const EmptyState = ({ message }: { message: string }) => (
    <div className="flex items-center justify-center h-64 bg-black/20 rounded-lg border border-gray-800/50">
      <p className="text-sm text-gray-400">{message}</p>
    </div>
  );

  return (
    <div
      className="h-screen bg-black text-white"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="h-full flex flex-col overflow-hidden">
        <Card className="p-0 m-1 bg-transparent border-0 flex-shrink-0">
          <CardHeader className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6 p-0 pb-3 lg:pb-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="w-16 h-16">
                  <AvatarImage
                    src="https://example.com/urban-trial-poster.jpg"
                    alt="Project Avatar"
                  />
                  <AvatarFallback className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-3xl font-bold text-white">
                    {avatarFallback}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <CardTitle className=" text-white">{projectName}</CardTitle>
                  <Badge
                    variant="secondary"
                    className="bg-green-500/10 text-green-400 border border-green-500/30 rounded-md px-2 py-0.5 text-xs font-normal"
                  >
                    {statusBadge}
                  </Badge>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <CardDescription className="text-xs text-gray-400 font-light leading-relaxed cursor-help line-clamp-3 max-w-md lg:max-w-lg">
                        {fullDescription}
                      </CardDescription>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-md bg-gray-900 text-white border-gray-700 p-3">
                      <p className="text-xs">{fullDescription}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6 text-xs flex-1 lg:flex-none lg:flex-shrink-0 w-full lg:w-auto">
              <div className="flex items-center gap-6 lg:gap-8 text-xs flex-wrap lg:flex-nowrap">
                <div className="text-center lg:text-left min-w-[80px] lg:min-w-[100px]">
                  <span className="text-gray-500 block mb-0.5">Genre</span>
                  <div className="text-gray-300">{projectGenre}</div>
                </div>
                <div className="text-center lg:text-left min-w-[80px] lg:min-w-[100px]">
                  <span className="text-gray-500 block mb-0.5">Languages</span>
                  <div className="text-gray-300">{projectLanguages}</div>
                </div>
                <div className="text-center lg:text-left min-w-[120px] lg:min-w-[140px]">
                  <span className="text-gray-500 block mb-0.5">Timeline</span>
                  <div className="text-gray-300 whitespace-nowrap border border-zinc-600/50 bg-zinc-900/50">
                    {timeline}
                  </div>
                </div>
                <div className="text-center lg:text-left min-w-[80px] lg:min-w-[100px]">
                  <span className="text-gray-500 block mb-0.5">Budget</span>
                  <div className="text-gray-300">{budget}</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1 flex-shrink-0 w-full lg:w-auto">
              
              <div className="flex  items-center justify-between gap-4 w-full lg:w-auto">
                <div className="flex flex-col">
                <div className="flex gap-1 text-xs text-gray-400 mb-1 w-full lg:w-auto">
                <span>Today, 12 September</span>
              </div>
                <div className="flex flex-col items-start">
                  <div className="text-3xl lg:text-4xl font-light text-white mb-0.5">
                    29°
                  </div>
                  <div className="flex items-center justify-start gap-2 text-xs text-gray-400 mb-0.5">
                    <span>Cloudy</span>
                  </div>
                </div>
                </div>
                <Cloud />
                <div className="flex flex-col items-start gap-3 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Thermometer className="w-3 h-3 flex-shrink-0" />
                    <span>temperature 20°</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Droplets className="w-3 h-3 flex-shrink-0" />
                    <span>humidity 54%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>
        <div className="border-b border-zinc-800/50 overflow-x-auto flex-shrink-0">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="bg-black border-0 h-12 lg:h-14 px-4 lg:px-6 inline-flex min-w-full w-max gap-6">
              <TabsTrigger
                value="crew"
                className="relative data-[state=active]:bg-transparent data-[state=active]:text-blue-500 data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-blue-500 rounded-none px-0 text-zinc-400 text-sm whitespace-nowrap border-0 hover:text-zinc-300 transition-colors"
              >
                Crew
              </TabsTrigger>
              <TabsTrigger
                value="script"
                className="relative data-[state=active]:bg-transparent data-[state=active]:text-blue-500 data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-blue-500 rounded-none px-0 text-zinc-400 text-sm whitespace-nowrap border-0 hover:text-zinc-300 transition-colors"
              >
                Script
              </TabsTrigger>
              <TabsTrigger
                value="payment"
                className="relative data-[state=active]:bg-transparent data-[state=active]:text-blue-500 data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-blue-500 rounded-none px-0 text-zinc-400 text-sm whitespace-nowrap border-0 hover:text-zinc-300 transition-colors"
              >
                Payment Info Snapshot
              </TabsTrigger>
              <TabsTrigger
                value="expenses"
                className="relative data-[state=active]:bg-transparent data-[state=active]:text-blue-500 data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-blue-500 rounded-none px-0 text-zinc-400 text-sm whitespace-nowrap border-0 hover:text-zinc-300 transition-colors"
              >
                Expenses & Inventory (NEW)
              </TabsTrigger>
              <TabsTrigger
                value="schedule"
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
                Notes
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="flex-1 bg-black/80 backdrop-blur-sm rounded-lg border border-gray-800/50 overflow-hidden flex flex-col">
          {activeTab === "crew" && (
            <UserTableContainer users={projectUsersData} isProjectView={true} />
          )}
          {activeTab === "script" && (
            <EmptyState message="Script content goes here" />
          )}
          {activeTab === "payment" && (
            <EmptyState message="Payment Info Snapshot content goes here" />
          )}
          {activeTab === "expenses" && (
            <EmptyState message="Expenses & Inventory content goes here" />
          )}
          {activeTab === "schedule" && (
            <EmptyState message="Call Sheet & Scheduling content goes here" />
          )}
          {activeTab === "documents" && (
            <EmptyState message="Documents & Files content goes here" />
          )}
          {activeTab === "notes" && (
            <EmptyState message="Notes content goes here" />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectDetailsUi;