import React from "react";

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
          1594 Victoria Park Ave, <br /> North York, ON, M1R 1P6
        </p>
        <p className="font-bold text-sm inline">Email receipts: </p>
        <p className="text-sm inline">
          Emails from us or Square might not show up in your main inbox. Please
          check your spam.
        </p>
      </div>
      <div className="order-details grid grid-cols-2 gap-3 mt-12">
        <div className="col-span-1 h-96 bg-red-300"></div>
        <div className="col-span-1 h-96 bg-blue-300"></div>
      </div>
    </div>
  );
}

export default CheckoutPage;
