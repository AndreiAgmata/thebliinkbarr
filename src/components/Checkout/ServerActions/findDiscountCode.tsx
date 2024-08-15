"use server";
import { connectToDb } from "../../../../helpers/serverHelpers";
import prisma from "../../../../prisma";

export const findDiscountCode = async (discountCode: string) => {
  try {
    await connectToDb();
    const discount = await prisma.discountCode.findFirst({
      where: {
        discountCode: discountCode,
      },
    });

    if (discount && discount.isActive) {
      return discount;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
};
