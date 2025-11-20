import { DMSans_700Bold } from '@expo-google-fonts/dm-sans'
import {
  Poppins_400Regular,
  Poppins_500Medium,
} from '@expo-google-fonts/poppins'
import { useFonts } from 'expo-font'
import { SplashScreen } from 'expo-router'
import { useEffect } from 'react'

import { useSession } from './contexts/auth-context'

SplashScreen.preventAutoHideAsync()

export function SplashScreenController() {
  const { isLoading } = useSession()
  const [loaded, error] = useFonts({
    DMSans_700Bold,
    Poppins_400Regular,
    Poppins_500Medium,
  })

  useEffect(() => {
    if (!isLoading && (loaded || error)) {
      SplashScreen.hideAsync()
    }
  }, [isLoading, loaded, error])

  return null
}
