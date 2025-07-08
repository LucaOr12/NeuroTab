import React, { useCallback, useState, useEffect } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  applyNodeChanges,
} from "@xyflow/react";
import CustomNode from "./CustomNode";
import "@xyflow/react/dist/style.css";

export default function TabFlow({ contents }) {
  const [nodes, setNodes] = useState([]);

  const nodeTypes = {
    custom: CustomNode,
  };

  useEffect(() => {
    const generatedNodes = contents.map((item, index) => ({
      id: item.id,
      position: { x: 100 + index * 200, y: 100 },
      data: {
        ...item,
      },
      type: "custom",
    }));
    setNodes(generatedNodes);
  }, [contents]);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  return (
    <div
      style={{
        height: "1050px",
        borderRadius: "24px",
        border: "1px solid var(--color-muted)",
        overflow: "hidden",
      }}
    >
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={[]}
          onNodesChange={onNodesChange}
          fitView
          nodeTypes={nodeTypes}
        >
          <Background />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}
