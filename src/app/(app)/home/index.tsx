import { router } from 'expo-router'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function Home() {
  function goToProduct() {
    router.push('/home/product')
  }

  function openFilter() {
    // open drawer component here
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <TouchableOpacity onPress={goToProduct}>
        <Text style={styles.title}>Product</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={openFilter}>
        <Text style={styles.title}>Filter</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold' },
})
