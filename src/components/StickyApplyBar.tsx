import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { siteConfig } from '../config/siteConfig.ts'
import { useApplication } from '../context/ApplicationContext.tsx'
import { ApplyButton } from './ApplyButton.tsx'

export function StickyApplyBar() {
  const { pathname } = useLocation()
  const { isOpen } = useApplication()
  const [pastHero, setPastHero] = useState(() => window.scrollY > 520)
  const [applyVisible, setApplyVisible] = useState(false)
  const [path, setPath] = useState(pathname)
  if (path !== pathname) {
    setPath(pathname)
    setApplyVisible(false)
    setPastHero(window.scrollY > 520)
  }

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > 520)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const node = document.getElementById('apply')
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => setApplyVisible(entry.isIntersecting), {
      threshold: 0.35,
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [pathname])

  const visible = !isOpen && !applyVisible && (pathname !== '/' || pastHero)
  if (!visible) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden">
      <ApplyButton source="sticky" className="w-full">
        {siteConfig.cta.sticky}
      </ApplyButton>
    </div>
  )
}
