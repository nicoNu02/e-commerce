//@ts-nocheck
import prisma from "@/libs/db";
import { ConvertToCents } from "@/utils/convertion";
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
