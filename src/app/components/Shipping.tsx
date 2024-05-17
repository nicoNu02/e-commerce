import Image from "next/image";
import shipping from "../../assets/van3.svg";

const Shipping = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full bg-black text-white p-6 lg:p-8">
      <Image src={shipping} unoptimized alt="pene" className="w-16" />
      <h2>ENVIOS A TODO EL PAÍS</h2>
      <p className="text-center">
        Através de [metodo de envio] con cualquier <br /> método de pago
      </p>
    </div>
  );
};

export default Shipping;
