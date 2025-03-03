"use client";

import { Suspense } from "react";
import Loading from "@/app/components/Loading";
import ProductsContent from "./ProductsContent";

export default function Products() {
  return (
    <Suspense fallback={<Loading />}>
      <ProductsContent />
    </Suspense>
  );
}
