import Image, { StaticImageData } from "next/image";

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
    </div>
  );
};

export default productCard;
