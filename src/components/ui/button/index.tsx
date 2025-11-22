'use client'
import { createButton } from '@gluestack-ui/core/button/creator'
import { PrimitiveIcon, UIIcon } from '@gluestack-ui/core/icon/creator'
import {
  tva,
  useStyleContext,
  type VariantProps,
  withStyleContext,
} from '@gluestack-ui/utils/nativewind-utils'
import { cssInterop } from 'nativewind'
import React from 'react'
import { ActivityIndicator, Pressable, Text, View } from 'react-native'

const SCOPE = 'BUTTON'

const Root = withStyleContext(Pressable, SCOPE)

const UIButton = createButton({
  Root: Root,
  Text,
  Group: View,
  Spinner: ActivityIndicator,
  Icon: UIIcon,
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

const buttonStyle = tva({
  base: 'group/button flex-row items-center justify-between rounded-[10px] data-[disabled=true]:opacity-40',
  variants: {
    action: {
      default: '',
    },
    variant: {
      solid: 'bg-orange-base data-[active=true]:bg-orange-dark',
      outline:
        'border border-orange-base bg-transparent data-[active=true]:bg-orange-base',
      link: 'bg-transparent',
    },
    size: {
      medium: 'h-[56px] gap-[12px] px-[20px]',
      small: 'h-[40px] gap-[8px] px-[16px]',
      link: 'h-[24px] gap-[8px] px-[2px]',
    },
  },
})

const buttonTextStyle = tva({
  base: '',
  parentVariants: {
    action: {
      default: '',
    },
    variant: {
      solid: 'text-white',
      outline: 'text-orange-base data-[active=true]:text-white',
      link: 'text-orange-base data-[active=true]:text-orange-dark',
    },
    size: {
      medium: 'font-action-md',
      small: 'font-action-sm',
      link: 'font-action-sm',
    },
  },
})

const buttonIconStyle = tva({
  base: '',
  parentVariants: {
    action: {
      default: '',
    },
    variant: {
      solid: 'fill-white',
      outline: 'fill-orange-base',
      link: 'fill-orange-base',
    },
    size: {
      medium: 'size-[24px]',
      small: 'size-[20px]',
      link: 'size-[20px]',
    },
  },
  variants: {
    active: {
      true: '',
    },
  },
  parentCompoundVariants: [
    {
      active: true,
      variant: 'outline',
      class: 'fill-white',
    },
    {
      active: true,
      variant: 'link',
      class: 'fill-orange-dark',
    },
  ],
})

const buttonGroupStyle = tva({
  base: '',
  variants: {
    space: {
      xs: 'gap-[4px]',
      sm: 'gap-[8px]',
      md: 'gap-[12px]',
      lg: 'gap-[16px]',
      xl: 'gap-[20px]',
      '2xl': 'gap-[24px]',
      '3xl': 'gap-[28px]',
      '4xl': 'gap-[32px]',
    },
    isAttached: {
      true: 'gap-0',
    },
    flexDirection: {
      row: 'flex-row',
      column: 'flex-col',
      'row-reverse': 'flex-row-reverse',
      'column-reverse': 'flex-col-reverse',
    },
  },
})

type IButtonProps = Omit<
  React.ComponentPropsWithoutRef<typeof UIButton>,
  'context'
> &
  VariantProps<typeof buttonStyle> & { className?: string }

const Button = React.forwardRef<
  React.ElementRef<typeof UIButton>,
  IButtonProps
>(
  (
    {
      className,
      variant = 'solid',
      size = 'medium',
      action = 'default',
      children,
      ...props
    },
    ref,
  ) => {
    const [pressed, setPressed] = React.useState(false)

    return (
      <UIButton
        ref={ref}
        {...props}
        className={buttonStyle({ variant, size, action, class: className })}
        context={{ variant, size, action, pressed }}
        onPressIn={(e) => {
          setPressed(true)
          props.onPressIn?.(e)
        }}
        onPressOut={(e) => {
          setPressed(false)
          props.onPressOut?.(e)
        }}
      >
        {children}
      </UIButton>
    )
  },
)

type IButtonTextProps = React.ComponentPropsWithoutRef<typeof UIButton.Text> &
  VariantProps<typeof buttonTextStyle> & { className?: string }

const ButtonText = React.forwardRef<
  React.ElementRef<typeof UIButton.Text>,
  IButtonTextProps
>(({ className, variant, size, action, ...props }, ref) => {
  const {
    variant: parentVariant,
    size: parentSize,
    action: parentAction,
  } = useStyleContext(SCOPE)

  return (
    <UIButton.Text
      ref={ref}
      {...props}
      className={buttonTextStyle({
        parentVariants: {
          variant: parentVariant,
          size: parentSize,
          action: parentAction,
        },
        variant,
        size,
        action,
        class: className,
      })}
    />
  )
})

const ButtonSpinner = UIButton.Spinner

type IButtonIcon = React.ComponentPropsWithoutRef<typeof UIButton.Icon> &
  VariantProps<typeof buttonIconStyle> & {
    className?: string | undefined
    as?: React.ElementType
    height?: number
    width?: number
  }

const ButtonIcon = React.forwardRef<
  React.ElementRef<typeof UIButton.Icon>,
  IButtonIcon
>(({ className, size, ...props }, ref) => {
  const {
    variant: parentVariant,
    size: parentSize,
    action: parentAction,
    pressed,
  } = useStyleContext(SCOPE)

  const active = pressed || false

  if (typeof size === 'number') {
    return (
      <UIButton.Icon
        ref={ref}
        {...props}
        className={buttonIconStyle({
          active,
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
      <UIButton.Icon
        ref={ref}
        {...props}
        className={buttonIconStyle({
          active,
          class: className,
        })}
      />
    )
  }
  return (
    <UIButton.Icon
      {...props}
      className={buttonIconStyle({
        parentVariants: {
          size: parentSize,
          variant: parentVariant,
          action: parentAction,
        },
        active,
        size,
        class: className,
      })}
      ref={ref}
    />
  )
})

type IButtonGroupProps = React.ComponentPropsWithoutRef<typeof UIButton.Group> &
  VariantProps<typeof buttonGroupStyle>

const ButtonGroup = React.forwardRef<
  React.ElementRef<typeof UIButton.Group>,
  IButtonGroupProps
>(
  (
    {
      className,
      space = 'md',
      isAttached = false,
      flexDirection = 'column',
      ...props
    },
    ref,
  ) => {
    return (
      <UIButton.Group
        className={buttonGroupStyle({
          class: className,
          space,
          isAttached,
          flexDirection,
        })}
        {...props}
        ref={ref}
      />
    )
  },
)

Button.displayName = 'Button'
ButtonText.displayName = 'ButtonText'
ButtonSpinner.displayName = 'ButtonSpinner'
ButtonIcon.displayName = 'ButtonIcon'
ButtonGroup.displayName = 'ButtonGroup'

export { Button, ButtonGroup, ButtonIcon, ButtonSpinner, ButtonText }
