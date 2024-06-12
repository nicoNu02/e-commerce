import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/libs/db";
export async function POST(req) {
  const data = await req.json();
  const userNameFound = await prisma.user.findUnique({
    where: {
      name: data.username,
    },
  });
  const userEmailFound = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });
  if (userNameFound)
    return NextResponse.json(
      {
        message: "Username already exists",
      },
      {
        status: 400,
      }
    );
  if (userEmailFound)
    return NextResponse.json(
      {
        message: "Email already exists",
      },
      {
        status: 400,
      }
    );

  const hashedPassword = await bcrypt.hash(data.password, 10);
  const newUser = await prisma.user.create({
    data: {
      name: data.username,
      email: data.email,
      password: hashedPassword,
    },
  });
  return NextResponse.json(newUser);
}
