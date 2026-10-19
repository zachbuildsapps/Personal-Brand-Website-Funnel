import { siteConfig } from '../config/siteConfig.ts'
import { ApplyButton } from './ApplyButton.tsx'
import { Shell } from './Layout.tsx'

export function FinalCta() {
  return (
    <section id="apply" className="scroll-mt-20 border-t border-white/10 bg-ink py-24 md:py-32">
      <Shell>
        <h2 className="max-w-4xl text-[clamp(2.4rem,6vw,4.8rem)] font-medium leading-[0.98] tracking-[-0.045em] text-balance text-paper">
          {siteConfig.finalCta.title}
        </h2>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-mute md:text-lg">{siteConfig.finalCta.lede}</p>
        <div className="mt-8">
          <ApplyButton source="final" className="w-full sm:w-auto">
            {siteConfig.cta.final}
          </ApplyButton>
        </div>
      </Shell>
    </section>
  )
}
