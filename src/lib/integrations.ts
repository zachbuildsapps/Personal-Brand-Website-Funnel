export const TYPEFORM_URL_PLACEHOLDER = 'YOUR_TYPEFORM_URL_HERE'
export const CALENDLY_URL_PLACEHOLDER = 'YOUR_CALENDLY_URL_HERE'

export function isLiveHttpsUrl(url: string, placeholder: string) {
  const value = url.trim()
  if (!value || value === placeholder) return false
  try {
    return new URL(value).protocol === 'https:'
  } catch {
    return false
  }
}

export function getTypeformId(url: string) {
  if (!isLiveHttpsUrl(url, TYPEFORM_URL_PLACEHOLDER)) return null
  try {
    const parsed = new URL(url.trim())
    const host = parsed.hostname.replace(/^www\./, '')
    if (host !== 'typeform.com' && !host.endsWith('.typeform.com')) return null
    const parts = parsed.pathname.split('/').filter(Boolean)
    const toIndex = parts.indexOf('to')
    const id = toIndex >= 0 ? parts[toIndex + 1] : null
    return id || null
  } catch {
    return null
  }
}

export function toCalendlyEmbedSrc(url: string) {
  if (!isLiveHttpsUrl(url, CALENDLY_URL_PLACEHOLDER)) return null
  try {
    const parsed = new URL(url.trim())
    const host = parsed.hostname.replace(/^www\./, '')
    if (host !== 'calendly.com') return null
    parsed.searchParams.set('hide_event_type_details', '1')
    parsed.searchParams.set('hide_landing_page_details', '1')
    parsed.searchParams.set('background_color', '151515')
    parsed.searchParams.set('text_color', 'f7f7f5')
    parsed.searchParams.set('primary_color', 'd4af37')
    return parsed.toString()
  } catch {
    return null
  }
}

export function parseCalendlyEvent(origin: string, data: unknown) {
  if (origin !== 'https://calendly.com') return null
  if (!data || typeof data !== 'object') return null
  const event = (data as { event?: unknown }).event
  return event === 'calendly.event_scheduled' ? 'scheduled' : null
}
