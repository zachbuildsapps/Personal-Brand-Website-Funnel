import { Link } from 'react-router-dom'
import { siteConfig } from '../config/siteConfig.ts'
import { useApplication } from '../context/ApplicationContext.tsx'
import { SectionLink, Shell } from './Layout.tsx'

const year = new Date().getFullYear()

export function Footer() {
  const { openApplication } = useApplication()
  const email = siteConfig.contactEmail.trim()

  return (
    <footer className="border-t border-white/10 bg-ink pb-28 md:pb-0">
      <Shell className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="inline-flex items-center gap-2.5 text-[17px] font-medium tracking-[-0.03em]">
              <span className="h-1.5 w-1.5 bg-gold" aria-hidden="true" />
              {siteConfig.name}
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-mute">
              Car flipping education from the operator of {siteConfig.dealership}.
            </p>
            <div className="mt-5 flex gap-5 text-sm">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noreferrer noopener"
                className="text-mute hover:text-paper"
              >
                Instagram
              </a>
              <a
                href={siteConfig.social.tiktok}
                target="_blank"
                rel="noreferrer noopener"
                className="text-mute hover:text-paper"
              >
                TikTok
              </a>
            </div>
            {email.includes('@') ? (
              <a href={`mailto:${email}`} className="mt-4 inline-block text-sm text-mute hover:text-paper">
                {email}
              </a>
            ) : null}
          </div>
          <nav aria-label="Footer" className="flex flex-col items-start gap-2 text-sm">
            <Link to="/" className="py-1 text-mute hover:text-paper">
              Home
            </Link>
            <SectionLink id="programs" className="py-1 text-mute hover:text-paper">
              Programs
            </SectionLink>
            <SectionLink id="about" className="py-1 text-mute hover:text-paper">
              About
            </SectionLink>
            <SectionLink id="results" className="py-1 text-mute hover:text-paper">
              Results
            </SectionLink>
            <SectionLink id="faq" className="py-1 text-mute hover:text-paper">
              FAQ
            </SectionLink>
            <button type="button" className="py-1 text-left text-mute hover:text-paper" onClick={() => openApplication('footer')}>
              Apply
            </button>
          </nav>
          <nav aria-label="Legal" className="flex flex-col items-start gap-2 text-sm">
            <Link to="/privacy" className="py-1 text-mute hover:text-paper">
              Privacy Policy
            </Link>
            <Link to="/terms" className="py-1 text-mute hover:text-paper">
              Terms of Service
            </Link>
            <Link to="/disclaimer" className="py-1 text-mute hover:text-paper">
              Disclaimer
            </Link>
          </nav>
        </div>
        <p className="mt-12 border-t border-white/10 pt-6 text-xs leading-relaxed text-mute">
          © {year} {siteConfig.name}. Educational content. Car flipping involves financial risk, and results are not
          guaranteed.
        </p>
      </Shell>
    </footer>
  )
}
