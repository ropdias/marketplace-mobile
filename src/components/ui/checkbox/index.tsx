'use client'
import { createCheckbox } from '@gluestack-ui/core/checkbox/creator'
import {
  IPrimitiveIcon,
  PrimitiveIcon,
  UIIcon,
} from '@gluestack-ui/core/icon/creator'
import type { VariantProps } from '@gluestack-ui/utils/nativewind-utils'
import {
  tva,
  useStyleContext,
  withStyleContext,
} from '@gluestack-ui/utils/nativewind-utils'
import { cssInterop } from 'nativewind'
import React from 'react'
import type { TextProps, ViewProps } from 'react-native'
import { Platform, Pressable, Text, View } from 'react-native'

import { CheckSolidIcon } from '@/components/ui/icon'

const IndicatorWrapper = React.forwardRef<
  React.ComponentRef<typeof View>,
  ViewProps
>(function IndicatorWrapper({ ...props }, ref) {
  return <View {...props} ref={ref} />
})

const LabelWrapper = React.forwardRef<
  React.ComponentRef<typeof Text>,
  TextProps
>(function LabelWrapper({ ...props }, ref) {
  return <Text {...props} ref={ref} />
})

const IconWrapper = React.forwardRef<
  React.ComponentRef<typeof PrimitiveIcon>,
  IPrimitiveIcon
>(function IconWrapper({ ...props }, ref) {
  return <UIIcon {...props} ref={ref} />
})

const SCOPE = 'CHECKBOX'
const UICheckbox = createCheckbox({
  // @ts-expect-error : internal implementation for r-19/react-native-web
  Root:
    Platform.OS === 'web'
      ? withStyleContext(View, SCOPE)
      : withStyleContext(Pressable, SCOPE),
  Group: View,
  Icon: IconWrapper,
  Label: LabelWrapper,
  Indicator: IndicatorWrapper,
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

const checkboxStyle = tva({
  base: 'group/checkbox flex-row items-center justify-start gap-2',
  variants: {
    size: {
      lg: '',
      md: '',
      sm: '',
    },
  },
})

const checkboxIndicatorStyle = tva({
  base: 'size-5 items-center justify-center rounded-[4px] border border-gray-100 bg-transparent data-[active=true]:data-[checked=true]:border-orange-dark data-[checked=true]:border-orange-dark data-[invalid=true]:border-error-700 data-[active=true]:data-[checked=true]:bg-orange-base data-[checked=true]:bg-orange-base data-[disabled=true]:opacity-40',
  parentVariants: {
    size: {
      lg: '',
      md: '',
      sm: '',
    },
  },
})

const checkboxLabelStyle = tva({
  base: 'font-body-md text-gray-400 data-[disabled=true]:opacity-40',
  parentVariants: {
    size: {
      lg: '',
      md: '',
      sm: '',
    },
  },
})

const checkboxIconStyle = tva({
  base: 'size-3 fill-white',
  parentVariants: {
    size: {
      sm: '',
      md: '',
      lg: '',
    },
  },
})

const CheckboxGroup = UICheckbox.Group

type ICheckboxProps = React.ComponentPropsWithoutRef<typeof UICheckbox> &
  VariantProps<typeof checkboxStyle>

const Checkbox = React.forwardRef<
  React.ComponentRef<typeof UICheckbox>,
  ICheckboxProps
>(function Checkbox({ className, size = 'md', ...props }, ref) {
  return (
    <UICheckbox
      className={checkboxStyle({
        class: className,
        size,
      })}
      {...props}
      context={{
        size,
      }}
      ref={ref}
    />
  )
})

type ICheckboxIndicatorProps = React.ComponentPropsWithoutRef<
  typeof UICheckbox.Indicator
> &
  VariantProps<typeof checkboxIndicatorStyle>

const CheckboxIndicator = React.forwardRef<
  React.ComponentRef<typeof UICheckbox.Indicator>,
  ICheckboxIndicatorProps
>(function CheckboxIndicator({ className, ...props }, ref) {
  const { size: parentSize } = useStyleContext(SCOPE)

  return (
    <UICheckbox.Indicator
      className={checkboxIndicatorStyle({
        parentVariants: {
          size: parentSize,
        },
        class: className,
      })}
      {...props}
      ref={ref}
    />
  )
})

type ICheckboxLabelProps = React.ComponentPropsWithoutRef<
  typeof UICheckbox.Label
> &
  VariantProps<typeof checkboxLabelStyle>
const CheckboxLabel = React.forwardRef<
  React.ComponentRef<typeof UICheckbox.Label>,
  ICheckboxLabelProps
>(function CheckboxLabel({ className, ...props }, ref) {
  const { size: parentSize } = useStyleContext(SCOPE)
  return (
    <UICheckbox.Label
      className={checkboxLabelStyle({
        parentVariants: {
          size: parentSize,
        },
        class: className,
      })}
      {...props}
      ref={ref}
    />
  )
})

type ICheckboxIconProps = React.ComponentPropsWithoutRef<
  typeof UICheckbox.Icon
> &
  VariantProps<typeof checkboxIconStyle>

const CheckboxIcon = React.forwardRef<
  React.ComponentRef<typeof UICheckbox.Icon>,
  ICheckboxIconProps
>(function CheckboxIcon({ className, size, as, ...props }, ref) {
  const { size: parentSize } = useStyleContext(SCOPE)
  const IconComponent = as || CheckSolidIcon

  if (typeof size === 'number') {
    return (
      <UICheckbox.Icon
        ref={ref}
        {...props}
        as={IconComponent}
        className={checkboxIconStyle({ class: className })}
        size={size}
      />
    )
  } else if (
    (props.height !== undefined || props.width !== undefined) &&
    size === undefined
  ) {
    return (
      <UICheckbox.Icon
        ref={ref}
        {...props}
        as={IconComponent}
        className={checkboxIconStyle({ class: className })}
      />
    )
  }

  return (
    <UICheckbox.Icon
      className={checkboxIconStyle({
        parentVariants: {
          size: parentSize,
        },
        size,
        class: className,
      })}
      {...props}
      as={IconComponent}
      ref={ref}
    />
  )
})

Checkbox.displayName = 'Checkbox'
CheckboxIndicator.displayName = 'CheckboxIndicator'
CheckboxLabel.displayName = 'CheckboxLabel'
CheckboxIcon.displayName = 'CheckboxIcon'

export {
  Checkbox,
  CheckboxGroup,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
}
