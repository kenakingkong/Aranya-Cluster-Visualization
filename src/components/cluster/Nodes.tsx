import { HexGrid } from "../ui/HexGrid"
import { useClusterContext } from "./context"
import { Node } from "./Node"

export const Nodes = () => {
  const { nodes } = useClusterContext()

  return (
    <div>
      <h2>Nodes</h2>
      <HexGrid
        items={nodes}
        cols={5}
        renderHex={(node) => (
          <Node key={node.metadata.uid} node={node} />
        )} />
    </div>
  )
}