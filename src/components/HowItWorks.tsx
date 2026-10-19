import { CalendarDays, Compass, FileText, type LucideIcon } from 'lucide-react'
import { siteConfig } from '../config/siteConfig.ts'
import { Eyebrow, Section, headingClass } from './Layout.tsx'

const icons: LucideIcon[] = [FileText, CalendarDays, Compass]

export function HowItWorks() {
  const { process } = siteConfig
  return (
    <Section>
      <Eyebrow index={process.index}>{process.label}</Eyebrow>
      <h2 className={`${headingClass} mt-4 max-w-3xl`}>{process.title}</h2>
      <div className="relative mt-14">
        <div className="absolute top-[11px] right-0 left-0 hidden h-px bg-white/12 md:block" aria-hidden="true" />
        <ol className="grid gap-12 md:grid-cols-3 md:gap-8">
        {process.steps.map((step, index) => {
          const Icon = icons[index] ?? Compass
          return (
            <li key={step.title} className="relative">
              <div className="flex items-center gap-3">
                <span className="relative z-10 bg-ink pr-3 font-mono text-[12px] tracking-[0.14em] text-gold">
                  0{index + 1}
                </span>
                <Icon aria-hidden="true" className="h-4 w-4 text-mute" strokeWidth={1.5} />
              </div>
              <h3 className="mt-5 text-2xl font-medium tracking-[-0.03em] text-paper">{step.title}</h3>
              <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-mute">{step.body}</p>
            </li>
          )
        })}
        </ol>
      </div>
    </Section>
  )
}
