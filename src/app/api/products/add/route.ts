import { NextResponse } from "next/server";
import { connectToDb } from "../../../../../helpers/serverHelpers";
import prisma from "../../../../../prisma";

interface Variation {
  length: number;
  curlType: string;
  price: number;
  stock: number;
  sales: number;
}

export const POST = async (req: Request) => {
  try {
    const { name, description, categoryId, imageLink, variations } =
      await req.json();

    // Validate required fields
    if (!name || !description || !categoryId || !variations) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        categoryId,
        imageLink,
        variations: {
          create: variations.map((variation: Variation) => ({
            length: variation.length,
            curlType: variation.curlType,
            price: variation.price,
            stock: variation.stock,
            sales: variation.sales,
          })),
        },
      },
      include: {
        category: true,
        variations: true,
      },
    });

    return NextResponse.json({ newProduct }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
