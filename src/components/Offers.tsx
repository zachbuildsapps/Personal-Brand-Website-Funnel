import { siteConfig } from '../config/siteConfig.ts'
import { ApplyButton } from './ApplyButton.tsx'
import { Eyebrow, Section, headingClass, ledeClass } from './Layout.tsx'

export function Offers() {
  const { offers, cta } = siteConfig
  return (
    <Section id="programs">
      <Eyebrow index={offers.index}>{offers.label}</Eyebrow>
      <h2 className={`${headingClass} mt-4 max-w-3xl`}>{offers.title}</h2>
      <p className={ledeClass}>{offers.lede}</p>
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        <OfferCard
          index="01"
          kicker={offers.mentorship.kicker}
          title={offers.mentorship.title}
          description={offers.mentorship.description}
          benefits={offers.mentorship.benefits}
          note={offers.mentorship.note}
          cta={cta.mentorship}
          source="mentorship"
        />
        <OfferCard
          index="02"
          kicker={offers.auction.kicker}
          title={offers.auction.title}
          description={offers.auction.description}
          benefits={offers.auction.benefits}
          note={offers.auction.note}
          cta={cta.auction}
          source="auction"
        />
      </div>
      <p className="mt-6 max-w-3xl text-sm leading-relaxed text-mute">{offers.note}</p>
    </Section>
  )
}

function OfferCard({
  index,
  kicker,
  title,
  description,
  benefits,
  note,
  cta,
  source,
}: {
  index: string
  kicker: string
  title: string
  description: string
  benefits: readonly string[]
  note: string
  cta: string
  source: string
}) {
  return (
    <article className="flex h-full flex-col border border-white/12 bg-panel p-7 transition-colors duration-200 hover:border-gold/45 md:p-9">
      <p className="font-mono text-[11px] tracking-[0.18em] text-mute uppercase">
        <span className="text-gold">{index}</span>
        <span className="px-2 text-white/25">/</span>
        {kicker}
      </p>
      <h3 className="mt-5 text-3xl font-medium tracking-[-0.04em] text-paper md:text-4xl">{title}</h3>
      <p className="mt-4 text-[15px] leading-relaxed text-mute">{description}</p>
      <ul className="mt-7 space-y-3">
        {benefits.map((benefit) => (
          <li key={benefit} className="flex gap-3 text-[15px] leading-snug text-paper">
            <span className="mt-[0.7em] h-px w-3 shrink-0 bg-gold" aria-hidden="true" />
            <span>{benefit}</span>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm leading-relaxed text-mute">{note}</p>
      <div className="mt-auto pt-8">
        <ApplyButton source={source} className="w-full sm:w-auto">
          {cta}
        </ApplyButton>
      </div>
    </article>
  )
}
