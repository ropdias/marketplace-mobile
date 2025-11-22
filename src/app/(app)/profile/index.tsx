import { router } from 'expo-router'
import { useState } from 'react'
import { ScrollView, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Button, ButtonIcon, ButtonText } from '@/components/ui/button'
import { HStack } from '@/components/ui/hstack'
import {
  AccessIcon,
  CallIcon,
  Logout01Icon,
  Mail02Icon,
  UserIcon,
  ViewIcon,
  ViewOffIcon,
} from '@/components/ui/icon'
import { Image } from '@/components/ui/image'
import {
  Input,
  InputField,
  InputIcon,
  InputRightIcon,
  InputSlot,
} from '@/components/ui/input'
import { VStack } from '@/components/ui/vstack'
import { useSession } from '@/contexts/auth-context'
import { phoneApplyMask } from '@/utils/phone-apply-mask'

export default function Profile() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const { signOut } = useSession()

  function logout() {
    signOut()
    router.replace('/login')
  }

  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      className="flex-1 bg-background"
    >
      <VStack className="items-center justify-center">
        <ScrollView showsVerticalScrollIndicator={false} className="w-full">
          <HStack className="items-center justify-center px-[40px] pb-[20px] pt-[24px]">
            <Image
              source={require('@/assets/product-1.jpg')}
              alt="profile-picture"
              className="h-[120px] w-[120px] rounded-[12px]"
            />
            <Button
              variant="outline"
              size="small"
              className="absolute right-[40px] top-[24px] h-[40px] w-[40px] items-center justify-center p-0"
              onPress={logout}
            >
              <ButtonIcon as={Logout01Icon} />
            </Button>
          </HStack>
          <VStack className="w-full gap-[24px] px-[40px]">
            <VStack className="w-full items-center gap-[20px]">
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
              <Input isFilled={oldPassword.length > 0} label="Senha atual">
                <InputIcon as={AccessIcon} />
                <InputField
                  placeholder="Sua senha"
                  value={oldPassword}
                  onChangeText={setOldPassword}
                  type={showOldPassword ? 'text' : 'password'}
                />
                <InputSlot onPress={() => setShowOldPassword(!showOldPassword)}>
                  <InputRightIcon
                    as={showOldPassword ? ViewOffIcon : ViewIcon}
                  />
                </InputSlot>
              </Input>
              <Input isFilled={newPassword.length > 0} label="Nova Senha">
                <InputIcon as={AccessIcon} />
                <InputField
                  placeholder="Sua nova senha"
                  value={newPassword}
                  onChangeText={setNewPassword}
                  type={showNewPassword ? 'text' : 'password'}
                />
                <InputSlot onPress={() => setShowNewPassword(!showNewPassword)}>
                  <InputRightIcon
                    as={showNewPassword ? ViewOffIcon : ViewIcon}
                  />
                </InputSlot>
              </Input>
            </VStack>
            <Button className="justify-center">
              <ButtonText>Atualizar cadastro</ButtonText>
            </Button>
          </VStack>
        </ScrollView>
      </VStack>
    </SafeAreaView>
  )
}
