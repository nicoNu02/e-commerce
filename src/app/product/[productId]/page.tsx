import Modal from "@/app/components/Modal";
import ProductModalSkeleton from "@/app/components/ProductModalSkeleton";
import Image from "next/image";
import { Suspense } from "react";

export default function ProductPage({
  params,
  searchParams,
}: {
  params: { productId: string };
  searchParams: { img?: string; modal?: string; cart?: string };
}) {
  // const product = PRODUCTS[Number(params.productId)];
  return (
    <>
      <div className="h-lvh w-lvw bg-black">
        <Suspense fallback={<ProductModalSkeleton />}>
          <Modal searchParams={searchParams} params={params}></Modal>
        </Suspense>
      </div>
    </>
  );
}
