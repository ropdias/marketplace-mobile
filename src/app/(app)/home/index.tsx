import { router, useFocusEffect } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import { FlatList, ListRenderItem, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Category } from '@/@types/category'
import { Product } from '@/@types/product'
import { Seller } from '@/@types/seller'
import { getAllCategories } from '@/api/categories/get-all-categories'
import { getAllProductsFromSeller } from '@/api/products/get-all-products-from-seller'
import { getSellerProfile } from '@/api/sellers/get-seller-profile'
import { Filter } from '@/components/filter'
import { ProductCard } from '@/components/product-card'
import { Box } from '@/components/ui/box'
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button'
import { HStack } from '@/components/ui/hstack'
import {
  ArrowRight02Icon,
  FilterVerticalIcon,
  Icon,
  Search01Icon,
  UserIcon,
} from '@/components/ui/icon'
import { Image } from '@/components/ui/image'
import { Input, InputField, InputIcon } from '@/components/ui/input'
import { VStack } from '@/components/ui/vstack'
import { useSession } from '@/contexts/auth-context'
import { useAppToast } from '@/hooks/use-app-toast'
import { api } from '@/lib/axios'
import { AppError } from '@/utils/app-error'
import { unmaskCurrencyToCents } from '@/utils/unmask-currency-to-cents'

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [productsFiltered, setProductsFiltered] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [seller, setSeller] = useState<Seller | null>(null)
  const [showFilter, setShowFilter] = useState(false)
  const [search, setSearch] = useState('')
  const { getAccessTokenOrEmpty } = useSession()
  const { showError } = useAppToast()

  let sellerAdjustedLocalUri: string | undefined = undefined

  if (seller) {
    // If the imageUri contains 'http://localhost:3333',
    // replace it with the api base URL
    sellerAdjustedLocalUri = seller.avatar?.url.replace(
      'http://localhost:3333',
      `${api.defaults.baseURL}`,
    )
  }

  function goToProfile() {
    router.push('/profile')
  }

  function openFilter() {
    setShowFilter(true)
  }

  function handleSearch(query: string) {
    searchProductsFromSeller({
      accessToken: getAccessTokenOrEmpty(),
      search: query,
    })
  }

  function handleFilterProducts({
    categories,
    priceFrom,
    priceTo,
  }: {
    categories: string[]
    priceFrom: string
    priceTo: string
  }) {
    const from = priceFrom.length ? unmaskCurrencyToCents(priceFrom) : null
    const to = priceTo.length ? unmaskCurrencyToCents(priceTo) : null

    setProductsFiltered(() => {
      return products.filter((product) => {
        const catOK =
          categories.length === 0 || categories.includes(product.category.id)
        const fromOK = from === null || product.priceInCents >= from
        const toOK = to === null || product.priceInCents <= to
        return catOK && fromOK && toOK
      })
    })
  }

  const renderProduct: ListRenderItem<Product> = ({ item }) => (
    <ProductCard product={item} />
  )

  const fetchSellerProfile = useCallback(
    async (accessToken: string) => {
      try {
        const data = await getSellerProfile({ accessToken })
        setSeller(data.seller)
      } catch (error) {
        const isAppError = error instanceof AppError

        const description = isAppError
          ? error.message
          : 'Não foi possível carregar os dados do perfil.'

        showError({ title: 'Erro ao buscar o perfil do vendedor', description })
      }
    },
    [showError],
  )

  const fetchAllProductsFromSeller = useCallback(
    async (accessToken: string) => {
      try {
        const data = await getAllProductsFromSeller({
          query: {},
          accessToken,
        })
        setProducts(data.products)
      } catch (error) {
        const isAppError = error instanceof AppError

        const description = isAppError
          ? error.message
          : 'Não foi possível carregar os produtos do vendedor.'

        showError({
          title: 'Erro ao buscar os produtos do vendedor',
          description,
        })
      }
    },
    [showError],
  )

  const fetchAllCategories = useCallback(
    async (accessToken: string) => {
      try {
        const data = await getAllCategories({ accessToken })
        setCategories(data.categories)
      } catch (error) {
        const isAppError = error instanceof AppError

        const description = isAppError
          ? error.message
          : 'Não foi possível carregar as categorias.'

        showError({ title: 'Erro ao buscar as categorias', description })
      }
    },
    [showError],
  )

  const searchProductsFromSeller = useCallback(
    async ({
      accessToken,
      search,
    }: {
      accessToken: string
      search: string
    }) => {
      try {
        const data = await getAllProductsFromSeller({
          query: { search },
          accessToken,
        })
        setProducts(data.products)
      } catch (error) {
        const isAppError = error instanceof AppError

        const description = isAppError
          ? error.message
          : 'Não foi possível carregar os produtos do vendedor.'

        showError({
          title: 'Erro ao buscar os produtos do vendedor',
          description,
        })
      }
    },
    [showError],
  )

  useFocusEffect(
    useCallback(() => {
      const accessToken = getAccessTokenOrEmpty()

      fetchSellerProfile(accessToken)
    }, [fetchSellerProfile, getAccessTokenOrEmpty]),
  )

  useEffect(() => {
    const accessToken = getAccessTokenOrEmpty()

    fetchAllProductsFromSeller(accessToken)
    fetchAllCategories(accessToken)
  }, [fetchAllProductsFromSeller, fetchAllCategories, getAccessTokenOrEmpty])

  useEffect(() => {
    setProductsFiltered(products)
  }, [products])

  return (
    <VStack className="h-full w-full flex-1">
      <SafeAreaView edges={['top']} className="bg-white">
        <VStack className="w-full items-center justify-center gap-[32px] bg-white p-[24px]">
          <HStack className="h-[56px] w-full items-center gap-[20px]">
            {sellerAdjustedLocalUri ? (
              <Image
                source={{ uri: sellerAdjustedLocalUri }}
                alt="profile-picture"
                className="h-[56px] w-[56px] rounded-[12px] border border-shape"
              />
            ) : (
              <Box className="h-[56px] w-[56px] items-center justify-center rounded-[12px] border border-shape">
                <Icon
                  as={UserIcon}
                  className="fill-gray-400"
                  size="imageUploaderIcon"
                />
              </Box>
            )}
            <VStack className="gap-[4px]">
              {seller && (
                <Text className="font-title-sm text-gray-500">{`Olá, ${seller.name}!`}</Text>
              )}
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
                  returnKeyType="search"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onSubmitEditing={() => {
                    handleSearch(search)
                  }}
                  submitBehavior="blurAndSubmit"
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
      <Filter
        showFilter={showFilter}
        setShowFilter={setShowFilter}
        categories={categories}
        handleFilterProducts={handleFilterProducts}
      />
      <FlatList
        data={productsFiltered}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="p-[16px] gap-[8px]"
        columnWrapperClassName="justify-around gap-[8px]"
        className="w-full bg-background"
      />
    </VStack>
  )
}
