import CreateProduct from "@/app/components/CreateProduct";
import Header from "@/app/components/Header";
import SearchProduct from "@/app/components/SearchProduct";
import Loading from "@/app/components/loading";
import { Suspense } from "react";

export default function Products() {
  return (
    <Suspense fallback={<Loading />}>
      <article className="flex flex-col">
        <Header />
        <div className="p-8">
          <h1 className="text-2xl font-bold">Productos</h1>
          <SearchProduct />
          <h1 className="text-2xl font-bold">Crear Producto</h1>
          <CreateProduct />
        </div>
      </article>
    </Suspense>
  );
}
