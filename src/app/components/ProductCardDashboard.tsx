import { ConvertToLocalePrice } from "@/utils/convertion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FetchColorsByProductId } from "../../../fetchData";

export default function ProductCardDashboard({
  url,
  name,
  price,
  id,
  fetchProducts,
}: {
  url: string | null;
  name: string;
  price: number;
  id: string;
  fetchProducts: () => void;
}) {
  const [colors, setColors] = useState<any>([]);
  useEffect(() => {
    const fetchColors = async () => {
      const response = await fetch("/api/auth/color?productId=" + id)
        .then((res) => res.json())
        .then((res) => res.body);
      setColors(response);
    };
    fetchColors();
  }, []);
  const handleDelete = async () => {
    const response = await fetch("/api/auth/product?id=" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => res.body);
    fetchProducts();
    console.log(response);
  };
  return (
    <>
      <div className=" bg-zinc-200 rounded-lg flex flex-col items-center p-2">
        <div className="w-32 h-32 relative">
          <Image
            src={url || ""}
            alt="product image"
            fill
            sizes="max-width(200px), 200px"
          />
        </div>
        <h2 className="font-bold text-sm">{name}</h2>
        <h3 className="text-sm font-bold">{ConvertToLocalePrice(price)}</h3>
        <div className="flex items-center justify-center gap-2 w-full flex-wrap">
          {colors.map((color: any) => (
            <div
              key={color.id}
              className="flex flex-col items-center justify-center"
            >
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: color.code }}
              ></div>
              <div className="text-sm font-bold">{color.name}</div>
            </div>
          ))}
        </div>
        <button className="bg-cyan-600 text-white w-full p-2 rounded font-bold my-2">
          Editar Producto
        </button>
        <button
          className="bg-red-600 text-white w-full p-2 rounded font-bold"
          onClick={handleDelete}
        >
          Eliminar Producto
        </button>
      </div>
    </>
  );
}
