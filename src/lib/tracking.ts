import { siteConfig } from '../config/siteConfig.ts'

export const ANALYTICS_EVENTS = [
  'page_view',
  'video_play',
  'application_opened',
  'application_started',
  'application_completed',
  'qualified_lead',
  'call_booked',
] as const

export type AnalyticsEvent = (typeof ANALYTICS_EVENTS)[number]

export type TrackingIds = {
  googleAnalyticsId: string
  metaPixelId: string
  tiktokPixelId: string
}

export type Consent = 'unknown' | 'granted' | 'denied'

export const CONSENT_KEY = 'zfw-tracking-consent'

export function hasTrackingIds(ids: TrackingIds) {
  return [ids.googleAnalyticsId, ids.metaPixelId, ids.tiktokPixelId].some((id) => id.trim().length > 0)
}

export function canTrack(ids: TrackingIds, consent: Consent) {
  return consent === 'granted' && hasTrackingIds(ids)
}

export function readConsent(): Consent {
  if (typeof window === 'undefined') return 'denied'
  try {
    const value = window.localStorage.getItem(CONSENT_KEY)
    if (value === 'granted' || value === 'denied') return value
    return 'unknown'
  } catch {
    return 'denied'
  }
}

export function writeConsent(value: Exclude<Consent, 'unknown'>) {
  window.localStorage.setItem(CONSENT_KEY, value)
}

type Gtag = (...args: unknown[]) => void

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: Gtag
    fbq?: (...args: unknown[]) => void
    _fbq?: unknown
    ttq?: {
      track: (event: string, params?: Record<string, string>) => void
      page: () => void
      load: (id: string) => void
      instance: (id: string) => void
    }
    TiktokAnalyticsObject?: string
  }
}

let initialized = false

function loadScript(src: string) {
  const script = document.createElement('script')
  script.async = true
  script.src = src
  document.head.appendChild(script)
}

function loadGoogleAnalytics(id: string) {
  loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`)
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args)
  }
  window.gtag('js', new Date())
  window.gtag('config', id, { send_page_view: false })
}

function injectInline(source: string) {
  const script = document.createElement('script')
  script.text = source
  document.head.appendChild(script)
}

function loadMetaPixel(id: string) {
  injectInline(`
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
    document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', ${JSON.stringify(id)});
  `)
}

function loadTikTokPixel(id: string) {
  injectInline(`
    !function (w, d, t) {
      w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
      ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"];
      ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
      for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
      ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};
      ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js";
      ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=r;ttq._t=ttq._t||{};ttq._t[e]=+new Date;ttq._o=ttq._o||{};ttq._o[e]=n||{};
      n=document.createElement("script");n.type="text/javascript";n.async=!0;n.src=r+"?sdkid="+e+"&lib="+t;
      e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
      ttq.load(${JSON.stringify(id)});
    }(window, document, 'ttq');
  `)
}

export function initTracking(ids: TrackingIds = siteConfig.tracking) {
  if (initialized || typeof window === 'undefined') return
  if (!canTrack(ids, readConsent())) return
  initialized = true
  const googleId = ids.googleAnalyticsId.trim()
  const metaId = ids.metaPixelId.trim()
  const tiktokId = ids.tiktokPixelId.trim()
  if (googleId) loadGoogleAnalytics(googleId)
  if (metaId) loadMetaPixel(metaId)
  if (tiktokId) loadTikTokPixel(tiktokId)
}

export function trackingReady() {
  return initialized
}

export function track(event: AnalyticsEvent, params: Record<string, string> = {}) {
  if (!initialized || typeof window === 'undefined') return
  window.gtag?.('event', event, params)
  if (event === 'page_view') {
    window.fbq?.('track', 'PageView')
    window.ttq?.page()
    return
  }
  window.fbq?.('trackCustom', event, params)
  window.ttq?.track(event, params)
}
