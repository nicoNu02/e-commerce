import AddItemCounter from "@/app/components/AddItemCounter";
import ButtonSubmit from "@/app/components/ButtonSubmit";
import Modal from "@/app/components/Modal";

import { Suspense } from "react";
export default async function ProductPage({
  params,
  searchParams,
}: {
  params: { productId: string };
  searchParams: { img?: string; modal?: string; cart?: string };
}) {
  return (
    <Suspense
      fallback={
        <div className="w-full h-screen fixed top-0 left-0 z-[30] flex flex-col items-center justify-center backdrop-blur-sm color">
          <div className="box-border z-[90] bg-white h-5/6 w-3/4 flex flex-col p-8 overflow-scroll">
            <div className="w-full h-full rounded-lg place-self-center flex justify-center items-center relative mb-4 bg-slate-400 md:w-1/2 lg:w-1/2"></div>
            <div className="relative size-20 bg-slate-400"></div>
            <h2 className="text-2xl font-bold bg-slate-400 text-slate-400 rounded-lg">
              aslkdjalksjda
            </h2>
            <AddItemCounter />
            <button
              type="button"
              className="bg-black text-white px-9 py-4 rounded"
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      }
    >
      <Modal searchParams={searchParams} params={params}></Modal>
    </Suspense>
  );
}
