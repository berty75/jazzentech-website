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

// ---- Verrou d'exclusion mutuelle ----
// Convex exécute chaque mutation dans une transaction sérialisable : deux appels
// concurrents sur la même clé ne peuvent pas réussir tous les deux. C'est ce qui
// empêche le webhook Stripe et le bouton « Générer les billets » de créer deux
// fois la même commande Billetweb.
//
// claim(key) renvoie { acquired: true } au premier arrivé, { acquired: false }
// à tous les suivants. release(key) libère la clé en cas d'échec.
export const claim = mutation({
  args: { key: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("settings")
      .withIndex("by_key", (q) => q.eq("key", args.key))
      .first();

    if (existing) return { acquired: false as const, since: existing.updatedAt };

    await ctx.db.insert("settings", {
      key: args.key,
      value: "held",
      updatedAt: Date.now(),
    });
    return { acquired: true as const, since: Date.now() };
  },
});

export const release = mutation({
  args: { key: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("settings")
      .withIndex("by_key", (q) => q.eq("key", args.key))
      .first();
    if (existing) await ctx.db.delete(existing._id);
    return { released: !!existing };
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
