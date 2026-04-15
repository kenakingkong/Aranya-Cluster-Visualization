import { useEffect, useRef } from 'react'
import classNames from 'classnames'
import { usePodLogs } from '../hooks/usePodLogs'
import { useClusterContext } from './context'

type LogLevel = 'error' | 'warn' | 'info'

const LEVEL_CLASS: Record<LogLevel, string> = {
  error: 'text-red-800 bg-red-50',
  warn:  'text-yellow-800 bg-yellow-50',
  info:  '',
}

const Logs = ({
  namespace, pod, container }: {
    namespace: string; pod: string; container?: string
  }) => {

  const { lines, error, streaming } = usePodLogs({ namespace, pod, container })
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines])

  return (
    <div className="font-mono text-xs bg-gray-50 rounded-lg p-4 h-96 overflow-y-auto">
      {error && (
        <div className="text-red-800 mb-2">Error: {error}</div>
      )}

      {lines.map(({ id, text, level }) => (
        <div key={id} className={classNames('px-1 rounded leading-relaxed', LEVEL_CLASS[level])}>
          {text}
        </div>
      ))}

      {streaming && (
        <div className="text-gray-400 mt-1">● streaming...</div>
      )}

      <div ref={bottomRef} />
    </div>
  )
}


export const PodLogs = () => {
  const { selectedPod } = useClusterContext()

  if (!selectedPod) return null

  const podName = selectedPod.metadata.name
  const podNamespace = selectedPod.metadata.namespace
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Logs for Pod: {podName}</h2>
      <Logs namespace={podNamespace} pod={podName} />
    </div>
  )
}