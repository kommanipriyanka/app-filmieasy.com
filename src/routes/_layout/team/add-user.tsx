import AddUserContainer from '@/components/Team/AddUser'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/team/add-user')({
  component: AddUserContainer,
})

