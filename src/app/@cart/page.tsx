"use client";
import { usePathname } from "next/navigation";
import CartBody from "../components/CartBody";
import CloseCart from "../components/CloseCart";

export default function CartPage({
  searchParams,
}: {
  searchParams: {
    cart: string;
    modal: string;
  };
}) {
  const path = usePathname();
  const visible =
    searchParams.cart === "open" &&
    searchParams.modal != "open" &&
    !path.includes("/product/");
  return (
    <div
      className={
        visible
          ? "w-full h-dvh bg-black fixed top-0 right-0 z-50 transition ease-in-out delay-70 opacity-100 p-8 sm:w-full lg:w-3/6 md:w-4/6"
          : "w-full h-dvh bg-black fixed top-0 right-0 translate-x-[100%] z-50 transition ease-in delay-50 opacity-0 sm:w-full lg:w-3/6 md:w-4/6"
      }
    >
      {visible && (
        <>
          <CloseCart />
          <CartBody />
        </>
      )}
    </div>
  );
}
