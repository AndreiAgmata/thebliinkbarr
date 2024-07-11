import React from "react";
import prisma from "../../../../../prisma";
import { connectToDb } from "../../../../../helpers/serverHelpers";
import ProductReel from "@/components/ProductReel/ProductReel";

const getLashTrayProducts = async () => {
  try {
    await connectToDb();

    const category = await prisma.category.findFirst({
      where: {
        value: "Lash Trays",
      },
    });

    const products = await prisma.product.findMany({
      where: {
        categoryId: category?.id,
      },
      include: {
        variations: true,
      },
    });

    return products;
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
};

async function LashTraysPage() {
  const products = await getLashTrayProducts();
  return <ProductReel products={products} />;
}

export default LashTraysPage;
