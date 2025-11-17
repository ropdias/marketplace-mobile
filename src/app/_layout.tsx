import '@/global.css'

import { Stack } from 'expo-router'

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider'
import { SessionProvider, useSession } from '@/contexts/auth-context'
import { SplashScreenController } from '@/splash-screen-controller'

export default function Root() {
  return (
    <GluestackUIProvider mode="light">
      <SessionProvider>
        <SplashScreenController />
        <RootNavigator />
      </SessionProvider>
    </GluestackUIProvider>
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
