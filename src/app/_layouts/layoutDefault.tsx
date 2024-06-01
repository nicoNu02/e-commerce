"use client";
import { usePathname } from "next/navigation";
import FooterDefault from "../components/FooterDefault";

export default function LayoutDefault({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  if (pathname == "/checkout") {
    return (
      <div>
        <div className="w-full bg-white border-b-2 h-32 mb-4 flex justify-center items-center">
          <h1 className="text-2xl font-bold text-rose-400">Gift Regaleria</h1>
        </div>
        {children}
      </div>
    );
  } else if (pathname == "/upload/product" || pathname == "/upload/category") {
    return <div>{children}</div>;
  } else
    return (
      <div className="flex flex-col">
        <section className="relative overflow-hidden">{children}</section>
        <FooterDefault />
      </div>
    );
}
