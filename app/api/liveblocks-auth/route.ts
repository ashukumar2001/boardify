import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { auth, currentUser } from "@clerk/nextjs/server";
import { api } from "@/convex/_generated/api";


const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const liveblocks = new Liveblocks({
    secret: process.env.LIVEBLOCKS_SECRET!,
});

export async function POST(request: Request) {
    const authorization = auth();
    const user = await currentUser();

    if (!authorization || !user) {
        return new Response("Unauthorized", { status: 401 });
    }
    const { room } = await request.json();

    const userBoard = await convex.query(api.userBoard.get, { boardId: room, orgId: authorization.orgId as string | undefined, userId: user.id })
    // const board = await convex.query(api.board.get, { id: room });
    // if (!board || !userBoard) return new Response("Not found", { status: 404 });
    // if (board?.orgId !== authorization.orgId) {
    //     return new Response("Unauthorized", { status: 403 });
    // }
    if (!userBoard) return new Response("Forbidden", { status: 403 });
    const userInfo = {
        name: user.firstName || "Anonymous",
        picture: user.imageUrl!,
    }
    // Start an auth session inside your endpoint
    const session = liveblocks.prepareSession(
        user.id,
        { userInfo } // Optional
    );
    // Implement your own security, and give the user access to the room
    if (room) {
        session.allow(room, session.FULL_ACCESS);
    }

    // Authorize the user and return the result
    const { status, body } = await session.authorize();
    return new Response(body, { status });
}