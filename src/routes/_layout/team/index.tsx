import index from '@/components/Team'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/team/')({
  component: index,
})

