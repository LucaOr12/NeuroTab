import React, { useCallback, useState, useEffect } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  applyNodeChanges,
  addEdge,
} from "@xyflow/react";
import CustomNode from "./CustomNode";
import SimpleFloatingEdge from "./SimpleFloatingEdge";
import "@xyflow/react/dist/style.css";

export default function TabFlow({ contents }) {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const nodeTypes = {
    custom: CustomNode,
  };
  const edgeTypes = {
    floating: SimpleFloatingEdge,
  };

  const onConnect = useCallback((params) => {
    const newEdge = {
      ...params,
      id: `${params.source}-${params.target}`,
      type: "floating",
    };

    setEdges((eds) => addEdge(newEdge, eds));

    fetch("https://neurotab-api.onrender.com/api/Connections", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        FromContentId: params.source,
        ToContentId: params.target,
        ConnectionType: "leads_to",
        Strength: 1,
        IsAiGenerated: false,
      }),
    });
  }, []);

  useEffect(() => {
    const generatedNodes = contents.map((item, index) => ({
      id: item.id,
      position: { x: item.positionX, y: item.positionY },
      data: {
        ...item,
      },
      type: "custom",
    }));

    setNodes(generatedNodes);

    fetch("https://neurotab-api.onrender.com/api/Connections", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        const formattedEdges = data.map((conn) => ({
          id: conn.id,
          source: conn.fromContentId,
          target: conn.toContentId,
          type: "floating",
          data: {
            connectionType: conn.connectionType,
            strength: conn.strength,
            notes: conn.notes,
            isAiGenerated: conn.isAiGenerated,
          },
        }));

        setEdges(formattedEdges);
      })
      .catch((err) => {
        console.error("Errore nel recupero delle connessioni:", err);
      });
  }, [contents]);

  const onNodesChange = useCallback((changes) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);

  const onNodeDragStop = useCallback((event, node) => {
    console.log("Drag stopped:", node.id, node.position);

    fetch(
      `https://neurotab-api.onrender.com/api/Contents/${node.id}/position`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          x: node.position.x,
          y: node.position.y,
        }),
        credentials: "include",
      }
    );
  }, []);

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
          edges={edges}
          onNodesChange={onNodesChange}
          onNodeDragStop={onNodeDragStop}
          fitView
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
        >
          <Background />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}
