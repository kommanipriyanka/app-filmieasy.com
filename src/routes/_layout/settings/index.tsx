import index from '@/components/Settings'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/settings/')({
  component: index,
})

