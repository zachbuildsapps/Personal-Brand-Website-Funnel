import { useEffect, useRef, useState } from 'react'
import { Play } from 'lucide-react'
import { siteConfig } from '../config/siteConfig.ts'
import { resolveVideo } from '../lib/media.ts'
import { track } from '../lib/tracking.ts'

export function VideoPlayer() {
  const source = resolveVideo(siteConfig.video)
  const videoRef = useRef<HTMLVideoElement>(null)
  const played = useRef(false)
  const [playing, setPlaying] = useState(false)
  const [notice, setNotice] = useState('')

  useEffect(() => {
    if (!playing || source.kind !== 'file') return
    const node = videoRef.current
    if (!node) return
    node.play().catch(() => {
      setNotice('Use the video controls to start playback.')
    })
  }, [playing, source.kind])

  function markPlay() {
    if (played.current) return
    played.current = true
    track('video_play', { kind: source.kind })
  }

  if (source.kind === 'embed' && playing) {
    return (
      <div className="relative aspect-video w-full overflow-hidden border border-white/12 bg-black">
        <iframe
          src={source.src}
          title={siteConfig.video.heading}
          className="h-full w-full"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    )
  }

  const poster = source.kind === 'empty' ? undefined : source.poster
  const empty = source.kind === 'empty'

  return (
    <div className="relative aspect-video w-full overflow-hidden border border-white/12 bg-[#0c0c0c]">
      {source.kind === 'file' ? (
        <video
          ref={videoRef}
          className="h-full w-full"
          poster={poster}
          controls={playing}
          playsInline
          preload="metadata"
        >
          <source src={source.src} type={source.src.toLowerCase().includes('.webm') ? 'video/webm' : 'video/mp4'} />
        </video>
      ) : null}
      {poster && source.kind !== 'file' ? (
        <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover" />
      ) : null}
      {poster && !playing ? <div className="absolute inset-0 bg-ink/50" /> : null}
      {!playing ? (
        <button
          type="button"
          className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-6 text-center"
          aria-label={empty ? 'Video coming soon' : 'Play video'}
          onClick={() => {
            if (empty) {
              setNotice('This film will be added soon.')
              return
            }
            markPlay()
            setPlaying(true)
          }}
        >
          <span className="grid h-[4.5rem] w-[4.5rem] place-items-center rounded-full border border-white/35 bg-ink/50 transition-colors hover:border-gold">
            <Play aria-hidden="true" className="ml-1 h-7 w-7 fill-paper text-paper" strokeWidth={1.5} />
          </span>
          {empty ? (
            <>
              <span className="max-w-xl text-2xl font-medium tracking-[-0.04em] text-paper sm:text-4xl">
                {siteConfig.video.placeholderTitle}
              </span>
              <span className="max-w-md text-sm leading-relaxed text-mute sm:text-base">
                {siteConfig.video.placeholderSubtitle}
              </span>
            </>
          ) : null}
          {notice ? <span className="max-w-sm text-sm text-gold">{notice}</span> : null}
        </button>
      ) : null}
    </div>
  )
}
