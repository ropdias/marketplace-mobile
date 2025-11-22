'use client'
import { PrimitiveIcon, UIIcon } from '@gluestack-ui/core/icon/creator'
import { createInput } from '@gluestack-ui/core/input/creator'
import type { VariantProps } from '@gluestack-ui/utils/nativewind-utils'
import {
  tva,
  useStyleContext,
  withStyleContext,
} from '@gluestack-ui/utils/nativewind-utils'
import { cssInterop } from 'nativewind'
import React from 'react'
import { Pressable, Text, TextInput, View } from 'react-native'

import { HStack } from '../hstack'
import { AlertCircle02Icon } from '../icon'

const SCOPE = 'INPUT'

const UIInput = createInput({
  Root: withStyleContext(View, SCOPE),
  Icon: UIIcon,
  Slot: Pressable,
  Input: TextInput,
})

cssInterop(PrimitiveIcon, {
  className: {
    target: 'style',
    nativeStyleToProp: {
      height: true,
      width: true,
      fill: true,
      color: 'classNameColor',
      stroke: true,
    },
  },
})

const inputStyle = tva({
  base: 'min-h-[48px] flex-row items-center gap-[8px] rounded-none border-b border-gray-100 px-[2px] data-[focus=true]:border-gray-400 data-[disabled=true]:opacity-40',

  variants: {
    size: {
      xl: '',
      lg: '',
      md: '',
      sm: '',
    },

    variant: {
      underlined: '',
      outline: '',
      rounded: '',
    },
  },
})

const inputIconStyle = tva({
  base: 'size-[24px] content-center items-center justify-center fill-gray-200',
  variants: {
    isFilled: {
      true: 'fill-orange-base',
    },
    isFocused: {
      true: 'fill-orange-base',
    },
    isInvalid: {
      true: 'fill-error',
    },
  },
  parentVariants: {
    size: {
      '2xs': '',
      xs: '',
      sm: '',
      md: '',
      lg: '',
      xl: '',
    },
  },
})

const inputRightIconStyle = tva({
  base: 'size-[24px] content-center items-center justify-center fill-gray-300',
  parentVariants: {
    size: {
      '2xs': '',
      xs: '',
      sm: '',
      md: '',
      lg: '',
      xl: '',
    },
  },
})

const inputSlotStyle = tva({
  base: 'items-center justify-center',
})

const inputFieldStyle = tva({
  // Both text-gray-400 and placeholder:text-gray-200 are required:
  // - text-gray-400: color for typed text
  // - placeholder:text-gray-200: color for placeholder text
  // NativeWind handles these correctly despite the CSS conflict warning
  // Não usar font-body-md pois o line-height causa desalinhamento do placeholder
  base: 'flex-1 pb-[5px] pt-[7px] font-poppinsRegular text-[16px] text-gray-400 caret-orange-base placeholder:text-gray-200 data-[focus=true]:placeholder:text-transparent',

  parentVariants: {
    variant: {
      underlined: '',
      outline: '',
      rounded: '',
    },

    size: {
      '2xs': '',
      xs: '',
      sm: '',
      md: '',
      lg: '',
      xl: '',
      '2xl': '',
      '3xl': '',
      '4xl': '',
      '5xl': '',
      '6xl': '',
    },
  },
})

type IInputProps = React.ComponentProps<typeof UIInput> &
  VariantProps<typeof inputStyle> & {
    className?: string
    isFilled?: boolean
    label?: string
    errorMessage?: string
  }

const Input = React.forwardRef<React.ComponentRef<typeof UIInput>, IInputProps>(
  function Input(
    {
      className,
      variant = 'outline',
      size = 'md',
      isFilled = false,
      label,
      errorMessage,
      children,
      ...props
    },
    ref,
  ) {
    const [isFocused, setIsFocused] = React.useState(false)
    const isInvalid = !!errorMessage

    // Determine label color based on focus/filled state
    const labelColor =
      isFocused || isFilled ? 'text-orange-base' : 'text-gray-300'

    return (
      <View className={`flex-col ${className || 'w-full'}`}>
        {label && (
          <Text className={`font-label-md ${labelColor}`}>{label}</Text>
        )}
        <UIInput
          ref={ref}
          {...props}
          isInvalid={isInvalid}
          className={inputStyle({ variant, size })}
          context={{
            variant,
            size,
            isFilled,
            isFocused,
            setIsFocused,
            isInvalid,
          }}
        >
          {children}
        </UIInput>
        {errorMessage && (
          <HStack className="min-h-[28px] items-center gap-[4px] py-[6px]">
            <UIIcon
              as={AlertCircle02Icon}
              className="flex-shrink-0 fill-error"
              height={16}
              width={16}
            />
            <Text className="font-body-xs flex-1 text-error">
              {errorMessage}
            </Text>
          </HStack>
        )}
      </View>
    )
  },
)

type IInputIconProps = React.ComponentProps<typeof UIInput.Icon> &
  VariantProps<typeof inputIconStyle> & {
    className?: string
    height?: number
    width?: number
  }

const InputIcon = React.forwardRef<
  React.ComponentRef<typeof UIInput.Icon>,
  IInputIconProps
>(function InputIcon({ className, size, ...props }, ref) {
  const context = useStyleContext(SCOPE) as {
    size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    isFilled?: boolean
    isFocused?: boolean
    isInvalid?: boolean
  }
  const { size: parentSize, isFilled, isFocused, isInvalid } = context

  if (typeof size === 'number') {
    return (
      <UIInput.Icon
        ref={ref}
        {...props}
        className={inputIconStyle({
          isFilled,
          isFocused,
          isInvalid,
          class: className,
        })}
        size={size}
      />
    )
  } else if (
    (props.height !== undefined || props.width !== undefined) &&
    size === undefined
  ) {
    return (
      <UIInput.Icon
        ref={ref}
        {...props}
        className={inputIconStyle({
          isFilled,
          isFocused,
          isInvalid,
          class: className,
        })}
      />
    )
  }
  return (
    <UIInput.Icon
      ref={ref}
      {...props}
      className={inputIconStyle({
        isFilled,
        isFocused,
        isInvalid,
        parentVariants: {
          size: parentSize,
        },
        class: className,
      })}
    />
  )
})

type IInputRightIconProps = React.ComponentProps<typeof UIInput.Icon> &
  VariantProps<typeof inputRightIconStyle> & {
    className?: string
    height?: number
    width?: number
  }

const InputRightIcon = React.forwardRef<
  React.ComponentRef<typeof UIInput.Icon>,
  IInputRightIconProps
>(function InputRightIcon({ className, size, ...props }, ref) {
  const context = useStyleContext(SCOPE) as {
    size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  }
  const { size: parentSize } = context

  if (typeof size === 'number') {
    return (
      <UIInput.Icon
        ref={ref}
        {...props}
        className={inputRightIconStyle({ class: className })}
        size={size}
      />
    )
  } else if (
    (props.height !== undefined || props.width !== undefined) &&
    size === undefined
  ) {
    return (
      <UIInput.Icon
        ref={ref}
        {...props}
        className={inputRightIconStyle({ class: className })}
      />
    )
  }
  return (
    <UIInput.Icon
      ref={ref}
      {...props}
      className={inputRightIconStyle({
        parentVariants: {
          size: parentSize,
        },
        class: className,
      })}
    />
  )
})

type IInputSlotProps = React.ComponentProps<typeof UIInput.Slot> &
  VariantProps<typeof inputSlotStyle> & { className?: string }

const InputSlot = React.forwardRef<
  React.ComponentRef<typeof UIInput.Slot>,
  IInputSlotProps
>(function InputSlot({ className, ...props }, ref) {
  return (
    <UIInput.Slot
      ref={ref}
      {...props}
      className={inputSlotStyle({
        class: className,
      })}
    />
  )
})

type IInputFieldProps = React.ComponentProps<typeof UIInput.Input> &
  VariantProps<typeof inputFieldStyle> & { className?: string }

const InputField = React.forwardRef<
  React.ComponentRef<typeof UIInput.Input>,
  IInputFieldProps
>(function InputField({ className, onFocus, onBlur, ...props }, ref) {
  const context = useStyleContext(SCOPE) as {
    variant?: 'underlined' | 'outline' | 'rounded'
    size?:
      | '2xs'
      | 'xs'
      | 'sm'
      | 'md'
      | 'lg'
      | 'xl'
      | '2xl'
      | '3xl'
      | '4xl'
      | '5xl'
      | '6xl'
    setIsFocused?: (value: boolean) => void
  }
  const { variant: parentVariant, size: parentSize, setIsFocused } = context

  const handleFocus = (e: any) => {
    setIsFocused?.(true)
    onFocus?.(e)
  }

  const handleBlur = (e: any) => {
    setIsFocused?.(false)
    onBlur?.(e)
  }

  return (
    <UIInput.Input
      ref={ref}
      {...props}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={inputFieldStyle({
        parentVariants: {
          variant: parentVariant,
          size: parentSize,
        },
        class: className,
      })}
    />
  )
})

Input.displayName = 'Input'
InputIcon.displayName = 'InputIcon'
InputRightIcon.displayName = 'InputRightIcon'
InputSlot.displayName = 'InputSlot'
InputField.displayName = 'InputField'

export { Input, InputField, InputIcon, InputRightIcon, InputSlot }
