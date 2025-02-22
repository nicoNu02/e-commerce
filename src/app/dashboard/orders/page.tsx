import Header from "@/app/components/Header";
import SearchClient from "@/app/components/SearchClient";
import Loading from "@/app/components/Loading";
import { Suspense } from "react";

export default function Orders() {
  return (
    <Suspense fallback={<Loading />}>
      <article className="h-full">
        <Header />
        <h1 className="text-2xl font-bold p-4">Pedidos</h1>
        <SearchClient />
      </article>
    </Suspense>
  );
}
