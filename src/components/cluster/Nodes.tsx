import { HexGrid } from "../ui/HexGrid"
import { SectionHeader } from "../ui/SectionHeader"
import { useClusterContext } from "./context"
import { Node } from "./Node"

export const Nodes = () => {
  const { nodes } = useClusterContext()

  return (
    <section className="py-2 space-y-2">
      <SectionHeader>Nodes ({nodes.length})</SectionHeader>
      <HexGrid
        items={nodes}
        cols={5}
        renderHex={(node) => (
          <Node key={node.metadata.uid} node={node} />
        )} />
    </section>
  )
}