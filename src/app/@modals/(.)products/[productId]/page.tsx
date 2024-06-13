import ModalProductsPage from "@/app/components/ModalProductsPage";
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
      <ModalProductsPage
        searchParams={searchParams}
        params={params}
      ></ModalProductsPage>
    </Suspense>
  );
}
