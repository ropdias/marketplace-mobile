import { useCallback, useState } from 'react'

export function useDebounceNav(delay = 1000) {
  const [isNavigating, setIsNavigating] = useState(false)

  const handleNavigation = useCallback(
    (action: () => void) => {
      // If already navigating, ignore additional clicks
      if (isNavigating) return

      setIsNavigating(true)

      // Execute the navigation action (push, replace, etc.)
      action()

      // Reset the state after the delay to allow future clicks
      // (e.g., if the user returns to this screen or an error occurs)
      setTimeout(() => {
        setIsNavigating(false)
      }, delay)
    },
    [isNavigating, delay],
  )

  return { isNavigating, handleNavigation }
}
