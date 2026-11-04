import { siteConfig } from '../config/siteConfig.ts'
import { ApplyButton, buttonBase, buttonMd, buttonSecondary } from './ApplyButton.tsx'
import { Shell } from './Layout.tsx'

export function Hero() {
  const { hero, cta, social } = siteConfig
  const photo = (
    <figure className="relative mx-auto aspect-[3/4] w-full max-w-[460px] overflow-hidden rounded-md border border-[#a6842c] shadow-[0_12px_32px_rgba(0,0,0,0.32)] lg:max-w-none">
      <img
        src={hero.photo.src}
        alt={hero.photo.alt}
        width={hero.photo.width}
        height={hero.photo.height}
        style={{ objectPosition: hero.photo.objectPosition }}
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />
    </figure>
  )
  return (
    <section id="top" className="bg-ink pt-14 pb-16 md:pt-24 md:pb-20">
      <Shell>
        <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-7 lg:col-start-1 lg:row-start-1">
            <p className="max-w-md font-mono text-[10px] tracking-[0.16em] text-gold text-balance uppercase sm:max-w-none sm:text-[11px] sm:tracking-[0.22em]">
              {hero.eyebrow}
            </p>
            <h1 className="mt-6 max-w-5xl text-[clamp(1.9rem,8vw,4.75rem)] font-medium leading-[0.96] tracking-[-0.05em] text-paper lg:text-[clamp(1.9rem,4.4vw,4.15rem)]">
              <span className="block">
                {hero.lineOneLead} <span className="text-gold">{hero.lineOneAccent}</span>
              </span>
              <span className="block">
                {hero.lineTwoLead} <span className="block sm:inline">{hero.lineTwoTail}</span>
              </span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-mute md:text-lg">{hero.subheadline}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ApplyButton source="hero" className="w-full sm:w-auto">
                {cta.heroPrimary}
              </ApplyButton>
              <a href="#video" className={`${buttonBase} ${buttonSecondary} ${buttonMd} w-full sm:w-auto`}>
                {cta.heroSecondary}
              </a>
            </div>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1">{photo}</div>
          <div className="lg:col-span-7 lg:col-start-1">
            <p className="font-mono text-[11px] tracking-[0.16em] text-mute uppercase lg:mt-8">{hero.operator}</p>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              <a
                href={social.instagram}
                target="_blank"
                rel="noreferrer noopener"
                className="text-mute underline-offset-4 hover:text-paper hover:underline"
              >
                Instagram
              </a>
              <a
                href={social.tiktok}
                target="_blank"
                rel="noreferrer noopener"
                className="text-mute underline-offset-4 hover:text-paper hover:underline"
              >
                TikTok
              </a>
            </div>
          </div>
        </div>
        <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/10 pt-8 md:grid-cols-4">
          {hero.proof.map((item) => (
            <div key={item.label}>
              <dt className="font-mono text-[10px] tracking-[0.18em] text-mute uppercase">{item.label}</dt>
              <dd className="mt-2 text-[15px] leading-snug text-paper">{item.value}</dd>
            </div>
          ))}
        </dl>
      </Shell>
    </section>
  )
}
