import { router } from 'expo-router'
import { useState } from 'react'
import { ScrollView, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import Logo from '@/assets/logo.svg'
import { ImageUploader } from '@/components/image-uploader'
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button'
import {
  AccessIcon,
  ArrowRight02Icon,
  CallIcon,
  Mail02Icon,
  UserIcon,
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
import { phoneApplyMask } from '@/utils/phone-apply-mask'

export default function Register() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  function login() {
    router.navigate('/login')
  }

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <ScrollView showsVerticalScrollIndicator={false} className="w-full">
        <VStack className="w-full flex-1 items-center justify-between gap-[61px] p-[40px]">
          <VStack className="w-full items-center gap-[34px]">
            <VStack className="w-full items-center gap-[32px]">
              <Logo width={64} height={48} />
              <VStack className="w-full items-center gap-[8px]">
                <Text className="font-title-lg text-gray-500">
                  Crie sua conta
                </Text>
                <Text className="font-body-sm text-center text-gray-300">
                  Informe os seus dados pessoais e de acesso
                </Text>
              </VStack>
            </VStack>
            <VStack className="w-full gap-[40px]">
              <VStack className="w-full items-center gap-[20px]">
                <ImageUploader />
                <Input isFilled={name.length > 0} label="Nome">
                  <InputIcon as={UserIcon} />
                  <InputField
                    placeholder="Seu nome completo"
                    value={name}
                    onChangeText={setName}
                    keyboardType="default"
                  />
                </Input>
                <Input isFilled={phone.length > 0} label="Telefone">
                  <InputIcon as={CallIcon} />
                  <InputField
                    placeholder="(00) 00000-0000"
                    value={phone}
                    onChangeText={(text) => setPhone(phoneApplyMask(text))}
                    keyboardType="number-pad"
                  />
                </Input>
              </VStack>
              <VStack className="w-full gap-[20px]">
                <Text className="font-title-sm text-gray-500">Acesso</Text>
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
                <Input
                  isFilled={confirmPassword.length > 0}
                  label="Confirmar Senha"
                >
                  <InputIcon as={AccessIcon} />
                  <InputField
                    placeholder="Confirme a senha"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    type={showConfirmPassword ? 'text' : 'password'}
                  />
                  <InputSlot
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <InputRightIcon
                      as={showConfirmPassword ? ViewOffIcon : ViewIcon}
                    />
                  </InputSlot>
                </Input>
              </VStack>
              <Button variant="solid" onPress={login}>
                <ButtonText>Cadastrar</ButtonText>
                <ButtonIcon as={ArrowRight02Icon} />
              </Button>
            </VStack>
          </VStack>
          <VStack className="w-full gap-[20px]">
            <Text className="font-body-md text-gray-300">
              Já tem uma conta?
            </Text>
            <Button variant="outline" onPress={login}>
              <ButtonText>Acessar</ButtonText>
              <ButtonIcon as={ArrowRight02Icon} />
            </Button>
          </VStack>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  )
}
