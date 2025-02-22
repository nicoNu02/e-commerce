import prisma from "@/libs/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("productId");
  if (productId) {
    const colors = await prisma.colorProduct.findMany({
      where: {
        productId: productId,
      },
    });
    return NextResponse.json({ body: colors });
  }

  const colors = await prisma.color.findMany({
    select: {
      id: true,
      name: true,
      code: true,
    },
  });
  return NextResponse.json({ body: colors });
}

// export async function POST(req: Request) {
//   return null;
// }
