import {
  createIcon,
  IPrimitiveIcon,
  PrimitiveIcon,
  Svg,
} from '@gluestack-ui/core/icon/creator'
import { tva, VariantProps } from '@gluestack-ui/utils/nativewind-utils'
import { cssInterop } from 'nativewind'
import React from 'react'
import { Path } from 'react-native-svg'

export const UIIcon = createIcon({
  Root: PrimitiveIcon,
}) as React.ForwardRefExoticComponent<
  React.ComponentPropsWithoutRef<typeof PrimitiveIcon> &
    React.RefAttributes<React.ComponentRef<typeof Svg>>
>

const iconStyle = tva({
  base: '',
  variants: {
    size: {
      '2xs': 'h-[12px] w-[12px]',
      xs: 'h-[14px] w-[14px]',
      sm: 'h-[16px] w-[16px]',
      md: 'h-[18px] w-[18px]',
      lg: 'h-[20px] w-[20px]',
      xl: 'h-[24px] w-[24px]',
      productDefaultIcon: 'h-[32px] w-[32px]',
      imageUploaderIcon: 'h-[32px] w-[32px]',
    },
  },
})

cssInterop(UIIcon, {
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

type IIConProps = IPrimitiveIcon &
  VariantProps<typeof iconStyle> &
  React.ComponentPropsWithoutRef<typeof UIIcon>

const Icon = React.forwardRef<React.ComponentRef<typeof UIIcon>, IIConProps>(
  function Icon({ size = 'md', className, ...props }, ref) {
    if (typeof size === 'number') {
      return (
        <UIIcon
          ref={ref}
          {...props}
          className={iconStyle({ class: className })}
          size={size}
        />
      )
    } else if (
      (props.height !== undefined || props.width !== undefined) &&
      size === undefined
    ) {
      return (
        <UIIcon
          ref={ref}
          {...props}
          className={iconStyle({ class: className })}
        />
      )
    }
    return (
      <UIIcon
        ref={ref}
        {...props}
        className={iconStyle({ size, class: className })}
      />
    )
  },
)

export { Icon }

type ParameterTypes = Omit<Parameters<typeof createIcon>[0], 'Root'>

const createIconUI = ({ ...props }: ParameterTypes) => {
  const UIIconCreateIcon = createIcon({
    Root: Svg,
    ...props,
  }) as React.ForwardRefExoticComponent<
    React.ComponentPropsWithoutRef<typeof PrimitiveIcon> &
      React.RefAttributes<React.ComponentRef<typeof Svg>>
  >

  return React.forwardRef<React.ComponentRef<typeof Svg>>(function UIIcon(
    {
      className,
      size,
      ...inComingProps
    }: VariantProps<typeof iconStyle> &
      React.ComponentPropsWithoutRef<typeof UIIconCreateIcon>,
    ref,
  ) {
    return (
      <UIIconCreateIcon
        ref={ref}
        {...inComingProps}
        className={iconStyle({ size, class: className })}
      />
    )
  })
}
export { createIconUI as createIcon }
// All Icons
const AddIcon = createIcon({
  Root: Svg,
  viewBox: '0 0 24 24',
  path: (
    <>
      <Path
        d="M12 5V19"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5 12H19"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
})

AddIcon.displayName = 'AddIcon'
export { AddIcon }

const AlertCircleIcon = createIcon({
  Root: Svg,
  viewBox: '0 0 24 24',
  path: (
    <>
      <Path
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 8V12"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 16H12.01"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
})

AlertCircleIcon.displayName = 'AlertCircleIcon'
export { AlertCircleIcon }

const ArrowUpIcon = createIcon({
  Root: Svg,
  viewBox: '0 0 24 24',
  path: (
    <>
      <Path
        d="M12 19V5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5 12L12 5L19 12"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
})

const ArrowDownIcon = createIcon({
  Root: Svg,

  viewBox: '0 0 24 24',
  path: (
    <>
      <Path
        d="M12 5V19"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M19 12L12 19L5 12"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
})

const ArrowRightIcon = createIcon({
  Root: Svg,

  viewBox: '0 0 24 24',
  path: (
    <>
      <Path
        d="M5 12H19"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 5L19 12L12 19"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
})

const ArrowLeftIcon = createIcon({
  Root: Svg,
  viewBox: '0 0 24 24',
  path: (
    <>
      <Path
        d="M19 12H5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 19L5 12L12 5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
})

ArrowUpIcon.displayName = 'ArrowUpIcon'
ArrowDownIcon.displayName = 'ArrowDownIcon'
ArrowRightIcon.displayName = 'ArrowRightIcon'
ArrowLeftIcon.displayName = 'ArrowLeftIcon'

export { ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon, ArrowUpIcon }

const AtSignIcon = createIcon({
  Root: Svg,
  viewBox: '0 0 24 24',
  path: (
    <>
      <>
        <Path
          d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M16 7.99999V13C16 13.7956 16.3161 14.5587 16.8787 15.1213C17.4413 15.6839 18.2044 16 19 16C19.7957 16 20.5587 15.6839 21.1213 15.1213C21.6839 14.5587 22 13.7956 22 13V12C21.9999 9.74302 21.2362 7.55247 19.8333 5.78452C18.4303 4.01658 16.4706 2.77521 14.2726 2.26229C12.0747 1.74936 9.76794 1.99503 7.72736 2.95936C5.68677 3.92368 4.03241 5.54995 3.03327 7.57371C2.03413 9.59748 1.74898 11.8997 2.22418 14.1061C2.69938 16.3125 3.90699 18.2932 5.65064 19.7263C7.39429 21.1593 9.57144 21.9603 11.8281 21.9991C14.0847 22.0379 16.2881 21.3122 18.08 19.94"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    </>
  ),
})

AtSignIcon.displayName = 'AtSignIcon'

export { AtSignIcon }

const BellIcon = createIcon({
  Root: Svg,
  viewBox: '0 0 24 24',
  path: (
    <>
      <Path
        d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.73 21C13.5542 21.3031 13.3018 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
})

BellIcon.displayName = 'BellIcon'

export { BellIcon }

const CalendarDaysIcon = createIcon({
  Root: Svg,
  viewBox: '0 0 24 24',
  path: (
    <>
      <Path
        d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16 2V6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8 2V6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3 10H21"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8 14H8.01"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 14H12.01"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16 14H16.01"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8 18H8.01"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 18H12.01"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16 18H16.01"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
})

CalendarDaysIcon.displayName = 'CalendarDaysIcon'

export { CalendarDaysIcon }

const CheckIcon = createIcon({
  Root: Svg,
  viewBox: '0 0 24 24',
  path: (
    <>
      <Path
        d="M20 6L9 17L4 12"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
})

const CheckCircleIcon = createIcon({
  Root: Svg,
  viewBox: '0 0 24 24',
  path: (
    <>
      <Path
        d="M12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9 12L11 14L15 10"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
})

CheckIcon.displayName = 'CheckIcon'
CheckCircleIcon.displayName = 'CheckCircleIcon'

export { CheckCircleIcon, CheckIcon }

const ChevronUpIcon = createIcon({
  Root: Svg,
  viewBox: '0 0 24 24',
  d: 'M12 10L8 6L4 10',
  path: (
    <>
      <Path
        d="M18 15L12 9L6 15"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
})

const ChevronDownIcon = createIcon({
  Root: Svg,
  viewBox: '0 0 24 24',
  path: (
    <>
      <Path
        d="M6 9L12 15L18 9"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
})

const ChevronLeftIcon = createIcon({
  Root: Svg,
  viewBox: '0 0 24 24',
  path: (
    <>
      <Path
        d="M15 18L9 12L15 6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
})

const ChevronRightIcon = createIcon({
  Root: Svg,

  viewBox: '0 0 24 24',
  path: (
    <>
      <Path
        d="M9 18L15 12L9 6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
})

const ChevronsLeftIcon = createIcon({
  Root: Svg,

  viewBox: '0 0 24 24',
  path: (
    <>
      <Path
        d="M11 17L6 12L11 7"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18 17L13 12L18 7"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
})

const ChevronsRightIcon = createIcon({
  Root: Svg,

  viewBox: '0 0 24 24',
  path: (
    <>
      <Path
        d="M13 17L18 12L13 7"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6 17L11 12L6 7"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
})

const ChevronsUpDownIcon = createIcon({
  Root: Svg,

  viewBox: '0 0 24 24',
  path: (
    <>
      <Path
        d="M7 15L12 20L17 15"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7 9L12 4L17 9"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
})

ChevronUpIcon.displayName = 'ChevronUpIcon'
ChevronDownIcon.displayName = 'ChevronDownIcon'
ChevronLeftIcon.displayName = 'ChevronLeftIcon'
ChevronRightIcon.displayName = 'ChevronRightIcon'
ChevronsLeftIcon.displayName = 'ChevronsLeftIcon'
ChevronsRightIcon.displayName = 'ChevronsRightIcon'
ChevronsUpDownIcon.displayName = 'ChevronsUpDownIcon'

export {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  ChevronsUpDownIcon,
  ChevronUpIcon,
}

const CircleIcon = createIcon({
  Root: Svg,
  viewBox: '0 0 24 24',
  path: (
    <>
      <Path
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
})

CircleIcon.displayName = 'CircleIcon'

export { CircleIcon }

const ClockIcon = createIcon({
  Root: Svg,
  viewBox: '0 0 24 24',
  path: (
    <>
      <Path
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 6V12L16 14"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
})

ClockIcon.displayName = 'ClockIcon'

export { ClockIcon }

const CloseIcon = createIcon({
  Root: Svg,
  viewBox: '0 0 24 24',
  path: (
    <>
      <Path
        d="M18 6L6 18"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6 6L18 18"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
})

const CloseCircleIcon = createIcon({
  Root: Svg,
  viewBox: '0 0 24 24',
  path: (
    <>
      <Path
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15 9L9 15"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9 9L15 15"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
})

CloseIcon.displayName = 'CloseIcon'
CloseCircleIcon.displayName = 'CloseCircleIcon'

export { CloseCircleIcon, CloseIcon }

const CopyIcon = createIcon({
  Root: Svg,
  viewBox: '0 0 24 24',
  path: (
    <>
      <Path
        d="M20 9H11C9.89543 9 9 9.89543 9 11V20C9 21.1046 9.89543 22 11 22H20C21.1046 22 22 21.1046 22 20V11C22 9.89543 21.1046 9 20 9Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5 15H4C3.46957 15 2.96086 14.7893 2.58579 14.4142C2.21071 14.0391 2 13.5304 2 13V4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H13C13.5304 2 14.0391 2.21071 14.4142 2.58579C14.7893 2.96086 15 3.46957 15 4V5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
})

CopyIcon.displayName = 'CopyIcon'

export { CopyIcon }

const DownloadIcon = createIcon({
  Root: Svg,
  viewBox: '0 0 24 24',
  path: (
    <>
      <Path
        d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7 10L12 15L17 10"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 15V3"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
})

DownloadIcon.displayName = 'DownloadIcon'
export { DownloadIcon }

const EditIcon = createIcon({
  Root: Svg,
  viewBox: '0 0 24 24',
  path: (
    <>
      <Path
        d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
})

EditIcon.displayName = 'EditIcon'
export { EditIcon }

const EyeIcon = createIcon({
  Root: Svg,
  viewBox: '0 0 24 24',
  path: (
    <>
      <Path
        d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
})

EyeIcon.displayName = 'EyeIcon'

const EyeOffIcon = createIcon({
  Root: Svg,
  viewBox: '0 0 24 24',
  path: (
    <>
      <Path
        d="M9.88 9.88C9.58525 10.1546 9.34884 10.4859 9.18487 10.8538C9.02091 11.2218 8.93274 11.6191 8.92563 12.0219C8.91852 12.4247 8.99262 12.8248 9.14351 13.1984C9.29439 13.5719 9.51897 13.9113 9.80384 14.1962C10.0887 14.481 10.4281 14.7056 10.8016 14.8565C11.1752 15.0074 11.5753 15.0815 11.9781 15.0744C12.3809 15.0673 12.7782 14.9791 13.1461 14.8151C13.5141 14.6512 13.8453 14.4147 14.12 14.12"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.73 5.08C11.1513 5.02751 11.5754 5.00079 12 5C19 5 22 12 22 12C21.5529 12.9571 20.9922 13.8569 20.33 14.68"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.61 6.61C4.62125 7.96462 3.02987 9.82526 2 12C2 12 5 19 12 19C13.9159 19.0051 15.7908 18.4451 17.39 17.39"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2 2L22 22"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
})

EyeOffIcon.displayName = 'EyeOffIcon'
export { EyeIcon, EyeOffIcon }

const FavouriteIcon = createIcon({
  Root: Svg,
  viewBox: '0 0 24 24',
  path: (
    <>
      <Path
        d="M20.42 4.58C19.9183 4.07658 19.3222 3.67714 18.6658 3.40459C18.0094 3.13204 17.3057 2.99174 16.595 2.99174C15.8843 2.99174 15.1806 3.13204 14.5242 3.40459C13.8678 3.67714 13.2717 4.07658 12.77 4.58L12 5.36L11.23 4.58C10.7283 4.07658 10.1322 3.67714 9.47582 3.40459C8.81944 3.13204 8.11571 2.99174 7.40499 2.99174C6.69428 2.99174 5.99055 3.13204 5.33417 3.40459C4.67779 3.67714 4.08167 4.07658 3.57999 4.58C1.45999 6.7 1.32999 10.28 3.99999 13L12 21L20 13C22.67 10.28 22.54 6.7 20.42 4.58Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
})

FavouriteIcon.displayName = 'FavouriteIcon'
export { FavouriteIcon }

const GlobeIcon = createIcon({
  Root: Svg,
  viewBox: '0 0 24 24',
  path: (
    <>
      <Path
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2 12H22"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2V2Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
})

GlobeIcon.displayName = 'GlobeIcon'
export { GlobeIcon }

const GripVerticalIcon = createIcon({
  Root: Svg,
  viewBox: '0 0 24 24',
  path: (
    <>
      <Path
        d="M9 13C9.55228 13 10 12.5523 10 12C10 11.4477 9.55228 11 9 11C8.44772 11 8 11.4477 8 12C8 12.5523 8.44772 13 9 13Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9 6C9.55228 6 10 5.55228 10 5C10 4.44772 9.55228 4 9 4C8.44772 4 8 4.44772 8 5C8 5.55228 8.44772 6 9 6Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9 20C9.55228 20 10 19.5523 10 19C10 18.4477 9.55228 18 9 18C8.44772 18 8 18.4477 8 19C8 19.5523 8.44772 20 9 20Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15 13C15.5523 13 16 12.5523 16 12C16 11.4477 15.5523 11 15 11C14.4477 11 14 11.4477 14 12C14 12.5523 14.4477 13 15 13Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15 6C15.5523 6 16 5.55228 16 5C16 4.44772 15.5523 4 15 4C14.4477 4 14 4.44772 14 5C14 5.55228 14.4477 6 15 6Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15 20C15.5523 20 16 19.5523 16 19C16 18.4477 15.5523 18 15 18C14.4477 18 14 18.4477 14 19C14 19.5523 14.4477 20 15 20Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
})

GripVerticalIcon.displayName = 'GripVerticalIcon'
export { GripVerticalIcon }

const HelpCircleIcon = createIcon({
  Root: Svg,
  viewBox: '0 0 24 24',
  path: (
    <>
      <Path
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.09 9.00001C9.3251 8.33167 9.78915 7.76811 10.4 7.40914C11.0108 7.05016 11.7289 6.91894 12.4272 7.03872C13.1255 7.15849 13.7588 7.52153 14.2151 8.06353C14.6713 8.60554 14.9211 9.29153 14.92 10C14.92 12 11.92 13 11.92 13"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 17H12.01"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
})

HelpCircleIcon.displayName = 'HelpCircleIcon'
export { HelpCircleIcon }

const InfoIcon = createIcon({
  Root: Svg,
  viewBox: '0 0 24 24',
  path: (
    <>
      <Path
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 16V12"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 8H12.01"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
})

InfoIcon.displayName = 'InfoIcon'
export { InfoIcon }

const LinkIcon = createIcon({
  Root: Svg,
  viewBox: '0 0 24 24',
  path: (
    <>
      <Path
        d="M10 13C10.4295 13.5741 10.9774 14.0492 11.6066 14.3929C12.2357 14.7367 12.9315 14.9411 13.6467 14.9923C14.3618 15.0435 15.0796 14.9404 15.7513 14.6898C16.4231 14.4392 17.0331 14.0471 17.54 13.54L20.54 10.54C21.4508 9.59699 21.9548 8.33397 21.9434 7.02299C21.932 5.71201 21.4061 4.45794 20.4791 3.5309C19.5521 2.60386 18.298 2.07802 16.987 2.06663C15.676 2.05523 14.413 2.55921 13.47 3.47L11.75 5.18"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14 11C13.5705 10.4259 13.0226 9.95083 12.3935 9.60707C11.7643 9.26331 11.0685 9.05889 10.3534 9.00768C9.63821 8.95646 8.92041 9.05964 8.24866 9.31023C7.5769 9.56082 6.96689 9.95294 6.46 10.46L3.46 13.46C2.54921 14.403 2.04524 15.666 2.05663 16.977C2.06802 18.288 2.59387 19.5421 3.52091 20.4691C4.44795 21.3961 5.70201 21.922 7.013 21.9334C8.32398 21.9448 9.58699 21.4408 10.53 20.53L12.24 18.82"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
})

LinkIcon.displayName = 'LinkIcon'

const ExternalLinkIcon = createIcon({
  Root: Svg,
  viewBox: '0 0 24 24',
  path: (
    <>
      <Path
        d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15 3H21V9"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10 14L21 3"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
})

ExternalLinkIcon.displayName = 'ExternalLinkIcon'
export { ExternalLinkIcon, LinkIcon }

const LoaderIcon = createIcon({
  Root: Svg,
  viewBox: '0 0 24 24',
  path: (
    <>
      <Path
        d="M21 12C20.9999 13.9006 20.3981 15.7524 19.2809 17.2899C18.1637 18.8275 16.5885 19.9719 14.7809 20.5592C12.9733 21.1464 11.0262 21.1464 9.21864 20.559C7.41109 19.9716 5.83588 18.8271 4.71876 17.2895C3.60165 15.7519 2.99999 13.9001 3 11.9995C3.00001 10.0989 3.60171 8.24711 4.71884 6.7095C5.83598 5.17189 7.4112 4.02741 9.21877 3.44008C11.0263 2.85274 12.9734 2.85272 14.781 3.44"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
})

LoaderIcon.displayName = 'LoaderIcon'
export { LoaderIcon }

const LockIcon = createIcon({
  Root: Svg,
  viewBox: '0 0 24 24',
  path: (
    <>
      <Path
        d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
})

LockIcon.displayName = 'LockIcon'
export { LockIcon }

const MailIcon = createIcon({
  Root: Svg,
  viewBox: '0 0 24 24',
  path: (
    <>
      <Path
        d="M20 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M22 7L13.03 12.7C12.7213 12.8934 12.3643 12.996 12 12.996C11.6357 12.996 11.2787 12.8934 10.97 12.7L2 7"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
})

MailIcon.displayName = 'MailIcon'
export { MailIcon }

const MenuIcon = createIcon({
  Root: Svg,
  viewBox: '0 0 24 24',
  path: (
    <>
      <Path
        d="M4 12H20"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M4 6H20"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M4 18H20"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
})

MenuIcon.displayName = 'MenuIcon'
export { MenuIcon }

const MessageCircleIcon = createIcon({
  Root: Svg,
  viewBox: '0 0 24 24',
  path: (
    <>
      <Path
        d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7117 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0034 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92176 4.44061 8.37485 5.27072 7.03255C6.10083 5.69025 7.28825 4.60557 8.7 3.9C9.87812 3.30493 11.1801 2.99656 12.5 3H13C15.0843 3.11499 17.053 3.99476 18.5291 5.47086C20.0052 6.94695 20.885 8.91565 21 11V11.5Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
})

MessageCircleIcon.displayName = 'MessageCircleIcon'

export { MessageCircleIcon }

const MoonIcon = createIcon({
  Root: Svg,
  viewBox: '0 0 24 24',
  path: (
    <>
      <Path
        d="M12 3C10.8134 4.19491 10.1488 5.81141 10.1518 7.49539C10.1547 9.17936 10.825 10.7935 12.0157 11.9843C13.2065 13.175 14.8206 13.8453 16.5046 13.8482C18.1886 13.8512 19.8051 13.1866 21 12C21 13.78 20.4722 15.5201 19.4832 17.0001C18.4943 18.4802 17.0887 19.6337 15.4442 20.3149C13.7996 20.9961 11.99 21.1743 10.2442 20.8271C8.49836 20.4798 6.89472 19.6226 5.63604 18.364C4.37737 17.1053 3.5202 15.5016 3.17294 13.7558C2.82567 12.01 3.0039 10.2004 3.68509 8.55585C4.36628 6.91131 5.51983 5.50571 6.99987 4.51677C8.47991 3.52784 10.22 3 12 3V3Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
})

MoonIcon.displayName = 'MoonIcon'
export { MoonIcon }

const PaperclipIcon = createIcon({
  Root: Svg,
  viewBox: '0 0 24 24',
  path: (
    <>
      <Path
        d="M21.44 11.05L12.25 20.24C11.1242 21.3658 9.59718 21.9983 8.005 21.9983C6.41282 21.9983 4.88584 21.3658 3.76 20.24C2.63416 19.1141 2.00166 17.5872 2.00166 15.995C2.00166 14.4028 2.63416 12.8758 3.76 11.75L12.33 3.17997C13.0806 2.42808 14.0991 2.00515 15.1615 2.00421C16.2239 2.00328 17.2431 2.42441 17.995 3.17497C18.7469 3.92554 19.1698 4.94404 19.1708 6.00644C19.1717 7.06883 18.7506 8.08808 18 8.83997L9.41 17.41C9.03472 17.7853 8.52573 17.9961 7.995 17.9961C7.46427 17.9961 6.95528 17.7853 6.58 17.41C6.20472 17.0347 5.99389 16.5257 5.99389 15.995C5.99389 15.4642 6.20472 14.9553 6.58 14.58L15.07 6.09997"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
})

PaperclipIcon.displayName = 'PaperclipIcon'
export { PaperclipIcon }

const PhoneIcon = createIcon({
  Root: Svg,
  viewBox: '0 0 24 24',
  path: (
    <>
      <Path
        d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7294C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1469 21.5901 20.9046 21.7335 20.6408 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5342 11.19 18.85C8.77383 17.3147 6.72534 15.2662 5.19 12.85C3.49998 10.2412 2.44824 7.271 2.12 4.18001C2.09501 3.90347 2.12788 3.62477 2.2165 3.36163C2.30513 3.09849 2.44757 2.85669 2.63477 2.65163C2.82196 2.44656 3.04981 2.28271 3.30379 2.17053C3.55778 2.05834 3.83234 2.00027 4.11 2.00001H7.11C7.59531 1.99523 8.06579 2.16708 8.43376 2.48354C8.80173 2.79999 9.04208 3.23945 9.11 3.72001C9.23662 4.68007 9.47145 5.62273 9.81 6.53001C9.94455 6.88793 9.97366 7.27692 9.89391 7.65089C9.81415 8.02485 9.62886 8.36812 9.36 8.64001L8.09 9.91001C9.51356 12.4136 11.5865 14.4865 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9752 14.1859 16.3491 14.1061C16.7231 14.0263 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
})

PhoneIcon.displayName = 'PhoneIcon'
export { PhoneIcon }

const PlayIcon = createIcon({
  Root: Svg,
  viewBox: '0 0 24 24',
  path: (
    <>
      <Path
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10 8L16 12L10 16V8Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
})

PlayIcon.displayName = 'PlayIcon'
export { PlayIcon }

const RemoveIcon = createIcon({
  Root: Svg,
  viewBox: '0 0 24 24',
  path: (
    <>
      <Path
        d="M5 12H19"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
})

RemoveIcon.displayName = 'RemoveIcon'
export { RemoveIcon }

const RepeatIcon = createIcon({
  Root: Svg,
  viewBox: '0 0 24 24',
  path: (
    <>
      <Path
        d="M17 2L21 6L17 10"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3 11V10C3 8.93913 3.42143 7.92172 4.17157 7.17157C4.92172 6.42143 5.93913 6 7 6H21"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7 22L3 18L7 14"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M21 13V14C21 15.0609 20.5786 16.0783 19.8284 16.8284C19.0783 17.5786 18.0609 18 17 18H3"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
})

RepeatIcon.displayName = 'RepeatIcon'

const Repeat1Icon = createIcon({
  Root: Svg,
  viewBox: '0 0 24 24',
  path: (
    <>
      <Path
        d="M17 2L21 6L17 10"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3 11V10C3 8.93913 3.42143 7.92172 4.17157 7.17157C4.92172 6.42143 5.93913 6 7 6H21"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7 22L3 18L7 14"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M21 13V14C21 15.0609 20.5786 16.0783 19.8284 16.8284C19.0783 17.5786 18.0609 18 17 18H3"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11 10H12V14"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
})

Repeat1Icon.displayName = 'Repeat1Icon'
export { Repeat1Icon, RepeatIcon }

const SearchIcon = createIcon({
  Root: Svg,
  viewBox: '0 0 24 24',
  path: (
    <>
      <Path
        d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M21 21L16.65 16.65"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
})

SearchIcon.displayName = 'SearchIcon'
export { SearchIcon }

const SettingsIcon = createIcon({
  Root: Svg,
  viewBox: '0 0 24 24',
  path: (
    <>
      <Path
        d="M12.22 2H11.78C11.2496 2 10.7409 2.21071 10.3658 2.58579C9.99072 2.96086 9.78 3.46957 9.78 4V4.18C9.77964 4.53073 9.68706 4.87519 9.51154 5.17884C9.33602 5.48248 9.08374 5.73464 8.78 5.91L8.35 6.16C8.04596 6.33554 7.70108 6.42795 7.35 6.42795C6.99893 6.42795 6.65404 6.33554 6.35 6.16L6.2 6.08C5.74107 5.81526 5.19584 5.74344 4.684 5.88031C4.17217 6.01717 3.73555 6.35154 3.47 6.81L3.25 7.19C2.98526 7.64893 2.91345 8.19416 3.05031 8.706C3.18717 9.21783 3.52154 9.65445 3.98 9.92L4.13 10.02C4.43228 10.1945 4.68362 10.4451 4.85905 10.7468C5.03448 11.0486 5.1279 11.391 5.13 11.74V12.25C5.1314 12.6024 5.03965 12.949 4.86405 13.2545C4.68844 13.5601 4.43521 13.8138 4.13 13.99L3.98 14.08C3.52154 14.3456 3.18717 14.7822 3.05031 15.294C2.91345 15.8058 2.98526 16.3511 3.25 16.81L3.47 17.19C3.73555 17.6485 4.17217 17.9828 4.684 18.1197C5.19584 18.2566 5.74107 18.1847 6.2 17.92L6.35 17.84C6.65404 17.6645 6.99893 17.5721 7.35 17.5721C7.70108 17.5721 8.04596 17.6645 8.35 17.84L8.78 18.09C9.08374 18.2654 9.33602 18.5175 9.51154 18.8212C9.68706 19.1248 9.77964 19.4693 9.78 19.82V20C9.78 20.5304 9.99072 21.0391 10.3658 21.4142C10.7409 21.7893 11.2496 22 11.78 22H12.22C12.7504 22 13.2591 21.7893 13.6342 21.4142C14.0093 21.0391 14.22 20.5304 14.22 20V19.82C14.2204 19.4693 14.3129 19.1248 14.4885 18.8212C14.664 18.5175 14.9163 18.2654 15.22 18.09L15.65 17.84C15.954 17.6645 16.2989 17.5721 16.65 17.5721C17.0011 17.5721 17.346 17.6645 17.65 17.84L17.8 17.92C18.2589 18.1847 18.8042 18.2566 19.316 18.1197C19.8278 17.9828 20.2645 17.6485 20.53 17.19L20.75 16.8C21.0147 16.3411 21.0866 15.7958 20.9497 15.284C20.8128 14.7722 20.4785 14.3356 20.02 14.07L19.87 13.99C19.5648 13.8138 19.3116 13.5601 19.136 13.2545C18.9604 12.949 18.8686 12.6024 18.87 12.25V11.75C18.8686 11.3976 18.9604 11.051 19.136 10.7455C19.3116 10.4399 19.5648 10.1862 19.87 10.01L20.02 9.92C20.4785 9.65445 20.8128 9.21783 20.9497 8.706C21.0866 8.19416 21.0147 7.64893 20.75 7.19L20.53 6.81C20.2645 6.35154 19.8278 6.01717 19.316 5.88031C18.8042 5.74344 18.2589 5.81526 17.8 6.08L17.65 6.16C17.346 6.33554 17.0011 6.42795 16.65 6.42795C16.2989 6.42795 15.954 6.33554 15.65 6.16L15.22 5.91C14.9163 5.73464 14.664 5.48248 14.4885 5.17884C14.3129 4.87519 14.2204 4.53073 14.22 4.18V4C14.22 3.46957 14.0093 2.96086 13.6342 2.58579C13.2591 2.21071 12.7504 2 12.22 2V2Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
})

SettingsIcon.displayName = 'SettingsIcon'
export { SettingsIcon }

const ShareIcon = createIcon({
  Root: Svg,
  viewBox: '0 0 24 24',
  path: (
    <>
      <Path
        d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 6.65685 16.3431 8 18 8Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6 15C7.65685 15 9 13.6569 9 12C9 10.3431 7.65685 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C16.3431 16 15 17.3431 15 19C15 20.6569 16.3431 22 18 22Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.59 13.51L15.42 17.49"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.41 6.51L8.59 10.49"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
})

ShareIcon.displayName = 'ShareIcon'
export { ShareIcon }

const SlashIcon = createIcon({
  Root: Svg,
  viewBox: '0 0 24 24',
  path: (
    <>
      <Path
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M4.92999 4.92999L19.07 19.07"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
})

SlashIcon.displayName = 'SlashIcon'
export { SlashIcon }

const StarIcon = createIcon({
  Root: Svg,
  viewBox: '0 0 24 24',
  path: (
    <>
      <Path
        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
})

StarIcon.displayName = 'StarIcon'
export { StarIcon }

const SunIcon = createIcon({
  Root: Svg,
  viewBox: '0 0 24 24',
  path: (
    <>
      <Path
        d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 2V4"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 20V22"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M4.92999 4.93L6.33999 6.34"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17.66 17.66L19.07 19.07"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2 12H4"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M20 12H22"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.33999 17.66L4.92999 19.07"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M19.07 4.93L17.66 6.34"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
})

SunIcon.displayName = 'SunIcon'
export { SunIcon }

const ThreeDotsIcon = createIcon({
  Root: Svg,
  viewBox: '0 0 24 24',
  path: (
    <>
      <Path
        d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44771 11 4 11.4477 4 12C4 12.5523 4.44771 13 5 13Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
})

ThreeDotsIcon.displayName = 'ThreeDotsIcon'
export { ThreeDotsIcon }

const TrashIcon = createIcon({
  Root: Svg,
  viewBox: '0 0 24 24',
  path: (
    <>
      <Path
        d="M3 6H21"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M19 6V20C19 21 18 22 17 22H7C6 22 5 21 5 20V6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8 6V4C8 3 9 2 10 2H14C15 2 16 3 16 4V6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
})

TrashIcon.displayName = 'TrashIcon'
export { TrashIcon }

const UnlockIcon = createIcon({
  Root: Svg,
  viewBox: '0 0 24 24',
  path: (
    <>
      <Path
        d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7 11V7C6.99876 5.76005 7.45828 4.56387 8.28938 3.64367C9.12047 2.72347 10.2638 2.1449 11.4975 2.02029C12.7312 1.89568 13.9671 2.2339 14.9655 2.96931C15.9638 3.70472 16.6533 4.78485 16.9 6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
})

UnlockIcon.displayName = 'UnlockIcon'
export { UnlockIcon }

const AccessIcon = createIcon({
  Root: Svg,
  viewBox: '0 0 32 32',
  path: (
    <>
      <Path
        stroke="none"
        d="M9.33335 3.66675C6.20374 3.66675 3.66669 6.2038 3.66669 9.33341C3.66669 11.4296 4.80437 13.2613 6.50075 14.2426L7.00002 14.5314V23.7909C7.00002 24.9625 7.01772 25.2698 7.12689 25.5333C7.23605 25.7969 7.44078 26.0266 8.26922 26.8551L9.33335 27.9192L11.4372 25.8154C11.5054 25.7471 11.5435 25.7089 11.5718 25.6792C11.5959 25.6538 11.6001 25.6477 11.5983 25.65C11.6335 25.6039 11.6561 25.5495 11.6637 25.492C11.664 25.4892 11.6649 25.4785 11.6656 25.4528C11.6666 25.4118 11.6667 25.3579 11.6667 25.2613C11.6667 25.1831 11.6666 25.1397 11.6659 25.1066C11.6653 25.0779 11.6647 25.075 11.6647 25.075C11.6596 25.0278 11.6444 24.9822 11.6201 24.9413C11.6201 24.9413 11.6189 24.9387 11.6021 24.9153C11.5829 24.8884 11.5569 24.8537 11.51 24.7911L9.86669 22.6001C9.60002 22.2445 9.60002 21.7556 9.86669 21.4001L10.8 20.1556C11.3674 19.3991 11.5075 19.1927 11.5812 18.9716C11.6549 18.7505 11.6667 18.5013 11.6667 17.5556V14.5314L12.166 14.2426C13.8623 13.2613 15 11.4296 15 9.33341C15 6.2038 12.463 3.66675 9.33335 3.66675ZM1.66669 9.33341C1.66669 5.09923 5.09917 1.66675 9.33335 1.66675C13.5675 1.66675 17 5.09923 17 9.33341C17 11.9607 15.678 14.2783 13.6667 15.6587V17.5556C13.6667 17.5993 13.6667 17.6425 13.6668 17.6852C13.6673 18.4397 13.6678 19.0362 13.4785 19.604C13.2892 20.1719 12.931 20.6488 12.4778 21.2521C12.4522 21.2862 12.4262 21.3207 12.4 21.3556L11.9167 22.0001L13.11 23.5911C13.1157 23.5988 13.1216 23.6066 13.1274 23.6144C13.1988 23.7094 13.2751 23.811 13.3408 23.9219C13.5104 24.2081 13.6168 24.5274 13.6529 24.8582C13.6669 24.9863 13.6668 25.1133 13.6667 25.2322C13.6667 25.2419 13.6667 25.2516 13.6667 25.2613C13.6667 25.2733 13.6667 25.2853 13.6667 25.2974C13.6669 25.444 13.667 25.6003 13.6462 25.7563C13.5924 26.1596 13.4341 26.5418 13.1869 26.8651C13.0914 26.9901 12.9807 27.1005 12.8769 27.2041C12.8684 27.2126 12.8598 27.2211 12.8514 27.2296L10.0405 30.0405C9.64994 30.431 9.01677 30.431 8.62625 30.0405L6.85501 28.2693C6.81657 28.2308 6.77856 28.1929 6.74099 28.1554C6.08171 27.4974 5.55994 26.9766 5.27913 26.2987C4.99832 25.6207 4.99903 24.8835 4.99992 23.9521C4.99997 23.899 5.00002 23.8453 5.00002 23.7909V15.6587C2.98871 14.2783 1.66669 11.9607 1.66669 9.33341ZM26.7244 7.6898C26.3944 7.66729 25.9683 7.66675 25.3334 7.66675H20C19.4477 7.66675 19 7.21903 19 6.66675C19 6.11446 19.4477 5.66675 20 5.66675L25.367 5.66675C25.9596 5.66674 26.4544 5.66673 26.8605 5.69444C27.2833 5.72329 27.6827 5.78548 28.0699 5.94586C28.9683 6.318 29.6821 7.03181 30.0542 7.93024C30.2146 8.31743 30.2768 8.71679 30.3057 9.13959C30.3334 9.54574 30.3334 10.0405 30.3334 10.6331V10.7004C30.3334 11.293 30.3334 11.7878 30.3057 12.1939C30.2768 12.6167 30.2146 13.0161 30.0542 13.4033C29.6821 14.3017 28.9683 15.0155 28.0699 15.3876C27.6827 15.548 27.2833 15.6102 26.8605 15.6391C26.4544 15.6668 25.9596 15.6668 25.367 15.6667H20C19.4477 15.6667 19 15.219 19 14.6667C19 14.1145 19.4477 13.6667 20 13.6667H25.3334C25.9683 13.6667 26.3944 13.6662 26.7244 13.6437C27.0453 13.6218 27.2016 13.5825 27.3045 13.5399C27.7129 13.3707 28.0373 13.0463 28.2065 12.6379C28.2491 12.535 28.2884 12.3787 28.3103 12.0578C28.3328 11.7278 28.3334 11.3017 28.3334 10.6667C28.3334 10.0318 28.3328 9.60569 28.3103 9.27574C28.2884 8.95477 28.2491 8.79848 28.2065 8.69561C28.0373 8.28723 27.7129 7.96277 27.3045 7.79362C27.2016 7.75101 27.0453 7.7117 26.7244 7.6898ZM8.33335 9.33341C8.33335 8.78113 8.78107 8.33341 9.33335 8.33341H9.34533C9.89761 8.33341 10.3453 8.78113 10.3453 9.33341C10.3453 9.8857 9.89761 10.3334 9.34533 10.3334H9.33335C8.78107 10.3334 8.33335 9.8857 8.33335 9.33341ZM16.3334 18.6667C16.3334 18.1145 16.7811 17.6667 17.3334 17.6667H25.367C25.9596 17.6667 26.4544 17.6667 26.8605 17.6944C27.2833 17.7233 27.6827 17.7855 28.0699 17.9459C28.9683 18.318 29.6821 19.0318 30.0542 19.9302C30.2146 20.3174 30.2768 20.7168 30.3057 21.1396C30.3334 21.5457 30.3334 22.0405 30.3334 22.6331V22.7004C30.3334 23.293 30.3334 23.7878 30.3057 24.1939C30.2768 24.6167 30.2146 25.0161 30.0542 25.4033C29.6821 26.3017 28.9683 27.0155 28.0699 27.3876C27.6827 27.548 27.2833 27.6102 26.8605 27.6391C26.4544 27.6668 25.9596 27.6668 25.367 27.6667H17.3334C16.7811 27.6667 16.3334 27.219 16.3334 26.6667C16.3334 26.1145 16.7811 25.6667 17.3334 25.6667H25.3334C25.9683 25.6667 26.3944 25.6662 26.7244 25.6437C27.0453 25.6218 27.2016 25.5825 27.3045 25.5399C27.7129 25.3707 28.0373 25.0463 28.2065 24.6379C28.2491 24.535 28.2884 24.3787 28.3103 24.0578C28.3328 23.7278 28.3334 23.3017 28.3334 22.6667C28.3334 22.0318 28.3328 21.6057 28.3103 21.2757C28.2884 20.9548 28.2491 20.7985 28.2065 20.6956C28.0373 20.2872 27.7129 19.9628 27.3045 19.7936C27.2016 19.751 27.0453 19.7117 26.7244 19.6898C26.3944 19.6673 25.9683 19.6667 25.3334 19.6667H17.3334C16.7811 19.6667 16.3334 19.219 16.3334 18.6667Z"
      />
    </>
  ),
})

AccessIcon.displayName = 'AccessIcon'
export { AccessIcon }

const AlertCircle02Icon = createIcon({
  Root: Svg,
  viewBox: '0 0 32 32',
  path: (
    <>
      <Path
        stroke="none"
        d="M16 3.66675C9.18851 3.66675 3.66669 9.18857 3.66669 16.0001C3.66669 22.8116 9.18851 28.3334 16 28.3334C22.8115 28.3334 28.3334 22.8116 28.3334 16.0001C28.3334 9.18857 22.8115 3.66675 16 3.66675ZM1.66669 16.0001C1.66669 8.084 8.08394 1.66675 16 1.66675C23.9161 1.66675 30.3334 8.084 30.3334 16.0001C30.3334 23.9162 23.9161 30.3334 16 30.3334C8.08394 30.3334 1.66669 23.9162 1.66669 16.0001Z"
      />
      <Path
        stroke="none"
        d="M14.656 20.0001C14.656 19.2637 15.253 18.6667 15.9894 18.6667H16.0014C16.7377 18.6667 17.3347 19.2637 17.3347 20.0001C17.3347 20.7365 16.7377 21.3334 16.0014 21.3334H15.9894C15.253 21.3334 14.656 20.7365 14.656 20.0001Z"
      />
      <Path
        stroke="none"
        d="M16 9.66675C16.5523 9.66675 17 10.1145 17 10.6667V16.0001C17 16.5524 16.5523 17.0001 16 17.0001C15.4477 17.0001 15 16.5524 15 16.0001V10.6667C15 10.1145 15.4477 9.66675 16 9.66675Z"
      />
    </>
  ),
})

AlertCircle02Icon.displayName = 'AlertCircle02Icon'
export { AlertCircle02Icon }

const ArrowDown01Icon = createIcon({
  Root: Svg,
  viewBox: '0 0 32 32',
  path: (
    <>
      <Path
        stroke="none"
        d="M7.40629 11.1954C7.30062 11.2733 7.21133 11.3713 7.14354 11.4838C7.07575 11.5963 7.03077 11.721 7.01119 11.8509C6.9916 11.9807 6.99778 12.1132 7.02938 12.2407C7.06098 12.3681 7.11738 12.4881 7.19536 12.5938C7.19536 12.5938 8.68387 14.6185 10.4532 16.6563C11.3378 17.6752 12.2914 18.699 13.198 19.5C14.1045 20.301 14.8405 21 16 21C17.1595 21 17.8956 20.301 18.8021 19.5C19.7087 18.6991 20.6623 17.6752 21.5469 16.6563C23.3162 14.6185 24.8047 12.5938 24.8047 12.5938C24.8827 12.4881 24.9391 12.3681 24.9707 12.2407C25.0023 12.1132 25.0085 11.9807 24.9889 11.8509C24.9693 11.721 24.9243 11.5963 24.8565 11.4838C24.7888 11.3713 24.6995 11.2733 24.5938 11.1954C24.4881 11.1174 24.3681 11.061 24.2407 11.0294C24.1132 10.9978 23.9807 10.9916 23.8509 11.0112C23.721 11.0308 23.5963 11.0757 23.4838 11.1435C23.3713 11.2113 23.2733 11.3006 23.1954 11.4063C23.1954 11.4063 21.7401 13.3816 20.0365 15.3438C19.1847 16.3249 18.2677 17.301 17.4766 18C16.6855 18.699 15.8946 19 16 19C16.1054 19 15.3146 18.699 14.5235 18C13.7324 17.301 12.8154 16.3249 11.9636 15.3438C10.26 13.3816 8.80473 11.4063 8.80473 11.4063C8.72676 11.3006 8.62874 11.2113 8.51626 11.1435C8.40379 11.0757 8.27906 11.0308 8.1492 11.0112C8.01934 10.9916 7.8869 10.9978 7.75943 11.0294C7.63196 11.061 7.51196 11.1174 7.40629 11.1954Z"
      />
    </>
  ),
})

ArrowDown01Icon.displayName = 'ArrowDown01Icon'
export { ArrowDown01Icon }

const ArrowLeft02Icon = createIcon({
  Root: Svg,
  viewBox: '0 0 32 32',
  path: (
    <>
      <Path
        stroke="none"
        d="M12.5925 10.1385C13.0372 9.81098 13.1322 9.18499 12.8047 8.74031C12.4772 8.29561 11.8512 8.20061 11.4065 8.52812L11.9995 9.33332C11.4065 8.52812 11.4065 8.52812 11.4065 8.52812L11.4047 8.52941L11.4006 8.53249L11.3851 8.54389L11.3271 8.58706C11.2766 8.62465 11.2033 8.67954 11.1103 8.74975C10.9245 8.89014 10.6598 9.09202 10.3426 9.33957C9.70922 9.83386 8.86135 10.514 8.01055 11.2527C7.16471 11.9871 6.29311 12.799 5.62511 13.555C5.29211 13.9319 4.98857 14.3184 4.76286 14.6928C4.5537 15.0398 4.33282 15.5018 4.33282 15.9999C4.33283 16.498 4.55371 16.9601 4.76287 17.3071C4.98858 17.6815 5.29211 18.068 5.6251 18.4449C6.2931 19.2009 7.1647 20.0128 8.01052 20.7472C8.86131 21.4859 9.70918 22.1661 10.3425 22.6604C10.6598 22.9079 10.9244 23.1098 11.1103 23.2502C11.2032 23.3204 11.2766 23.3753 11.327 23.4129L11.3851 23.4561L11.4005 23.4675L11.4047 23.4705L11.4058 23.4714C11.4058 23.4714 11.4064 23.4718 11.9994 22.6667L11.4058 23.4714C11.8505 23.7989 12.4771 23.7044 12.8046 23.2597C13.1321 22.815 13.0372 22.189 12.5925 21.8615L12.5887 21.8587L12.5755 21.849L12.5221 21.8093C12.4749 21.7741 12.405 21.7218 12.3157 21.6543C12.137 21.5193 11.8808 21.3239 11.573 21.0837C10.9564 20.6025 10.1376 19.9454 9.32175 19.237C8.50093 18.5243 7.70587 17.7793 7.12388 17.1206C7.08763 17.0796 7.05253 17.0393 7.0186 16.9997L26.6665 16.9997C27.2188 16.9997 27.6665 16.5519 27.6665 15.9997C27.6665 15.4474 27.2188 14.9997 26.6665 14.9997L7.01907 14.9997C7.05286 14.9602 7.08779 14.9201 7.12386 14.8793C7.70586 14.2206 8.50092 13.4756 9.32176 12.7629C10.1376 12.0546 10.9564 11.3975 11.573 10.9163C11.8808 10.6761 12.137 10.4807 12.3157 10.3457C12.4051 10.2782 12.475 10.2259 12.5222 10.1907L12.5756 10.151L12.5888 10.1413L12.5925 10.1385Z"
      />
    </>
  ),
})

ArrowLeft02Icon.displayName = 'ArrowLeft02Icon'
export { ArrowLeft02Icon }

const ArrowRight02Icon = createIcon({
  Root: Svg,
  viewBox: '0 0 32 32',
  path: (
    <>
      <Path
        stroke="none"
        d="M20.0078 8.33328C19.8499 8.33205 19.694 8.36821 19.5527 8.43882C19.4115 8.50944 19.289 8.61248 19.1953 8.73953C19.1173 8.8452 19.0609 8.9652 19.0293 9.09267C18.9977 9.22014 18.9915 9.35258 19.0111 9.48244C19.0307 9.6123 19.0757 9.73703 19.1435 9.8495C19.2113 9.96198 19.3006 10.06 19.4062 10.138C19.4062 10.138 21.0482 11.3487 22.6771 12.763C23.4915 13.4701 24.301 14.2305 24.875 14.8802C24.9106 14.9205 24.941 14.9597 24.9739 14.9999H5.33331C5.0681 14.9999 4.81374 15.1053 4.62621 15.2928C4.43867 15.4804 4.33331 15.7347 4.33331 15.9999C4.33331 16.2652 4.43867 16.5195 4.62621 16.7071C4.81374 16.8946 5.0681 16.9999 5.33331 16.9999H24.9739C24.941 17.0402 24.9106 17.0794 24.875 17.1197C24.301 17.7694 23.4915 18.5298 22.6771 19.2369C21.0483 20.6512 19.4062 21.8619 19.4062 21.8619C19.3006 21.9399 19.2113 22.0379 19.1435 22.1504C19.0757 22.2629 19.0307 22.3876 19.0111 22.5175C18.9915 22.6473 18.9977 22.7798 19.0293 22.9072C19.0609 23.0347 19.1173 23.1547 19.1953 23.2604C19.2733 23.366 19.3713 23.4553 19.4838 23.5231C19.5962 23.5909 19.721 23.6359 19.8508 23.6555C19.9807 23.6751 20.1131 23.6689 20.2406 23.6373C20.3681 23.6057 20.4881 23.5493 20.5937 23.4713C20.5937 23.4713 22.2851 22.2272 23.9896 20.7473C24.8418 20.0074 25.699 19.2103 26.375 18.4453C27.051 17.6802 27.6666 17.0716 27.6666 15.9999C27.6667 14.9282 27.051 14.3197 26.375 13.5546C25.699 12.7896 24.8418 11.9925 23.9896 11.2526C22.2851 9.77265 20.5937 8.5286 20.5937 8.5286C20.4239 8.4033 20.2188 8.33493 20.0078 8.33328Z"
      />
    </>
  ),
})

ArrowRight02Icon.displayName = 'ArrowRight02Icon'
export { ArrowRight02Icon }

const ArrowUp01Icon = createIcon({
  Root: Svg,
  viewBox: '0 0 32 32',
  path: (
    <>
      <Path
        stroke="none"
        d="M16.0002 11C14.8407 11 14.1046 11.699 13.1981 12.5C12.2916 13.301 11.3379 14.3248 10.4533 15.3438C8.68399 17.3816 7.19548 19.4063 7.19548 19.4063C7.1175 19.5119 7.0611 19.6319 7.0295 19.7594C6.9979 19.8869 6.99172 20.0193 7.01131 20.1492C7.0309 20.279 7.07587 20.4037 7.14366 20.5162C7.21146 20.6287 7.30074 20.7267 7.40641 20.8047C7.51209 20.8827 7.63208 20.9391 7.75955 20.9707C7.88702 21.0023 8.01946 21.0084 8.14932 20.9889C8.27918 20.9693 8.40391 20.9243 8.51638 20.8565C8.62886 20.7887 8.72688 20.6994 8.80485 20.5938C8.80485 20.5938 10.2601 18.6184 11.9637 16.6563C12.8155 15.6752 13.7325 14.699 14.5236 14C15.3147 13.301 16.1056 13 16.0002 13C15.8953 13 16.6785 13.295 17.4637 13.987C19.8369 16.0785 23.1955 20.5938 23.1955 20.5938C23.2734 20.6994 23.3715 20.7887 23.4839 20.8565C23.5964 20.9243 23.7212 20.9693 23.851 20.9889C23.9809 21.0084 24.1133 21.0023 24.2408 20.9707C24.3682 20.9391 24.4882 20.8827 24.5939 20.8047C24.6996 20.7267 24.7889 20.6287 24.8567 20.5162C24.9245 20.4037 24.9694 20.279 24.989 20.1492C25.0086 20.0193 25.0024 19.8869 24.9708 19.7594C24.9392 19.6319 24.8828 19.5119 24.8049 19.4063C24.8049 19.4063 21.5101 14.8871 18.7866 12.487C17.8855 11.6929 17.1532 11 16.0002 11Z"
      />
    </>
  ),
})

ArrowUp01Icon.displayName = 'ArrowUp01Icon'
export { ArrowUp01Icon }

const Calendar04Icon = createIcon({
  Root: Svg,
  viewBox: '0 0 32 32',
  path: (
    <>
      <Path
        stroke="none"
        d="M8.00004 1.66675C8.55233 1.66675 9.00004 2.11446 9.00004 2.66675V3.15461C10.5148 3.00004 12.3787 3.00006 14.6524 3.00008L14.7334 3.00008H17.2667L17.3477 3.00008C19.6213 3.00006 21.4853 3.00004 23 3.15461V2.66675C23 2.11446 23.4478 1.66675 24 1.66675C24.5523 1.66675 25 2.11446 25 2.66675V3.51313C26.0731 3.81726 26.978 4.31154 27.7313 5.1259C28.7685 6.24721 29.2296 7.66398 29.4504 9.43943C29.6667 11.1792 29.6667 13.4087 29.6667 16.2535V16.3244V17.0091V17.08C29.6667 19.9248 29.6667 22.1543 29.4504 23.8941C29.2296 25.6695 28.7685 27.0863 27.7313 28.2076C26.6838 29.34 25.343 29.8535 23.665 30.0974C22.041 30.3335 19.966 30.3334 17.3477 30.3334H17.2667H14.7334H14.6524C12.0341 30.3334 9.95913 30.3335 8.33509 30.0974C6.65706 29.8535 5.31623 29.34 4.26877 28.2076C3.23155 27.0863 2.77051 25.6695 2.54971 23.8941C2.33335 22.1543 2.33336 19.9248 2.33337 17.08V17.0091V16.3244V16.2535C2.33336 13.4087 2.33335 11.1792 2.54971 9.43943C2.77051 7.66398 3.23155 6.24721 4.26877 5.1259C5.02204 4.31154 5.92703 3.81726 7.00004 3.51313V2.66675C7.00004 2.11446 7.44776 1.66675 8.00004 1.66675ZM8.00004 6.33342C7.54293 6.33342 7.15746 6.02672 7.03818 5.60787C6.4951 5.82396 6.08275 6.11016 5.73697 6.48398C5.10729 7.16471 4.73407 8.09789 4.53686 9.66675H27.4632C27.266 8.09789 26.8928 7.16471 26.2631 6.48398C25.9173 6.11016 25.505 5.82397 24.9619 5.60788C24.8426 6.02672 24.4571 6.33342 24 6.33342C23.4478 6.33342 23 5.8857 23 5.33341V5.16619C21.5854 5.00216 19.7569 5.00008 17.2667 5.00008H14.7334C12.2432 5.00008 10.4147 5.00216 9.00004 5.16619V5.33341C9.00004 5.8857 8.55233 6.33342 8.00004 6.33342ZM27.6148 11.6667H4.38527C4.33411 12.9426 4.33337 14.4678 4.33337 16.3244V17.0091C4.33337 19.9402 4.3352 22.0453 4.53442 23.6472C4.73099 25.2279 5.10469 26.166 5.73697 26.8495C6.35899 27.522 7.19641 27.9109 8.62276 28.1182C10.0864 28.3309 12.0159 28.3334 14.7334 28.3334H17.2667C19.9842 28.3334 21.9137 28.3309 23.3773 28.1182C24.8037 27.9109 25.6411 27.522 26.2631 26.8495C26.8954 26.166 27.2691 25.2279 27.4657 23.6472C27.6649 22.0453 27.6667 19.9402 27.6667 17.0091V16.3244C27.6667 14.4678 27.666 12.9426 27.6148 11.6667Z"
      />
    </>
  ),
})

Calendar04Icon.displayName = 'Calendar04Icon'
export { Calendar04Icon }

const CallIcon = createIcon({
  Root: Svg,
  viewBox: '0 0 32 32',
  path: (
    <>
      <Path
        stroke="none"
        d="M7.08903 1.71502C7.84461 1.87118 8.44634 2.37883 8.8202 3.04954L9.98444 5.13822L10.0111 5.18613C10.4498 5.97307 10.819 6.63532 11.0601 7.21102C11.3158 7.82171 11.4677 8.42392 11.3983 9.08973C11.3288 9.75555 11.056 10.3135 10.6797 10.8582C10.3251 11.3718 9.82719 11.9437 9.23559 12.6232L9.19958 12.6645L6.26511 16.0352C8.6209 19.8965 12.0995 23.3766 15.9648 25.7348L19.3354 22.8004L19.3768 22.7643C20.0563 22.1728 20.6281 21.6749 21.1417 21.3202C21.6865 20.944 22.2444 20.6711 22.9102 20.6017C23.576 20.5322 24.1782 20.6841 24.7889 20.9399C25.3646 21.181 26.0269 21.5501 26.8138 21.9888L26.8617 22.0155L28.9504 23.1798C29.6211 23.5536 30.1288 24.1553 30.2849 24.9109C30.4427 25.6744 30.21 26.4418 29.6959 27.0725C27.8307 29.361 24.8423 30.8181 21.7074 30.1857C19.7803 29.797 17.879 29.1494 15.5794 27.8305C10.959 25.1807 6.81618 21.0356 4.16942 16.4205C2.85059 14.1209 2.20297 12.2196 1.81425 10.2926C1.18186 7.15762 2.63897 4.16925 4.92745 2.30404C5.55817 1.78998 6.32556 1.55722 7.08903 1.71502ZM17.8276 26.7648C19.3828 27.5311 20.7354 27.9493 22.1028 28.2252C24.3642 28.6814 26.6473 27.6473 28.1456 25.8089C28.3423 25.5676 28.3435 25.3991 28.3263 25.3157C28.3075 25.2245 28.2311 25.0685 27.9767 24.9267L25.888 23.7625C25.0404 23.29 24.4762 22.9772 24.0164 22.7846C23.5799 22.6019 23.3294 22.5688 23.1177 22.5909C22.9059 22.613 22.6676 22.697 22.2782 22.9659C21.868 23.2492 21.3805 23.6717 20.6487 24.3088L17.8276 26.7648ZM5.23515 14.1723L7.69113 11.3513C8.32824 10.6195 8.75075 10.1319 9.03404 9.72172C9.30295 9.33234 9.38697 9.09407 9.40906 8.88229C9.43114 8.67051 9.39809 8.42004 9.2153 7.98355C9.02274 7.52373 8.70991 6.9595 8.2375 6.11198L7.07326 4.0233C6.93142 3.76883 6.77544 3.69247 6.68422 3.67362C6.60089 3.6564 6.43238 3.65761 6.19101 3.85434C4.35264 5.35268 3.31858 7.6357 3.77476 9.8971C4.0506 11.2645 4.46885 12.6172 5.23515 14.1723Z"
      />
    </>
  ),
})

CallIcon.displayName = 'CallIcon'
export { CallIcon }

const Cancel01Icon = createIcon({
  Root: Svg,
  viewBox: '0 0 32 32',
  path: (
    <>
      <Path
        stroke="none"
        d="M5.96013 5.9594C6.35065 5.56887 6.98382 5.56887 7.37434 5.9594L16.0006 14.5856L24.6268 5.9594C25.0173 5.56887 25.6505 5.56887 26.041 5.9594C26.4315 6.34992 26.4315 6.98309 26.041 7.37361L17.4148 15.9998L26.041 24.6261C26.4315 25.0166 26.4315 25.6498 26.041 26.0403C25.6505 26.4308 25.0173 26.4308 24.6268 26.0403L16.0006 17.414L7.37434 26.0403C6.98382 26.4308 6.35065 26.4308 5.96013 26.0403C5.56961 25.6498 5.56961 25.0166 5.96013 24.6261L14.5864 15.9998L5.96013 7.37361C5.56961 6.98309 5.56961 6.34992 5.96013 5.9594Z"
      />
    </>
  ),
})

Cancel01Icon.displayName = 'Cancel01Icon'
export { Cancel01Icon }

const ChartHistogramIcon = createIcon({
  Root: Svg,
  viewBox: '0 0 32 32',
  path: (
    <>
      <Path
        stroke="none"
        d="M4 3C4.55229 3 5 3.44772 5 4V18.6667C5 20.8948 5.00212 22.4653 5.16194 23.654C5.31788 24.8139 5.5099 25.4594 5.87919 25.9261C6.24827 26.3927 6.76625 26.6821 7.74434 26.8381C8.75135 26.9979 10.0861 27 12 27H28C28.5523 27 29 27.4477 29 28C29 28.5523 28.5523 29 28 29H13.259C11.1222 29 9.41694 29 8.07949 28.8202C6.69781 28.6345 5.55993 28.2405 4.65974 27.3403C3.75958 26.4401 3.36554 25.3022 3.17977 23.9205C2.99996 22.583 2.99998 20.8778 3 18.741L3 4C3 3.44772 3.44772 3 4 3Z"
      />
      <Path
        stroke="none"
        d="M17.3333 12.3333C17.8856 12.3333 18.3333 12.781 18.3333 13.3333V28C18.3333 28.5523 17.8856 29 17.3333 29C16.781 29 16.3333 28.5523 16.3333 28V13.3333C16.3333 12.781 16.781 12.3333 17.3333 12.3333Z"
      />
      <Path
        stroke="none"
        d="M24 16.3333C24.5523 16.3333 25 16.781 25 17.3333V28C25 28.5523 24.5523 29 24 29C23.4477 29 23 28.5523 23 28V17.3333C23 16.781 23.4477 16.3333 24 16.3333Z"
      />
      <Path
        stroke="none"
        d="M10.6667 16.3333C11.219 16.3333 11.6667 16.781 11.6667 17.3333V26.6667C11.6667 27.219 11.219 27.6667 10.6667 27.6667C10.1144 27.6667 9.66667 27.219 9.66667 26.6667V17.3333C9.66667 16.781 10.1144 16.3333 10.6667 16.3333Z"
      />
      <Path
        stroke="none"
        d="M12.6979 8.05696C15.0944 4.8699 19.5723 4.8699 21.9687 8.05696C22.6594 8.97554 23.5021 9.36982 24.4943 9.54302C25.3076 9.68502 26.1475 9.67237 27.0859 9.65824C27.3802 9.65381 27.6841 9.64924 28 9.64924C28.5523 9.64924 29 10.097 29 10.6492C29 11.2015 28.5523 11.6492 28 11.6492C27.7586 11.6492 27.5037 11.6534 27.2395 11.6576C26.2671 11.6733 25.1688 11.691 24.1503 11.5132C22.7789 11.2738 21.433 10.6724 20.3702 9.25891C18.7738 7.13591 15.8928 7.13592 14.2965 9.25893C13.2337 10.6724 11.8878 11.2738 10.5164 11.5132C9.49793 11.691 8.39956 11.6733 7.4272 11.6576C7.16301 11.6534 6.90812 11.6492 6.66667 11.6492H4C3.44772 11.6492 3 11.2015 3 10.6492C3 10.097 3.44772 9.64924 4 9.64924H6.66667C6.98254 9.64924 7.2865 9.65381 7.58076 9.65824C8.51921 9.67237 9.35908 9.68502 10.1724 9.54302C11.1645 9.36982 12.0073 8.97553 12.6979 8.05696Z"
      />
    </>
  ),
})

ChartHistogramIcon.displayName = 'ChartHistogramIcon'
export { ChartHistogramIcon }

const FilterVerticalIcon = createIcon({
  Root: Svg,
  viewBox: '0 0 32 32',
  path: (
    <>
      <Path
        stroke="none"
        d="M9.33337 3.66675C9.88566 3.66675 10.3334 4.11446 10.3334 4.66675V11.3334C10.3334 11.8857 9.88566 12.3334 9.33337 12.3334C8.78109 12.3334 8.33337 11.8857 8.33337 11.3334V4.66675C8.33337 4.11446 8.78109 3.66675 9.33337 3.66675ZM22.6667 3.66675C23.219 3.66675 23.6667 4.11446 23.6667 4.66675V7.00008H25.3334C26.6221 7.00008 27.6667 8.04477 27.6667 9.33341V14.6667C27.6667 15.9554 26.6221 17.0001 25.3334 17.0001H20C18.7114 17.0001 17.6667 15.9554 17.6667 14.6667V9.33341C17.6667 8.04477 18.7113 7.00008 20 7.00008H21.6667V4.66675C21.6667 4.11446 22.1144 3.66675 22.6667 3.66675ZM20 9.00008C19.8159 9.00008 19.6667 9.14931 19.6667 9.33341V14.6667C19.6667 14.8509 19.8159 15.0001 20 15.0001H25.3334C25.5175 15.0001 25.6667 14.8509 25.6667 14.6667V9.33341C25.6667 9.14931 25.5175 9.00008 25.3334 9.00008H20ZM4.33337 17.3334C4.33337 16.0447 5.37806 15.0001 6.66671 15.0001H12C13.2887 15.0001 14.3334 16.0447 14.3334 17.3334V22.6667C14.3334 23.9554 13.2887 25.0001 12 25.0001H10.3334V27.3334C10.3334 27.8857 9.88566 28.3334 9.33337 28.3334C8.78109 28.3334 8.33337 27.8857 8.33337 27.3334V25.0001H6.66671C5.37806 25.0001 4.33337 23.9554 4.33337 22.6667V17.3334ZM12 23.0001C12.1841 23.0001 12.3334 22.8508 12.3334 22.6667V17.3334C12.3334 17.1493 12.1841 17.0001 12 17.0001H6.66671C6.48261 17.0001 6.33337 17.1493 6.33337 17.3334V22.6667C6.33337 22.8508 6.48261 23.0001 6.66671 23.0001H12ZM22.6667 19.6667C23.219 19.6667 23.6667 20.1145 23.6667 20.6667V27.3334C23.6667 27.8857 23.219 28.3334 22.6667 28.3334C22.1144 28.3334 21.6667 27.8857 21.6667 27.3334V20.6667C21.6667 20.1145 22.1144 19.6667 22.6667 19.6667Z"
      />
    </>
  ),
})

FilterVerticalIcon.displayName = 'FilterVerticalIcon'
export { FilterVerticalIcon }

const ImageUploadIcon = createIcon({
  Root: Svg,
  viewBox: '0 0 32 32',
  path: (
    <>
      <Path
        stroke="none"
        d="M9.22084 5.14416C10.5786 5.01897 12.2604 5.00254 14.4132 5.0004L15.2571 3.00008L9.22084 5.14416Z"
      />
      <Path
        stroke="none"
        d="M15.3348 3.00008L15.2571 3.00008C12.3361 3.00006 10.0419 3.00005 8.25066 3.24087C6.41512 3.48765 4.95877 4.0037 3.8145 5.14796C2.67024 6.29223 2.1542 7.74857 1.90742 9.58412C1.66659 11.3753 1.66661 13.6696 1.66663 16.5905V16.743C1.66661 19.6639 1.66659 21.9581 1.90742 23.7494C2.1542 25.5849 2.67027 27.0413 3.81452 28.1856C4.95879 29.3298 6.41513 29.8459 8.25067 30.0926C10.0419 30.3334 12.3361 30.3334 15.2571 30.3334H15.4095C18.3304 30.3334 20.6247 30.3334 22.4159 30.0926C24.2515 29.8459 25.7079 29.3298 26.8522 28.1856C27.9525 27.0852 28.4722 25.6957 28.7299 23.9568C28.9832 22.247 28.9986 20.0763 28.9998 17.3339C29.0001 16.7816 28.5526 16.3337 28.0003 16.3334C27.448 16.3332 27.0001 16.7807 26.9998 17.333C26.9986 20.1198 26.9788 22.1293 26.7515 23.6636C26.5285 25.1687 26.1221 26.0871 25.4379 26.7713C24.7272 27.4821 23.7632 27.8935 22.1494 28.1105C20.5069 28.3313 18.3471 28.3334 15.3333 28.3334C12.3195 28.3334 10.1597 28.3313 8.51715 28.1105C6.9034 27.8935 5.93946 27.4821 5.22873 26.7714C4.51801 26.0606 4.10654 25.0966 3.88958 23.4829C3.66875 21.8403 3.66663 19.6805 3.66663 16.6667C3.66663 13.6529 3.66875 11.4931 3.88958 9.85061C4.10655 8.23685 4.518 7.2729 5.22872 6.56217C5.93945 5.85145 6.90339 5.44 8.51716 5.22304C8.74176 5.19284 8.97604 5.16673 9.22084 5.14416L15.2571 3.00008L14.4132 5.0004C14.7108 5.0001 15.0173 5.00008 15.3333 5.00008C16.0414 5.00008 16.7045 5.00008 17.3284 5.00315C17.8807 5.00586 18.3306 4.56035 18.3333 4.00807C18.336 3.4558 17.8905 3.00589 17.3382 3.00317C16.7089 3.00008 16.0413 3.00008 15.3348 3.00008Z"
      />
      <Path
        stroke="none"
        d="M14.2908 22.576C11.7281 20.6342 8.50041 19.6 5.18339 19.6701L5.15969 19.6703C4.37275 19.6683 3.58721 19.7241 2.81035 19.8369L2.5229 17.8577C3.39286 17.7313 4.27219 17.6687 5.15295 17.6703C8.90364 17.5936 12.5699 18.7627 15.4987 20.982C18.219 23.0432 20.1425 25.8898 20.9681 29.0831L19.0318 29.5837C18.3233 26.8434 16.6662 24.3759 14.2908 22.576Z"
      />
      <Path
        stroke="none"
        d="M23.183 20.3335C20.455 20.3234 17.7993 21.329 15.3851 23.2115L16.6149 24.7887C18.7372 23.1338 20.9686 22.3248 23.1776 22.3335L23.1826 22.3335C24.6429 22.332 26.1097 22.6919 27.5481 23.4205L28.4518 21.6362C26.7566 20.7777 24.9821 20.332 23.183 20.3335Z"
      />
      <Path
        stroke="none"
        d="M24.1191 5.81249C23.8628 6.1388 23.5931 6.48161 23.3837 6.69705C22.9988 7.09309 22.3657 7.10211 21.9697 6.71718C21.5736 6.33226 21.5646 5.69916 21.9495 5.30311C22.0678 5.18142 22.262 4.939 22.5462 4.57709C22.5668 4.55092 22.5877 4.52431 22.6089 4.49732C22.8623 4.17443 23.1597 3.79563 23.466 3.43409C23.7943 3.04668 24.1617 2.64429 24.529 2.33146C24.7131 2.1747 24.9205 2.02007 25.1437 1.90064C25.359 1.78545 25.6556 1.66675 26 1.66675C26.3443 1.66675 26.6409 1.78545 26.8562 1.90064C27.0794 2.02007 27.2868 2.1747 27.4709 2.33146C27.8382 2.64429 28.2056 3.04668 28.5339 3.43409C28.8403 3.79562 29.1376 4.17442 29.3911 4.4973C29.4122 4.52431 29.4331 4.55092 29.4537 4.57709C29.738 4.939 29.9321 5.18142 30.0504 5.30311C30.4353 5.69916 30.4263 6.33226 30.0303 6.71718C29.6342 7.10211 29.0011 7.09309 28.6162 6.69705C28.4068 6.48161 28.1372 6.1388 27.8809 5.81249C27.8611 5.78737 27.8413 5.76209 27.8213 5.73668C27.5641 5.40901 27.289 5.0586 27.008 4.72704C27.0054 4.72386 27.0027 4.72068 27 4.71751V13.3334C27 13.8857 26.5522 14.3334 26 14.3334C25.4477 14.3334 25 13.8857 25 13.3334V4.71751C24.9973 4.72068 24.9946 4.72386 24.9919 4.72704C24.7109 5.05861 24.4358 5.40902 24.1786 5.73669C24.1586 5.7621 24.1388 5.78737 24.1191 5.81249Z"
      />
    </>
  ),
})

ImageUploadIcon.displayName = 'ImageUploadIcon'
export { ImageUploadIcon }

const Logout01Icon = createIcon({
  Root: Svg,
  viewBox: '0 0 32 32',
  path: (
    <>
      <Path
        stroke="none"
        d="M3 16C3 8.76049 9.24025 3 16.8 3C17.4795 3 18.1482 3.04632 18.8024 3.13595C19.3496 3.21091 19.7324 3.71525 19.6574 4.26243C19.5824 4.8096 19.0781 5.1924 18.5309 5.11744C17.9665 5.04011 17.3885 5 16.8 5C10.2213 5 5 9.98469 5 16C5 22.0154 10.2213 27 16.8 27C17.3885 27 17.9665 26.9599 18.531 26.8826C19.0781 26.8076 19.5825 27.1904 19.6574 27.7376C19.7324 28.2848 19.3496 28.7891 18.8024 28.8641C18.1481 28.9537 17.4795 29 16.8 29C9.24025 29 3 23.2396 3 16Z"
      />
      <Path
        stroke="none"
        d="M23.9496 11.9697C24.3345 11.5736 24.9676 11.5646 25.3637 11.9496C25.4853 12.0679 25.7278 12.262 26.0897 12.5463C26.1159 12.5669 26.1425 12.5878 26.1696 12.609C26.4924 12.8625 26.8712 13.1598 27.2327 13.4661C27.6201 13.7943 28.0225 14.1618 28.3353 14.5291C28.492 14.7131 28.6467 14.9206 28.7661 15.1438C28.8813 15.359 29 15.6556 29 16C29 16.3444 28.8813 16.641 28.7661 16.8562C28.6467 17.0794 28.4921 17.2869 28.3353 17.4709C28.0225 17.8382 27.6201 18.2057 27.2327 18.5339C26.8711 18.8403 26.4923 19.1377 26.1694 19.3911C26.1424 19.4123 26.1158 19.4332 26.0897 19.4537C25.7278 19.738 25.4853 19.9322 25.3636 20.0504C24.9676 20.4354 24.3345 20.4263 23.9496 20.0303C23.5646 19.6343 23.5737 19.0012 23.9697 18.6162C24.1851 18.4068 24.5279 18.1372 24.8543 17.8809C24.8794 17.8612 24.9047 17.8413 24.9301 17.8214C25.2577 17.5641 25.6081 17.289 25.9397 17.0081C25.9429 17.0054 25.9461 17.0027 25.9492 17H14.6667C14.1144 17 13.6667 16.5523 13.6667 16C13.6667 15.4477 14.1144 15 14.6667 15H25.9492C25.9461 14.9973 25.9429 14.9946 25.9397 14.9919C25.6082 14.711 25.2578 14.436 24.9302 14.1787C24.9047 14.1588 24.8794 14.1389 24.8543 14.1191C24.5279 13.8628 24.1851 13.5932 23.9697 13.3837C23.5736 12.9988 23.5646 12.3657 23.9496 11.9697Z"
      />
    </>
  ),
})

Logout01Icon.displayName = 'Logout01Icon'
export { Logout01Icon }

const PackageIcon = createIcon({
  Root: Svg,
  viewBox: '0 0 32 32',
  path: (
    <>
      <Path
        stroke="none"
        d="M4 8.33341C4.55228 8.33341 5 8.78113 5 9.33341V22.8818C5 23.2313 5.20731 23.7074 6.46018 24.4592C7.6817 25.1922 9.54661 25.9826 12.1717 27.0916C13.5307 27.6656 14.3615 28.0086 15 28.1843V15.1398C15 14.5875 15.4477 14.1398 16 14.1398C16.5523 14.1398 17 14.5875 17 15.1398V28.1843C17.6385 28.0086 18.4693 27.6656 19.8283 27.0916C22.4534 25.9826 24.3183 25.1922 25.5398 24.4592C26.7927 23.7074 27 23.2313 27 22.8818V9.33341C27 8.78113 27.4477 8.33341 28 8.33341C28.5523 8.33341 29 8.78113 29 9.33341V22.8818C29 24.3757 27.9102 25.3692 26.5689 26.1741C25.2111 26.9889 23.2135 27.8327 20.6893 28.899L20.6066 28.9339C20.5392 28.9624 20.4726 28.9905 20.4069 29.0183C18.5154 29.8179 17.2959 30.3334 16 30.3334C14.7041 30.3334 13.4846 29.8179 11.5931 29.0183C11.5273 28.9905 11.4608 28.9624 11.3935 28.9339L11.3106 28.8989C8.78646 27.8327 6.78895 26.9889 5.4311 26.1741C4.08978 25.3692 3 24.3757 3 22.8818V9.33341C3 8.78113 3.44772 8.33341 4 8.33341Z"
      />
      <Path
        stroke="none"
        d="M16 3.66675C14.9899 3.66675 14.0272 4.10663 11.5368 5.31172L7.64187 7.19643C7.64187 7.19643 7.64187 7.19643 7.64187 7.19643C6.5428 7.72826 5.82138 8.08018 5.36131 8.39095C5.16345 8.52459 5.06786 8.61515 5.02362 8.66675C5.06786 8.71835 5.16345 8.80891 5.36131 8.94255C5.82138 9.25331 6.54279 9.60523 7.64187 10.1371L11.5368 12.0218C14.0272 13.2269 14.9899 13.6667 16 13.6667C17.0101 13.6667 17.9728 13.2269 20.4632 12.0218L24.3582 10.1371C25.4572 9.60523 26.1786 9.25332 26.6387 8.94255C26.8365 8.80891 26.9321 8.71835 26.9764 8.66675C26.9321 8.61514 26.8365 8.52459 26.6387 8.39095C26.1786 8.08018 25.4572 7.72827 24.3582 7.19644C24.3582 7.19643 24.3582 7.19644 24.3582 7.19644L20.4632 5.31173C17.9728 4.10662 17.0101 3.66675 16 3.66675ZM27.0114 8.71928C27.0105 8.71921 27.0073 8.71409 27.0046 8.70414C27.0109 8.71438 27.0122 8.71936 27.0114 8.71928ZM27.0046 8.62935C27.0073 8.6194 27.0105 8.61429 27.0114 8.61421C27.0122 8.61414 27.0109 8.61912 27.0046 8.62935ZM4.98865 8.61422C4.98953 8.61429 4.99269 8.61941 4.99545 8.62936C4.98914 8.61912 4.98776 8.61415 4.98865 8.61422ZM4.99545 8.70413C4.99269 8.71409 4.98953 8.7192 4.98865 8.71928C4.98776 8.71935 4.98914 8.71437 4.99545 8.70413ZM10.8867 3.40441C13.0758 2.34428 14.475 1.66675 16 1.66675C17.5251 1.66675 18.9242 2.34429 21.1134 3.40446C21.1862 3.43969 21.2598 3.47535 21.3344 3.51142C21.3344 3.51142 21.3344 3.51142 21.3344 3.51142L25.3018 5.43118C26.3087 5.91841 27.1637 6.33206 27.7582 6.7336C28.3534 7.13568 29 7.73067 29 8.66675C29 9.60283 28.3534 10.1978 27.7582 10.5999C27.1637 11.0014 26.3087 11.4151 25.3017 11.9023L21.3344 13.8221C21.3344 13.8221 21.3344 13.8221 21.3344 13.8221C21.2598 13.8581 21.1862 13.8938 21.1134 13.929C18.9242 14.9892 17.5251 15.6667 16 15.6667C14.4749 15.6667 13.0758 14.9892 10.8865 13.929C10.8138 13.8938 10.7402 13.8581 10.6657 13.8221C10.6657 13.8221 10.6657 13.8221 10.6657 13.8221L6.77072 11.9374L6.6985 11.9024C5.69139 11.4152 4.83636 11.0015 4.24184 10.5999C3.64656 10.1978 3 9.60282 3 8.66675C3 7.73068 3.64656 7.13569 4.24184 6.7336C4.83636 6.33202 5.69138 5.91834 6.6985 5.43107C6.72249 5.41947 6.74656 5.40782 6.77072 5.39613L10.6656 3.51143C10.6656 3.51143 10.6656 3.51142 10.6656 3.51143C10.7402 3.47534 10.8139 3.43966 10.8867 3.40441Z"
      />
      <Path
        stroke="none"
        d="M7.10557 15.5529C7.35256 15.0589 7.95323 14.8587 8.44721 15.1057L11.1139 16.439C11.6079 16.686 11.8081 17.2867 11.5611 17.7806C11.3141 18.2746 10.7134 18.4748 10.2195 18.2278L7.55279 16.8945C7.05881 16.6475 6.85858 16.0468 7.10557 15.5529Z"
      />
      <Path
        stroke="none"
        d="M23.5611 4.8862C23.8081 5.38018 23.6079 5.98085 23.1139 6.22784L9.78055 12.8945C9.28657 13.1415 8.68589 12.9413 8.43891 12.4473C8.19192 11.9533 8.39214 11.3526 8.88612 11.1057L22.2195 4.43899C22.7134 4.192 23.3141 4.39222 23.5611 4.8862Z"
      />
    </>
  ),
})

PackageIcon.displayName = 'PackageIcon'
export { PackageIcon }

const PlusSignIcon = createIcon({
  Root: Svg,
  viewBox: '0 0 32 32',
  path: (
    <>
      <Path
        stroke="none"
        d="M16 4.33325C16.5523 4.33325 17 4.78097 17 5.33325V14.9999H26.6667C27.219 14.9999 27.6667 15.4476 27.6667 15.9999C27.6667 16.5522 27.219 16.9999 26.6667 16.9999H17V26.6666C17 27.2189 16.5523 27.6666 16 27.6666C15.4478 27.6666 15 27.2189 15 26.6666V16.9999H5.33337C4.78109 16.9999 4.33337 16.5522 4.33337 15.9999C4.33337 15.4476 4.78109 14.9999 5.33337 14.9999H15V5.33325C15 4.78097 15.4478 4.33325 16 4.33325Z"
      />
    </>
  ),
})

PlusSignIcon.displayName = 'PlusSignIcon'
export { PlusSignIcon }

const SaleTag02Icon = createIcon({
  Root: Svg,
  viewBox: '0 0 32 32',
  path: (
    <>
      <Path
        stroke="none"
        d="M23.3334 9.66661C22.7811 9.66661 22.3334 9.21889 22.3334 8.66661C22.3334 8.11433 22.7811 7.66661 23.3334 7.66661C23.8856 7.66661 24.3334 8.11433 24.3334 8.66661C24.3334 9.21889 23.8856 9.66661 23.3334 9.66661ZM20.3334 8.66661C20.3334 10.3235 21.6766 11.6666 23.3334 11.6666C24.9902 11.6666 26.3334 10.3235 26.3334 8.66661C26.3334 7.00976 24.9902 5.66661 23.3334 5.66661C21.6766 5.66661 20.3334 7.00976 20.3334 8.66661Z"
      />
      <Path
        stroke="none"
        d="M22.5755 1.69526C20.2398 1.59836 17.8862 1.77047 16.6641 1.88276C15.9096 1.9521 15.2056 2.26154 14.6433 2.74474C10.4412 6.35631 6.61315 10.105 2.95315 14.1927C1.28696 16.0536 1.25524 18.8505 2.76825 20.8046C5.253 24.0138 7.98617 26.7444 11.1953 29.2291C13.1495 30.7422 15.9464 30.7129 17.8073 29.0468C21.895 25.3868 25.6436 21.5589 29.2552 17.3567C29.7386 16.7944 30.0479 16.0903 30.1172 15.3359C30.2295 14.1138 30.4016 11.7601 30.3047 9.42443C30.2563 8.25657 30.1427 7.09548 29.9037 6.05464C29.6646 5.01379 29.3271 4.07185 28.6276 3.37234C27.9281 2.67286 26.9862 2.33536 25.9453 2.0963C24.9045 1.85725 23.7434 1.74371 22.5755 1.69526ZM22.4922 3.69266C23.5822 3.73788 24.6433 3.84804 25.4974 4.04422C26.3516 4.2404 26.9764 4.54927 27.2136 4.78641C27.4507 5.02352 27.7596 5.6484 27.9558 6.50255C28.1519 7.3567 28.2621 8.41776 28.3073 9.50776C28.3977 11.6878 28.2327 13.9815 28.125 15.1536C28.0949 15.4821 27.9624 15.7898 27.737 16.052C24.1796 20.1912 20.4978 23.9543 16.474 27.5572C15.3472 28.5661 13.6386 28.5905 12.4219 27.6484C9.33883 25.2613 6.7387 22.6612 4.35158 19.5781C3.40951 18.3613 3.43385 16.6528 4.44273 15.526C8.0456 11.5022 11.809 7.82032 15.9479 4.26297C16.2104 4.03742 16.5179 3.90513 16.8464 3.87495C18.0184 3.76725 20.3122 3.60222 22.4922 3.69266Z"
      />
      <Path
        stroke="none"
        d="M19.3746 12.6079C19.7651 12.9985 19.7651 13.6317 19.3746 14.0222L19.0662 14.3306C19.4946 15.1673 19.4244 16.0258 19.3923 16.4181C19.3883 16.4667 19.3848 16.5083 19.3831 16.5418C19.3538 17.0933 18.8828 17.5166 18.3314 17.4871C17.7799 17.4578 17.3566 16.987 17.3859 16.4354C17.3883 16.3919 17.3907 16.3494 17.393 16.3079C17.4268 15.7063 17.449 15.3122 17.0752 14.9705C16.9396 14.8465 16.7188 14.7015 16.354 14.573C15.9747 14.4393 15.4614 14.5865 15.1399 14.9701C14.9926 15.1458 14.9204 15.335 14.9144 15.5129C14.909 15.6801 14.9586 15.9129 15.188 16.1981C15.3543 16.4047 15.5116 16.5775 15.6734 16.7551C15.6803 16.7629 15.6872 16.7705 15.6942 16.7781C15.8539 16.9535 16.0396 17.1574 16.1988 17.3779C16.5654 17.8853 16.7776 18.4586 16.7367 19.2523C16.7011 19.9438 16.3556 20.5558 15.9211 21.0137C15.479 21.4793 14.8874 21.8503 14.2231 22.0545C13.325 22.3306 12.4096 22.1631 11.6587 21.7381L11.3842 22.0126C10.9937 22.403 10.3605 22.403 9.97 22.0126C9.57947 21.6221 9.57947 20.9889 9.97 20.5983L10.2492 20.3191C9.7998 19.5174 9.80465 18.7977 9.80677 18.4817C9.80701 18.4465 9.80721 18.4163 9.80676 18.3915C9.79646 17.8394 10.2358 17.3834 10.7879 17.3731C11.3401 17.3629 11.7961 17.8021 11.8064 18.3543C11.8075 18.4115 11.8075 18.4629 11.8076 18.5106C11.8078 18.6686 11.8079 18.7871 11.8445 18.9541C11.8856 19.1419 11.979 19.3862 12.2273 19.6635C12.628 20.1114 13.2032 20.2757 13.6354 20.1427C13.9768 20.0378 14.2696 19.8483 14.4706 19.6367C14.6788 19.4173 14.735 19.235 14.7394 19.1497C14.7554 18.839 14.6943 18.7106 14.5776 18.5491C14.4954 18.4353 14.387 18.3131 14.2152 18.1243C14.206 18.1143 14.1968 18.1042 14.1874 18.0938C14.0296 17.9207 13.8355 17.7074 13.6299 17.4519C13.1314 16.8326 12.8924 16.1398 12.9156 15.4461C12.9384 14.763 13.2126 14.1558 13.6072 13.6851C14.3695 12.7758 15.7228 12.23 17.019 12.6868C17.2354 12.763 17.4367 12.8492 17.6234 12.945L17.9604 12.6079C18.351 12.2174 18.984 12.2174 19.3746 12.6079Z"
      />
    </>
  ),
})

SaleTag02Icon.displayName = 'SaleTag02Icon'
export { SaleTag02Icon }

const Search01Icon = createIcon({
  Root: Svg,
  viewBox: '0 0 32 32',
  path: (
    <>
      <Path
        stroke="none"
        d="M14.6666 1.66675C7.48692 1.66675 1.66663 7.48705 1.66663 14.6667C1.66663 21.8464 7.48692 27.6667 14.6666 27.6667C17.8965 27.6667 20.8513 26.4888 23.1248 24.5392L28.6262 30.0405C29.0167 30.431 29.6499 30.431 30.0404 30.0405C30.4309 29.65 30.4309 29.0168 30.0404 28.6263L24.5391 23.125C26.4887 20.8514 27.6666 17.8966 27.6666 14.6667C27.6666 7.48705 21.8463 1.66675 14.6666 1.66675ZM3.66663 14.6667C3.66663 8.59162 8.59149 3.66675 14.6666 3.66675C20.7418 3.66675 25.6666 8.59162 25.6666 14.6667C25.6666 20.7419 20.7418 25.6667 14.6666 25.6667C8.59149 25.6667 3.66663 20.7419 3.66663 14.6667Z"
      />
    </>
  ),
})

Search01Icon.displayName = 'Search01Icon'
export { Search01Icon }

const Store04Icon = createIcon({
  Root: Svg,
  viewBox: '0 0 32 32',
  path: (
    <>
      <Path
        stroke="none"
        d="M2.99998 14.6488H4.99998V20.6576C4.99998 22.5741 5.0021 23.9111 5.13754 24.92C5.26913 25.9002 5.5099 26.4196 5.87919 26.7894C6.24827 27.159 6.76625 27.3999 7.74434 27.5316C8.75135 27.6672 10.0861 27.6693 12 27.6693H19.9999C21.9139 27.6693 23.2485 27.6672 24.2555 27.5316C25.2336 27.3999 25.7516 27.159 26.1207 26.7894C26.49 26.4196 26.7308 25.9002 26.8624 24.92C26.9978 23.9111 26.9999 22.5741 26.9999 20.6576V14.6488H28.9999V20.7307C29 22.5569 29 24.0286 28.8446 25.1861C28.6833 26.3876 28.3383 27.3991 27.536 28.2026C26.7335 29.0063 25.7229 29.3521 24.5224 29.5137C23.3664 29.6694 21.8966 29.6693 20.0732 29.6693H11.9267C10.1034 29.6693 8.6335 29.6694 7.47745 29.5137C6.27703 29.3521 5.26641 29.0063 4.46392 28.2026C3.66164 27.3991 3.31662 26.3876 3.15532 25.1861C2.99993 24.0286 2.99996 22.5569 2.99998 20.7307L2.99998 14.6488Z"
      />
      <Path
        stroke="none"
        d="M8.33332 23.9655C8.33332 23.4132 8.78103 22.9655 9.33332 22.9655H14.6666C15.2189 22.9655 15.6666 23.4132 15.6666 23.9655C15.6666 24.5177 15.2189 24.9655 14.6666 24.9655H9.33332C8.78103 24.9655 8.33332 24.5177 8.33332 23.9655Z"
      />
      <Path
        stroke="none"
        d="M23.6977 2.33404C24.4797 2.29417 25.8418 2.59093 26.8265 3.54811C27.2647 3.97412 27.4799 4.49114 27.5995 4.94732C27.7066 5.35561 27.7531 5.78553 27.7894 6.12112C27.7925 6.14941 27.7955 6.17702 27.7984 6.2039C27.9193 7.30971 28.2797 8.36847 29.1839 9.52686C30.9764 11.8232 30.4207 14.1401 29.1963 15.2859C28.339 16.0882 26.2436 17.7259 23.7073 16.6805C22.6499 16.2448 21.8444 15.6674 21.2879 14.846C21.2297 14.7601 21.175 14.6726 21.1236 14.5837C21.0292 14.6989 20.9313 14.8112 20.8302 14.92C20.0917 15.7148 19.1202 16.3948 18.0217 16.6996C16.9934 16.9849 15.3542 17.1277 13.7412 16.5755C12.704 16.2205 11.7027 15.5848 10.9024 14.5664C10.752 14.8188 10.579 15.0622 10.3836 15.2912C9.51475 16.3091 8.19465 17.0471 6.46877 17.0079C6.44588 17.0073 6.42301 17.006 6.40021 17.0039C5.85873 16.9543 5.10339 16.7884 4.37338 16.4524C3.65027 16.1195 2.84875 15.571 2.37478 14.6951C1.97286 13.9524 1.60351 13.19 1.68103 12.2566C1.7548 11.3684 2.21967 10.488 2.93405 9.41275C3.60611 8.40122 3.93791 7.66813 4.10559 7.13115C4.2688 6.60846 4.28798 6.23665 4.28798 5.91052C4.28798 5.29212 4.48823 4.39175 5.09814 3.6398C5.74523 2.84202 6.77898 2.30596 8.22284 2.37264L23.6977 2.33404ZM24.5324 4.45745C24.1946 4.34578 23.9146 4.32385 23.793 4.33183C23.7721 4.3332 23.7511 4.33392 23.73 4.33397L8.20225 4.3727C8.18428 4.37275 8.16632 4.37231 8.14837 4.37138C7.28948 4.32719 6.87662 4.62205 6.65143 4.89968C6.38484 5.22835 6.28798 5.65651 6.28798 5.91052C6.28798 6.36464 6.25686 6.9517 6.01468 7.72728C5.77695 8.48858 5.34824 9.39318 4.59989 10.5195C3.89386 11.5822 3.70189 12.0883 3.67417 12.4221C3.65019 12.7108 3.73468 13.0059 4.13373 13.7432C4.32453 14.0958 4.70082 14.4014 5.20972 14.6356C5.69551 14.8593 6.20834 14.9736 6.5492 15.009C7.60515 15.0232 8.35542 14.5867 8.86231 13.9928C9.39863 13.3644 9.65418 12.5649 9.65418 11.9533C9.65418 11.4614 10.0118 11.0426 10.4976 10.9656C10.9834 10.8886 11.453 11.1762 11.6052 11.644C12.1989 13.4694 13.2939 14.3085 14.3889 14.6833C15.5387 15.0769 16.755 14.9755 17.487 14.7724C18.1522 14.5878 18.818 14.1474 19.365 13.5587C19.9141 12.9676 20.2799 12.2956 20.4111 11.728C20.521 11.2526 20.9579 10.926 21.445 10.955C21.932 10.9841 22.327 11.3604 22.3796 11.8454C22.4752 12.727 22.6571 13.3012 22.9437 13.7242C23.2207 14.1331 23.6627 14.4989 24.4694 14.8314C25.7949 15.3778 27.0207 14.5827 27.8297 13.8256C28.2718 13.4119 28.7853 12.2665 27.6074 10.7575C26.4631 9.29169 25.9696 7.87802 25.8103 6.42154L25.8055 6.37808C25.7645 6.00284 25.7328 5.71331 25.665 5.45463C25.598 5.19949 25.5164 5.06379 25.4325 4.98219C25.1835 4.74017 24.8616 4.56631 24.5324 4.45745Z"
      />
    </>
  ),
})

Store04Icon.displayName = 'Store04Icon'
export { Store04Icon }

const Tick02Icon = createIcon({
  Root: Svg,
  viewBox: '0 0 32 32',
  path: (
    <>
      <Path
        stroke="none"
        d="M26.0238 7.94339C26.4233 8.32473 26.438 8.95773 26.0567 9.35723L12.0567 24.0239C11.8708 24.2187 11.6142 24.3302 11.345 24.3333C11.0757 24.3365 10.8166 24.2309 10.6262 24.0405L5.95958 19.3739C5.56906 18.9833 5.56906 18.3502 5.95958 17.9596C6.3501 17.5691 6.98327 17.5691 7.37379 17.9596L11.3167 21.9026L24.61 7.97627C24.9913 7.57678 25.6243 7.56205 26.0238 7.94339Z"
      />
    </>
  ),
})

Tick02Icon.displayName = 'Tick02Icon'
export { Tick02Icon }

const UnavailableIcon = createIcon({
  Root: Svg,
  viewBox: '0 0 32 32',
  path: (
    <>
      <Path
        stroke="none"
        d="M2 15.76C2 8.16056 8.16056 2 15.76 2C23.3594 2 29.52 8.16056 29.52 15.76C29.52 23.3594 23.3594 29.52 15.76 29.52C8.16056 29.52 2 23.3594 2 15.76ZM6.73643 8.09407C4.97989 10.1597 3.92 12.8361 3.92 15.76C3.92 22.299 9.22095 27.6 15.76 27.6C18.6839 27.6 21.3603 26.5401 23.4259 24.7835L6.73643 8.09407ZM8.09407 6.73643L24.7835 23.4259C26.5401 21.3603 27.6 18.6839 27.6 15.76C27.6 9.22095 22.299 3.92 15.76 3.92C12.8361 3.92 10.1597 4.97989 8.09407 6.73643Z"
      />
    </>
  ),
})

UnavailableIcon.displayName = 'UnavailableIcon'
export { UnavailableIcon }

const Upload04Icon = createIcon({
  Root: Svg,
  viewBox: '0 0 32 32',
  path: (
    <>
      <Path
        stroke="none"
        d="M17 19.3333C17 19.8856 16.5523 20.3333 16 20.3333C15.4477 20.3333 15 19.8856 15 19.3333L15 8.05076L14.9919 8.06029C14.711 8.3918 14.4359 8.74215 14.1787 9.06978L14.1191 9.14574C13.8628 9.47205 13.5931 9.81487 13.3837 10.0303C12.9988 10.4264 12.3657 10.4354 11.9697 10.0504C11.5736 9.66548 11.5646 9.03238 11.9496 8.63634C12.0678 8.51467 12.262 8.27225 12.5463 7.91035L12.609 7.83043C12.8624 7.5076 13.1597 7.1288 13.466 6.76734C13.7943 6.37994 14.1617 5.97754 14.529 5.66471C14.7131 5.50795 14.9206 5.35332 15.1437 5.23389C15.359 5.11869 15.6556 5 16 5C16.3444 5 16.641 5.11869 16.8562 5.23389C17.0794 5.35332 17.2869 5.50795 17.4709 5.66471C17.8382 5.97754 18.2057 6.37994 18.5339 6.76734C18.8402 7.12882 19.1375 7.50756 19.3909 7.83041L19.4537 7.91035C19.738 8.27225 19.9321 8.51467 20.0504 8.63634C20.4353 9.03238 20.4263 9.66548 20.0303 10.0504C19.6343 10.4354 19.0012 10.4264 18.6162 10.0303C18.4068 9.81487 18.1372 9.47205 17.8809 9.14574L17.8213 9.06982C17.564 8.74218 17.289 8.39182 17.0081 8.06029L17 8.05076V19.3333ZM6.33331 22C6.33331 21.4477 5.8856 21 5.33331 21C4.78103 21 4.33331 21.4477 4.33331 22C4.33331 22.849 4.37629 23.5987 4.51623 24.2357C4.65865 24.884 4.9148 25.4777 5.38521 25.9481C5.85561 26.4185 6.4493 26.6747 7.09762 26.8171C7.73463 26.957 8.48434 27 9.33331 27H22.6666C23.5156 27 24.2653 26.957 24.9023 26.8171C25.5507 26.6747 26.1443 26.4185 26.6148 25.9481C27.0852 25.4777 27.3413 24.884 27.4837 24.2357C27.6237 23.5987 27.6666 22.849 27.6666 22C27.6666 21.4477 27.2189 21 26.6666 21C26.1144 21 25.6666 21.4477 25.6666 22C25.6666 22.8057 25.6233 23.3833 25.5303 23.8066C25.4398 24.2185 25.3165 24.418 25.2005 24.5339C25.0846 24.6498 24.8851 24.7732 24.4732 24.8637C24.05 24.9566 23.4723 25 22.6666 25H9.33331C8.52762 25 7.95 24.9566 7.52675 24.8637C7.11483 24.7732 6.91535 24.6498 6.79942 24.5339C6.68349 24.418 6.56014 24.2185 6.46965 23.8066C6.37667 23.3833 6.33331 22.8057 6.33331 22Z"
      />
    </>
  ),
})

Upload04Icon.displayName = 'Upload04Icon'
export { Upload04Icon }

const UserMultipleIcon = createIcon({
  Root: Svg,
  viewBox: '0 0 32 32',
  path: (
    <>
      <Path
        stroke="none"
        d="M21.6064 7.66675C21.3494 7.66675 21.1001 7.69195 20.8612 7.73934C20.3195 7.84678 19.7932 7.49471 19.6858 6.95298C19.5784 6.41125 19.9304 5.88499 20.4722 5.77755C20.8389 5.70482 21.2184 5.66675 21.6064 5.66675C24.4949 5.66675 27 7.81908 27 10.6667C27 13.5144 24.4949 15.6667 21.6064 15.6667C21.2185 15.6667 20.8388 15.6287 20.4719 15.5559C19.9302 15.4483 19.5783 14.9219 19.6859 14.3802C19.7934 13.8385 20.3198 13.4866 20.8615 13.5942C21.1001 13.6416 21.3493 13.6667 21.6064 13.6667C23.5711 13.6667 25 12.2373 25 10.6667C25 9.09615 23.5711 7.66675 21.6064 7.66675ZM22.3334 20.0001C22.3334 19.4478 22.7811 19.0001 23.3334 19.0001C24.0359 19.0001 24.9728 19.1888 25.8983 19.476C26.839 19.7678 27.8554 20.1886 28.7218 20.7074C29.5507 21.2037 30.4037 21.8843 30.7896 22.7625C30.9965 23.2335 31.0715 23.7698 30.9205 24.3265C30.7731 24.8696 30.4365 25.3379 29.9883 25.7378C28.7964 26.8009 27.3488 27.6667 25.4751 27.6667H24.8215C24.2692 27.6667 23.8215 27.219 23.8215 26.6667C23.8215 26.1145 24.2692 25.6667 24.8215 25.6667H25.4751C26.6675 25.6667 27.6589 25.1355 28.6569 24.2453C28.904 24.0248 28.9715 23.872 28.9902 23.8028C29.0053 23.7473 29.0083 23.6804 28.9586 23.5671C28.831 23.2768 28.4314 22.8646 27.6943 22.4233C26.9947 22.0044 26.1318 21.6425 25.3057 21.3861C24.4644 21.1251 23.7469 21.0001 23.3334 21.0001C22.7811 21.0001 22.3334 20.5524 22.3334 20.0001Z"
      />
      <Path
        stroke="none"
        d="M8.14693 21.6277L5.50276 20.6003C5.37863 20.6668 5.22336 20.7456 5.04621 20.8355L2.19161 22.5975L1.01645 24.5498L2.14095 26.9558H6.45622C5.34853 26.801 4.38984 26.2495 3.44278 25.4375C2.97157 25.0334 2.99768 24.8243 3.00185 24.7909C3.01513 24.6816 3.11826 24.4466 3.51365 24.0983C4.13942 23.547 5.03776 23.0881 5.82764 22.6846C6.04512 22.5735 6.25438 22.4666 6.44746 22.3631C6.99247 22.071 7.56153 21.8259 8.14693 21.6277Z"
      />
      <Path
        stroke="none"
        d="M18.4973 20.6003C14.516 18.4667 9.48405 18.4667 5.50276 20.6003L8.14693 21.6277C11.204 20.5927 14.7064 20.8378 17.5526 22.3631C17.7457 22.4666 17.9549 22.5734 18.1724 22.6845C18.9623 23.0881 19.8607 23.547 20.4864 24.0983C20.8818 24.4466 20.9851 24.6829 20.9984 24.7922C21.0025 24.8256 21.0285 25.0334 20.5572 25.4375C20.2664 25.6869 19.9744 25.9117 19.6774 26.108L21.8591 26.9558C22.6366 26.2891 23.096 25.475 22.9836 24.5498C22.881 23.7048 22.3262 23.0536 21.8085 22.5975C20.9687 21.8577 19.7437 21.2362 18.9538 20.8354C18.7767 20.7456 18.6214 20.6668 18.4973 20.6003Z"
      />
      <Path
        stroke="none"
        d="M16.8991 27.0001H7.10099C6.88013 27.0001 6.66552 26.985 6.45622 26.9558H2.14095C3.4675 28.0932 5.05659 29.0001 7.10099 29.0001H16.8991C18.9435 29.0001 20.5326 28.0932 21.8591 26.9558H17.5439C17.3346 26.985 17.12 27.0001 16.8991 27.0001Z"
      />
      <Path
        stroke="none"
        d="M21.8591 26.9558L19.6774 26.108C19.0073 26.5508 18.3113 26.8485 17.5439 26.9558H21.8591Z"
      />
      <Path
        stroke="none"
        d="M1.01645 24.5498C0.904076 25.4749 1.36348 26.2891 2.14095 26.9558L1.01645 24.5498Z"
      />
      <Path
        stroke="none"
        d="M2.19161 22.5975C1.6739 23.0536 1.11907 23.7048 1.01645 24.5498L2.19161 22.5975Z"
      />
      <Path
        stroke="none"
        d="M5.04621 20.8355C4.25634 21.2362 3.03142 21.8577 2.19161 22.5975L5.04621 20.8355Z"
      />
      <Path
        stroke="none"
        d="M12 5.66675C9.60679 5.66675 7.6667 7.60685 7.6667 10.0001C7.6667 12.3933 9.60679 14.3334 12 14.3334C14.3932 14.3334 16.3334 12.3933 16.3334 10.0001C16.3334 7.60685 14.3932 5.66675 12 5.66675ZM5.6667 10.0001C5.6667 6.50228 8.50222 3.66675 12 3.66675C15.4978 3.66675 18.3334 6.50227 18.3334 10.0001C18.3334 13.4979 15.4978 16.3334 12 16.3334C8.50222 16.3334 5.6667 13.4979 5.6667 10.0001Z"
      />
    </>
  ),
})

UserMultipleIcon.displayName = 'UserMultipleIcon'
export { UserMultipleIcon }

const UserIcon = createIcon({
  Root: Svg,
  viewBox: '0 0 32 32',
  path: (
    <>
      <Path
        stroke="none"
        d="M16 1.66675C12.134 1.66675 8.99999 4.80075 8.99999 8.66675C8.99999 12.5327 12.134 15.6667 16 15.6667C19.866 15.6667 23 12.5327 23 8.66675C23 4.80075 19.866 1.66675 16 1.66675ZM11 8.66675C11 5.90532 13.2386 3.66675 16 3.66675C18.7614 3.66675 21 5.90532 21 8.66675C21 11.4282 18.7614 13.6667 16 13.6667C13.2386 13.6667 11 11.4282 11 8.66675Z"
      />
      <Path
        stroke="none"
        d="M24.3049 20.1057C24.0881 19.9833 23.8966 19.8753 23.7415 19.783C19.0028 16.9613 12.9972 16.9613 8.25848 19.783C8.10339 19.8753 7.91183 19.9834 7.69494 20.1058C6.74452 20.642 5.30784 21.4525 4.32362 22.4159C3.70806 23.0184 3.12319 23.8124 3.01686 24.7851C2.90378 25.8196 3.35507 26.7903 4.26043 27.6529C5.82236 29.1409 7.69674 30.3334 10.1211 30.3334H21.8788C24.3032 30.3334 26.1776 29.1409 27.7396 27.6529C28.6449 26.7903 29.0962 25.8196 28.9831 24.7851C28.8768 23.8124 28.2919 23.0184 27.6764 22.4159C26.6921 21.4525 25.2553 20.6419 24.3049 20.1057ZM9.2817 21.5014C13.3899 19.0552 18.61 19.0552 22.7183 21.5014C22.9421 21.6347 23.1874 21.7739 23.4443 21.9196C24.3945 22.4587 25.5039 23.0881 26.2774 23.8451C26.7575 24.3151 26.9622 24.7028 26.995 25.0024C27.021 25.2402 26.9608 25.6324 26.36 26.2048C24.9789 27.5206 23.5754 28.3334 21.8788 28.3334H10.1211C8.42455 28.3334 7.02112 27.5206 5.63999 26.2048C5.03914 25.6324 4.97902 25.2402 5.00502 25.0024C5.03776 24.7028 5.24244 24.3151 5.72261 23.8451C6.49607 23.0881 7.60543 22.4587 8.55557 21.9197C8.81246 21.7739 9.05789 21.6347 9.2817 21.5014Z"
      />
    </>
  ),
})

UserIcon.displayName = 'UserIcon'
export { UserIcon }

const ViewOffIcon = createIcon({
  Root: Svg,
  viewBox: '0 0 32 32',
  path: (
    <>
      <Path
        stroke="none"
        d="M28.284 10.4165C28.2306 10.4888 28.1677 10.5726 28.0955 10.6666H29.3333C28.5013 10.1119 28.5013 10.1119 28.5013 10.1119L28.4919 10.1257C28.4837 10.1377 28.4705 10.1569 28.4523 10.183C28.4158 10.2351 28.3595 10.3142 28.284 10.4165Z"
      />
      <Path
        stroke="none"
        d="M3.49957 10.1132L3.49821 10.1111L2.66667 10.6666H3.90453C3.83232 10.5726 3.76941 10.4888 3.71604 10.4165C3.64053 10.3142 3.58422 10.2351 3.54775 10.183C3.52952 10.1569 3.51627 10.1377 3.50807 10.1257L3.49957 10.1132Z"
      />
      <Path
        stroke="none"
        d="M1.83462 11.2213L2.66667 10.6666L3.49821 10.1111C3.19168 9.65225 2.57124 9.52838 2.11197 9.83456C1.65244 10.1409 1.52827 10.7618 1.83462 11.2213Z"
      />
      <Path
        stroke="none"
        d="M6.98413 13.9073C5.86942 12.9519 4.99156 11.9944 4.39323 11.2764C4.2001 11.0447 4.03673 10.8386 3.90453 10.6666H2.66667C1.83462 11.2213 1.83562 11.2228 1.83562 11.2228L1.83711 11.225L1.84157 11.2317L1.85636 11.2534C1.86883 11.2717 1.8865 11.2974 1.90929 11.3299C1.95486 11.395 2.02094 11.4878 2.10689 11.6042C2.27872 11.837 2.53039 12.1651 2.85678 12.5568C3.50845 13.3388 4.46392 14.3813 5.68255 15.4259C8.10402 17.5014 11.6621 19.6666 16 19.6666C20.3379 19.6666 23.896 17.5014 26.3175 15.4259C27.5361 14.3813 28.4916 13.3388 29.1432 12.5568C29.4696 12.1651 29.7213 11.837 29.8931 11.6042C29.9791 11.4878 30.0452 11.395 30.0907 11.3299C30.1135 11.2974 30.1312 11.2717 30.1436 11.2534L30.1584 11.2317L30.1629 11.225L30.1654 11.2213L29.3333 10.6666H28.0955C27.9633 10.8386 27.7999 11.0447 27.6068 11.2764C27.0085 11.9944 26.1306 12.9519 25.0159 13.9073C22.7707 15.8318 19.6621 17.6666 16 17.6666C12.3379 17.6666 9.22932 15.8318 6.98413 13.9073Z"
      />
      <Path
        stroke="none"
        d="M28.5013 10.1119L29.3333 10.6666L30.1654 11.2213C30.4717 10.7618 30.3476 10.1409 29.888 9.83456C29.4287 9.52831 28.8077 9.65276 28.5013 10.1119Z"
      />
      <Path
        stroke="none"
        d="M19.4855 17.1424C19.9591 16.8583 20.5734 17.0119 20.8575 17.4854L22.8575 20.8188C23.1416 21.2924 22.9881 21.9066 22.5145 22.1908C22.0409 22.4749 21.4267 22.3213 21.1425 21.8478L19.1425 18.5144C18.8584 18.0409 19.0119 17.4266 19.4855 17.1424Z"
      />
      <Path
        stroke="none"
        d="M25.9596 13.9595C26.3501 13.569 26.9833 13.569 27.3738 13.9595L30.0404 16.6262C30.431 17.0167 30.431 17.6499 30.0404 18.0404C29.6499 18.4309 29.0168 18.4309 28.6262 18.0404L25.9596 15.3737C25.569 14.9832 25.569 14.35 25.9596 13.9595Z"
      />
      <Path
        stroke="none"
        d="M6.04044 13.9595C6.43097 14.35 6.43097 14.9832 6.04044 15.3737L3.37378 18.0404C2.98325 18.4309 2.35009 18.4309 1.95956 18.0404C1.56904 17.6499 1.56904 17.0167 1.95956 16.6262L4.62623 13.9595C5.01676 13.569 5.64992 13.569 6.04044 13.9595Z"
      />
      <Path
        stroke="none"
        d="M12.5145 17.1424C12.9881 17.4266 13.1416 18.0409 12.8575 18.5144L10.8575 21.8478C10.5733 22.3213 9.95909 22.4749 9.48551 22.1908C9.01193 21.9066 8.85836 21.2924 9.14251 20.8188L11.1425 17.4854C11.4267 17.0119 12.0409 16.8583 12.5145 17.1424Z"
      />
    </>
  ),
})

ViewOffIcon.displayName = 'ViewOffIcon'
export { ViewOffIcon }

const ViewIcon = createIcon({
  Root: Svg,
  viewBox: '0 0 32 32',
  path: (
    <>
      <Path
        stroke="none"
        d="M8.59117 10.5272C6.52319 12.1417 4.96919 14.073 4.08892 15.3074C3.87117 15.6127 3.76751 15.7618 3.70573 15.8805C3.66646 15.956 3.66657 15.9767 3.66668 15.9969L3.66669 16.0001L3.66668 16.0033C3.66657 16.0235 3.66646 16.0442 3.70573 16.1196C3.76751 16.2383 3.87115 16.3875 4.0889 16.6928C4.96917 17.9272 6.52319 19.8585 8.59117 21.473C10.6612 23.089 13.1751 24.3334 16 24.3334C18.8249 24.3334 21.3388 23.089 23.4089 21.473C25.4768 19.8585 27.0309 17.9272 27.9112 16.6928C28.1289 16.3875 28.2325 16.2384 28.2943 16.1197C28.3336 16.0442 28.3335 16.0235 28.3334 16.0033L28.3334 16.0001L28.3334 15.9969C28.3335 15.9767 28.3336 15.956 28.2943 15.8805C28.2325 15.7618 28.1289 15.6127 27.9112 15.3074C27.0309 14.073 25.4768 12.1416 23.4089 10.5272C21.3388 8.91116 18.8249 7.66675 16 7.66675C13.1751 7.66675 10.6612 8.91117 8.59117 10.5272ZM7.36043 8.95073C9.63462 7.17529 12.5726 5.66675 16 5.66675C19.4274 5.66675 22.3654 7.17529 24.6396 8.95073C26.9158 10.7278 28.5984 12.8264 29.5395 14.1461C29.5628 14.1788 29.5865 14.2117 29.6104 14.245C29.948 14.7145 30.3334 15.2505 30.3334 16.0001C30.3334 16.7497 29.948 17.2857 29.6104 17.7552C29.5865 17.7884 29.5628 17.8214 29.5395 17.854C28.5984 19.1738 26.9158 21.2724 24.6396 23.0495C22.3654 24.8249 19.4274 26.3334 16 26.3334C12.5726 26.3334 9.63463 24.8249 7.36043 23.0495C5.08421 21.2724 3.40173 19.1738 2.46058 17.8541M7.36043 8.95073C5.08421 10.7278 3.40171 12.8264 2.46057 14.1461L7.36043 8.95073ZM2.46057 14.1461C2.43729 14.1788 2.41362 14.2117 2.38971 14.2449C2.05211 14.7144 1.66669 15.2505 1.66669 16.0001C1.66669 16.7497 2.05211 17.2857 2.38971 17.7552C2.41362 17.7885 2.43731 17.8214 2.46058 17.8541"
      />
      <Path
        stroke="none"
        d="M2.46058 17.8541L7.36043 8.95073L2.46057 14.1461L2.46058 17.8541Z"
      />
      <Path
        stroke="none"
        d="M11 16.0001C11 13.2386 13.2385 11.0001 16 11.0001C18.7615 11.0001 21 13.2386 21 16.0001C21 18.7616 18.7615 21.0001 16 21.0001C13.2385 21.0001 11 18.7616 11 16.0001ZM16 13.0001C14.3431 13.0001 13 14.3432 13 16.0001C13 17.657 14.3431 19.0001 16 19.0001C17.6569 19.0001 19 17.657 19 16.0001C19 14.3432 17.6569 13.0001 16 13.0001Z"
      />
    </>
  ),
})

ViewIcon.displayName = 'ViewIcon'
export { ViewIcon }

const Mail02Icon = createIcon({
  Root: Svg,
  viewBox: '0 0 32 32',
  path: (
    <>
      <Path
        stroke="none"
        d="M8.47255 10.8243C8.75363 10.3489 9.36688 10.1913 9.84229 10.4724L13.765 12.7916C14.8908 13.4572 15.4894 13.6665 16 13.6665C16.5107 13.6665 17.1093 13.4572 18.2351 12.7916L22.1578 10.4724C22.6332 10.1913 23.2464 10.3489 23.5275 10.8243C23.8086 11.2997 23.651 11.9129 23.1756 12.194L19.253 14.5132C19.253 14.5132 19.253 14.5132 19.253 14.5132C18.0918 15.1997 17.0899 15.6665 16 15.6665C14.9102 15.6665 13.9082 15.1997 12.7471 14.5132C12.7471 14.5132 12.7471 14.5132 12.7471 14.5132L8.82443 12.194C8.34902 11.9129 8.19148 11.2997 8.47255 10.8243Z"
      />
      <Path
        stroke="none"
        d="M12.1067 3.71557C14.7107 3.65015 17.2893 3.65015 19.8934 3.71558L19.971 3.71753C22.0041 3.76858 23.64 3.80966 24.9511 4.03799C26.3237 4.27705 27.4393 4.73555 28.3818 5.6816C29.3204 6.6237 29.7765 7.72329 30.011 9.07373C30.2344 10.3597 30.2683 11.9559 30.3104 13.9333L30.3121 14.011C30.3121 14.011 30.3121 14.011 30.3121 14.011C30.3405 15.3393 30.3405 16.6602 30.3121 17.9886C30.3121 17.9886 30.3121 17.9887 30.3121 17.9886L30.3104 18.0665C30.2683 20.0438 30.2344 21.64 30.011 22.926C29.7765 24.2764 29.3204 25.3759 28.3818 26.318C27.4394 27.2641 26.3238 27.7227 24.9511 27.9617C23.6401 28.19 22.0043 28.2311 19.9714 28.2821L19.8934 28.2841C17.2893 28.3496 14.7107 28.3496 12.1067 28.2841L12.0286 28.2821C9.99577 28.2311 8.35995 28.19 7.04896 27.9617C5.67629 27.7227 4.56065 27.2642 3.61816 26.318C2.67963 25.3759 2.22354 24.2763 1.98904 22.926C1.76575 21.6402 1.73174 20.0441 1.68961 18.0671L1.68793 17.9887C1.6596 16.6602 1.6596 15.3394 1.68793 14.011L1.6896 13.9327C1.73173 11.9556 1.76574 10.3595 1.98903 9.0737C2.22354 7.7233 2.67964 6.62371 3.61818 5.68161C4.56067 4.73553 5.67629 4.27703 7.04896 4.03797C8.36005 3.80964 9.99602 3.76856 12.0291 3.71752L12.1067 3.71557ZM19.8432 5.71495C17.2726 5.65036 14.7275 5.65036 12.1569 5.71494C10.028 5.76842 8.54041 5.80833 7.3921 6.00831C6.28873 6.20047 5.60076 6.52529 5.03508 7.09313C4.46544 7.66494 4.14566 8.34415 3.95954 9.4159C3.76515 10.5353 3.73171 11.9796 3.68748 14.0536C3.65976 15.3537 3.65976 16.646 3.68748 17.946C3.73171 20.02 3.76516 21.4644 3.95955 22.5838C4.14566 23.6555 4.46544 24.3347 5.03507 24.9065C5.60075 25.4744 6.28873 25.7992 7.3921 25.9914C8.54041 26.1914 10.028 26.2312 12.1569 26.2847C14.7275 26.3494 17.2726 26.3494 19.8432 26.2847C21.9721 26.2312 23.4597 26.1914 24.608 25.9914C25.7113 25.7992 26.3992 25.4744 26.9649 24.9065C27.5345 24.3348 27.8544 23.6555 28.0405 22.5838C28.2349 21.4644 28.2683 20.0201 28.3125 17.9461C28.3403 16.6461 28.3403 15.3537 28.3125 14.0538C28.2683 11.9798 28.2349 10.5353 28.0405 9.41593C27.8544 8.34418 27.5346 7.66498 26.9649 7.09317C26.3993 6.52534 25.7113 6.20049 24.608 6.00834C23.4597 5.80835 21.9721 5.76844 19.8432 5.71495Z"
      />
    </>
  ),
})

Mail02Icon.displayName = 'Mail02Icon'
export { Mail02Icon }

const CheckSolidIcon = createIcon({
  Root: Svg,
  viewBox: '0 0 12 10',
  path: (
    <>
      <Path
        stroke="none"
        d="M8.83103 0.324784C9.2121 -0.0944052 9.86623 -0.109975 10.2668 0.290618L11.4299 1.45368C11.8173 1.84117 11.8173 2.46941 11.4299 2.8569L4.57739 9.70939C4.18992 10.0969 3.56167 10.0969 3.17418 9.70939L0.290613 6.82582C-0.0968709 6.43834 -0.0968709 5.81006 0.290613 5.42258L1.18973 4.52346C1.57722 4.13598 2.20547 4.13598 2.59295 4.52346L3.86113 5.79163L8.83103 0.324784Z"
      />
    </>
  ),
})

CheckSolidIcon.displayName = 'CheckSolidIcon'
export { CheckSolidIcon }
