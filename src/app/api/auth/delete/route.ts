import { NextResponse } from "next/server";
import prisma from "@/libs/db";
export async function DELETE(
  request: Request
): Promise<NextResponse | undefined> {
  // const deletedItems2 = await prisma.image.deleteMany({});
  // const deletedItems3 = await prisma.productCategory.deleteMany({
  //   where: { product_id: 7 },
  // });
  // const deletedItems = await prisma.product.deleteMany({
  //   where: { id: 7 },
  // });
  // // const deletedItems3 = await prisma.productCategory.deleteMany({
  // //   //@ts-ignore
  // //   where: { product_id: 1 },
  // // });
  // console.log(deletedItems, deletedItems3);
  return NextResponse.json({ status: 200 });
}
