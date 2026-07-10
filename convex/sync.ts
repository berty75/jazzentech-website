// PATH: convex/sync.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Récupère le timestamp de la dernière synchro pour une clé donnée
export const getLastSync = query({
  args: { key: v.string() },
  handler: async (ctx, args) => {
    const row = await ctx.db
      .query("syncState")
      .withIndex("by_key", (q) => q.eq("key", args.key))
      .first();
    return row?.lastSync ?? 0;
  },
});

// Met à jour le timestamp de la dernière synchro
export const setLastSync = mutation({
  args: { key: v.string(), lastSync: v.number() },
  handler: async (ctx, args) => {
    const row = await ctx.db
      .query("syncState")
      .withIndex("by_key", (q) => q.eq("key", args.key))
      .first();
    if (row) {
      await ctx.db.patch(row._id, {
        lastSync: args.lastSync,
        updatedAt: Date.now(),
      });
    } else {
      await ctx.db.insert("syncState", {
        key: args.key,
        lastSync: args.lastSync,
        updatedAt: Date.now(),
      });
    }
  },
});
