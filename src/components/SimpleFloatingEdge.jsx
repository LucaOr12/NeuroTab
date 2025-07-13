import {
  getBezierPath,
  useInternalNode,
  EdgeLabelRenderer,
  useReactFlow,
} from "@xyflow/react";
import { getEdgeParams } from "./utils";

export default function SimpleFloatingEdge({
  id,
  source,
  target,
  markerEnd,
  style,
}) {
  const sourceNode = useInternalNode(source);
  const targetNode = useInternalNode(target);
  const { setEdges } = useReactFlow();

  if (!sourceNode || !targetNode) {
    return null;
  }

  const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(
    sourceNode,
    targetNode
  );

  const onEdgeClick = async () => {
    setEdges((edges) => edges.filter((edge) => edge.id !== id));

    if (!id.includes("-")) return;

    try {
      const response = await fetch(
        `https://neurotab-api.onrender.com/api/Connections/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        console.error("Error deleting:", await response.text());
      }
    } catch (err) {
      console.error("Error netork in DELETE:", err);
    }
  };

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX: sx,
    sourceY: sy,
    sourcePosition: sourcePos,
    targetX: tx,
    targetY: ty,
    targetPosition: targetPos,
  });

  return (
    <>
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
        style={style}
        strokeWidth={2}
      />
      <EdgeLabelRenderer>
        <div
          className="button-edge__label nodrag nopan"
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
          }}
        >
          <button className="button-edge__button" onClick={onEdgeClick}>
            x
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
