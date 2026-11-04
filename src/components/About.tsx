import { siteConfig } from '../config/siteConfig.ts'
import { ApplyButton } from './ApplyButton.tsx'
import { Eyebrow, Section, headingClass } from './Layout.tsx'
import { PhotoFrame } from './PhotoFrame.tsx'

export function About() {
  const { about, cta } = siteConfig
  return (
    <Section id="about" tone="panel">
      <div className="max-w-3xl">
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

      <div className="mt-16 border-t border-white/10 pt-14 md:mt-24 md:pt-20">
        <h3 className="max-w-3xl text-[clamp(1.7rem,3.2vw,2.6rem)] font-medium leading-[1.08] tracking-[-0.04em] text-balance text-paper">
          {about.storiesTitle}
        </h3>
        <div className="mt-12 flex flex-col gap-14 md:mt-16 md:gap-24">
          {about.stories.map((story, index) => {
            const imageFirst = index % 2 === 1
            return (
              <article
                key={story.index}
                className="grid items-start gap-6 md:grid-cols-2 md:gap-10 lg:gap-16"
              >
                <div className={imageFirst ? 'min-w-0 md:order-2' : 'min-w-0'}>
                  <p className="font-mono text-[11px] tracking-[0.22em] text-gold uppercase">{story.index}</p>
                  <h4 className="mt-4 text-[clamp(1.45rem,2.4vw,2.15rem)] font-medium leading-[1.12] tracking-[-0.035em] text-balance text-paper">
                    {story.title}
                  </h4>
                </div>
                <PhotoFrame
                  src={story.src}
                  alt={story.alt}
                  width={story.width}
                  height={story.height}
                  objectPosition={story.objectPosition}
                  framed
                  className={imageFirst ? 'md:order-1' : undefined}
                />
              </article>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
