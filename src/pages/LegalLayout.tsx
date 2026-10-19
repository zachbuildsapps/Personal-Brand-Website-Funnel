import type { ReactNode } from 'react'
import { siteConfig } from '../config/siteConfig.ts'
import { usePageMeta } from '../components/hooks.ts'
import { Shell } from '../components/Layout.tsx'

export function LegalLayout({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: ReactNode
}) {
  usePageMeta(
    `${title} · ${siteConfig.name}`,
    description,
    siteConfig.legalReviewed ? 'index,follow' : 'noindex,follow',
  )

  return (
    <main id="main" className="bg-ink pt-12 pb-8 md:pt-16">
      <Shell>
        <article className="mx-auto max-w-2xl">
          {siteConfig.legalReviewed ? null : (
            <div className="border border-gold/40 px-4 py-3">
              <p className="text-sm font-medium text-gold">Draft for your review</p>
              <p className="mt-1 text-sm leading-relaxed text-mute">
                This page is a starting template written for {siteConfig.name}. It is not legal advice and has not been
                reviewed by an attorney. Have a qualified lawyer review it before you rely on it.
              </p>
            </div>
          )}
          <h1 className="mt-8 text-[clamp(2.4rem,5vw,4rem)] font-medium tracking-[-0.045em] text-paper">{title}</h1>
          <p className="mt-4 text-sm text-mute">Last updated October 19, 2026. Draft.</p>
          <div className="legal mt-10 space-y-8">{children}</div>
        </article>
      </Shell>
    </main>
  )
}
