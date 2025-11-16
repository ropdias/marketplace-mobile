import { router } from 'expo-router'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

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
    <View style={styles.container}>
      <TouchableOpacity onPress={login}>
        <Text style={styles.title}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={register}>
        <Text style={styles.title}>Register</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold' },
})
