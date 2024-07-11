import { NextResponse } from "next/server";
import { connectToDb } from "../../../../../helpers/serverHelpers";
import prisma from "../../../../../prisma";
import nextAuthOptions from "@/lib/AuthOptions";
import { getServerSession } from "next-auth";

export const POST = async (req: Request) => {
  try {
    const session = await getServerSession(nextAuthOptions);

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized Request!" },
        { status: 401 }
      );
    }

    const customerId = session?.user.id;
    const { productId, variationId, quantity } = await req.json();

    await connectToDb();

    // Find the customer's cart
    let cart = await prisma.cart.findUnique({
      where: { customerId },
      include: { items: true },
    });

    if (!cart) {
      // Create a new cart if it doesn't exist
      cart = await prisma.cart.create({
        data: {
          customerId,
          items: {
            create: [
              {
                productId,
                variationId,
                quantity,
              },
            ],
          },
        },
        include: { items: true },
      });
    } else {
      // Check if the item already exists in the cart
      const existingItem = cart.items.find(
        (item) =>
          item.productId === productId && item.variationId === variationId
      );

      if (existingItem) {
        // If item exists, update its quantity
        await prisma.cartItem.update({
          where: { id: existingItem.id },
          data: { quantity: existingItem.quantity + quantity },
        });
      } else {
        // If item doesn't exist, create a new cart item
        await prisma.cartItem.create({
          data: {
            cartId: cart.id,
            productId,
            variationId,
            quantity,
          },
        });
      }

      // Fetch the updated cart with the new or updated item
      cart = await prisma.cart.findUnique({
        where: { id: cart.id },
        include: { items: true },
      });
    }

    return NextResponse.json({ cart }, { status: 201 });
  } catch (error) {
    console.error("Error handling POST request:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
