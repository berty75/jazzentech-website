// PATH: convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Dons reçus via Stripe
  donations: defineTable({
    // Infos donateur
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    address: v.optional(v.string()),
    city: v.optional(v.string()),
    postalCode: v.optional(v.string()),
    country: v.optional(v.string()),
    // Don
    amount: v.number(),          // montant en centimes (ex: 5000 = 50€)
    amountEur: v.number(),       // montant en euros (ex: 50)
    palier: v.string(),          // "fan" | "soutien" | "passionne" | "mecene" | "grand-mecene"
    message: v.optional(v.string()),
    // Stripe
    stripePaymentId: v.string(),
    stripeStatus: v.string(),    // "succeeded" | "pending" | "failed"
    paymentMethod: v.optional(v.string()), // "card" | "sepa_debit" | etc.
    // Cerfa
    cerfaGenerated: v.boolean(),
    cerfaHash: v.optional(v.string()),
    cerfaStorageId: v.optional(v.string()),
    cerfaSentAt: v.optional(v.number()),
    // Affichage nom sur site
    displayName: v.boolean(),
    // Date
    createdAt: v.number(),       // timestamp
  })
    .index("by_email", ["email"])
    .index("by_stripe", ["stripePaymentId"])
    .index("by_date", ["createdAt"]),

  // Clients importés depuis Billetweb
  clients: defineTable({
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    // Historique achats Billetweb
    editions: v.array(v.string()),    // ["2024", "2025", "2026"]
    ticketCount: v.optional(v.number()),
    // Source
    source: v.string(),               // "billetweb" | "donation" | "manual"
    // Emails marketing
    unsubscribed: v.boolean(),
    lastEmailSentAt: v.optional(v.number()),
    createdAt: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_source", ["source"]),

  // Campagnes emails envoyées
  emailCampaigns: defineTable({
    subject: v.string(),
    body: v.string(),               // HTML
    sentBy: v.string(),             // userId Clerk
    recipientCount: v.number(),
    batchCount: v.number(),         // nombre de lots de 300
    status: v.string(),             // "draft" | "sending" | "sent" | "failed"
    brevoMessageId: v.optional(v.string()),
    sentAt: v.optional(v.number()),
    createdAt: v.number(),
  }),

  // Utilisateurs admin
  adminUsers: defineTable({
    clerkId: v.string(),
    email: v.string(),
    name: v.string(),
    role: v.string(),              // "admin" | "treasurer" | "viewer"
    createdAt: v.number(),
  })
    .index("by_clerk_id", ["clerkId"]),
});