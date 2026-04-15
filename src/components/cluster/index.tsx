import { ClusterProvider } from "./context"
import { Nodes } from "./Nodes"
import { PodLogs } from "./PodLogs"
import { PodLogsNoStream } from "./PodLogsNoStream"
import { Pods } from "./Pods"

export const Cluster = () => {
  return (
    <ClusterProvider>
      <Nodes />
      <Pods />
      <PodLogsNoStream />
      <PodLogs />
    </ClusterProvider>
  )
}