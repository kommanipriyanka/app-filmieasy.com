import ProjectView from '@/components/Projects/ProjectView'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/projects/$project_id/users')({
  component: ProjectView,
})
