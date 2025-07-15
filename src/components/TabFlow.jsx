import React, { useCallback, useEffect, useState } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  applyNodeChanges,
  addEdge,
} from "@xyflow/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import CustomNode from "./CustomNode";
import SimpleFloatingEdge from "./SimpleFloatingEdge";
import "@xyflow/react/dist/style.css";

const fetchConnections = async () => {
  const res = await fetch(`${window.API_BASE_URL}/api/Connections`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Error fetching connections");
  return res.json();
};

const nodeTypes = {
  custom: CustomNode,
};
const edgeTypes = {
  floating: SimpleFloatingEdge,
};

export default function TabFlow({ contents }) {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const queryClient = useQueryClient();

  const {
    data: connectionData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["connections"],
    queryFn: fetchConnections,
  });

  useEffect(() => {
    const generatedNodes = contents.map((item) => ({
      id: item.id,
      position: { x: item.positionX, y: item.positionY },
      data: { ...item },
      type: "custom",
    }));

    setNodes(generatedNodes);
  }, [contents]);

  useEffect(() => {
    if (!connectionData) return;

    const formattedEdges = connectionData.map((conn) => ({
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
  }, [connectionData]);

  const onConnect = useCallback(
    (params) => {
      const newEdge = {
        ...params,
        id: `${params.source}-${params.target}`,
        type: "floating",
      };

      setEdges((eds) => addEdge(newEdge, eds));

      fetch(`${window.API_BASE_URL}/api/Connections`, {
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
      }).then(() => {
        queryClient.invalidateQueries(["connections"]);
      });
    },
    [queryClient]
  );

  const onNodesChange = useCallback((changes) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);

  const onNodeDragStop = useCallback((event, node) => {
    fetch(`${window.API_BASE_URL}/api/Contents/${node.id}/position`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        x: node.position.x,
        y: node.position.y,
      }),
    });
  }, []);

  if (isLoading) return <div>Loading Connections...</div>;
  if (isError) return <div>Error in Loading Connections.</div>;

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
