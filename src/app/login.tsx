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
        <Text className="text-2xl font-bold">Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={register}>
        <Text className="text-2xl font-bold">Register</Text>
      </TouchableOpacity>
    </View>
  )
}
