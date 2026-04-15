import { useEffect, useState } from "react"
import classNames from "classnames"
import axios from "axios"
import { useClusterContext } from "./context"

type LogLevel = 'error' | 'warn' | 'info'

const LEVEL_CLASS: Record<LogLevel, string> = {
  error: 'text-red-800 bg-red-50',
  warn:  'text-yellow-800 bg-yellow-50',
  info:  '',
}

function getLevel(text: string): LogLevel {
  if (/error|err|fatal/i.test(text)) return 'error'
  if (/warn/i.test(text))            return 'warn'
  return 'info'
}

export const PodLogsNoStream = () => {
  const { selectedPod } = useClusterContext()
  const [lines, setLines] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!selectedPod) return

    const podName = selectedPod.metadata.name
    const podNamespace = selectedPod.metadata.namespace

    setLines([])
    setError(null)
    setLoading(true)

    axios.get(`/api/v1/namespaces/${podNamespace}/pods/${podName}/log`, {
      params: { timestamps: true, tailLines: 100 }
    })
      .then(res => setLines(res.data.split('\n').filter((l: string) => l.trim())))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [selectedPod])

  if (!selectedPod) return null

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Logs for Pod: {selectedPod.metadata.name}</h2>
      <div className="font-mono text-xs bg-gray-50 rounded-lg p-4 h-96 overflow-y-auto">
        {error && <div className="text-red-800 mb-2">Error: {error}</div>}
        {loading && <div className="text-gray-400">Loading...</div>}
        {lines.map((text, i) => (
          <div key={i} className={classNames('px-1 rounded leading-relaxed', LEVEL_CLASS[getLevel(text)])}>
            {text}
          </div>
        ))}
      </div>
    </div>
  )
}
