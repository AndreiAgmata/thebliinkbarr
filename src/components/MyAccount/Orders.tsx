import React from "react";
import { connectToDb } from "../../../helpers/serverHelpers";
import prisma from "../../../prisma";
import Link from "next/link";
import { getServerSession } from "next-auth";
import nextAuthOptions from "@/lib/AuthOptions";
import { redirect } from "next/navigation";

const getAllOrders = async (id: string) => {
  try {
    await connectToDb();
    const order = await prisma.order.findMany({
      where: {
        customerId: id,
      },
    });
    return order;
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
};

async function Orders() {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    redirect("/auth/login");
  }

  const orders = await getAllOrders(session?.user.id);
  return (
    <div className="w-full p-4">
      <div className="orders-list grid grid-cols-1 gap-3">
        {orders?.map((order) => (
          <Link
            href={`/order/${order.id}`}
            className="order-card p-4 bg-neutral-100 rounded-md hover:scale-[1.01] transition duration-150"
            key={order.id}
          >
            <p className="text-lg mb-3">
              <strong>Order#: {order.orderId}</strong>
            </p>
            <p className="text-sm mb-1">
              <strong>Order Date: </strong>
              {order.createdAt.toDateString()}
            </p>
            <p className="text-sm mb-1">
              <strong>Status: </strong>
              {order.status}
            </p>
            <p className="text-sm mb-1">
              <strong>Tracking Number: </strong>
              {order.trackingNumber}
            </p>
            <p className="text-sm mb-1">
              <strong>Order Total: </strong>${order.totalPrice} CAD
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Orders;
