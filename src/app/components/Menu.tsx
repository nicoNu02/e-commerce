"use client";

import Image from "next/image";
import menu from "../../assets/menuIcon.svg";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
type MenuItem = {
  title: string;
  link: string;
};
const Menu = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const paths: MenuItem[] = [
    { title: "Inicio", link: "/" },
    { title: "Productos", link: "/productos" },
    { title: "Categorias", link: "/categorias" },
  ];
  const pathname = usePathname();
  const handleClick = () => {
    setOpenMenu(!openMenu);
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <>
      <button onClick={handleClick} className="relative overflow-hidden">
        <Image src={menu} alt="menu-icon" unoptimized />
      </button>
      <div className="absolute overflow-hidden w-full left-0 mt-5">
        <div
          className={
            openMenu
              ? "relative visible opacity-100 transition ease-in delay-50 bg-black text-white z-50 w-full p-4"
              : " relative opacity-0 translate-y-[-100%] transition ease-in delay-50 bg-black text-white z-50 w-full p-4"
          }
        >
          {paths.map((el, i) => {
            const { title, link } = el;
            return (
              <Link href={link} onClick={handleClick} key={i}>
                <p
                  className={
                    pathname == link
                      ? "border-b-2 transition ease-in delay-50 px-4"
                      : "px-4"
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
