"use client";

import { generateCursorColor } from "@/lib/utils";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useTheme } from "next-themes";

interface RoomProps {
  children: React.ReactNode;
  roomId: string;
  fallback?: NonNullable<React.ReactNode> | null;
}
export default function Room({ children, roomId, fallback }: RoomProps) {
  const { theme } = useTheme();
  return (
    <LiveblocksProvider throttle={16} authEndpoint="/api/liveblocks-auth">
      <RoomProvider
        id={roomId}
        initialPresence={{
          color: generateCursorColor(theme === "dark"),
        }}
      >
        <ClientSideSuspense fallback={fallback}>
          {() => children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
