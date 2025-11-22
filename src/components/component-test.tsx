import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'

import { ImageUploader } from '@/components/image-uploader'
import { ProductCard } from '@/components/product-card'
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button'
import {
  Checkbox,
  CheckboxGroup,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from '@/components/ui/checkbox'
import { Mail02Icon, ViewIcon, ViewOffIcon } from '@/components/ui/icon'
import {
  Input,
  InputField,
  InputIcon,
  InputRightIcon,
  InputSlot,
} from '@/components/ui/input'
import { VStack } from '@/components/ui/vstack'

export default function ComponentTest() {
  const [values, setValues] = useState(['Eng'])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  return (
    <ScrollView className="flex-1 p-4">
      <View className="flex-1 items-center justify-center gap-4">
        <Text className="font-title-lg">Login Example</Text>
        <ProductCard
          productId="1"
          productPriceInCents="120090"
          productTitle="Sofá"
          productImageUri="product-1"
        />
        <ImageUploader />

        {/* Example 1: Email Input WITH Label - demonstrates empty/filled/focused states */}
        <Input isFilled={email.length > 0} label="E-mail">
          <InputIcon as={Mail02Icon} />
          <InputField
            placeholder="Digite seu e-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </Input>
        {/* Example 2: Password Input with show/hide toggle WITH Label - icon direito não muda cor */}
        <Input isFilled={password.length > 0} label="Senha">
          <InputIcon as={Mail02Icon} />
          <InputField
            placeholder="Digite sua senha"
            value={password}
            onChangeText={setPassword}
            type={showPassword ? 'text' : 'password'}
          />
          <InputSlot onPress={() => setShowPassword(!showPassword)}>
            <InputRightIcon as={showPassword ? ViewOffIcon : ViewIcon} />
          </InputSlot>
        </Input>
        {/* Example 3: Input WITHOUT Label (optional) */}
        <Input isFilled={email.length > 0}>
          <InputIcon as={Mail02Icon} />
          <InputField
            placeholder="Input sem label"
            value={email}
            onChangeText={setEmail}
          />
        </Input>
        {/* Example 4: Input with error state WITH Label and error message */}
        <Input
          label="E-mail com erro"
          errorMessage="Por favor, insira um e-mail válido"
        >
          <InputIcon as={Mail02Icon} />
          <InputField
            placeholder="Email with error"
            value={email}
            onChangeText={setEmail}
          />
        </Input>
        <Button>
          <ButtonIcon as={Mail02Icon} />
          <ButtonText>Placeholder</ButtonText>
          <ButtonIcon as={Mail02Icon} />
        </Button>
        <Button size="small">
          <ButtonIcon as={Mail02Icon} />
          <ButtonText>Placeholder</ButtonText>
          <ButtonIcon as={Mail02Icon} />
        </Button>
        <Button variant="outline">
          <ButtonIcon as={Mail02Icon} />
          <ButtonText>Placeholder</ButtonText>
          <ButtonIcon as={Mail02Icon} />
        </Button>
        <Button variant="outline" size="small">
          <ButtonIcon as={Mail02Icon} />
          <ButtonText>Placeholder</ButtonText>
          <ButtonIcon as={Mail02Icon} />
        </Button>
        <Button variant="link" size="link">
          <ButtonIcon as={Mail02Icon} />
          <ButtonText>Placeholder</ButtonText>
          <ButtonIcon as={Mail02Icon} />
        </Button>
        <CheckboxGroup
          value={values}
          onChange={(keys) => {
            setValues(keys)
          }}
        >
          <VStack space="xl">
            <Checkbox value="Eng">
              <CheckboxIndicator>
                <CheckboxIcon />
              </CheckboxIndicator>
              <CheckboxLabel>Framer</CheckboxLabel>
            </Checkbox>
            <Checkbox value="invison">
              <CheckboxIndicator>
                <CheckboxIcon />
              </CheckboxIndicator>
              <CheckboxLabel>Invision Studio</CheckboxLabel>
            </Checkbox>
            <Checkbox value="adobe">
              <CheckboxIndicator>
                <CheckboxIcon />
              </CheckboxIndicator>
              <CheckboxLabel>Adobe XD</CheckboxLabel>
            </Checkbox>
          </VStack>
        </CheckboxGroup>
      </View>
    </ScrollView>
  )
}
