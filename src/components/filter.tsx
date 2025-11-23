import { useEffect, useState } from 'react'
import { Keyboard, Text } from 'react-native'

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

interface FilterProps {
  showFilter: boolean
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>
}

export function Filter({ showFilter, setShowFilter }: FilterProps) {
  const [snapPoint, setSnapPoint] = useState<number>(70)
  const [values, setValues] = useState<string[]>([])
  const [priceFrom, setPriceFrom] = useState<string>('')
  const [priceTo, setPriceTo] = useState<string>('')

  const handleClose = () => {
    setShowFilter(false)
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
      <ActionsheetContent>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>
        <VStack className="pb-safe h-full w-full justify-between gap-[20px]">
          <VStack className="gap-[24px]">
            <Text className="font-title-md gray-500">Filtrar Anúncios</Text>
            <ActionsheetScrollView
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode="on-drag"
            >
              <VStack className="gap-[8px]">
                <Text className="font-title-xs gray-400">Valor</Text>
                <HStack className="w-full gap-[20px]">
                  <Input isFilled={priceFrom.length > 0} className="flex-1">
                    <InputField
                      placeholder="De"
                      value={priceFrom}
                      onChangeText={setPriceFrom}
                    />
                  </Input>
                  <Input isFilled={priceTo.length > 0} className="flex-1">
                    <InputField
                      placeholder="Até"
                      value={priceTo}
                      onChangeText={setPriceTo}
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
                    <Checkbox value="toy">
                      <CheckboxIndicator>
                        <CheckboxIcon />
                      </CheckboxIndicator>
                      <CheckboxLabel>Brinquedo</CheckboxLabel>
                    </Checkbox>
                    <Checkbox value="furniture">
                      <CheckboxIndicator>
                        <CheckboxIcon />
                      </CheckboxIndicator>
                      <CheckboxLabel>Móvel</CheckboxLabel>
                    </Checkbox>
                    <Checkbox value="stationery">
                      <CheckboxIndicator>
                        <CheckboxIcon />
                      </CheckboxIndicator>
                      <CheckboxLabel>Papelaria</CheckboxLabel>
                    </Checkbox>
                    <Checkbox value="health-beauty">
                      <CheckboxIndicator>
                        <CheckboxIcon />
                      </CheckboxIndicator>
                      <CheckboxLabel>Saúde & Beleza</CheckboxLabel>
                    </Checkbox>
                    <Checkbox value="utensils">
                      <CheckboxIndicator>
                        <CheckboxIcon />
                      </CheckboxIndicator>
                      <CheckboxLabel>Utensílios</CheckboxLabel>
                    </Checkbox>
                    <Checkbox value="clothing">
                      <CheckboxIndicator>
                        <CheckboxIcon />
                      </CheckboxIndicator>
                      <CheckboxLabel>Vestuário</CheckboxLabel>
                    </Checkbox>
                  </VStack>
                </CheckboxGroup>
              </VStack>
            </ActionsheetScrollView>
          </VStack>
          <HStack className="w-full gap-[12px]">
            <Button
              variant="outline"
              className="flex-1 justify-center"
              size="small"
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
        </VStack>
      </ActionsheetContent>
    </Actionsheet>
  )
}
