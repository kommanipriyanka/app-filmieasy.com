import { Link } from "@tanstack/react-router";
import React from "react";
import Logo from "../Icons/Logo";
import DashLogo from "../Icons/Dashboard/DashLogo";
import TeamLogo from "../Icons/Team/TeamLogo";
import ProjLogo from "../Icons/Projects/ProjLogo";
import LocationLogo from "../Icons/Locations/LocationLogo";
import ExpLogo from "../Icons/Expenses/ExpLogo";
import DistLogo from "../Icons/Distributions/DistLogo";
import SettingsLogo from "../Icons/Settings/SettingsLogo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarRail,
  SidebarTrigger,
} from "../ui/sidebar";

function SideBar() {
  return (
    <Sidebar className=" text-white p-3 !border-r-0" collapsible="icon">
      <SidebarHeader className="flex items-center justify-center">
        <Logo />
        
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <div className="flex flex-col p-3">
                <Link
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10  group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:gap-1 group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:py-2"
                  to="/dashboard"
                >
                  <div className="flex items-center gap-3 group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:gap-0.5">
                    <DashLogo  className="w-6 h-6"/>
                    <span className="text-[10px]">
                      Dashboard
                    </span>
                  </div>
                </Link>
                <Link
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10  group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:gap-1 group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:py-2"
                  to="/projects"
                >
                  <div className="flex items-center gap-3 group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:gap-0.5">
                    <ProjLogo  className="w-6 h-6"/>
                    <span className="group-data-[collapsible=icon]:text-[10px] group-data-[collapsible=icon]:leading-tight">
                      Projects
                    </span>
                  </div>
                </Link>

                <Link
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10  group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:gap-1 group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:py-2"
                  to="/expenses"
                >
                  <div className="flex items-center gap-3 group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:gap-0.5">
                    <ExpLogo />
                    <span className="group-data-[collapsible=icon]:text-[10px] group-data-[collapsible=icon]:leading-tight">
                      Expenses
                    </span>
                  </div>
                </Link>
                <Link
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10  group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:gap-1 group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:py-2"
                  to="/team"
                >
                  <div className="flex items-center gap-3 group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:gap-0.5">
                    <TeamLogo />
                    <span className="group-data-[collapsible=icon]:text-[10px] group-data-[collapsible=icon]:leading-tight">
                      Team
                    </span>
                  </div>
                </Link>


                <Link
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10  group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:gap-1 group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:py-2"
                  to="/location"
                >
                  <div className="flex items-center gap-3 group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:gap-0.5">
                    <LocationLogo />
                    <span className="group-data-[collapsible=icon]:text-[10px] group-data-[collapsible=icon]:leading-tight">
                      Location
                    </span>
                  </div>
                </Link>


                <Link
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10  group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:gap-1 group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:py-2"
                  to="/distrbution"
                >
                  <div className="flex items-center gap-3 group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:gap-0.5">
                    <DistLogo />
                    <span className="group-data-[collapsible=icon]:text-[10px] group-data-[collapsible=icon]:leading-tight">
                      Distribution
                    </span>
                  </div>
                </Link>

                <Link
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10  group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:gap-1 group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:py-2"
                  to="/settings"
                >
                  <div className="flex items-center gap-3 group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:gap-0.5">
                    <SettingsLogo />
                    <span className="group-data-[collapsible=icon]:text-[10px] group-data-[collapsible=icon]:leading-tight">
                      Settings
                    </span>
                  </div>
                </Link>
              </div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="flex items-center justify-center">
        <SidebarTrigger className="-ml-1" />
        <Link
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10  group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:gap-1 group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:py-2"
          to="/"
        >
          <span className="group-data-[collapsible=icon]:text-[14px] group-data-[collapsible=icon]:leading-tight">
            Logout
          </span>
        </Link>
      </SidebarFooter>
      
    </Sidebar>
  );
}

export default SideBar;
