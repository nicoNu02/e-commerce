"use client";

export default function PaymentMethods({
  title,
  details,
  id,
  handleClick,
  selected,
}: {
  id: number;
  title: string;
  details: string;
  handleClick: (id: number) => void;
  selected: number;
}) {
  return (
    <div
      className={
        selected == id
          ? "flex bg-pink my-2 p-4 items-center rounded-md border-4 border-purple-400 transition delay-50 ease-in gap-4"
          : "flex bg-pink my-2 p-4 items-center rounded-md gap-4"
      }
    >
      <div
        className="w-8 h-8 rounded-full bg-white flex justify-center items-center mr-2 shrink-0"
        onClick={() => handleClick(id)}
      >
        <div
          className={
            selected == id
              ? "w-4 h-4 opacity-100 bg-pink transition delay-50 ease-in rounded-full"
              : "w-4 h-4 opacity-0 transition delay-50 ease-in rounded-full"
          }
        ></div>
      </div>
      <div className="text-zinc-200">
        <h3 className="text-xl font-medium">{title}</h3>
        <p className="text-sm font-light">{details}</p>
      </div>
    </div>
  );
}
