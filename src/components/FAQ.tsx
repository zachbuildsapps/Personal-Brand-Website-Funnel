import { useId, useState } from 'react'
import { Plus } from 'lucide-react'
import { siteConfig } from '../config/siteConfig.ts'
import { cn } from '../lib/cn.ts'
import { Eyebrow, Section, headingClass } from './Layout.tsx'

export function FAQ() {
  const { faq } = siteConfig
  const baseId = useId()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <Section id="faq">
      <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <div>
          <Eyebrow index={faq.index}>{faq.label}</Eyebrow>
          <h2 className={`${headingClass} mt-4`}>{faq.title}</h2>
        </div>
        <div className="border-t border-white/10">
          {faq.items.map((item, index) => {
            const open = openIndex === index
            const buttonId = `${baseId}-button-${index}`
            const panelId = `${baseId}-panel-${index}`
            return (
              <div key={item.question} className="border-b border-white/10">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    className="flex w-full items-center justify-between gap-6 py-5 text-left text-lg font-medium tracking-[-0.02em] text-paper"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(open ? null : index)}
                  >
                    {item.question}
                    <Plus
                      aria-hidden="true"
                      className={cn('h-4 w-4 shrink-0 text-gold transition-transform duration-200', open && 'rotate-45')}
                      strokeWidth={1.5}
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  inert={open ? undefined : true}
                  className="grid transition-[grid-template-rows] duration-300 ease-out data-[open=false]:grid-rows-[0fr] data-[open=true]:grid-rows-[1fr]"
                  data-open={open}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-xl pb-5 text-[15px] leading-relaxed text-mute">{item.answer}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
