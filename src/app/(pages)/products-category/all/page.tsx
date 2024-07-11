import ProductReel from "@/components/ProductReel/ProductReel";
import React from "react";
import { connectToDb } from "../../../../../helpers/serverHelpers";
import prisma from "../../../../../prisma";

const getAllProducts = async () => {
  try {
    await connectToDb();
    const products = await prisma.product.findMany({
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

async function AllProductsPage() {
  const products = await getAllProducts();
  return <ProductReel products={products} />;
}

export default AllProductsPage;
