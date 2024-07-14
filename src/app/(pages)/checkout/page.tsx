"use client";
import OrderDetails from "@/components/Checkout/OrderDetails";
import ShippingDetailsForm from "@/components/Checkout/ShippingDetailsForm";
import React, { useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import convertToSubCurrency from "@/lib/convertToSubCurrency";
import { useCartContext } from "@/context/CartContext";
import { calculateTotal } from "../../../../helpers/calculateTotalsHelper";
import PaymentBlock from "@/components/Checkout/PaymentBlock";
import { useShippingDetailsContext } from "@/context/ShippingDetailsContext";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is undefined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

function CheckoutPage() {
  const { cart } = useCartContext();
  const { isStorePickup } = useShippingDetailsContext();
  const amount =
    calculateTotal(cart, isStorePickup) > 0
      ? calculateTotal(cart, isStorePickup)
      : 15;

  const [currentStep, setCurrentStep] = useState("orderDetails");
  const handleStepChange = (newStep: string) => {
    setCurrentStep(newStep);
  };

  return (
    <div className="container mx-auto min-h-[500px] mb-24">
      <div className="instructions mt-6">
        <p className="font-bold text-sm inline">Orders for pick up: </p>
        <p className="text-sm inline">
          Please wait until you receive the pickup confirmation email.
        </p>
        <p className="text-sm font-medium mt-2">Pick Up Address: </p>
        <p className="text-sm mb-2">
          1646 Victoria Park Ave, <br /> North York, ON, M1R 1P7
        </p>
        <p className="font-bold text-sm inline">Email receipts: </p>
        <p className="text-sm inline">
          Emails from us or Square might not show up in your main inbox. Please
          check your spam.
        </p>
      </div>
      <div className="order-checkout-step mt-12">
        <div
          className={`order-details grid grid-cols-2 gap-6 p-4 bg-neutral-100 rounded-md ${
            currentStep === "orderDetails" ? "" : "hidden"
          }`}
        >
          <OrderDetails />
          <ShippingDetailsForm
            currentStep={currentStep}
            onStepChange={handleStepChange}
          />
        </div>

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
      </div>
    </div>
  );
}

export default CheckoutPage;
