//@ts-nocheck
import prisma from "@/libs/db";
import { ConvertToCents } from "@/utils/convertion";
import { del } from "@vercel/blob";
import { NextResponse } from "next/server";
interface Color {
  name: string | undefined;
  code: string | undefined;
  product_id?: string;
}

export async function POST(req: Request): Promise<NextResponse | undefined> {
  const data = await req.json();
  const colorData: Color[] = data.color;
  const productData = data.product;
  const { name, description, price, itemsLeft, url, category } = productData;

  const priceInCents = ConvertToCents(price);
  let categoriesId: string[] = [];

  if (!Number(itemsLeft) || !Number(price)) {
    return NextResponse.json({ status: 400 });
  }

  Object.values(category).forEach((val: string) => {
    if (val !== "") categoriesId.push(val);
  });
  try {
    // Create the product first
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: priceInCents,
        itemsLeft: parseInt(itemsLeft),
        images: {
          create: url.map((imageUrl: string) => ({ url: imageUrl })),
        },
        url: url[0],
      },
    });

    // Create and connect colors
    if (colorData.length > 0) {
      await Promise.all(
        colorData.map(async (color) => {
          await prisma.color.upsert({
            where: { code: color.code },
            update: {},
            create: {
              name: color.name,
              code: color.code,
            },
          });
          await prisma.colorProduct.create({
            data: {
              productId: product.id,
              code: color.code,
              name: color.name,
            },
          });
        })
      );
    }
    // Connect categories to the product
    if (categoriesId.length > 0) {
      await prisma.productCategory.createMany({
        data: categoriesId.map((catId: string) => ({
          product_id: product.id,
          category_id: catId,
        })),
      });
    }

    return NextResponse.json({ status: 200, product });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, error: error.message });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");
  const id = searchParams.get("id");
  if (name) {
    const products = await prisma.product.findMany({
      where: {
        name: {
          startsWith: name,
          mode: "insensitive",
        },
      },
    });
    return NextResponse.json({ status: 200, body: products });
  } else if (id) {
    const products = await prisma.product.findMany({
      where: {
        id: id,
      },
    });
    return NextResponse.json({ status: 200, body: products });
  } else {
    const products = await prisma.product.findMany();
    return NextResponse.json({ status: 200, body: products });
  }
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: id,
      },
    });
    product.images.forEach(async (image) => {
      const url = image.url;
      //delete images from blob
      const blob = await del(url, {
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
    });
    // Delete the product's colors
    const deletedColor = await prisma.colorProduct.deleteMany({
      where: {
        productId: id,
      },
    });
    // Delete the product's categories
    const deletedCategory = await prisma.productCategory.deleteMany({
      where: {
        product_id: id,
      },
    });
    // Delete the product's images
    const deletedImage = await prisma.image.deleteMany({
      where: {
        product_id: id,
      },
    });
    // Delete the product's orders
    const deletedOrderProduct = await prisma.orderProduct.deleteMany({
      where: {
        productId: id,
      },
    });
    // Delete the product
    const deleted = await prisma.product.deleteMany({
      where: {
        id: id,
      },
    });

    return NextResponse.json({ status: 200, body: deleted });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, error: error.message });
  }
}
