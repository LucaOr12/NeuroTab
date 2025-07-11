import { Handle, Position } from "@xyflow/react";
import "./CustomNode.scss";

export default function CustomNode({ data }) {
  return (
    <div className="custom-node">
      <strong>{data.title}</strong>
      <p>{data.description}</p>
      {data.url && (
        <a href={data.url} target="_blank" rel="noopener noreferrer">
          {data.url}
        </a>
      )}

      {/* Source handles */}
      <Handle type="source" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      <Handle type="source" position={Position.Left} />
      <Handle type="source" position={Position.Right} />

      {/* Target handles */}
      <Handle type="target" position={Position.Top} />
      <Handle type="target" position={Position.Bottom} />
      <Handle type="target" position={Position.Left} />
      <Handle type="target" position={Position.Right} />
    </div>
  );
}
