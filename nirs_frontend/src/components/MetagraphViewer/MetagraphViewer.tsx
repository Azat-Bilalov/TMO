import * as React from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Node,
  Edge,
  MiniMap,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";

import "reactflow/dist/style.css";

import { RuleNode } from "../RuleNode";
import { ParameterNode } from "../ParameterNode";

import { getLayoutedElements } from "./utils";
import s from "./MetagraphViewer.module.scss";

const nodeTypes = {
  rule: RuleNode,
  parameter: ParameterNode,
};

export type MetagraphViewerProps = {
  nodes: Node[];
  edges: Edge[];
  direction?: "TB" | "LR";
};

export const MetagraphViewer: React.FC<MetagraphViewerProps> = ({
  nodes: graphNodes,
  edges: graphEdges,
  direction,
}) => {
  const layoutedElements = getLayoutedElements(
    graphNodes,
    graphEdges,
    direction
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(
    layoutedElements.nodes
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    layoutedElements.edges
  );

  const handleConnect = React.useCallback(
    (params: Connection) => setEdges((eds: Edge[]) => addEdge(params, eds)),
    [setEdges]
  );

  // const handleSelectionChange = React.useCallback(
  //   ({ nodes }: OnSelectionChangeParams) => {
  //     if (!nodes.length) {
  //       return;
  //     }
  //     setSelectionNodes(nodes);
  //   },
  //   [setSelectionNodes]
  // );

  React.useEffect(() => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      graphNodes,
      graphEdges,
      direction
    );

    setNodes([...layoutedNodes]);
    setEdges([...layoutedEdges]);
  }, [direction, graphEdges, graphNodes, setEdges, setNodes]);

  return (
    <div className={s.container}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={handleConnect}
        // onSelectionChange={handleSelectionChange}
        connectionLineStyle={{ stroke: "#ddd", strokeWidth: 1 }}
        nodeTypes={nodeTypes}
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};
