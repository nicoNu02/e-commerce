import Image from "next/image";
import Link from "next/link";

export default function WhatsappIcon() {
  return (
    <Link
      href={"https://wa.me/5493413765905?text=*Hola*%0AMiriam"}
      className="fixed bottom-10 right-10 z-[30] hover:scale-110 transition-transform"
      target="_blank"
    >
      <div className="bg-white rounded-full p-[0.5px]">
        <Image
          src={
            "https://u8v8yhe8bp8fkg64.public.blob.vercel-storage.com/whatsapp-fill-x2SeGyvSDPQaF7cQN89kOWqobDBHPP.svg"
          }
          alt="whatsapp-icon"
          width={50}
          height={50}
          className=""
        />
      </div>
    </Link>
  );
}
