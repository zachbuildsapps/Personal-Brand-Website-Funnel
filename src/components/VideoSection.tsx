import { siteConfig } from '../config/siteConfig.ts'
import { resolveVideo } from '../lib/media.ts'
import { ApplyButton } from './ApplyButton.tsx'
import { Eyebrow, Section, headingClass, ledeClass } from './Layout.tsx'
import { VideoPlayer } from './VideoPlayer.tsx'

export function VideoSection() {
  const source = resolveVideo(siteConfig.video)
  const filled = source.kind !== 'empty'

  return (
    <Section id="video" tone="panel" className="pt-14 md:pt-20">
      <Eyebrow index={siteConfig.video.index}>{siteConfig.video.label}</Eyebrow>
      {filled ? <h2 className={`${headingClass} mt-4`}>{siteConfig.video.heading}</h2> : null}
      <div className={filled ? 'mt-8' : 'mt-6'}>
        <VideoPlayer />
      </div>
      {filled ? <p className={ledeClass}>{siteConfig.video.placeholderSubtitle}</p> : null}
      <div className="mt-8">
        <ApplyButton source="video" className="w-full sm:w-auto">
          {siteConfig.cta.video}
        </ApplyButton>
      </div>
    </Section>
  )
}
