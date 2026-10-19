import { describe, expect, it } from 'vitest'
import { isQualifiedLead, isValidEmail, isValidPhone, unqualifiedReason } from './qualification.ts'

const base = {
  capital: '5000-9999',
  timeline: 'within-30',
  investmentInterest: 'yes',
}

describe('qualification', () => {
  it('accepts applicants with capital, timing, and willingness', () => {
    expect(isQualifiedLead(base)).toBe(true)
    expect(isQualifiedLead({ ...base, capital: '3000-4999', timeline: 'within-90', investmentInterest: 'possibly' })).toBe(
      true,
    )
    expect(isQualifiedLead({ ...base, capital: '10000-plus', timeline: 'immediately' })).toBe(true)
  })

  it('routes people under $3,000, researchers, and uninterested applicants away from booking', () => {
    expect(isQualifiedLead({ ...base, capital: 'under-1000' })).toBe(false)
    expect(isQualifiedLead({ ...base, capital: '1000-2999' })).toBe(false)
    expect(isQualifiedLead({ ...base, timeline: 'researching' })).toBe(false)
    expect(isQualifiedLead({ ...base, investmentInterest: 'not-currently' })).toBe(false)
    expect(unqualifiedReason({ ...base, capital: '1000-2999', timeline: 'researching' })).toBe('capital')
    expect(unqualifiedReason({ ...base, timeline: 'researching' })).toBe('timing')
    expect(unqualifiedReason({ ...base, investmentInterest: 'not-currently' })).toBe('interest')
  })

  it('checks contact fields without being theatrical about it', () => {
    expect(isValidEmail('zach@example.com')).toBe(true)
    expect(isValidEmail('zach@example')).toBe(false)
    expect(isValidPhone('(415) 555-0134')).toBe(true)
    expect(isValidPhone('123')).toBe(false)
  })
})
