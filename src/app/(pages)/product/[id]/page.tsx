import React from "react";
import prisma from "../../../../../prisma";
import { connectToDb } from "../../../../../helpers/serverHelpers";
import SingleProduct from "@/components/SingleProduct/SingleProduct";

const getProduct = async (id: string) => {
  try {
    await connectToDb();
    const product = await prisma.product.findFirst({
      where: {
        id: id,
      },
      include: {
        variations: true,
      },
    });

    return product;
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
};

async function SingleProductPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const product = await getProduct(id);

  if (!product) {
    return <p>Product Not Available</p>;
  }

  return <SingleProduct productDetails={product} />;
}

export default SingleProductPage;
