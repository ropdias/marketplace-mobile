import { Redirect } from 'expo-router'

import { useSession } from '@/contexts/auth-context'

export default function Index() {
  const { session, isLoadingSession } = useSession()

  // Don't redirect while loading session
  if (isLoadingSession) {
    return null
  }

  // Redirect based on session state
  // Stack.Protected will enforce these routes
  return session ? <Redirect href="/home" /> : <Redirect href="/login" />
}
