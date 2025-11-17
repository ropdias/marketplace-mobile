import '@/global.css'

import { Stack } from 'expo-router'

import { SessionProvider, useSession } from '@/contexts/auth-context'
import { SplashScreenController } from '@/splash-screen-controller'

export default function Root() {
  return (
    <SessionProvider>
      <SplashScreenController />
      <RootNavigator />
    </SessionProvider>
  )
}

function RootNavigator() {
  const { session } = useSession()

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!!session}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>

      <Stack.Protected guard={!session}>
        <Stack.Screen name="login" />
      </Stack.Protected>
    </Stack>
  )
}
