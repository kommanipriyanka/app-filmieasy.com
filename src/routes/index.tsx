import login from "@/components/auth/LoginPage";
import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/")({
  component: login,
});
