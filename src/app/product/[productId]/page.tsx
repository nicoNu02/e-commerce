import Modal from "@/app/components/Modal";
import Image from "next/image";

export default function ProductPage({
  params,
}: {
  params: { productId: string };
}) {
  // const product = PRODUCTS[Number(params.productId)];
  return (
    <>
      <div className="h-1/2">
        {/* <Image
          className="h-full w-auto rounded-lg"
          src={product.src[0]}
          alt={product.desc}
          priority
        />
      </div>
      <div>
        <Image src={product.src[0]} alt={product.desc} />
        <Image src={product.src[0]} alt={product.desc} />
        <Image src={product.src[0]} alt={product.desc} />
      </div>
      <h2>{product.name}</h2>
      <div>
        {product.color.map((color, i) => {
          return (
            <div key={i} className={`bg-${color} rounded-full w-4 h-4`}></div>
          );
        })} */}
      </div>
    </>
  );
}
