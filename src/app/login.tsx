import { router } from 'expo-router'
import { useCallback, useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { signIn as apiSignIn } from '@/api/sessions/sign-in'
import Logo from '@/assets/logo.svg'
import { ToastMessage } from '@/components/toast-message'
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
import { useToast } from '@/components/ui/toast'
import { VStack } from '@/components/ui/vstack'
import { useSession } from '@/contexts/auth-context'
import { AppError } from '@/utils/app-error'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { signIn: contextSignIn } = useSession()
  const toast = useToast()

  function register() {
    router.navigate('/register')
  }

  const handleSignIn = useCallback(async () => {
    try {
      const { accessToken } = await apiSignIn({
        email: 'seller@mba.com',
        password: '123456',
      })
      contextSignIn({ accessToken })
      router.replace('/home')
    } catch (error) {
      const isAppError = error instanceof AppError

      const description = isAppError
        ? error.message
        : 'Tente novamente mais tarde.'

      toast.show({
        placement: 'top',
        duration: 3000,
        render: ({ id }) => (
          <ToastMessage
            id={id}
            action="error"
            title="Erro ao fazer login"
            description={description}
          />
        ),
      })
    }
  }, [toast, contextSignIn])

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
                <Button variant="solid" onPress={handleSignIn}>
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
