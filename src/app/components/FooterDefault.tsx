import Link from "next/link";
import {
  BankSVG,
  CashSVG,
  InstagramSVG,
  MercadoPagoSVG,
  TikTokSVG,
} from "./SVG";

export default function FooterDefault() {
  return (
    <div className="flex flex-col border-t-2 p-8 w-full mt-auto bg-pink z-1 text-white">
      <h4 className="text-xl font-bold">Medios de pago</h4>
      <div className="flex gap-4 h-8 justify-start items-center">
        <BankSVG className="w-8" />
        <CashSVG className="w-8" />
        <div>
          <MercadoPagoSVG className="w-32 ml-[-12px]" />
        </div>
      </div>
      <h4 className="text-xl font-bold">Redes sociales</h4>
      <div className="flex gap-4 h-8 justify-start items-center">
        <Link
          href="https://www.instagram.com/merysglam_rosario/"
          target="_blank"
          passHref
          className="hover:scale-110 transition-transform duration-75 cursor-pointer"
        >
          <InstagramSVG className="h-8" />
        </Link>
        <Link
          href="https://www.tiktok.com/@merysglam"
          target="_blank"
          passHref
          className="hover:scale-110 transition-transform duration-75 cursor-pointer"
        >
          <TikTokSVG className="h-8" />
        </Link>
      </div>
      <h4 className="text-xl font-bold">Contacto</h4>
      <div>
        <p className="text-sm font-bold">example@gmail.com</p>
        <Link href="https://wa.me/c/5493413765905" target="_blank">
          +54 9 (341) 376-5905
        </Link>
        <p className="text-sm font-bold">Rosario, Santa Fe</p>
      </div>
    </div>
  );
}
