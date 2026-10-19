import { useEffect, useRef, useState } from 'react'
import { siteConfig } from '../config/siteConfig.ts'
import {
  capitalOptions,
  emptyAnswers,
  experienceOptions,
  interestOptions,
  investmentOptions,
  isQualifiedLead,
  isValidEmail,
  isValidPhone,
  timelineOptions,
  unqualifiedReason,
  type ApplicationAnswers,
} from '../lib/qualification.ts'
import { cn } from '../lib/cn.ts'
import { track } from '../lib/tracking.ts'
import { buttonBase, buttonMd, buttonPrimary, buttonSecondary } from './ApplyButton.tsx'
import { CalendlyEmbed } from './CalendlyEmbed.tsx'

type Choice = readonly { value: string; label: string }[]

type Question =
  | {
      id: keyof ApplicationAnswers
      kind: 'text' | 'email' | 'tel'
      label: string
      autoComplete: string
    }
  | { id: keyof ApplicationAnswers; kind: 'textarea'; label: string }
  | { id: keyof ApplicationAnswers; kind: 'choice'; label: string; options: Choice }

const questions: Question[] = [
  { id: 'fullName', kind: 'text', label: 'What is your full name?', autoComplete: 'name' },
  { id: 'email', kind: 'email', label: 'What is your email address?', autoComplete: 'email' },
  { id: 'phone', kind: 'tel', label: 'What is your phone number?', autoComplete: 'tel' },
  { id: 'location', kind: 'text', label: 'Where are you located?', autoComplete: 'address-level1' },
  { id: 'interest', kind: 'choice', label: 'What are you most interested in?', options: interestOptions },
  { id: 'experience', kind: 'choice', label: 'Have you flipped cars before?', options: experienceOptions },
  {
    id: 'capital',
    kind: 'choice',
    label: 'How much capital do you currently have available for your car-flipping business?',
    options: capitalOptions,
  },
  { id: 'timeline', kind: 'choice', label: 'How soon do you want to start?', options: timelineOptions },
  { id: 'challenge', kind: 'textarea', label: 'What is your biggest challenge right now?' },
  { id: 'why', kind: 'textarea', label: 'Why do you want to work with me?' },
  {
    id: 'investmentInterest',
    kind: 'choice',
    label: 'Are you interested in investing in mentorship if we determine it’s a good fit?',
    options: investmentOptions,
  },
]

function fieldError(question: Question, value: string) {
  const trimmed = value.trim()
  if (question.kind === 'email') return isValidEmail(trimmed) ? '' : 'Enter a valid email address.'
  if (question.kind === 'tel') return isValidPhone(trimmed) ? '' : 'Enter a phone number, including the area code.'
  if (question.kind === 'choice') return trimmed ? '' : 'Choose one to continue.'
  if (question.kind === 'textarea') return trimmed.length >= 8 ? '' : 'Add a short answer so the fit is clear.'
  if (question.id === 'fullName') return trimmed.length >= 2 ? '' : 'Enter your full name.'
  return trimmed.length >= 2 ? '' : 'Enter your location.'
}

export function ApplicationPreview({ source }: { source: string }) {
  const [answers, setAnswers] = useState<ApplicationAnswers>(emptyAnswers)
  const [index, setIndex] = useState(0)
  const [error, setError] = useState('')
  const [booked, setBooked] = useState(false)
  const started = useRef(false)
  const reported = useRef(false)
  const question = questions[index]
  const onResult = index >= questions.length
  const qualified = onResult && isQualifiedLead(answers)

  useEffect(() => {
    if (!onResult || reported.current) return
    reported.current = true
    track('application_completed', { source, mode: 'preview' })
    if (isQualifiedLead(answers)) track('qualified_lead', { source, mode: 'preview' })
  }, [answers, onResult, source])

  function update(value: string) {
    if (!question) return
    setAnswers((current) => ({ ...current, [question.id]: value }))
    setError('')
  }

  function goNext() {
    if (!question) return
    const message = fieldError(question, answers[question.id])
    if (message) {
      setError(message)
      return
    }
    if (!started.current) {
      started.current = true
      track('application_started', { source, mode: 'preview' })
    }
    setIndex((current) => current + 1)
    setError('')
  }

  if (onResult || !question) {
    return (
      <Result
        answers={answers}
        qualified={qualified}
        booked={booked}
        onBooked={() => {
          setBooked(true)
          track('call_booked', { source, mode: 'preview' })
        }}
        onBack={() => setIndex(questions.length - 1)}
      />
    )
  }

  const value = answers[question.id]
  const progress = ((index + 1) / questions.length) * 100

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="h-px bg-white/10">
        <div className="h-px bg-gold" style={{ width: `${progress}%` }} />
      </div>
      <div className="flex min-h-0 flex-1 flex-col px-5 py-6 sm:px-8">
        <p className="font-mono text-[11px] tracking-[0.16em] text-mute uppercase">
          {String(index + 1).padStart(2, '0')} / {String(questions.length).padStart(2, '0')}
        </p>
        <h2 className="mt-4 max-w-xl text-2xl font-medium tracking-[-0.03em] text-paper sm:text-3xl">
          {question.label}
        </h2>
        <div className="mt-6">
          {question.kind === 'choice' ? (
            <div role="radiogroup" aria-label={question.label} className="grid gap-2">
              {question.options.map((option, optionIndex) => {
                const selected = value === option.value
                return (
                  <button
                    key={option.value}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    data-autofocus={optionIndex === 0 ? '' : undefined}
                    className={cn(
                      'min-h-12 border px-4 text-left text-[15px] transition-colors',
                      selected
                        ? 'border-gold text-paper'
                        : 'border-white/12 text-mute hover:border-white/30 hover:text-paper',
                    )}
                    onClick={() => update(option.value)}
                  >
                    {option.label}
                  </button>
                )
              })}
            </div>
          ) : question.kind === 'textarea' ? (
            <textarea
              data-autofocus=""
              value={value}
              rows={5}
              className="w-full resize-y border border-white/15 bg-transparent px-3 py-3 text-base text-paper outline-none focus:border-gold"
              onChange={(event) => update(event.target.value)}
            />
          ) : (
            <input
              data-autofocus=""
              value={value}
              type={question.kind === 'email' ? 'email' : question.kind === 'tel' ? 'tel' : 'text'}
              inputMode={question.kind === 'email' ? 'email' : question.kind === 'tel' ? 'tel' : 'text'}
              autoComplete={question.autoComplete}
              className="w-full border-b border-white/20 bg-transparent py-3 text-lg text-paper outline-none focus:border-gold"
              onChange={(event) => update(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault()
                  goNext()
                }
              }}
            />
          )}
          {error ? (
            <p className="mt-3 text-sm text-gold" role="alert">
              {error}
            </p>
          ) : null}
        </div>
        <div className="flex items-center gap-3 pt-8">
          {index > 0 ? (
            <button
              type="button"
              className={`${buttonBase} ${buttonSecondary} ${buttonMd}`}
              onClick={() => {
                setIndex((current) => current - 1)
                setError('')
              }}
            >
              Back
            </button>
          ) : null}
          <button type="button" className={`${buttonBase} ${buttonPrimary} ${buttonMd}`} onClick={goNext}>
            {index === questions.length - 1 ? 'See next step' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  )
}

function Result({
  answers,
  qualified,
  booked,
  onBooked,
  onBack,
}: {
  answers: ApplicationAnswers
  qualified: boolean
  booked: boolean
  onBooked: () => void
  onBack: () => void
}) {
  const bookedOnce = useRef(false)

  if (booked) {
    return (
      <div className="px-5 py-8 sm:px-8" role="status">
        <p className="font-mono text-[11px] tracking-[0.16em] text-gold uppercase">Confirmed</p>
        <h2 className="mt-3 text-3xl font-medium tracking-[-0.04em] text-paper">You’re on the calendar.</h2>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-mute">
          Watch for a confirmation from the scheduler. Come ready to talk about your goals and the capital you have
          to work with. This call is a conversation about fit. It is not a guarantee of results.
        </p>
        <p className="mt-4 text-sm text-mute">Preview note: this confirmation appeared because a Calendly booking event was received. Nothing else was emailed by this website.</p>
      </div>
    )
  }

  if (!qualified) {
    const reason = unqualifiedReason(answers)
    const copy =
      reason === 'capital'
        ? 'Thanks for taking the time. With under $3,000 available for the business, a sales call is probably not the most useful next step. Cars, repairs, and fees move quickly, and mentorship is a better fit once you have capital you can actually work with. Start with the free breakdowns on Instagram and TikTok. When your capital is in a stronger place, you’re welcome to apply again.'
        : reason === 'timing'
          ? 'Thanks for applying. It sounds like you’re still researching, which is a sensible place to be. There’s no need to book a call yet. Use the videos on Instagram and TikTok to learn how deals are evaluated, then come back when you want to start soon.'
          : 'Thanks for the honest answer. If mentorship isn’t something you want to invest in right now, there’s no pressure to take a call. The free education on Instagram and TikTok will still be there when you want it.'

    return (
      <div className="px-5 py-8 sm:px-8" role="status">
        <p className="font-mono text-[11px] tracking-[0.16em] text-gold uppercase">A better next step</p>
        <h2 className="mt-3 text-3xl font-medium tracking-[-0.04em] text-paper">Start with the education.</h2>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-mute">{copy}</p>
        <div className="mt-6 flex gap-5 text-sm">
          <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer noopener" className="text-paper underline underline-offset-4">
            Instagram
          </a>
          <a href={siteConfig.social.tiktok} target="_blank" rel="noreferrer noopener" className="text-paper underline underline-offset-4">
            TikTok
          </a>
        </div>
        <button type="button" className={`${buttonBase} ${buttonSecondary} ${buttonMd} mt-8`} onClick={onBack}>
          Edit answers
        </button>
      </div>
    )
  }

  return (
    <div className="px-5 py-8 sm:px-8">
      <p className="font-mono text-[11px] tracking-[0.16em] text-gold uppercase">Good fit for a call</p>
      <h2 className="mt-3 text-3xl font-medium tracking-[-0.04em] text-paper">Let’s talk.</h2>
      <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-mute">
        Your answers look like a fit for a conversation. The next step is to pick a time. We’ll talk about your goals
        and whether mentorship or auction education makes sense. A call is not acceptance into a program, and it isn’t
        a promise that you’ll make money.
      </p>
      <div className="mt-6">
        {toLiveCalendly(siteConfig.calendlyUrl) ? (
          <CalendlyEmbed
            url={siteConfig.calendlyUrl}
            onBooked={() => {
              if (bookedOnce.current) return
              bookedOnce.current = true
              onBooked()
            }}
          />
        ) : (
          <div className="border border-white/12 bg-ink px-5 py-8">
            <p className="text-lg font-medium text-paper">Your scheduler will appear here.</p>
            <p className="mt-2 text-sm leading-relaxed text-mute">
              Calendly isn’t connected yet, so no appointment times are shown. After you add your link, open times
              appear only on this step — after someone qualifies. They are not listed on the rest of the site.
            </p>
          </div>
        )}
      </div>
      <button type="button" className={`${buttonBase} ${buttonSecondary} ${buttonMd} mt-6`} onClick={onBack}>
        Edit answers
      </button>
    </div>
  )
}

function toLiveCalendly(url: string) {
  return url.trim().startsWith('https://calendly.com/') || url.trim().startsWith('https://www.calendly.com/')
}
