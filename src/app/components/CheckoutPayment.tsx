"use client";

import { ChangeEvent, useEffect, useState } from "react";
import PaymentMethods from "./PaymentMethods";
import CheckoutNextButton from "./CheckoutNextButton";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useAppContext } from "../contexts";

const paymentMethods = [
  {
    id: 0,
    title: "Transferencia bancaria",
    details:
      "De todos los bancos, necesitas enviar el comprobante por whatsapp para confirmar tu pedido",
  },
  {
    id: 1,
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
  const { cart, handleUpdateFormCheckout, formCheckout } = useAppContext();
  const [selected, setSelected] = useState(-1);
  const [form, setForm] = useState({
    paymentMethod: "",
    totalPrice: 0,
    notes: "",
  });

  useEffect(() => {
    const data = localStorage.getItem("myData");
    if (data) {
      const myData = JSON.parse(data);
      const methodId =
        myData.formCheckout.payment?.paymentMethod === "Transferencia bancaria"
          ? 0
          : 1;
      if (myData.formCheckout.payment) {
        setForm({
          paymentMethod: myData.formCheckout.payment.paymentMethod,
          totalPrice: myData.formCheckout.payment.totalPrice,
          notes: myData.formCheckout.notes,
        });
        setSelected(methodId);
      }
    }
  }, []);
  const handleChangeNotes = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selected === -1) {
      return;
    }
    const paymentMethod = paymentMethods[selected].title;

    let total = 0;
    cart.map((prod) => (total = total + prod.price * prod.count));
    setForm({ paymentMethod, totalPrice: total, notes: form.notes });
    if (!formCheckout) return;
    handleUpdateFormCheckout({
      ...formCheckout,
      payment: {
        ...formCheckout.payment,
        paymentMethod: paymentMethod,
        totalPrice: total,
      },
      notes: form.notes,
    });
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
    <form onSubmit={handleSubmit} className="w-full h-full">
      <h2 className="text-2xl font-bold">Metodo de pago</h2>
      <div className="w-full flex flex-col">
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
      {selected !== -1 && selected === 0 ? (
        <div>
          <div className="w-full flex flex-col p-4 bg-zinc-800 mt-4 rounded-lg ">
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
      ) : null}
      <div className="w-full flex flex-col p-4 bg-zinc-800 mt-4 rounded-lg">
        <h2 className="text-2xl font-bold mt-4 text-zinc-200">
          Notas del pedido
        </h2>
        <textarea
          placeholder="Notas adicionales (opcional)"
          name="notes"
          id="notes"
          className="w-full h-32 border-2 border-zinc-800 rounded-lg p-4 mt-2"
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            handleChangeNotes(e)
          }
          value={form.notes}
        ></textarea>
        <div className="w-full flex flex-col items-center mt-4">
          <CheckoutNextButton text="Continuar" />
        </div>
      </div>
    </form>
  );
}
