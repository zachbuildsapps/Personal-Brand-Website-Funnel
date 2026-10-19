export type VideoSource =
  | { kind: 'empty' }
  | { kind: 'file'; src: string; poster?: string }
  | { kind: 'embed'; src: string; provider: 'youtube' | 'vimeo'; poster?: string }

export function isSafeAssetUrl(raw: string) {
  const value = raw.trim()
  if (!value) return false
  if (value.startsWith('/') && !value.startsWith('//') && !value.startsWith('/\\')) return true
  try {
    return new URL(value).protocol === 'https:'
  } catch {
    return false
  }
}

export function isDirectVideoFile(raw: string) {
  if (!isSafeAssetUrl(raw)) return false
  const path = raw.trim().split('?')[0].split('#')[0].toLowerCase()
  return path.endsWith('.mp4') || path.endsWith('.webm')
}

function youtubeEmbed(id: string) {
  return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0&modestbranding=1`
}

export function toVideoEmbed(raw: string) {
  const value = raw.trim()
  if (!value) return null
  let url: URL
  try {
    url = new URL(value)
  } catch {
    return null
  }
  if (url.protocol !== 'https:') return null
  const host = url.hostname.replace(/^www\./, '')
  const parts = url.pathname.split('/').filter(Boolean)

  if (host === 'youtu.be') {
    const id = parts[0]
    return id ? { provider: 'youtube' as const, src: youtubeEmbed(id) } : null
  }

  if (host === 'youtube.com' || host === 'youtube-nocookie.com' || host === 'm.youtube.com') {
    const fromQuery = url.searchParams.get('v')
    const fromPath =
      parts[0] === 'embed' || parts[0] === 'shorts' || parts[0] === 'live' ? parts[1] : null
    const id = fromQuery || fromPath
    return id ? { provider: 'youtube' as const, src: youtubeEmbed(id) } : null
  }

  if (host === 'vimeo.com' || host === 'player.vimeo.com') {
    const id = host === 'player.vimeo.com' && parts[0] === 'video' ? parts[1] : parts[0]
    if (!id || !/^\d+$/.test(id)) return null
    return {
      provider: 'vimeo' as const,
      src: `https://player.vimeo.com/video/${id}?autoplay=1`,
    }
  }

  return null
}

export function resolveVideo(input: { mp4: string; embedUrl: string; poster: string }): VideoSource {
  const poster = isSafeAssetUrl(input.poster) ? input.poster.trim() : undefined
  if (isDirectVideoFile(input.mp4)) {
    return { kind: 'file', src: input.mp4.trim(), poster }
  }
  const embed = toVideoEmbed(input.embedUrl)
  if (embed) return { kind: 'embed', ...embed, poster }
  return { kind: 'empty' }
}
