import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Liste tous les clients
export const listClients = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("clients")
      .withIndex("by_email")
      .collect();
  },
});

// Import batch depuis CSV Billetweb
export const importClients = mutation({
  args: {
    clients: v.array(v.object({
      firstName: v.string(),
      lastName: v.string(),
      email: v.string(),
      phone: v.optional(v.string()),
      editions: v.array(v.string()),
      ticketCount: v.optional(v.number()),
    })),
  },
  handler: async (ctx, args) => {
    let imported = 0;
    let updated = 0;

    for (const client of args.clients) {
      const existing = await ctx.db
        .query("clients")
        .withIndex("by_email", (q) => q.eq("email", client.email))
        .first();

      if (existing) {
        // Met à jour les éditions sans doublon
        const editions = [...new Set([...existing.editions, ...client.editions])];
        await ctx.db.patch(existing._id, { editions });
        updated++;
      } else {
        await ctx.db.insert("clients", {
          ...client,
          source: "billetweb",
          unsubscribed: false,
          createdAt: Date.now(),
        });
        imported++;
      }
    }

    return { imported, updated };
  },
});

// Désabonnement
export const unsubscribeClient = mutation({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const client = await ctx.db
      .query("clients")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
    if (client) {
      await ctx.db.patch(client._id, { unsubscribed: true });
    }
  },
});

// Stats clients
export const getClientStats = query({
  args: {},
  handler: async (ctx) => {
    const clients = await ctx.db.query("clients").collect();
    const active = clients.filter((c) => !c.unsubscribed);
    return {
      total: clients.length,
      active: active.length,
      unsubscribed: clients.length - active.length,
      batches: Math.ceil(active.length / 300),
    };
  },
});