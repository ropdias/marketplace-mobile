import { router } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'

import { useSession } from '@/contexts/auth-context'

export default function Profile() {
  const { signOut } = useSession()

  function logout() {
    signOut()
    router.replace('/login')
  }

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-2xl font-bold">Profile</Text>
      <TouchableOpacity onPress={logout}>
        <Text className="text-2xl font-bold">Logout</Text>
      </TouchableOpacity>
    </View>
  )
}
