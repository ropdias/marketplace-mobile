import { router } from 'expo-router'
import { useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import Logo from '@/assets/logo.svg'
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button'
import {
  AccessIcon,
  ArrowRight02Icon,
  Mail02Icon,
  ViewIcon,
  ViewOffIcon,
} from '@/components/ui/icon'
import {
  Input,
  InputField,
  InputIcon,
  InputRightIcon,
  InputSlot,
} from '@/components/ui/input'
import { VStack } from '@/components/ui/vstack'
import { useSession } from '@/contexts/auth-context'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { signIn } = useSession()

  function login() {
    signIn()
    router.replace('/home')
  }

  function register() {
    router.navigate('/register')
  }

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <KeyboardAvoidingView
        style={{ flex: 1, width: '100%' }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="w-full"
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <VStack className="w-full flex-1 items-center justify-between gap-[40px] p-[40px]">
            <VStack className="w-full items-center gap-[61px]">
              <VStack className="w-full items-center gap-[32px]">
                <Logo width={64} height={48} />
                <VStack className="w-full items-center gap-[8px]">
                  <Text className="font-title-lg text-gray-500">
                    Acesse sua conta
                  </Text>
                  <Text className="font-body-sm text-center text-gray-300">
                    Informe seu e-mail e senha para entrar
                  </Text>
                </VStack>
              </VStack>
              <VStack className="w-full gap-[40px]">
                <VStack className="w-full gap-[20px]">
                  <Input isFilled={email.length > 0} label="E-mail">
                    <InputIcon as={Mail02Icon} />
                    <InputField
                      placeholder="mail@exemplo.br"
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </Input>
                  <Input isFilled={password.length > 0} label="Senha">
                    <InputIcon as={AccessIcon} />
                    <InputField
                      placeholder="Sua senha"
                      value={password}
                      onChangeText={setPassword}
                      type={showPassword ? 'text' : 'password'}
                    />
                    <InputSlot onPress={() => setShowPassword(!showPassword)}>
                      <InputRightIcon
                        as={showPassword ? ViewOffIcon : ViewIcon}
                      />
                    </InputSlot>
                  </Input>
                </VStack>
                <Button variant="solid" onPress={login}>
                  <ButtonText>Acessar</ButtonText>
                  <ButtonIcon as={ArrowRight02Icon} />
                </Button>
              </VStack>
            </VStack>
            <VStack className="w-full gap-[20px]">
              <Text className="font-body-md text-gray-300">
                Ainda não tem uma conta?
              </Text>
              <Button variant="outline" onPress={register}>
                <ButtonText>Cadastrar</ButtonText>
                <ButtonIcon as={ArrowRight02Icon} />
              </Button>
            </VStack>
          </VStack>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
