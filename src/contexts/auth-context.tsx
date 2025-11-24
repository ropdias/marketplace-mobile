import {
  createContext,
  type PropsWithChildren,
  use,
  useCallback,
  useMemo,
} from 'react'

import { useStorageState } from '@/hooks/use-storage-state'

const AuthContext = createContext<{
  signIn: ({ accessToken }: { accessToken: string }) => void
  signOut: () => void
  session?: string | null
  isLoadingSession: boolean
}>({
  signIn: () => {},
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

  const signIn = useCallback(
    ({ accessToken }: { accessToken: string }) => {
      setSession(accessToken)
    },
    [setSession],
  )

  const signOut = useCallback(() => {
    setSession(null)
  }, [setSession])

  const contextValue = useMemo(
    () => ({
      signIn,
      signOut,
      session,
      isLoadingSession,
    }),
    [signIn, signOut, session, isLoadingSession],
  )

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
