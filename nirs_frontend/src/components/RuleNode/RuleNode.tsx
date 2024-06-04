import clsx from "clsx";
import * as React from "react";
import { Handle, useStore, Position } from "reactflow";

import { useMetagraphContext } from "../../hocs/MetagraphContext";
import { colorGenerator } from "../../utils/colorGenerator";

import s from "./RuleNode.module.scss";

export type RuleNodeProps = {
  id: string;
};

const RuleNodeUnwrapped: React.FC<RuleNodeProps> = ({ id }) => {
  const { activeTag } = useMetagraphContext();
  const node = useStore((s) => s.nodeInternals.get(id));

  const label = node?.data.shortName ?? "";

  const isActive = node?.data.tags.includes(activeTag);

  return (
    <>
      <div
        className={clsx(s.node)}
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

export const RuleNode = React.memo(RuleNodeUnwrapped);
