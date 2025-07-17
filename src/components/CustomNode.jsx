import { Handle, Position, useReactFlow } from "@xyflow/react";
import UpdateContentDialog from "./UpdateContentDialog";
import "./CustomNode.scss";

export default function CustomNode({ id, data }) {
  const { setNodes } = useReactFlow();

  const handleUpdate = (updatedContent) => {
    if (!updatedContent) return;

    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === id
          ? {
              ...node,
              data: {
                ...node.data,
                ...updatedContent,
              },
            }
          : node
      )
    );
  };

  return (
    <div className="custom-node">
      <strong>{data.title}</strong>
      <p>{data.description}</p>
      {data.url && (
        <a href={data.url} target="_blank" rel="noopener noreferrer">
          {data.url}
        </a>
      )}
      <div className="update-button">
        <UpdateContentDialog content={data} onUpdate={handleUpdate} />
      </div>

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
