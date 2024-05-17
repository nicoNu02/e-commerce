"use client";
import { usePathname } from "next/navigation";
import Header from "../components/Header";

export default function LayoutDefault({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return pathname !== "/checkout" ? (
    <div className="flex flex-col">
      <section>{children}</section>
      <footer className="pt-4"></footer>
    </div>
  ) : (
    <div>{children}</div>
  );
}
