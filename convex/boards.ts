import { v } from "convex/values";
import { query } from "./_generated/server";
export const get = query({
    args: {
        orgId: v.string(),
        search: v.optional(v.string()),
        favourites: v.optional(v.union(v.literal("true"), v.null())),
    },
    async handler(ctx, args) {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthorized");

        let userBoards = [];
        if (args.favourites === "true") {
            userBoards = await ctx.db.query("userBoards").withIndex("by_user_org_favourite", (q) => q.eq("userId", identity.subject).eq("orgId", args.orgId).eq("isFavourite", true)).order("desc").collect();
            userBoards = userBoards.map(async (b) => {
                return ctx.db.get(b.boardId).then(v => {
                    return !!v ? {
                        ...v,
                        isFavourite: b.isFavourite,
                        userBoardId: b._id,
                    } : null
                })
            });
        } else {
            const title = args.search!;
            if (title) {
                // Query with search index
                userBoards = await ctx.db.query("boards").withSearchIndex("search_title", (q) => q.search("title", title).eq("orgId", args.orgId)).collect();
                userBoards = userBoards.map(async (b) => {
                    return ctx.db.query("userBoards").withIndex("by_user_board_org", (q) => q.eq("userId", identity.subject).eq("boardId", b._id).eq("orgId", b.orgId)).first().then(v => {
                        return !!v ? ({
                            ...b,
                            isFavourite: v?.isFavourite,
                            userBoardId: v._id,
                        }) : null;
                    })
                })
            } else {
                userBoards = await ctx.db.query("userBoards").withIndex("by_user_org", (q) => q.eq("userId", identity.subject).eq("orgId", args.orgId)).order("desc").collect();
                userBoards = userBoards.map(async (b) => {
                    return ctx.db.get(b.boardId).then(v => {
                        return !!v ? {
                            ...v,
                            isFavourite: b.isFavourite,
                            userBoardId: b._id,
                        } : null;
                    })
                });
            }
        }
        userBoards = await Promise.all(userBoards);
        return userBoards.filter(v => !!v);
    },
})