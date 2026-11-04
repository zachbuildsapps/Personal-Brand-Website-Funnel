import { useState } from 'react'
import { Link } from 'react-router-dom'
import { siteConfig } from '../config/siteConfig.ts'
import { hasTrackingIds, initTracking, readConsent, track, writeConsent } from '../lib/tracking.ts'
import { buttonBase, buttonMd, buttonPrimary, buttonSecondary } from './ApplyButton.tsx'

export function TrackingConsent() {
  const [consent, setConsent] = useState(readConsent)
  if (!hasTrackingIds(siteConfig.tracking) || consent !== 'unknown') return null

  function choose(value: 'granted' | 'denied') {
    writeConsent(value)
    setConsent(value)
    if (value === 'granted') {
      initTracking()
      track('page_view', { path: window.location.pathname })
    }
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[70] p-4 md:p-6">
      <div className="mx-auto max-w-xl border border-white/12 bg-panel p-5">
        <p className="text-sm font-medium text-paper">Analytics are optional</p>
        <p className="mt-2 text-sm leading-relaxed text-mute">
          If you allow it, this site can measure visits and application events with Google Analytics, Meta, and
          TikTok. They stay off unless you allow them.{' '}
          <Link to="/privacy" className="text-paper underline underline-offset-4">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="mt-4 flex gap-3">
          <button type="button" className={`${buttonBase} ${buttonPrimary} ${buttonMd}`} onClick={() => choose('granted')}>
            Allow
          </button>
          <button type="button" className={`${buttonBase} ${buttonSecondary} ${buttonMd}`} onClick={() => choose('denied')}>
            Decline
          </button>
        </div>
      </div>
    </div>
  )
}
