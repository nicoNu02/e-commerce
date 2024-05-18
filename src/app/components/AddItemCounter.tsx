"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const AddItemCounter = () => {
  const pathname = usePathname();
  const params = useSearchParams();
  const { replace } = useRouter();
  const handleChange = (cant: number) => {
    const searchParams = new URLSearchParams(params);
    const actualCount = parseInt(searchParams.get("count") || "0");
    if (actualCount + cant > 0) {
      searchParams.set("count", String(actualCount + cant));
    } else {
      searchParams.delete("count");
    }
    replace(`${pathname}?${searchParams.toString()}`);
  };
  return (
    <div className="flex w-32 gap-2">
      <button
        className={"bg-black text-white w-8 rounded font-bold"}
        onClick={() => handleChange(-1)}
      >
        -
      </button>
      <div className="flex-1 text-center bg-zinc-400 rounded">
        {params.get("count")?.toString() || 0}
      </div>
      <button
        className={"bg-black text-white w-8 rounded font-bold"}
        onClick={() => handleChange(1)}
      >
        +
      </button>
    </div>
  );
};

export default AddItemCounter;
