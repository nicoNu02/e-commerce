import { ConvertToLocalePrice } from "@/utils/convertion";
import Image from "next/image";

export default function ProductListOrder({ products, colors }: any) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {products.map((product: any) => (
        <>
          <div
            key={product.id}
            className="flex flex-col items-center bg-zinc-500 p-2 rounded-lg"
          >
            <Image
              src={product.url}
              alt={product.name}
              width={100}
              height={100}
              className="rounded-md"
            />
            <p className="text-sm font-bold text-zinc-200 text-center mt-2">
              {product.name}
            </p>
            <div className="flex gap-2 flex-wrap">
              {colors &&
                colors.map((color: any) => (
                  <div
                    key={color.id}
                    className="flex flex-col items-center justify-center"
                  >
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: color.code }}
                    ></div>
                    <p className="text-xs font-bold text-zinc-200 text-center">
                      {color.name}
                    </p>
                  </div>
                ))}
            </div>
            <p className="text-sm font-bold text-zinc-200 text-center mt-2">
              {product.count} x ${ConvertToLocalePrice(product.price)}
            </p>
          </div>
        </>
      ))}
    </div>
  );
}
