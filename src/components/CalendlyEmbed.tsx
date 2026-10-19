import { useEffect, useState } from 'react'
import { parseCalendlyEvent, toCalendlyEmbedSrc } from '../lib/integrations.ts'

export function CalendlyEmbed({ url, onBooked }: { url: string; onBooked: () => void }) {
  const src = toCalendlyEmbedSrc(url)
  const [loaded, setLoaded] = useState(false)
  const [timedOut, setTimedOut] = useState(false)

  useEffect(() => {
    if (!src) return
    const timer = window.setTimeout(() => setTimedOut(true), 12000)
    const onMessage = (event: MessageEvent) => {
      if (parseCalendlyEvent(event.origin, event.data) === 'scheduled') onBooked()
    }
    window.addEventListener('message', onMessage)
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('message', onMessage)
    }
  }, [onBooked, src])

  if (!src) {
    return (
      <div className="border border-white/12 bg-ink px-5 py-8">
        <p className="text-lg font-medium text-paper">Scheduler link needs a check.</p>
        <p className="mt-2 text-sm leading-relaxed text-mute">
          The scheduling URL is set, but it isn’t a calendly.com link yet. Update it in the site config to show open
          times here.
        </p>
      </div>
    )
  }

  return (
    <div>
      {!loaded ? <p className="mb-3 text-sm text-mute">Loading available times…</p> : null}
      <iframe
        src={src}
        title="Schedule a call with Zach"
        className="h-[720px] w-full border border-white/12 bg-panel"
        loading="lazy"
        onLoad={() => setLoaded(true)}
      />
      {timedOut && !loaded ? (
        <p className="mt-3 text-sm text-mute">
          The scheduler didn’t load.{' '}
          <a href={url} target="_blank" rel="noreferrer noopener" className="text-paper underline underline-offset-4">
            Open Calendly in a new tab
          </a>
          .
        </p>
      ) : null}
    </div>
  )
}
