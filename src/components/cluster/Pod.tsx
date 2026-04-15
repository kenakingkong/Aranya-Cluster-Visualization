import classNames from "classnames"
import { HexBox } from "../ui/HexBox"
import { useClusterContext } from "./context"

export const Pod = ({ pod }: { pod: any }) => {
  const { selectedPod, selectPod } = useClusterContext()

  const podName = pod.metadata.labels?.app || pod.metadata.name
  const podNamespace = pod.metadata.namespace
  const podHash = pod.metadata.labels?.["pod-template-hash"]
  const podStatus = pod.status.phase
  const isRunning = podStatus === "Running"

  return (
    <button
      onClick={() => selectPod(pod.metadata.uid)}
      className={classNames(selectedPod && selectedPod.metadata.uid === pod.metadata.uid ? "text-red-100" : "")}>
      <HexBox className={classNames(isRunning ? "hex-pod-running" : "hex-pod-not-running")}>
        <div>
          <p className="text-base font-bold">{podName}</p>
          <p className="text-xs">{podNamespace} - {podHash}</p>
          <p className="text-xs">{isRunning ? '🟢' : '🔴'} {podStatus}</p>
        </div>
      </HexBox>
    </button>
  )
}