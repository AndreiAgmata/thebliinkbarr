"use client";
import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import convertToSubCurrency from "@/lib/convertToSubCurrency";
import { useCartContext } from "@/context/CartContext";
import { useShippingDetailsContext } from "@/context/ShippingDetailsContext";
import { createOrderPayload } from "../../../helpers/createOrderPayloadHelper";
import { OrderPayload } from "../../../types/interfaces";
import { calculateTotal } from "../../../helpers/calculateTotalsHelper";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useDiscountContext } from "@/context/DiscountContext";

interface PaymentBlockProps {
  currentStep: string;
  onStepChange: (newStep: string) => void;
  amount: number;
}

function PaymentBlock({
  currentStep,
  onStepChange,
  amount,
}: PaymentBlockProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  //ORDER DETAILS//
  const { cart, clearCart } = useCartContext();
  const { discountObject } = useDiscountContext();
  const { shippingAddress, isStorePickup } = useShippingDetailsContext();
  //ORDER DETAILS//

  const router = useRouter();

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: convertToSubCurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://www.localhost:3000`,
      },
      redirect: "if_required",
    });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
    } else {
      const paymentId = paymentIntent.id;
      const orderPayload = createOrderPayload(
        cart,
        shippingAddress,
        isStorePickup,
        paymentId,
        discountObject.discountAmountPercentage
      );

      handleSubmitOrder(orderPayload);
    }
  };

  const handleSubmitOrder = async (orderPayload: OrderPayload) => {
    try {
      const response = await fetch("/api/order/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderPayload),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();

      if (data) {
        router.push(`/order/${data.newOrder.id}`);
        clearCart();
      }
    } catch (error) {
      console.error("Failed to submit order:", error);
    }
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center w-full bg-neutral-100 h-24 mt-[-2rem] rounded-md">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-neutral-100 p-4 rounded-md">
      {loading ? (
        <div className="loader flex items-center justify-start gap-2 mb-6">
          <p className="font-bold text-2xl">Processing Order</p>
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      ) : (
        <p className="font-bold text-2xl mb-6">
          Purchase Total : $
          {calculateTotal(
            cart,
            isStorePickup,
            discountObject.discountAmountPercentage
          )}{" "}
          CAD
        </p>
      )}
      {clientSecret && <PaymentElement />}
      {errorMessage && <div>{errorMessage}</div>}
      <button
        disabled={!stripe || loading || cart.length === 0}
        className="text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
      >
        {!loading ? `Confirm Payment` : "Processing..."}
      </button>
      <div className="button-group flex justify-between gap-2 mt-4">
        <Button onClick={() => onStepChange("orderDetails")}>
          Back to Order Details
        </Button>
      </div>
    </form>
  );
}

export default PaymentBlock;
