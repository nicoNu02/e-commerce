"use client";
import { Cart, FormCheckout, Method } from "@/types/types";
import { ConvertToLocalePrice } from "@/utils/convertion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const ImageEditSrc =
  "https://u8v8yhe8bp8fkg64.public.blob.vercel-storage.com/edit-box-line-fb0NDfs0plPIsGeACg7NFXMDCbxkTc.svg";
interface Form {
  cart: Cart[];
  method: Method;
  formCheckout: FormCheckout;
}
const initialForm = {
  cart: [],
  method: {
    id: 0,
    title: "",
    price: 0,
    details: "",
  },
  formCheckout: {
    shipping: {
      email: "",
      name: "",
      lastName: "",
      dni: "",
      phoneNumber: "",
      address: "",
      houseNumber: "",
      floor: "",
      city: "",
      apartment: "",
      province: "",
      shippingId: -1,
      shippingMethod: "",
      shippingDetails: "",
      shippingPrice: 0,
    },

    payment: {
      paymentMethod: "",
      totalPrice: 0,
    },
    notes: "",
    stage: "",
    paid: false,
    complete: false,
  },
};
export default function CheckoutReview() {
  const [form, setForm] = useState<Form>(initialForm);
  const router = useRouter();
  useEffect(() => {
    const data = localStorage.getItem("myData");
    if (!data) {
      router.push("/");
      return;
    } else {
      const myData = JSON.parse(data);
      setForm(myData);
    }
  }, []);
  const makeText = (
    orderId: string,
    name: string,
    lastName: string,
    items: Cart[],
    method: string,
    notes: string,
    total: string
  ): string => {
    return `Hola!!%0AMi orden es: ${orderId}%0A*Informacion de envio*%0ANombre: ${name}%0AApellido: ${lastName}%0AItems: ${items.map(
      (item) =>
        item.name +
        " x " +
        item.count +
        " - " +
        ConvertToLocalePrice(item.price) +
        " = " +
        "$" +
        ConvertToLocalePrice(item.count * item.price) +
        "%0A"
    )} %0AMetodo de envio: ${method}%0ANotas: ${notes}%0ATotal: $${total}`;
  };
  const handleFinish = async () => {
    const bodyToSend = {
      email: form.formCheckout.shipping.email,
      name: form.formCheckout.shipping.name,
      last_name: form.formCheckout.shipping.lastName,
      dni: form.formCheckout.shipping.dni,
      phone_number: form.formCheckout.shipping.phoneNumber,
      addres_line: form.formCheckout.shipping.address,
      house_number: form.formCheckout.shipping.houseNumber,
      flor: form.formCheckout.shipping.floor,
      apartment: form.formCheckout.shipping.apartment,
      city: form.formCheckout.shipping.city,
      province: form.formCheckout.shipping.province,
      shipping_method: form.method.title,
      shipping_details: form.method.details,
      shipping_price: form.method.price,
      payment_method: form.formCheckout.payment?.paymentMethod,
      total_price: form.formCheckout.payment?.totalPrice,
      productsId: form.cart.map((item) => item.id),
      quantity: form.cart.map((item) => item.count),
      notes: form.formCheckout.notes,
      stage: "In process", //on the way - finished
      paid: false,
    };
    try {
      const res = await fetch("/api/auth/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyToSend),
      });
      const data = await res.json();
      if (data.status === 200) {
        const textToSend =
          form.formCheckout &&
          form.formCheckout.payment &&
          form.formCheckout.payment.totalPrice &&
          form.formCheckout.payment.totalPrice &&
          form.formCheckout.notes &&
          makeText(
            data.id,
            form.formCheckout.shipping.name,
            form.formCheckout.shipping.lastName,
            form.cart,
            form.method.title,
            form.formCheckout.notes,
            ConvertToLocalePrice(form.formCheckout.payment.totalPrice)
          );
        localStorage.removeItem("myData");
        router.push(`https://wa.me/543413525159?text=${textToSend}`);
      }
    } catch (error) {
      return new Error("Something went wrong");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col sm:self-center sm:w-2/3 md:w-2/3">
        <h2 className="text-xl font-bold mt-2">Envío</h2>
        <div className="bg-zinc-400 p-4 rounded-lg min-w-[340px] flex flex-col gap-2 mt-2">
          <section className="bg-zinc-600 rounded-lg p-3 min-w-[300px] text-zinc-200 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold">Email</h3>
              <p className="text-sm min-w-[100px] font-bold sm:text-md">
                {form.formCheckout.shipping.email}
              </p>
            </div>
            <button
              onClick={() => router.push("/checkout?stage=shipping")}
              className=" flex flex-col items-center p-1 rounded-lg"
            >
              <Image
                src={ImageEditSrc}
                alt="edit"
                width={35}
                height={35}
                unoptimized
              />
              <p className="text-xs text-zinc-200 font-medium">Cambiar</p>
            </button>
          </section>
          <section className="bg-zinc-600 rounded-lg p-3 min-w-[300px] text-zinc-200 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold">Método</h3>
              <p className="text-sm min-w-[100px] font-bold sm:text-md">
                {form.formCheckout.shipping.shippingMethod}
              </p>
            </div>
            <button
              onClick={() => router.push("/checkout?stage=shipping")}
              className=" flex flex-col items-center p-1 rounded-lg"
            >
              <Image
                src={ImageEditSrc}
                alt="edit"
                width={35}
                height={35}
                unoptimized
              />
              <p className="text-xs text-zinc-200 font-medium">Cambiar</p>
            </button>
          </section>
          <section className="bg-zinc-600 rounded-lg p-3 min-w-[300px] text-zinc-200 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold">Domicilio</h3>
              <p className="text-sm min-w-[100px] font-bold sm:text-md">
                {form.formCheckout.shipping.address}
              </p>
            </div>
            <button
              onClick={() => router.push("/checkout?stage=shipping")}
              className=" flex flex-col items-center p-1 rounded-lg"
            >
              <Image
                src={ImageEditSrc}
                alt="edit"
                width={35}
                height={35}
                unoptimized
              />
              <p className="text-xs text-zinc-200 font-medium">Cambiar</p>
            </button>
          </section>
        </div>
        <h2 className="text-xl font-bold mt-4">Pago</h2>
        <div className="bg-zinc-400 p-4 rounded-lg flex flex-col gap-2 mt-2 min-w-[340px]">
          <section className="bg-zinc-600 rounded-lg p-3 min-w-[300px] text-zinc-200 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold">Método</h3>
              <p className="text-sm min-w-[100px] font-bold sm:text-md">
                {form.formCheckout.payment?.paymentMethod}
              </p>
            </div>
            <button
              onClick={() => router.push("/checkout?stage=payment")}
              className=" flex flex-col items-center p-1 rounded-lg"
            >
              <Image
                src={ImageEditSrc}
                alt="edit"
                width={35}
                height={35}
                unoptimized
              />
              <p className="text-xs text-zinc-200 font-medium">Cambiar</p>
            </button>
          </section>
          <section className="bg-zinc-600 rounded-lg p-3 min-w-[300px] text-zinc-200 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold">Notas</h3>
              <p className="text-sm min-w-[100px] font-bold sm:text-md">
                {form.formCheckout.notes}
              </p>
            </div>
            <button
              onClick={() => router.push("/checkout?stage=payment")}
              className=" flex flex-col items-center p-1 rounded-lg"
            >
              <Image
                src={ImageEditSrc}
                alt="edit"
                width={35}
                height={35}
                unoptimized
              />
              <p className="text-xs text-zinc-200 font-medium">Cambiar</p>
            </button>
          </section>
        </div>
        <h2 className="text-xl font-bold mt-4">Resumen</h2>
        <div className="bg-zinc-400 p-4 rounded-lg flex flex-col gap-2 mt-2 min-w-[340px]">
          <section className="bg-zinc-600 rounded-lg p-3 min-w-[300px] text-zinc-200 flex justify-between items-center">
            {form.cart.map((prod, i) => (
              <div key={i}>
                <h3 className="text-xl font-bold">{prod.name}</h3>
                <p className="text-sm min-w-[100px] font-bold sm:text-md">
                  {"$" + ConvertToLocalePrice(prod.price)} x {prod.count} =
                  {" " + ConvertToLocalePrice(prod.price * prod.count)}
                </p>
              </div>
            ))}
          </section>
          <section className="bg-zinc-600 rounded-lg p-3 min-w-[300px] text-zinc-200 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold">Total</h3>
              {form.formCheckout.payment?.totalPrice && (
                <p className="text-sm min-w-[100px] font-bold sm:text-md">
                  {"$" +
                    ConvertToLocalePrice(form.formCheckout.payment.totalPrice) +
                    " + Envio"}
                </p>
              )}
            </div>
          </section>
        </div>
        <button
          onClick={handleFinish}
          className="bg-zinc-900 text-2xl p-4 rounded-lg text-zinc-200 font-bold text-center self-center my-4"
        >
          Continuar en Whatsapp
        </button>
      </div>
    </div>
  );
}
