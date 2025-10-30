import UserProfile from '@/components/Team/UserProfile'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/team/$id')({
  component: UserProfile,
})

