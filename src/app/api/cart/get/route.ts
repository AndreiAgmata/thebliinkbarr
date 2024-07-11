import { NextResponse } from "next/server";
import prisma from "../../../../../prisma";
import { connectToDb } from "../../../../../helpers/serverHelpers";
import { getServerSession } from "next-auth";
import nextAuthOptions from "@/lib/AuthOptions";

export const GET = async () => {
  try {
    const session = await getServerSession(nextAuthOptions);
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized Request!" },
        { status: 401 }
      );
    }
    const customerId = session.user.id;

    await connectToDb();

    const cart = await prisma.cart.findUnique({
      where: { customerId },
      include: {
        items: {
          include: {
            Product: true,
            Variation: true,
          },
        },
      },
    });

    if (!cart) {
      return NextResponse.json({ message: "Cart not found" }, { status: 404 });
    }

    // Transform the cart data to include the desired details
    const cartItems = cart.items.map((item) => ({
      name: item.Product.name,
      imageLink: item.Product.imageLink,
      price: item.Variation ? item.Variation.price : null,
      quantity: item.quantity,
      length: item.Variation ? item.Variation.length : null,
      curlType: item.Variation ? item.Variation.curlType : null,
    }));

    return NextResponse.json({ cartItems }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
