import { router } from 'expo-router'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Box } from '@/components/ui/box'
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button'
import { HStack } from '@/components/ui/hstack'
import { ArrowLeft02Icon, ChartHistogramIcon, Icon } from '@/components/ui/icon'
import { Image } from '@/components/ui/image'
import { VStack } from '@/components/ui/vstack'

export default function Product() {
  function goBack() {
    router.back()
  }

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
            <Image
              source={require('@/assets/product-1.jpg')}
              alt="product-1"
              className="h-[197px] w-full rounded-[6px]"
            />
          </View>
          <VStack className="mt-[28px] w-full gap-[28px]">
            <VStack className="gap-[16px]">
              <HStack className="justify-between gap-[16px]">
                <Text className="font-title-md text-gray-400">Sofá</Text>
                <HStack className="items-baseline gap-[4px]">
                  <Text className="font-label-md text-gray-500">R$</Text>
                  <Text className="font-title-md text-gray-500">35,89</Text>
                </HStack>
              </HStack>
              {/*alterar abaixo para um componente textarea do gluestack-ui*/}
              <Text className="font-body-sm text-gray-400">
                Sofá revestido em couro legítimo, com estrutura em madeira
                maciça e pés em metal cromado.{'\n\n'}Largura: 1,80m{'\n'}
                Altura do chão: 20cm
              </Text>
            </VStack>
            <VStack className="gap-[6px]">
              <Text className="font-title-xs gray-500">Categoria</Text>
              <Text className="font-body-xs gray-400">Móvel</Text>
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
            <Text className="font-title-lg gray-500">35,89</Text>
          </HStack>
          <Button size="small">
            <ButtonText>Entrar em contato</ButtonText>
          </Button>
        </HStack>
      </SafeAreaView>
    </VStack>
  )
}
