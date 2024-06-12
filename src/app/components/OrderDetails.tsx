import { useEffect, useState } from "react";
import { FetchColorsByProductId } from "../../../fetchData";
import ProductListOrder from "./ProductListOrder";
import { ConvertToLocalePrice } from "@/utils/convertion";
import { ClientDetails } from "./ClientDetails";
import { useDebouncedCallback } from "use-debounce";

export default function OrderDetails({ order, orderProducts }: any) {
  const [products, setProducts] = useState<any>([]);
  const [colors, setColors] = useState<any>([]);
  const [paid, setPaid] = useState(order.paid);
  const [stage, setStage] = useState(order.stage);
  const date = new Date(order.created_at);
  useEffect(() => {
    const fetchData = async () => {
      const fetchProducts = await orderProducts.map(
        async (orderProduct: any) => {
          const prod = await fetch(
            "/api/auth/product?id=" + orderProduct.productId
          )
            .then((res) => res.json())
            .then((res) => res.body);
          const color = await fetch(
            `/api/auth/color?productId=${orderProduct.productId}`
          )
            .then((res) => res.json())
            .then((res) => res.body);

          setColors([...colors, color[0]]);
          setProducts([
            ...products,
            { ...prod[0], count: orderProduct.quantity },
          ]);
          return prod;
        }
      );
    };
    fetchData();
  }, []);
  const handleClickPaid = () => {
    setPaid(!paid);
  };
  const handleClickStage = () => {
    if (stage === "En Proceso") {
      setStage("En Camino");
    } else if (stage === "En Camino") {
      setStage("Entregado");
    } else setStage("En Proceso");
  };
  const debouncedPaid = useDebouncedCallback((id: string) => {
    const changePaid = async () => {
      const response = await fetch("/api/auth/order?id=" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paid: paid }),
      })
        .then((res) => res.json())
        .then((res) => res.body);
    };

    changePaid();
  }, 1000);

  const debouncedStage = useDebouncedCallback((id: string) => {
    const changeStage = async () => {
      const response = await fetch("/api/auth/order?id=" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stage: stage }),
      })
        .then((res) => res.json())
        .then((res) => res.body);
    };
    changeStage();
  }, 1000);

  return (
    <div className="w-full bg-zinc-200 p-2 rounded-lg my-2">
      <h2 className="font-bold text-normal">Pedido: {order.id}</h2>
      <div className="w-full px-2 p-1 bg-white rounded-md font-medium">
        <p>{order.name + " " + order.last_name}</p>
      </div>
      <h2 className="font-bold text-sm my-2">
        Fecha:{" "}
        {date.getDate() +
          "/" +
          (date.getMonth() + 1) +
          "/" +
          date.getFullYear()}
        {" - "}
        {date.getHours() + ":" + date.getMinutes()}
      </h2>
      <ProductListOrder products={products} colors={colors} />
      <ClientDetails order={order} />
      <div className="flex justify-between items-end">
        <button
          onClick={() => {
            handleClickStage();
            debouncedStage(order.id);
          }}
          className={`w-32 ${
            stage === "Entregado"
              ? "bg-green-600"
              : stage === "En Camino"
              ? "bg-yellow-600"
              : "bg-orange-600"
          } p-2 rounded-lg text-zinc-200 font-bold h-12`}
        >
          {stage}
        </button>
        <div>
          <h2 className="font-bold text-sm my-2">
            Total: ${ConvertToLocalePrice(order.total_price)}
          </h2>
          <button
            onClick={() => {
              handleClickPaid();
              debouncedPaid(order.id);
            }}
            className={`w-32 h-12 p-2 rounded-lg text-zinc-200 font-bold ${
              paid ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {paid ? "Pagado" : "Pendiente"}
          </button>
        </div>
      </div>
    </div>
  );
}
