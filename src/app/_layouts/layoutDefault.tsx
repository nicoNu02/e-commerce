"use client";
import { usePathname } from "next/navigation";
import FooterDefault from "../components/FooterDefault";

export default function LayoutDefault({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  if (pathname == "/checkout" || pathname == "/dashboard/products") {
    return <div>{children}</div>;
  } else if (pathname == "/upload/product" || pathname == "/upload/category") {
    return <div>{children}</div>;
  } else
    return (
      <div className="h-screen flex flex-col">
        <section className="">{children}</section>
        <FooterDefault />
      </div>
    );
}
