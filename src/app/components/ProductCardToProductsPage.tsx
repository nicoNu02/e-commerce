import { Suspense } from "react";
import Loading from "./Loading";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch } from "@/libs/redux/hooks";
import { setSelectedProduct } from "@/libs/redux/actions/products";

export default function ProductCardToProductsPage({
  idx,
  name,
  price,
  url,
}: {
  name: string;
  idx: string;
  price: string;
  url: string | null;
}) {
  const dispatch = useAppDispatch();
  const handleClickBuy = () => {
    dispatch(setSelectedProduct({ id: idx }));
  };
  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-col items-center h-32 w-full px-0 md:px-0 lg:px-0">
        <div className="w-full h-48 flex justify-center p-3 relative">
          <Image
            //@ts-ignore
            src={url}
            alt={name}
            className="rounded-lg aspect-square w-32 max-w-32"
            width={32}
            height={32}
            sizes="(max-width: 380px) 380px"
          />
        </div>
      </div>
      <div className="flex flex-col items-center w-full sm:justify-center text-white">
        {/* 35 character limit prevents text overflow */}
        <h5 className="text-center h-12 flex flex-col items-center justify-center px-1 font-medium text-sm sm:text-normal">
          {name}
        </h5>
        <p className="">
          <b>${price}</b>
        </p>
        <Link
          onClick={handleClickBuy}
          href={"/products/" + idx + "?modal=open&img=0"}
          scroll={false}
          className="bg-pink border rounded-2xl text-white w-3/4 h-8 flex items-center justify-center mb-4 mt-2 font-bold text-xs sm:text-sm "
        >
          Comprar
        </Link>
      </div>
    </Suspense>
  );
}
