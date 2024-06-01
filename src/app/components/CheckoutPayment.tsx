"use client";

import { useState } from "react";
import PaymentMethods from "./PaymentMethods";
import CheckoutNextButton from "./CheckoutNextButton";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const paymentMethods = [
  {
    id: 0,
    title: "Mercado Pago",
    details:
      "Necesitas enviar el comprobante por whatsapp para confirmar tu pedido",
  },
  {
    id: 1,
    title: "Transferencia bancaria",
    details:
      "De todos los bancos, necesitas enviar el comprobante por whatsapp para confirmar tu pedido",
  },
  {
    id: 2,
    title: "Efectivo",
    details: "Coordinando con nosotros, via whatsappp",
  },
];
const sellerDetails = {
  fullName: "Miriam Angelica Aranda",
  dni: "12345678",
  phoneNumber: "123456789",
  cbu: "1234567891234567891212",
};
export default function CheckoutPayment() {
  const params = useSearchParams();
  const router = useRouter();
  const [selected, setSelected] = useState(-1);
  const [form, setForm] = useState({
    paymentMethod: "",
    totalPrice: undefined,
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
  };
  const handleClick = (id: number) => {
    setSelected(id);
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold">Metodo de pago</h2>
      <div className="w-full flex flex-col sm:p-4">
        {paymentMethods.map((method) => (
          <PaymentMethods
            key={method.id}
            details={method.details}
            title={method.title}
            id={method.id}
            handleClick={handleClick}
            selected={selected}
          />
        ))}
      </div>
      {selected !== -1 && selected !== 0 ? (
        <div>
          <div className="w-full flex flex-col p-4 bg-zinc-800 mt-4 rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-zinc-200">
              Detalles del vendedor
            </h2>
            <div className="w-full flex flex-col bg-zinc-200 rounded-lg p-4">
              <h3 className="text-lg font-bold">Nombre Completo:</h3>
              <p className="text-sm font-medium">{sellerDetails.fullName}</p>
              <h3 className="text-lg font-bold">DNI:</h3>
              <p className="text-sm font-medium"> {sellerDetails.dni}</p>
              <h3 className="text-lg font-bold">Celular:</h3>
              <p className="text-sm font-medium">{sellerDetails.phoneNumber}</p>
              <h3 className="text-lg font-bold">CBU:</h3>
              <p className="text-sm font-medium">{sellerDetails.cbu}</p>
            </div>
          </div>
        </div>
      ) : selected === 0 ? (
        <div>Mercado pago method</div>
      ) : null}
      <div className="w-full flex flex-col p-4 bg-zinc-800 mt-4 rounded-lg">
        <h2 className="text-2xl font-bold mt-4 text-zinc-200">
          Notas del pedido
        </h2>
        <textarea
          name="notes"
          id="notes"
          className="w-full h-32 border-2 border-zinc-800 rounded-lg p-4 mt-2"
        ></textarea>
        <div className="w-full flex flex-col items-center mt-4">
          <CheckoutNextButton text="Continuar" />
        </div>
      </div>
    </form>
  );
}
