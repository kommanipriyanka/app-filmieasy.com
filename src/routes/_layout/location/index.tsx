import index from '@/components/Location'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/location/')({
  component: index,
})
