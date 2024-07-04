import prisma from "@/libs/db";

export const FetchProducts = async () => {
  const products = await fetch(
    "https://giftregaleria.vercel.app/api/auth/product"
  )
    .then((res) => res.json())
    .then((res) => res.body);
  return products;
};

export const fetchImages = async () => {
  const image = await fetch("https://giftregaleria.vercel.app/api/auth/image")
    .then((res) => res.json())
    .then((res) => res.body);

  return image;
};

export const deleteImageByURL = async (url: string) => {
  const deleted = fetch(`/api/auth/image?url=${url}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => res.body);
  return deleted;
};
export const fetchCategories = async () => {
  const categories = await fetch(
    "https://giftregaleria.vercel.app/api/auth/category"
  )
    .then((res) => res.json())
    .then((res) => res.body);
  return categories;
};

export const FetchImagesById = async (idx: number | string) => {
  const image = await fetch(
    `https://giftregaleria.vercel.app/api/auth/image?productId=${idx}`
  )
    .then((res) => res.json())
    .then((res) => res.body);

  return image;
};
export const FetchProductById = async (idx: number | string) => {
  const product = await prisma.product.findUnique({
    where: { id: idx.toString() },
  });
  return product;
};

export const FetchProductByName = async (name: string) => {
  const Response = await fetch(`/api/auth/product?name=${name}`);
  const res = await Response.json();
  const product = res.body;

  return product;
};

export const FetchColorsByProductId = async (id: string) => {
  const colors = fetch(
    `https://giftregaleria.vercel.app/api/auth/color?productId=${id}`
  )
    .then((res) => res.json())
    .then((res) => res.body);
  return colors;
};

export const FetchOrdersByName = async (name: string, lastName: string) => {
  const orders = fetch(`/api/auth/order?name=${name}&lastName=${lastName}`)
    .then((res) => res.json())
    .then((res) => res.body);

  return orders;
};
