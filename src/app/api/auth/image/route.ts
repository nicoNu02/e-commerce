import { del, put } from "@vercel/blob";
import { NextResponse } from "next/server";
import prisma from "@/libs/db";
export async function POST(
  request: Request
): Promise<NextResponse | undefined> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");
  if (filename) {
    //@ts-ignore
    const blob = await put(`productImages/${filename}`, request.body, {
      access: "public",
      token: process.env.BLOB_KEY,
    });

    return NextResponse.json(blob);
  }
  return undefined;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("productId");
  if (productId) {
    const images = await prisma.image.findMany({
      where: {
        product_id: productId?.toString(),
      },
    });
    return NextResponse.json({ status: 200, body: images });
  } else {
    const images = await prisma.image.findMany({});
    return NextResponse.json({ status: 200, body: images });
  }
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  if (url) {
    const blob = await del(url, {
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    return NextResponse.json({ status: 200, body: blob });
  }
}
