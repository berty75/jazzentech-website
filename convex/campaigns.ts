import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Créer une campagne email
export const createCampaign = mutation({
  args: {
    subject: v.string(),
    body: v.string(),
    sentBy: v.string(),
    recipientCount: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("emailCampaigns", {
      ...args,
      batchCount: Math.ceil(args.recipientCount / 300),
      status: "draft",
      createdAt: Date.now(),
    });
  },
});

// Marquer comme envoyée
export const markCampaignSent = mutation({
  args: {
    campaignId: v.id("emailCampaigns"),
    brevoMessageId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.campaignId, {
      status: "sent",
      brevoMessageId: args.brevoMessageId,
      sentAt: Date.now(),
    });
  },
});

// Liste toutes les campagnes
export const listCampaigns = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("emailCampaigns")
      .order("desc")
      .collect();
  },
});