import { HStack } from './ui/hstack'
import { AlertCircle02Icon, Icon } from './ui/icon'
import { Toast, ToastDescription, ToastTitle } from './ui/toast'
import { VStack } from './ui/vstack'

interface ToastMessageProps {
  id: string
  title: string
  description: string
  action: 'info' | 'success' | 'error'
}

export function ToastMessage({
  id,
  title,
  description,
  action,
}: ToastMessageProps) {
  const iconColor =
    action === 'success' || action === 'error' ? 'fill-white' : 'fill-gray-400'

  return (
    <Toast action={action} nativeID={id}>
      <HStack className="gap-[8px]">
        <Icon
          as={AlertCircle02Icon}
          size="xs"
          className={`mt-[4px] ${iconColor}`}
        />
        <VStack>
          <ToastTitle>{title}</ToastTitle>
          <ToastDescription>{description}</ToastDescription>
        </VStack>
      </HStack>
    </Toast>
  )
}
