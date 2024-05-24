import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
export async function POST(
  request: Request
): Promise<NextResponse | undefined> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");
  if (filename) {
    // @ts-ignore
    const blob = await put(`productImages/${filename}`, request.body, {
      access: "public",
      token: process.env.BLOB_KEY,
    });

    return NextResponse.json(blob);
  }
  return undefined;
}

export async function GET(req: Request) {
  console.log("asdasd");
  return NextResponse.json({ status: 200 });
}
