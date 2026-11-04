import { useState } from 'react'
import { cn } from '../lib/cn.ts'
import { isSafeAssetUrl } from '../lib/media.ts'

export function PhotoFrame({
  src,
  alt,
  label = '',
  className,
  objectPosition = 'center',
  width,
  height,
  framed = false,
}: {
  src: string
  alt: string
  label?: string
  className?: string
  objectPosition?: string
  width?: number
  height?: number
  framed?: boolean
}) {
  const [failed, setFailed] = useState(false)
  const show = isSafeAssetUrl(src) && !failed

  return (
    <figure
      className={cn(
        'relative w-full overflow-hidden bg-[#101010]',
        framed
          ? 'aspect-[3/4] rounded-md border border-[#a6842c] shadow-[0_12px_32px_rgba(0,0,0,0.32)]'
          : 'aspect-[4/5] border border-white/12',
        className,
      )}
    >
      {show ? (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          style={{ objectPosition }}
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
      {label ? (
        <figcaption className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-ink/90 px-3 py-2.5 font-mono text-[10px] tracking-[0.16em] text-paper uppercase">
          {label}
        </figcaption>
      ) : null}
    </figure>
  )
}
