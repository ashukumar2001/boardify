import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
    args: {
        orgId: v.string(),
        title: v.string(),
    },
    async handler(ctx, args) {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthorized");

        const randomImage = `/placeholders/${Math.floor(Math.random() * 10) + 1}.svg`;
        const board = await ctx.db.insert("boards", {
            title: args.title,
            orgId: args.orgId,
            authorId: identity.subject,
            authorName: identity.name!,
            imageUrl: randomImage,
            permission: "no_access",
        });
        await ctx.db.insert("userBoards", {
            boardId: board,
            orgId: args.orgId,
            userId: identity.subject,
            isFavourite: false,
        })

        return board;
    },
});

export const remove = mutation({
    args: {
        id: v.id("boards"),
        userBoardId: v.optional(v.id("userBoards")),
    },
    async handler(ctx, args) {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Unauthorized");
        }
        if (args.id && args.userBoardId) {
            // Delete existing relation in favourite
            await ctx.db.delete(args.userBoardId);
            await ctx.db.delete(args.id);
        }

    },
});

export const update = mutation({
    args: { id: v.id("boards"), title: v.string() },
    async handler(ctx, args) {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Unauthorized");
        }
        const title = args.title.trim();
        if (!title) {
            throw new Error("Title is requried");
        }
        if (title.length > 60) {
            throw new Error("Title cannot be longer than 60 characters");
        }
        // check if user as access to board

        const board = await ctx.db.patch(args.id, {
            title: args.title,
        });
        return board;
    },
});

export const favourite = mutation({
    args: {
        userBoardId: v.id("userBoards")
    },
    async handler(ctx, args) {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Unauthorized");
        }
        const userBoard = await ctx.db.get(args.userBoardId);

        if (!userBoard) throw new Error("Board not found");
        if (userBoard.isFavourite) {
            throw new Error("Board already favourited");
        }
        await ctx.db.patch(args.userBoardId, { isFavourite: true });
    },
});
export const unFavourite = mutation({
    args: { userBoardId: v.id("userBoards") },
    async handler(ctx, args) {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Unauthorized");
        }
        const userBoard = await ctx.db.get(args.userBoardId);
        if (!userBoard) throw new Error("Board not found");
        if (!userBoard.isFavourite) {
            throw new Error("Board already unfavourited");
        }
        await ctx.db.patch(args.userBoardId, { isFavourite: false });
    },
});


export const get = query({
    args: { id: v.id("boards") },
    async handler(ctx, args) {
        const board = await ctx.db.get(args.id);
        return board;
    },
});