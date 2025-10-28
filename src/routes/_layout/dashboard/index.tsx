import index from '@/components/DashBoard'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/dashboard/')({
  component: index,
})
