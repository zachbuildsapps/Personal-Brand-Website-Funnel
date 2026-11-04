import { useState } from 'react'
import { siteConfig, type Testimonial } from '../config/siteConfig.ts'
import { isSafeAssetUrl } from '../lib/media.ts'
import { Eyebrow, Section, headingClass, ledeClass } from './Layout.tsx'

export function Testimonials() {
  const { results, testimonials } = siteConfig
  const published = testimonials.filter((item) => !item.sample && item.quote.trim() && item.name.trim())

  return (
    <Section id="results" tone="panel">
      <Eyebrow index={results.index}>{results.label}</Eyebrow>
      <h2 className={`${headingClass} mt-4 max-w-3xl`}>{results.title}</h2>
      <p className={ledeClass}>{results.lede}</p>
      {published.length > 0 ? (
        <div className="mt-12 divide-y divide-white/10 border-y border-white/10">
          {published.map((item) => (
            <TestimonialRow key={item.id} item={item} />
          ))}
        </div>
      ) : null}
      {isSafeAssetUrl(results.video.src) || isSafeAssetUrl(results.message.src) ? (
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <MediaSlot
            src={results.video.src}
            poster={results.video.poster}
            title={results.video.title}
            caption={results.video.caption}
            kind="video"
          />
          <MediaSlot
            src={results.message.src}
            title={results.message.title}
            caption={results.message.caption}
            alt={results.message.alt}
            kind="image"
          />
        </div>
      ) : null}
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
  src,
  poster,
  title,
  caption,
  alt,
  kind,
}: {
  src: string
  poster?: string
  title: string
  caption: string
  alt?: string
  kind: 'video' | 'image'
}) {
  if (!isSafeAssetUrl(src)) return null

  return (
    <figure className="border border-white/12 bg-ink">
      <div className="relative flex aspect-video items-center justify-center overflow-hidden">
        {kind === 'image' ? (
          <img src={src} alt={alt ?? ''} className="h-full w-full object-cover" loading="lazy" decoding="async" />
        ) : (
          <video className="h-full w-full" controls playsInline preload="metadata" poster={poster || undefined}>
            <source src={src} />
          </video>
        )}
      </div>
      <figcaption className="border-t border-white/10 px-4 py-3">
        <p className="text-sm text-paper">{title}</p>
        <p className="mt-1 text-sm text-mute">{caption}</p>
      </figcaption>
    </figure>
  )
}
