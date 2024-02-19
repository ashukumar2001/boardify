"use client";
import { memo, useMemo } from "react";
import { MousePointer2 } from "lucide-react";
import { toColor } from "@/lib/utils";
import { useOther } from "@/liveblocks.config";

interface CursorProps {
  connectionId: number;
}
const Cursor = memo(({ connectionId }: CursorProps) => {
  const info = useOther(connectionId, (user) => user?.info);
  const cursor = useOther(connectionId, (user) => user.presence.cursor);
  const userColor = useMemo(() => toColor(connectionId), [connectionId]);
  const name = info?.name || "Anonymus";
  if (!cursor) return null;
  const { x, y } = cursor;

  return (
    <foreignObject
      style={{
        transform: `translateX(${x}px) translateY(${y}px)`,
      }}
      height={48}
      width={name.length * 10 + 24}
      className="relative drop-shadow-md"
    >
      <MousePointer2
        className="w-5 h-5"
        style={{
          fill: userColor,
          color: userColor,
        }}
      />
      <div
        className="absolute left-5 px-1.5 py-0.5 rounded-sm text-xs text-white font-semibold"
        style={{ backgroundColor: userColor }}
      >
        {name}
      </div>
    </foreignObject>
  );
});

Cursor.displayName = "Cursor";
export default Cursor;
