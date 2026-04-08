import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Créer un don après paiement Stripe réussi
export const createDonation = mutation({
  args: {
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    address: v.optional(v.string()),
    city: v.optional(v.string()),
    postalCode: v.optional(v.string()),
    amount: v.number(),
    amountEur: v.number(),
    palier: v.string(),
    stripePaymentId: v.string(),
    stripeStatus: v.string(),
    displayName: v.boolean(),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("donations", {
      ...args,
      cerfaGenerated: false,
      createdAt: Date.now(),
    });

    // Ajouter ou mettre à jour le client dans la base
    const existing = await ctx.db
      .query("clients")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (!existing) {
      await ctx.db.insert("clients", {
        firstName: args.firstName,
        lastName: args.lastName,
        email: args.email,
        editions: ["2026"],
        source: "donation",
        unsubscribed: false,
        createdAt: Date.now(),
      });
    }

    return id;
  },
});

// Marquer le Cerfa comme généré
export const markCerfaGenerated = mutation({
  args: {
    donationId: v.id("donations"),
    cerfaStorageId: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.donationId, {
      cerfaGenerated: true,
      cerfaStorageId: args.cerfaStorageId,
      cerfaSentAt: Date.now(),
    });
  },
});

// Liste tous les dons (dashboard)
export const listDonations = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("donations")
      .withIndex("by_date")
      .order("desc")
      .collect();
  },
});

// Stats globales pour le dashboard
export const getDashboardStats = query({
  args: {},
  handler: async (ctx) => {
    const donations = await ctx.db.query("donations").collect();
    const succeeded = donations.filter((d) => d.stripeStatus === "succeeded");

    const totalCollected = succeeded.reduce((sum, d) => sum + d.amountEur, 0);
    const totalDonors = new Set(succeeded.map((d) => d.email)).size;
    const cerfaPending = succeeded.filter((d) => !d.cerfaGenerated).length;

    const byPalier = succeeded.reduce((acc, d) => {
      acc[d.palier] = (acc[d.palier] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalCollected,
      totalDonors,
      totalDonations: succeeded.length,
      cerfaPending,
      byPalier,
    };
  },
});

// Un seul don par ID
export const getDonation = query({
  args: { id: v.id("donations") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});