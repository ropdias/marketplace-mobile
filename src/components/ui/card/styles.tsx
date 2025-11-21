import { isWeb, tva } from '@gluestack-ui/utils/nativewind-utils'

const baseStyle = isWeb
  ? 'flex flex-col relative z-0'
  : 'rounded-[8px] p-[4px] bg-white'

export const cardStyle = tva({
  base: baseStyle,
  variants: {
    size: {
      sm: '',
      md: '',
      lg: '',
    },
    variant: {
      elevated: '',
      outline: '',
      ghost: '',
      filled: '',
    },
  },
})
