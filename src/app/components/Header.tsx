import Image from "next/image";

import search from "../../assets/searchIcon.svg";
import profile from "../../assets/profileIcon.svg";
import Link from "next/link";
import Menu from "./Menu";
import CartIcon from "./CartIcon";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-8 h-10 border-b-2">
      <div className="hidden lg:flex justify-between gap-4 font-bold text-lg ">
        <Link href={"/"} className="hover:bg-black">
          Inicio
        </Link>
        <Link href={"/productos"} className="hover:bg-black">
          Productos
        </Link>
        <Link href={"/categorias"} className="hover:bg-black">
          Categorías
        </Link>
      </div>
      <div className="lg:hidden">
        <Menu />
      </div>
      <Link href={"/"}>
        <h1>Gift Regaleria</h1>
      </Link>
      <div className="flex gap-4">
        <span>
          <Image src={search} alt="search-icon" unoptimized />
        </span>
        <CartIcon />
        <span>
          <Image src={profile} alt="profile-icon" unoptimized />
        </span>
      </div>
    </header>
  );
};

export default Header;
