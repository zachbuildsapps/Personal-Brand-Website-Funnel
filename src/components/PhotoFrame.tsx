import { useState } from 'react'
import { cn } from '../lib/cn.ts'
import { isSafeAssetUrl } from '../lib/media.ts'

export function PhotoFrame({
  src,
  alt,
  label,
  className,
}: {
  src: string
  alt: string
  label: string
  className?: string
}) {
  const [failed, setFailed] = useState(false)
  const show = isSafeAssetUrl(src) && !failed

  return (
    <figure className={cn('relative aspect-[4/5] overflow-hidden border border-white/12 bg-[#101010]', className)}>
      {show ? (
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-4 text-center">
          <span className="h-1.5 w-1.5 bg-gold" aria-hidden="true" />
          <span className="font-mono text-[11px] tracking-[0.18em] text-mute uppercase">Placeholder</span>
        </div>
      )}
      <figcaption className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-ink/90 px-3 py-2.5 font-mono text-[10px] tracking-[0.16em] text-paper uppercase">
        {label}
      </figcaption>
    </figure>
  )
}
