import { NextResponse } from "next/server";
import prisma from "@/libs/db";

interface Order {
  email: string;
  name: string;
  last_name: string;
  dni: string;
  phone_number: string;
  addres_line: string;
  house_number: string;
  flor: string;
  apartment: string;
  city: string;
  province: string;
  shipping_method: string;
  shipping_details: string;
  shipping_price: number;
  payment_method: string;
  total_price: number;
  productsId: string[];
  notes: string;
  stage: string;
  paid: boolean;
  quantity: number[];
}
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");
  const lastName = searchParams.get("lastName");
  if (lastName == "undefined" && name) {
    const orders = await prisma.order.findMany({
      where: {
        name: {
          startsWith: name,
          mode: "insensitive",
        },
      },
    });
    const orderProducts = await prisma.orderProduct.findMany({
      where: {
        orderId: {
          in: orders.map((order) => order.id),
        },
      },
    });
    return NextResponse.json({ status: 200, body: { orders, orderProducts } });
  } else if (name && lastName) {
    const orders = await prisma.order.findMany({
      where: {
        name: {
          startsWith: name,
          mode: "insensitive",
        },
        last_name: {
          startsWith: lastName,
          mode: "insensitive",
        },
      },
    });
    const orderProducts = await prisma.orderProduct.findMany({
      where: {
        orderId: {
          in: orders.map((order) => order.id),
        },
      },
    });
    return NextResponse.json({ status: 200, body: { orders, orderProducts } });
  }
  return NextResponse.json({ status: 400 });
}

export async function POST(req: Request) {
  const response: Order = await req.json();
  if (!response) return NextResponse.json({ status: 400 });
  const {
    email,
    name,
    last_name,
    dni,
    phone_number,
    addres_line,
    house_number,
    flor,
    apartment,
    city,
    province,
    shipping_method,
    shipping_details,
    shipping_price,
    payment_method,
    total_price,
    productsId,
    notes,
    stage,
    paid,
    quantity,
  } = response;
  const orderToSend = {
    ...response,
    productsId: undefined,
    quantity: undefined,
  };
  delete orderToSend.quantity;
  delete orderToSend.productsId;
  const order = await prisma.order.create({ data: orderToSend });
  const { id } = order;
  if (productsId.length > 0) {
    const orderProduct = await prisma.orderProduct.createMany({
      data: productsId.map((product, i) => ({
        orderId: id,
        productId: product,
        quantity: quantity[i],
      })),
    });
    await Promise.all(
      productsId.map(async (product, i) => {
        await prisma.product.update({
          where: {
            id: product,
          },
          data: {
            itemsLeft: {
              decrement: quantity[i],
            },
            times_ordered: {
              increment: 1,
            },
          },
        });
      })
    );
  }
  return NextResponse.json({ status: 200, id: id });
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ status: 400 });
  const deleted = await prisma.order.deleteMany({
    where: {
      id: id,
    },
  });
  return NextResponse.json({ status: 200 });
}

export async function PUT(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ status: 400 });
  const response = await req.json();
  const updated = await prisma.order.update({
    where: {
      id: id,
    },
    data: response,
  });
  return NextResponse.json({ status: 200 });
}
