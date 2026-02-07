import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = 'nodejs'; // Use Node.js runtime to avoid edge limitations with crypto

export async function POST(req: NextRequest) {
    try {
        const rawBody = await req.text();
        const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET || "";
        const hmac = crypto.createHmac("sha256", secret);
        const digest = Buffer.from(hmac.update(rawBody).digest("hex"), "utf8");
        const signature = Buffer.from(req.headers.get("x-signature") || "", "utf8");

        if (!crypto.timingSafeEqual(digest, signature)) {
            return new NextResponse("Invalid signature", { status: 401 });
        }

        const payload = JSON.parse(rawBody);
        const eventName = payload.meta.event_name;
        const customData = payload.meta.custom_data;
        const userId = customData?.user_id; // This matches the 'passthrough' we'll send

        console.log(`🔔 Received Lemon Squeezy Event: ${eventName} for User: ${userId}`);

        if (!userId) {
            return new NextResponse("No User ID in custom data", { status: 400 });
        }

        // --- DATABASE PLACEHOLDERS ---
        // In a real implementation with Supabase/Prisma/Drizzle, you would do:
        // 1. Update the User table to mark isPro = true
        // 2. Store the LS Subscription ID for future updates/cancellations

        switch (eventName) {
            case "order_created":
            case "subscription_created":
                console.log(`✅ Plan activated for ${userId}`);
                // TODO: db.user.update({ where: { id: userId }, data: { isPro: true } })
                break;

            case "subscription_updated":
                // Handle plan changes (e.g. monthly to yearly)
                break;

            case "subscription_cancelled":
            case "subscription_expired":
                console.log(`❌ Plan deactivated for ${userId}`);
                // TODO: db.user.update({ where: { id: userId }, data: { isPro: false } })
                break;

            default:
                console.log(`ℹ️ Unhandled event type: ${eventName}`);
        }

        return new NextResponse("Webhook processed", { status: 200 });
    } catch (err) {
        console.error("Webhook Error:", err);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
