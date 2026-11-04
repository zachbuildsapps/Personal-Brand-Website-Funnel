import { describe, expect, it } from 'vitest'
import {
  CALENDLY_URL_PLACEHOLDER,
  TYPEFORM_URL_PLACEHOLDER,
  getTypeformId,
  isLiveHttpsUrl,
  parseCalendlyEvent,
  toCalendlyEmbedSrc,
} from './integrations.ts'

describe('integration urls', () => {
  it('rejects placeholders and non-https urls', () => {
    expect(isLiveHttpsUrl('', TYPEFORM_URL_PLACEHOLDER)).toBe(false)
    expect(isLiveHttpsUrl(TYPEFORM_URL_PLACEHOLDER, TYPEFORM_URL_PLACEHOLDER)).toBe(false)
    expect(isLiveHttpsUrl('http://form.typeform.com/to/abc', TYPEFORM_URL_PLACEHOLDER)).toBe(false)
    expect(isLiveHttpsUrl('https://form.typeform.com/to/abc123', TYPEFORM_URL_PLACEHOLDER)).toBe(true)
  })

  it('reads a Typeform id from hosted urls', () => {
    expect(getTypeformId('https://form.typeform.com/to/abc123')).toBe('abc123')
    expect(getTypeformId('https://zachflipswhips.typeform.com/to/xyz789?typeform-source=site')).toBe(
      'xyz789',
    )
    expect(getTypeformId('https://example.com/to/abc123')).toBeNull()
    expect(getTypeformId(TYPEFORM_URL_PLACEHOLDER)).toBeNull()
  })

  it('builds a Calendly embed only for calendly.com', () => {
    const src = toCalendlyEmbedSrc('https://calendly.com/zach/intro')
    expect(src).toContain('https://calendly.com/zach/intro')
    expect(src).toContain('background_color=151515')
    expect(src).toContain('primary_color=d4af37')
    expect(toCalendlyEmbedSrc('https://cal.example.com/zach')).toBeNull()
    expect(toCalendlyEmbedSrc(CALENDLY_URL_PLACEHOLDER)).toBeNull()
  })

  it('accepts a booking event only from Calendly', () => {
    expect(parseCalendlyEvent('https://calendly.com', { event: 'calendly.event_scheduled' })).toBe(
      'scheduled',
    )
    expect(parseCalendlyEvent('https://evil.example', { event: 'calendly.event_scheduled' })).toBeNull()
    expect(parseCalendlyEvent('https://calendly.com', { event: 'calendly.event_type_viewed' })).toBeNull()
    expect(parseCalendlyEvent('https://calendly.com', null)).toBeNull()
  })
})
