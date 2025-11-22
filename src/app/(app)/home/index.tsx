import { useState } from 'react'
import { FlatList, ListRenderItem, View } from 'react-native'

import { Filter } from '@/components/filter'
import { ProductCard, ProductCardProps } from '@/components/product-card'

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

  const renderProduct: ListRenderItem<ProductCardProps> = ({ item }) => (
    <ProductCard
      productId={item.productId}
      productPriceInCents={item.productPriceInCents}
      productTitle={item.productTitle}
      productImageUri={item.productImageUri}
    />
  )

  return (
    <View>
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
    </View>
  )
}
