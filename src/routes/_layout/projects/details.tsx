import ProjectDetails from '@/components/an/projects/ProjectDetails'
import ProjectDetailsUi from '@/components/an/projects/ProjectDetailsUi'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/projects/details')({
  component: ProjectDetailsUi,
})
