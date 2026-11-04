import { Component, type ErrorInfo, type ReactNode } from 'react'

type Props = { children: ReactNode }
type State = { hasError: boolean }

export class AppErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-svh flex-col justify-center bg-ink px-6 text-paper">
          <p className="font-mono text-[11px] tracking-[0.22em] text-gold uppercase">ZachFlipsWhips</p>
          <h1 className="mt-4 max-w-lg text-4xl font-medium tracking-[-0.04em]">Something went wrong.</h1>
          <p className="mt-4 max-w-md text-mute">
            Refresh the page and try again. If it keeps happening, reach Zach on Instagram or TikTok.
          </p>
          <button
            type="button"
            className="mt-8 inline-flex min-h-12 items-center justify-center bg-paper px-5 text-[15px] font-medium text-ink"
            onClick={() => window.location.reload()}
          >
            Refresh
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
