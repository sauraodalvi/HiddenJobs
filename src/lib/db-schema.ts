/**
 * This is the blueprint for your database.
 * You can copy this into a Prisma schema, Drizzle schema, or Supabase SQL editor.
 */

export interface UserSchema {
    id: string; // The Clerk UserID (e.g. user_2n...)
    email: string;
    name?: string;
    createdAt: Date;
    updatedAt: Date;

    // Subscription Details
    isPro: boolean;
    planType: 'free' | 'weekly' | 'monthly' | 'six_months' | 'yearly';

    // Lemon Squeezy Metadata
    lemonSqueezyCustomerId?: string;
    lemonSqueezySubscriptionId?: string;
    subscriptionEndsAt?: Date;
    variantId?: string; // To track which specific plan they are on
}

export interface SearchLogSchema {
    id: string;
    userId: string;
    query: string;
    timestamp: Date;
    engine: string;
}
