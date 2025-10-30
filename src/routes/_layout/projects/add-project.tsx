import AddProject from '@/components/Projects/AddProject'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/projects/add-project')({
  component: AddProject,
})
