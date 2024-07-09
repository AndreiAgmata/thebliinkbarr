import { NextResponse } from "next/server";
import { connectToDb } from "../../../../helpers/serverHelpers";
import prisma from "../../../../prisma";

export const GET = async () => {
  try {
    await connectToDb();
    const categories = await prisma.category.findMany({});

    return NextResponse.json({ categories }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
