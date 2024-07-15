import { NextResponse } from "next/server";
import { connectToDb } from "../../../../../helpers/serverHelpers";
import prisma from "../../../../../prisma";
import { getServerSession } from "next-auth";
import nextAuthOptions from "@/lib/AuthOptions";
import { sendOrderConfirmationEmail } from "../../../../../helpers/sendOrderConfirmationEmail";

interface OrderItem {
  productId: string;
  variationId: string;
  quantity: number;
}

async function generateUniqueOrderId(): Promise<string> {
  let orderId;
  let orderIdExists = true;

  while (orderIdExists) {
    orderId = Math.floor(10000000 + Math.random() * 90000000)
      .toString()
      .substring(0, 8);

    const existingOrder = await prisma.order.findFirst({
      where: {
        orderId: orderId,
      },
    });

    if (!existingOrder) {
      orderIdExists = false;
    }
  }

  if (!orderId) {
    throw new Error("Failed to generate a unique order ID");
  }

  return orderId;
}

export const POST = async (req: Request) => {
  try {
    const session = await getServerSession(nextAuthOptions);

    const customerId = session ? session.user.id : null;

    const {
      firstName,
      lastName,
      isStorePickup,
      streetAddress,
      apartmentUnit,
      city,
      state,
      zipCode,
      country,
      email,
      phoneNumber,
      items,
      totalPrice,
      paymentId,
      status,
    } = await req.json();

    // Generate order ID
    const orderId = await generateUniqueOrderId();

    await connectToDb();

    let updatedItems = [];

    // Create order in database
    const newOrder = await prisma.order.create({
      data: {
        customerId,
        orderId,
        firstName,
        lastName,
        isStorePickup,
        streetAddress,
        apartmentUnit,
        city,
        state,
        zipCode,
        country,
        email,
        phoneNumber,
        totalPrice,
        status,
        paymentId,
        trackingNumber: "",
        items: {
          create: items.map((item: OrderItem) => ({
            productId: item.productId,
            variationId: item.variationId,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    // Update stock quantities
    for (const item of items) {
      const { productId, variationId, quantity } = item;

      // Retrieve product variation and update stock
      const existingVariation = await prisma.variation.findUnique({
        where: {
          id: variationId,
        },
        select: {
          stock: true,
        },
      });

      if (existingVariation) {
        const updatedStock = existingVariation.stock - quantity;

        // Update stock in database
        const updatedVariation = await prisma.variation.update({
          where: {
            id: variationId,
          },
          data: {
            stock: updatedStock,
          },
        });

        updatedItems.push(updatedVariation);
      }
    }

    // Send order confirmation email
    await sendOrderConfirmationEmail(
      newOrder.email,
      newOrder.id,
      newOrder.orderId
    );

    return NextResponse.json({ newOrder, updatedItems }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
