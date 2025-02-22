"use client";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import CartModal from "./CartModal";
import { useAppSelector } from "@/libs/redux/hooks";
import { orderState } from "@/libs/redux";

const CartIcon = () => {
  const [open, setOpen] = useState(false);
  const { cart } = useAppSelector(orderState);
  const params = useSearchParams();
  const path = usePathname();
  const cartItems = cart.length;
  useEffect(() => {
    if (params.get("cart") == "open") setOpen(true);
  }, [params]);
  const handleClick = () => {
    const searchParams = new URLSearchParams(params);
    if (params.get("cart") == "open") {
      searchParams.delete("cart");
      setOpen(false);
    } else {
      searchParams.set("cart", "open");
      setOpen(true);
    }
    window.history.pushState(null, "", `?${searchParams.toString()}`);
  };
  return (
    <>
      <button className="relative" onClick={handleClick}>
        {cartItems > 0 ? (
          <span className="absolute top-[-15px] right-[-15px] bg-[red] rounded-full p-1 w-6 h-6 text-center font-bold flex justify-center items-center font-mono">
            <span className="leading-none text-white	">{cartItems}</span>
          </span>
        ) : null}
        <Image
          src="https://u8v8yhe8bp8fkg64.public.blob.vercel-storage.com/cartIcon-ZL0CnRIbycmSt6i4dnWY1XVgAxPrtm.svg"
          alt="cart-icon"
          width={19}
          height={19}
          unoptimized
        />
      </button>
      <CartModal path={path} isOpen={open} handleClose={handleClick} />
    </>
  );
};

export default CartIcon;
