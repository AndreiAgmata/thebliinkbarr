import prisma from "../../../../../prisma";
import { connectToDb } from "../../../../../helpers/serverHelpers";
import ProductReel from "@/components/ProductReel/ProductReel";

const getAccessoriesProducts = async () => {
  try {
    await connectToDb();

    const category = await prisma.category.findFirst({
      where: {
        value: "Accessories",
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
  const products = await getAccessoriesProducts();
  return <ProductReel products={products} />;
}

export default LashTraysPage;
