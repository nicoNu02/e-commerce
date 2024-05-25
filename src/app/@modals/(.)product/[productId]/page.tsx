import AddItemCounter from "@/app/components/AddItemCounter";
import ButtonColor from "@/app/components/ButtonColor";
import ButtonSubmit from "@/app/components/ButtonSubmit";
import Modal from "@/app/components/Modal";
import Image from "next/image";
import Link from "next/link";
import { FetchImagesById, FetchProductById } from "../../../../../fetchData";
export default async function ProductPage({
  params,
  searchParams,
}: {
  params: { productId: string };
  searchParams: { img?: string; modal?: string; cart?: string };
}) {
  const product = await FetchProductById(params.productId);
  const images = await FetchImagesById(params.productId);
  console.log(images, product);
  const queryParams = searchParams;
  const actualImage = Number(queryParams.img);
  return (
    product && (
      <Modal>
        <div className=" box-border z-[90] bg-white h-5/6 w-3/4 flex flex-col p-8 overflow-scroll">
          <div className="w-1/2 h-full place-self-center flex justify-center items-center relative mb-4 ">
            <Image
              className="rounded-lg"
              src={images[actualImage].url}
              alt={product.name}
              fill
              sizes="(max-width: 900px) 900px "
              priority
            />
          </div>
          <div className="flex">
            {images.map((it, i) => {
              return (
                <Link
                  key={i}
                  href={`/product/${params.productId}?img=${i}&modal=open`}
                  className="relative size-20"
                >
                  <Image
                    src={it.url}
                    alt={product.description}
                    fill
                    sizes="(max-width: 100px), 100px"
                  />
                </Link>
              );
            })}
          </div>
          <h2 className="text-2xl font-bold">{product.name}</h2>
          {/* <div className="flex">
            {product.color.map((color, i) => {
              return <ButtonColor key={i} col={color} />;
            })}
          </div> */}
          <AddItemCounter />
          <ButtonSubmit productId={product.id} />
        </div>
      </Modal>
    )
  );
}
