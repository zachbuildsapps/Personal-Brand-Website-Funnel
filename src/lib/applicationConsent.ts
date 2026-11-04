export type ApplicationConsent = {
  privacyAcknowledgedAt: string
  marketingSmsConsent: boolean
  marketingSmsConsentAt: string | null
}

/** In-memory preview record. A future backend should store this with the application. Nothing here is transmitted. */
export function buildApplicationConsent(
  marketingSmsConsent: boolean,
  now = new Date().toISOString(),
): ApplicationConsent {
  return {
    privacyAcknowledgedAt: now,
    marketingSmsConsent,
    marketingSmsConsentAt: marketingSmsConsent ? now : null,
  }
}
