"use client";
import Image from "next/image";
import cartIcon from "../../assets/cartIcon.svg";
import { useAppContext } from "../contexts";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const CartIcon = () => {
  const { cart } = useAppContext();
  const path = usePathname();
  const params = useSearchParams();
  const { replace } = useRouter();
  const cartItems = cart.length;

  const handleClick = () => {
    const searchParams = new URLSearchParams(params);
    searchParams.set("cart", "open");
    replace(`${path}?${searchParams.toString()}`);
  };
  return (
    <button className="relative" onClick={handleClick}>
      {cartItems > 0 ? (
        <span className="absolute top-[-15px] right-[-15px] bg-[red] rounded-full p-1 w-6 h-6 text-center font-bold flex justify-center items-center font-mono">
          <span className="leading-none text-white	">{cartItems}</span>
        </span>
      ) : null}
      <Image src={cartIcon} alt="cart-icon" unoptimized />
    </button>
  );
};

export default CartIcon;
