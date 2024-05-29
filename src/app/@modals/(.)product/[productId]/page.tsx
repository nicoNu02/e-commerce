import AddItemCounter from "@/app/components/AddItemCounter";
import ButtonSubmit from "@/app/components/ButtonSubmit";
import Modal from "@/app/components/Modal";
import ProductModalSkeleton from "@/app/components/ProductModalSkeleton";

import { Suspense } from "react";
export default async function ProductPage({
  params,
  searchParams,
}: {
  params: { productId: string };
  searchParams: { img?: string; modal?: string; cart?: string };
}) {
  return (
    <Suspense fallback={<ProductModalSkeleton />}>
      <Modal searchParams={searchParams} params={params}></Modal>
    </Suspense>
  );
}
