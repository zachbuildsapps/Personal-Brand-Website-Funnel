export const QUALIFIED_CAPITAL = ['3000-4999', '5000-9999', '10000-plus'] as const
export const QUALIFIED_TIMELINE = ['immediately', 'within-30', 'within-90'] as const
export const QUALIFIED_INVESTMENT = ['yes', 'possibly'] as const

export const interestOptions = [
  { value: 'flip', label: 'Learning to flip cars.' },
  { value: 'mentorship', label: 'One-on-one mentorship.' },
  { value: 'auctions', label: 'Dealer-only auction information.' },
  { value: 'dealership', label: 'Starting a dealership.' },
  { value: 'unsure', label: 'Not sure yet.' },
] as const

export const experienceOptions = [
  { value: 'never', label: 'Never.' },
  { value: '1-3', label: '1–3 cars.' },
  { value: '4-10', label: '4–10 cars.' },
  { value: '10-plus', label: 'More than 10 cars.' },
] as const

export const capitalOptions = [
  { value: 'under-1000', label: 'Under $1,000.' },
  { value: '1000-2999', label: '$1,000–$2,999.' },
  { value: '3000-4999', label: '$3,000–$4,999.' },
  { value: '5000-9999', label: '$5,000–$9,999.' },
  { value: '10000-plus', label: '$10,000+.' },
] as const

export const timelineOptions = [
  { value: 'immediately', label: 'Immediately.' },
  { value: 'within-30', label: 'Within 30 days.' },
  { value: 'within-90', label: 'Within 90 days.' },
  { value: 'researching', label: 'Just researching.' },
] as const

export const investmentOptions = [
  { value: 'yes', label: 'Yes.' },
  { value: 'possibly', label: 'Possibly.' },
  { value: 'not-currently', label: 'Not currently.' },
] as const

export type ApplicationAnswers = {
  fullName: string
  email: string
  phone: string
  location: string
  interest: string
  experience: string
  capital: string
  timeline: string
  challenge: string
  why: string
  investmentInterest: string
}

export const emptyAnswers: ApplicationAnswers = {
  fullName: '',
  email: '',
  phone: '',
  location: '',
  interest: '',
  experience: '',
  capital: '',
  timeline: '',
  challenge: '',
  why: '',
  investmentInterest: '',
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

export function isValidPhone(value: string) {
  const digits = value.replace(/\D/g, '')
  return digits.length >= 7 && digits.length <= 15
}

export function isQualifiedLead(answers: Pick<ApplicationAnswers, 'capital' | 'timeline' | 'investmentInterest'>) {
  return (
    (QUALIFIED_CAPITAL as readonly string[]).includes(answers.capital) &&
    (QUALIFIED_TIMELINE as readonly string[]).includes(answers.timeline) &&
    (QUALIFIED_INVESTMENT as readonly string[]).includes(answers.investmentInterest)
  )
}

export type UnqualifiedReason = 'capital' | 'timing' | 'interest'

export function unqualifiedReason(
  answers: Pick<ApplicationAnswers, 'capital' | 'timeline' | 'investmentInterest'>,
): UnqualifiedReason {
  if (!(QUALIFIED_CAPITAL as readonly string[]).includes(answers.capital)) return 'capital'
  if (!(QUALIFIED_TIMELINE as readonly string[]).includes(answers.timeline)) return 'timing'
  return 'interest'
}
