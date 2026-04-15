import { useClusterContext } from "./context"
import { Pod } from "./Pod"
import { HexGrid } from "../ui/HexGrid"

export const Pods = () => {
  const { selectedNode, pods } = useClusterContext()

  if (!selectedNode) {
    return null
  }

  if (pods.length === 0) {
    return (
      <div>
        <h2>Pods (0)</h2>
        <p>No pods found for the selected node.</p>
      </div>
    )
  }

  return (
    <div>
      <h2>Pods ({pods.length})</h2>
      <HexGrid
        items={pods}
        cols={5}
        renderHex={(pod) => (
          <Pod key={pod.metadata.uid} pod={pod} />
        )} />
    </div>
  )
}