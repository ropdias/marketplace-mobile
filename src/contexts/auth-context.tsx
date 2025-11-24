import {
  createContext,
  type PropsWithChildren,
  use,
  useCallback,
  useEffect,
  useMemo,
} from 'react'

import { useStorageState } from '@/hooks/use-storage-state'
import { api } from '@/lib/axios'

const AuthContext = createContext<{
  signIn: ({ accessToken }: { accessToken: string }) => void
  signOut: () => void
  session?: string | null
  isLoadingSession: boolean
  getAccessTokenOrEmpty: () => string
}>({
  signIn: () => {},
  signOut: () => null,
  session: null,
  isLoadingSession: false,
  getAccessTokenOrEmpty: () => '',
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

  const getAccessTokenOrEmpty = useCallback((): string => {
    if (typeof session === 'string' && session.length > 0) {
      return session
    }
    return ''
  }, [session])

  const contextValue = useMemo(
    () => ({
      signIn,
      signOut,
      session,
      isLoadingSession,
      getAccessTokenOrEmpty,
    }),
    [signIn, signOut, session, isLoadingSession, getAccessTokenOrEmpty],
  )

  useEffect(() => {
    const unsubscribe = api.registerInterceptTokenManager(signOut)

    return () => {
      unsubscribe()
    }
  }, [signOut])

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
