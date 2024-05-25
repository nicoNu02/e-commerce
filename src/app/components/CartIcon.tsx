"use client";
import Image from "next/image";
import { useAppContext } from "../contexts";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const CartIcon = () => {
  const { cart } = useAppContext();
  const path = usePathname();
  const params = useSearchParams();
  const { push } = useRouter();
  const cartItems = cart.length;

  const handleClick = () => {
    const searchParams = new URLSearchParams(params);
    searchParams.set("cart", "open");
    push(`${path}?${searchParams.toString()}`, { scroll: false });
  };
  return (
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
  );
};

export default CartIcon;
