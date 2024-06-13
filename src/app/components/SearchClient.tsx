"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { FetchOrdersByName } from "../../../fetchData";
import OrderDetails from "./OrderDetails";

export default function SearchClient() {
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState([]);
  const [orderProducts, setOrderProducts] = useState([]);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    return;
  };
  const debounced = useDebouncedCallback((e) => {
    const fullName = e.target.value;
    const splitedName = fullName.split(" ");
    const lastName = splitedName[1];
    const name = splitedName[0];
    const fetchOrders = async () => {
      if (!name) {
        setOrderProducts([]);
        setOrders([]);
        return;
      }
      const response = await FetchOrdersByName(name, lastName);
      setOrders(response.orders);
      setOrderProducts(response.orderProducts);
    };
    fetchOrders();
  }, 500);
  return (
    <div className="flex flex-col p-2 rounded-lg">
      <form
        className="flex flex-col rounded-lg"
        onSubmit={(e) => handleSubmit(e)}
      >
        <label htmlFor="name">Buscar por nombre de cliente</label>
        <input
          type="text"
          name="name"
          id="name"
          className="w-full p-2 rounded-lg border-2 border-zinc-200"
          value={search}
          onChange={(e) => {
            handleChange(e);
            debounced(e);
          }}
        />
      </form>
      {orders &&
        orders.map((order, i) => {
          return (
            <OrderDetails
              key={i}
              order={order}
              // @ts-ignore
              orderProducts={orderProducts.filter(
                // @ts-ignore
                (orderProduct) => orderProduct.orderId === order.id
              )}
            />
          );
        })}
    </div>
  );
}
