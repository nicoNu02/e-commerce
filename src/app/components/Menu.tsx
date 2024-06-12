"use client";

import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
type MenuItem = {
  title: string;
  link: string;
};
const Menu = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const paths: MenuItem[] = [
    { title: "Inicio", link: "/" },
    { title: "Productos", link: "/products" },
    // { title: "Categorias", link: "/categories" },
  ];
  const pathname = usePathname();
  const handleClick = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <>
      <button onClick={handleClick} className="relative overflow-hidden">
        <Image
          src={
            "https://u8v8yhe8bp8fkg64.public.blob.vercel-storage.com/menuIcon-t7KsbrKrff1hfKxgbYErT5vGFCKh25.svg"
          }
          alt="menu-icon"
          width={30}
          height={30}
          unoptimized
        />
      </button>
      <div className="absolute overflow-hidden w-full left-0 mt-5">
        <div
          className={
            openMenu
              ? "relative visible opacity-100 transition ease-in delay-50 bg-[#FFACED] text-white z-50 w-full p-4"
              : " relative opacity-0 translate-y-[-100%] transition ease-in delay-50 bg-[#FFACED] text-white z-50 w-full p-4"
          }
        >
          {paths.map((el, i) => {
            const { title, link } = el;
            return (
              <Link href={link} onClick={handleClick} key={i}>
                <p
                  className={
                    pathname == link
                      ? "border-b-2 border-black transition ease-in delay-50 px-4 text-black font-bold"
                      : "px-4 text-black font-bold"
                  }
                >
                  {title}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Menu;
