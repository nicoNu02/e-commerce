"use client";
import { usePathname } from "next/navigation";
import FooterDefault from "../components/FooterDefault";

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
        <FooterDefault />
      </div>
    );
  } else return <div>{children}</div>;
}
