import index from '@/components/Distribution'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/distrbution/')({
  component: index,
})
