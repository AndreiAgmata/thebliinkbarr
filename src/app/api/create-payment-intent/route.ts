import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe based on the environment
const environment = process.env.NEXT_PUBLIC_ENVIRONMENT;
let stripeSecretKey: string | undefined;

if (environment === "development") {
  stripeSecretKey = process.env.STRIPE_SECRET_KEY;
} else {
  stripeSecretKey = process.env.STRIPE_LIVE_SECRET_KEY;
}

if (!stripeSecretKey) {
  throw new Error("Stripe secret key is undefined");
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2024-06-20",
});

export async function POST(request: NextRequest) {
  try {
    const { amount } = await request.json();

    if (!amount) {
      return NextResponse.json(
        { error: "Amount is required" },
        { status: 400 }
      );
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "cad",
      automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Internal Error:", error);
    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 }
    );
  }
}
