import Image from "next/image";

const Shipping = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full bg-primary text-white p-6 lg:p-8 mb-8">
      <Image
        src="https://u8v8yhe8bp8fkg64.public.blob.vercel-storage.com/van3-7K4oOzZdHg5qtHQrADGDuPog4ha3S2.svg"
        unoptimized
        width={4}
        height={4}
        alt="shipping"
        className="w-16"
      />
      <h2 className="font-bold text-center">ENVIOS SOLAMENTE A ROSARIO</h2>
      <p className="text-center">
        Acordando con el vendedor cuando realices la compra de tus productos
      </p>
    </div>
  );
};

export default Shipping;
