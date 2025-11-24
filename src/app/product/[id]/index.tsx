import { router, useLocalSearchParams } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Product as ProductType } from '@/@types/product'
import { getProductById } from '@/api/products/get-product-by-id'
import { Box } from '@/components/ui/box'
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button'
import { HStack } from '@/components/ui/hstack'
import {
  ArrowLeft02Icon,
  ChartHistogramIcon,
  Icon,
  PackageIcon,
} from '@/components/ui/icon'
import { Image } from '@/components/ui/image'
import { VStack } from '@/components/ui/vstack'
import { useSession } from '@/contexts/auth-context'
import { useAppToast } from '@/hooks/use-app-toast'
import { api } from '@/lib/axios'
import { AppError } from '@/utils/app-error'
import { currencyApplyMask } from '@/utils/currency-apply-mask'

export default function Product() {
  const [product, setProduct] = useState<ProductType | null>(null)
  const { getAccessTokenOrEmpty } = useSession()
  const { id } = useLocalSearchParams<{ id: string }>()
  const { showError } = useAppToast()

  let productImageUri: string | undefined = undefined

  function goBack() {
    router.replace('/home')
  }

  const fetchProductById = useCallback(
    async (accessToken: string) => {
      try {
        const data = await getProductById({
          accessToken,
          path: { id },
        })
        setProduct(data.product)
      } catch (error) {
        const isAppError = error instanceof AppError

        const description = isAppError
          ? error.message
          : 'Não foi possível carregar o produto.'

        showError({ title: 'Erro ao buscar o produto', description })
      }
    },
    [showError, id],
  )

  useEffect(() => {
    const accessToken = getAccessTokenOrEmpty()

    fetchProductById(accessToken)
  }, [fetchProductById, getAccessTokenOrEmpty, id])

  if (!product) {
    return null
  }

  // If the imageUri contains 'http://localhost:3333',
  // replace it with the api base URL
  productImageUri = product.attachments[0]?.url.replace(
    'http://localhost:3333',
    `${api.defaults.baseURL}`,
  )

  return (
    <VStack className="h-full w-full flex-1 justify-between">
      <SafeAreaView
        edges={['top', 'left', 'right']}
        className="flex-1 bg-background"
      >
        <VStack className="w-full justify-between bg-background p-[24px]">
          <Button
            variant="link"
            size="link"
            className="items-center justify-start"
            onPress={goBack}
          >
            <ButtonIcon as={ArrowLeft02Icon} />
            <ButtonText>Voltar</ButtonText>
          </Button>
          <View
            className="mt-[16px] w-full rounded-[6px]"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 8,
            }}
          >
            {productImageUri ? (
              <Image
                source={{ uri: productImageUri }}
                alt={product.title || 'product-image'}
                className="h-[197px] w-full rounded-[6px]"
              />
            ) : (
              <Box className="h-[197px] w-full items-center justify-center rounded-[6px]">
                <Icon
                  as={PackageIcon}
                  className="fill-orange-base"
                  size="imageUploaderIcon"
                />
              </Box>
            )}
          </View>
          <VStack className="mt-[28px] w-full gap-[28px]">
            <VStack className="gap-[16px]">
              <HStack className="justify-between gap-[16px]">
                <Text className="font-title-md text-gray-400">
                  {product.title}
                </Text>
                <HStack className="items-baseline gap-[4px]">
                  <Text className="font-label-md text-gray-500">R$</Text>
                  <Text className="font-title-md text-gray-500">
                    {currencyApplyMask(String(product.priceInCents))}
                  </Text>
                </HStack>
              </HStack>
              {/*alterar abaixo para um componente textarea do gluestack-ui*/}
              <Text className="font-body-sm text-gray-400">
                {product.description}
              </Text>
            </VStack>
            <VStack className="gap-[6px]">
              <Text className="font-title-xs gray-500">Categoria</Text>
              <Text className="font-body-xs gray-400">
                {product.category.title}
              </Text>
            </VStack>
            <HStack className="w-full gap-[12px] rounded-[10px] bg-blue-light py-[12px] pl-[12px] pr-[16px]">
              <Box className="size-[36px] items-center justify-center rounded-[6px] bg-blue-dark p-[8px]">
                <Icon
                  as={ChartHistogramIcon}
                  className="fill-blue-light"
                  width={20}
                  height={20}
                />
              </Box>
              <Text className="font-body-xs flex-1 flex-shrink text-gray-400">
                <Text className="font-body-xs-bold text-gray-400">
                  24 pessoas
                </Text>
                {' visualizaram este produto nos últimos 7 dias'}
              </Text>
            </HStack>
          </VStack>
        </VStack>
      </SafeAreaView>
      <SafeAreaView edges={['bottom', 'left', 'right']} className="bg-white">
        <HStack className="w-full items-center justify-between bg-white p-[24px]">
          <HStack className="items-baseline gap-[4px]">
            <Text className="font-label-md gray-500">R$</Text>
            <Text className="font-title-lg gray-500">
              {currencyApplyMask(String(product.priceInCents))}
            </Text>
          </HStack>
          <Button size="small">
            <ButtonText>Entrar em contato</ButtonText>
          </Button>
        </HStack>
      </SafeAreaView>
    </VStack>
  )
}
