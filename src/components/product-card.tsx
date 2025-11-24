import { router } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'

import { Product } from '@/@types/product'
import { api } from '@/lib/axios'
import { currencyApplyMask } from '@/utils/currency-apply-mask'

import { Card } from './ui/card'
import { HStack } from './ui/hstack'
import { Icon, PackageIcon } from './ui/icon'
import { Image } from './ui/image'
import { VStack } from './ui/vstack'

export interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const id = product.id
  const title = product.title
  const priceInCents = product.priceInCents
  const imageUri = product.attachments[0]?.url

  // If the imageUri contains 'http://localhost:3333',
  // replace it with the api base URL
  const adjustedLocalUri = imageUri?.replace(
    'http://localhost:3333',
    `${api.defaults.baseURL}`,
  )

  function goToProduct() {
    router.push('/product')
  }

  return (
    <TouchableOpacity onPress={goToProduct}>
      <Card>
        <VStack className="gap-[4px]">
          {adjustedLocalUri ? (
            <Image
              source={{ uri: adjustedLocalUri }}
              className="h-[96px] w-[148px] rounded-[6px]"
              alt={title}
            />
          ) : (
            <View className="h-[96px] w-[148px] items-center justify-center rounded-[6px]">
              <Icon
                as={PackageIcon}
                size="productDefaultIcon"
                className="fill-orange-base"
              />
            </View>
          )}
          <VStack className="gap-[2px] p-[4px]">
            <Text className="font-body-xs text-gray-400">{title}</Text>
            <HStack className="items-baseline gap-[4px]">
              <Text className="font-label-sm text-gray-500">R$</Text>
              <Text className="font-title-xs text-gray-500">
                {currencyApplyMask(String(priceInCents))}
              </Text>
            </HStack>
          </VStack>
        </VStack>
      </Card>
    </TouchableOpacity>
  )
}
