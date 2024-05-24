import prisma from "@/libs/db";
import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<NextResponse | undefined> {
  const category = await req.json();
  const newCategory = await prisma.category.create({
    data: {
      name: category.name,
      description: category.description,
    },
  });
  console.log(newCategory);
  return NextResponse.json({ status: 200 });
}

export async function GET(req: Request) {
  console.log("asdasd");
  return NextResponse.json({ status: 200 });
}
