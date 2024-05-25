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
    { title: "Productos", link: "/productos" },
    { title: "Categorias", link: "/categorias" },
  ];
  const pathname = usePathname();
  const handleClick = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <>
      <button onClick={handleClick} className="relative overflow-hidden">
        {/* todo  add a menu icon to the db */}
        {/* <Image src={menu} alt="menu-icon" unoptimized /> */}
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
