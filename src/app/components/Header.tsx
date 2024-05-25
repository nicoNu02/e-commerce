import Image from "next/image";

import Link from "next/link";
import Menu from "./Menu";
import CartIcon from "./CartIcon";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-8 h-10 w-auto border-b-2">
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
      <div className="flex gap-4">
        <Image
          src="https://u8v8yhe8bp8fkg64.public.blob.vercel-storage.com/searchIcon-ysvRqR1w71dKnOIWDdVE1T2xtOFdBH.svg"
          alt="search-icon"
          width={19}
          height={19}
          unoptimized
        />
        <CartIcon />
        <span>
          <Image
            src="https://u8v8yhe8bp8fkg64.public.blob.vercel-storage.com/profileIcon-rw0ZlWfuAo8nGBvKAaS2Bfh7EzpL4l.svg"
            alt="profile-icon"
            width={20}
            height={20}
            unoptimized
          />
        </span>
      </div>
    </header>
  );
};

export default Header;
