import prisma from "@/libs/db";
import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<NextResponse | undefined> {
  const { name, description, color, price, itemsLeft, category, url } =
    await req.json();
  let categoriesId: Number[] = [];
  console.log(category);
  //checks if the product has the categories and push it's id's
  Object.values(category).map((val, i) => {
    if (val) categoriesId.push(i + 1);
  });
  if (categoriesId && categoriesId.length > 0) {
    const product = await prisma.product.create({
      data: {
        name,
        description,
        colors: color,
        price: parseFloat(price),
        itemsLeft: parseInt(itemsLeft),
        images: {
          create: url.map((url: string) => ({ url })),
        },
        categories: {
          // @ts-ignore
          create: categoriesId.map((catId: Number) => ({
            category: { connect: { id: catId } },
          })),
        },
      },
    });
    console.log(product);
  }
  return NextResponse.json({ status: 200 });
}

export async function GET(req: Request) {
  console.log("asdasd");
  return NextResponse.json({ status: 200 });
}
