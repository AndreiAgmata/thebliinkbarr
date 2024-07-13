import { NextResponse } from "next/server";
import { connectToDb } from "../../../../../helpers/serverHelpers";
import prisma from "../../../../../prisma";
import { getServerSession } from "next-auth";
import nextAuthOptions from "@/lib/AuthOptions";

interface OrderItem {
  productId: string;
  variationId: string;
  quantity: number;
}

async function generateUniqueOrderId(): Promise<string> {
  let orderId;
  let orderIdExists = true;

  while (orderIdExists) {
    // Generate a random 8-digit number
    orderId = Math.floor(10000000 + Math.random() * 90000000)
      .toString()
      .substring(0, 8);

    // Check if orderId already exists in the database
    const existingOrder = await prisma.order.findFirst({
      where: {
        orderId: orderId,
      },
    });

    // If no existing order found, set orderIdExists to false to exit the loop
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

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized request" },
        { status: 401 }
      );
    }

    const customerId = session.user.id;

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

    //generate order ID
    const orderId = await generateUniqueOrderId();

    await connectToDb();

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

    return NextResponse.json({ newOrder }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
