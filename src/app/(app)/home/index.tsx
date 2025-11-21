import { router } from 'expo-router'
import { Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Home() {
  function goToProduct() {
    router.push('/home/product')
  }

  function openFilter() {
    // open drawer component here
  }

  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <Text className="text-2xl font-bold">Home</Text>
      <TouchableOpacity onPress={goToProduct}>
        <Text className="text-2xl font-bold">Product</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={openFilter}>
        <Text className="text-2xl font-bold">Filter</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}
