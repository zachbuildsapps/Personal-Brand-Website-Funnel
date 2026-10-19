import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { ApplicationModal } from './components/ApplicationModal.tsx'
import { AppErrorBoundary } from './components/AppErrorBoundary.tsx'
import { Footer } from './components/Footer.tsx'
import { Navbar } from './components/Navbar.tsx'
import { ScheduleNotice } from './components/ScheduleNotice.tsx'
import { ScrollManager } from './components/ScrollManager.tsx'
import { StickyApplyBar } from './components/StickyApplyBar.tsx'
import { TrackingConsent } from './components/TrackingConsent.tsx'
import { ApplicationProvider } from './context/ApplicationContext.tsx'
import { initTracking, readConsent, track } from './lib/tracking.ts'
import { DisclaimerPage } from './pages/Disclaimer.tsx'
import { HomePage } from './pages/Home.tsx'
import { NotFoundPage } from './pages/NotFound.tsx'
import { PrivacyPage } from './pages/Privacy.tsx'
import { TermsPage } from './pages/Terms.tsx'

function RoutedSite() {
  const location = useLocation()

  useEffect(() => {
    if (readConsent() === 'granted') initTracking()
    track('page_view', { path: location.pathname })
  }, [location.pathname])

  return (
    <div className="min-h-svh bg-ink text-paper">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[80] focus:bg-paper focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <Navbar />
      <ScheduleNotice />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/disclaimer" element={<DisclaimerPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
      <StickyApplyBar />
      <ApplicationModal />
      <TrackingConsent />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ApplicationProvider>
        <AppErrorBoundary>
          <ScrollManager />
          <RoutedSite />
        </AppErrorBoundary>
      </ApplicationProvider>
    </BrowserRouter>
  )
}
