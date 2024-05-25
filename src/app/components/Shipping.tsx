import Image from "next/image";

const Shipping = async () => {
  return (
    <div className="flex flex-col justify-center items-center w-full bg-black text-white p-6 lg:p-8 mb-8">
      <Image
        src="https://u8v8yhe8bp8fkg64.public.blob.vercel-storage.com/van3-7K4oOzZdHg5qtHQrADGDuPog4ha3S2.svg"
        unoptimized
        width={4}
        height={4}
        alt="pene"
        className="w-16"
      />
      <h2>ENVIOS A TODO EL PAÍS</h2>
      <p className="text-center">
        Através de [metodo de envio] con cualquier <br /> método de pago
      </p>
    </div>
  );
};

export default Shipping;
