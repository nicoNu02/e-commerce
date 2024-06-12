import Image from "next/image";

import Link from "next/link";
import Menu from "./Menu";
import CartIcon from "./CartIcon";
import SearchIcon from "./SearchIcon";
import ProfileIcon from "./ProfileIcon";
// import ProfileIcon from "./ProfileIcon";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-8 h-10 w-auto border-b-2">
      <div className="hidden lg:flex justify-between gap-4 font-bold text-lg ">
        <Link href={"/"}>Inicio</Link>
        <Link href={"/products"}>Productos</Link>
        {/* <Link href={"/categories"}>Categorías</Link> */}
      </div>
      <div className="lg:hidden">
        <Menu />
      </div>
      <div className="flex w-full h-12 gap-4 justify-end items-center">
        <SearchIcon />
        <CartIcon />

        <ProfileIcon />
      </div>
    </header>
  );
};

export default Header;
