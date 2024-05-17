"use client"; // This tells Next.js to treat this file as a client component

import { usePathname } from "next/navigation";

const ModalClient = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const isProductRoute = pathname.startsWith("/product/");

  if (!isProductRoute) return null;

  return <>{children}</>;
};

export default ModalClient;
