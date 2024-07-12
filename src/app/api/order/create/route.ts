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
      shippingAddress,
      email,
      phoneNumber,
      items,
      totalPrice,
      status,
    } = await req.json();

    // Validate required fields
    if (
      !firstName ||
      !lastName ||
      !isStorePickup ||
      !shippingAddress ||
      !email ||
      !phoneNumber ||
      !items ||
      !totalPrice ||
      !status
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectToDb();

    const newOrder = await prisma.order.create({
      data: {
        customerId,
        firstName,
        lastName,
        isStorePickup,
        shippingAddress,
        email,
        phoneNumber,
        totalPrice,
        status,
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
