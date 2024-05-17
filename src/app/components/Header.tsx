import Image from "next/image";
import cart from "../../assets/cartIcon.svg";
import search from "../../assets/searchIcon.svg";
import profile from "../../assets/profileIcon.svg";
import Link from "next/link";
import Menu from "./Menu";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-8 h-10 border-b-2">
      <div className="hidden lg:flex justify-between">
        <p>inicio</p>
        <Link href={"/productos"}>
          <p>productos</p>
        </Link>
        <Link href={"/categorias"}>
          <p>categorias</p>
        </Link>
      </div>
      <div className=" lg:hidden">
        <Menu />
      </div>
      <Link href={"/"}>
        <h1>Gift Regaleria</h1>
      </Link>
      <div className="flex gap-4">
        <span>
          <Image src={search} alt="search-icon" unoptimized />
        </span>
        <span>
          <Image src={cart} alt="cart-icon" unoptimized />
        </span>
        <span>
          <Image src={profile} alt="profile-icon" unoptimized />
        </span>
      </div>
    </header>
  );
};

export default Header;
