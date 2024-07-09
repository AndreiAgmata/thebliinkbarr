import React from "react";
import { connectToDb } from "../../../../../helpers/serverHelpers";
import prisma from "../../../../../prisma";
import ProductReel from "@/components/ProductReel/ProductReel";

const getTweezerProducts = async () => {
  try {
    await connectToDb();

    const category = await prisma.category.findFirst({
      where: {
        value: "Tweezers",
      },
    });

    const products = await prisma.product.findMany({
      where: {
        categoryId: category?.id,
      },
    });

    return products;
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
};

async function TweezersPage() {
  const products = await getTweezerProducts();
  return <ProductReel products={products} />;
}

export default TweezersPage;
