import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"

interface IClusterContext {
  // Nodes
  nodes: any[]
  selectedNode: any
  selectNode: (uuid: string) => void

  // Pods
  pods: any[]
  selectedPod: any
  selectPod: (uid: string) => void
}

export const ClusterContext = createContext<IClusterContext>({
  nodes: [],
  selectedNode: null,
  selectNode: () => { },
  pods: [],
  selectedPod: null,
  selectPod: () => { }
})

export const useClusterContext = () => {
  return useContext(ClusterContext)
}

export const ClusterProvider = ({ children }: any) => {
  const [nodes, setNodes] = useState([])
  const [selectedNode, setSelectedNode] = useState<any>(null)
  const [pods, setPods] = useState([])
  const [selectedPod, setSelectedPod] = useState<any>(null)

  function selectNode(uuid: string) {
    if (selectedNode && selectedNode.metadata.uid === uuid) {
      setSelectedNode(null)
      setSelectedPod(null)
      return;
    }

    const node = nodes.find((p: any) => p.metadata.uid === uuid)
    if (!node) {
      console.error("Node not found: ", uuid)
      return;
    }

    setSelectedNode(node)
  }

  function selectPod(uid: string) {
    if (selectedPod && selectedPod.metadata.uuid === uid) {
      setSelectedPod(null)
      return;
    }
    const pod = pods.find((p: any) => p.metadata.uid === uid)
    if (!pod) {
      console.error("Pod not found: ", uid)
      return;
    }

    setSelectedPod(pod)
  }

  useEffect(() => {
    async function fetchNodeData() {
      try {
        const endpoint = '/api/v1/nodes'
        const response = await axios.get(endpoint)
        setNodes(response.data.items)
      } catch (error) {
        console.error('Error fetching node data:', error)
      }
    }

    fetchNodeData()
  }, [])

  useEffect(() => {
    async function fetchPodsData() {
      if (!selectedNode) {
        console.error("No node selected")
        return;
      }

      try {
        const endpoint = `/api/v1/pods/?fieldSelector=spec.nodeName%3D${selectedNode.metadata.name}`
        const response = await axios.get(endpoint)
        setPods(response.data.items)
      } catch (error) {
        console.error('Error fetching pod data:', error)
      }
    }

    if (selectedNode) {
      fetchPodsData()
    }
  }, [selectedNode])

  return (
    <ClusterContext.Provider value={{
      nodes,
      selectedNode,
      selectNode,
      pods,
      selectedPod,
      selectPod
    }}>
      {children}
    </ClusterContext.Provider>
  )
}