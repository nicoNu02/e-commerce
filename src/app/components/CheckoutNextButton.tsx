export default function CheckoutNextButton({ text }: { text: string }) {
  return (
    <button
      type="submit"
      className="w-32 bg-zinc-200 p-4 rounded-lg text-zinc-900 font-bold"
    >
      {text}
    </button>
  );
}
