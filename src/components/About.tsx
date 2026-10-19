import { siteConfig } from '../config/siteConfig.ts'
import { ApplyButton } from './ApplyButton.tsx'
import { Eyebrow, Section, headingClass } from './Layout.tsx'
import { PhotoFrame } from './PhotoFrame.tsx'

export function About() {
  const { about, cta } = siteConfig
  return (
    <Section id="about" tone="panel">
      <div className="grid items-start gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <Eyebrow index={about.index}>{about.label}</Eyebrow>
          <h2 className={`${headingClass} mt-4`}>
            {about.titleLead} <span className="text-gold">{about.titleAccent}</span>
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-mute md:text-[1.0625rem]">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-8">
            <ApplyButton source="about" className="w-full sm:w-auto">
              {cta.about}
            </ApplyButton>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:col-span-7 md:pt-14">
          <PhotoFrame src={about.portrait.src} alt={about.portrait.alt} label={about.portrait.label} />
          <PhotoFrame
            src={about.dealershipPhoto.src}
            alt={about.dealershipPhoto.alt}
            label={about.dealershipPhoto.label}
            className="md:mt-12"
          />
        </div>
      </div>
    </Section>
  )
}
