import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '../lib/cn.ts'

export const shellClass = 'mx-auto w-full max-w-[1120px] px-5 sm:px-8'
export const headingClass =
  'text-[clamp(2.15rem,4.6vw,3.7rem)] font-medium leading-[1.02] tracking-[-0.04em] text-balance text-paper'
export const ledeClass = 'mt-5 max-w-xl text-base leading-relaxed text-mute md:text-[1.125rem]'

export function Shell({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn(shellClass, className)}>{children}</div>
}

export function Section({
  id,
  tone = 'ink',
  className,
  children,
}: {
  id?: string
  tone?: 'ink' | 'panel'
  className?: string
  children: ReactNode
}) {
  return (
    <section
      id={id}
      className={cn('scroll-mt-20 py-20 md:py-28', tone === 'panel' ? 'bg-panel' : 'bg-ink', className)}
    >
      <Shell>{children}</Shell>
    </section>
  )
}

export function Eyebrow({ index, children }: { index: string; children: ReactNode }) {
  return (
    <p className="font-mono text-[11px] tracking-[0.22em] text-mute uppercase">
      <span className="text-gold">{index}</span>
      <span className="px-2 text-white/25">/</span>
      {children}
    </p>
  )
}

export function SectionLink({
  id,
  className,
  children,
  onNavigate,
  autoFocus,
}: {
  id: string
  className?: string
  children: ReactNode
  onNavigate?: () => void
  autoFocus?: boolean
}) {
  const focus = autoFocus ? { 'data-autofocus': '' } : {}
  const { pathname } = useLocation()
  if (pathname === '/') {
    return (
      <a href={`#${id}`} className={className} onClick={onNavigate} {...focus}>
        {children}
      </a>
    )
  }
  return (
    <Link to={`/#${id}`} className={className} onClick={onNavigate} {...focus}>
      {children}
    </Link>
  )
}
