import SignupPage from '@/components/auth/SignUpPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/signup')({
  component: SignupPage,
})
