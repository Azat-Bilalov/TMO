import clsx from "clsx";
import * as React from "react";
import { Handle, useStore, Position, NodeToolbar } from "reactflow";

import { useMetagraphContext } from "../../hocs/MetagraphContext";
import { colorGenerator } from "../../utils/colorGenerator";

import s from "./ParameterNode.module.scss";

export type ParameterNodeProps = {
  id: string;
};

const ParameterNodeUnwrapped: React.FC<ParameterNodeProps> = ({ id }) => {
  const node = useStore((s) => s.nodeInternals.get(id));

  const label = React.useMemo(() => {
    if (!node) {
      return "";
    }

    const { shortName, defaultValue } = node.data;

    if (shortName && defaultValue) {
      return `${shortName} = ${defaultValue}`;
    }

    return shortName;
  }, [node]);

  const isSelected = node?.selected;

  const isToolbarVisible = isSelected && !node?.data.defaultValue;

  const { onFindNode, activeTag } = useMetagraphContext();

  const isActive = node?.data.tags.includes(activeTag);

  const handleFindNode = React.useCallback(
    () => onFindNode(id),
    [id, onFindNode]
  );

  return (
    <>
      <NodeToolbar isVisible={isToolbarVisible}>
        <button onClick={handleFindNode}>Найти 🚀</button>
      </NodeToolbar>
      <div
        className={clsx(s.node, isSelected && s.node_selected)}
        style={{
          backgroundColor: isActive ? colorGenerator(activeTag) : "transparent",
          color: isActive ? "white" : "black",
        }}
      >
        <div className={s.node__label}>{label}</div>
      </div>
      <Handle type="source" position={Position.Bottom} />
      <Handle type="target" position={Position.Top} />
    </>
  );
};

export const ParameterNode = React.memo(ParameterNodeUnwrapped);
