"use client";
import { usePathname } from "next/navigation";

export default function LayoutDefault({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  if (
    pathname !== "/checkout" &&
    pathname !== "/upload/product" &&
    pathname !== "/upload/category"
  ) {
    return (
      <div className="flex flex-col">
        <section className="relative overflow-hidden">{children}</section>
        <footer className="pt-4">asdas</footer>
      </div>
    );
  } else return <div>{children}</div>;
}
