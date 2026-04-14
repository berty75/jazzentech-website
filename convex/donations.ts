// PATH: convex/donations.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Créer un don après paiement Stripe réussi
export const createDonation = mutation({
  args: {
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    address: v.optional(v.string()),
    city: v.optional(v.string()),
    postalCode: v.optional(v.string()),
    country: v.optional(v.string()),
    amount: v.number(),
    amountEur: v.number(),
    palier: v.string(),
    message: v.optional(v.string()),
    stripePaymentId: v.string(),
    stripeStatus: v.string(),
    paymentMethod: v.optional(v.string()),
    displayName: v.boolean(),
  },
  handler: async (ctx, args) => {
    // Vérifie le doublon Stripe
    const existing = await ctx.db
      .query("donations")
      .withIndex("by_stripe", (q) => q.eq("stripePaymentId", args.stripePaymentId))
      .first();
    if (existing) return existing._id;

    const id = await ctx.db.insert("donations", {
      ...args,
      cerfaGenerated: false,
      createdAt: Date.now(),
    });

    // Ajouter ou mettre à jour le client dans la base
    const existingClient = await ctx.db
      .query("clients")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (!existingClient) {
      await ctx.db.insert("clients", {
        firstName: args.firstName,
        lastName: args.lastName,
        email: args.email,
        phone: args.phone,
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
    cerfaHash: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.donationId, {
      cerfaGenerated: true,
      cerfaHash: args.cerfaHash,
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
    const cerfaGenerated = succeeded.filter((d) => d.cerfaGenerated).length;

    const now = new Date();
    const thisMonth = succeeded
      .filter((d) => {
        const dd = new Date(d.createdAt);
        return dd.getMonth() === now.getMonth() && dd.getFullYear() === now.getFullYear();
      })
      .reduce((sum, d) => sum + d.amountEur, 0);

    const byPalier = succeeded.reduce((acc, d) => {
      acc[d.palier] = (acc[d.palier] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalCollected,
      totalDonors,
      totalDonations: succeeded.length,
      cerfaPending,
      cerfaGenerated,
      thisMonth,
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

// Liste des donateurs publics (pour affichage sur le site)
export const listPublicDonors = query({
  args: {},
  handler: async (ctx) => {
    const donations = await ctx.db
      .query("donations")
      .withIndex("by_date")
      .order("desc")
      .collect();

    const succeeded = donations.filter((d) => d.stripeStatus === "succeeded");

    // Dédupliquer par email, garder le montant total
    const byEmail = new Map<string, { name: string; total: number; palier: string }>();
    for (const d of succeeded) {
      const name = `${d.firstName} ${d.lastName}`.trim();
      if (!name || name === "Anonyme") continue;
      const existing = byEmail.get(d.email);
      if (existing) {
        existing.total += d.amountEur;
      } else {
        byEmail.set(d.email, { name, total: d.amountEur, palier: d.palier });
      }
    }

    return Array.from(byEmail.values())
      .sort((a, b) => b.total - a.total)
      .map((d) => ({ name: d.name, palier: d.palier }));
  },
});