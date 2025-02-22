"use client";

import Loading from "@/app/components/Loading";
import Modal from "@/app/components/Modal";

import { useSearchParams } from "next/navigation";

export default function ProductPage() {
  const searchParams = useSearchParams();
  console.log(searchParams);

  return (
    <>
      <div className="h-lvh w-lvw bg-white">
        <div className="w-full h-full flex justify-center items-center">
          <Loading />;
        </div>
        <Modal searchParams={searchParams} />
      </div>
    </>
  );
}
