import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Menu, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { siteConfig } from '../config/siteConfig.ts'
import { useApplication } from '../context/ApplicationContext.tsx'
import { cn } from '../lib/cn.ts'
import { ApplyButton } from './ApplyButton.tsx'
import { useFocusTrap, useScrollLock } from './hooks.ts'
import { SectionLink, shellClass } from './Layout.tsx'

const sectionIds = siteConfig.nav.map((item) => item.id)

export function Navbar() {
  const { pathname } = useLocation()
  const { isOpen, openApplication } = useApplication()
  const [menuPath, setMenuPath] = useState(pathname)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('')
  const menuRef = useRef<HTMLDivElement>(null)
  if (menuPath !== pathname) {
    setMenuPath(pathname)
    setMenuOpen(false)
  }
  const menuVisible = menuOpen && !isOpen

  useScrollLock(menuVisible)
  useFocusTrap(menuVisible, menuRef, () => setMenuOpen(false))

  useEffect(() => {
    if (pathname !== '/') return
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element))
    if (elements.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) setActive(visible.target.id)
      },
      { rootMargin: '-35% 0px -50% 0px', threshold: [0.15, 0.4, 0.75] },
    )
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [pathname])

  const linkClass = (id: string) =>
    cn(
      'text-sm transition-colors',
      active === id ? 'text-paper' : 'text-mute hover:text-paper',
    )

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/90 backdrop-blur-md">
      <div className={cn(shellClass, 'flex h-16 items-center justify-between gap-3')}>
        <BrandLink onNavigate={() => setMenuOpen(false)} />
        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {siteConfig.nav.map((item) => (
            <SectionLink key={item.id} id={item.id} className={linkClass(item.id)}>
              {item.label}
            </SectionLink>
          ))}
          <ApplyButton source="nav" size="sm" showArrow={false}>
            {siteConfig.cta.nav}
          </ApplyButton>
        </nav>
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            className="inline-flex min-h-10 items-center bg-paper px-3 text-sm font-medium text-ink"
            onClick={() => {
              setMenuOpen(false)
              openApplication('nav-mobile')
            }}
          >
            {siteConfig.cta.nav}
          </button>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center border border-white/15 text-paper"
            aria-expanded={menuVisible}
            aria-controls="mobile-menu"
            aria-label={menuVisible ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuVisible ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {menuVisible
        ? createPortal(
            <div ref={menuRef} id="mobile-menu" className="fixed inset-0 z-[60] flex flex-col bg-ink md:hidden">
              <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
                <span className="inline-flex items-center gap-2.5 text-[15px] font-medium tracking-[-0.03em]">
                  <span className="h-1.5 w-1.5 bg-gold" aria-hidden="true" />
                  {siteConfig.name}
                </span>
                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center border border-white/15"
                  aria-label="Close menu"
                  onClick={() => setMenuOpen(false)}
                >
                  <X aria-hidden="true" className="h-5 w-5" />
                </button>
              </div>
              <nav aria-label="Mobile" className="flex flex-1 flex-col px-5 pt-6">
                {siteConfig.nav.map((item, index) => (
                  <SectionLink
                    key={item.id}
                    id={item.id}
                    autoFocus={index === 0}
                    onNavigate={() => setMenuOpen(false)}
                    className="border-b border-white/10 py-4 text-3xl font-medium tracking-[-0.04em] text-paper"
                  >
                    {item.label}
                  </SectionLink>
                ))}
                <button
                  type="button"
                  className="mt-8 inline-flex min-h-12 items-center justify-center bg-paper px-5 text-[15px] font-medium text-ink"
                  onClick={() => {
                    setMenuOpen(false)
                    openApplication('mobile-menu')
                  }}
                >
                  {siteConfig.cta.nav}
                </button>
              </nav>
            </div>,
            document.body,
          )
        : null}
    </header>
  )
}

function BrandLink({ onNavigate }: { onNavigate?: () => void }) {
  const { pathname } = useLocation()
  const className =
    'inline-flex items-center gap-2.5 text-[15px] font-medium tracking-[-0.03em] text-paper sm:text-[17px]'
  const mark = (
    <>
      <span className="h-1.5 w-1.5 bg-gold" aria-hidden="true" />
      {siteConfig.name}
    </>
  )
  if (pathname !== '/') {
    return (
      <Link to="/" className={className} onClick={onNavigate}>
        {mark}
      </Link>
    )
  }
  return (
    <a
      href="#top"
      className={className}
      onClick={(event) => {
        event.preventDefault()
        onNavigate?.()
        window.scrollTo({ top: 0, behavior: 'smooth' })
        window.history.replaceState({}, '', '/')
      }}
    >
      {mark}
    </a>
  )
}
