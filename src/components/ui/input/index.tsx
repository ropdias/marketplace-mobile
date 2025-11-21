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
import { Pressable, TextInput, View } from 'react-native'

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
  base: 'border-background-300 flex-row content-center items-center overflow-hidden data-[focus=true]:border-primary-700 data-[disabled=true]:opacity-40',

  variants: {
    size: {
      xl: 'h-12',
      lg: 'h-11',
      md: 'h-10',
      sm: 'h-9',
    },

    variant: {
      underlined:
        'rounded-none border-b data-[invalid=true]:border-b-2 data-[invalid=true]:border-error-700 data-[invalid=true]:data-[focus=true]:border-error-700',

      outline:
        'rounded border data-[invalid=true]:border-error-700 data-[invalid=true]:data-[focus=true]:border-error-700',

      rounded:
        'rounded-full border data-[invalid=true]:border-error-700 data-[invalid=true]:data-[focus=true]:border-error-700',
    },
  },
})

const inputIconStyle = tva({
  base: 'items-center justify-center fill-none text-typography-400',
  parentVariants: {
    size: {
      '2xs': 'h-3 w-3',
      xs: 'h-3.5 w-3.5',
      sm: 'h-4 w-4',
      md: 'h-[18px] w-[18px]',
      lg: 'h-5 w-5',
      xl: 'h-6 w-6',
    },
  },
})

const inputSlotStyle = tva({
  base: 'items-center justify-center',
})

const inputFieldStyle = tva({
  // Both text-typography-900 and placeholder:text-typography-500 are required:
  // - text-typography-900: color for typed text
  // - placeholder:text-typography-500: color for placeholder text
  // NativeWind handles these correctly despite the CSS conflict warning
  base: 'ios:leading-[0px] h-full flex-1 px-3 py-0 text-typography-900 placeholder:text-typography-500',

  parentVariants: {
    variant: {
      underlined: 'px-0',
      outline: '',
      rounded: 'px-4',
    },

    size: {
      '2xs': 'text-2xs',
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
      '6xl': 'text-6xl',
    },
  },
})

type IInputProps = React.ComponentProps<typeof UIInput> &
  VariantProps<typeof inputStyle> & { className?: string }
const Input = React.forwardRef<React.ComponentRef<typeof UIInput>, IInputProps>(
  function Input(
    { className, variant = 'outline', size = 'md', ...props },
    ref,
  ) {
    return (
      <UIInput
        ref={ref}
        {...props}
        className={inputStyle({ variant, size, class: className })}
        context={{ variant, size }}
      />
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
  const { size: parentSize } = useStyleContext(SCOPE)

  if (typeof size === 'number') {
    return (
      <UIInput.Icon
        ref={ref}
        {...props}
        className={inputIconStyle({ class: className })}
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
        className={inputIconStyle({ class: className })}
      />
    )
  }
  return (
    <UIInput.Icon
      ref={ref}
      {...props}
      className={inputIconStyle({
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
>(function InputField({ className, ...props }, ref) {
  const { variant: parentVariant, size: parentSize } = useStyleContext(SCOPE)

  return (
    <UIInput.Input
      ref={ref}
      {...props}
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
InputSlot.displayName = 'InputSlot'
InputField.displayName = 'InputField'

export { Input, InputField, InputIcon, InputSlot }
