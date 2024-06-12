"use client";

import { useState } from "react";

export function ClientDetails({ order }: { order: any }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        className="w-full bg-zinc-500 rounded-lg text-slate-200 font-bold p-2 text-center my-4"
        onClick={() => setOpen(!open)}
      >
        Detalles del cliente
      </button>
      {open && order && (
        <div className="flex flex-col gap-2 bg-white rounded-lg p-4">
          <span>
            <h4 className="font-bold">Email</h4>
            <p className="text-xs font-medium">{order.email}</p>
          </span>
          <span>
            <h4 className="font-bold">Nombre</h4>
            <p className="text-xs font-medium">
              {order.name} {order.lastName}
            </p>
          </span>
          <span>
            <h4 className="font-bold">DNI</h4>
            <p className="text-xs font-medium">{order.dni}</p>
          </span>
          <span>
            <h4 className="font-bold">Teléfono</h4>
            <p className="text-xs font-medium">{order.phone_number}</p>
          </span>
          <span>
            <h4 className="font-bold">Dirección</h4>
            <p className="text-xs font-medium">
              {order.addres_line} {order.house_number} {order.flores}{" "}
              {order.apartment} {order.city} {order.province}
            </p>
          </span>
          <span>
            <h4 className="font-bold">Método de envío</h4>
            <p className="text-xs font-medium">{order.shipping_method}</p>
          </span>
          <span>
            <h4 className="font-bold">Método de pago</h4>
            <p className="text-xs font-medium">{order.payment_method}</p>
          </span>
          <span>
            <h4 className="font-bold">Notas de envío</h4>
            <p className="text-xs font-medium">{order.notes}</p>
          </span>
        </div>
      )}
    </div>
  );
}
