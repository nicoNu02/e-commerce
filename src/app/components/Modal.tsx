"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
const Modal = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return (
    <div className="w-full h-screen fixed top-0 left-0 z-50 flex flex-col items-center justify-center backdrop-blur-sm color">
      {children}
    </div>
  );
};

export default Modal;
