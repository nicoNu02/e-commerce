import ModalProductsPage from "@/app/components/ModalProductsPage";
import ProductModalSkeleton from "@/app/components/ProductModalSkeleton";
import { Suspense } from "react";

export default function ProductPage({
  params,
  searchParams,
}: {
  searchParams: { img?: string; modal?: string; cart?: string };
  params: { productId: string };
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
