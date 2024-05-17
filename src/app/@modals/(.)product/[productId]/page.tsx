import Modal from "@/app/components/Modal";
import { PRODUCTS } from "@/products/products";
import Image from "next/image";
import Link from "next/link";

export default function ProductPage({
  params,
  searchParams,
}: {
  params: { productId: string };
  searchParams: { img?: string; modal?: string };
}) {
  const product = PRODUCTS[Number(params.productId)];
  const queryParams = searchParams;
  const actualImage = Number(queryParams?.img) || 0;
  return (
    <Modal>
      <Link href={"/"} className="w-full h-screen fixed top-0 left-0 z-10" />
      <div className=" box-border z-50 bg-white h-3/4 w-3/4 flex flex-col p-8 overflow-scroll">
        <div className="max-w-96 size-5/6 place-self-center flex justify-center items-center">
          <Image
            className="w-full h-auto rounded-lg"
            src={product.src[actualImage]}
            alt={product.desc}
            priority
          />
        </div>
        <div className="flex">
          {product.src.map((it, i) => {
            return (
              <Link
                key={i}
                href={`/product/${params.productId}?img=${i}&modal=open`}
              >
                <Image src={it} alt={product.desc} width={50} />
              </Link>
            );
          })}
        </div>
        <h2 className="text-2xl font-bold">{product.name}</h2>
        <div className="flex">
          {product.color.map((color, i) => {
            return (
              <div
                key={i}
                className={`bg-${color} w-6 h-6 rounded-full border-2`}
              ></div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
}
