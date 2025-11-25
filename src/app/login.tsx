import { zodResolver } from '@hookform/resolvers/zod'
import { router } from 'expo-router'
import { useCallback, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { KeyboardAvoidingView, Platform, ScrollView, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { z } from 'zod'

import { signIn as apiSignIn } from '@/api/sessions/sign-in'
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
import { useAppToast } from '@/hooks/use-app-toast'
import { AppError } from '@/utils/app-error'

const signInSchema = z.object({
  email: z.email({ error: 'Email inválido' }),
  password: z.string().trim().min(1, 'Informe a senha'),
})

type SignInFormData = z.infer<typeof signInSchema>

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const { signIn: contextSignIn } = useSession()
  const { showSuccess, showError } = useAppToast()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function register() {
    router.navigate('/register')
  }

  const handleSignIn = useCallback(
    async ({ email, password }: SignInFormData) => {
      try {
        const { accessToken } = await apiSignIn({
          email,
          password,
        })
        contextSignIn({ accessToken })
        showSuccess({
          title: 'Login realizado com sucesso!',
          description: 'Bem-vindo de volta! 😊',
        })
        router.replace('/home')
      } catch (error) {
        const isAppError = error instanceof AppError

        const description = isAppError
          ? error.message
          : 'Tente novamente mais tarde.'

        showError({ title: 'Erro ao fazer login', description })
      }
    },
    [showError, showSuccess, contextSignIn],
  )

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
                  <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, value } }) => (
                      <Input
                        isFilled={value.length > 0}
                        label="E-mail"
                        errorMessage={errors.email?.message}
                      >
                        <InputIcon as={Mail02Icon} />
                        <InputField
                          placeholder="mail@exemplo.br"
                          onChangeText={onChange}
                          value={value}
                          keyboardType="email-address"
                          autoCapitalize="none"
                        />
                      </Input>
                    )}
                  />
                  <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, value } }) => (
                      <Input
                        isFilled={value.length > 0}
                        label="Senha"
                        errorMessage={errors.password?.message}
                      >
                        <InputIcon as={AccessIcon} />
                        <InputField
                          placeholder="Sua senha"
                          onChangeText={onChange}
                          value={value}
                          type={showPassword ? 'text' : 'password'}
                        />
                        <InputSlot
                          onPress={() => setShowPassword(!showPassword)}
                        >
                          <InputRightIcon
                            as={showPassword ? ViewOffIcon : ViewIcon}
                          />
                        </InputSlot>
                      </Input>
                    )}
                  />
                </VStack>
                <Button variant="solid" onPress={handleSubmit(handleSignIn)}>
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
