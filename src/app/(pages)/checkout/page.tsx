"use client";
import OrderDetails from "@/components/Checkout/OrderDetails";
import ShippingDetailsForm from "@/components/Checkout/ShippingDetailsForm";
import React, { useState } from "react";

function CheckoutPage() {
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
      <div className="order-details grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        <ShippingDetailsForm />
        <OrderDetails />
      </div>
    </div>
  );
}

export default CheckoutPage;
