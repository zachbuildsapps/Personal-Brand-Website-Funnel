import { useState } from 'react'
import { Play } from 'lucide-react'
import { siteConfig, type Testimonial } from '../config/siteConfig.ts'
import { isSafeAssetUrl } from '../lib/media.ts'
import { Eyebrow, Section, headingClass, ledeClass } from './Layout.tsx'

export function Testimonials() {
  const { results, testimonials } = siteConfig
  const hasSample = testimonials.some((item) => item.sample)

  return (
    <Section id="results" tone="panel">
      <Eyebrow index={results.index}>{results.label}</Eyebrow>
      <h2 className={`${headingClass} mt-4 max-w-3xl`}>{results.title}</h2>
      <p className={ledeClass}>{results.lede}</p>
      {hasSample ? (
        <p className="mt-8 max-w-3xl border border-gold/40 px-4 py-3 text-sm leading-relaxed text-paper">
          <span className="font-medium text-gold">Sample content. </span>
          The stories below are fictional placeholders for layout review. They are not testimonials from real
          customers, and they are not verified results. Replace them with stories you have permission to publish,
          or remove them, before launch.
        </p>
      ) : null}
      <div className="mt-12 divide-y divide-white/10 border-y border-white/10">
        {testimonials.map((item) => (
          <TestimonialRow key={item.id} item={item} />
        ))}
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <MediaSlot
          showPlaceholder={hasSample}
          src={results.video.src}
          poster={results.video.poster}
          title={results.video.title}
          caption={results.video.caption}
          kind="video"
        />
        <MediaSlot
          showPlaceholder={hasSample}
          src={results.message.src}
          title={results.message.title}
          caption={results.message.caption}
          alt={results.message.alt}
          kind="image"
        />
      </div>
    </Section>
  )
}

function TestimonialRow({ item }: { item: Testimonial }) {
  const [failed, setFailed] = useState(false)
  const showPhoto = isSafeAssetUrl(item.photo) && !failed

  return (
    <figure className="grid gap-5 py-8 md:grid-cols-[180px_1fr] md:gap-10 md:py-10">
      <figcaption className="flex items-center gap-3 md:block">
        {showPhoto ? (
          <img
            src={item.photo}
            alt=""
            className="h-12 w-12 object-cover"
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
          />
        ) : (
          <span className="grid h-12 w-12 place-items-center border border-white/15 font-mono text-[11px] text-mute">
            {item.initials}
          </span>
        )}
        <span className="md:mt-4 md:block">
          <span className="block text-sm text-paper">{item.name}</span>
          <span className="mt-1 block text-sm text-mute">{item.context}</span>
          {item.sample ? (
            <span className="mt-2 block font-mono text-[10px] tracking-[0.16em] text-gold uppercase">Sample</span>
          ) : null}
        </span>
      </figcaption>
      <blockquote>
        <p className="border-l border-gold/80 pl-5 text-xl leading-snug tracking-[-0.03em] text-paper md:text-2xl">
          {item.quote}
        </p>
      </blockquote>
    </figure>
  )
}

function MediaSlot({
  showPlaceholder,
  src,
  poster,
  title,
  caption,
  alt,
  kind,
}: {
  showPlaceholder: boolean
  src: string
  poster?: string
  title: string
  caption: string
  alt?: string
  kind: 'video' | 'image'
}) {
  const filled = isSafeAssetUrl(src)
  if (!filled && !showPlaceholder) return null
  const note = filled ? caption : 'Sample placeholder. Not a real customer.'

  return (
    <figure className="border border-white/12 bg-ink">
      <div className="relative flex aspect-video items-center justify-center overflow-hidden">
        {filled && kind === 'image' ? (
          <img src={src} alt={alt ?? ''} className="h-full w-full object-cover" loading="lazy" decoding="async" />
        ) : null}
        {filled && kind === 'video' ? (
          <video className="h-full w-full" controls playsInline preload="metadata" poster={poster || undefined}>
            <source src={src} />
          </video>
        ) : null}
        {!filled ? (
          <div className="flex flex-col items-center gap-3 px-6 text-center">
            {kind === 'video' ? (
              <span className="grid h-12 w-12 place-items-center rounded-full border border-white/20">
                <Play aria-hidden="true" className="ml-0.5 h-4 w-4 fill-paper text-paper" />
              </span>
            ) : (
              <span className="h-16 w-24 border border-white/15" aria-hidden="true" />
            )}
            <span className="font-mono text-[10px] tracking-[0.16em] text-mute uppercase">Sample slot</span>
          </div>
        ) : null}
      </div>
      <figcaption className="border-t border-white/10 px-4 py-3">
        <p className="text-sm text-paper">{title}</p>
        <p className="mt-1 text-sm text-mute">{note}</p>
      </figcaption>
    </figure>
  )
}
