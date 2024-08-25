import { auth, clerkClient } from '@clerk/nextjs/server'
import { NextRequest } from 'next/server';
export async function POST(
    request: NextRequest
) {
    const authorization = auth();
    if (!authorization) {
        return new Response("Unauthorized", { status: 401 });
    }
    try {
        const { userIds } = await request.json();
        const res = (await clerkClient().users.getUserList({ userId: userIds }));
        return Response.json({ users: res.data }, { status: 200 });
    } catch (e) {
        console.log(e)
        return new Response("Server Error", { status: 500 });
    }
}