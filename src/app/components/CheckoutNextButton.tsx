"use client";
export default function CheckoutNextButton({ text }: { text: string }) {
  const handleClick = () => {};
  return (
    <button
      onClick={handleClick}
      type="submit"
      className="w-32 bg-zinc-200 p-4 rounded-lg text-zinc-900 font-bold"
    >
      {text}
    </button>
  );
}
