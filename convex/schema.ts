import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";

export default defineSchema({
    boards: defineTable({
        title: v.string(),
        orgId: v.string(),
        authorId: v.string(),
        authorName: v.string(),
        imageUrl: v.string(),
        permission: v.optional(v.union(
            v.literal("no_access"),
            v.literal("anyone_can_edit"),
            v.literal("publicly_viewable"),
            v.literal("publicly_editable")),
        ),
    }).index("by_org", ["orgId"]).searchIndex("search_title", {
        searchField: "title",
        filterFields: ["orgId"]
    }),
    userBoards: defineTable({
        userId: v.string(),
        orgId: v.string(),
        boardId: v.id("boards"),
        isFavourite: v.boolean(),
    })
        .index("by_user_org", ["userId", "orgId"])
        .index("by_user_board_org", ["userId", "boardId", "orgId"])
        .index("by_user_board", ["userId", "boardId"])
        .index("by_user_org_favourite", ["userId", "orgId", "isFavourite"]),
    userFavourites: defineTable({
        orgId: v.string(),
        userId: v.string(),
        boardId: v.id("boards"),
    }).index("by_board", ["boardId"]).index("by_user_org", ["orgId", "userId"]).index("by_user_board", ["userId", "boardId"]).index("by_user_board_org", ["userId", "boardId", "orgId"])
})