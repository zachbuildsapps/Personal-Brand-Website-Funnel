import { describe, expect, it } from 'vitest'
import { buildApplicationConsent } from './applicationConsent.ts'

describe('buildApplicationConsent', () => {
  it('records a privacy timestamp without marketing consent when the box is unchecked', () => {
    const record = buildApplicationConsent(false, '2026-11-03T20:00:00.000Z')
    expect(record).toEqual({
      privacyAcknowledgedAt: '2026-11-03T20:00:00.000Z',
      marketingSmsConsent: false,
      marketingSmsConsentAt: null,
    })
  })

  it('records the same timestamp when optional marketing consent is checked', () => {
    const record = buildApplicationConsent(true, '2026-11-03T20:00:00.000Z')
    expect(record.marketingSmsConsent).toBe(true)
    expect(record.marketingSmsConsentAt).toBe(record.privacyAcknowledgedAt)
  })
})
