"use client"; // This tells Next.js to treat this file as a client component

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const ModalClient = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const handleBackClick = () => {
    router.push("/", { scroll: false });
  };
  const isProductRoute =
    pathname.startsWith("/product/") || pathname.startsWith("/products/");

  if (!isProductRoute) return null;

  return (
    <>
      <div>{children}</div>
    </>
  );
};

export default ModalClient;
