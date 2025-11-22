import { DMSans_700Bold } from '@expo-google-fonts/dm-sans'
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins'
import { useFonts } from 'expo-font'
import { SplashScreen } from 'expo-router'
import { type ReactNode, useEffect } from 'react'

import { useSession } from './contexts/auth-context'

SplashScreen.preventAutoHideAsync()

interface SplashScreenControllerProps {
  children: ReactNode
}

export function SplashScreenController({
  children,
}: SplashScreenControllerProps) {
  const { isLoadingSession } = useSession()
  const [loaded, error] = useFonts({
    DMSans_700Bold,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  })

  const fontsLoaded = loaded || error

  useEffect(() => {
    if (!isLoadingSession && fontsLoaded) {
      SplashScreen.hideAsync().catch((err) => {
        console.warn('Error hiding splash screen:', err)
      })
    }
  }, [isLoadingSession, fontsLoaded])

  // Does not render the children until fonts and session are loaded
  if (!fontsLoaded || isLoadingSession) {
    return null
  }

  return <>{children}</>
}
