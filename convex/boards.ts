import { v } from "convex/values";
import { query } from "./_generated/server";
import { getAllOrThrow } from "convex-helpers/server/relationships";
export const get = query({
    args: {
        orgId: v.string(),
        search: v.optional(v.string()),
        favourites: v.optional(v.string()),
    },
    async handler(ctx, args) {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthorized");

        if (args.favourites) {
            const favouritedBoards = await ctx.db.query("userFavourites").withIndex("by_user_org", q => q.eq("orgId", args.orgId).eq("userId", identity.subject)).order("desc").collect();
            const boardIds = favouritedBoards.map(b => b.boardId);
            const boards = await getAllOrThrow(ctx.db, boardIds);
            return boards.map(b => ({ ...b, isFavourite: true }));
        }
        const title = args.search!;
        let boards = []
        if (title) {
            // Query with search index
            boards = await ctx.db.query("boards").withSearchIndex("search_title", (q) => q.search("title", title).eq("orgId", args.orgId)).collect()
        } else {

            boards = await ctx.db.query("boards").withIndex("by_org", (q) => q.eq("orgId", args.orgId)).order("desc").collect()
        }

        const boardsWithFavouriteRelationPromise = boards.map((board) => {
            return ctx.db.query("userFavourites").withIndex("by_user_board", (q) => q.eq("userId", identity.subject).eq("boardId", board._id)).unique().then((favourite) => ({ ...board, isFavourite: !!favourite }))
        })
        const boardsWithFavouriteRelation = Promise.all(boardsWithFavouriteRelationPromise);
        return boardsWithFavouriteRelation;
    },
})