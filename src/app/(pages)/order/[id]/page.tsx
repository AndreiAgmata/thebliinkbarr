import React from "react";
import { connectToDb } from "../../../../../helpers/serverHelpers";
import prisma from "../../../../../prisma";
import Image from "next/image";
import { redirect } from "next/navigation";

const getOrder = async (id: string) => {
  try {
    await connectToDb();
    const order = await prisma.order.findFirst({
      where: {
        id: id,
      },
      include: {
        items: {
          include: {
            variation: true,
            product: true,
          },
        },
      },
    });
    return order;
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
};

async function OrderConfirmationPageWithOrderId({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const order = await getOrder(id);

  if (!order) {
    redirect("/");
  }

  return (
    <div className="container mx-auto min-h-[500px] mb-24">
      <div className="content bg-neutral-100 p-4 rounded-md mt-8">
        <h1 className="text-2xl font-bold ">
          Confirmation for Order #{order?.orderId}
        </h1>
        <h2>
          <strong>Order Total:</strong> ${order.totalPrice}
        </h2>
        <div className="shipping-details mt-4">
          <p className="text-lx font-bold mb-4">Shipping Details:</p>
          <p className="text-sm">
            {order?.firstName} {order?.lastName}
          </p>
          <p className="text-sm">{order?.email}</p>
          <p className="text-sm">{order?.phoneNumber}</p>
          <p className="text-lx font-bold mt-4 mb-4">Shipping Address:</p>
          {order?.isStorePickup && <p>For Store Pickup</p>}
          {!order?.isStorePickup && (
            <>
              <p className="text-sm">{order?.streetAddress.toUpperCase()}</p>
              {order?.apartmentUnit && (
                <p className="text-sm">{order?.apartmentUnit.toUpperCase()}</p>
              )}
              <p className="text-sm">
                {order?.city.toUpperCase()}, {order?.state.toUpperCase()}
              </p>
              <p className="text-sm">
                {order?.country.toUpperCase()}, {order?.zipCode.toUpperCase()}
              </p>
            </>
          )}
          <div className="order-items-table mt-4 p-4 bg-white rounded-md max-h-96 overflow-y-auto">
            <p className="text-lg font-bold">Order Items:</p>
            {order?.items.map((orderItem) => (
              <div
                className="cart-item grid grid-cols-4 gap-2 relative hover:bg-neutral-100 p-2 rounded-sm"
                key={orderItem.id}
              >
                <div className="image-container col-span-1">
                  <div className="image-wrapper w-full aspect-square max-w-24 relative">
                    <Image
                      src={
                        orderItem.product ? orderItem.product?.imageLink : ""
                      }
                      alt="product image"
                      fill
                      className="object-cover rounded-sm"
                    />
                  </div>
                </div>
                <div className="details-wrapper col-span-3">
                  <p className="text-medium font-medium">
                    {orderItem.product?.name}
                  </p>
                  <span
                    className={`block ${
                      orderItem.variation?.curlType ? "" : "hidden"
                    }`}
                  >
                    <p className="text-xs font-bold inline">Curl Type: </p>
                    <p className="text-xs inline">
                      {orderItem.variation?.curlType}
                    </p>
                  </span>
                  <span
                    className={`block ${
                      orderItem.variation?.length ? "" : "hidden"
                    }`}
                  >
                    <p className="text-xs font-bold inline">Length: </p>
                    <p className="text-xs inline">
                      {orderItem.variation?.length}mm
                    </p>
                  </span>
                  <span className="block">
                    <p className="text-xs text-pink-300 inline">
                      {orderItem.quantity} x ${orderItem.variation?.price}
                    </p>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmationPageWithOrderId;
