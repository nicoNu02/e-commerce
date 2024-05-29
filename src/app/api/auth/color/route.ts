import prisma from "@/libs/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  console.log(req);
  //@ts-ignore
  const colors = await prisma.color.findMany({
    select: {
      id: true,
      name: true,
      code: true,
      product_id: true,
    },
  });
  return NextResponse.json({ body: colors });
}

// export async function POST(req: Request) {
//   return null;
// }
