import Image, { StaticImageData } from "next/image";
import Link from "next/link";

const productCard = ({
  src,
  alt,
  name,
  price,
  idx,
}: {
  src: StaticImageData;
  alt: string;
  name: string;
  price: string;
  idx: string;
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full h-64 flex justify-center p-3">
        <Image
          src={src}
          alt={alt}
          className="h-full w-auto rounded-lg"
          priority
        />
      </div>
      <h5>{name}</h5>
      <p>
        <b>{price}</b>
      </p>

      <Link
        href={`product/${idx}?img=${idx}modal=open`}
        className="bg-black rounded-2xl text-white w-1/2 h-8 flex items-center justify-center"
      >
        Comprar
      </Link>
    </div>
  );
};

export default productCard;
