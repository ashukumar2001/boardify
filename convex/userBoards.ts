import { v } from "convex/values"
import { query } from "./_generated/server"
export const getBoardUserIds = query({
    args: {
        boardId: v.string(),
    },
    async handler(ctx, args) {
        return (await ctx.db.query("userBoards").filter(q => q.eq(q.field("boardId"), args.boardId)).collect()).map(b => b.userId);
    }
})