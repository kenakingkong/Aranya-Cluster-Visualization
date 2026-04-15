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
    <button onClick={() => selectPod(pod.metadata.uid)}  >
      <HexBox className={classNames(isRunning ? "hex-pod-running" : "hex-pod-not-running")}>
        <div>
          <HexBox.Title>{podName}</HexBox.Title>
          <HexBox.Subtitle>{podNamespace} - {podHash}</HexBox.Subtitle>
          <HexBox.Subtitle>{isRunning ? '🟢' : '🔴'} {podStatus}</HexBox.Subtitle>
        </div>
      </HexBox>
    </button>
  )
}