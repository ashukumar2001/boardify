import { v } from "convex/values"
import { mutation, query } from "./_generated/server"
export const get = query({
    args: {
        id: v.optional(v.id("userBoards")),
        boardId: v.optional(v.id("boards")),
        orgId: v.optional(v.string()),
        userId: v.optional(v.string()),
    }, async handler(ctx, args) {
        const { boardId, orgId, userId, id } = args;
        if (boardId && orgId && userId) {
            return await ctx.db.query("userBoards").withIndex("by_user_board_org", q => q.eq("userId", userId).eq("boardId", boardId).eq("orgId", orgId)).first();
        } else if (id) {
            return await ctx.db.get(id);
        }
    },
})

export const create = mutation({
    args: {
        boardId: v.id("boards"),
        userId: v.string(),
    },
    async handler(ctx, args) {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) return { success: false, message: "Unauthorized" };

        const board = await ctx.db.get(args.boardId);
        if (board?.authorId !== identity.subject) throw new Error("Unauthorized");

        const isAlreadyExists = await ctx.db.query("userBoards").filter(q => q.and(
            q.eq(q.field("boardId"), args.boardId),
            q.eq(q.field("orgId"), board.orgId),
            q.eq(q.field("userId"), args.userId),
        )).first();
        if (isAlreadyExists) throw new Error("User already added to board");
        const userBoard = await ctx.db.insert("userBoards", {
            boardId: args.boardId,
            orgId: board.orgId,
            userId: args.userId,
            isFavourite: false
        })
        return userBoard;
    },
})
export const remove = mutation({
    args: {
        userId: v.string(),
        boardId: v.id("boards"),
    },
    async handler(ctx, args) {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthorized");
        const userBoard = await ctx.db.query("userBoards").filter(q => q.and(
            q.eq(q.field("boardId"), args.boardId),
            q.eq(q.field("userId"), args.userId),
        )).first();
        if (!userBoard) throw new Error("Board doesn't exists");
        const board = await ctx.db.get(userBoard.boardId);
        if (board?.authorId !== identity.subject) throw new Error("Unauthorized");
        await ctx.db.delete(userBoard._id)
    },
})

