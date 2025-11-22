import { createImage } from '@gluestack-ui/core/image/creator'
import type { VariantProps } from '@gluestack-ui/utils/nativewind-utils'
import { tva } from '@gluestack-ui/utils/nativewind-utils'
import React from 'react'
import { Image as RNImage, Platform } from 'react-native'

const imageStyle = tva({
  base: 'max-w-full',
  variants: {
    size: {
      '2xs': 'h-[24px] w-[24px]',
      xs: 'h-[40px] w-[40px]',
      sm: 'h-[64px] w-[64px]',
      md: 'h-[80px] w-[80px]',
      lg: 'h-[96px] w-[96px]',
      xl: 'h-[128px] w-[128px]',
      '2xl': 'h-[256px] w-[256px]',
      full: 'h-full w-full',
      none: '',
    },
  },
})

const UIImage = createImage({ Root: RNImage })

type ImageProps = VariantProps<typeof imageStyle> &
  React.ComponentProps<typeof UIImage>
const Image = React.forwardRef<
  React.ComponentRef<typeof UIImage>,
  ImageProps & { className?: string }
>(function Image({ size = 'md', className, ...props }, ref) {
  return (
    <UIImage
      className={imageStyle({ size, class: className })}
      {...props}
      ref={ref}
      // @ts-expect-error : web only
      style={
        Platform.OS === 'web'
          ? { height: 'revert-layer', width: 'revert-layer' }
          : undefined
      }
    />
  )
})

Image.displayName = 'Image'
export { Image }
