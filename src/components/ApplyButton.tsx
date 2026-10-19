import type { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { useApplication } from '../context/ApplicationContext.tsx'
import { cn } from '../lib/cn.ts'

export const buttonBase =
  'inline-flex items-center justify-center gap-2.5 font-medium tracking-[-0.01em] transition-colors duration-200'
export const buttonPrimary = 'bg-paper text-ink hover:bg-white'
export const buttonSecondary = 'border border-white/20 bg-transparent text-paper hover:border-white/55'
export const buttonMd = 'min-h-12 px-5 text-[15px]'
export const buttonSm = 'min-h-10 px-3.5 text-sm'

export function ApplyButton({
  source,
  children,
  variant = 'primary',
  size = 'md',
  showArrow = true,
  className,
}: {
  source: string
  children: ReactNode
  variant?: 'primary' | 'secondary'
  size?: 'md' | 'sm'
  showArrow?: boolean
  className?: string
}) {
  const { openApplication } = useApplication()
  return (
    <button
      type="button"
      className={cn(
        buttonBase,
        variant === 'primary' ? buttonPrimary : buttonSecondary,
        size === 'md' ? buttonMd : buttonSm,
        className,
      )}
      onClick={() => openApplication(source)}
    >
      {children}
      {showArrow ? <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} /> : null}
    </button>
  )
}
