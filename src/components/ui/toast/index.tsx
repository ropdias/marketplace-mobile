'use client'
import { createToastHook } from '@gluestack-ui/core/toast/creator'
import type { VariantProps } from '@gluestack-ui/utils/nativewind-utils'
import {
  tva,
  useStyleContext,
  withStyleContext,
} from '@gluestack-ui/utils/nativewind-utils'
import {
  AnimatePresence,
  Motion,
  MotionComponentProps,
} from '@legendapp/motion'
import { cssInterop } from 'nativewind'
import React from 'react'
import { AccessibilityInfo, Text, View, ViewStyle } from 'react-native'

type IMotionViewProps = React.ComponentProps<typeof View> &
  MotionComponentProps<typeof View, ViewStyle, unknown, unknown, unknown>

const MotionView = Motion.View as React.ComponentType<IMotionViewProps>

const useToast = createToastHook(MotionView, AnimatePresence)
const SCOPE = 'TOAST'

cssInterop(MotionView, { className: 'style' })

const toastStyle = tva({
  base: 'mx-[25px] my-1 gap-[4px] rounded-[12px] bg-background p-[16px] shadow-hard-5',
  variants: {
    action: {
      error: 'bg-error',
      warning: 'bg-error',
      success: 'bg-success',
      info: 'bg-background',
      muted: 'bg-background',
    },

    variant: {
      solid: '',
      outline: '',
    },
  },
})

const toastTitleStyle = tva({
  base: 'font-title-sm text-left text-gray-400',
  variants: {
    isTruncated: {
      true: '',
    },
    bold: {
      true: '',
    },
    underline: {
      true: 'underline',
    },
    strikeThrough: {
      true: 'line-through',
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
  parentVariants: {
    variant: {
      solid: '',
      outline: '',
    },
    action: {
      error: 'text-white',
      warning: '',
      success: 'text-white',
      info: 'text-gray-300',
      muted: '',
    },
  },
})

const toastDescriptionStyle = tva({
  base: 'font-body-sm text-left text-gray-300',
  variants: {
    isTruncated: {
      true: '',
    },
    bold: {
      true: '',
    },
    underline: {
      true: 'underline',
    },
    strikeThrough: {
      true: 'line-through',
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
  parentVariants: {
    variant: {
      solid: '',
      outline: '',
    },
    action: {
      error: 'text-white',
      warning: '',
      success: 'text-white',
      info: 'text-gray-300',
      muted: '',
    },
  },
})

const Root = withStyleContext(View, SCOPE)
type IToastProps = React.ComponentProps<typeof Root> & {
  className?: string
} & VariantProps<typeof toastStyle>

const Toast = React.forwardRef<React.ComponentRef<typeof Root>, IToastProps>(
  function Toast(
    { className, variant = 'solid', action = 'info', ...props },
    ref,
  ) {
    return (
      <Root
        ref={ref}
        className={toastStyle({ variant, action, class: className })}
        context={{ variant, action }}
        {...props}
      />
    )
  },
)

type IToastTitleProps = React.ComponentProps<typeof Text> & {
  className?: string
} & VariantProps<typeof toastTitleStyle>

const ToastTitle = React.forwardRef<
  React.ComponentRef<typeof Text>,
  IToastTitleProps
>(function ToastTitle({ className, size = 'md', children, ...props }, ref) {
  const { variant: parentVariant, action: parentAction } =
    useStyleContext(SCOPE)
  React.useEffect(() => {
    // Issue from react-native side
    // Hack for now, will fix this later
    AccessibilityInfo.announceForAccessibility(children as string)
  }, [children])

  return (
    <Text
      {...props}
      ref={ref}
      aria-live="assertive"
      aria-atomic="true"
      role="alert"
      className={toastTitleStyle({
        size,
        class: className,
        parentVariants: {
          variant: parentVariant,
          action: parentAction,
        },
      })}
    >
      {children}
    </Text>
  )
})

type IToastDescriptionProps = React.ComponentProps<typeof Text> & {
  className?: string
} & VariantProps<typeof toastDescriptionStyle>

const ToastDescription = React.forwardRef<
  React.ComponentRef<typeof Text>,
  IToastDescriptionProps
>(function ToastDescription({ className, size = 'md', ...props }, ref) {
  const { variant: parentVariant, action: parentAction } =
    useStyleContext(SCOPE)
  return (
    <Text
      ref={ref}
      {...props}
      className={toastDescriptionStyle({
        size,
        class: className,
        parentVariants: {
          variant: parentVariant,
          action: parentAction,
        },
      })}
    />
  )
})

Toast.displayName = 'Toast'
ToastTitle.displayName = 'ToastTitle'
ToastDescription.displayName = 'ToastDescription'

export { Toast, ToastDescription, ToastTitle, useToast }
