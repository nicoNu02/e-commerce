"use client";
import { usePathname } from "next/navigation";

export default function LayoutDefault({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return pathname !== "/checkout" ? (
    <div className="flex flex-col">
      <section className="relative overflow-hidden">{children}</section>
      <footer className="pt-4">asdas</footer>
    </div>
  ) : (
    <div>{children}</div>
  );
}
