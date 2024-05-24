import { NextResponse } from "next/server";
import prisma from "@/libs/db";
export async function DELETE(
  request: Request
): Promise<NextResponse | undefined> {
  // const deletedItems2 = await prisma.image.deleteMany({});
  // const deletedItems3 = await prisma.productCategory.deleteMany({});
  // const deletedItems = await prisma.product.deleteMany({});
  // // const deletedItems3 = await prisma.productCategory.deleteMany({
  // //   //@ts-ignore
  // //   where: { product_id: 1 },
  // // });
  // console.log(deletedItems, deletedItems2, deletedItems3);
  return NextResponse.json({ status: 200 });
}
