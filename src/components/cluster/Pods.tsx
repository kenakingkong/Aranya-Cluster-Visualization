import { useClusterContext } from "./context"
import { Pod } from "./Pod"
import { HexGrid } from "../ui/HexGrid"
import { SectionHeader } from "../ui/SectionHeader"

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
    <section className="py-2 space-y-2">
      <SectionHeader>Pods ({pods.length})</SectionHeader>
      <HexGrid
        items={pods}
        cols={5}
        renderHex={(pod) => (
          <Pod key={pod.metadata.uid} pod={pod} />
        )} />
    </section>
  )
}