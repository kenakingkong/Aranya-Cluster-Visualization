import { useState, useEffect, useRef } from 'react'

type LogLevel = 'error' | 'warn' | 'info'

interface LogLine {
  id: string
  text: string
  level: LogLevel
}

interface UsePodLogsParams {
  namespace: string | null
  pod: string | null
  container?: string | null
  follow?: boolean
}

interface UsePodLogsResult {
  lines: LogLine[]
  error: string | null
  streaming: boolean
}

function parseLines(raw: string, offsetId: number): LogLine[] {
  return raw
    .split('\n')
    .filter(l => l.trim())
    .map((text, i) => ({
      id: `${offsetId}-${i}`,
      text,
      level: getLevel(text),
    }))
}

export function usePodLogs({ namespace, pod, container, follow = true }: UsePodLogsParams): UsePodLogsResult {
  const [lines, setLines] = useState<LogLine[]>([])
  const [error, setError] = useState<string | null>(null)
  const [streaming, setStreaming] = useState(false)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    if (!namespace || !pod) return

    const base = `/api/v1/namespaces/${namespace}/pods/${pod}/log`
    const commonParams = { timestamps: 'true', ...(container && { container }) }

    abortRef.current = new AbortController()
    const signal = abortRef.current.signal

    setLines([])
    setError(null)
    setStreaming(true)

    async function run() {
      try {
        // 1. Fetch historical logs (no follow — avoids proxy buffering)
        const historyParams = new URLSearchParams({ ...commonParams, tailLines: '100' })
        const histRes = await fetch(`${base}?${historyParams}`, { signal })
        if (!histRes.ok) throw new Error(`${histRes.status} ${histRes.statusText}`)
        const histText = await histRes.text()
        setLines(parseLines(histText, Date.now()))

        if (!follow || signal.aborted) return

        // 2. Stream new logs from this point forward
        const streamParams = new URLSearchParams({ ...commonParams, follow: 'true', sinceSeconds: '1' })
        const streamRes = await fetch(`${base}?${streamParams}`, { signal })
        if (!streamRes.ok) throw new Error(`${streamRes.status} ${streamRes.statusText}`)

        const reader = streamRes.body!.getReader()
        const decoder = new TextDecoder()
        let buf = ''

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          buf += decoder.decode(value, { stream: true })
          const parts = buf.split('\n')
          buf = parts.pop()!

          setLines(prev => [...prev, ...parseLines(parts.join('\n'), Date.now())])
        }
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') setError(err.message)
      } finally {
        setStreaming(false)
      }
    }

    run()
    return () => abortRef.current?.abort()
  }, [namespace, pod, container, follow])

  return { lines, error, streaming }
}

function getLevel(text: string): LogLevel {
  if (/error|err|fatal/i.test(text)) return 'error'
  if (/warn/i.test(text))            return 'warn'
  return 'info'
}
