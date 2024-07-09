import { NextResponse } from "next/server";
import { connectToDb } from "../../../../../helpers/serverHelpers";
import prisma from "../../../../../prisma";

export const GET = async () => {
  try {
    await connectToDb();

    const allProducts = await prisma.product.findMany({
      include: {
        category: true,
        length: true,
        curlType: true,
      },
    });

    return NextResponse.json({ allProducts }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
