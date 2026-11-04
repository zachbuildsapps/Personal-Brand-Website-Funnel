import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { track } from '../lib/tracking.ts'

type ApplicationContextValue = {
  isOpen: boolean
  source: string
  openApplication: (source: string) => void
  closeApplication: () => void
}

const ApplicationContext = createContext<ApplicationContextValue | null>(null)

export function ApplicationProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [source, setSource] = useState('site')

  const value = useMemo<ApplicationContextValue>(
    () => ({
      isOpen,
      source,
      openApplication(nextSource: string) {
        setSource(nextSource)
        setIsOpen(true)
        track('application_opened', { source: nextSource })
      },
      closeApplication() {
        setIsOpen(false)
      },
    }),
    [isOpen, source],
  )

  return <ApplicationContext.Provider value={value}>{children}</ApplicationContext.Provider>
}

// The hook shares this provider's context. Fast Refresh still reloads the module together.
// oxlint-disable-next-line react/only-export-components
export function useApplication() {
  const value = useContext(ApplicationContext)
  if (!value) throw new Error('useApplication must be used within ApplicationProvider')
  return value
}
