import { Text, View } from 'react-native'

import { currencyApplyMask } from '@/utils/currency-apply-mask'

import { Card } from './ui/card'
import { HStack } from './ui/hstack'
import { Icon, PackageIcon } from './ui/icon'
import { Image } from './ui/image'
import { VStack } from './ui/vstack'

// Local images map - require() needs literal strings
const PRODUCT_IMAGES = {
  'product-1': require('@/assets/product-1.jpg'),
  'product-2': require('@/assets/product-2.jpg'),
  'product-3': require('@/assets/product-3.jpg'),
  'product-4': require('@/assets/product-4.jpg'),
  'product-5': require('@/assets/product-5.jpg'),
  'product-6': require('@/assets/product-6.jpg'),
} as const

interface ProductCardProps {
  productTitle: string
  productPriceInCents: string
  productImageUri?: string // For remote images (full URL) or local image name (e.g., 'product-1')
}

export function ProductCard({
  productTitle,
  productPriceInCents,
  productImageUri,
}: ProductCardProps) {
  // Check if it's a remote URL or local image name
  const isRemoteImage = productImageUri?.startsWith('http')
  const isLocalImage =
    productImageUri && productImageUri in PRODUCT_IMAGES && !isRemoteImage

  return (
    <Card>
      <VStack className="gap-[4px]">
        {isRemoteImage ? (
          <Image
            source={{ uri: productImageUri }}
            className="h-[96px] w-[148px] rounded-[6px]"
          />
        ) : isLocalImage ? (
          <Image
            source={
              PRODUCT_IMAGES[productImageUri as keyof typeof PRODUCT_IMAGES]
            }
            className="h-[96px] w-[148px] rounded-[6px]"
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
          <Text className="font-body-xs text-gray-400">{productTitle}</Text>
          <HStack className="items-baseline gap-[4px]">
            <Text className="font-label-sm text-gray-500">R$</Text>
            <Text className="font-title-xs text-gray-500">
              {currencyApplyMask(productPriceInCents)}
            </Text>
          </HStack>
        </VStack>
      </VStack>
    </Card>
  )
}
