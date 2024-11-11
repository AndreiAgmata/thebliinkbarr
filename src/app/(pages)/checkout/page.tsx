"use client";
import OrderDetails from "@/components/Checkout/OrderDetails";
import ShippingDetailsForm from "@/components/Checkout/ShippingDetailsForm";
import React, { useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import convertToSubCurrency from "@/lib/convertToSubCurrency";
import { useCartContext } from "@/context/CartContext";
import { calculateTotal } from "../../../../helpers/calculateTotalsHelper";
import PaymentBlock from "@/components/Checkout/PaymentBlock";
import { useShippingDetailsContext } from "@/context/ShippingDetailsContext";
import { useDiscountContext } from "@/context/DiscountContext";

let stripePromise: Promise<Stripe | null>;

//dev
if (process.env.NEXT_PUBLIC_ENVIRONMENT === "development") {
  if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is undefined");
  }
  stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
}
//production
else {
  if (process.env.NEXT_PUBLIC_STRIPE_LIVE_KEY === undefined) {
    throw new Error("NEXT_PUBLIC_STRIPE_LIVE_KEY is undefined");
  }

  stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_LIVE_KEY);
}

function CheckoutPage() {
  const { cart } = useCartContext();
  const { discountObject } = useDiscountContext();
  const { isStorePickup } = useShippingDetailsContext();

  //amount is dummy value so stripe never gets 0 for amount
  const amount =
    calculateTotal(
      cart,
      isStorePickup,
      discountObject.discountAmountPercentage
    ) > 0
      ? calculateTotal(
          cart,
          isStorePickup,
          discountObject.discountAmountPercentage
        )
      : 15;

  const [currentStep, setCurrentStep] = useState("orderDetails");
  const handleStepChange = (newStep: string) => {
    setCurrentStep(newStep);
  };

  return (
    <div className="container mx-auto min-h-[500px] mb-24">
      <div className="instructions mt-6">
        <p className="text-sm mb-2">
          <strong>Orders for pick up:</strong> Please wait until you receive the
          pickup confirmation email. The pickup address will be in the email.
        </p>
        <p className="text-sm mb-2">
          <strong>Email receipts:</strong> Emails from us or Square might not
          show up in your main inbox. Please check your spam.
        </p>
      </div>
      <div className="order-checkout-step mt-12">
        <div
          className={`order-details grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 bg-neutral-100 rounded-md ${
            currentStep === "orderDetails" ? "" : "hidden"
          }`}
        >
          <OrderDetails />
          <ShippingDetailsForm
            currentStep={currentStep}
            onStepChange={handleStepChange}
          />
        </div>
        {amount ===
        calculateTotal(
          cart,
          isStorePickup,
          discountObject.discountAmountPercentage
        ) ? (
          <div
            className={`payment-step ${
              currentStep === "payment" ? "" : "hidden"
            }`}
          >
            <Elements
              stripe={stripePromise}
              options={{
                mode: "payment",
                amount: convertToSubCurrency(amount),
                currency: "cad",
              }}
            >
              <PaymentBlock
                amount={amount}
                onStepChange={handleStepChange}
                currentStep={currentStep}
              />
            </Elements>
          </div>
        ) : (
          <div>
            <p>
              An error ocurred while processing the order. Please try again.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CheckoutPage;
