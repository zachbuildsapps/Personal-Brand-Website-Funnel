import { Widget } from '@typeform/embed-react'
import '@typeform/embed/build/css/widget.css'

export function TypeformEmbed({
  formId,
  onReady,
  onStarted,
  onSubmit,
}: {
  formId: string
  onReady: () => void
  onStarted: () => void
  onSubmit: () => void
}) {
  return (
    <Widget
      id={formId}
      className="h-full min-h-[480px] w-full"
      style={{ width: '100%', height: '100%' }}
      inlineOnMobile
      autoResize={false}
      onReady={onReady}
      onStarted={onStarted}
      onSubmit={onSubmit}
    />
  )
}
