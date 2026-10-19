import { siteConfig } from '../config/siteConfig.ts'
import { About } from '../components/About.tsx'
import { FAQ } from '../components/FAQ.tsx'
import { FinalCta } from '../components/FinalCta.tsx'
import { Hero } from '../components/Hero.tsx'
import { HowItWorks } from '../components/HowItWorks.tsx'
import { usePageMeta } from '../components/hooks.ts'
import { Offers } from '../components/Offers.tsx'
import { Testimonials } from '../components/Testimonials.tsx'
import { VideoSection } from '../components/VideoSection.tsx'

export function HomePage() {
  usePageMeta(siteConfig.seo.title, siteConfig.seo.description)
  return (
    <main id="main">
      <Hero />
      <VideoSection />
      <Offers />
      <About />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <FinalCta />
    </main>
  )
}
