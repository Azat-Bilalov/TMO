import { Node, Edge } from "reactflow";

import { KnowledgeBase } from "../types/KnowledgeBase";

const DEFAULT_POSITION = { x: 0, y: 0 };

export const toFlowchart = (
  metagraph: KnowledgeBase
): { nodes: Node[]; edges: Edge[] } => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  metagraph.rules.forEach((rule) => {
    nodes.push({
      id: rule.id,
      type: "rule",
      style: { borderRadius: "50%" },
      data: rule,
      position: DEFAULT_POSITION,
    });

    rule.inputParameters.forEach((inputParam) => {
      edges.push({
        id: `${rule.id}-${inputParam.parameterID}`,
        source: inputParam.parameterID,
        target: rule.id,
        animated: true,
      });
    });

    rule.outputParameters.forEach((outputParam) => {
      edges.push({
        id: `${rule.id}-${outputParam.parameterID}`,
        source: rule.id,
        target: outputParam.parameterID,
        animated: true,
      });
    });
  });

  metagraph.parameters.forEach((param) => {
    nodes.push({
      id: param.id,
      type: "parameter",
      style: { borderRadius: 0 },
      data: param,
      position: DEFAULT_POSITION,
    });
  });

  return { nodes, edges };
};
