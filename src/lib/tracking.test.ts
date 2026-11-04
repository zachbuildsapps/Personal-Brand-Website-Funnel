import { describe, expect, it } from 'vitest'
import { ANALYTICS_EVENTS, canTrack, hasTrackingIds } from './tracking.ts'

describe('tracking gate', () => {
  const ids = {
    googleAnalyticsId: 'G-TEST123',
    metaPixelId: '',
    tiktokPixelId: '',
  }

  it('stays off until an id exists and consent is granted', () => {
    expect(hasTrackingIds({ googleAnalyticsId: '', metaPixelId: '', tiktokPixelId: '' })).toBe(false)
    expect(canTrack(ids, 'unknown')).toBe(false)
    expect(canTrack(ids, 'denied')).toBe(false)
    expect(canTrack(ids, 'granted')).toBe(true)
    expect(canTrack({ googleAnalyticsId: '  ', metaPixelId: '', tiktokPixelId: '' }, 'granted')).toBe(false)
  })

  it('names the events the funnel needs', () => {
    expect(ANALYTICS_EVENTS).toEqual([
      'page_view',
      'video_play',
      'application_opened',
      'application_started',
      'application_completed',
      'qualified_lead',
      'call_booked',
    ])
  })
})
