import classNames from "classnames"
import { useClusterContext } from "./context"
import { HexBox } from "../ui/HexBox"

export const Node = ({ node }: { node: any }) => {
  const { selectedNode, selectNode } = useClusterContext()

  return (
    <button onClick={() => selectNode(node.metadata.uid)} >
      <HexBox className={classNames("hex-node", selectedNode && selectedNode.metadata.uid === node.metadata.uid ? "hex-node-selected" : "")}>
        <div>
          <HexBox.Title>{node.metadata.name}</HexBox.Title>
        </div>
      </HexBox>
    </button>)
}