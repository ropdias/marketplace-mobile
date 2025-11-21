import { isWeb, tva } from '@gluestack-ui/utils/nativewind-utils'

const baseStyle = isWeb
  ? 'flex flex-col relative z-0 box-border border-0 list-none min-w-0 min-h-0 bg-transparent items-stretch m-0 p-0 text-decoration-none'
  : ''

export const vstackStyle = tva({
  base: `flex-col ${baseStyle}`,
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
    reversed: {
      true: 'flex-col-reverse',
    },
  },
})
