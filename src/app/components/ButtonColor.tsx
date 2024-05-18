"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const ButtonColor = ({ col }: { col: string }) => {
  const pathname = usePathname();
  const params = useSearchParams();
  const { replace } = useRouter();
  const handleColorChange = (col: string) => {
    const searchParams = new URLSearchParams(params);
    if (col) {
      searchParams.set("color", col);
    } else {
      searchParams.delete("color");
    }
    replace(`${pathname}?${searchParams.toString()}`);
  };
  return (
    <button
      className={`bg-${col} w-6 h-6 rounded-full border-2`}
      onClick={() => handleColorChange(col)}
    ></button>
  );
};

export default ButtonColor;
