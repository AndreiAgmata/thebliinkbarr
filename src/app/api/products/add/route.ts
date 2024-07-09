import { NextResponse } from "next/server";
import { connectToDb } from "../../../../../helpers/serverHelpers";
import prisma from "../../../../../prisma";

export const POST = async (req: Request) => {
  try {
    const {
      name,
      description,
      price,
      quantity,
      categoryId,
      lengthId,
      curlTypeId,
    } = await req.json();

    // Validate required fields
    if (!name || !description || !price || !quantity || !categoryId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price,
        quantity,
        category: {
          connect: { id: categoryId },
        },
        length: lengthId ? { connect: { id: lengthId } } : undefined,
        curlType: curlTypeId ? { connect: { id: curlTypeId } } : undefined,
      },
      include: {
        category: true,
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
