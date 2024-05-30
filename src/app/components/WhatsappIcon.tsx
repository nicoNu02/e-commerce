import Image from "next/image";
import Link from "next/link";

export default function WhatsappIcon() {
  return (
    <Link
      href={"https://wa.me/543413525159?text=hola-nico"}
      className="fixed bottom-10 right-10 z-[30]"
      target="_blank"
    >
      <Image
        src={
          "https://u8v8yhe8bp8fkg64.public.blob.vercel-storage.com/whatsapp-fill-x2SeGyvSDPQaF7cQN89kOWqobDBHPP.svg"
        }
        alt="whatsapp-icon"
        width={50}
        height={50}
        className=""
      />
    </Link>
  );
}
