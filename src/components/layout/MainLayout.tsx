import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import SideBar from "../an/SideBar";
import { Outlet } from "@tanstack/react-router";

export default function Page() {
  return (
    <SidebarProvider>
      <SideBar />
      <SidebarInset className="bg-black text-white min-h-screen">
       
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
