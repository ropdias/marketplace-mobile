import { router } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'

export default function Product() {
  function goBack() {
    router.back()
  }

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-2xl font-bold">Product</Text>
      <TouchableOpacity onPress={goBack}>
        <Text className="text-2xl font-bold">Voltar</Text>
      </TouchableOpacity>
    </View>
  )
}
