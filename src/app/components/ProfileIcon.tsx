"use client";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProfileModal from "./ProfileModal";
import { getSession } from "next-auth/react";

export default function ProfileIcon() {
  const pathname = usePathname();
  const params = useSearchParams();
  const [open, setOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    const sessionGet = async () => {
      const session = await getSession();
      if (session) {
        setIsLogged(true);
      }
    };
    sessionGet();
  }, []);
  const handleClick = () => {
    setOpen(!open);
  };
  return isLogged ? (
    <div className="relative flex">
      <button onClick={handleClick} className="w-full h-full">
        <Image
          src="https://u8v8yhe8bp8fkg64.public.blob.vercel-storage.com/profileIcon-rw0ZlWfuAo8nGBvKAaS2Bfh7EzpL4l.svg"
          alt="profile-icon"
          width={20}
          height={20}
          unoptimized
        />
      </button>
      <ProfileModal open={open} setOpen={setOpen} isLogged={isLogged} />
    </div>
  ) : null;
}
