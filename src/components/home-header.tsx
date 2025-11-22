import { router } from 'expo-router'
import { useState } from 'react'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Image } from '@/components/ui/image'

import { Button, ButtonIcon, ButtonText } from './ui/button'
import { HStack } from './ui/hstack'
import { ArrowRight02Icon, Search01Icon } from './ui/icon'
import { Input, InputField, InputIcon } from './ui/input'
import { VStack } from './ui/vstack'

export function HomeHeader() {
  const [search, setSearch] = useState('')

  function goToProfile() {
    router.push('/profile')
  }

  //   function openFilter() {
  //     // open drawer component here
  //   }

  return (
    <SafeAreaView edges={['top']} className="bg-white">
      <VStack className="w-full items-center justify-center gap-[32px] bg-white p-[24px]">
        <HStack className="h-[56px] w-full items-center gap-[20px]">
          <Image
            source={require('@/assets/product-1.jpg')}
            alt="profile-picture"
            className="h-[56px] w-[56px] rounded-[12px] border border-shape"
          />
          <VStack className="gap-[4px]">
            <Text className="font-title-sm text-gray-500">Olá, Brandon!</Text>
            <Button
              variant="link"
              size="link"
              className="items-center justify-start"
              onPress={goToProfile}
            >
              <ButtonText>Ver perfil</ButtonText>
              <ButtonIcon as={ArrowRight02Icon} />
            </Button>
          </VStack>
        </HStack>
        <VStack className="w-full items-start gap-[4px]">
          <Text className="font-body-sm text-gray-500">Explore produtos</Text>
          <HStack>
            <Input isFilled={search.length > 0}>
              <InputIcon as={Search01Icon} />
              <InputField
                placeholder="Pesquisar"
                value={search}
                onChangeText={setSearch}
              />
            </Input>
          </HStack>
        </VStack>
      </VStack>
    </SafeAreaView>
  )
}
