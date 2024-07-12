import React from "react";
import { connectToDb } from "../../../../../helpers/serverHelpers";
import prisma from "../../../../../prisma";

//test id : 6691924cc92776913a78b423

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
  console.log(order);
  return (
    <div className="container mx-auto min-h-[500px]">
      OrderConfirmationPageWithOrderId
    </div>
  );
}

export default OrderConfirmationPageWithOrderId;
