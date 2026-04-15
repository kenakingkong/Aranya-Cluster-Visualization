import classNames from "classnames"
import { useClusterContext } from "./context"
import { HexBox } from "../ui/HexBox"

export const Node = ({ node }: { node: any }) => {
  const { selectedNode, selectNode } = useClusterContext()

  return (
    <button
      onClick={() => selectNode(node.metadata.uid)}
      className={classNames(selectedNode && selectedNode.metadata.uid === node.metadata.uid ? "text-red-100" : "")}>
      <HexBox className={classNames("hex-node", selectedNode && selectedNode.metadata.uid === node.metadata.uid ? "text-black" : "text-gray-800")}>
        <div>
          <p className="text-xs">{node.metadata.name}</p>
        </div>
      </HexBox>
    </button>)
}