import { router } from 'expo-router'
import { Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import Logo from '@/assets/logo.svg'
import { useSession } from '@/contexts/auth-context'

export default function Login() {
  const { signIn } = useSession()

  function login() {
    signIn()
    router.replace('/home')
  }

  function register() {
    router.navigate('/register')
  }

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-background">
      <Logo width={120} height={40} />
      <TouchableOpacity onPress={login}>
        <Text className="font-title-lg">Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={register}>
        <Text className="font-title-md">Register</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}
