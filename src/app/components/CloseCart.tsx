"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const CloseCart = () => {
  const path = usePathname();
  const params = useSearchParams();
  const { replace } = useRouter();

  const handleClick = () => {
    const searchParams = new URLSearchParams(params);
    searchParams.delete("cart");
    replace(`${path}?${searchParams.toString()}`);
  };
  return (
    <button onClick={handleClick} className="mb-4 font-bold text-xl text-white">
      X
    </button>
  );
};

export default CloseCart;
