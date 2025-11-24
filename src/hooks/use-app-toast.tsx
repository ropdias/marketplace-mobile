import { useCallback } from 'react'

import { ToastMessage } from '@/components/toast-message'
import { useToast } from '@/components/ui/toast'

type ToastAction = 'info' | 'success' | 'error'

interface ShowToastParams {
  title: string
  description: string
  action?: ToastAction
}

export function useAppToast() {
  const toast = useToast()

  const show = useCallback(
    ({ title, description, action = 'info' }: ShowToastParams) => {
      toast.show({
        placement: 'top',
        duration: 3000,
        render: ({ id }) => (
          <ToastMessage
            id={id}
            action={action}
            title={title}
            description={description}
          />
        ),
      })
    },
    // To avoid infinite loop issues with toast object
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const showInfo = useCallback(
    ({ title, description }: { title: string; description: string }) =>
      show({ title, description, action: 'info' }),
    [show],
  )

  const showSuccess = useCallback(
    ({ title, description }: { title: string; description: string }) =>
      show({ title, description, action: 'success' }),
    [show],
  )

  const showError = useCallback(
    ({ title, description }: { title: string; description: string }) =>
      show({ title, description, action: 'error' }),
    [show],
  )

  return {
    showInfo,
    showSuccess,
    showError,
  }
}
