import { router } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'

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
    <View className="flex-1 items-center justify-center">
      <TouchableOpacity onPress={login}>
        <Text className="font-title-lg p-1">Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={register}>
        <Text className="font-title-md p-1">Register</Text>
      </TouchableOpacity>
    </View>
  )
}
