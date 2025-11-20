import { createContext, type PropsWithChildren, use } from 'react'

import { useStorageState } from '@/hooks/use-storage-state'

const AuthContext = createContext<{
  signIn: () => void
  signOut: () => void
  session?: string | null
  isLoadingSession: boolean
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoadingSession: false,
})

export function useSession() {
  const value = use(AuthContext)
  if (!value) {
    throw new Error('useSession must be wrapped in a <SessionProvider />')
  }

  return value
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoadingSession, session], setSession] = useStorageState('session')

  return (
    <AuthContext.Provider
      value={{
        signIn: () => {
          setSession('xxx')
        },
        signOut: () => {
          setSession(null)
        },
        session,
        isLoadingSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
