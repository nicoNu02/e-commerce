"use client"; // This tells Next.js to treat this file as a client component

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const ModalClient = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const handleBackClick = () => {
    router.push("/", { scroll: false });
  };
  const isProductRoute = pathname.startsWith("/product/");

  if (!isProductRoute) return null;

  return (
    <>
      <div className="w-full h-screen fixed top-0 left-0 z-[30] flex flex-col items-center justify-center backdrop-blur-sm color">
        <div
          onClick={handleBackClick}
          className="w-full h-screen fixed top-0 left-0 z-[40]"
        />
        {children}
      </div>
    </>
  );
};

export default ModalClient;
