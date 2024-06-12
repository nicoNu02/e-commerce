import { Product } from "@/types/types";
import Image from "next/image";
import { ConvertToLocalePrice } from "@/utils/convertion";
import Link from "next/link";
interface SearchModalProps {
  products: Product[] | [];
}
export default function SearchModal({ products }: SearchModalProps) {
  return (
    <div className="absolute w-full rounded-lg p-2 bg-zinc-800">
      {products.map((prod, i) => (
        <Link
          href={`/product/${prod.id}`}
          key={i}
          scroll={false}
          className="bg-zinc-200 text-zinc-900 p-1 sm:p-3 w-full flex  sm:flex-row gap-2 rounded z-[99]"
        >
          {prod.url && (
            <div className="w-12 h-auto">
              <Image
                className="w-full h-full"
                src={prod.url}
                alt={prod.name}
                width={50}
                height={50}
              />
            </div>
          )}
          <div className="flex flex-col">
            <p className="font-medium text-xs sm:text-sm">{prod.name}</p>
            <p className="text-sm font-bold">
              ${ConvertToLocalePrice(prod.price)}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
