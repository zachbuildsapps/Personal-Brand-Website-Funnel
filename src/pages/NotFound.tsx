import { Link } from 'react-router-dom'
import { siteConfig } from '../config/siteConfig.ts'
import { ApplyButton } from '../components/ApplyButton.tsx'
import { usePageMeta } from '../components/hooks.ts'
import { Shell } from '../components/Layout.tsx'

export function NotFoundPage() {
  usePageMeta(`Page not found · ${siteConfig.name}`, 'That page is not on the ZachFlipsWhips site.', 'noindex,follow')
  return (
    <main id="main" className="bg-ink py-24">
      <Shell>
        <p className="font-mono text-[11px] tracking-[0.18em] text-gold uppercase">404</p>
        <h1 className="mt-4 text-5xl font-medium tracking-[-0.045em] text-paper">This page isn’t here.</h1>
        <p className="mt-4 max-w-md text-mute">The link may be old. Head back home, or apply if you’re ready to talk.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link to="/" className="inline-flex min-h-12 items-center justify-center bg-paper px-5 text-[15px] font-medium text-ink">
            Back home
          </Link>
          <ApplyButton source="not-found" variant="secondary">
            {siteConfig.cta.nav}
          </ApplyButton>
        </div>
      </Shell>
    </main>
  )
}
