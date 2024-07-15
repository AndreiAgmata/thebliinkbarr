import { NextResponse } from "next/server";
import { connectToDb } from "../../../../../helpers/serverHelpers";
import prisma from "../../../../../prisma";

interface Variation {
  length: number;
  curlType: string;
  shape: string | null;
  price: number;
  stock: number;
  sales: number;
}

export const PUT = async () => {
  try {
    const updatedVariations = await prisma.variation.updateMany({
      where: {
        shape: undefined,
      },
      data: {
        shape: "",
      },
    });

    return NextResponse.json({ updatedVariations }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
