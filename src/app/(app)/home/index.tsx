import { FlatList, ListRenderItem } from 'react-native'

import { ProductCard } from '@/components/product-card'

type Product = {
  id: string
  productPriceInCents: string
  productTitle: string
  productImageUri: string
}

// Mock data - replace with API call
const PRODUCTS: Product[] = [
  {
    id: '1',
    productPriceInCents: '120090',
    productTitle: 'Sofá',
    productImageUri: 'product-1',
  },
  {
    id: '2',
    productPriceInCents: '3589',
    productTitle: 'Camiseta Masculina',
    productImageUri: 'product-2',
  },
  {
    id: '3',
    productPriceInCents: '8679',
    productTitle: 'Kit utensílios',
    productImageUri: 'product-3',
  },
  {
    id: '4',
    productPriceInCents: '15990',
    productTitle: 'Kit de cremes',
    productImageUri: 'product-4',
  },
  {
    id: '5',
    productPriceInCents: '5600',
    productTitle: 'Caderno de desenho',
    productImageUri: 'product-5',
  },
  {
    id: '6',
    productPriceInCents: '2460',
    productTitle: 'Carro de brinquedo',
    productImageUri: 'product-6',
  },
  {
    id: '7',
    productPriceInCents: '120090',
    productTitle: 'Sofá',
    productImageUri: 'product-1',
  },
  {
    id: '8',
    productPriceInCents: '3589',
    productTitle: 'Camiseta Masculina',
    productImageUri: 'product-2',
  },
  {
    id: '9',
    productPriceInCents: '120090',
    productTitle: 'Sofá',
    productImageUri: 'product-1',
  },
  {
    id: '10',
    productPriceInCents: '3589',
    productTitle: 'Camiseta Masculina',
    productImageUri: 'product-2',
  },
]

export default function Home() {
  const renderProduct: ListRenderItem<Product> = ({ item }) => (
    <ProductCard
      productId={item.id}
      productPriceInCents={item.productPriceInCents}
      productTitle={item.productTitle}
      productImageUri={item.productImageUri}
    />
  )

  return (
    <FlatList
      data={PRODUCTS}
      renderItem={renderProduct}
      keyExtractor={(item) => item.id}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      contentContainerClassName="p-[16px] gap-[8px]"
      columnWrapperClassName="justify-around gap-[8px]"
      className="w-full bg-background"
    />
  )
}
