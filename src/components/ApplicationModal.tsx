import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { siteConfig } from '../config/siteConfig.ts'
import { useApplication } from '../context/ApplicationContext.tsx'
import {
  TYPEFORM_URL_PLACEHOLDER,
  getTypeformId,
  isLiveHttpsUrl,
} from '../lib/integrations.ts'
import { track } from '../lib/tracking.ts'
import { ApplicationPreview } from './ApplicationPreview.tsx'
import { useFocusTrap, useScrollLock } from './hooks.ts'

const TypeformEmbed = lazy(() =>
  import('./TypeformEmbed.tsx').then((module) => ({ default: module.TypeformEmbed })),
)

export function ApplicationModal() {
  const { isOpen, source, closeApplication } = useApplication()
  const dialogRef = useRef<HTMLDivElement>(null)
  const formId = getTypeformId(siteConfig.typeformUrl)
  const externalUrl = isLiveHttpsUrl(siteConfig.typeformUrl, TYPEFORM_URL_PLACEHOLDER)
    ? siteConfig.typeformUrl.trim()
    : ''
  const mode = formId ? 'embed' : externalUrl ? 'link' : 'preview'

  useScrollLock(isOpen)
  useFocusTrap(isOpen, dialogRef, closeApplication)

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[60] flex items-stretch justify-center bg-black/75 md:items-center md:p-6"
      onClick={closeApplication}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="application-title"
        tabIndex={-1}
        className="flex h-dvh w-full flex-col bg-ink outline-none md:h-[min(860px,100%)] md:max-w-[740px] md:border md:border-white/12"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-8">
          <div>
            <p className="font-mono text-[11px] tracking-[0.18em] text-mute uppercase">{siteConfig.name}</p>
            <h2 id="application-title" className="mt-1 text-xl font-medium tracking-[-0.03em] text-paper">
              Application
            </h2>
            {mode === 'preview' ? (
              <p className="mt-2 max-w-md text-sm leading-relaxed text-mute">
                Preview. Typeform isn’t connected, so these answers stay in this window and are not submitted.
              </p>
            ) : null}
          </div>
          <div className="flex items-center gap-3">
            {externalUrl ? (
              <a
                href={externalUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="hidden text-sm text-mute underline-offset-4 hover:text-paper hover:underline sm:inline"
              >
                Open in a new tab
              </a>
            ) : null}
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center border border-white/15 text-paper"
              aria-label="Close application"
              data-autofocus={mode === 'preview' ? undefined : ''}
              onClick={closeApplication}
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>
        </div>
        {externalUrl ? (
          <a
            href={externalUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="border-b border-white/10 px-5 py-3 text-sm text-mute underline-offset-4 hover:text-paper sm:hidden"
          >
            Open in a new tab
          </a>
        ) : null}
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
          {mode === 'preview' ? <ApplicationPreview source={source} /> : null}
          {mode === 'link' ? (
            <div className="px-5 py-8 sm:px-8">
              <h3 className="text-2xl font-medium tracking-[-0.03em] text-paper">The application link isn’t ready to embed.</h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-mute">
                The URL in the site config isn’t a Typeform form yet. You can open it in a new tab, or replace it with
                a Typeform link.
              </p>
              <a
                href={externalUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-6 inline-flex min-h-12 items-center bg-paper px-5 text-[15px] font-medium text-ink"
              >
                Open application
              </a>
            </div>
          ) : null}
          {mode === 'embed' && formId ? (
            <TypeformPane formId={formId} source={source} externalUrl={externalUrl} />
          ) : null}
        </div>
      </div>
    </div>
  )
}

function TypeformPane({
  formId,
  source,
  externalUrl,
}: {
  formId: string
  source: string
  externalUrl: string
}) {
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const started = useRef(false)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setStatus((current) => (current === 'loading' ? 'error' : current))
    }, 12000)
    return () => window.clearTimeout(timer)
  }, [formId])

  return (
    <div className="relative min-h-[480px] flex-1">
      {status === 'loading' ? (
        <p className="absolute inset-0 z-10 flex items-center justify-center bg-ink text-sm text-mute">
          Loading application…
        </p>
      ) : null}
      {status === 'error' ? (
        <div className="absolute inset-0 z-10 flex flex-col items-start justify-center bg-ink px-5 sm:px-8">
          <h3 className="text-2xl font-medium tracking-[-0.03em] text-paper">The form didn’t load.</h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-mute">
            Check the Typeform URL, then try again. You can also open the application in a new tab.
          </p>
          <a
            href={externalUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-6 inline-flex min-h-12 items-center bg-paper px-5 text-[15px] font-medium text-ink"
          >
            Open application
          </a>
        </div>
      ) : (
        <Suspense fallback={null}>
          <TypeformEmbed
            formId={formId}
            onReady={() => setStatus('ready')}
            onStarted={() => {
              if (started.current) return
              started.current = true
              track('application_started', { source, mode: 'typeform' })
            }}
            onSubmit={() => track('application_completed', { source, mode: 'typeform' })}
          />
        </Suspense>
      )}
    </div>
  )
}
