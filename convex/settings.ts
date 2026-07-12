// PATH: convex/settings.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Réglages généraux (clé/valeur). Sert notamment à stocker la signature
// du président, apposée sur les reçus fiscaux Cerfa.

export const get = query({
  args: { key: v.string() },
  handler: async (ctx, args) => {
    const row = await ctx.db
      .query("settings")
      .withIndex("by_key", (q) => q.eq("key", args.key))
      .first();
    return row?.value ?? null;
  },
});

export const set = mutation({
  args: { key: v.string(), value: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("settings")
      .withIndex("by_key", (q) => q.eq("key", args.key))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, { value: args.value, updatedAt: Date.now() });
      return existing._id;
    }
    return await ctx.db.insert("settings", {
      key: args.key,
      value: args.value,
      updatedAt: Date.now(),
    });
  },
});

export const remove = mutation({
  args: { key: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("settings")
      .withIndex("by_key", (q) => q.eq("key", args.key))
      .first();
    if (existing) await ctx.db.delete(existing._id);
  },
});
