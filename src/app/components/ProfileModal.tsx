"use client";
import Link from "next/link";
import { signOut, signIn } from "next-auth/react";
export default function ProfileModal({
  open,
  setOpen,
  isLogged,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  isLogged: boolean;
}) {
  return (
    <div
      className={`absolute right-[-32px] top-[47px] overflow-hidden w-48 h-64 ${
        open ? "block" : "hidden"
      }`}
    >
      <div
        className={
          open
            ? "absolute flex flex-col gap-2 rounded-lg items-center justify-center w-full h-full flex flex-col  text-white bg-zinc-500 p-4 transition delay-50 ease-in z-[99]"
            : "absolute flex flex-col gap-2 rounded-lg items-center justify-center w-full h-full flex flex-col text-white bg-zinc-500 p-4 transition delay-50 ease-in translate-y-[-100%]"
        }
      >
        <button
          className="absolute left-3 top-2 text-zinc-100 text-xl"
          type="button"
          onClick={() => setOpen(false)}
        >
          X
        </button>
        <div className="w-full bg-zinc-100 text-zinc-900 font-bold p-2 flex items-center rounded-lg mt-2">
          <Link href={"/dashboard/products"}> Productos </Link>
        </div>
        <div className="w-full bg-zinc-100 text-zinc-900 font-bold p-2 flex items-center rounded-lg">
          <Link href={"/dashboard/orders"}> Pedidos </Link>
        </div>
        <div className="w-full bg-zinc-100 text-zinc-900 font-bold p-2 flex items-center rounded-lg">
          {isLogged ? (
            <button onClick={() => signOut()}> Cerrar sesión </button>
          ) : (
            <button onClick={() => signIn()}> Iniciar sesión </button>
          )}
        </div>
      </div>
    </div>
  );
}
