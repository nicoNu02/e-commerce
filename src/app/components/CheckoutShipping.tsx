"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import CheckoutNextButton from "./CheckoutNextButton";
import ShippingMethod from "./ShippingMethod";
import { FormCheckout, Method } from "@/types/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import { createOrder, orderState, setMethod } from "@/libs/redux";
const initialForm = {
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
  shippingMethod: "",
  shippingId: -1,
  shippingDetails: "",
  shippingPrice: 0,
};
const methods: Method[] = [
  {
    id: 0,
    title: "Envio a acordar con el vendedor",
    price: 990,
    details: "Por el momento solo realizamos envios a Rosario y alrededores",
  },
  {
    id: 1,
    title: "Envio a sucursal",
    price: 980,
    details: "3 a 5 dias habiles",
  },
  {
    id: 2,
    title: "Retiro en local",
    price: 970,
    details: "1 a 3 dias habiles",
  },
];

export default function CheckoutShipping() {
  const params = useSearchParams();
  const router = useRouter();
  const { orderForm } = useAppSelector(orderState);
  const dispatch = useAppDispatch();

  const [form, setForm] = useState<FormCheckout>({
    shipping: orderForm.shipping,
  });
  const [selected, setSelected] = useState(-1);
  useEffect(() => {
    const data = localStorage.getItem("myData");
    if (data) {
      const myData = JSON.parse(data);
      setSelected(myData.method.id);
      if (myData.formCheckout) {
        setForm({ shipping: myData.formCheckout.shipping });
        setSelected(myData.formCheckout.shipping.shippingId);
      }
    } else {
      router.push("/");
      return;
    }
  }, []);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      shipping: { ...form.shipping, [e.target.name]: e.target.value },
    });
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selected === -1) {
      return;
    }
    const newParams = new URLSearchParams(params);
    const actualParam = newParams.get("stage");
    if (!actualParam) {
      newParams.set("stage", "shipping");
    } else if (actualParam == "shipping") {
      newParams.set("stage", "payment");
    } else if (actualParam == "payment") {
      newParams.set("stage", "review");
    } else newParams.set("stage", "shipping");
    router.push(`/checkout?${newParams.toString()}`);

    dispatch(
      createOrder({
        ...form,
        shipping: {
          ...form.shipping,
          shippingMethod: methods[selected].title,
          shippingDetails: methods[selected].details,
          shippingPrice: methods[selected].price,
          shippingId: selected,
        },
      })
    );
  };
  const handleChangeMethodShipping = (id: number) => {
    setSelected(id);
    const method = methods[id];
    dispatch(setMethod(method));
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <form
        className="w-full md:w-full lg:w-10/12 flex flex-col  mt-8 bg-primary p-2 sm:p-8 rounded-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-lg sm:text-2xl  font-bold text-zinc-200 mt-2 mb-2">
          Contacto
        </h2>
        <div className="flex flex-col">
          <label
            className="text-xs sm:text-base text-zinc-200 mb-1 font-bold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
            required
            className="w-full bg-zinc-200 pl-4 h-9 rounded-md "
            type="email"
            name="email"
            id="email"
            value={form.shipping.email}
          />
        </div>
        <div className="text-zinc-200 mt-8">
          {methods.map((method) => (
            <ShippingMethod
              id={method.id}
              details={method.details}
              title={method.title}
              price={method.price}
              handleClick={handleChangeMethodShipping}
              key={method.id}
              selected={selected}
            />
          ))}
        </div>
        <h2 className="text-lg sm:text-2xl  font-bold text-zinc-200 mt-8 mb-2">
          Datos del destinatario
        </h2>
        <div className="flex flex-wrap">
          <div className="flex flex-col sm:w-[calc(50%-1rem)] w-[calc(50%-2px)] mr-[4px] sm:mr-8  box-border">
            <label
              className="text-xs sm:text-base text-zinc-200 mb-1 font-bold"
              htmlFor="name"
            >
              Nombre
            </label>
            <input
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
              required
              className=" w-full bg-zinc-200 pl-4 h-9 rounded-md "
              type="text"
              name="name"
              id="name"
              value={form.shipping.name}
            />
          </div>
          <div className="flex flex-col sm:w-[calc(50%-1rem)] w-[calc(50%-2px)] ">
            <label
              className="text-xs sm:text-base text-zinc-200 mb-1 font-bold"
              htmlFor="lastName"
            >
              Apellido
            </label>
            <input
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
              required
              className=" w-full bg-zinc-200 pl-4 h-9 rounded-md "
              type="text"
              name="lastName"
              id="lastName"
              value={form.shipping.lastName}
            />
          </div>
          <div className="flex flex-col sm:w-[calc(50%-1rem)] w-[calc(50%-2px)] mr-[4px] sm:mr-8">
            <label
              htmlFor="dni"
              className="text-xs sm:text-base text-zinc-200 mb-1 mt-4 font-bold"
            >
              DNI
            </label>
            <input
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
              required
              className="w-full bg-zinc-200 pl-4 h-9 rounded-md "
              type="text"
              name="dni"
              id="dni"
              value={form.shipping.dni}
            />
          </div>
          <div className="flex flex-col sm:w-[calc(50%-1rem)] w-[calc(50%-2px)] ">
            <label
              className="text-xs sm:text-base text-zinc-200 mb-1 mt-4 font-bold"
              htmlFor="phoneNumber"
            >
              Telefono
            </label>
            <input
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
              required
              className=" w-full bg-zinc-200 pl-4 h-9 rounded-md "
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              value={form.shipping.phoneNumber}
            />
          </div>
        </div>
        <h2 className="text-lg sm:text-2xl  font-bold text-zinc-200 mt-8 mb-2">
          Domicilio del destinatario
        </h2>
        <div className="flex flex-col ">
          <label
            className="text-xs sm:text-base text-zinc-200 mb-1 font-bold"
            htmlFor="address"
          >
            Dirección
          </label>
          <input
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
            required
            className=" w-full bg-zinc-200 pl-4 h-9 rounded-md "
            type="text"
            name="address"
            id="address"
            value={form.shipping.address}
          />
        </div>
        <div className="flex flex-col sm:w-[calc(50%-1rem)] w-[calc(50%-2px)] ">
          <label
            className="text-xs sm:text-base text-zinc-200 mb-1 mt-4 font-bold"
            htmlFor="houseNumber"
          >
            Numero
          </label>
          <input
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
            required
            className=" w-full bg-zinc-200 pl-4 h-9 rounded-md "
            type="text"
            name="houseNumber"
            id="houseNumber"
            value={form.shipping.houseNumber}
          />
        </div>
        <div className="w-full flex flex-wrap">
          <div className="flex flex-col sm:w-[calc(50%-1rem)] w-[calc(50%-2px)] mr-[4px] sm:mr-8">
            <label
              className="text-xs sm:text-base text-zinc-200 mb-1 mt-4 font-bold"
              htmlFor="floor"
            >
              Piso (opcional)
            </label>
            <input
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
              className=" w-full bg-zinc-200 pl-4 h-9 rounded-md "
              type="text"
              name="floor"
              id="floor"
              value={form.shipping.floor}
            />
          </div>
          <div className="flex flex-col sm:w-[calc(50%-1rem)] w-[calc(50%-2px)] ">
            <label
              className="text-xs sm:text-base text-zinc-200 mb-1 mt-4 font-bold"
              htmlFor="city"
            >
              Ciudad
            </label>
            <input
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
              required
              className=" w-full bg-zinc-200 pl-4 h-9 rounded-md "
              type="text"
              name="city"
              id="city"
              value={form.shipping.city}
            />
          </div>
          <div className="flex flex-col sm:w-[calc(50%-1rem)] w-[calc(50%-2px)] mr-[4px] sm:mr-8">
            <label
              className="text-xs sm:text-base text-zinc-200 mb-1 mt-4 font-bold"
              htmlFor="apartment"
            >
              Dpto (opcional)
            </label>
            <input
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
              className=" w-full bg-zinc-200 pl-4 h-9 rounded-md "
              type="text"
              name="apartment"
              id="apartment"
              value={form.shipping.apartment}
            />
          </div>
          <div className="flex flex-col sm:w-[calc(50%-1rem)] w-[calc(50%-2px)] ">
            <label
              className="text-xs sm:text-base text-zinc-200 mb-1 mt-4 font-bold"
              htmlFor="province"
            >
              Provincia
            </label>
            <input
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
              required
              className=" w-full bg-zinc-200 pl-4 h-9 rounded-md "
              type="text"
              name="province"
              id="province"
              value={form.shipping.province}
            />
          </div>
        </div>
        <div className="flex justify-center items-center mt-4">
          <CheckoutNextButton text="Continuar" />
        </div>
      </form>
    </div>
  );
}
