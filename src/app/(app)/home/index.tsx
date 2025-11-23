import { router } from 'expo-router'
import { useState } from 'react'
import { FlatList, ListRenderItem, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Filter } from '@/components/filter'
import { ProductCard, ProductCardProps } from '@/components/product-card'
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button'
import { HStack } from '@/components/ui/hstack'
import {
  ArrowRight02Icon,
  FilterVerticalIcon,
  Search01Icon,
} from '@/components/ui/icon'
import { Image } from '@/components/ui/image'
import { Input, InputField, InputIcon } from '@/components/ui/input'
import { VStack } from '@/components/ui/vstack'

// Mock data - replace with API call
const PRODUCTS: ProductCardProps[] = [
  {
    productId: '1',
    productPriceInCents: '120090',
    productTitle: 'Sofá',
    productImageUri: 'product-1',
  },
  {
    productId: '2',
    productPriceInCents: '3589',
    productTitle: 'Camiseta Masculina',
    productImageUri: 'product-2',
  },
  {
    productId: '3',
    productPriceInCents: '8679',
    productTitle: 'Kit utensílios',
    productImageUri: 'product-3',
  },
  {
    productId: '4',
    productPriceInCents: '15990',
    productTitle: 'Kit de cremes',
    productImageUri: 'product-4',
  },
  {
    productId: '5',
    productPriceInCents: '5600',
    productTitle: 'Caderno de desenho',
    productImageUri: 'product-5',
  },
  {
    productId: '6',
    productPriceInCents: '2460',
    productTitle: 'Carro de brinquedo',
    productImageUri: 'product-6',
  },
  {
    productId: '7',
    productPriceInCents: '120090',
    productTitle: 'Sofá',
    productImageUri: 'product-1',
  },
  {
    productId: '8',
    productPriceInCents: '3589',
    productTitle: 'Camiseta Masculina',
    productImageUri: 'product-2',
  },
  {
    productId: '9',
    productPriceInCents: '120090',
    productTitle: 'Sofá',
    productImageUri: 'product-1',
  },
  {
    productId: '10',
    productPriceInCents: '3589',
    productTitle: 'Camiseta Masculina',
    productImageUri: 'product-2',
  },
]

export default function Home() {
  const [showFilter, setShowFilter] = useState(false)
  const [search, setSearch] = useState('')

  function goToProfile() {
    router.push('/profile')
  }

  function openFilter() {
    setShowFilter(true)
  }

  const renderProduct: ListRenderItem<ProductCardProps> = ({ item }) => (
    <ProductCard
      productId={item.productId}
      productPriceInCents={item.productPriceInCents}
      productTitle={item.productTitle}
      productImageUri={item.productImageUri}
    />
  )

  return (
    <VStack className="h-full w-full flex-1">
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
            <HStack className="w-full items-end gap-[16px]">
              <Input isFilled={search.length > 0} className="flex-1">
                <InputIcon as={Search01Icon} />
                <InputField
                  placeholder="Pesquisar"
                  value={search}
                  onChangeText={setSearch}
                />
              </Input>
              <Button
                variant="outline"
                size="small"
                className="h-[40px] w-[40px] items-center justify-center p-0"
                onPress={openFilter}
              >
                <ButtonIcon as={FilterVerticalIcon} />
              </Button>
            </HStack>
          </VStack>
        </VStack>
      </SafeAreaView>
      <Filter showFilter={showFilter} setShowFilter={setShowFilter} />
      <FlatList
        data={PRODUCTS}
        renderItem={renderProduct}
        keyExtractor={(item) => item.productId}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="p-[16px] gap-[8px]"
        columnWrapperClassName="justify-around gap-[8px]"
        className="w-full bg-background"
      />
    </VStack>
  )
}
