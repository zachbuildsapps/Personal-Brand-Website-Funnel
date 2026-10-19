import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { track } from '../lib/tracking.ts'
import { Shell } from './Layout.tsx'

export function ScheduleNotice() {
  const location = useLocation()
  const scheduled = new URLSearchParams(location.search).get('scheduled') === '1'
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (!scheduled) return
    try {
      if (window.sessionStorage.getItem('zfw-scheduled-tracked')) return
      window.sessionStorage.setItem('zfw-scheduled-tracked', '1')
    } catch {
      // Tracking still no-ops until consent. The banner can show either way.
    }
    track('call_booked', { source: 'redirect' })
    const params = new URLSearchParams(location.search)
    params.delete('scheduled')
    const query = params.toString()
    const next = `${location.pathname}${query ? `?${query}` : ''}${location.hash}`
    window.history.replaceState({}, '', next)
  }, [location.hash, location.pathname, location.search, scheduled])

  if (!scheduled || dismissed) return null

  return (
    <div className="border-b border-white/10 bg-panel" role="status">
      <Shell className="flex items-start justify-between gap-6 py-4">
        <div>
          <p className="font-medium text-paper">Your call is booked.</p>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-mute">
            Check your email for the confirmation from the scheduler. Bring your goals and an honest picture of the
            capital you have to work with. The call is a conversation about fit. It is not a guarantee of results.
          </p>
        </div>
        <button type="button" className="text-sm text-mute hover:text-paper" onClick={() => setDismissed(true)}>
          Close
        </button>
      </Shell>
    </div>
  )
}
