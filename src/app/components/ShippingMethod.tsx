"use client";

export default function ShippingMethod({
  title,
  details,
  price,
  id,
  handleClick,
  selected,
}: {
  id: number;
  title: string;
  details: string;
  price: number | null;
  handleClick: (id: number, price: number | null) => void;
  selected: number;
}) {
  return (
    <div
      className={
        selected == id
          ? "flex bg-pink my-2 p-4 items-center rounded-md border-4 border-purple-400 transition delay-50 ease-in"
          : "flex bg-pink my-2 p-4 items-center rounded-md"
      }
    >
      <div
        className="w-8 h-8 rounded-full bg-white flex justify-center items-center mr-2 shrink-0"
        onClick={() => handleClick(id, price)}
      >
        <div
          className={
            selected == id
              ? "w-4 h-4 opacity-100 bg-pink transition delay-50 ease-in rounded-full"
              : "w-4 h-4 opacity-0 transition delay-50 ease-in rounded-full"
          }
        ></div>
      </div>
      <div>
        <h3 className="text-xl font-medium">{title}</h3>
        <p className="text-md font-normal">
          {/* ${ConvertToLocalePrice(price)} - {details} */}
          {details}
        </p>
      </div>
    </div>
  );
}
