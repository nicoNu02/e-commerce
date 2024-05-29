import prisma from "@/libs/db";

export const FetchProducts = async () => {
  const products = await prisma.product.findMany();

  return products;
};

export const fetchImages = async () => {
  const images = await prisma.image.findMany();
  return images;
};

export const fetchCategories = async () => {
  const categories = await prisma.category.findMany();
  return categories;
};

export const FetchImagesById = async (idx: number | string) => {
  const images = await prisma.image.findMany({
    where: { product_id: idx.toString() },
  });
  return images;
};
export const FetchProductById = async (idx: number | string) => {
  const product = await prisma.product.findUnique({
    where: { id: idx.toString() },
  });
  return product;
};

export const FetchColorsByProductId = async (id: string) => {
  const colors = await prisma.color.findMany({
    where: { product_id: id },
  });
  return colors;
};
