import React, { useCallback, useState, useEffect } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  applyNodeChanges,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import "./TabFlow.scss";

export default function TabFlow({ contents }) {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    const generatedNodes = contents.map((item, index) => ({
      id: item.id,
      position: { x: 100 + index * 150, y: 100 },
      data: {
        label: (
          <div>
            <strong>{item.title}</strong>
            <p>{item.description}</p>
            {item.url && (
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                {item.url}
              </a>
            )}
          </div>
        ),
      },
      type: "default",
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
        >
          <Background />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}
