"use server";
import { Liveblocks } from "@liveblocks/node";
const liveblocks = new Liveblocks({
    secret: process.env.LIVEBLOCKS_SECRET!,
});

export const removeUserFromRoom = async (roomId: string, userId: string) => {
    const usersAccesses: { [key: string]: ["room:write"] | ["room:read", "room:presence:write"] | null } = {};
    usersAccesses[userId] = null;
    const room = await liveblocks.updateRoom(roomId, {
        usersAccesses
    })
    await liveblocks.broadcastEvent(roomId, { type: "user-removed", userId })
    return room;
}
