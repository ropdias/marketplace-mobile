import { useEffect, useState } from 'react'
import { Keyboard, Text } from 'react-native'

import { Category } from '@/@types/category'
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetScrollView,
} from '@/components/ui/actionsheet'
import { Button, ButtonText } from '@/components/ui/button'
import {
  Checkbox,
  CheckboxGroup,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from '@/components/ui/checkbox'
import { HStack } from '@/components/ui/hstack'
import { Input, InputField } from '@/components/ui/input'
import { VStack } from '@/components/ui/vstack'
import { currencyApplyMask } from '@/utils/currency-apply-mask'

interface FilterProps {
  showFilter: boolean
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>
  categories: Category[]
}

export function Filter({ showFilter, setShowFilter, categories }: FilterProps) {
  const [snapPoint, setSnapPoint] = useState<number>(70)
  const [values, setValues] = useState<string[]>([])
  const [priceFrom, setPriceFrom] = useState<string>('')
  const [priceTo, setPriceTo] = useState<string>('')

  const handleClose = () => {
    setShowFilter(false)
  }

  const handleClearFilter = () => {
    setValues([])
    setPriceFrom('')
    setPriceTo('')
  }

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardWillShow', () => {
      setSnapPoint(85)
    })

    const hideSub = Keyboard.addListener('keyboardWillHide', () => {
      setSnapPoint(70)
    })

    return () => {
      showSub.remove()
      hideSub.remove()
    }
  }, [])

  return (
    <Actionsheet
      isOpen={showFilter}
      onClose={handleClose}
      snapPoints={[snapPoint]}
    >
      <ActionsheetBackdrop />
      <ActionsheetContent className="items-start">
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>
        <Text className="font-title-md gray-500 mb-[24px]">
          Filtrar Anúncios
        </Text>
        <ActionsheetScrollView
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          <VStack className="w-full justify-between gap-[20px]">
            <VStack className="gap-[24px]">
              <VStack className="gap-[24px]">
                <VStack className="gap-[8px]">
                  <Text className="font-title-xs gray-400">Valor</Text>
                  <HStack className="w-full gap-[20px]">
                    <Input isFilled={priceFrom.length > 0} className="flex-1">
                      <InputField
                        placeholder="De"
                        value={priceFrom}
                        onChangeText={(text) =>
                          setPriceFrom(currencyApplyMask(text))
                        }
                        keyboardType="number-pad"
                        inputMode="numeric"
                        maxLength={10}
                      />
                    </Input>
                    <Input isFilled={priceTo.length > 0} className="flex-1">
                      <InputField
                        placeholder="Até"
                        value={priceTo}
                        onChangeText={(text) =>
                          setPriceTo(currencyApplyMask(text))
                        }
                        keyboardType="number-pad"
                        inputMode="numeric"
                        maxLength={10}
                      />
                    </Input>
                  </HStack>
                </VStack>
                <VStack className="gap-[20px]">
                  <Text className="font-title-xs gray-400">Categoria</Text>
                  <CheckboxGroup
                    value={values}
                    onChange={(keys) => {
                      setValues(keys)
                    }}
                  >
                    <VStack className="w-full gap-[12px]">
                      {categories.map((category) => (
                        <Checkbox key={category.id} value={category.id}>
                          <CheckboxIndicator>
                            <CheckboxIcon />
                          </CheckboxIndicator>
                          <CheckboxLabel>{category.title}</CheckboxLabel>
                        </Checkbox>
                      ))}
                    </VStack>
                  </CheckboxGroup>
                </VStack>
              </VStack>
            </VStack>
          </VStack>
        </ActionsheetScrollView>
        <HStack className="w-full gap-[12px] pt-[12px]">
          <Button
            variant="outline"
            className="flex-1 justify-center"
            size="small"
            onPress={handleClearFilter}
          >
            <ButtonText
              numberOfLines={1}
              ellipsizeMode="clip"
              className="shrink-0"
            >
              Limpar filtro
            </ButtonText>
          </Button>
          <Button className="flex-1 justify-center" size="small">
            <ButtonText
              numberOfLines={1}
              ellipsizeMode="clip"
              className="shrink-0"
            >
              Filtrar
            </ButtonText>
          </Button>
        </HStack>
      </ActionsheetContent>
    </Actionsheet>
  )
}
